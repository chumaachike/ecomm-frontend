import axios from 'axios';
import Cookies from 'js-cookie';

export const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Ensure cookies or credentials are sent
  });
  

apiClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('springBootEcom'); // Retrieve access token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


let isRefreshing = false;  // To avoid multiple simultaneous refresh calls
let failedQueue = [];      // Queue for requests that wait for a token refresh

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,  // Pass valid responses through
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and it's not from a refresh endpoint
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                const refreshToken = Cookies.get('refreshToken');  // Retrieve refresh token
                const { data } = await axios.post('/refresh-token', { refreshToken }, { withCredentials: true });

                const newAccessToken = data.accessToken;

                Cookies.set('springBootEcom', newAccessToken, { expires: 1 }); // Save new access token
                apiClient.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);

                return apiClient(originalRequest); // Retry the original request
            } catch (refreshError) {
                processQueue(refreshError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

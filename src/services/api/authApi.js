import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

const login = async ({ username, password }) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, { username, password }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const signup = async ({ username, password, email }) => {
    try {
        const response = await axios.post(
            `${API_URL}/signup`,
            {
                username,
                password,
                email,
                role: ["user"]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true 
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const signout = () => axios.post(`${API_URL}/signout`, {}, {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

const validateToken = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/validate-token`, {
            params: { token },
            withCredentials: true,
        });
        return response.data; // Successful validation
    } catch (error) {
        // Handle errors (e.g., token invalid or network error)
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.message || 'Token validation failed');
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response:', error.request);
            throw new Error('No response from server');
        } else {
            // Other errors
            console.error('Error:', error.message);
            throw new Error('An error occurred while validating the token');
        }
    }
};




export default { login, signup, signout, validateToken };

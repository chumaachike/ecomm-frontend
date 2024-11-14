import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

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
    const response = await axios.get(`${API_URL}/validate-token`, {
        params: { token },
        withCredentials: true
    });
    return response.data;
};



export default { login, signup, signout, validateToken };

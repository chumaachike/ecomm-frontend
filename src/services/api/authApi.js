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

const signup = ({ username, password, email }) => axios.post(`${API_URL}/signup`, { username, password, email, roles: ["user"] }, {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});
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

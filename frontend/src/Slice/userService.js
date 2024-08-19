import axios from 'axios';
import Cookies from 'js-cookie'

const API_URL ="http://18.206.67.13/api/"

const register = async (userData) => {   
    const response = await axios.post(`${API_URL}signup/`, userData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

const login = async (userData) => {
    try {
        const response = await axios.post(API_URL + 'login/', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.data) {
            Cookies.set('user', JSON.stringify(response.data), { expires: 7 });
            
        }
        return response.data;
    } catch (error) {
        // Extract detailed error message
        if (error.response && error.response.data) {
            throw new Error(JSON.stringify(error.response.data));
        } else {
            throw new Error('An unknown error occurred.');
        }
    }
}

const logout = () => {
    // localStorage.clear();
    // localStorage.removeItem('user')
    Cookies.remove('user');
}

const userService = {
    register,login,logout
}

export default userService
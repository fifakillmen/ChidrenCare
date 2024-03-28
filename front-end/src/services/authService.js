import axios from "axios";
import { message } from 'antd';
import { saveToCookies, setUserInfoToCookie, getDataFromCookies, deleteCookies } from './cookeiService';

const REST_API_BASE_URL = 'http://localhost:9999/auth/';
// http://localhost:9999/auth/checkAccessToken

export const login = async (email, password) => {
    const headers = {
        "Content-Type": "application/json"
    };
    const body = {
        email: email,
        password: password
    };

    await axios.post(REST_API_BASE_URL + 'login', body, {
        headers: headers
    }).then(response => {
        if (response.data.data.accessToken !== null) {
            saveToCookies('accessToken', response.data.data.accessToken);
            // Lưu thông tin người dùng vào cookie
            setUserInfoToCookie(response.data.data);
        }
    }).catch(error => {
        if (error.response) {
            if (error.response.status === 401) {
                message.error('Invalid email or password. Please try again.');
            } else if (error.response.status === 403) {
                message.error('Access Forbidden. You do not have permission to access this resource.');
            } else {
                message.error('An error occurred. Please try again later.');
            }
        } else {
            message.error('An error occurred. Please check your internet connection.');
        }
    });
};
export const logout = () => {
    deleteCookies('accessToken');
    deleteCookies('userInfo');
    window.location.href = "/auth/login";
};
export const checkAccessToken = async  (accessToken) => {
    const headers = {
        "Authorization": `Bearer ${accessToken}`
    };
    try {
       const response= await axios.post(REST_API_BASE_URL + 'checkAccessToken', "", { headers: headers });
        return response.data.data;
    } catch (error) {
        console.log(error.message);
    }
};



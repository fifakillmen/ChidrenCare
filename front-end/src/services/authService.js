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
        if (response.data.status === 'OK') {
            saveToCookies('accessToken', response.data.data.accessToken);
            // Lưu thông tin người dùng vào cookie
            setUserInfoToCookie(response.data.data);
        } else if (response.data.status === 'NOT_FOUND') {
            message.error(`${response.data.message}`);
        } else if (response.data.status === 'UNAUTHORIZED') {
            message.error(`${response.data.message}`);
        } else if (response.data.status === 'FORBIDDEN') {
            message.error(`${response.data.message}`);
        }
    }).catch(error => {
        message.error(error.message);

    });
};
export const logout = () => {
    deleteCookies('accessToken');
    deleteCookies('userInfo');
    window.location.href = "/auth/login";
};
export const checkAccessToken = async (accessToken) => {
    const headers = {
        "Authorization": `Bearer ${accessToken}`
    };
    try {
        const response = await axios.post(REST_API_BASE_URL + 'checkAccessToken', "", { headers: headers });
        return response.data.data;
    } catch (error) {
        console.log(error.message);
    }
};



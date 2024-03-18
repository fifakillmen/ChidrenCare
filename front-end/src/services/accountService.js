import axios from "axios"
import { getAccessToken, getDataFromCookies, saveToCookies, deleteCookies } from './cookeiService'

const REST_API_BASE_URL = 'http://localhost:9999/account/'

export const createAccount = (email, password) => {
    const headers = {
        "Content-Type": "application/json"
    };

    const body = {
        email: email,
        password: password
    };

    return axios.post(REST_API_BASE_URL + 'addAccount', body, {
        headers: headers
    });
};
export const verifyEmail = (email, code) => {
    const headers = {
        "Content-Type": "application/json"
    };

    const body = {
        email: email,
        code: code
    };

    return axios.post(REST_API_BASE_URL + 'verifyEmail', body, {
        headers: headers
    });
};
export const resendVerifyEmail = (email) => {
    const headers = {
        "Content-Type": "application/json"
    };

    const body = {
        email: email
    };

    return axios.post(REST_API_BASE_URL + 'resendVerifyEmail', body, {
        headers: headers
    });
};
export const searchAccount = (userId) => {
    const accessToken = getAccessToken();
    const headers = {
        "Authorization": `Bearer ${accessToken}`
    };

    const params = new URLSearchParams();
    if (userId) {
        params.append('UserId', userId);
    }

    return axios.post(REST_API_BASE_URL + 'searchAccount', params.toString(), {
        headers: headers
    });
};
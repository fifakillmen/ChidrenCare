import axios from "axios"
import { getAccessToken, getDataFromCookies, saveToCookies, deleteCookies, getUserInfoFromCookie } from './cookeiService'

const REST_API_BASE_URL = 'http://localhost:9999/account/'

export const createAccount = async (email, password) => {
    const headers = {
        "Content-Type": "application/json"
    };

    const body = {
        email: email,
        password: password
    };

    return await axios.post(REST_API_BASE_URL + 'addAccount', body, {
        headers: headers
    });
};
export const verifyEmail = async (email, code) => {
    const headers = {
        "Content-Type": "application/json"
    };

    const body = {
        email: email,
        code: code
    };

    return await axios.post(REST_API_BASE_URL + 'verifyEmail', body, {
        headers: headers
    });
};
export const resendVerifyEmail = async (email) => {
    const headers = {
        "Content-Type": "application/json"
    };

    const body = {
        email: email
    };

    return await axios.post(REST_API_BASE_URL + 'resendVerifyEmail', body, {
        headers: headers
    });
};
export const searchAccount = async (userId) => {
    const accessToken = await getAccessToken();
    const headers = {
        "Authorization": `Bearer ${accessToken}`
    };

    const params = new URLSearchParams();
    if (userId) {
        params.append('UserId', userId);
    }

    return await axios.post(REST_API_BASE_URL + 'searchAccount', params.toString(), {
        headers: headers
    });
};
export const updateAccount = async (requestData) => {
    const accessToken = await getAccessToken();
    const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    };

    try {
        const response = await axios.put(REST_API_BASE_URL + 'updateAccount', requestData, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createAccountByAdmin = async (email, password, roles) => {
    const accessToken = await getAccessToken();
    const UserAdmin = getUserInfoFromCookie();

    const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    };

    const body = {
        AdminId: UserAdmin.userId,
        email: email,
        password: password,
        lsRole: roles
    };

    return await axios.post(REST_API_BASE_URL + 'addAccountByAdmin', body, {
        headers: headers
    });
};
export const changePassword = async (email, currentPassword, newPassword) => {
    const accessToken = await getAccessToken();

    const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    };

    const body = {
        email: email,
        currentPassword: currentPassword,
        newPassword: newPassword
    };

    return await axios.post(REST_API_BASE_URL + 'changePassword', body, {
        headers: headers
    });
};
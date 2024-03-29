import axios from "axios"
import { getAccessToken, getDataFromCookies, saveToCookies, deleteCookies, getUserInfoFromCookie } from './cookeiService'

const REST_API_BASE_URL = 'http://localhost:9999/user/'
// http://localhost:9999/user/deleteUser
// http://localhost:9999/user/findUser
export const createUser = async (firstName, lastName, dob, phone, email, address, gender, avatarFile) => {
    const accessToken = await getAccessToken();
    const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": 'multipart/form-data'
    };
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('dob', dob);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('avatarFile', avatarFile);

    return await axios.post(REST_API_BASE_URL + 'addUser', formData, {
        headers: headers
    });
};
export const searchUser = async (firstName, lastName, dob, targetPageNumber) => {
    const accessToken = await getAccessToken();
    const headers = {
        "Authorization": `Bearer ${accessToken}`
    };

    const params = new URLSearchParams();
    if (firstName) {
        params.append('firstName', firstName);
    }
    if (lastName) {
        params.append('lastName', lastName);
    }
    if (dob) {
        params.append('dob', dob);
    }
    params.append('targetPageNumber', targetPageNumber);

    return await axios.post(REST_API_BASE_URL + 'searchUser', params.toString(), {
        headers: headers
    });
};
export const updateUser = async (UserId, firstName, lastName, dob, phone, address, gender, avatarFile) => {
    const accessToken = await getAccessToken();
    const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": 'multipart/form-data'
    };
    const formData = new FormData();
    formData.append('UserId', UserId);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('dob', dob);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('avatarFile', avatarFile);

    return await axios.put(REST_API_BASE_URL + 'updateUser', formData, {
        headers: headers
    });
};
export const deleteUser = async (UserId) => {
    const accessToken = await getAccessToken();
    const headers = {
        "Authorization": `Bearer ${accessToken}`,
    };
    const formData = new FormData();
    formData.append('UserId', UserId);

    return await axios.delete(REST_API_BASE_URL + 'deleteUser', {
        headers: headers,
        data: formData
    });
};
export const createUserByAdmin = async (firstName, lastName, dob, phone, email, address, gender, avatarFile) => {
    const accessToken = await getAccessToken();
    const UserAdmin = getUserInfoFromCookie();
    const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": 'multipart/form-data'
    };
    const formData = new FormData();
    formData.append('AdminId', UserAdmin.userId);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('dob', dob);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('avatarFile', avatarFile);

    return await axios.post(REST_API_BASE_URL + 'addUserByAdmin', formData, {
        headers: headers
    });
};
export const findUser = async (userId) => {
    const accessToken = await getAccessToken();
    const headers = {
        "Authorization": `Bearer ${accessToken}`
    };
    const params = new URLSearchParams();

    params.append('userId', userId);

    return await axios.post(REST_API_BASE_URL + 'findUser', params.toString(), {
        headers: headers
    });
};
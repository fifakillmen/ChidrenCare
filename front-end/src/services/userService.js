import axios from "axios"
import { getDataFromCookies, saveToCookies, deleteCookies } from './cookeiService'

const REST_API_BASE_URL = 'http://localhost:9999/user/'


export const createUser = ( firstName, lastName, dob, phone, email, address, gender, avatarFile) => {
    const accessToken = getDataFromCookies('accessToken');
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

    return axios.post(REST_API_BASE_URL + 'addUser', formData, {
        headers: headers
    }).then(response => {
        console.log(response)
    })
};
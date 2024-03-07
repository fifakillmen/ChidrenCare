import axios from "axios"
import { deleteCookies, getDataFromCookies, saveToCookies } from './cookeiService'
const REST_API_BASE_URL = 'http://localhost:9999/auth/'

export const login = (email, password) => {
    const headers = {
        "Content-Type": "application/json"
    };

    const body = {
        email: email,
        password: password
    };

    axios.post(REST_API_BASE_URL + 'login', body, {
        headers: headers
    }).then(response => {
        if (response.data.data.accessToken !== null) {
            saveToCookies('accessToken', response.data.data.accessToken);
            // save thông tin user vào cookie
            saveToCookies('userData', response.data.data)
        }
    })
};
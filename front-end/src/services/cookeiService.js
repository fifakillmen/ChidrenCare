import Cookies from 'js-cookie';
import { checkAccessToken, logout } from './authService';

export const saveToCookies = (name, data) => {
    Cookies.set(name, data);
};
export const getDataFromCookies = (name) => {
    const data = Cookies.get(name);
    if (!data) {
        return null;
    }
    return data;
};
export const deleteCookies = (name) => {
    return Cookies.remove(name);
};
export function setUserInfoToCookie(userInfo) {
    const userInfoJSON = JSON.stringify(userInfo);

    document.cookie = `userInfo=${userInfoJSON}; path=/`;
};
export function getUserInfoFromCookie() {
    // Lấy giá trị của cookie 'userInfo'
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('userInfo='))
        ?.split('=')[1];

    // Nếu có giá trị của cookie
    if (cookieValue) {
        // Parse thông tin người dùng từ chuỗi JSON
        return JSON.parse(cookieValue);
    }
    return null; // Trả về null nếu không tìm thấy cookie
};




export function getAccessToken() {
    const data = Cookies.get("accessToken");

    if (data) {
        if (checkAccessToken(data)) {
            return data;
        }
    } else {
        logout();
    }
};


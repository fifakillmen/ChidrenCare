import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';

export const saveToCookies = (name, data) => {
    Cookies.set(name, data);
};
export const getDataFromCookies = (name) => {
    const data = Cookies.get(name);
    if (!data) {
        redirect("/homepage");
    }
    return data;
};
export const deleteCookies = () => {
    return Cookies.remove('accessToken');
};



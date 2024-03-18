import React from "react";
import "./assets/scss/style.scss";
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import {
    Route,
    Routes,
    HashRouter,
    BrowserRouter
} from "react-router-dom";
import Home from "./views/page/Home";
import Admin from "./views/Admin/Admin";
import Feedback from "./views/Feedback";
import Children from "./views/Children";
import Starter from "./views/Starter";
import Post from "./views/Admin/Post";
import Login from "../src/components/Authorization/LoginComponent"
import Signup from "../src/components/Authorization/SignUpComponent"
import ForgotPassword from "../src/components/Authorization/ForgotPasswordComponent"
import VerifyEmail from "../src/components/Authorization/VerifyEmailComponent"
import UserList from "../src/components/User/UserListComponent"




const root = ReactDOM.createRoot(document.getElementById('root'));

var hist = createBrowserHistory();
root.render(
    <BrowserRouter history={hist}>
        <Routes>
            <Route path="/admin" element={<Admin />}>
                <Route path="starter" element={<Starter />} />
                <Route path="feedback" element={<Feedback />} />
                <Route path="children" element={<Children />} />
                <Route path="post" element={<Post />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
            <Route path="/auth/verifyemail" element={<VerifyEmail />} />
            <Route path="/listUser" element={<UserList />} />

        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

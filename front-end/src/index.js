import React from "react";
import "./assets/scss/style.scss";
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import {
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom";
import Home from "./views/page/Home";
import Admin from "./views/Admin/Admin";
import Feedback from "./views/Feedback";
import Children from "./views/Children";
import Starter from "./views/Starter";
import Post from "./views/Admin/Post/Post.jsx";
import Login from "../src/components/Authorization/LoginComponent"
import Signup from "../src/components/Authorization/SignUpComponent"

// import Servicemanage from './components/ServicesManager/ServicesManager.jsx';
import Servicemanage from './components/ServicesManager/ServicesManager.jsx';
import Service from './components/Services/Service/Service';
import ServiceDetail from './components/Services/Service/servicedetail.jsx';
import NewPost from './views/Admin/Post/newPost.jsx'
import PostDetail from './views/Admin/Post/PostDetail.jsx'
import Blog from './components/Blog/Blog.jsx'
import ManagePost from './views/Admin/ManagePost.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

var hist = createBrowserHistory();
root.render(
    <BrowserRouter history={hist}>
        <Routes>
            <Route path="/admin" element={<Admin />}>
                <Route path="starter" element={<Starter />} />
                <Route path="feedback" element={<Feedback />} />
                <Route path="children" element={<Children />} />
                
                {/* <Route path="newpost" element={<NewPost />} /> */}
                <Route path="managePost" element={<ManagePost />} />
                <Route path="addPost" element={<ManagePost />} />
                <Route path="servicemanage" element={<Servicemanage />} />
                <Route path="postdetail" element={<PostDetail />} />            
                            
                </Route>
                <Route path="/newpost" element={<NewPost />} />
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/post" element={<Post />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/service" element={<Service />} />
            <Route path="/servicedetail/:id" element={<ServiceDetail />} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

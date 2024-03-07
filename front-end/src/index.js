import React from "react";
import "./assets/scss/style.scss";
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserHistory} from "history";
import {
    Route,
    Routes,
    HashRouter
} from "react-router-dom";
import Home from "./views/page/Home";
import Admin from "./views/Admin/Admin";
import Feedback from "./views/Feedback";
import Children from "./views/Children";
import Starter from "./views/Starter";


const root = ReactDOM.createRoot(document.getElementById('root'));

var hist = createBrowserHistory();
root.render(
    <HashRouter history={hist}>
        <Routes>
            <Route path="/admin" element={<Admin/>}>
                <Route path="starter" element={<Starter/>}/>
                <Route path="feedback" element={<Feedback/>}/>
                <Route path="children" element={<Children/>}/>
            </Route>
            <Route path="/" element={<Home/>}/>
        </Routes>
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

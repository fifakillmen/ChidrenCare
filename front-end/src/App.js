import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Servicemanage from './components/ServicesManager/ServicesManager';
import Service from './components/Services/Service/Service';
import Post from './components/Post/Post'
import NewPost from './components/Post/newPost.jsx'
import PostDetail from './components/Post/PostDetail.jsx'
import Blog from './components/Blog/Blog.jsx'


import ManagePost from './components/Admin/ManagePost';
import FullLayout from './layouts/FullLayout.js';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/service" element={<Service />} />
        <Route path="/servicemanage" element={<Servicemanage />} />
        <Route path="/post" element={<Post />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/postdetail" element={<PostDetail />} />
        <Route path="/blog" element={<Blog />} />


        <Route path="/" element={<FullLayout />}>
          <Route index element={<Outlet />}/>
          <Route path="/managePost" element={<ManagePost />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


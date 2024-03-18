import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Post.css';

const Post = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/manager/post/getList');
        setServices(response.data.data ); // Cập nhật state services với dữ liệu từ API
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="menu-btn">
        <i className="fas fa-bars fa-2x"></i>
      </div>

      <div className="container">
        {/* Showcase */}
        <header className="showcase1">
          <div className="bannerr">
            <h2>Post</h2>
          </div>
        </header>

        {/* Render danh sách services */}
        <section className="home-cards">
          {services.map((service, index) => (
            <div key={index}>
              <img src={service.imageUrl} alt="" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to={`/post/${service.id}`}>Learn More <i className="fas fa-chevron-right"></i></Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Post;

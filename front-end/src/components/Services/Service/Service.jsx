import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../homepage/header/header';
import Footer  from '../../homepage/footer/footer';
import "./Service.css";
import imageService from "../../../assets/images/Images/blog2.jpg"
const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:9999/manager/service/getlist")
      .then((response) => {
        setServices(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  return (
    <>
    <div>
      <Header/>
      <div>
        <div className="menu-btn">
          <i className="fas fa-bars fa-2x"></i>
        </div>

        <div className="container">

          {/* Showcase */}
          <header className="showcase">
            <div className="banner">
              <h2>Our Service</h2>
              <p>
                Your satisfaction is the best thing for us
              </p>
              <a href="#" className="btn">
                Booking <i className="fas fa-chevron-right"></i>
              </a>
            </div>

          </header>

          {/* Home cards 1 */}
          <section className="home-cards">
            {services.map((service) => (
              <div key={service.id}>
                {/* <img src={service.thumbnail} alt="Error" /> */}
                <img src={imageService} alt="Error" />
                <h3>{service.serviceTitle}</h3>
                <p>{service.serviceDetail}</p>
                <Link to={`/servicedetail/${service.id}`}>Learn More <i className="fas fa-chevron-right"></i></Link>
              </div>
            ))}
          </section>



        </div>


      </div>
      <Footer/>
    </div>
      
    </>
  );
};

export default Service;

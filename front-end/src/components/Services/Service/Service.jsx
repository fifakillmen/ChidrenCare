import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./Service.css";

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
                <img src={service.thumbnail} alt="Error" />
                <h3>{service.serviceTitle}</h3>
                <p>{service.serviceDetail}</p>
                <Link to={`/servicedetail/${service.id}`}>Learn More <i className="fas fa-chevron-right"></i></Link>
              </div>
            ))}
          </section>

          {/* Xbox 
          <section className="xbox">
            <div className="content">
              <h2>Service 1</h2>
              <p>Loren ipsun dolor sit anet, consectetur adipisci elit, sed eiusnod tenpor incidunt ut labore et dolore nagna aliqua. Ut enin ad ninin venian, quis nostrun exercitationen ullan corporis suscipit laboriosan, nisi ut aliquid ex ea connodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillun dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt nollit anin id est laborun.</p>
              <a href="#" className="btn">
                Join Now <i className="fas fa-chevron-right"></i>
              </a>
            </div>
          </section>*/}


        </div>


      </div>
    </>
  );
};

export default Service;

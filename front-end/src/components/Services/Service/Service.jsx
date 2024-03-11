import React,{ useEffect, useState, Link }  from 'react';

import "./Service.css"

const Service = () => {
  const [services, setServices] = useState([]);

    const [isUser, setIsUser] = useState(false);
    const [currentUser, setCurrentUser] = useState()
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
          <div>
            <img src="https://i.ibb.co/LZPVKq9/card1.png" alt="" />
            <h3>Service 1</h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            
            
            
            </p>
            <a href="#">Learn More <i className="fas fa-chevron-right"></i></a>
          </div>
          <div>
            <img src="https://i.ibb.co/KjGFHVJ/card2.png" alt="image" />
            <h3>Service 2</h3>
            <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <a href="#">Learn More <i className="fas fa-chevron-right"></i></a>
          </div>
          <div>
            <img src="https://i.ibb.co/2cnshH6/card3.png" alt="" />
            <h3>Service 3</h3>
            <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            </p>
            <a href="#">Learn More <i className="fas fa-chevron-right"></i></a>
          </div>
          <div>
            <img src="https://i.ibb.co/G57P0Pb/card4.png" alt="" />
            <h3>Service 4</h3>
            <p>
            Expect more. World class performance, with more privacy, more productivity, and more value.
            </p>
            <a href="#">Learn More <i className="fas fa-chevron-right"></i></a>
          </div>
        </section>

        {/* Xbox */}
        <section className="xbox">
          <div className="content">
            <h2>Service 1</h2>
            <p>Loren ipsun dolor sit anet, consectetur adipisci elit, sed eiusnod tenpor incidunt ut labore et dolore nagna aliqua. Ut enin ad ninin venian, quis nostrun exercitationen ullan corporis suscipit laboriosan, nisi ut aliquid ex ea connodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillun dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt nollit anin id est laborun.</p>
            <a href="#" className="btn">
              Join Now <i className="fas fa-chevron-right"></i>
            </a>
          </div>
        </section>

        {/* Home cards 2 */}
        <section className="home-cards">
          <div>
            <img src="https://i.ibb.co/zVqhWn2/card5.png" alt="" />
            <h3>Service 4</h3>
            <p>
            Expect more. World class performance, with more privacy, more productivity, and more value.
            </p>
            <a href="#">Learn More <i className="fas fa-chevron-right"></i></a>
          </div>
          <div>
            <img src="https://i.ibb.co/mGZcxcn/card6.jpg" alt="" />
            <h3>Service 4</h3>
            <p>
            Expect more. World class performance, with more privacy, more productivity, and more value.
            </p>
            <a href="#">Learn More <i className="fas fa-chevron-right"></i></a>
          </div>
          <div>
            <img src="https://i.ibb.co/NpPvVHj/card7.png" alt="" />
            <h3>Service 4</h3>
            <p>
            Expect more. World class performance, with more privacy, more productivity, and more value.
            </p>
            <a href="#">Learn More <i className="fas fa-chevron-right"></i></a>
          </div>
          <div>
            <img src="https://i.ibb.co/LkP4L5T/card8.png" alt="" />
            <h3>Service 4</h3>
            <p>
            Expect more. World class performance, with more privacy, more productivity, and more value.
            </p>
            <a href="#">Learn More <i className="fas fa-chevron-right"></i></a>
          </div>
        </section>
        
        
      </div>

      
    </div>
    </>
  );
};

export default Service;
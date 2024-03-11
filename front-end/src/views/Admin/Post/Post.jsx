import React,{ useEffect, useState, Link }  from 'react';

import "./Post.css"

const Post = () => {
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
        <header className="showcase1">
          <div className="bannerr">
          <h2>Post</h2>
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
            <img src="https://i.ibb.co/KjGFHVJ/card2.png" alt="" />
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

export default Post;
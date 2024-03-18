import React from 'react';
import { Col } from 'react-bootstrap';
import './Blog.css';
import blog2Image from '../../assets/images/Images/blog2.jpg';

const Blog = (props) => {
    // const {title, img, span1, span2} = props.blog;
    return (
        <Col md={6} lg={6} sm={12} xl={4}>
            <div className="single-blog-card">
                <div className="card-thumb">
                    {/* <img src={img} alt="" /> */}
                    <img src={blog2Image} alt="" />
                </div>
                <div className="card-content text-start">
                    {/* <h3>{title}</h3>
                    <div className="card-meta d-flex justify-content-between">
                        <span>{span1}</span>
                        <span>{span2}</span>
                    </div> */}
                    <h3>Title</h3>
                    <div className="card-meta d-flex justify-content-between">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                        <span>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default Blog;
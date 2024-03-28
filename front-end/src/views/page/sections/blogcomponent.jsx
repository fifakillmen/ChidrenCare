import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Card } from 'reactstrap';
import axios from 'axios';
import image from "../../../assets/images/Images/blog1.jpg";

const BlogComponent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:9999/user/post/getList')
      .then(response => {
        setBlogs(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  };

  return (
    <div>
      <div className="blog-home2 spacer">
        <Container>
          <Row className="justify-content-center">
            <Col md="8" className="text-center">
              <h2 className="title">Recent Blogs</h2>
              <h6 className="subtitle">You can rely on our amazing features list and also our customer services will be great experience for you without doubt and in no-time</h6>
            </Col>
          </Row>
          <Row className="m-t-40 justify-content-center">
            {blogs.map(blog => (
              <Col lg="4" md="6" key={blog.id}>
              <div className="blog-post">
                <Card>
                  <img className="card-img-top" src={blog.imageLink} alt="blog image" />
                  <img className="card-img-top" src={image} alt="blog image" />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.content}</p>
                    <div className="read-more">
                      <Link to={`/post/detail/${blog.id}`} className="linking text-themecolor">
                        Read More <i className="ti-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default BlogComponent;

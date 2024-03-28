import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Card } from 'reactstrap';
import axios from 'axios';

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
                <Card>
                  <a href="#"><img className="card-img-top" src={blog.imageLink} alt="blog image" /></a>
                  {/* <div className="date-pos bg-info-gradiant">Oct<span>23</span></div> */}
                  <h5 className="font-medium m-t-30"><a href="#" className="link">{blog.title}</a></h5>
                  <p className="m-t-20">{blog.content}</p>
                  <Link to={`/user/post/${blog.id}`} className="linking text-themecolor m-t-10">Learn More <i className="ti-arrow-right"></i></Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default BlogComponent;

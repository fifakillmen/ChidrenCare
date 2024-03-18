import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import './Blog.css';

const Blog = ({ blog }) => {
    const [blogDetail, setBlogDetail] = useState(null);

    useEffect(() => {
        // Gọi API để lấy chi tiết blog khi component được tạo
        fetchBlogDetail(blog.id);
    }, [blog.id]);

    const fetchBlogDetail = async (blogId) => {
        try {
            const response = await axios.get(`http://localhost:9999/blog/detail?id=${blogId}`);
            setBlogDetail(response.data.data);
        } catch (error) {
            console.log('Error fetching blog detail:', error);
        }
    };

    return (
        <Col md={6} lg={6} sm={12} xl={4}>
            <div className="single-blog-card">
                <div className="card-thumb">
                    {blogDetail && <img src={blogDetail.imageURL} alt="" />}
                </div>
                <div className="card-content text-start">
                    {blogDetail && (
                        <>
                            <h3>{blogDetail.title}</h3>
                            <div className="card-meta d-flex justify-content-between">
                                <span>{blogDetail.briefContent}</span>
                                {/* Hiển thị thông tin khác của blog tại đây nếu cần */}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Col>
    );
};

export default Blog;

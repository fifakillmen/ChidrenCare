import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './PostDetail.css'
import image from "../../../assets/images/Images/blog1.jpg";
import Header from "../../../components/homepage/header/header";


const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/user/post/detail?id=${id}`);
      if (response.data && response.data.data) {
        setPost(response.data.data);
        setComments(response.data.data.comments || []);
      } else {
        setErrorMessage('Invalid response data format');
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
      setErrorMessage('Error fetching post details. Please try again later.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // 'http://localhost:8080/api/post/comments/submit',
        {
          postId: id,
          content: newComment,
        }
      );
      setComments([...comments, response.data]);
      setNewComment('');
      setSuccessMessage('Comment submitted successfully.');
    } catch (error) {
      console.error('Error submitting comment:', error);
      setErrorMessage('Failed to submit comment. Please try again later.');
    }
  };

  return (
    <div>

    
    <Header />
    <div className="post-detail">
      <Card className="post-card">
        <Card.Body>
          <div className="post-header">
            <div className="post-author">
              {/* <img src={post.user.profilePicture} alt="Author" /> */}
              <h5>{post.user?.username}</h5>
            </div>
          </div>
          <div className="post-content">
            <p>{post.content}</p>
          </div>

          {post.imageLink && <img src={post.imageLink} alt="Post" className="post-image" />}
          {/* ảnh ví dụ */}
          <img src={image} alt="Post" className="post-image" /> 
          <hr />
          <div className="post-comments">
            <h6>Comments</h6>
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button variant="primary" type="submit" className="ml-2">
                  Post
                </Button>
              </Form.Group>
            </Form>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
            {successMessage && <div className="text-success">{successMessage}</div>}
            <div className="comment-list">
              {comments &&
                comments.map((comment, index) => (
                  <div className="comment" key={index}>
                    <div className="comment-author">
                      {/* <img src={comment.user.profilePicture} alt="Author" /> */}
                      <h6>{comment.user.username}</h6>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
    </div>
  );
};

export default PostDetail;
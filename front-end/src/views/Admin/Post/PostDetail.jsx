import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostDetail() {
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
            const response = await axios.get(`http://localhost:9999/post/${id}`);
            setPost(response.data);
            setComments(response.data.comments);
        } catch (error) {
            console.error('Error fetching post details:', error);
            toast.error('Error fetching post details. Please try again later.');
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                // 'http://localhost:8080/api/post/comments/submit',
                { postId: id, content: newComment }
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
            <Card className="my-4">
                <Card.Body>
                    <div className="d-flex align-items-center">
                        <div>
                            <h5>{post.user?.username}</h5>
                            <p className="text-muted">{post.title}</p>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <p>{post.content}</p>
                    </div>
                    <hr />
                    <h6>Comments</h6>
                    <Form onSubmit={handleCommentSubmit}>
                        <Form.Group className="d-flex align-items-center">
                            <Form.Control
                                type="text"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <Button variant="primary" type="submit" className="ml-2">Submit</Button>
                        </Form.Group>
                    </Form>
                    {comments.map((comment, index) => (
                        <div className="d-flex align-items-center my-3" key={index}>
                            <div>
                                <h6>{comment.user.username}</h6>
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </div>
    );
}

export default PostDetail;

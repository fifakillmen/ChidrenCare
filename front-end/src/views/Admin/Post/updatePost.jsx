// Trong UpdatePost.jsx
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';

function UpdatePost({ postId, handleCloseModal }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    imageLink: "",
    isActive: ""
  });

  useEffect(() => {
    // Fetch data of selected post
    axios.get(`http://localhost:9999/manager/post/getDetails?id=${postId}`)
      .then(response => {
        const postData = response.data; // Assuming response.data is an object containing post data
        setFormData({
          title: postData.title,
          content: postData.content,
          author: postData.author,
          imageLink: postData.imageLink,
          isActive: postData.isActive
        });
      })
      .catch(error => {
        console.error("Error fetching post details:", error);
      });
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated data to backend
    axios.put(`http://localhost:9999/manager/post/update?id=${postId}`, formData)
      .then(response => {
        console.log("Post updated successfully");
        handleCloseModal();
      })
      .catch(error => {
        console.error("Error updating post:", error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formImageLink">
        <Form.Label>Image Link</Form.Label>
        <Form.Control
          type="text"
          name="imageLink"
          value={formData.imageLink}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formIsActive">
        <Form.Label>Is Active</Form.Label>
        <Form.Control
          as="select"
          name="isActive"
          value={formData.isActive}
          onChange={handleChange}
          required
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdatePost;

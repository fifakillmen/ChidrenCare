import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddPostModal({ show, handleClose, handleAddProduct }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:9999/manager/service/add",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response.data);

      setSuccessMessage("Service submitted successfully!");
      setErrorMessage(null);

      setTimeout(() => {
        navigate("/admin/servicemanage");
      }, 2000);
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(
        "An error occurred while submitting the form. " +
          error.response.data.message
      );
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2 style={{ textAlign: "center" }}>List of Service</h2>
          </Col>
        </Row>
        {errorMessage && (
          <p className="alert alert-danger">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="alert alert-success">{successMessage}</p>
        )}
        <Form onSubmit={handleSubmit(onSubmit)} className="container mt-5 mb-5">
          <Form.Group className="mb-3" controlId="serviceTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              {...register("serviceTitle", { required: true })}
            />
            {errors.serviceTitle && (
              <p className="text-danger">Title is required</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="serviceDetail">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter content"
              {...register("serviceDetail", { required: true })}
            />
            {errors.serviceDetail && (
              <p className="text-danger">Content is required</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              {...register("price", { required: true, pattern: /^[0-9]+$/ })}
            />
            {errors.price && errors.price.type === "required" && (
              <p className="text-danger">Price is required</p>
            )}
            {errors.price && errors.price.type === "pattern" && (
              <p className="text-danger">Price must be a non-negative number</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="salePrice">
            <Form.Label>Sale Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter sale price"
              {...register("salePrice", { pattern: /^[0-9]+$/ })}
            />
            {errors.salePrice && errors.salePrice.type === "pattern" && (
              <p className="text-danger">Sale Price must be a non-negative number</p>
            )}
          </Form.Group>

          {/* Thêm trường nhập userID */}
          <Form.Group className="mb-3" controlId="userId">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter user ID"
              {...register("createdBy", { required: true })}
            />
            {errors.userId && <p className="text-danger">User ID is required</p>}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddPostModal;

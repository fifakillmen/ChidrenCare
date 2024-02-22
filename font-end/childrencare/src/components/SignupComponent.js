import React from 'react'
import { Form, Button, Card } from 'react-bootstrap';

const signupComponent = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: '40rem' }}>
        <Card.Body>
          <Card.Title>Sign Up</Card.Title>
          <Form>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Select>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="tel" placeholder="Enter mobile number" />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter address" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default signupComponent
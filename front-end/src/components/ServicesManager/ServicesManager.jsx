import React from "react";
import "./ServicesManager.css";
import { Col, Container, Row } from 'react-bootstrap';

const ServicesManager = () => {
    return (
        <>
  <Container className="mt-5 mb-4">
    <Row>
        <h1 className="display-1 mb-5 text-primary text-uppercase">List Services</h1>
    </Row>
    <Row>
        <Col>
        <table className="table bg-white border">
  <thead className="bg-light">
    <tr>
      <th>User Name</th>
      <th>Services Name</th>
      <th>Status</th>
      <th>Position</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src="" alt="image"  className="imgc rounded-circle ml-5" />
          <div className="ms-3">
            <p className="fw-bold mb-1">Test</p>
            <p className="text-muted mb-0">test@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">Entertainment and Physical Activity Program</p>
        <p className="text-muted mb-0">BabySitt</p>
      </td>
      <td>
        <span className="badge badge-success rounded-pill d-inline text-success">Active</span>
      </td>
      <td>Admin</td>
      <td>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Approved</button>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Reject</button>
      </td>
    </tr>
    <tr>
      <td>
        <div className="d-flex align-items-center">
        <img src="" alt="image"  className="imgc rounded-circle ml-5" />
        <div className="ms-3">
            <p className="fw-bold mb-1">Test</p>
            <p className="text-muted mb-0">test@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">Entertainment and Physical Activity Program</p>
        <p className="text-muted mb-0">Baby Sitt</p>
      </td>
      <td>
        <span className="badge badge-success rounded-pill d-inline text-success">Active</span>
      </td>
      <td>Admin</td>
      <td>
      <button type="button" className="btn btn-primary btn-sm btn-rounded">Approved</button>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Reject</button>
      </td>
    </tr>
    <tr>
      <td>
        <div className="d-flex align-items-center">
        <img src="" alt="image"  className="imgc rounded-circle ml-5" />
        <div className="ms-3">
            <p className="fw-bold mb-1">Test</p>
            <p className="text-muted mb-0">test@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">Healthcare and Nutrition Care</p>
        <p className="text-muted mb-0">HD1</p>
      </td>
      <td>
        <span className="badge badge-success rounded-pill d-inline text-success">Active</span>
      </td>
      <td>Admin</td>
      <td>
      <button type="button" className="btn btn-primary btn-sm btn-rounded">Approved</button>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Reject</button>
      </td>
    </tr>
    <tr>
      <td>
        <div className="d-flex align-items-center">
        <img src="" alt="image"  className="imgc rounded-circle ml-5" />
          <div className="ms-3">
            <p className="fw-bold mb-1">Test</p>
            <p className="text-muted mb-0">test@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">Early Childhood Education Program</p>
        <p className="text-muted mb-0">HD1</p>
      </td>
      <td>
        <span className="badge badge-success rounded-pill d-inline text-success">Active</span>
      </td>
      <td>Admin</td>
      <td>
      <button type="button" className="btn btn-primary btn-sm btn-rounded">Approved</button>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Reject</button>
      </td>
    </tr>


  </tbody>
</table>
        </Col>
    </Row>
  </Container>
        </>
    );
}

export default ServicesManager;

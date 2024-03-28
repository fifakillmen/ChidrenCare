import React, { useState, useEffect } from "react";
import "./ServicesManager.css";
import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap";
import { Pagination } from 'antd';
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateServiceModal from "./updateService.jsx";

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:9999/manager/service/getlist")
      .then((response) => {
        setServices(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching services");
        setLoading(false);
        console.error("Error fetching services:", error);
      });
  };

  const handleUpdateClick = (service) => {
    setSelectedService(service);
    setShowUpdateModal(true);
  };

  const handleUpdateSuccess = () => {
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 5000);
    fetchData();
  };

  const handleUpdateError = (error) => {
    console.error("Error updating service:", error);
  };

  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(
        `http://localhost:9999/manager/service/delete?id=${selectedService.id}`
      )
      .then(() => {
        setShowDeleteModal(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
        setShowDeleteModal(false);
      });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services.filter(service =>
    service.serviceTitle.toLowerCase().includes(searchValue.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Row md={5} className="title align-center">
        <Col md={6}>
          <h3 className="display-2 text-primary text-uppercase">
            List Services
          </h3>
        </Col>
        <Col md={2} />
        <Col md={4} className="button-container">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/admin/addservice" className="btn btn-primary add-btn">
              Thêm Service
            </Link>
          </div>
        </Col>
      </Row>
      <Row className="flex">
        <Container className="">
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Search by service title"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
              <Row>
                <Col>
                  <table className="table bg-white border">
                    <thead className="bg-light">
                      <tr>
                        <th>User Name</th>
                        <th>Services Name</th>
                        <th>Detail</th>
                        <th>Price</th>
                        <th>Sale Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((service) => (
                        <tr key={service.id}>
                          <td>
                            {typeof service.createdBy === "object"
                              ? `${service.createdBy?.firstName || ""} ${
                                  service.createdBy?.lastName || ""
                                }`
                              : service.createdBy}
                          </td>
                          <td>{service.serviceTitle}</td>
                          <td>{service.serviceDetail}</td>
                          <td>
                            {service.servicePrice}
                          </td>
                          <td>
                            {service.salePrice}
                          </td>
                          <td>
                            <span
                              className={`badge badge-${
                                service.isActive === "ACTIVE" ? "success" : "danger"
                              } rounded-pill d-inline text-${
                                service.isActive === "ACTIVE" ? "success" : "danger"
                              }`}
                            >
                              {service.isActive}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm btn-rounded mr-2"
                              onClick={() => handleUpdateClick(service)}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm btn-rounded ml-2"
                              onClick={() => handleDeleteClick(service)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Pagination
                    current={currentPage}
                    total={services.length}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                  />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </Row>
      {showUpdateModal && (
        <UpdateServiceModal
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          service={selectedService}
          handleUpdateSuccess={handleUpdateSuccess}
          handleUpdateError={handleUpdateError}
        />
      )}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this service?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServicesManager;

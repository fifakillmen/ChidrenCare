import React, { useState, useEffect } from "react";
import "./ServicesManager.css";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateServiceModal from "./updateService.jsx";

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Step 1

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:9999/manager/service/getlist")
      .then((response) => {
        setServices(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const handleUpdateClick = (service) => {
    setSelectedService(service);
    setShowUpdateModal(true);
  };

  const handleUpdateSuccess = () => {
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000); // Tắt thông báo sau 3 giây
    fetchData(); // Cập nhật lại danh sách dịch vụ
  };

  const handleUpdateError = (error) => {
    console.error("Error updating service:", error);
    // Xử lý lỗi ở đây nếu cần
  };

  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };
  

  const handleDeleteConfirm = () => {
    axios
      .delete(`http://localhost:9999/manager/service/delete?id=${selectedService.id}`)
      .then(() => {
        setShowDeleteModal(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
        setShowDeleteModal(false);
      });
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
        <Container className="mt-5 mb-4">
          <Row>
            <Col>
              <table className="table bg-white border">
                <thead className="bg-light">
                  <tr>
                    <th>User Name</th>
                    <th>Category</th>
                    <th>Services Name</th>
                    <th>Detail</th>
                    <th>Price</th>
                    <th>Sale Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td>{`${service.createdBy?.firstName || ""} ${service.createdBy?.lastName || ""}`}</td>

                      <td>{service.category.id}</td>
                      <td>{service.serviceTitle}</td>
                      <td>{service.serviceDetail}</td>
                      <td>{service.servicePrice}</td>
                      <td>{service.salePrice}</td>
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
        </Container>
      </Row>
      {/* Hiển thị modal cập nhật */}
      {showUpdateModal && (
        <UpdateServiceModal
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          service={selectedService}
          handleUpdateSuccess={handleUpdateSuccess}
          handleUpdateError={handleUpdateError} // Thêm handleUpdateError vào đây
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

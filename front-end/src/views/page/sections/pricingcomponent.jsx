/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests

const PricingComponent = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:9999/user/service/getlist")
      // .get("http://localhost:9999/manager/service/getlist")
      .then((response) => {
        setServices(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };
  return (
    <div>
      <div className="pricing8 spacer b-t">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h2 className="title">Service</h2>
              <h6 className="subtitle">Your satisfaction is our joy</h6>
            </Col>
          </Row>
          <Row className="m-t-40">
            {services.slice(0,3).map((service, index) => (
              <Col
                key={index}
                md="4"
                className="ms-auto pricing-box align-self-center"
              >
                <Card className="b-all">
                  <CardBody className="p-30 text-center">
                    <h5>{service.serviceTitle}</h5>
                    <div>
                      <span className="text-dark display-5">
                        ${service.servicePrice}
                      </span>
                      {service.salePrice != 0 && (
                        <div>
                          <h6 className="text-bold display-5">
                            Sale ${service.salePrice}
                          </h6>
                          <br />
                        </div>
                      )}
                    </div>
                  </CardBody>
                  <Link
                    to={`/servicedetail/${service.id}`}
                    className="btn btn-info-gradiant p-15 btn-arrow btn-block"
                  >
                    CHOOSE PLAN
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};


export default PricingComponent;

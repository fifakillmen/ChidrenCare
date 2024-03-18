/* eslint-disable */
import React from 'react';
import { Row, Col, Container, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

const PricingComponent = () => {
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
                        <Col md="4" className="ms-auto pricing-box align-self-center">
                            <Card className="b-all">
                                <CardBody className="p-30 text-center">
                                    <h5>Early Childhood Education Program</h5>
                                    <sup>$</sup><span className="text-dark display-5">1500</span>
                                    <h6 className="font-light font-14">YEARLY</h6>
                                    <p className="m-t-40">The childcare center may provide early childhood education programs for children from preschool age to elementary school age.
                                     This program includes educational activities and interactions between children and teachers, aimed at developing comprehensive skills for children.
                                      Activities may include drawing, music playing, basic English learning, and various educational games.</p>
                                </CardBody>
                                <Link to={`/servicedetail/1`} className="btn btn-info-gradiant p-15 btn-arrow btn-block">CHOOSE PLAN</Link>
                            </Card>
                        </Col>
                        <Col md="4" className="ms-auto pricing-box align-self-center">
                            <Card className="b-all">
                                <CardBody className="p-30 text-center">
                                    <h5>Healthcare and Nutrition Care</h5>
                                    <sup>$</sup><span className="text-dark display-5">49</span>
                                    <h6 className="font-light font-14">YEARLY</h6>
                                    <p className="m-t-40">The center provides healthcare and nutrition care services to ensure the best health and development for children.
                                     This may include balanced meals, diverse and nutritious menus, regular health check-ups, and education on personal hygiene.</p>
                                </CardBody>
                                <a className="btn btn-danger-gradiant p-15 btn-arrow btn-block" href="#">CHOOSE PLAN </a>
                            </Card>
                        </Col>
                        <Col md="4" className="ms-auto pricing-box align-self-center">
                            <Card className="b-all">
                                <CardBody className="p-30 text-center">
                                    <h5>Entertainment and Physical Activity Program</h5>
                                    <sup>$</sup><span className="text-dark display-5">69</span>
                                    <h6 className="font-light font-14">YEARLY</h6>
                                    <p className="m-t-40">The center offers entertainment and physical activity programs for children to help them develop both physically and mentally.
                                     Activities may include morning exercises, extracurricular physical activities, dance or martial arts classes, and even suburban field trips for children
                                      to explore and experience the world around them.</p>
                                </CardBody>
                                <a className="btn btn-info-gradiant p-15 btn-arrow btn-block" href="#">CHOOSE PLAN </a>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default PricingComponent;

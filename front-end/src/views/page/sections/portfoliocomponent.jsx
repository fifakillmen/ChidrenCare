/* eslint-disable */
import React from 'react';
import { Row, Col, Container, Card, CardBody } from 'reactstrap';

import img1 from '../../../assets/images/portfolio/img1.jpg';
import img2 from '../../../assets/images/portfolio/img2.jpg';
import img3 from '../../../assets/images/portfolio/img3.jpg';
import img4 from '../../../assets/images/portfolio/img4.jpg';
import img5 from '../../../assets/images/portfolio/img5.jpg';
import img6 from '../../../assets/images/portfolio/img6.jpg';

const PortfolioComponent = () => {
    return (
        <div>
            <div className="spacer">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h2 className="title">Our off Service</h2>
                            <h6 className="subtitle">Null</h6>
                        </Col>
                    </Row>
                    <Row className="m-t-40">
                        <Col md="4">
                            <Card className="card-shadow">
                                <a href="#" className="img-ho"><img className="card-img-top" src={img1} alt="wrappixel kit" /></a>
                                <CardBody>
                                    <h5 className="font-medium m-b-0">Branding for Theme Designer</h5>
                                    <p className="m-b-0 font-14">Digital Marketing</p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card className="card-shadow">
                                <a href="#" className="img-ho"><img className="card-img-top" src={img2} alt="wrappixel kit" /></a>
                                <CardBody>
                                    <h5 className="font-medium m-b-0">Button Designs Free</h5>
                                    <p className="m-b-0 font-14">Search Engine</p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card className="card-shadow">
                                <a href="#" className="img-ho"><img className="card-img-top" src={img3} alt="wrappixel kit" /></a>
                                <CardBody>
                                    <h5 className="font-medium m-b-0">Branding & Co Agency</h5>
                                    <p className="m-b-0 font-14">Admin templates</p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card className="card-shadow">
                                <a href="#" className="img-ho"><img className="card-img-top" src={img4} alt="wrappixel kit" /></a>
                                <CardBody>
                                    <h5 className="font-medium m-b-0">Zukandre Phoniex</h5>
                                    <p className="m-b-0 font-14">Branding</p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card className="card-shadow">
                                <a href="#" className="img-ho"><img className="card-img-top" src={img5} alt="wrappixel kit" /></a>
                                <CardBody>
                                    <h5 className="font-medium m-b-0">Sionage Mokcup</h5>
                                    <p className="m-b-0 font-14">Wll Mockup</p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card className="card-shadow">
                                <a href="#" className="img-ho"><img className="card-img-top" src={img6} alt="wrappixel kit" /></a>
                                <CardBody>
                                    <h5 className="font-medium m-b-0">Hard Cover Book Mock</h5>
                                    <p className="m-b-0 font-14">Book Covers</p>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default PortfolioComponent;

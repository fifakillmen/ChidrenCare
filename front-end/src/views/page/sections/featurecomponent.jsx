/* eslint-disable */
import React from 'react';
import { Row, Col, Container, Card, CardBody } from 'reactstrap';

import img1 from '../../../assets/images/frontp3_2_1.png';
import img2 from '../../../assets/images/frontp3_2_2.png';
import img3 from '../../../assets/images/frontp3_2_3.png';
import img4 from '../../../assets/images/frontp3_2_4.png';

const FeatureComponent = () => {
    return (
        <div>
            <div className="bg-light spacer feature20 up">
                <Container>
                    <Row className="wrap-feature-20">
                        <Col lg="6">
                            <Card>
                                <Row className="bg-success-gradiant">
                                    <Col md="8">
                                        <CardBody className="d-flex no-block">
                                            <div className="m-r-20"><img src={img1} width="110" className="rounded" alt="img" /></div>
                                            <div>
                                                <h5 className="font-medium text-white">THỜI GIAN LÀM VIỆC</h5>
                                            </div>
                                        </CardBody>
                                    </Col>
                                    <Col md="4" className="text-center">
                                        <a href="#" className="text-white linking bg-success-gradiant">Xem thêm <i className="ti-arrow-right"></i></a>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col lg="6">
                            <Card>
                                <Row className="bg-success-gradiant">
                                    <Col md="8">
                                        <CardBody className="d-flex no-block">
                                            <div className="m-r-20"><img src={img2} width="110" className="rounded" alt="img" /></div>
                                            <div>
                                                <h5 className="font-medium text-white">KHÁM CHẤT LƯỢNG CAO</h5>
                                            </div>
                                        </CardBody>
                                    </Col>
                                    <Col md="4" className="text-center">
                                        <a href="#" className="text-white linking bg-success-gradiant">Lets Talk <i className="ti-arrow-right"></i></a>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col lg="6">
                            <Card>
                                <Row className="bg-success-gradiant">
                                    <Col md="8">
                                        <CardBody className="d-flex no-block">
                                            <div className="m-r-20"><img src={img3} width="110" className="rounded" alt="img" /></div>
                                            <div>
                                                <h5 className="font-medium text-white">QUY TRÌNH KHÁM BỆNH</h5>
                                            </div>
                                        </CardBody>
                                    </Col>
                                    <Col md="4" className="text-center">
                                        <a href="#" className="text-white linking bg-success-gradiant">Lets Talk <i className="ti-arrow-right"></i></a>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col lg="6">
                            <Card>
                                <Row className="bg-success-gradiant">
                                    <Col md="8">
                                        <CardBody className="d-flex no-block">
                                            <div className="m-r-20"><img src={img4} width="110" className="rounded" alt="img" /></div>
                                            <div>
                                                <h5 className="font-medium text-white">TIÊM CHỦNG VACCINE</h5>
                                            </div>
                                        </CardBody>
                                    </Col>
                                    <Col md="4" className="text-center">
                                        <a href="#" className="text-white linking bg-success-gradiant">Lets Talk <i className="ti-arrow-right"></i></a>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default FeatureComponent;

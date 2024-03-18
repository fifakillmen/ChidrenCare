import {Button, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import React from "react";

const Createfeedbacks = () => {
    return (
        <div>
            <div className="spacer bg-light">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">Feedback Form</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="contact1">
                <Container>
                    <Row>
                        <div className="spacer">
                            <Row className="m-0">
                                <Col lg="8">
                                    <div className="contact-box p-r-40">
                                        <h4 className="title">Quick Contact</h4>
                                        <Form>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup className="m-t-15">
                                                        <Input type="text" placeholder="name"/>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup className="m-t-15">
                                                        <Input type="text" placeholder="email"/>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="12">
                                                    <FormGroup className="m-t-15">
                                                        <Input
                                                            type="textarea"
                                                            name="text"
                                                            placeholder="message"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="12">
                                                    <Button
                                                        type="submit"
                                                        className="btn btn-danger-gradiant m-t-20 btn-arrow"
                                                    >
                            <span>
                              {" "}
                                SUBMIT <i className="ti-arrow-right"></i>
                            </span>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </Col>
                                <Col lg="4">
                                    Nhúng bản đồ tại đây
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
export default Createfeedbacks;
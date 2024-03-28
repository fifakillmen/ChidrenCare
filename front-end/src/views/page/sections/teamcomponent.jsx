/* eslint-disable */
import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import SliderComponent from "./SliderComponent";
import GridComponent from "./GridComponent";

const TeamComponent = () => {
    return (
        <div>
            <div className="team2">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h2 className="title text-success">ĐỘI NGŨ CHUYÊN KHOA<br/><br/><br/><br/></h2>

                        </Col>
                    </Row>
                    <div>
                        <Row>
                            <Col lg={6}>
                                <SliderComponent />
                            </Col>
                            <Col lg={1}></Col>
                            <Col lg={5}>
                                <GridComponent />
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default TeamComponent;

import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Container, Row, Col } from 'reactstrap';

const HeaderBanner = () => {
    return (
        <div className="static-slider-head">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="8" md="6" className="align-self-center text-center">
                        <h1 className="title">CHILDREN CARE</h1>
                        <h4 className="subtitle font-light">Your health<br /> is our priority</h4>
                        <Link to="/service" className="btn btn-md m-t-30 btn-info-gradiant font-14">All service</Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HeaderBanner;

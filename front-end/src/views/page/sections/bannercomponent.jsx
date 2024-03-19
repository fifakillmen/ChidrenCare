/* eslint-disable */
import React from 'react';
import { Row, Col, Container } from 'reactstrap';

const BannerComponent = () => {
    return (
        <div>
            <div className="static-slider10">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6" className="align-self-center text-center">
                            <h1 className="title">ONE BILLON People Use Facebook</h1>
                            <h6 className="subtitle op-8">Pellentesque vehicula eros a dui pretium ornare. Phasellus congue vel quam nec luctus.In accumsan at eros in dignissim. Cras sodales nisi nonn accumsan.</h6>
                            <a className="btn btn-outline-light btn-rounded btn-md btn-arrow m-t-20" data-toggle="collapse" href=""><span>Do you Need Help? <i className="ti-arrow-right"></i></span></a>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default BannerComponent;

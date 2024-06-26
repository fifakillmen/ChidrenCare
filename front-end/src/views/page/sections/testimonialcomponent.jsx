import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Card, CardBody } from 'reactstrap';
import axios from 'axios';

const TestimonialComponent = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get('http://localhost:9999/api/feedback/list');

                // Sort testimonials in descending order by createdDate
                const sortedTestimonials = response.data.data.sort((a, b) => {
                    return new Date(b.createdDate) - new Date(a.createdDate);
                });

                // Take the first 3 testimonials (the newest ones)
                setTestimonials(sortedTestimonials.slice(0, 3));
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <div className="testimonial3 spacer bg-light">
            <Container>
                <Row className="justify-content-center">
                    <Col md="7" className="text-center">
                        <h2 className="title">Họ nói gì về chúng tôi</h2>
                        <h6 className="subtitle">Trân trọng cảm ơn quý khách đã ghé thăm website của bệnh viện Nhi Trung ương.</h6>
                    </Col>
                </Row>
                <Row className="testi3 m-t-40 justify-content-center">
                    {testimonials.map((testimonial, index) => (
                        <Col lg="4" md="6" key={index}>
                            <Card className="card-shadow">
                                <CardBody>
                                    <h6 className="font-light m-b-30">"{testimonial.reviewText}"</h6>
                                    <div className="d-flex no-block align-items-center">
                                        <span className="thumb-img"><img src={testimonial.image || "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"} alt="testimonial" className="circle" /></span>
                                        <div className="m-l-20">
                                            <h6 className="m-b-0 customer">{testimonial.fullname}</h6>
                                            <div className="font-10">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <a key={i} className="text-success"><i className="fa fa-star"></i></a>
                                                ))}
                                                {[...Array(5 - testimonial.rating)].map((_, i) => (
                                                    <a key={i} className="text-muted"><i className="fa fa-star"></i></a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default TestimonialComponent;

import { Button, notification, Form, Input, Radio, Row,Rate } from "antd";
import axios from "axios";
import React from "react";
import { Container, Col} from "reactstrap";

const Createfeedbacks = () => {
    const [form] = Form.useForm();

    const handleCreateSubmit = (values) => {
        const payload = {
            fullname: values.fullname,
            emails: values.emails,
            mobile: values.mobile,
            gender: values.gender,
            rating: values.rating,
            reviewText: values.reviewText,
            isActive: "ACTIVE", // Always set to ACTIVE
        };

        axios.post('http://localhost:9999/api/feedback/create', payload)
            .then(res => {
                notification.success({
                    message: "Message",
                    description: "Review has been sent!!!"
                });
                form.resetFields();
            })
            .catch(error => {
                console.log(error);
                notification.error({
                    message: "Error",
                    description: "An error occurred while submitting feedback."
                });
            });
    };

    return (
        <div>
            <div className="spacer bg-light">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">Liên Hệ</h1>
                            <strong>Trân trọng cảm ơn quý khách đã ghé thăm website của bệnh viện Nhi Trung ương. Mọi
                                thông tin chi tiết quý khách vui lòng liên hệ theo địa chỉ sau:</strong><br/><br/>
                            <h2><strong className="text-success">BỆNH VIỆN NHI TRUNG ƯƠNG</strong></h2>
                            <p><strong>Địa chỉ:</strong> 18/879 La Thành – Đống Đa – Hà Nội
                            </p><p><strong>Điện thoại (bộ phận Văn thư):</strong> 024 6273
                            8532 / Fax: O24.6273 8573 | Liên hệ trong giờ hành chính, 7h-16h30, thứ 2 =&gt; thứ 6</p>
                            <p ><strong>Đường dây nóng Chăm sóc khách hàng:</strong> 0865
                                879 879 | Từ 7h – 17h, Thứ 2 đến Chủ Nhật</p>
                            <p><strong>Hotline đặt lịch khám (TTQT):</strong> 0862 33 55 66 /1900 986 803 | Liên hệ
                                24/24h</p>
                            <p><strong>Đường dây phản ánh/khiếu nại dịch vụ:</strong> 0967
                                951 616</p>

                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="contact1 container">
                <Container>
                    <Row>
                        <div className="spacer">
                            <Row className="m-0">
                                <Col lg="7">
                                    <Form form={form} onFinish={handleCreateSubmit}>
                                        <Form.Item name="fullname" label="Full Name" rules={[{ required: true, message: 'Please enter your full name!' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="emails" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="mobile" label="Mobile" rules={[{ required: true, message: 'Please enter your mobile number!' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select your gender!' }]}>
                                            <Radio.Group>
                                                <Radio value="Male">Male</Radio>
                                                <Radio value="Female">Female</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item name="rating" label="Rating" rules={[{ required: true, message: 'Please select a rating!' }]}>
                                            <Rate count={5} />
                                        </Form.Item>
                                        <Form.Item name="reviewText" label="Review Text">
                                            <Input.TextArea />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">Submit Feedback</Button>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col lg="2"></Col>
                                <Col lg="3">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.747903357892!2d105.83667257510446!3d21.002740180640107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac79f99f92fb%3A0x3f36b1fb75b203d8!2zQuG7h25oIHZp4buHbiBC4bqhY2ggTWFpLCBQaMawxqFuZyBNYWksIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1710792565416!5m2!1svi!2s"
                                        width="600"
                                        height="450"
                                        style={{border: 0}}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Createfeedbacks;

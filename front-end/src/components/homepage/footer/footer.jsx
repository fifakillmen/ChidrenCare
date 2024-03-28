import React from 'react';
import { Layout, Row, Col, Divider, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, GooglePlusOutlined, YoutubeOutlined, InstagramOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const CustomFooter = () => {
    return (
        <Footer style={{ background: '#f0f2f5' }}>
            <div style={{ padding: '24px 0', textAlign: 'center' }}>
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={12} md={6}>
                        <h5 className="m-b-20">Address</h5>
                        <p>2R2R+CF Đống Đa, Hà Nội, Việt Nam</p>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h5 className="m-b-20">Phone</h5>
                        <p>Reception :  +205 123 4567 <br />Office :  +207 235 7890</p>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h5 className="m-b-20">Email</h5>
                        <p>Office :  <a href="#" className="link">support.childrencare@gmail.com</a> <br /></p>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h5 className="m-b-20">Social</h5>
                        <Space>
                            <FacebookOutlined />
                            <TwitterOutlined />
                            <GooglePlusOutlined />
                            <YoutubeOutlined />
                            <InstagramOutlined />
                        </Space>
                    </Col>
                </Row>
                <Divider />
                <div className="d-flex font-14 justify-content-between">
                    <div className="links ms-auto m-t-10 m-b-10">
                        <a href="#" className="p-10 p-l-0">Terms of Use</a>
                        <a href="#" className="p-10">Legal Disclaimer</a>
                        <a href="#" className="p-10">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </Footer>
    );
}

export default CustomFooter;

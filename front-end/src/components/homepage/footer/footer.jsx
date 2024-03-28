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
                        <h5 className="m-b-20">Địa Chỉ</h5>
                        <p>Địa chỉ: 18/879 La Thành – Đống Đa – Hà Nội</p>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h5 className="m-b-20">Số Điện Thoại</h5>
                    <p><strong>Điện thoại (bộ phận Văn thư):</strong> 024 6273
                    8532 / Fax: O24.6273 8573 | Liên hệ trong giờ hành chính, 7h-16h30, thứ 2 =&gt; thứ 6</p>
                    <p ><strong>Đường dây nóng Chăm sóc khách hàng:</strong> 0865
                        879 879 | Từ 7h – 17h, Thứ 2 đến Chủ Nhật</p>
                    <p><strong>Hotline đặt lịch khám (TTQT):</strong> 0862 33 55 66 /1900 986 803 | Liên hệ
                        24/24h</p>
                    <p><strong>Đường dây phản ánh/khiếu nại dịch vụ:</strong> 0967
                        951 616</p>
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

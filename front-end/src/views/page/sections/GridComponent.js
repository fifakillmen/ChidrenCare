import React from 'react';
import { Row, Col } from 'antd';

const GridComponent = () => {
    return (
        <div> {/* Wrapper div để điều chỉnh kích thước toàn bộ grid */}
            <Row>
                <Col span={12}> {/* Chiếm 1/2 chiều rộng */}
                    <img src="https://benhviennhitrunguong.gov.vn/wp-content/uploads/2021/07/PGS.TS-PHAN-DUY-HIEN.jpg" alt="image" style={{ width: '90%',margin:'50px', borderRadius: '10px' }} />
                </Col>
                <Col span={12}> {/* Chiếm 1/2 chiều rộng */}
                    <img src="https://benhviennhitrunguong.gov.vn/wp-content/uploads/2021/07/TS.BS-CAO-VIET-TUNG.jpg" alt="image" style={{ width: '90%',margin:'50px', borderRadius: '10px' }} />
                </Col>
            </Row>
            <Row>
                <Col span={12}> {/* Chiếm 1/2 chiều rộng */}
                    <img src="https://benhviennhitrunguong.gov.vn/wp-content/uploads/2021/07/TS.BS-PHAN-HUU-PHUC.jpg" alt="image" style={{ width: '90%',margin:'50px', borderRadius: '10px' }} />
                </Col>
                <Col span={12}>  {/* Chiếm 1/2 chiều rộng */}
                    <img src="https://benhviennhitrunguong.gov.vn/wp-content/uploads/2021/07/VU-CHI-DUNG.jpg" alt="image" style={{ width: '90%',margin:'50px', borderRadius: '10px' }} />
                </Col>
            </Row>
        </div>
    );
};

export default GridComponent;

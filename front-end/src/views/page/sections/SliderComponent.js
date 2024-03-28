import React, { useState } from 'react';
import { Carousel } from 'antd';

const SliderComponent = () => {
    const [images] = useState([
        {
            src: 'https://benhviennhitrunguong.gov.vn/wp-content/uploads/2021/07/PGS.TS-PHAN-DUY-HIEN.jpg',
            title: 'PGS. TS Phạm Duy Hiền', // Chức vụ
            name: 'Phó giám đốc bệnh viện' // Tên
        },
        {
            src: 'https://benhviennhitrunguong.gov.vn/wp-content/uploads/2021/07/TS.BS-CAO-VIET-TUNG.jpg',
            title: 'TS.BS Cao Việt Tùng', // Chức vụ
            name: 'Phó giám đốc bệnh viện' // Tên
        },
        {
            src: 'https://benhviennhitrunguong.gov.vn/wp-content/uploads/2021/07/TS.BS-PHAN-HUU-PHUC.jpg',
            title: 'TS.BS Phan Hữu Phúc', // Chức vụ
            name: 'Phó giám đốc bệnh viện' // Tên
        },
        {
            src: 'https://benhviennhitrunguong.gov.vn/wp-content/uploads/2021/07/VU-CHI-DUNG.jpg',
            title: 'PGS. TS Vũ Chí Dũng', // Chức vụ
            name: 'Giám đốc Trung tâm Nội tiết -Chuyển hóa -Di truyền và Liệu pháp phân tử' // Tên
        },

    ]);

    return (
        <Carousel autoplay>
            {images.map((image, index) => (
                <div key={index}> {/* Sử dụng div để chứa cả ảnh và thông tin */}
                    <img src={image.src} alt="slider" style={{ border: '1px solid #ddd' }} />
                    <div style={{ textAlign: 'center'}}>  {/* Thông tin được canh giữa */}
                        <b>{image.title}</b>
                        <p>{image.name}</p>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default SliderComponent;

import React, { useState } from 'react';
import Slider from 'react-slick';
// import './style.css';

const images = [
    {
        id: 1,
        src: 'https://image.example.com/1.jpg',
        title: 'Tiêu đề ảnh 1',
        description: 'Mô tả ảnh 1',
    },
    {
        id: 2,
        src: 'https://image.example.com/2.jpg',
        title: 'Tiêu đề ảnh 2',
        description: 'Mô tả ảnh 2',
    },
    // ...
];

const Test = () => {
    const [currentImage, setCurrentImage] = useState(images[0]);

    const handleImageClick = (image) => {
        setCurrentImage(image);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (currentSlide) => {
            setCurrentImage(images[currentSlide]);
        },
    };

    return (
        <div className="container">
            <div className="slider-wrapper">
                <Slider {...settings}>
                    {images.map((image) => (
                        <div key={image.id} className="slide">
                            <img src={image.src} alt={image.title} />
                            <p>{image.description}</p>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="image-list">
                {images.map((image) => (
                    <div key={image.id} className="image-item" onClick={() => handleImageClick(image)}>
                        <img src={image.src} alt={image.title} />
                    </div>
                ))}
            </div>
            <div className="current-image">
                <img src={currentImage.src} alt={currentImage.title} />
                <h2>{currentImage.title}</h2>
                <p>{currentImage.description}</p>
            </div>
        </div>
    );
};

export default Test;

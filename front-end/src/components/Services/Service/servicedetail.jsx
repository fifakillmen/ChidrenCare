import React from 'react';
import { useParams, Link } from 'react-router-dom';
import blog2Image from '../../../assets/images/Images/image.png';

import FormBannerComponent from "../../../views/page/sections/formbannercomponent";
import Footer from "../../../components/homepage/footer/footer";
import Header from "../../../components/homepage/header/header";
import './servicedetail.css';
// import FormBannerComponent from "./sections/formbannercomponent";
// import Home from "./views/page/Home";

const ServiceDetail = () => {
  const { id } = useParams();

  const services = [
    {
      id: '1',
      title: 'Early Childhood Education Program',
      description: 'The childcare center may provide early childhood education programs for children from preschool age to elementary school age. This program includes educational activities and interactions between children and teachers, aimed at developing comprehensive skills for children. Activities may include drawing, music playing, basic English learning, and various educational games.',
      price: '1500$'
    },
    {
      id: '2',
      title: 'Service 2',
      description: 'This is the detailed description of Service 2. It includes all the features and benefits of this service.',
    },
    {
      id: '3',
      title: 'Service 3',
      description: 'This is the detailed description of Service 3. It includes all the features and benefits of this service.',
    },
    {
      id: '4',
      title: 'Service 4',
      description: 'This is the detailed description of Service 4. It includes all the features and benefits of this service.',
    },
  ];

  const service = services.find(service => service.id === id);

  if (!service) {
    return <div>Service not found!</div>;
  }

  return (
    <div>
      <Header/>
      <div className="single-blog-card ">
        <div className="card-thumb">
          <img src={blog2Image} className='mt-150' alt="" />
        </div>
        <div className="card-content text-start">
          <h3>{service.title}</h3>
          <span>{service.price}</span>
          <div className="card-meta d-flex justify-content-between">
            <span>{service.description}</span>
            
          </div>
          {/* Thêm Link để dẫn đến ServiceDetail */}
          <Link to={`/servicedetail/${id}`} className="btn btn-info-gradiant p-15 mt-10 btn-arrow btn-block">CHOOSE PLAN</Link>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default ServiceDetail;

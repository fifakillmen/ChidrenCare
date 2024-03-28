import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import blog2Image from "../../../assets/images/Images/image.png";
import Footer from "../../../components/homepage/footer/footer";
import Header from "../../../components/homepage/header/header";
import "./servicedetail.css";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = () => {
    axios
      .get(`http://localhost:9999/user/service/detail?id=${id}`)
      .then((response) => {
        setService(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching service:", error);
      });
  };

  const toggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  const serviceDetailWords = service.serviceDetail.split(" ");
  const shouldShowReadMore = serviceDetailWords.length > 50;
  const displayedDescription = shouldShowReadMore
    ? serviceDetailWords.slice(0, 50).join(" ") + "..."
    : service.serviceDetail;

  return (
    <div>
      <Header />
      <div className="single-blog-card">
        <div className="card-thumb">
          <img src={service.thumbnail} className="mt-150" alt="image" />
        </div>
        <div className="card-content text-start mt-4">
          <h3 className="serviceTitle">{service.serviceTitle}</h3>
          <div>
            {service.salePrice ? (
              <>
                {service.salePrice != 0 && (
                  <div>
                    <span className="salePrice">$ {service.salePrice}</span>
                    <span
                      className="servicePrice"
                      style={{ textDecoration: "line-through" }}
                    >
                      {service.servicePrice}
                    </span>
                  </div>
                )}
                {service.salePrice == 0 && (
                  <span className="servicePrice"> ${service.servicePrice}</span>
                )}
              </>
            ) : (
              <span className="servicePrice"> $ {service.servicePrice}</span>
            )}
            
          </div>
          <hr />
          <span>{displayedDescription}</span>
          {showFullDescription && <span>{service.serviceDetail}</span>}
          {shouldShowReadMore && (
            <span className="read-more" onClick={toggleShowFullDescription}>
              {showFullDescription ? "Read Less" : "Read More"}
            </span>
          )}
          <div className="card-meta d-flex justify-content-between">
            <span>{service.description}</span>
          </div>
          <Link
            to={`/servicedetail/${id}`}
            className="btn btn-info-gradiant p-15 mt-10 btn-arrow btn-block"
          >
            CHOOSE PLAN
          </Link>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default ServiceDetail;

import React from "react";
import Header from "../../components/homepage/header/header";
import Footer from "../../components/homepage/footer/footer";
import PricingComponent from "./sections/pricingcomponent";
import TeamComponent from "./sections/teamcomponent";
import TestimonialComponent from "./sections/testimonialcomponent";
import BlogComponent from "./sections/blogcomponent";
import PropTypes from "prop-types";
import Banner from "../../components/homepage/banner/banner";
import FeatureComponent from "./sections/featurecomponent";


const Home = () => {
    return (
        <div id="main-wrapper">
            <Header/>
            <div className="page-wrapper">
                <div className="container-fluid">
                    <Banner/>
                    <FeatureComponent/>
                    <PricingComponent/>
                    <TeamComponent/>
                    <TestimonialComponent/>
                    <BlogComponent/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};
Home.prototype = {
    classes: PropTypes.object
};
export default Home;
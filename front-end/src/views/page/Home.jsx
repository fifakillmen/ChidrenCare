import React from "react";
import Header from "../../components/homepage/header/header";
import Footer from "../../components/homepage/footer/footer";
import FormBannerComponent from "./sections/formbannercomponent";
import PricingComponent from "./sections/pricingcomponent";
import TeamComponent from "./sections/teamcomponent";
import TestimonialComponent from "./sections/testimonialcomponent";
import BlogComponent from "./sections/blogcomponent";
import ContactComponent from "./sections/contactcomponent";
import CallToAction from "../../components/homepage/call-to-action/CallToAction";
import PropTypes from "prop-types";
import BannerComponent from "./sections/bannercomponent";
import Banner from "../../components/homepage/banner/banner";


const Home = () => {

    return (
        <div id="main-wrapper">
            <Header/>
            <div className="page-wrapper">
                <div className="container-fluid">
                    <Banner/>
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
import Header from "../../components/homepage/header/header";
import Footer from "../../components/homepage/footer/footer";
import PropTypes from "prop-types";
import React from "react";
import Createfeedbacks from "../../components/homepage/Feedback/createfeedbacks";

const CreateFeedback = () => {

    return (
        <div id="main-wrapper">
            <Header/>
            <div className="page-wrapper">
                <div className="container-fluid">
                    <Createfeedbacks/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};
CreateFeedback.prototype = {
    classes: PropTypes.object
};
export default CreateFeedback;
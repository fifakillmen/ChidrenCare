import Header from "../../components/homepage/header/header";
import Footer from "../../components/homepage/footer/footer";
import PropTypes from "prop-types";
import React from "react";
import Createchildrens from "../../components/homepage/children/createchildrens";

const CreateChildren = () => {

    return (
        <div id="main-wrapper">
            <Header/>
            <div className="page-wrapper">
                <div className="container-fluid">
                    <Createchildrens />
                </div>
            </div>
            <Footer/>
        </div>
    );
};
CreateChildren.prototype = {
    classes: PropTypes.object
};
export default CreateChildren;
import PropTypes from "prop-types";
import React from "react";
import FullLayout from "../../layouts/FullLayout";

const Admin = () => {
    return (
        <div id="admin">
            <FullLayout/>
        </div>
    );
};
Admin.prototype = {
    classes: PropTypes.object
};
export default Admin;
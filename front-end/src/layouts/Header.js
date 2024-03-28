import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";
import { getUserInfoFromCookie, deleteCookies, getAccessToken } from '../services/cookeiService'
import UserProfileComponent from '../components/User/UserProfileComponent';
import ChangePasswordComponent from '../components/Authorization/ChangePasswordComponent';


const Header = () => {
  const userInfor = getUserInfoFromCookie();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const handleLogout = () => {
    deleteCookies('accessToken');
    deleteCookies('userInfo');
    window.location.reload();
  };
  const toggleProfileModal = () => {
    setIsProfileModalVisible(!isProfileModalVisible);
  };
  const toggleChangePasswordModal = () => {
    setIsChangePasswordModalVisible(!isChangePasswordModalVisible);
  };
  return (
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Logo />
        </div>
        <NavbarBrand href="/">
          <LogoWhite className=" d-lg-none" />
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/#" className="nav-link">
              Home
            </Link>
          </NavItem>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={userInfor.avatar}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem onClick={toggleProfileModal}>Edit Profile</DropdownItem>

            <DropdownItem onClick={toggleChangePasswordModal}>Change Password</DropdownItem>

            <DropdownItem divider />
            <DropdownItem>My Balance</DropdownItem>
            <DropdownItem>Inbox</DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
      <div> {/* Render UserProfileComponent inside the return statement */}
        {isProfileModalVisible && (
          <UserProfileComponent visible={isProfileModalVisible} onClose={toggleProfileModal} />
        )}
      </div>
      <div> {/* Render UserProfileComponent inside the return statement */}
        {isChangePasswordModalVisible && (
          <ChangePasswordComponent visible={isChangePasswordModalVisible} onClose={toggleChangePasswordModal} />
        )}
      </div>
    </Navbar>
  );
};

export default Header;

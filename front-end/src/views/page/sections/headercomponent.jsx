/* eslint-disable */
import React, { useState } from 'react';
import { Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, NavbarBrand, Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';

import logo from '../../../assets/images/logos/green-logo.png';
import logo2 from '../../../assets/images/logos/white-logo.png';

const HeaderComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div id="section">
            <div className="header1 po-relative">
                <Container>
                    <Navbar className="navbar-expand-lg h1-nav">
                        <NavbarBrand href="#"><img src={logo} alt="wrapkit" /></NavbarBrand>
                        <NavbarToggler onClick={toggle}><span className="ti-menu"></span></NavbarToggler>
                        <Collapse isOpen={isOpen} navbar id="header1">
                            <Nav navbar className="ms-auto mt-2 mt-lg-0">
                                <NavItem className="active"><NavLink href="#">Home</NavLink></NavItem>
                                <NavItem><NavLink href="#">About Me</NavLink></NavItem>
                                <NavItem><NavLink href="#">Work</NavLink></NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav>
                                        Services <i className="fa fa-angle-down m-l-5"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="b-none animated fadeInUp">
                                        <DropdownItem>Action</DropdownItem>
                                        <DropdownItem>Another action</DropdownItem>
                                        <DropdownItem>Something else here</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Something else here</DropdownItem>
                                        <DropdownItem>Separated link</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>One more separated link</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem><NavLink href="#">Freebies</NavLink></NavItem>
                                <NavItem><a className="btn btn-outline-success" href="#">Hire Me</a></NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Container>
            </div>
        </div>
    );
}

export default HeaderComponent;

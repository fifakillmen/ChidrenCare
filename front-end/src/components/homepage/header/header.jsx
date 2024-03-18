/* eslint-disable */
import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {
    Container,
    NavbarBrand,
    Navbar,
    Nav,
    NavItem,
    NavbarToggler,
    Collapse,
    NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import logo from '../../../assets/images/logos/green-logo.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    /*--------------------------------------------------------------------------------*/
    /*To open NAVBAR in MOBILE VIEW                                                   */
    /*--------------------------------------------------------------------------------*/

    return (
        <div >
            <div className="topbar" id="top">
                <div className="header6">
                    <Container className="po-relative">
                        <Navbar className="navbar-expand-lg h1-nav h4">
                            <NavbarBrand href="/"><img src={logo} alt="wrapkit"/></NavbarBrand>
                            <NavbarToggler onClick={toggle}><span className="ti-menu"></span></NavbarToggler>
                            <Collapse isOpen={isOpen} navbar id="header1">
                                <Nav navbar className="ms-auto mt-2 mt-lg-0">
                                    <NavItem className="active"><NavLink href="/">Home</NavLink></NavItem>
                                    <NavItem><NavLink href="#">About Me</NavLink></NavItem>
                                    <NavItem><NavLink href="/admin">Admin</NavLink></NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav>
                                            Services <i className="fa fa-angle-down m-l-5"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="b-none animated fadeInUp">
                                            <DropdownItem>Action</DropdownItem>
                                            <DropdownItem>Another action</DropdownItem>
                                            <DropdownItem>Something else here</DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem>Something else here</DropdownItem>
                                            <DropdownItem>Separated link</DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem>One more separated link</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <NavItem><NavLink href="/feedback">Feedback</NavLink></NavItem>
                                    <NavItem><a className="btn btn-outline-success" href="#">Login</a></NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Container>
                </div>
            </div>
        </div>
    );

}
export default Header;

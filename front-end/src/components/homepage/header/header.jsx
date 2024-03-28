import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { getUserInfoFromCookie,deleteCookies } from '../../../services/cookeiService'
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

import logo from '../../../assets/images/Images/logo (1).png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const userInfo = getUserInfoFromCookie(); // Lấy thông tin người dùng từ cookie

    useEffect(() => {
        // Kiểm tra xem userInfo có dữ liệu hay không để cập nhật trạng thái isLoggedIn
        if (userInfo && Object.keys(userInfo).length !== 0) {
            console.log(userInfo.email);
            setIsLoggedIn(true);
        }
    }, [userInfo]); // Chỉ chạy effect khi userInfo thay đổi

    const handleLogout = () => {
        deleteCookies('accessToken');
        deleteCookies('userInfo');
        window.location.reload();
    };

    /*--------------------------------------------------------------------------------*/
    /*To open NAVBAR in MOBILE VIEW                                                   */
    /*--------------------------------------------------------------------------------*/

    return (
            <div id="section">
                <div className="header1 po-relative">
                    <Container>
                        <Navbar className="navbar-expand-lg h1-nav h5">
                            <NavbarBrand href="/"><img src={logo} alt="wrapkit" /></NavbarBrand>
                            <NavbarToggler onClick={toggle}><span className="ti-menu"></span></NavbarToggler>
                            <Collapse isOpen={isOpen} navbar id="header1">
                                <Nav navbar className="ms-auto mt-2 mt-lg-0">
                                    <NavItem className="active"><NavLink href="/">Home</NavLink></NavItem>
                                    <NavItem><NavLink href="#">About Me</NavLink></NavItem>
                                    {userInfo && userInfo.roles && userInfo.roles.some(role => role.name === "ADMIN") && // Kiểm tra nếu có vai trò là ADMIN thì hiển thị link Admin
                                        <NavItem><NavLink href="/admin">Admin</NavLink></NavItem>
                                    }
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
                                    <NavItem><NavLink href="/feedback">Feedback</NavLink></NavItem>
                                    {isLoggedIn ? ( // Nếu người dùng đã đăng nhập
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                                {userInfo.email} {/* Hiển thị tên người dùng hoặc thông tin khác */}
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem>
                                                    <Link to="/profile">Profile</Link> {/* Link tới trang Profile */}
                                                </DropdownItem>
                                                <DropdownItem><Link to="/children">Children Manager</Link></DropdownItem>
                                                <DropdownItem onClick={handleLogout}>Logout</DropdownItem> {/* Xử lý logout */}
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    ) : (
                                        <NavItem><a className="btn btn-outline-success" href="/auth/login">Login</a></NavItem>
                                    )}                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Container>
                </div>
            </div>
    );

}
export default Header;

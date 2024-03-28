import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { getUserInfoFromCookie, deleteCookies } from '../../../services/cookeiService'
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
import UserProfileComponent from '../../../components/User/UserProfileComponent';



import logo from '../../../assets/images/Images/logo (1).png';
import ChangePasswordComponent from '../../Authorization/ChangePasswordComponent';
import { logout } from '../../../services/authService';
import '../../../assets/scss/app.scss'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const userInfo = getUserInfoFromCookie(); // Lấy thông tin người dùng từ cookie
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
    const [isToggleChangePassWordModal, setIsToggleChangePassWordModal] = useState(false);


    useEffect(() => {
        // Kiểm tra xem userInfo có dữ liệu hay không để cập nhật trạng thái isLoggedIn
        if (userInfo && Object.keys(userInfo).length !== 0) {
            console.log(userInfo.email);
            setIsLoggedIn(true);
        }
    }, [userInfo]); // Chỉ chạy effect khi userInfo thay đổi

    const handleLogout = () => {
        logout();
    };

    const toggleProfileModal = () => {
        setIsProfileModalVisible(!isProfileModalVisible);
    };
    const toggleChangePassWordModal = () => {
        setIsToggleChangePassWordModal(!isToggleChangePassWordModal);
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
                                    <NavItem className="active"><NavLink href="/">Trang Chủ</NavLink></NavItem>
                                    {userInfo && userInfo.roles && userInfo.roles.some(role => role.name === "ADMIN") && 
                                        <NavItem><NavLink href="/admin/starter">Admin</NavLink></NavItem>
                                    }
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav>
                                            Dịch Vụ <i className="fa fa-angle-down m-l-5"></i>
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
                                    <NavItem><NavLink href="/feedback">Liên hệ</NavLink></NavItem>
                                    {isLoggedIn ? ( // Nếu người dùng đã đăng nhập
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                                {userInfo.fname} {userInfo.lname}
                                            </DropdownToggle>
                                            <DropdownMenu end>
                                                <DropdownItem onClick={toggleProfileModal}>Edit Profile</DropdownItem>
                                                <DropdownItem onClick={toggleChangePassWordModal}>Change Password</DropdownItem>
                                                <DropdownItem><Link to="/children" className="no-underline">Children Manager</Link></DropdownItem>
                                                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    ) : (
                                        <NavItem><a className="btn btn-outline-success" href="/auth/login">Login</a></NavItem>
                                    )}
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Container>
                </div>
                {isProfileModalVisible && (
                    <UserProfileComponent visible={isProfileModalVisible} onClose={toggleProfileModal} />
                )}
                {isToggleChangePassWordModal && (
                    <ChangePasswordComponent visible={isToggleChangePassWordModal} onClose={toggleChangePassWordModal} />
                )}
            </div>
    );
}
export default Header;

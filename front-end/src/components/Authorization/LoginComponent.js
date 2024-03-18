import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { login } from '../../services/authService'
import { getAccessToken,getDataFromCookies, saveToCookies, deleteCookies, setUserInfoToCookie, getUserInfoFromCookie } from '../../services/cookeiService'

import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { redirect } from 'react-router';

const Card = styled(MDBCard)`
    width: 60%;
    margin: 0 auto;
    margin-top: 100px;
    `;

const LoginComponent = () => {
    // state account
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async () => {
        await login(email, password); 
      const accessToken=  getDataFromCookies('accessToken');
        if (accessToken!=null) {
            const userInfo = getUserInfoFromCookie();
            if (userInfo && userInfo.roles) { 
                const isAdmin = userInfo.roles.some(role => role.name === "ADMIN");
                if (isAdmin) {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/";
                }
            }
        } else {
            message.error('Login failed');
        }
    };
    
    return (
        <Card>
            <MDBContainer fluid className='p-4'>

                <MDBRow>

                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                            The best offer <br />
                            <span className="text-primary">for your Children healthy</span>
                        </h1>

                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                            quibusdam tempora at cupiditate quis eum maiores libero
                            veritatis? Dicta facilis sint aliquid ipsum atque?
                        </p>

                    </MDBCol>

                    <MDBCol md='6'>

                        <MDBCard className='my-5'>
                            <MDBCardBody className='p-5'>
                                <h4>
                                    <p>Login</p>
                                </h4>
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={() => {
                                        handleLogin();
                                    }}
                                    onFinishFailed={(errorInfo) => {
                                        message.error('Login failed. Please check your email and password.');
                                    }}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter your email",
                                            },
                                            { type: "email", message: "Please enter a valid email" },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Type your email" />
                                    </Form.Item>

                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                            {
                                                pattern: new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,20})$/),
                                                message: "Please enter a valid password"
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder="Type your password" />
                                    </Form.Item>

                                    <Form.Item wrapperCol={{ span: 24 }}>
                                        <Button block type="primary" htmlType="submit" >
                                            Login
                                        </Button>
                                    </Form.Item>
                                    <Form.Item >
                                        <a href='/auth/forgotpassword'>Forgot password?</a>
                                    </Form.Item>
                                    <Form.Item >
                                        <a href='/auth/verifyemail'>Verify email?</a>
                                    </Form.Item>
                                </Form>

                                <div className="text-center">

                                    <p>or sign up with:</p>

                                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                        <MDBIcon fab icon='facebook-f' size="sm" />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                        <MDBIcon fab icon='twitter' size="sm" />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                        <MDBIcon fab icon='google' size="sm" />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                        <MDBIcon fab icon='github' size="sm" />
                                    </MDBBtn>

                                </div>

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </Card >

    )
}

export default LoginComponent
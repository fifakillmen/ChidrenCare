import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
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
import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import { forgotPassword } from '../../services/accountService'
const Card = styled(MDBCard)`
    width: 60%;
    margin: 0 auto;
    margin-top: 100px;
    `;
const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState('')

    const handleForgotPassword = async () => {
        try {
            const response = await forgotPassword(email);
            const data = response.data;
            if (data.status === 'OK') {
                notification.success(
                    {
                        message: "Message",
                        description: "The password reset link has been sent in your email"
                    })
            } else if (data.status === 'NOT_FOUND') {
                notification.error(
                    {
                        message: "Message",
                        description: data.message
                    })
            }
        } catch (error) {
            notification.error(
                {
                    message: "Message",
                    description: error.message
                })
        }
    }
    return (
        <Card>
            <MDBContainer fluid className='p-4'>

                <MDBRow>

                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                            The best offer <br />
                            <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your children healthy</span>
                        </h1>

                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                            Our mission is to empower you with the knowledge and tools you need to make informed decisions about your health and take proactive steps towards a happier, healthier life. With our comprehensive approach to health consulting, we aim to help you achieve long-lasting results and improve your overall quality of life.
                        </p>

                    </MDBCol>

                    <MDBCol md='6'>

                        <MDBCard className='my-5'>
                            <MDBCardBody className='p-5'>
                                <h4>
                                    <p>Forgot Password</p>
                                </h4>
                                <Form
                                    autoComplete="off"
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}
                                    onFinish={() => {
                                        handleForgotPassword();
                                    }}
                                    onFinishFailed={(error) => {
                                    }}
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
                                    <Form.Item wrapperCol={{ span: 24 }}>
                                        <Button block type="primary" htmlType="submit" >
                                            Forgot Password
                                        </Button>
                                    </Form.Item>
                                    <Form.Item >
                                        <a href='/auth/login'>Login</a>
                                    </Form.Item>
                                    <Form.Item >
                                        <a href='/auth/signup'>Sign up</a>
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

export default ForgotPasswordComponent
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
import { useParams } from 'react-router-dom';
import { changePasswordWithToken } from '../../services/accountService';

const Card = styled(MDBCard)`
    width: 60%;
    margin: 0 auto;
    margin-top: 100px;
    `;
const modalStyle = {
    maxWidth: '500px',
};

const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const formStyle = {
    width: '100%',
};

const formItemStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
};

const inputStyle = {
    flex: '1',
    width: '100%',
};

const submitButtonStyle = {
    textAlign: 'right',
};
const ChangePasswordWithTokenComponent = () => {
    const [changePasswordToken, setchangePasswordToken] = useState('');
    const [currentpassword, setCurrentpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');

    const { token } = useParams();
    useEffect(() => {
        setchangePasswordToken(token);
    }, [token]);
    const handleChangePassword = async () => {
        try {
            const response = await changePasswordWithToken(changePasswordToken, newpassword);
            if (response && response.data && response.data.status === 'OK') {
                notification.success({
                    message: "Message",
                    description: "Change password Success!!!"
                });
            } else {
                notification.error({
                    message: "Message",
                    description: response.data.message
                });
            }
        } catch (error) {
            message.error('An error occurred: ' + error.message);
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
                                    <p>Change Password</p>
                                </h4>
                                <Form
                                    autoComplete="off"
                                    onFinish={handleChangePassword}
                                >
                                    <Form.Item style={{ display: 'none' }}>
                                        <Input
                                            value={changePasswordToken}
                                            style={inputStyle}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="newpassword"
                                        label="New Password"
                                        rules={[
                                            { required: true },
                                            {
                                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,20}$/,
                                                message: 'Please enter a valid password',
                                            },
                                        ]}
                                        hasFeedback
                                        style={formItemStyle}
                                    >
                                        <Input.Password
                                            onChange={(e => { setNewpassword(e.target.value) })}
                                            placeholder="Type your new password"
                                            style={inputStyle}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="cfpassword"
                                        label="Confirm New Password"
                                        dependencies={['newpassword']}
                                        rules={[
                                            { required: true },
                                            {
                                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,20}$/,
                                                message: 'Please enter a valid password',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('newpassword') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(
                                                        'The two passwords that you entered do not match.'
                                                    );
                                                },
                                            }),
                                        ]}
                                        hasFeedback
                                        style={formItemStyle}
                                    >
                                        <Input.Password
                                            placeholder="Confirm your new password"
                                            style={inputStyle}
                                        />
                                    </Form.Item>
                                    <Form.Item style={submitButtonStyle}>
                                        <Button type="primary" htmlType="submit">
                                            Change password
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

export default ChangePasswordWithTokenComponent
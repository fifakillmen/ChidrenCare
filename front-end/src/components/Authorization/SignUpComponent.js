import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { createAccount, verifyEmail, resendVerifyEmail } from '../../services/accountService'
import { createUser } from '../../services/userService'
import { login } from '../../services/authService'
import { getAccessToken,getDataFromCookies, saveToCookies, deleteCookies } from '../../services/cookeiService'
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, } from 'mdb-react-ui-kit';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

import {
    Row,
    Col,
    Button,
    Checkbox,
    DatePicker,
    Form,
    Select,
    Upload,
    Input,
    message
} from 'antd';

const Card = styled(MDBCard)`
  width: 60%;
  margin: 0 auto;
  margin-top: 100px;
  `;

const SignUpComponent = () => {
    const [verifyCode, setVerifyCode] = useState('')
    const [isCreated, setIsCreated] = useState(false)
    const [afterLogin, setAfterLogin] = useState(false)
    // state account
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // state user
    const [fName, setfName] = useState('')
    const [lName, setlName] = useState('')
    const [dob, setDob] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')
    const [avatarFile, setAvatarFile] = useState('');



    const handleImageUpload = (info) => {
        const file = info.file.originFileObj;
        setAvatarFile(file);
    };


    const resendVerifyCode = () => {
        resendVerifyEmail(email).then(
            response => {
                const data = response.data;
                if (data.status === 'OK') {
                    message.info('New code sended to your email')
                } else {
                    message.error(data.message)
                }
            }
        );
    };


    const handleCreateAccount = () => {
        createAccount(email, password)
            .then(response => {
                const data = response.data;
                if (data.status === 'OK') {
                    setIsCreated(true);
                } else {
                    message.error(data.message)
                }
            })
            .catch(error => {
                message.error('An error occurred 1');
            })

    }
    const handleVerify = () => {
        verifyEmail(email, verifyCode)
            .then(response => {
                const data = response.data;
                if (data.data === true) {
                    // sau khi verify thanh cong thi login luon 
                    login(email, password);
                    if (getAccessToken()) {
                        setAfterLogin(true);
                    } else {
                        message.error('login fail')
                    }
                }
            })
            .catch(error => {
                message.error('An error occurred 2');
            })
    }
    const handleUpdateInformation = () => {
        createUser(fName, lName, dob, phone, email, address, gender, avatarFile)
            .then(response => {
                if (response && response.data && response.data.status === 'OK') {
                    setIsCreated(true);
                    // chuyển đến trang home
                    window.location.href = "/";
                } else {
                    message.error('An error occurred 3. No valid user ID found in the response.');
                }
            })
            .catch(error => {
                message.error('An error occurred 4: ' + error.message);
            });
    };  
    

    return (
        <div>
            <Card>
                <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' >

                    <MDBRow>

                        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                                The best offer <br />
                                <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your children healthy</span>
                            </h1>

                            <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
                                Our mission is to empower you with the knowledge and tools you need to make informed decisions about your health and take proactive steps towards a happier, healthier life. With our comprehensive approach to health consulting, we aim to help you achieve long-lasting results and improve your overall quality of life.
                            </p>

                        </MDBCol>

                        <MDBCol md='6' className='position-relative'>

                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <MDBCard className='my-5 bg-glass'>
                                <MDBCardBody className='p-5'>
                                    {afterLogin && (
                                        <div>
                                            <h4>
                                                <p>User information</p>
                                            </h4>

                                            <Form
                                                autoComplete="off"
                                                labelCol={{ span: 10 }}
                                                wrapperCol={{ span: 14 }}
                                                onFinish={() => {
                                                    handleUpdateInformation();
                                                }}
                                                onFinishFailed={(error) => {
                                                }}
                                            >
                                                <Form.Item
                                                    name="fName"
                                                    label="First Name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter your name",
                                                        },
                                                        {
                                                            pattern: new RegExp(/^[a-zA-Z\s]{2,25}$/),
                                                            message: "Please enter a valid first name"
                                                        },

                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input onChange={(e) => setfName(e.target.value)}
                                                        placeholder="Type your first name" />
                                                </Form.Item>
                                                <Form.Item
                                                    name="lName"
                                                    label="Last Name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter your last name",
                                                        },
                                                        {
                                                            pattern: new RegExp(/^[a-zA-Z\s]{2,25}$/),
                                                            message: "Please enter a valid last name"
                                                        },

                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input
                                                        onChange={(e) => setlName(e.target.value)}
                                                        placeholder="Type your last name" />
                                                </Form.Item>

                                                <Form.Item
                                                    name="address"
                                                    label="Address"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter your address",
                                                        },
                                                        {
                                                            pattern: new RegExp(/^[a-zA-Z0-9\s\.,#-]{3,100}$/),
                                                            message: "Please enter a valid address"
                                                        },
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input onChange={(e) => setAddress(e.target.value)}
                                                        placeholder="Type your address" />
                                                </Form.Item>

                                                <Form.Item
                                                    name="gender"
                                                    label="Gender"
                                                    requiredMark="optional"
                                                    required
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please select your gender",
                                                        },
                                                    ]}>
                                                    <Select placeholder="Select your gender"
                                                        onChange={(value) => setGender(value)}
                                                    >
                                                        <Select.Option value="Male">Male</Select.Option>
                                                        <Select.Option value="Female">Female</Select.Option>
                                                        <Select.Option value="Other">Other</Select.Option>
                                                    </Select>
                                                </Form.Item>

                                                <Form.Item
                                                    name="dob"
                                                    label="Date of Birth"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please provide your date of birth",
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator() {
                                                                const minimumAge = 18;
                                                                var diff = moment().diff(moment(dob), 'milliseconds');
                                                                var duration = moment.duration(diff);
                                                                if (duration.years() > minimumAge) {
                                                                    return Promise.resolve();
                                                                } else {
                                                                    return Promise.reject(`You must be ${minimumAge} or older.`);
                                                                }
                                                            },
                                                        }),
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <DatePicker
                                                        style={{ width: "100%" }}
                                                        picker="date"
                                                        placeholder="Chose date of birth"
                                                        onChange={(date, dateString) => {
                                                            setDob(dateString)
                                                        }}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="phone"
                                                    label="Phone Number"
                                                    rules={[{ required: true }
                                                        , { pattern: new RegExp(/^\+?[0-9]{8,15}$/), message: "Please provide a valid phone" }]}
                                                    hasFeedback
                                                >
                                                    <Input onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="Type your phone number" />
                                                </Form.Item>
                                                <Form.Item label="Avatar" valuePropName="fileList" getValueFromEvent={avatarFile} hasFeedback>
                                                    <Upload listType="picture-card"
                                                        multiple={false}
                                                        maxCount={1}
                                                        onChange={handleImageUpload}
                                                    >
                                                        <button style={{ border: 0, background: 'none' }} type="button">
                                                            <PlusOutlined />
                                                            <div style={{ marginTop: 8 }}>Avatar</div>
                                                        </button>
                                                    </Upload>
                                                </Form.Item>
                                                <Form.Item
                                                    name="agreement"
                                                    wrapperCol={{ span: 24 }}
                                                    valuePropName="checked"
                                                    rules={[
                                                        {
                                                            validator: (_, value) =>
                                                                value
                                                                    ? Promise.resolve()
                                                                    : Promise.reject(
                                                                        "To proceed, you need to agree with our terms and conditions"
                                                                    ),
                                                        },
                                                    ]}
                                                >
                                                    <Checkbox>
                                                        {" "}
                                                        Agree to our <a href="#">Terms and Conditions</a>
                                                    </Checkbox>
                                                </Form.Item>

                                                <Form.Item wrapperCol={{ span: 24 }}>
                                                    <Button block type="primary" htmlType="submit" >
                                                        Register
                                                    </Button>
                                                </Form.Item>

                                            </Form>


                                        </div>
                                    )}
                                    {!afterLogin && (
                                        <div>
                                            <h4>
                                                <p>Create account</p>
                                            </h4>
                                            <Form
                                                autoComplete="off"
                                                labelCol={{ span: 10 }}
                                                wrapperCol={{ span: 14 }}
                                                onFinish={(values) => {
                                                    if (values.verifyCode) {
                                                        handleVerify();
                                                    } else {
                                                        handleCreateAccount();
                                                    }
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
                                                        readOnly={isCreated} placeholder="Type your email" />
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
                                                    <Input.Password onChange={(e) => setPassword(e.target.value)} readOnly={isCreated} placeholder="Type your password" />
                                                </Form.Item>

                                                <Form.Item
                                                    name="confirmPassword"
                                                    label="Confirm Password"
                                                    dependencies={["password"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                        {
                                                            pattern: new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,20})$/),
                                                            message: "Please enter a valid password"
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue("password") === value) {
                                                                    return Promise.resolve();
                                                                }
                                                                return Promise.reject(
                                                                    "The two passwords that you entered does not match."
                                                                );
                                                            },
                                                        }),
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password readOnly={isCreated} placeholder="Confirm your password" />
                                                </Form.Item>
                                                {isCreated && (
                                                    <>
                                                        <Form.Item label="Confirm email" extra="We must make sure that your email is real.">
                                                            <Row gutter={8}>
                                                                <Col span={12}>
                                                                    <Form.Item
                                                                        name="verifyCode"
                                                                        noStyle
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message: "Please enter code from your email",
                                                                            },
                                                                            {
                                                                                pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{6}$/gm),
                                                                                message: "Please enter a valid code"
                                                                            },
                                                                        ]}                                                                    >
                                                                        <Input onChange={(e) => setVerifyCode(e.target.value)} placeholder="Type code from your email" />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={12}>
                                                                    <Button onClick={resendVerifyCode}>Resend code</Button>
                                                                </Col>
                                                            </Row>
                                                        </Form.Item>
                                                        <Form.Item wrapperCol={{ span: 24 }}>
                                                            <Button block type="primary" htmlType="submit" >
                                                                Verify
                                                            </Button>
                                                        </Form.Item>
                                                    </>
                                                )}
                                                {!isCreated && (
                                                    <Form.Item wrapperCol={{ span: 24 }}>
                                                        <Button block type="primary" htmlType="submit" >
                                                            Register
                                                        </Button>
                                                    </Form.Item>)}
                                            </Form>


                                        </div>
                                    )
                                    }
                                    <div className="text-center">
                                        <br />
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
            </Card>
        </div >


    )
}

export default SignUpComponent
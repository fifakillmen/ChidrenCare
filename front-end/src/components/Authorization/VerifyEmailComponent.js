import React from 'react'
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
import { Button, Checkbox, Form, Input, message } from 'antd';
const Card = styled(MDBCard)`
    width: 60%;
    margin: 0 auto;
    margin-top: 100px;
    `;
const VerifyEmailComponent = () => {
    return (
        <Card>
            <MDBContainer fluid className='p-4'>

                <MDBRow>

                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                            The best offer <br />
                            <span className="text-primary">for your business</span>
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
                                    <p>Verify Email</p>
                                </h4>

                                <Form
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    <Form.Item label="Email">
                                        <Input value={accountData.email} onChange={(e) => setAccountData({ ...accountData, email: e.target.value })} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" onClick={handleUpdateAccount}>Update</Button>
                                        <Button danger type="primary" onClick={handleResetPassword}>Reset Password</Button>
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

export default VerifyEmailComponent
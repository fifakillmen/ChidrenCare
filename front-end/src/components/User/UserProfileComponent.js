import React, { useState, useEffect } from 'react';
import { updateUser, findUser } from '../../services/userService';
import { Form, Input, Select, DatePicker, Upload, Button, notification, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Modal } from 'antd';
import { getUserInfoFromCookie, setUserInfoToCookie } from '../../services/cookeiService';

const UserProfileComponent = ({ visible, onClose }) => {
    const [user, setUser] = useState(null);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState(null);
    const [phone, setPhone] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [userInfo, setUserInfo] = useState(null); 

    useEffect(() => {
        const userInfoFromCookie = getUserInfoFromCookie();
        setUserInfo(userInfoFromCookie);
        if (visible) {
            fetchUserData();
        }
    }, [visible]);

    const fetchUserData = async () => {
        try {
            const userInfo = getUserInfoFromCookie();

            const response = await findUser(userInfo.userId);
            setUser(response.data.data);
            setFName(response.data.data.firstName);
            setLName(response.data.data.lastName);
            setAddress(response.data.data.address);
            setGender(response.data.data.gender);
            setDob(response.data.data.dob);
            setPhone(response.data.data.phone);
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const handleUpdateUserInfo = (newUserInfo) => {
        const updatedUserInfo = {
            ...userInfo, 
            fName: newUserInfo.firstName,
            lastName: newUserInfo.lastName,
            avatar: newUserInfo.avartaLink,
            
        };        
        setUserInfo(updatedUserInfo); 

        setUserInfoToCookie(updatedUserInfo);
    };

    const handleUpdateInformation = async () => {
        try {
            const response = await updateUser(user.id, fName, lName, dob, phone, address, gender, avatarFile);
            if (response && response.data && response.data.status === 'OK') {
                notification.success({
                    message: "Message",
                    description: "Update information Success!!!"
                });
                handleUpdateUserInfo(response.data.data);
            } else {
                notification.error({
                    message: "Message",
                    description: "Update information fail!!!"
                });
            }
        } catch (error) {
            message.error('An error occurred: ' + error.message);
        }
    };

    const handleImageUpload = (info) => {
        const file = info.file.originFileObj;
        setAvatarFile(file);
    };

    return (
        <Modal
            title="Edit User"
            visible={visible}
            onCancel={onClose}
            footer={null}
            key={user ? user.id : 'modal'}
        >
            <div>
                <h4>User information</h4>
                {user && (
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <img src={user.avartaLink} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    </div>
                )}
                <Form
                    autoComplete="off"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={handleUpdateInformation}
                    initialValues={{
                        fName: user ? user.firstName : '',
                        lName: user ? user.lastName : '',
                        address: user ? user.address : '',
                        gender: user ? user.gender : '',
                        dob: user ? moment(user.dob, 'YYYY-MM-DD') : null,
                        phone: user ? user.phone : '',
                    }}
                >
                    <Form.Item
                        name="fName"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your first name",
                            },
                            {
                                pattern: new RegExp(/^[a-zA-Z\s]{2,25}$/),
                                message: "Please enter a valid first name"
                            },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Type your first name" onChange={(e) => setFName(e.target.value)} />
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
                        <Input placeholder="Type your last name" onChange={(e) => setLName(e.target.value)} />
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
                        <Input placeholder="Type your address" onChange={(e) => setAddress(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: "Please select your gender",
                            },
                        ]}
                        hasFeedback
                    >
                        <Select placeholder="Select your gender" onChange={(value) => setGender(value)}>
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
                        ]}
                        hasFeedback
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            picker="date"
                            placeholder="Chose date of birth"
                            onChange={(date, dateString) => setDob(dateString)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: "Please provide your phone number",
                            },
                            {
                                pattern: new RegExp(/^\+?[0-9]{8,15}$/),
                                message: "Please provide a valid phone number"
                            },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Type your phone number" onChange={(e) => setPhone(e.target.value)} />
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

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">Update</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default UserProfileComponent;

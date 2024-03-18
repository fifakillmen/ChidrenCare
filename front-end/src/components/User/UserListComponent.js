import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, notification, Input, Form, Pagination, DatePicker, Select, Upload, message } from 'antd';
import axios from 'axios';
import { searchUser, deleteUser } from '../../services/userService';
import { searchAccount } from '../../services/accountService';

import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import { updateUser } from '../../services/userService'

const { Option } = Select;


const UserTable = () => {
    const [userData, setUserData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewAccountModalVisible, setIsViewAccountModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchValues, setSearchValues] = useState({
        firstName: null,
        lastName: null,
        dob: null,
        targetPageNumber: 0
    });
    const [accountData, setAccountData] = useState({
        id: null,
        email: '',
        password: '',
        role: [],
        isActive: '',
        accessToken: '',
        accessTokenActive: false,
        createdDate: ''
    });
    const [totalPages, setTotalPages] = useState(1);
    // state of modal 
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState(null);
    const [phone, setPhone] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    //
    const handleUpdateInformation = () => {
        updateUser(selectedUser.id, fName, lName, dob, phone, address, gender, avatarFile)
            .then(response => {
                if (response && response.data && response.data.status === 'OK') {
                    notification.success(
                        {
                            message: "Message",
                            description: "Update information Success!!!"
                        }
                    )
                } else {
                    notification.error(
                        {
                            message: "Message",
                            description: "Update information fail!!!"
                        }
                    )
                }
            })
            .catch(error => {
                message.error('An error occurred 4: ' + error.message);
            });
    };


    useEffect(() => {
        fetchUserData();
    }, [searchValues.targetPageNumber]);

    const fetchUserData = () => {
        searchUser(
            searchValues.firstName,
            searchValues.lastName,
            searchValues.dob,
            searchValues.targetPageNumber
        )
            .then(response => {
                setUserData(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };
    const handleImageUpload = (info) => {
        const file = info.file.originFileObj;
        setAvatarFile(file);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchValues(prevState => ({
            ...prevState,
            [name]: value,
            targetPageNumber: 0
        }));
    };

    const handleSearchSubmit = () => {
        fetchUserData();
    };

    const handlePageChange = (pageNumber) => {
        setSearchValues(prevState => ({
            ...prevState,
            targetPageNumber: pageNumber - 1
        }));
    };
    const handleDateChange = (date, dateString) => {
        setSearchValues(prevState => ({
            ...prevState,
            dob: moment(date).format('YYYY-MM-DD'),
        }));
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsModalVisible(true);
        // Set các trường thông tin người dùng vào state
        setFName(user.firstName);
        setLName(user.lastName);
        setAddress(user.address);
        setGender(user.gender);
        setDob(user.dob);
        setPhone(user.phone);
        // Set ảnh đại diện (nếu có)
        // setAvatar(user.avatar);
    };


    const handleDeleteUser = (userId) => {
        deleteUser(userId)
            .then(response => {
                if (response && response.data && response.data.status === 'OK') {
                    notification.success(
                        {
                            message: "Message",
                            description: "Delete user Success!!!"
                        }
                    )
                } else {
                    notification.error(
                        {
                            message: "Message",
                            description: "Delete user fail!!!"
                        }
                    )
                }
            })
            .catch(error => {
                message.error('An error occurred 4: ' + error.message);
            });
    };
    const handleViewAccount = (userId) => {
        searchAccount(userId)
            .then(response => {
                const responseData = response.data.data;
                setAccountData({
                    id: responseData.id,
                    email: responseData.email,
                    password: responseData.password,
                    role: responseData.role,
                    isActive: responseData.isActive,
                    accessToken: responseData.accessToken,
                    createdDate: responseData.createdDate
                });
            })
            .catch(error => {
                message.error('An error occurred 4: ' + error.message);
            });
        setIsViewAccountModalVisible(true);
    };
    const handleUpdateAccount=()=>{

    }
    const handleResetPassword=()=>{
        
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleViewAccount(record.id)}>View Account</Button>
                    <Button type="primary" onClick={() => handleEditUser(record)}>Edit</Button>
                    <Button danger onClick={() => handleDeleteUser(record.id)}>Delete</Button>
                </div>
            ),
        },
    ];
    useEffect(() => {
        if (selectedUser) {
            setFName(selectedUser.firstName || '');
            setLName(selectedUser.lastName || '');
            setAddress(selectedUser.address || '');
            setGender(selectedUser.gender || '');
            setDob(selectedUser.dob ? moment(selectedUser.dob, 'YYYY-MM-DD') : null);
            setPhone(selectedUser.phone || '');
        }
    }, [selectedUser]);
    const onCancel = () => {
        setIsViewAccountModalVisible(false);
    };
    return (
        <>
            <Form layout="inline" style={{ marginBottom: 16 }}>
                <Form.Item label="First Name">
                    <Input
                        name="firstName"
                        value={searchValues.firstName || ''}
                        onChange={handleSearchChange}
                    />
                </Form.Item>
                <Form.Item label="Last Name">
                    <Input
                        name="lastName"
                        value={searchValues.lastName || ''}
                        onChange={handleSearchChange}
                    />
                </Form.Item>
                <Form.Item label="Date of Birth">
                    <DatePicker
                        style={{ width: "100%" }}
                        picker="date"
                        placeholder="Choose date of birth"
                        value={searchValues.dob ? moment(searchValues.dob, 'YYYY-MM-DD') : null}
                        onChange={(date, dateString) => handleDateChange(dateString)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSearchSubmit}>Search</Button>
                </Form.Item>
            </Form>

            <Table columns={columns} dataSource={userData} rowKey="id" pagination={false} />

            <Pagination
                current={searchValues.targetPageNumber + 1}
                total={totalPages * 10}
                onChange={handlePageChange}
            />

            <Modal
                title="Edit User"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null} // Loại bỏ footer của modal
                key={selectedUser ? selectedUser.id : 'modal'}
            >
                <div>
                    <h4>User information</h4>
                    {selectedUser && (
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                            <img src={selectedUser.avartaLink} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                        </div>
                    )}
                    <Form
                        autoComplete="off"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={handleUpdateInformation}
                        initialValues={{
                            fName: selectedUser ? selectedUser.firstName : '',
                            lName: selectedUser ? selectedUser.lastName : '',
                            address: selectedUser ? selectedUser.address : '',
                            gender: selectedUser ? selectedUser.gender : '',
                            dob: selectedUser ? moment(selectedUser.dob, 'YYYY-MM-DD') : null,
                            phone: selectedUser ? selectedUser.phone : '',
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
                            <Input placeholder="Type your first name" />
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
                            <Input placeholder="Type your last name" />
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
                            <Input placeholder="Type your address" />
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
                            <Select placeholder="Select your gender">
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
                            <Input placeholder="Type your phone number" />
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
            <Modal
                title="View Account"
                visible={isViewAccountModalVisible}
                onCancel={onCancel}
                footer={null}
            >
                {accountData && (
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Form.Item label="ID">
                            <Input value={accountData.id} disabled />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input value={accountData.email} />
                        </Form.Item>
                        <Form.Item label="Password">
                            <Input value={accountData.password} disabled />
                        </Form.Item>
                        <Form.Item label="Role" name="role">
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                defaultValue={accountData.role.map(role => role.name)}
                            >
                                <Option value="ADMIN">ADMIN</Option>
                                <Option value="STAFF">STAFF</Option>
                                <Option value="USER">USER</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Is Active" name="isActive">
                            <Select style={{ width: '100%' }} defaultValue={accountData.isActive}>
                                <Option value="ACTIVE">ACTIVE</Option>
                                <Option value="INACTIVE">INACTIVE</Option>
                                <Option value="BANED">BANED</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Access Token Active" name="accessTokenActive">
                            <Select style={{ width: '100%' }} defaultValue={String(accountData.accessTokenActive)}>
                                <Option value="true">True</Option>
                                <Option value="false">False</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Access Token">
                            <Input value={accountData.accessToken} disabled />
                        </Form.Item>
                        <Form.Item label="Created Date">
                            <Input value={accountData.createdDate} disabled />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={handleUpdateAccount}>Update</Button>
                            <Button danger type="primary" onClick={handleResetPassword}>Reset Password</Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>


        </>
    );
};

export default UserTable;

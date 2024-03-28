import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, notification, Input, Form, Pagination, DatePicker, Select, Upload, message } from 'antd';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import { searchUser, deleteUser, createUserByAdmin, updateUser } from '../../services/userService';
import { searchAccount, updateAccount, createAccountByAdmin } from '../../services/accountService';

const { Option } = Select;

const UserTable = () => {
    const [userData, setUserData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalCreateUserVisible, setIsModalCreateUserVisible] = useState(false);
    const [isViewAccountModalVisible, setIsViewAccountModalVisible] = useState(false);
    const [isViewCreateAccountModalVisible, setIsViewCreateAccountModalVisible] = useState(false);
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
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState(null);
    const [phone, setPhone] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [CreateUserData, setCreateUserData] = useState({
        fName: '',
        lName: '',
        address: '',
        gender: '',
        dob: null,
        phone: '',
        avatarFile: null
    });
    const [avatarByAdmin, setAvatarByAdmin] = useState(null);

    const handleRoleChange = (value) => {
        setSelectedRoles(value);
    };

    const handleUpdateInformation = () => {
        updateUser(selectedUser.id, fName, lName, dob, phone, address, gender, avatarFile)
            .then(response => {
                if (response && response.data && response.data.status === 'OK') {
                    notification.success({
                        message: "Message",
                        description: "Update information Success!!!"
                    });
                } else {
                    notification.error({
                        message: "Message",
                        description: "Update information fail!!!"
                    });
                }
            })
            .catch(error => {
                message.error('An error occurred 4: ' + error.message);
            });
    };

    useEffect(() => {
        fetchUserData();
    }, [searchValues.targetPageNumber]);

    const fetchUserData = async () => {
        await searchUser(
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
        setFName(user.firstName);
        setLName(user.lastName);
        setAddress(user.address);
        setGender(user.gender);
        setDob(user.dob);
        setPhone(user.phone);
    };

    const handleViewAccount = async (userId) => {
        await searchAccount(userId)
            .then(response => {
                const responseData = response.data.data;
                setAccountData({
                    id: responseData.id,
                    email: responseData.email,
                    password: responseData.password,
                    role: responseData.role,
                    isActive: responseData.isActive,
                    accessToken: responseData.accessToken,
                    createdDate: responseData.createdDate,
                    accessTokenActive: responseData.accessTokenActive
                });
            })
            .catch(error => {
                message.error('An error occurred 4: ' + error.message);
            });
        setIsViewAccountModalVisible(true);
    };

    const handleUpdateAccount = async () => {
        setLoading(true);
        try {
            const requestData = {
                email: accountData.email,
                lsRole: accountData.role,
                isActive: accountData.isActive,
                accessTokenActive: accountData.accessTokenActive,
            };
            const response = await updateAccount(requestData);
            if (response && response.status === 'OK') {
                notification.success({
                    message: "Success",
                    description: "Account updated successfully!"
                });
            } else {
                notification.error({
                    message: "Error",
                    description: "Failed to update account"
                });
            }
        } catch (error) {
            console.error('An error occurred:', error);
            message.error('An error occurred: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = () => {
        // Reset password functionality
    }

    const handleAddUser = () => {
        setIsViewCreateAccountModalVisible(true);
    }

    const handleCreateAccount = async () => {
        try {
            const emailValue = email;
            const passwordValue = password;
            const rolesValue = selectedRoles;

            const response = await createAccountByAdmin(emailValue, passwordValue, rolesValue);

            if (response && response.data && response.data.status === 'OK') {
                notification.success({
                    message: "Message",
                    description: "add account success full"
                });
                setIsViewCreateAccountModalVisible(false);
                setIsModalCreateUserVisible(true);
            } else {
                notification.error({
                    message: "Message",
                    description: response.data.message
                });
            }
        } catch (error) {
            notification.error({
                message: "Message",
                description: error.message
            });
        }
    };

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

    const onCancelModal = () => {
        setIsModalCreateUserVisible(false);
    };

    const onCancelModalCreateAccount = () => {
        setIsViewCreateAccountModalVisible(false);
    };

    const handleChangeImageByAdmin = (info) => {
        const file = info.file.originFileObj;
        setAvatarByAdmin(file);
    };

    const handleCreateUser = async () => {
        await createUserByAdmin(
            CreateUserData.fName,
            CreateUserData.lName,
            CreateUserData.dob,
            CreateUserData.phone,
            email,
            CreateUserData.address,
            CreateUserData.gender,
            avatarByAdmin
        )
            .then(response => {
                if (response && response.data && response.data.status === 'OK') {
                    notification.success({
                        message: "Message",
                        description: "add account success full"
                    });
                    setIsViewCreateAccountModalVisible(false);
                    setIsModalCreateUserVisible(true);
                } else {
                    notification.error({
                        message: "Message",
                        description: response.data.message
                    });
                }
            })
            .catch(error => {
                notification.error({
                    message: "Message",
                    description: error.message
                });
            });
    };

    const handleChange = (key, value) => {
        setCreateUserData(prevState => ({
            ...prevState,
            [key]: value
        }));
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
                <Form.Item>
                    <Button type="primary" onClick={handleAddUser}>Add User</Button>
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
                footer={null}
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
                        </Form.Item>                    </Form>
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
                            <Input value={accountData.email} onChange={(e) => setAccountData({ ...accountData, email: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="Password">
                            <Input disabled value={accountData.password} onChange={(e) => setAccountData({ ...accountData, password: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="Role" name="role">
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                defaultValue={accountData.role.map(role => role.name)}
                                onChange={(value) => setAccountData({ ...accountData, role: value })}
                            >
                                <Option value='ADMIN'>ADMIN</Option>
                                <Option value='STAFF'>STAFF</Option>
                                <Option value='USER'>USER</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Is Active" name="isActive">
                            <Select
                                style={{ width: '100%' }}
                                defaultValue={accountData.isActive}
                                onChange={(value) => setAccountData({ ...accountData, isActive: value })}
                            >
                                <Option value='ACTIVE'>ACTIVE</Option>
                                <Option value='INACTIVE'>INACTIVE</Option>
                                <Option value='BANED'>BANED</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Access Token Active" name="accessTokenActive">
                            <Select
                                style={{ width: '100%' }}
                                defaultValue={String(accountData.accessTokenActive)}
                                onChange={(value) => setAccountData({ ...accountData, accessTokenActive: value === "true" })}
                            >
                                <Option value="true">True</Option>
                                <Option value="false">False</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Access Token">
                            <Input disabled value={accountData.accessToken} onChange={(e) => setAccountData({ ...accountData, accessToken: e.target.value })} />
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

            <Modal
                title="Create Account"
                visible={isViewCreateAccountModalVisible}
                onCancel={onCancelModalCreateAccount}
                footer={null}
            >
                <Form
                    autoComplete="off"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={() => handleCreateAccount()}
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
                        <Input.Password placeholder="Confirm your password" />
                    </Form.Item>
                    <Form.Item label="Role" name="role">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            value={selectedRoles}
                            onChange={handleRoleChange}
                        >
                            <Option value='ADMIN'>ADMIN</Option>
                            <Option value='STAFF'>STAFF</Option>
                            <Option value='USER'>USER</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button block type="primary" htmlType="submit" >
                            Create Account
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Create User"
                visible={isModalCreateUserVisible}
                onCancel={onCancelModal}
                footer={null}
            >
                <div>
                    <h4>User information</h4>
                    <Form
                        autoComplete="off"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={handleCreateUser}
                        initialValues={{
                            fName: CreateUserData.fName,
                            lName: CreateUserData.lName,
                            address: CreateUserData.address,
                            gender: CreateUserData.gender,
                            dob: CreateUserData.dob,
                            phone: CreateUserData.phone,
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
                            <Input
                                placeholder="Type your first name"
                                onChange={(e) => handleChange('fName', e.target.value)}
                            />
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
                                placeholder="Type your last name"
                                onChange={(e) => handleChange('lName', e.target.value)}
                            />
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
                            <Input
                                placeholder="Type your address"
                                onChange={(e) => handleChange('address', e.target.value)}
                            />
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
                            <Select
                                placeholder="Select your gender"
                                onChange={(value) => handleChange('gender', value)}
                            >
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                                <Option value="Other">Other</Option>
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
                                        var diff = moment().diff(moment(CreateUserData.dob), 'milliseconds');
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
                                onChange={(date, dateString) => handleChange('dob', dateString)}
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
                            <Input
                                placeholder="Type your phone number"
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Avatar" valuePropName="fileList" getValueFromEvent={avatarByAdmin} hasFeedback>
                            <Upload listType="picture-card"
                                multiple={false}
                                maxCount={1}
                                onChange={handleChangeImageByAdmin}
                            >
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Avatar</div>
                                </button>
                            </Upload>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="submit">Create User</Button>
                        </Form.Item>                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default UserTable;
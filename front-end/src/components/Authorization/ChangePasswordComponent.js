import React, { useState } from 'react';
import { getUserInfoFromCookie } from '../../services/cookeiService';
import { changePassword } from '../../services/accountService';
import { Modal, Form, Input, Button, notification, message } from 'antd';

const ChangePasswordComponent = ({ visible, onClose }) => {
    const [account, setAccount] = useState(null);
    const user = getUserInfoFromCookie();

    const handleChangePassword = async (values) => {
        try {
            const { currentpassword, newpassword } = values;
            const response = await changePassword(user.email, currentpassword, newpassword);
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
    };

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

    return (
        <Modal
            title="Change Password"
            visible={visible}
            onCancel={onClose}
            footer={null}
            style={modalStyle}
        >
            <div style={contentStyle}>
                <Form
                    autoComplete="off"
                    onFinish={handleChangePassword}
                    style={formStyle}
                >
                    <Form.Item
                        name="currentpassword"
                        label="Current Password"
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
                            placeholder="Type your current password"
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
                </Form>
            </div>
        </Modal>
    );
};

export default ChangePasswordComponent;
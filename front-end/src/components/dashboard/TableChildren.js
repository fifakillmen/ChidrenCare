import {Modal, notification, Table} from "antd";
import React, {useState, useEffect} from "react";
import {CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import axios from "axios";
import {Button} from "antd";

const TableChildren = () => {
    const [feedback, setFeedback] = useState([]);
    const [feedbackSelected, setFeedbackSelect] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const getFeedbackList = () => {
        axios.get('http://localhost:9999/api/children/list')
            .then(res => {
                // console.log(res.data.data);
                setFeedback(res.data.data.map((record, index) => {
                    return {
                        index: index + 1,
                        id: record.id,
                        firstName: record.firstName,
                        lastName: record.lastName,
                        age: record.age,
                        isActive: record.isActive,
                        createdDate: record.createdDate
                    }
                }));

            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getFeedbackList()
    }, []);

    const getDetailFeedback = (id) => {
        axios.get('http://localhost:9999/api/children/detail', {
            params: {
                id
            }
        })
            .then(res => {
                setFeedbackSelect(res?.data?.data)
            })
            .catch(error => console.log(error));
    }

    const deleteFeedback = (id) => {
        axios.get('http://localhost:9999/api/children/delete', {
            params: {
                id
            }
        })
            .then(res => {
                notification.success(
                    {
                        message: "Message",
                        description: "Delete Success!!!"
                    }
                )
                getFeedbackList()
            })
            .catch(error => console.log(error));
    }

    const showModal = (record) => {
        getDetailFeedback(record.id);
        setIsModalOpen(true);
    };

    const showDeleteModal = (record) => {
        setFeedbackSelect(record);
        setIsDeleteModalOpen(true);
    };
    const showCreateModal = (record) => {
        setIsCreateModalOpen(true);
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCreateOk = () => {
        // Xử lý logic tạo mới tại đây
        setIsCreateModalOpen(false);
        // Có thể thêm logic để gọi API tạo mới và sau đó cập nhật danh sách
    };

    const handleDeleteOk = () => {
        deleteFeedback(feedbackSelected.id);
        setIsDeleteModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsCreateModalOpen(false);
    };
    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            align: "center",
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Create Date",
            dataIndex: "createdDate",
            key: "createdDate",
        },
        {
            title: "Status",
            dataIndex: "isActive",
            key: "isActive",
            align: "center",
            render: (text) => {
                return (
                    <div>
                        {text === 'ACTIVE' ? <CheckCircleOutlined style={{color: "green"}}/> :
                            <CloseCircleOutlined style={{color: "red"}}/>}
                    </div>
                )
            }
        },
        {
            title: "Action",
            align: "center",
            width: 120,
            render: (record) => {
                return (
                    <div style={{alignItems: "center", textAlign: "center", display: "flex"}}>
                        <Button style={{marginRight: 5}} onClick={() => showModal(record)}><EditOutlined
                            style={{justifyContent: "center", display: "flex"}}/></Button>
                        <Button onClick={() => showDeleteModal(record)}><DeleteOutlined
                            style={{justifyContent: "center", display: "flex"}}/></Button>
                    </div>
                )
            }
        }
    ]
    return (
        <>
            <div>
                <div style={{marginBottom: 16}}>
                    <Button type="primary" onClick={showCreateModal}>Create</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={feedback}
                    bordered
                />
                {/* Modal tạo mới */}
                <Modal title="Create New Child" open={isCreateModalOpen} onOk={handleCreateOk} onCancel={handleCancel}>
                    {/* Form nhập thông tin tại đây, ví dụ sử dụng Input từ antd */}
                    <p>Form nhập thông tin tạo mới</p>
                    {/* Bạn có thể thêm các input field tại đây để nhập thông tin */}
                </Modal>

                <Modal title="Show Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{
                    maxWidth: '500px',
                    margin: 'auto',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{marginBottom: '20px'}}>
                        <div style={{fontSize: '20px', fontWeight: 'bold', color: '#333'}}>
                            {feedbackSelected?.id ? `ID: ${feedbackSelected?.id}` : 'No ID'}
                        </div>
                    </div>
                    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Full Name:</span><span
                        style={{flex: 1}}>{feedbackSelected?.firstName} {feedbackSelected?.lastName}</span></div>
                    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Age:</span><span
                        style={{flex: 1}}>{feedbackSelected?.age}</span></div>
                    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Gender:</span><span
                        style={{flex: 1}}>{feedbackSelected?.gender}</span></div>
                    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Date of Birth:</span><span
                        style={{flex: 1}}>{feedbackSelected?.dob}</span></div>
                    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Note:</span><span
                        style={{flex: 1}}>{feedbackSelected?.note}</span></div>
                    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Create by:</span><span
                        style={{flex: 1}}>###</span></div>
                    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Create Date:</span><span
                        style={{flex: 1}}>{feedbackSelected?.createdDate}</span></div>
                </Modal>
                <Modal title="Message" open={isDeleteModalOpen} onOk={handleDeleteOk}
                       onCancel={handleCancel}>
                    <span>You want to delete this?</span>
                </Modal>
            </div>
        </>
    );
};

export default TableChildren;

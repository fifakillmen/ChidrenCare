import {message, Modal, notification, Table} from "antd";
import React, {useState, useEffect} from "react";
import {CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import axios from "axios";
import {Button} from "antd";

const TableFeedback = () => {
    const [feedback, setFeedback] = useState([]);
    const [feedbackSelected, setFeedbackSelect] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const getFeedbackList = () => {
        axios.get('http://localhost:9999/api/feedback/list')
            .then(res => {
                // console.log(res.data.data);
                setFeedback(res.data.data.map((record, index) => {
                    return {
                        index: index + 1,
                        id: record.id,
                        fullname: record.fullname,
                        email: record.email,
                        reviewText: record.reviewText,
                        isActive: record.isActive,
                    }
                }));

            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getFeedbackList()
    }, []);

    const getDetailFeedback = (id) => {
        axios.get('http://localhost:9999/api/feedback/detail', {
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
        axios.get('http://localhost:9999/api/feedback/delete', {
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

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleDeleteOk = () => {
        deleteFeedback(feedbackSelected.id);
        setIsDeleteModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsDeleteModalOpen(false)
    };
    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            align: "center",
        },
        {
            title: "Fullname",
            dataIndex: "fullname",
            key: "fullname",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Content",
            dataIndex: "reviewText",
            key: "reviewText",
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
                {/*<Button type="primary">Create</Button>*/}
                <Table
                    columns={columns}
                    dataSource={feedback}
                    bordered
                />
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
                        style={{flex: 1}}>{feedbackSelected?.fullname}</span></div>
                    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Email:</span><span
                        style={{flex: 1}}>{feedbackSelected?.email}</span></div>
                    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Gender:</span><span
                        style={{flex: 1}}>{feedbackSelected?.gender}</span></div>
                    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Mobile:</span><span
                        style={{flex: 1}}>{feedbackSelected?.mobile}</span></div>
                    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Content:</span><span
                        style={{flex: 1}}>{feedbackSelected?.reviewText}</span></div>
                    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Service:</span><span
                        style={{flex: 1}}>{feedbackSelected?.service}</span></div>
                </Modal>
                <Modal title="Message" open={isDeleteModalOpen} onOk={handleDeleteOk}
                       onCancel={handleCancel}>
                    <span>You want to delete this?</span>
                </Modal>
            </div>
        </>
    );
};

export default TableFeedback;

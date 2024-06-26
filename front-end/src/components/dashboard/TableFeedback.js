import {Rate, Modal, notification, Table, Input, Space} from "antd";
import React, {useState, useEffect, useRef} from "react";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    InfoCircleOutlined, SearchOutlined
} from '@ant-design/icons';
import axios from "axios";
import {Button} from "antd";
import  "../../assets/scss/app.scss";
import Highlighter from "react-highlight-words";
import moment from 'moment';
const TableFeedback = () => {
    const [feedback, setFeedback] = useState([]);
    const [feedbackSelected, setFeedbackSelect] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const getFeedbackList = () => {
        axios.get('http://localhost:9999/api/feedback/list')
            .then(res => {
                // console.log(res.data.data);
                setFeedback(res.data.data.map((record, index) => {
                    return {
                        index: index + 1,
                        id: record.id,
                        rating: record.rating,
                        email: record.email,
                        reviewText: record.reviewText,
                        createdDate: record.createdDate,
                        formattedDate: formatDate(record.createdDate),
                        isActive: record.isActive,
                    }
                }));
                function formatDate(datetimeString) {
                    // Example using a library like Moment.js:
                    return moment(datetimeString).format('YYYY-MM-DD HH:mm:ss');}
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
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const getColumnFilterStatus = (dataIndex, filters) => ({
        filters: filters,
        onFilter: (value, record) => record[dataIndex] === value,
    });
    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            align: "center",
        },
        {
            title: "Rate",
            dataIndex: "rating",
            key: "rating",
            width: 180,
            filters: [
                { text: <Rate disabled defaultValue={1} />, value: 1 },
                { text: <Rate disabled defaultValue={2} />, value: 2 },
                { text: <Rate disabled defaultValue={3} />, value: 3 },
                { text: <Rate disabled defaultValue={4} />, value: 4 },
                { text: <Rate disabled defaultValue={5} />, value: 5 },
            ],
            onFilter: (value, record) => record.rating === value,
            render: (rating) =>{
                return (
                    <div>
                        <Rate disabled defaultValue={rating}/>
                    </div>
                )
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps('email'),
        },
        {
            title: "Content",
            dataIndex: "reviewText",
            key: "reviewText",
            render: (reviewText) => {
                return (
                    <div className="content-ellipsis">
                        {reviewText}
                    </div>
                )
            }
        },
        {
            title: "Create Date",
            dataIndex: "formattedDate",
            key: "formattedDate",
            sorter: (a, b) => {
                const dateA = new Date(a.createdDate);
                const dateB = new Date(b.createdDate);
                return dateA - dateB;
            },
        },
        {
            title: "Status",
            dataIndex: "isActive",
            key: "isActive",
            align: "center",
            ...getColumnFilterStatus('isActive', [
                {text: 'Active', value: 'ACTIVE'},
                {text: 'Inactive', value: 'INACTIVE'},]),
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
                        <Button style={{marginRight: 5}} onClick={() => showModal(record)}><InfoCircleOutlined
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
                <h1>Feedback List</h1>
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
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Rating:</span><span
                        style={{flex: 1}}>{feedbackSelected?.rating}</span></div>
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
                        style={{fontWeight: 'bold', marginRight: '10px'}}>Created Date:</span><span
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

export default TableFeedback;

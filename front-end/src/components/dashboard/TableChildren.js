import {DatePicker, Button, Form, Input, Modal, notification, Radio, Table, Space} from "antd";
import React, {useState, useRef, useEffect} from "react";
import {
    CheckCircleOutlined,
    SearchOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import axios from "axios";
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import {getUserInfoFromCookie} from '../../services/cookeiService';

const TableChildren = () => {
    const [children, setChildren] = useState([]);
    const [childrenSelected, setChildrenSelect] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const getChildrenList = () => {
        axios.get('http://localhost:9999/api/children/list')
            .then(res => {
                // console.log(res.data.data);
                setChildren(res.data.data.map((record, index) => {
                    return {
                        index: index + 1,
                        id: record.id,
                        firstName: record.firstName,
                        lastName: record.lastName,
                        age: record.age,
                        dob: record.dob,
                        gender: record.gender,
                        isActive: record.isActive,
                        createdDate: record.createdDate
                    }
                }));

            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getChildrenList()
    }, []);

    const getDetailChildren = (id) => {
        axios.get('http://localhost:9999/api/children/detail', {
            params: {
                id
            }
        })
            .then(res => {
                setChildrenSelect(res?.data?.data)
            })
            .catch(error => console.log(error));
    }

    const deleteChildren = (id) => {
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
                getChildrenList()
            })
            .catch(error => console.log(error));
    };
    const handleCreateSubmit = (values) => {
        const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            dob: values.dob,
            gender: values.gender,
            isActive: "ACTIVE", // Always set to ACTIVE
            createdBy: getUserInfoFromCookie().lname,
        };
        axios.post('http://localhost:9999/api/children/create', payload)
            .then(res => {
                notification.success({
                    message: "Message",
                    description: "Create Success!!!"
                });
                getChildrenList(); // Refresh the list after creation
                setIsCreateModalOpen(false);
                form.resetFields(); // Clear the form
            })
            .catch(error => console.log(error));
    };
    const handleEditSubmit = (values) => {
        // Lấy ID của children cần cập nhật
        const payload = {
            id: childrenSelected.id,
            firstName: values.firstName,
            lastName: values.lastName,
            dob: values.dob,
            note: values.note,
            gender: values.gender,
            isActive: values.isActive
        };

        // Gọi API cập nhật với dữ liệu mới
        axios.post(`http://localhost:9999/api/children/create`, payload)
            .then(res => {
                notification.success({
                    message: "Message",
                    description: "Update Success!!!"
                });
                setIsEditing(false); // Thoát khỏi chế độ sửa
                getChildrenList();
                getDetailChildren(childrenSelected.id);
                setIsCreateModalOpen(false);
                form.resetFields(); // Clear the form
            })
            .catch(error => console.log(error));
    };
    const handleEdit = () => {
        setIsEditing(true);
    };

    const showModal = (record) => {
        getDetailChildren(record.id);
        setIsModalOpen(true);
    };

    const showDeleteModal = (record) => {
        setChildrenSelect(record);
        setIsDeleteModalOpen(true);
    };
    const showCreateModal = (record) => {
        setIsCreateModalOpen(true);
    }
    const handleOk = () => {
        setIsModalOpen(false);
        form.resetFields(); // Xóa thông tin trên form
    };
    const handleCreateOk = () => {
        // Xử lý logic tạo mới tại đây
        setIsCreateModalOpen(false);
        // Có thể thêm logic để gọi API tạo mới và sau đó cập nhật danh sách
    };

    const handleDeleteOk = () => {
        deleteChildren(childrenSelected.id);
        setIsDeleteModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsCreateModalOpen(false);
        form.resetFields(); // Xóa thông tin trên form
    };
    const onChangeDate = (dob, dateString) => {
        console.log(dob, dateString);
    };
    const onChangeDateEdit = (dob, dateString) => {
        dob = childrenSelected.dob;
        console.log(dob, dateString);
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
    const getColumnFilterGender = (dataIndex, filters) => ({
        filters: filters,
        onFilter: (value, record) => record[dataIndex].indexOf(value) === 0,
    });
    const getColumnFilterAge = (dataIndex, filters) => ({
        filters: filters,
        onFilter: (value, record) => {
            const [minAge, maxAge] = value.split('-').map(Number);
            return record[dataIndex] >= minAge && record[dataIndex] <= maxAge;
        },
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
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
            ...getColumnSearchProps('firstName'),
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
            ...getColumnSearchProps('lastName'),
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
            sorter: (a, b) => a.age - b.age,
            ...getColumnFilterAge('age', [
                {text: '0-10', value: '0-10'},
                {text: '11-20', value: '11-20'},
                {text: '21-30', value: '21-30'},
            ]),

        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            align: "center",
            render: (text) => {
                return (
                    <div>
                        {text === "MALE" ? "Male" : "Female"}
                    </div>
                )
            },
            ...getColumnFilterGender('gender', [
                {text: 'Male', value: 'MALE'},
                {text: 'Female', value: 'FEMALE'},
            ]),
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
            ...getColumnFilterStatus('isActive', [
                {text: 'Active', value: 'ACTIVE'},
                {text: 'Inactive', value: 'INACTIVE'},
            ]),
            render: (text) => (
                <div>
                    {text === 'ACTIVE' ? <CheckCircleOutlined style={{color: "green"}}/> :
                        <CloseCircleOutlined style={{color: "red"}}/>}
                </div>
            )
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
            <h1>Manager Children</h1>
            <div>
                <div style={{marginBottom: 16}}>
                    <Button type="primary" onClick={showCreateModal}>Create</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={children}
                    bordered
                />
                {/* Modal tạo mới */}
                <Modal title="Create New Child" open={isCreateModalOpen} onOk={handleCreateOk} onCancel={handleCancel}
                       footer={null}>
                    <Form form={form} onFinish={handleCreateSubmit}>
                        <Form.Item label="First Name" name="firstName"
                                   rules={[{required: true, message: 'First name is required'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Last Name" name="lastName"
                                   rules={[{required: true, message: 'Last name is required'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Date of Birth" name="dob"
                                   rules={[{required: true, message: 'Date of birth is required'}]}>
                            <DatePicker onChange={onChangeDate}/>
                        </Form.Item>
                        <Form.Item label="Gender" name="gender"
                                   rules={[{required: true, message: 'Gender is required'}]}>
                            <Radio.Group>
                                <Radio value="MALE">Male</Radio>
                                <Radio value="FEMALE">Female</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">Add Children</Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal title="Show Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}
                       style={{
                           maxWidth: '500px',
                           margin: 'auto',
                           backgroundColor: '#fff',
                           padding: '20px',
                           borderRadius: '8px',
                           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                       }}>
                    {isEditing ? (
                        <Form form={form} onFinish={handleEditSubmit}>
                            <Form.Item label="First Name" name="firstName"
                                       rules={[{required: true, message: 'First name is required'}]}
                                       initialValue={childrenSelected?.firstName}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Last Name" name="lastName"
                                       rules={[{required: true, message: 'Last name is required'}]}
                                       initialValue={childrenSelected?.lastName}>
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Date of Birth"
                                name="dob"
                                rules={[{required: true, message: 'Date of birth is required'}]}
                                initialValue={childrenSelected?.dob ? moment(childrenSelected.dob) : null}
                            >
                                <DatePicker onChange={onChangeDateEdit}/>
                            </Form.Item>
                            <Form.Item
                                label="Gender"
                                name="gender"
                                rules={[{required: true, message: 'Gender is required'}]}
                                initialValue={childrenSelected?.gender}
                            >
                                <Radio.Group>
                                    <Radio value="MALE">Male</Radio>
                                    <Radio value="FEMALE">Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="Note"
                                name="note"
                                rules={[{required: false, message: 'Note is not required'}]}
                                initialValue={childrenSelected?.note}
                            >
                                <Input.TextArea/>
                            </Form.Item>
                            <Form.Item
                                label="IsActive"
                                name="isActive"
                                rules={[{required: true, message: 'IsActive is required'}]}
                                initialValue={childrenSelected?.isActive}
                            >
                                <Radio.Group>
                                    <Radio value="ACTIVE">Active</Radio>
                                    <Radio value="INACTIVE">Inactive</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                <Button type="primary" htmlType="submit">Update</Button>
                                <Button style={{marginLeft: 10}} onClick={() => setIsEditing(false)}>Cancel</Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <div>
                            <div style={{marginBottom: '20px'}}>
                                <div style={{fontSize: '20px', fontWeight: 'bold', color: '#333'}}>
                                    {childrenSelected?.id ? `ID: ${childrenSelected?.id}` : 'No ID'}
                                </div>
                            </div>
                            <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                                style={{fontWeight: 'bold', marginRight: '10px'}}>Full Name:</span><span
                                style={{flex: 1}}>{childrenSelected?.firstName} {childrenSelected?.lastName}</span>
                            </div>
                            <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                                style={{fontWeight: 'bold', marginRight: '10px'}}>Age:</span><span
                                style={{flex: 1}}>{childrenSelected?.age}</span></div>
                            <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                                style={{fontWeight: 'bold', marginRight: '10px'}}>Gender:</span><span
                                style={{flex: 1}}>{childrenSelected?.gender}</span></div>
                            <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                                style={{fontWeight: 'bold', marginRight: '10px'}}>Date of Birth:</span><span
                                style={{flex: 1}}>{childrenSelected?.dob}</span></div>
                            <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                                style={{fontWeight: 'bold', marginRight: '10px'}}>Note:</span><span
                                style={{flex: 1}}>{childrenSelected?.note}</span></div>
                            <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                                style={{fontWeight: 'bold', marginRight: '10px'}}>Create by:</span><span
                                style={{flex: 1}}>{childrenSelected?.createdBy}</span></div>
                            <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}><span
                                style={{fontWeight: 'bold', marginRight: '10px'}}>Create Date:</span><span
                                style={{flex: 1}}>{childrenSelected?.createdDate}</span></div>
                            <Button type="primary" onClick={handleEdit}>Edit</Button>
                        </div>
                    )}
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

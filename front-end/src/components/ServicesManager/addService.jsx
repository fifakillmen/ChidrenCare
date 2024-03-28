import React, { useState } from "react";
import { Row, Col, Form, Button, notification, Input } from "antd";
import axios from "axios";
import { getUserInfoFromCookie } from "../../services/cookeiService";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
const AddService = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const createdByValue = getUserInfoFromCookie.mail;

  const handleAddService = async (values) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile); // imageFile là biến chứa hình ảnh được chọn
      formData.append('serviceTitle', values.serviceTitle);
      formData.append('serviceDetail', values.serviceDetail);
      formData.append('price', values.price);
      formData.append('salePrice', values.salePrice);
      formData.append('categoryId', 1);
      formData.append('createdBy', createdByValue);

      console.log('FormData:', formData);

      const response = await axios.post("http://localhost:9999/manager/service/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      notification.success({
        message: "Success",
        description: "Service has been added successfully!",
      });

      form.resetFields();
    } catch (error) {
      console.error("Error adding service:", error);

      notification.error({
        message: "Error",
        description: "An error occurred while adding service.",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const validateNonNegativeNumber = (rule, value, callback) => {
    if (value && value < 0) {
      callback("Please enter a non-negative number!");
    } else {
      callback();
    }
  };

  const validateNumber = (rule, value, callback) => {
    const reg = /^[0-9]*$/;
    if (!reg.test(value)) {
      callback("Please enter a valid number!");
    } else {
      callback();
    }
  };

  return (
    <div>
      <div>
        <Row justify="center">
          <Col span={3} style={{ textAlign: "left" }}>
          <Link to="/admin/servicemanage">
              <Button type="primary">Back</Button>
            </Link>
          </Col>
        <Col span={12}>
            <h2 style={{ textAlign: "center" }}>Add Service</h2>
          </Col>
          
        </Row>
      </div>
      <div className="contact1 container">
        <Row justify="center">
          <Col lg={14}>
            <Form form={form} onFinish={handleAddService}>
              <Form.Item
                name="serviceTitle"
                label="Service Title"
                rules={[{ required: true, message: "Please enter service title!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="serviceDetail"
                label="Service Detail"
                rules={[{ required: true, message: "Please enter service detail!" }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  { required: true, message: "Please enter price!" },
                  { validator: validateNonNegativeNumber },
                  { validator: validateNumber }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="salePrice"
                label="Sale Price"
                rules={[
                  { required: true, message: "Please enter sale price!" },
                  { validator: validateNonNegativeNumber },
                  { validator: validateNumber }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Upload Image">
                <input type="file" onChange={handleFileChange} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add Service
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddService;

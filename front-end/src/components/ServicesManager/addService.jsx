import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, notification, Input } from "antd";
import axios from "axios";

const AddService = () => {
  const [form] = Form.useForm();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // Gửi yêu cầu lấy userId từ server
        const response = await axios.get("http://localhost:9999/userid");
        // Lưu userId vào state
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Error fetching userId:", error);
        // Xử lý lỗi nếu cần thiết
      }
    };

    // Gọi hàm fetchUserId khi component được tải lần đầu
    fetchUserId();
  }, []);

  const handleAddService = async (values) => {
    try {
      const payload = {
        serviceTitle: values.serviceTitle,
        serviceDetail: values.serviceDetail,
        price: values.price,
        salePrice: values.salePrice,
        categoryId: 1,
        createdBy: userId, // Sử dụng userId lấy được từ server
      };

      // Gửi yêu cầu thêm dịch vụ đến backend
      const response = await axios.post("http://localhost:9999/manager/service/add", payload);

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

  return (
    <div>
      <div>
        <Row justify="center">
          <Col>
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
                rules={[{ required: true, message: "Please enter price!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="salePrice"
                label="Sale Price"
                rules={[{ required: true, message: "Please enter sale price!" }]}
              >
                <Input />
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

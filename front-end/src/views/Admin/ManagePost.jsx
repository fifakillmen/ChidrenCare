import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Pagination, Modal, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdatePost from './Post/updatePost.jsx'; 
import { getAccessToken, getDataFromCookies, saveToCookies, deleteCookies,getUserInfoFromCookie } from "../../services/cookeiService.js";

const fakeData = [
  {
    id: 1,
    name: "Post1",
    Content: "content1",
    Author: "Tuanna",
    "Image Link": "Null",
    "Ngày nhập": "2024-01-29",
  },
  // Các dòng khác...
];

function PostManage() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState(null); // Lưu trữ ID của bài viết đang được chọn
  const itemsPerPage = 4;

  const handleCloseModal = () => setShowModal(false);
  const accessToken = getAccessToken();
  const fetchPosts = () => {
    
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
  };
  
    axios
      .get("http://localhost:9999/manager/post/getList", { headers: headers})
      .then((response) => {
        setPosts(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const usePagination = (items, itemsPerPage) => {
    const [activePage, setActivePage] = useState(1);
    const totalPages = items ? Math.ceil(items.length / itemsPerPage) : 0;

    const handlePageChange = (pageNumber) => {
      setActivePage(pageNumber);
    };

    const getPaginatedItems = () => {
      if (!items) return [];
      const startIndex = (activePage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = items.slice(startIndex, endIndex);
      return currentItems;
    };

    return [getPaginatedItems(), activePage, totalPages, handlePageChange];
  };

  const [getPaginatedItems, activePage, totalPages, handlePageChange] =
    usePagination(posts, itemsPerPage);

  useEffect(() => {
    fetchPosts();

    const checkboxes = document.querySelectorAll('.filter-section input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", function () {
        if (this.checked) {
          this.parentElement.classList.add("selected");
        } else {
          this.parentElement.classList.remove("selected");
        }
      });
    });

  }, []);

  const handleDelete = (postId) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá không?")) {
      axios
        .delete(`http://localhost:9999/manager/post/delete?id=${postId}`)
        .then((response) => {
          console.log("Xoá sản phẩm thành công");
          fetchPosts();
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  };
  const handleEdit = (postId) => {
    setPostId(postId); 
    setShowModal(true); 
  };
  const handleUpdateError = (error) => {
    console.error("Error updating post:", error);
  };
  
  const handleUpdateSuccess = () => {
    fetchPosts();
  };
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Update Post</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <UpdatePost
      postId={postId}
      handleCloseModal={handleCloseModal}
      handleUpdateSuccess={handleUpdateSuccess}
      handleUpdateError={handleUpdateError} // Truyền hàm xử lý lỗi vào đây
    />
  </Modal.Body>
</Modal>
      <Row md={5} className="title align-center">
        <Col md={4}>
          <h2>Mange Post</h2>
        </Col>
        <Col md={4} />
        <Col md={4} className="button-container">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/admin/addPost" className="btn btn-primary add-btn">
              Thêm Post
            </Link>
          </div>
        </Col>
      </Row>
      <div className="flex">
        <Container>
          <Row>
            <Col>
              <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Content</th>
                      <th>Author</th>
                      <th>Image Link</th>
                      <th>Trạng thái</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                        <td>{item.author}</td>
                        <td>{item.imageLink}</td>
                        <td>{item.isActive}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary edit-btn"
                            onClick={() => handleEdit(item.id)} // Truyền ID của bài viết vào hàm handleEdit
                          >
                            <EditOutlined />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteOutlined />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>

              <Row>
                <Col>
                  <Pagination>
                    <Pagination.Prev
                      onClick={() => handlePageChange(activePage - 1)}
                      disabled={activePage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === activePage}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => handlePageChange(activePage + 1)}
                      disabled={activePage === totalPages}
                    />
                  </Pagination>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default PostManage;


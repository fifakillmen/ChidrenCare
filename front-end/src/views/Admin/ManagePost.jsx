import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Pagination } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
// import "./warehouse.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const fakeData = [
  {
    id: 1,
    name: "Post1",
    Content: "content1",
    Author: "Tuanna",
    "Image Link": "Null",
    "Ngày nhập": "2024-01-29",
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    Content: "content1",
    Author: "Tuanna",
    "Image Link": "Null",
    "Ngày nhập": "2024-01-29",
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    Content: "content1",
    Author: "Tuanna",
    "Image Link": "Null",
    "Ngày nhập": "2024-01-29",
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    Content: "content1",
    Author: "Tuanna",
    "Image Link": "Null",
    "Ngày nhập": "2024-01-29",
  },
  {
    id: 5,
    name: "Sản phẩm 5",
    Content: "content1",
    Author: "Tuanna",
    "Image Link": "Null",
    "Ngày nhập": "2024-01-29",
  },
  {
    id: 6,
    name: "Sản phẩm 6",
    Content: "content1",
    Author: "Tuanna",
    "Image Link": "Null",
    "Ngày nhập": "2024-01-29",
  },
  {
    id: 7,
    name: "Sản phẩm 7",
    Content: "content1",
    Author: "Tuanna",
    "Image Link": "Null",
    "Ngày nhập": "2024-01-29",
  },
  {
    id: 8,
    name: "Sản phẩm 8",
    Content: "content1",
    Author: "Tuanna",
    "Image Link": "Null",
    "Ngày nhập": "2024-01-29",
  },
];

function PostManage() {
  const itemsPerPage = 6;

  // Hook for pagination
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
    usePagination(fakeData, itemsPerPage);

  useEffect(() => {
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

  // Function to handle delete confirmation
  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xoá không?")) {
      // Xử lý logic xoá ở đây
      console.log("Xoá sản phẩm");
    }
  };

  return (
    <>
      <Row md={5} className="title align-center">
        <Col md={4}>
          <h2>Mange Post</h2>
        </Col>
        <Col md={4} />
        <Col md={4} className="button-container">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/admin/addPost" className="btn btn-primary add-btn">
              Thêm sản phẩm
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
                      <th>Ngày Tạo</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td style={{ color: "#BB2649", fontWeight: "bold" }}>
                          {item.name}
                        </td>
                        <td>{item["Content"]}</td>
                        <td>{item["Author"]}</td>
                        <td>{item["Image Link"]}</td>
                        <td>{item["Ngày nhập"]}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary edit-btn"
                          >
                            <EditOutlined />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDelete} // Gọi hàm handleDelete khi nút "Xoá" được nhấp
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

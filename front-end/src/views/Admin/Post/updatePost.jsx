import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
// import { getUserInfoFromCookie } from "../../services/cookeiService";
import {
  getAccessToken,
  getDataFromCookies,
  saveToCookies,
  deleteCookies,
  getUserInfoFromCookie,
} from "../../../services/cookeiService";

const createdByValue = getUserInfoFromCookie();
function UpdatePost({
  postId,
  handleCloseModal,
  handleUpdateSuccess,
  handleUpdateError,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({});
  const [previews, setPreviews] = useState([]);
  const accessToken = getAccessToken();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
  });

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'multipart/form-data',
  };

  useEffect(() => {
    console.log(createdByValue);
    // Fetch data of selected post
    axios
      .get(`http://localhost:9999/manager/post/detail?id=${postId}`, {
        headers: headers,
      })
      .then((response) => {
        const postData = response.data.data;
        setFormData(postData);

        // Set form values using react-hook-form
        setValue("title", postData.title);
        setValue("content", postData.content);
        setValue("author", postData.user?.username || "");
        setValue("imageLink", postData.imageLink || "");
        setValue("isActive", postData.isActive);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  }, [postId, setValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  const onSubmit = (data) => {
    // alert(createdByValue)
    const formDataPut = new FormData();
    formDataPut.append("title", data.title);
    formDataPut.append("content", data.content);
    formDataPut.append("isActive", data.isActive);
    formDataPut.append("postId", postId);
    formDataPut.append("modifiedByUserId", "1");

    if (previews.length > 0) {
      previews.forEach((preview, index) => {
        formDataPut.append(`images[${index}]`, preview);
      });
    }

    // Submit updated data to backend
    axios
      .put(`http://localhost:9999/manager/post/update`, formDataPut, {
        headers: headers,
      })
      .then((response) => {
        console.log("Post updated successfully");
        handleUpdateSuccess(); // Call handleUpdateSuccess after successful update
        handleCloseModal(); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        handleUpdateError(error); // Gọi handleUpdateError tại đây
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          {...register("title", { required: true })}
          required
        />
        {errors.title && <p className="text-danger">Title is required</p>}
      </Form.Group>
      <Form.Group controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="content"
          {...register("content", { required: true })}
          required
        />
        {errors.content && <p className="text-danger">Content is required</p>}
      </Form.Group>
      <Form.Group controlId="formAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={formData.user?.username || ""} // Hiển thị tên author từ dữ liệu
          readOnly // Không cho phép sửa
        />
      </Form.Group>
      <Form.Group controlId="formImages">
        <Form.Label>Images</Form.Label>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag and drop files here, or click to select files</p>
        </div>
        <div className="preview-container">
          {previews.map((preview, index) => (
            <div key={index} className="preview-item">
              <img src={preview} alt={`Preview ${index + 1}`} />
            </div>
          ))}
        </div>
      </Form.Group>
      <Form.Group controlId="formIsActive">
        <Form.Label>Is Active</Form.Label>
        <Form.Control
          as="select"
          name="isActive"
          {...register("isActive", { required: true })}
          required
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </Form.Control>
        {errors.isActive && (
          <p className="text-danger">Is Active is required</p>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdatePost;

import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";

function UpdatePost({ postId, handleCloseModal, handleUpdateSuccess, handleUpdateError }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({});
  const [previews, setPreviews] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
  });

  useEffect(() => {
    // Fetch data of selected post
    axios
      .get(`http://localhost:9999/manager/post/detail?id=${postId}`)
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
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("author", data.author);
    formData.append("isActive", data.isActive);

    if (previews.length > 0) {
      previews.forEach((preview, index) => {
        formData.append(`images[${index}]`, preview);
      });
    }

    // Submit updated data to backend
    axios
      .put(`http://localhost:9999/manager/post/update?id=${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
        {errors.isActive && <p className="text-danger">Is Active is required</p>}
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdatePost;
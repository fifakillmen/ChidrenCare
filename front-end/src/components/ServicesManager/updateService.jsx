import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";

function UpdateService({ service, handleClose, handleUpdateSuccess, handleUpdateError }) {
  const [previews, setPreviews] = useState([]);
  const [sizeError, setSizeError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
  }, [service]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    // formData.append("file", data.file);
    formData.append("serviceId", 1);
    formData.append("serviceTitle", data.title);
    formData.append("serviceDetail", data.content);
    formData.append("price", data.price);
    formData.append("salePrice", data.salePrice);

    try {
      const response = await axios.put(
        `http://localhost:9999/manager/service/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

        response = await axios.put(
        `http://localhost:9999/manager/service/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      // Gọi hàm handleUpdateSuccess khi update thành công
      handleUpdateSuccess();
    } catch (error) {
    console.error("Error updating service:", error);
    // Gọi hàm handleUpdateError khi có lỗi xảy ra
    if (handleUpdateError) {
      handleUpdateError(error);
    }
  }

  };

  const onDrop = (acceptedFiles, fileRejections) => {
    // Cập nhật các trường preview và sizeError tương ứng
    setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
    if (fileRejections.length > 0) {
      setSizeError("File is too large. Maximum size allowed is 10MB.");
    } else {
      setSizeError("");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 10485760,
    multiple: true,
  });

  const handleRemoveImage = (index) => {
    // Xử lý khi click vào nút xóa ảnh
    setValue("images", (prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setSizeError("");
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              {...register("title", { required: true })}
              id="title"
              className="form-control"
            />
            {errors.title && (
              <p className="text-danger">Title is required</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              {...register("content", { required: true })}
              id="content"
              className="form-control"
            />
            {errors.content && (
              <p className="text-danger">Content is required</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              {...register("price", { required: true, pattern: /^[0-9]+$/ })}
              id="price"
              type="number"
              className="form-control"
            />
            {errors.price && errors.price.type === "required" && (
              <p className="text-danger">Price is required</p>
            )}
            {errors.price && errors.price.type === "pattern" && (
              <p className="text-danger">
                Price must be a non-negative number
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="salePrice" className="form-label">
              Sale Price
            </label>
            <input
              {...register("salePrice", { pattern: /^[0-9]+$/ })}
              id="salePrice"
              type="number"
              className="form-control"
            />
            {errors.salePrice && errors.salePrice.type === "pattern" && (
              <p className="text-danger">
                Sale Price must be a non-negative number
              </p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Images</label>
            <div {...getRootProps()} className="border p-2">
              <input {...getInputProps()} />
              <p>Choose an image, or drag 'n' drop multiple images here</p>
            </div>
            <div>
              {sizeError && (
                <p className="alert alert-danger">{sizeError}</p>
              )}
            </div>
            <div className="d-flex flex-wrap mt-2">
              {previews.map((preview, index) => (
                <div key={index} className="me-2 mb-2 position-relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    style={{ width: "100px" }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateService;

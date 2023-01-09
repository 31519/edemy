import { useState, useEffect } from "react";

import axios from "axios";
import { Select, Button, Avatar, Badge } from "antd";
const { Option } = Select;

const CourseCreateForm = ({
  name,
  setName,
  description,
  setDescription,
  category,
  setCategory,
  price,
  setPrice,
  paid,
  setPaid,
  uploading,
  setUploading,
  loading,
  setLoading,
  imagePreview,
  preview,
  setImagePreview,
  uploadButtonText,
  handleSubmit,
  handleImage,
  handleImageRemove,
  editPage = false,
  image
}) => {
  const children = [];
  for (let i = 9.99; i <= 99.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }
  return (
    <>
      {name && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="7"
              rows="7"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* free or paid dropdown */}
          <div className="form-row pt-3">
            <div className="col">
              <div className="form-group">
                <Select
                  style={{ width: "100" }}
                  size="large"
                  value={paid}
                  onChange={(v) => {
                    setPaid(v);

                    setPrice("0");
                  }}
                >
                  <Option value={true}>Paid</Option>
                  <Option value={false}>Free</Option>
                </Select>
              </div>
            </div>
          </div>

          {/* price */}
          {paid && (
            <div className="form-group">
              <Select
                defaultValue="$9.99"
                style={{ width: "100%" }}
                onChange={(v) => setPrice(v)}
                tokenSeparators={[,]}
                size="large"
              >
                {children}
              </Select>
            </div>
          )}

          {/* category */}
          <div className="form-group">
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* image upload */}
          <div className="form-group">
            <div className="col">
              <div className="form-group">
                <label className="btn btn-outline-secondary btn-block text-left">
                  {uploadButtonText}
                  <input
                    type="file"
                    name="image"
                    onChange={handleImage}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>
            {/* preview */}
            {preview && (
              <Badge count="x" onClick={handleImageRemove} className="pointer">
                <Avatar width={400} src={preview} />
              </Badge>
            )}

            {editPage && image && <Badge count="x" onClick={handleImageRemove} className="pointer">
                <Avatar width={400} src={image.Location} />
              </Badge>}
          </div>

          {/* submit */}
          <div className="row">
            <div className="col">
              <Button
                onClick={handleSubmit}
                disabled={loading || uploading}
                className="btn btn-primary"
                loading={loading}
                type="primary"
                size="large"
                shape="round"
              >
                {loading ? "Saving..." : "Save & Continue"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default CourseCreateForm;

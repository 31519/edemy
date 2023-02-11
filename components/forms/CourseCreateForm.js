import { useState, useEffect } from "react";

import axios from "axios";
import { Select, Button, Avatar, Badge } from "antd";
const { Option } = Select;
import { useRouter } from "next/router";
import styles from "./CourseCreateForm.module.css";

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
  image,
}) => {
  const children = [];
  for (let i = 9.99; i <= 99.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }

  const [cat, setCat] = useState([]);

  const router = useRouter();

  const loadCategory = async () => {
    const { data } = await axios.get(`/api/all-category`);
    if (data) {
      setCat(data);
    }
  };

  useEffect(() => {
    loadCategory();
  }, [router]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formDiv}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            className={styles.inputField}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description</label>
          <textarea
            name="description"
            rows="10"
            cols="50"
            className={styles.areaField}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* free or paid dropdown */}
          <div className={styles.paidDiv}>
            {/* <div className={styles.paidChild}> */}
            <Select
              style={{ width: "100%" }}
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
            {/* </div> */}
          </div>

          {/* price */}
          {paid && (
            <div className={styles.paidDiv}>
              <label>Price</label>
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
          {/* <div className="form-group">
          <input
            type="text"
            name="category"
            className="form-control"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div> */}

          {/* category */}
          <div className={styles.paidDiv}>
            {/* <div className="col"> */}
            <label>Category</label>
            <Select
              style={{ width: "100%" }}
              size="large"
              placeholder="Category"
              // value={category}
              defaultValue="Category"
              onChange={(v) => {
                setCategory(v);
              }}
            >
              {cat && cat.map((m) => <Option value={m.name}>{m.name}</Option>)}
            </Select>
            {/* </div> */}
          </div>

          {/* image upload */}
          <div className={styles.paidDiv}>
            {/* <div className="col"> */}
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
            {/* </div> */}
            {/* preview */}
            {preview && (
              <Badge count="x" onClick={handleImageRemove} className="pointer">
                <Avatar width={400} src={preview} />
              </Badge>
            )}

            {editPage && image && (
              <Badge count="x" onClick={handleImageRemove} className="pointer">
                <Avatar width={400} src={image.Location} />
              </Badge>
            )}
          </div>

          {/* submit */}
          <div className="row">
            <div className="col">
              <button
                onClick={handleSubmit}
                disabled={loading || uploading}
                className={styles.buttonField}
                loading={loading}
                type="primary"
                size="large"
                shape="round"
              >
                {loading ? "Saving..." : "Save & Continue"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseCreateForm;

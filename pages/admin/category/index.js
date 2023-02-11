import { useState, useEffect } from "react";
import { Avatar, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Moment from "react-moment";
import { Modal } from "antd";
import Link from "next/link";
import styles from "../../../styles/Notification.module.css";
import { toast } from "react-toastify";

import axios from "axios";
import AdminRoute from "../../../components/routes/AdminRoute";
import { useRouter } from "next/router";

const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const router = useRouter();

  const { slug } = router.query;

  const loadCategory = async () => {
    const { data } = await axios.get(`/api/all-category`);
    if (data) {
      setCategory(data);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table ({name, email, password})

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/create-category`, {
        name,
      });
      setName("");
      setFlag(!flag);
      toast.success("Category Created !");
      setLoading(false);
    } catch (err) {
      toast.error("Failed to created category !");
      setLoading(false);
    }
    // console.log("register response", data)
  };

  useEffect(() => {
    loadCategory();
  }, [flag, router]);

  const myStyle = { marginTop: "-15px", fontSize: "10px" };
  return (
    <AdminRoute>
      <div className={styles.container}>
        <h1 className={styles.header}>All User Notification</h1>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            className={styles.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <button
            type="submit"
            className={styles.buttonField}
            disabled={!name || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        {/* all Notification  */}
        <div>
          {category.length !== 0 &&
            category.map((c) => (
              <div key={c._id} className={styles.detailDiv}>
                <div className={styles.detailDivMessage}>
                  <p className={styles.nMessage}>{c.name}</p>
                </div>
                <hr />
              </div>
            ))}
        </div>
      </div>
    </AdminRoute>
  );
};

export default Notification;

import { useState, useEffect } from "react";
import { Avatar, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Moment from "react-moment";
import { Modal } from 'antd';
import Link from "next/link";
import styles from "../../../styles/Notification.module.css";
import { toast } from "react-toastify";

import axios from "axios";
import AdminRoute from "../../../components/routes/AdminRoute";
import { useRouter } from "next/router";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState("");
  const [from, setFrom] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { slug } = router.query;

  const loadNotification = async () => {
    const { data } = await axios.get(`/api/all-notifications/${slug}`);
    if (data) {
      setNotifications(data);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table ({name, email, password})

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/send-user-notification/${slug}`, {
        message,
        from,
      });
      setMessage("");
      setFrom("");
      setFlag(!flag);
      toast.success("Notification is send !");
      setLoading(false);
    } catch (err) {
      toast.error("Failed to send notification");
      setLoading(false);
    }
    // console.log("register response", data)
  };

  useEffect(() => {
    if (slug) {
      loadNotification();
    }
  }, [flag, router, slug]);

  const myStyle = { marginTop: "-15px", fontSize: "10px" };
  return (
    <AdminRoute>
      <div className={styles.container}>
        <h1 className={styles.header}>All User Notification</h1>

        <form onSubmit={handleSubmit}>
          <label>Message</label>
          <textarea
            rows="5"
            cols="50"
            type="text"
            className={styles.areaField}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />
          <label>From</label>
          <input
            type="text"
            className={styles.inputField}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="From"
          />

          <button
            type="submit"
            className={styles.buttonField}
            disabled={!message || !from || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        {/* all Notification  */}
        <div>
          {notifications.length !== 0 &&
            notifications.map((m) => (
              <div key={m._id} className={styles.detailDiv}>
                <div className={styles.detailDivHeader}>
                  <h5 className={styles.nText}>
                    {" "}
                    <Moment date={m.createdAt} format="D MMM YYYY" />
                  </h5>
                  <h5 className={styles.nSeen}>
                    {m.seen ? "Seen" : "Not Seen"}
                  </h5>
                  <button
                    onClick={() => setOpen(!open)}
                    className={styles.nText}
                  >
                    {open ? "Close" : "Open"}
                  </button>
                </div>
                <div
                  className={
                    open
                      ? styles.detailDivMessage
                      : styles.detailDivMessageClose
                  }
                >
                  <p className={styles.nMessage}>{m.message}</p>
                  <p className={styles.nMessage}>From {m.from}</p>
                </div>
                <hr/>
              </div>
            ))}
        </div>
      </div>
    </AdminRoute>
  );
};

export default Notification;

import { useState, useEffect } from "react";
import { Avatar, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  CloseSquareOutlined,
  CheckSquareOutlined,
  MailOutlined
} from "@ant-design/icons";
import Link from "next/link";
import styles from "../../styles/Admin.module.css";
import { toast } from "react-toastify";

import axios from "axios";
import AdminRoute from "../../components/routes/AdminRoute";
import { useRouter } from "next/router";

const AdminIndex = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const router = useRouter();

  const loadUsers = async () => {
    const { data } = await axios.get("/api/all-users");
    setUsers(data);
  };

  const activateHandler = async (id) => {
    try {
      const answer = window.confirm(
        "Are you sure you want to activate this account"
      );
      if (!answer) return;
      setLoading(true);
      const { data } = await axios.post(`/api/user-activation/${id}`, {});
      toast("User Account Activated !");
      setLoading(false);
      setFlag(!flag);
    } catch (err) {
      setLoading(false);
      toast("User Activation Failed !");
    }
  };
  const deactivateHandler = async (id) => {
    try {
      const answer = window.confirm(
        "Are you sure you want to deactivate this account"
      );
      if (!answer) return;
      setLoading(true);
      const { data } = await axios.post(`/api/user-deactivation/${id}`, {});
      toast("User Account Deactivated !");
      setLoading(false);
      setFlag(!flag);
    } catch (err) {
      setLoading(false);
      toast("User Deactivation Failed !");
    }
  };

  const notificationHandler = async (id) => {
    router.push(`/admin/notification/${id}`);
  };

  useEffect(() => {
    loadUsers();
  }, [flag,router]);

  const myStyle = { marginTop: "-15px", fontSize: "10px" };
  return (
    <AdminRoute>
      <div className={styles.container}>
        <h1 className={styles.header}>All Users</h1>

        {users &&
          users.map((user) => (
            <div className={styles.mainDiv}>
              <div className={styles.avatarDiv}>
                <Avatar className={styles.avatar} src={user.picture} />
              </div>
              <div className={styles.nameDiv}>
                <Link
                  className={styles.link}
                  href={`/admin/user-detail/${user._id}`}
                >
                  <p className={styles.name}>{user.name}</p>
                </Link>
              </div>
              <div className={styles.activatedDiv}>
                {user.activated ? (
                  <button
                    onClick={() => deactivateHandler(user._id)}
                    className={styles.activated}
                  >
                    {loading ? <SyncOutlined spin /> : "Activated"}
                  </button>
                ) : (
                  <button
                    onClick={() => activateHandler(user._id)}
                    className={styles.notActivated}
                  >
                    {loading ? <SyncOutlined spin /> : "Not Activate"}
                  </button>
                )}
              </div>
              {/* for mobile */}
              <div className={styles.activatedDivIcon}>
                {user.activated ? (
                  <>
                    {loading ? (
                      <SyncOutlined spin />
                    ) : (
                      <CheckSquareOutlined
                        onClick={() => deactivateHandler(user._id)}
                        className={styles.activatedIcon}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {loading ? (
                      <SyncOutlined spin />
                    ) : (
                      <CloseSquareOutlined
                        onClick={() => activateHandler(user._id)}
                        className={styles.notActivatedIcon}
                      />
                    )}
                  </>
                )}
              </div>
              <div className={styles.roleDiv}>
                {user.role.includes("Instructor") ? (
                  <button className={styles.instructor}>Instructor</button>
                ) : (
                  <button className={styles.subscriber}>Subscriber</button>
                )}
              </div>
              <div className={styles.roleDiv}>
                .
                {user.role.includes("Admin") && (
                  <button className={styles.admin}>Admin</button>
                )}
              </div>
              <div className={styles.notificationDiv}>
                <button
                  onClick={() => notificationHandler(user._id)}
                  className={styles.notification}
                >
                  Notify
                </button>

                <MailOutlined
                  onClick={() => notificationHandler(user._id)}
                  className={styles.notificationIcon}
                />
              </div>
            </div>
          ))}
      </div>
    </AdminRoute>
  );
};

export default AdminIndex;

import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../context";
import UserRoute from "../../../../components/routes/UserRoute";
import axios from "axios";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import {useRouter} from "next/router"
// import styles from "../../style/MyNotification.module.css";
import styles from "../../../../styles/MyNotification.module.css"
import Moment from "react-moment";


const MyNotification = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(false);
  const router = useRouter()

  //   notification function
  const fetchNotification = async() =>{
    try {
        setLoading(true)
      const { data } = await axios.get(`/api/my-notifications`);
      setNotifications(data);
      console.log("notify", data);
      setLoading(false)
    } catch (err) {
      console.log("notify", err);
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotification()
  }, [router])

  return (
    <UserRoute>
      {loading && (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-danger p-5"
        />
      )}
      <div className={styles.container}>
        <h1 className={styles.header}>My Notification</h1>
        <hr/>
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
                <hr />
              </div>
            ))}
        </div>
      </div>

    </UserRoute>
  );
};

export default MyNotification;

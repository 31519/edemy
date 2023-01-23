import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context";
import UserRoute from "../../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import styles from "../../../styles/AccountSetting.module.css";
import Moment from "react-moment";
import { useRouter } from "next/router";

const AccountSetting = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [userDetail, setUserDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // button
  const buttonHandle = () => {
    router.push("/user/profile/edit-profile");
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user-detail`);
      setUserDetail(data);
      console.log("userdetail", data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      {loading && <SyncOutlined spin className={styles.loader} />}
      <div className={styles.headerDiv}>
        <h1 className={styles.header}>Account Setting</h1>
      </div>

      {/* show list of courses */}
      {/* {courses &&
        courses.map((course) => (
          <div key={course._id} className={styles.loader}>
            <Avatar
              size={80}
              shape="square"
              src={course.image ? course.image.Location : "/course.png"}
            /> */}

      <div className={styles.contentDiv}>
        <div className={styles.contentDivHeader1}>
          <h3 className={styles.detailHeader}>Account detail</h3>
        </div>
        <hr />
        {/* avatar */}
        {/* <div className={styles.contentDivHeader}>
          <div className={styles.detailDiv}>
            <h3 className={styles.detailValue}>
              Your image is {userDetail.name}
            </h3>
          </div>
          <div className={styles.changeDiv}>
            <button className={styles.changeButton}>Change</button>
          </div>
        </div> */}

        {/* name */}
        <div className={styles.contentDivHeader}>
          <div className={styles.detailDiv}>
            <h3 className={styles.detailValue}>
              Your Name is{" "}
              <span className={styles.spanName}>{userDetail.name}</span>
            </h3>
          </div>
          <div className={styles.changeDiv}>
            <button onClick={buttonHandle} className={styles.changeButton}>
              Change
            </button>
          </div>
        </div>
        <hr />
        {/* email */}
        <div className={styles.contentDivHeader}>
          <div className={styles.detailDiv}>
            <h3 className={styles.detailValue}>
              Your email is{" "}
              <span className={styles.spanName}>{userDetail.email}</span>
            </h3>
          </div>
          <div className={styles.changeDiv}>
            <button onClick={buttonHandle} className={styles.changeButton}>
              Change
            </button>
          </div>
        </div>
        <hr />
        {/* address */}
        <div className={styles.contentDivHeader}>
          <div className={styles.detailDiv}>
            <h3 className={styles.detailValue}>
              Your address is{" "}
              <span className={styles.spanName}>{userDetail.address}</span>
            </h3>
          </div>
          <div className={styles.changeDiv}>
            <button onClick={buttonHandle} className={styles.changeButton}>
              Change
            </button>
          </div>
        </div>
        <hr />
        {/* join  at */}
        <div className={styles.contentDivHeader}>
          <div className={styles.detailDiv}>
            <h3 className={styles.detailValue}>
              You join at{" "}
              <span className={styles.spanName}>
                <Moment date={userDetail.createdAt} format="D MMM YYYY" />
              </span>
            </h3>
          </div>
          <div className={styles.changeDiv}>
            <button onClick={buttonHandle} className={styles.changeButton}>
              Change
            </button>
          </div>
        </div>
        <hr />
      </div>
    </UserRoute>
  );
};

export default AccountSetting;

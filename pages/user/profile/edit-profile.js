import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context";
import UserRoute from "../../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import styles from "../../../styles/EditProfile.module.css";
import { toast } from "react-toastify";


const EditProfile = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [userDetail, setUserDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");


  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user-detail`);
      setUserDetail(data);
      console.log("userdetail", data);
      if (data) {
        setName(data.name);
        setAddress(data.address);
        setGender(data.gender)
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/user-update`, {
        name,
        address,
      });
      // toast.success("Registration successfull. Please login");
      console.log("login request", data);
      
      if (data){
        setName(data.name)
        setAddress(data.address)
      }
      // redirect
      toast.success("Profile updated");

      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
    // console.log("register response", data)
  };

  return (
    <UserRoute>
      {loading && <SyncOutlined spin className={styles.loader} />}
      <div className={styles.headerDiv}>
        <h1 className={styles.header}>Edit Profile</h1>
      </div>

      <div className={styles.contentDiv}>
        <div className={styles.contentDivHeader1}>
          <h3 className={styles.detailHeader}>Edit Profile</h3>
        </div>
        <hr />

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <div className={styles.password}>
            <input
              type="text"
              className={styles.inputField}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <label>Gender</label>
          <div className={styles.password}>
            <input
              type="text"
              className={styles.inputField}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Address"
            />
          </div>
          <label>Address</label>
          <div className={styles.password}>
            <input
              type="text"
              className={styles.inputField}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>

          <button type="submit" className={styles.buttonField}>
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </UserRoute>
  );
};

export default EditProfile;

import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import styles from "../../../styles/InstructorSignup.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const EditProfile = () => {
  const router = useRouter();
  const {
    state: { user },
  } = useContext(Context);

  const [userDetail, setUserDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    loadUser();
  }, []);
  // useEffect(() => {
  //   if (userDetail && userDetail.role.includes("Instructor")) {
  //     router.back();
  //   }
  // }, [userDetail]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user-detail`);
      setUserDetail(data);
      console.log("userdetail", data);
      if (data) {
        setPhoneNumber(data.phoneNumber)
        setProfession(data.profession)
        setDisplayName(data.displayName)
        setAbout(data.about)
        setDescription(data.description)
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
      const { data } = await axios.post(`/api/instructor-signup`, {
        phoneNumber,
        profession,
        displayName,
        about,
        description
      });
      // toast.success("Registration successfull. Please login");
      console.log("login request", data);

      if (data) {
        setName(data.name);
        setAddress(data.address);
      }
      // redirect
      router.push('/instructor/profile/account-setting')
      toast.success("Instructor updated");

      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
    // console.log("register response", data)
  };

  return (
    <InstructorRoute>
      {loading && <SyncOutlined spin className={styles.loader} />}
      <div className={styles.headerDiv}>
        <h1 className={styles.header}>Update Instructor</h1>
      </div>

      <div className={styles.contentDiv}>
        <div className={styles.contentDivHeader1}>
          <h3 className={styles.detailHeader}>Instructor</h3>
        </div>
        <hr />

        <form onSubmit={handleSubmit}>
          {/* form div */}
          <div className={styles.formDiv}>
            <div className={styles.child1}>
              {/* start */}
              <div className={styles.childInput}>
                {/* display name input */}
                <label>Display Name</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Name"
                />
                {/* profession input */}
                <label>Profession</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="Profession"
                />
              </div>
              {/* end */}
              <div className={styles.childInput}>
                {/* phone number input */}
                <label>Phone Number</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="phone number"
                />
              </div>
            </div>
            {/* about and description */}
            <div className={styles.child2}>
              <label>About</label>
              <textarea
                rows="5"
                cols="50"
                type="text"
                className={styles.areaField}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="About you"
              />
              <label>Description</label>
              <textarea
                rows="10"
                cols="50"
                type="text"
                className={styles.areaField}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="About you"
              />
            </div>
            {/* social media link */}
            <div className={styles.child3}>
              <div className={styles.childInput}></div>
              <div className={styles.childInput}></div>
            </div>
          </div>

          <button type="submit" className={styles.buttonField}>
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </InstructorRoute>
  );
};

export default EditProfile;

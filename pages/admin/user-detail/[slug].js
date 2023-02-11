import { useState, useEffect } from "react";
import { Avatar, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import styles from "../../../styles/UserDetail.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import AdminRoute from "../../../components/routes/AdminRoute";

const AdminIndex = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const loadUser = async () => {
    const { data } = await axios.get(`/api/user-detail/${slug}`);
    if (data) {
      setName(data.name);
      setAddress(data.address);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      setProfession(data.profession);
      setDisplayName(data.displayName);
      setAbout(data.about);
      setDescription(data.description);

      setUser(data);
    }
  };

  const activateHandler = async (id) => {
    try {
      const answer = window.confirm("Are you sure you want to activate this account");
      if (!answer) return
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
      const answer = window.confirm("Are you sure you want to deactivate this account");
      if (!answer) return
      setLoading(true);
      const { data } = await axios.post(`/api/user-deactivation/${id}`, {});
      toast("User Account Deactivated !");
      setLoading(false);
      setFlag(!flag)
    } catch (err) {
      setLoading(false);
      toast("User Deactivation Failed !");
    }
  };

  const notificationHandler = async (slug) => {
    router.push(`/admin/notification/${slug}`)
  }


  useEffect(() => {
    loadUser();
  }, [flag, slug, router]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/edit-user/${slug}`, {
        name,
        address,
        email,
        profession,
        phoneNumber,
        displayName,
        about,
        description,
      });
      // toast.success("Registration successfull. Please login");
      console.log("updtaed", data);

      if (data) {
        setName(data.name);
        setAddress(data.address);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setProfession(data.profession);
        setDisplayName(data.displayName);
        setAbout(data.about);
        setDescription(data.description);
      }
      // redirect
      toast.success("Profile updated");

      setLoading(false);
      setFlag(!flag);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
    // console.log("register response", data)
  };

  const myStyle = { marginTop: "-15px", fontSize: "10px" };
  return (
    <AdminRoute>
      <div className={styles.container}>
        <h1 className={styles.header}>All Users</h1>

        {user && (
          <div className={styles.mainDiv}>
            <div className={styles.avatarDiv}>
              <Avatar className={styles.avatar} size={80} src={user.picture} />
              <p className={styles.Div2}>{user.name}</p>
            </div>
            {/* <div className={styles.nameDiv}>
                <Link
                  className={styles.link}
                  href={`/admin/user/${user.slug}`}
                >
                  <p className={styles.name}>{user.name}</p>
                </Link>
              </div> */}
            {/* email */}
            <div className={styles.headDiv}>
              <p className={styles.Div1}>Email</p>
              <p className={styles.Div2}>{user.email}</p>
            </div>
            {/* Activate */}
            <div className={styles.headDiv}>
              <p className={styles.Div1}>IsActivated</p>
              <p className={styles.Div2}>
                {user.activated ? (
                  <span className={styles.activated}> Activated</span>
                ) : (
                  <span className={styles.notActivated}> Not activated</span>
                )}
              </p>
            </div>
            {/* role */}
            <div className={styles.headDiv}>
              <p className={styles.Div1}>Role</p>
              <p className={styles.Div2}>
                {user.role && user.role.includes("Subscriber") && (
                  <span className={styles.text1}> Subscriber</span>
                )}
                {user.role && user.role.includes("Instructor") && (
                  <span className={styles.text2}> Instructor</span>
                )}
                {user.role && user.role.includes("Admin") && (
                  <span className={styles.text3}> Admin</span>
                )}
              </p>
            </div>
            {/* Gender */}
            <div className={styles.headDiv}>
              <p className={styles.Div1}>Gender</p>
              <p className={styles.Div2}>{user.gender}</p>
            </div>
            {/* address */}
            <div className={styles.headDiv}>
              <p className={styles.Div1}>Address</p>
              <p className={styles.Div2}>{user.address}</p>
            </div>
            
            {/* Phone number */}
            <div className={styles.headDiv}>
              <p className={styles.Div1}>Phone Number</p>
              <p className={styles.Div2}>{user.phoneNumber}</p>
            </div>
            {/* send Notification */}
            <div className={styles.headDiv}>
              <p className={styles.Div1}>Notify</p>
              <button onClick={() => notificationHandler} className={styles.buttonNotify}>Send Notification</button>
            </div>
            {/* Instructor */}
            {user.role && user.role.includes("Instructor") && (
              <>

            <div className={styles.headDiv}>
              <p className={styles.Div1}>Display Name</p>
              <p className={styles.Div2}>{user.displayName}</p>
            </div>
            {/* profession */}
            <div className={styles.headDiv}>
              <p className={styles.Div1}>Profession</p>
              <p className={styles.Div2}>{user.profession}</p>
            </div>
            {/* password */}
            <div className={styles.aboutDiv}>
              <p className={styles.Div1}>Password</p>
              {/* <p className={styles.Div2}>{user.password}</p> */}
            </div>
            {/* about */}
            <div className={styles.aboutDiv}>
              <p className={styles.Div1}>About</p>
              <p className={styles.Div2}>{user.about}</p>
            </div>
            {/* description */}
            <div className={styles.aboutDiv}>
              <p className={styles.Div1}>Description</p>
              <p className={styles.Div2}>{user.description}</p>
            </div>
              </>
            )}

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
          </div>
        )}

        {/* Edit user profile */}

        <form onSubmit={handleSubmit}>
          {/* form div */}
          <div className={styles.formDiv}>
            {/* start */}
            <label>Name</label>
            <input
              type="text"
              className={styles.inputField}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            {/* profession input */}
            <label>Email</label>
            <input
              type="email"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {/* phone number input */}
            <label>Phone Number</label>
            <input
              type="text"
              className={styles.inputField}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="phone number"
            />
            {/* Address input */}
            <label>Address</label>
            <input
              type="text"
              className={styles.inputField}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />

            {/* for instructor */}
            <div
              className={
                user.role && user.role.includes("Instructor")
                  ? styles.forInstructor
                  : styles.noInstructor
              }
            >
              {/* Displayname input */}
              <label>Display Name</label>
              <input
                type="text"
                className={styles.inputField}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Display Name"
              />
              {/* Profession input */}
              <label>Profession</label>
              <input
                type="text"
                className={styles.inputField}
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="Profession"
              />
              {/* end */}
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
    </AdminRoute>
  );
};

export default AdminIndex;

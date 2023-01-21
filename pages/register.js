import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import styles from "../styles/register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // router
  const router = useRouter();

  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table ({name, email, password})

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      toast.success("Registration successfull. Please login");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
    // console.log("register response", data)
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.div1}>
          <div><h2 className={styles.span1}>Create Account.</h2></div>
          <div> <h2 className={styles.span2}>Start Learning.</h2></div>
          <div><h2 className={styles.span3}>With Hundred of Studen.</h2></div>
          <div><h2 className={styles.span4}>Happy Learning.</h2></div>
        </div>
        <div className={styles.div2}>
          <h className={styles.headerRegister}>Register</h>
          <hr/>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              className={styles.inputField}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              required
            />
            <label>Email</label>
            <input
              type="email"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
            <label>Password</label>
            <input
              type="password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />

            <button
              type="submit"
              className={styles.buttonField}
              disabled={!name || !email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <div className={styles.notRegister}>

      <p className="text-center p-3">
        Already registered ? <Link href="/login">Login</Link>
      </p>
      </div>
    </>
  );
};

export default Register;

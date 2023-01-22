import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  SyncOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  // router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.back();
  }, [user]);

  // console.log("State", state)

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table ({name, email, password})

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      // toast.success("Registration successfull. Please login");
      console.log("login request", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      // redirect
      router.back();
      toast.success("Login successfull");

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
          <h2 className={styles.div1Header}>
            <span className={styles.span1}>Login And </span>
            <span className={styles.span2}>Start Learning.</span>
            <span className={styles.span3}>With Hundred of Students.</span>
            <span className={styles.span4}>Happy Learning.</span>
          </h2>
        </div>
        <div className={styles.div2}>
          <h className={styles.headerRegister}>Login</h>
          <hr />
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <div className={styles.password}>
              <input
                type="email"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
              <MailOutlined style={{ fontSize: "25px", padding: "5px" }} />
            </div>
            <label>Password</label>
            <div className={styles.password}>
              <input
                type={visible ? "text" : "password"}
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
              {visible ? (
                <EyeInvisibleOutlined
                  style={{ fontSize: "25px", padding: "5px" }}
                  onClick={() => setVisible(!visible)}
                />
              ) : (
                <EyeOutlined
                  style={{ fontSize: "25px", padding: "5px" }}
                  onClick={() => setVisible(!visible)}
                />
              )}
            </div>

            <button
              type="submit"
              className={styles.buttonField}
              disabled={!email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </form>

          <p className="text-center">
            Not yet registered ? <Link href="/register">Register</Link>
          </p>
          <p className="text-center p-3">
            <Link className="text-danger" href="/forgot-password">
              Forgot password
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

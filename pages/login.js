import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  // router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
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
      router.push("/user");
      toast.success("Login successfull");

      //   setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
    // console.log("register response", data)
  };

  return (
    <div className={styles.container}>
      <div className={styles.div1}>Login</div>
      <div className={styles.div2}>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
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
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>

        <p className="text-center">
          Not yet registered ? <Link href="/register">Register</Link>
        </p>
        <p className="text-center p-3">
          <Link className="text-danger" href="/forgot-password">Forgot password</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

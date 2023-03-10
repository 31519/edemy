import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import styles from "../styles/ForgotPassword.module.css";

const ForgotPassword = () => {
  // state
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // context
  const {
    state: { user },
  } = useContext(Context);

  // router
  const router = useRouter();

  // redirect if user is logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("check your email for the secret code .");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // console.log(email, code, newPassword);
    // return;

    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassword("");
      setSuccess(false)
      setLoading(false);
      router.push("/login")
      toast("Password reset successfully");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerDiv}>
        <h1 className={styles.headerText}>Forgot Password</h1>
      </div>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input
            type="email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          {success && (
            <>
              <input
                type="text"
                className={styles.inputField}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter secret code"
                required
              />
              <input
                type="password"
                className={styles.inputField}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </>
          )}
          <button
            type="submit"
            disabled={loading || !email}
            className={styles.buttonField}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

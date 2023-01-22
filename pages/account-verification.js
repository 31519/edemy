import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  SyncOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";

const AccountVerification = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  // router
  const router = useRouter();
  const {email, verificationCode} = router.query

  useEffect(() => {
    if (user !== null) router.back();
  }, [user]);

  useEffect(() => {
    if (email && verificationCode) {
        console.log("verification", verificationCode)
        console.log("email", email)
        handleSubmit()
    }
  }, [email, verificationCode]);

  // console.log("State", state)

  // Handle submit
  const handleSubmit = async () => {
    
    // console.table ({name, email, password})

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/verification-account`, {
        email,
        verificationCode,
      });
      // toast.success("Registration successfull. Please login");
      console.log("account reset", data);

      // save in local storage
    //   window.localStorage.setItem("user", JSON.stringify(data));
      // redirect
      router.push("/login");
      toast.success("Your account has been activated successfull");

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
        <div className={styles.div2}>
          <h className={styles.headerRegister}>Verify your Account</h>
          <hr />
          {loading && <SyncOutlined spin />}
          <form onSubmit={handleSubmit}>
          <div className={styles.password}>
              <input
                type="text"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
              
            </div>
            <button
              type="submit"
              className={styles.buttonField}
              disabled={!email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </form>

        </div>
      </div>
    </>
  );
};

export default AccountVerification

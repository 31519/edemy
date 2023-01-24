import { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import styles from "./UserRoute.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import UserNav from "../nav/UserNav";

const UserRoute = ({ children, showNav=true }) => {
  // state
  const [ok, setOk] = useState(false);

  //   router
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      //   console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log("errrrr", err);
      setOk(false);
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <div className={styles.container}>
          <div className={styles.div1}>
            <div className={styles.userNav}>
              {showNav && <UserNav />}
            </div>
            <div className={styles.childrenDiv}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};


export default UserRoute;

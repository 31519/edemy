import { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import styles from "./AdminRoute.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import AdminNav from "../nav/AdminNav";

const AdminRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);

  //   router
  const router = useRouter();

  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get("/api/admin-route");
      //   console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log("errrrr", err);
      setOk(false);
      router.push("/");
    }
  };

  useEffect(() => {
    fetchAdmin();
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
              <AdminNav  />
            </div>
            <div className={styles.childrenDiv}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminRoute;

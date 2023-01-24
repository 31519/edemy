import { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import styles from "./InstructorRoute.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import InstuctorNav from "../nav/InstuctorNav";

const InstructorRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);

  //   router
  const router = useRouter();

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
      //   console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log("errrrr", err);
      setOk(false);
      router.push("/");
    }
  };

  useEffect(() => {
    fetchInstructor();
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
              <InstuctorNav  />
            </div>
            <div className={styles.childrenDiv}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructorRoute;

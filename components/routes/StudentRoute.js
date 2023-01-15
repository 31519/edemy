import { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";

import axios from "axios";
import { useRouter } from "next/router";

import UserNav from "../nav/UserNav";

const StudentRoute = ({ children, showNav=true }) => {
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
        <div className="container-fluid">
          {children}
        </div>
      )}
    </>
  );
};

export default StudentRoute;

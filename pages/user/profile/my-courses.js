import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context";
import UserRoute from "../../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import UserVideoList from "../../../components/UserVideoList"
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";

const MyCourse = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [courses, setCourses] = useState([]);
  // const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      loadCourses()
      
  }, [])

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user-courses`);
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      {loading && (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-danger p-5"
        />
      )}
      <h1>My Courses</h1>

      {/* show list of courses */}
      <UserVideoList courses={courses}/>

    </UserRoute>
  );
};

export default MyCourse
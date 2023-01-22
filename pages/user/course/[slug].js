import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, createElement } from "react";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";
import { Col, Row } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
const { Item } = Menu;

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);
  // force state update

  const [updateState, setUpdateState] = useState(false)

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course) {
      loadCompletedLessons();
      console.log("ajdlajfajdfjasjfdlk");
    }
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  const loadCompletedLessons = async () => {
    try {
      const { data } = await axios.post(`/api/list-completed`, {
        courseId: course._id,
      });
      console.log("completed lesson", data);
      setCompletedLessons(data);
      setUpdateState(!updateState)
    } catch (err) {
      console.log(err);
    }
  };

  const markCompleted = async () => {
    //   console.log("mark as complete")
    try {
      const { data } = await axios.post(`/api/mark-completed`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      });
      console.log(data);
      setCompletedLessons([...completedLessons, course.lessons[clicked]._id])
    } catch (err) {
      console.log(err);
    }
  };

  const markInCompleted = async () => {
    //   console.log("mark as complete")
    try {
      const { data } = await axios.post(`/api/mark-incompleted`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      });
      const all = completedLessons;
      console.log("all", all);
      const index = all.indexOf(course.lessons[clicked]._id)
      if(index > -1) {
        all.splice(index, 1);
        setCompletedLessons(all)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StudentRoute>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div span={6} style={{ maxWidth: 320 }}>
          <Button
            onClick={() => setCollapsed(!collapsed)}
            className="text-primary mt-1 btn-block mb-2"
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            {!collapsed && "Lessons"}
          </Button>

          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{ height: "80vh", overflow: "scroll" }}
          >
            {course.lessons.map((lesson, index) => (
              <Item
                onClick={() => setClicked(index)}
                key={index}
                icon={<Avatar>{index + 1}</Avatar>}
              >
                {lesson.title.substring(0, 30)}
                {completedLessons.includes(lesson._id) ? (
                  <CheckCircleFilled
                    className="float-right text-primary ml-2"
                    style={{ marginTop: "13px" }}
                  />
                ) : (
                  <MinusCircleFilled
                  className="float-right text-danger ml-2"
                    style={{ marginTop: "13px" }}
                   />
                )}
              </Item>
            ))}
          </Menu>
        </div>

        <div style={{ width: "100%", height: "80%" }}>
          {clicked !== -1 ? (
            <>
              <>
                <div className="col alert alert-primary square">
                  <b>{course.lessons[clicked].title.substring(0, 30)}</b>
                  {completedLessons.includes(course.lessons[clicked]._id) ? (

                  <span className="float-right pointer" onClick={markInCompleted}>
                    Mark as incomplete
                  </span>
                  ): (
                    <span className="float-right pointer" onClick={markCompleted}>
                    Mark as completed
                  </span>
                  )}
                </div>
              </>

              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <>
                    <div className="wrapper">
                      <ReactPlayer
                        className="player"
                        url={course.lessons[clicked].video.Location}
                        width="100%"
                        height="100%"
                        controls
                        onEnded={() => markCompleted()}
                      />
                    </div>
                  </>
                )}
              <ReactMarkdown
                source={course.lessons[clicked].content}
                className="single-post"
              />
            </>
          ) : (
            <div className="text-center p-5">
              <PlayCircleOutlined className="text-primary display-1 p-5" />
              <p className="lead">Click on the lessons to start learning</p>
            </div>
          )}
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;

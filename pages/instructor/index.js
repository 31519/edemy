import { useState, useEffect } from "react";
import { Avatar, Tooltip } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import InstructorVideoList from "../../components/InstructorVideoList"
import styles from "../../styles/instructorIndex.module.css"
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const myStyle = { marginTop: "-15px", fontSize: "10px" };
  return (
    <InstructorRoute>
      <div className={styles.container}>
        <InstructorVideoList courses={courses} />
      </div>
      {/* <h1 className="jumbotron text-center square">Instructor Course</h1> */}

      {/* {courses &&
        courses.map((course) => (
          <>
            <div className="media pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
              />
              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <Link href={`/instructor/course/view/${course.slug}`}>
                      <p className="h5 mt-2 text-primary">{course.name}</p>
                    </Link>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons.length} Lessons
                    </p>
                    {course.lessons.length < 4 ? (
                      <p style={myStyle} className="text-warning">
                        At least 5 lessons are required to publish a course
                      </p>
                    ) : course.published ? (
                      <p style={myStyle} className="text-success">
                        Your course is live in the marketplace
                      </p>
                    ) : (
                      <p style={myStyle} className="text-success">
                        Your course is ready to be published
                      </p>
                    )}
                  </div>
                  <div className="col-md-3 mt-3 text-center">
                    {course.published ? (
                      <Tooltip title="Published">
                        <CheckCircleOutlined className="h5 pointer text-success" />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Unpublished">
                        <CloseCircleOutlined className="h5 pointer text-danger" />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))} */}
    </InstructorRoute>
  );
};

export default InstructorIndex;

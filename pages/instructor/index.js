import { useState, useEffect } from "react";
import { Avatar } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

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
      <h1 className="jumbotron text-center square">Instructor Course</h1>

      {courses &&
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
                    {course.lessons.length < 5 ? (
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
                      <div>
                        <CheckCircleOutlined className="h5 pointer text-success" />
                      </div>
                    ) : (
                      <div>
                        <CloseCircleOutlined className="h5 pointer text-danger" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </InstructorRoute>
  );
};

export default InstructorIndex;

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { Avatar, Tooltip, Button, Modal, List, Card } from "antd";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import styles from "../../../../styles/InstructorCourseDetail.module.css";

import {
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  QuestionOutlined,
  CloseOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import AddSectionForm from "../../../../components/forms/AddSectionForm";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [visible, setVisible] = useState(false);
  const [flag, setFlag] = useState(false);
  // lesson state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [video, setVideo] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);

  // section state
  const [name, setName] = useState("");
  const [sectionVisible, setSectionVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [sectionSlug, setSectionSlug] = useState("cos");

  const [students, setStudents] = useState(0);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    course && studentCount();
  }, []);

  const studentCount = async () => {
    const { data } = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    });
    console.log("Student count", data);
    setStudents(data.length);
  };

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
    console.log("content", data);
  };

  // add section
  // function for add video
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(title);
    try {
      const { data } = await axios.post(
        `/api/course/section/${slug}/${course.instructor._id}`,
        { name, description }
      );

      setName("");
      setDescription("");
      setSectionVisible(false);
      setCourse(data);
      toast("Section added");
    } catch (err) {
      console.log(err);
      toast("Section add failed");
    }
  };

  // function for add video
  const handleAddLesson = async (e) => {
    e.preventDefault();
    // console.log(title);
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${sectionSlug}/${course.instructor._id}`,
        { video, title, content }
      );

      setTitle("");
      setVideo({});
      setContent("");
      setProgress(0);
      setUploadButtonText("Upload video");
      setVisible(false);
      setFlag(!flag)
      toast("Lesson added");
    } catch (err) {
      console.log(err);
      toast("Lesson add failed");
    }
  };

  // remove video
  const handleVideoRemove = async () => {
    console.log("video remove", video);
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        video
      );
      console.log("data1", data);
      setVideo({});
      setUploading(false);
      setUploadButtonText("Upload another video");
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video remove failed");
    }
  };

  // handle video

  const handleVideo = async (e) => {
    // console.log(course)
    // return;
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);

      setUploading(true);
      console.log("handle video upload");

      const videoData = new FormData();
      videoData.append("video", file);
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      // once response is received
      console.log(data);
      setVideo(data);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video upload failed");
    }
  };

  useEffect(() => {
    console.log(slug);
    loadCourse();
  }, [slug, flag]);

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you publish your course, it will be live in the marketplace for users to enroll"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/publish/${courseId}`);
      setCourse(data);
      toast("Congrats ! Your course is live ");
    } catch (err) {
      toast("Course publish failed , Try again ");
    }

    //
  };

  const handleUnpublish = async (e, courseId) => {
    //
    try {
      let answer = window.confirm(
        "Once you unpublish your course, it will no longer be available for users to enroll"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
      setCourse(data);
      toast("Your course is unpublished ");
    } catch (err) {
      toast("course publish failed . Try again ");
    }
  };

  return (
    <InstructorRoute>
      <div className={styles.container}>
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <>
            <div className={styles.courseDiv}>
              <div className={styles.imageDiv}>
                <Image
                  className={styles.image}
                  src={course.image ? course.image.Location : "/course.png"}
                  layout="fill"
                />
              </div>

              <div className={styles.div2}>
                <h5 className={styles.name}>{course.name}</h5>
                <p style={{ marginTop: "-10px" }}>
                  {course.lessons && course.lessons.length} Lessons
                </p>
                <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                  {course.category}
                </p>
              </div>
            </div>
            <div>
              <div className={styles.buttonDiv}>
                <div className={styles.buttonSection}>
                  {/* <Tooltip title={`${students} Enrolled`}>
                  <UserSwitchOutlined className="h5 pointer text-danger  mr-4" />
                </Tooltip> */}
                  <h2
                    className={styles.buttonText}
                  >{`${students} Enrolled`}</h2>
                </div>

                <div
                  className={styles.buttonSection}
                  onClick={() => router.push(`/instructor/course/edit/${slug}`)}
                >
                  <h2 className={styles.buttonText}>Edit</h2>
                </div>

                {/* <Tooltip title="Edit">
                  <EditOutlined
                    onClick={() =>
                      router.push(`/instructor/course/edit/${slug}`)
                    }
                    className="h5 pointer text-danger  mr-4"
                  />
                </Tooltip> */}

                {course.section && course.section.length < 2 ? (
                  <div
                    className={styles.buttonSection}
                    onClick={() =>
                      router.push(`/instructor/course/edit/${slug}`)
                    }
                  >
                    <p className={styles.buttonPara}>
                      Min 2 section required to publish
                    </p>
                  </div>
                ) : course.published ? (
                  <div
                    className={styles.buttonSection}
                    onClick={(e) => handleUnpublish(e, course._id)}
                  >
                    <h2 className={styles.buttonText}>Unpublish</h2>
                  </div>
                ) : (
                  <div
                    className={styles.buttonSection}
                    onClick={(e) => handlePublish(e, course._id)}
                  >
                    <h2 className={styles.buttonText}>Publish</h2>
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col">
                  <ReactMarkdown children={course.description} />
                  {/* <p>{course.description}</p> */}
                </div>
              </div>
              <div className="row">
                {/* Add section */}
                <button
                  onClick={() => setSectionVisible(true)}
                  className={styles.buttonField}
                  type="primary"
                  icon={<UploadOutlined />}
                  size="large"
                >
                  Add Section
                </button>
                <br />

                <Modal
                  title="+ Add Section"
                  centered
                  visible={sectionVisible}
                  onCancel={() => setSectionVisible(false)}
                  footer={null}
                >
                  <AddSectionForm
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                    description={description}
                    setDescription={setDescription}
                    uploading={uploading}
                  />
                </Modal>

                <div className="row pb-5">
                  <div className="col lesson-list">
                    <h4>
                      {course && course.section && course.section.length}{" "}
                      Section
                    </h4>
                    <hr />
                    {/* section div */}
                    <div className={styles.sectionDiv}>
                      {course &&
                        course.section &&
                        course.section.map((item, index) => (
                          <div className={styles.sectionList}>
                            <div className={styles.sectionHeader}>
                              <div className={styles.avatar}>
                                <Avatar>{index + 1} </Avatar>
                              </div>
                              <div className={styles.nameDiv}>
                                <p className={styles.name}>{item.name}</p>
                                <p className={styles.videoLength}>12 min</p>
                              </div>
                            </div>
                            <hr />
                            {/* lesson list */}
                            {
                              <>
                                <List
                                  itemLayout="horizontal"
                                  dataSource={item && item.lessons}
                                  renderItem={(lesson, lessonIndex) => (
                                    <List.Item>
                                      <List.Item.Meta
                                        avatar={
                                          <Avatar>{lessonIndex + 1} </Avatar>
                                        }
                                        title={lesson.title}
                                      ></List.Item.Meta>
                                      <p className={styles.videoLength}>12 min</p>
                                    </List.Item>
                                  )}
                                />
                                {/* // add leson */}
                                <div className={styles.addLessonButton}>
                                  <button
                                    onClick={() => {
                                      setSectionSlug(item.slug);
                                      setVisible(true);
                                    }}
                                    className={styles.buttonField}
                                    type="primary"
                                    icon={<UploadOutlined />}
                                    size="large"
                                  >
                                    + Add Lesson
                                  </button>
                                  <br />

                                  <Modal
                                    title={sectionSlug}
                                    centered
                                    visible={visible}
                                    onCancel={() =>{
                                       setVisible(false)
                                       setSectionSlug("")
                                    }
                                      }
                                    footer={null}
                                  >
                                    <AddLessonForm
                                      handleAddLesson={handleAddLesson}
                                      title={title}
                                      setTitle={setTitle}
                                      content={content}
                                      setContent={setContent}
                                      video={video}
                                      progress={progress}
                                      setVideo={setVideo}
                                      uploading={uploading}
                                      handleVideoRemove={handleVideoRemove}
                                      handleVideo={handleVideo}
                                      setUploading={setUploading}
                                      uploadButtonText={uploadButtonText}
                                      setUploadButtonText={setUploadButtonText}
                                      slug={sectionSlug}
                                    />
                                  </Modal>

                                  {/* <div className="row pb-5">
                                    <div className="col lesson-list">
                                      <h4>
                                        {course &&
                                          course.lessons &&
                                          course.lessons.length}{" "}
                                        Lessons
                                      </h4>

                                      <List
                                        itemLayout="horizontal"
                                        dataSource={course && course.lessons}
                                        renderItem={(item, index) => (
                                          <List.Item>
                                            <List.Item.Meta
                                              avatar={
                                                <Avatar>{index + 1} </Avatar>
                                              }
                                              title={item.title}
                                            ></List.Item.Meta>
                                          </List.Item>
                                        )}
                                      />
                                    </div>
                                  </div> */}
                                </div>
                                <hr/>
                                {/* End of add lesson */}
                              </>
                            }
                          </div>
                        ))}
                    </div>

                    {/* <List
                      itemLayout="horizontal"
                      dataSource={course && course.section}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar>{index + 1} </Avatar>}
                            title={item.name}
                          ></List.Item.Meta>
                        </List.Item>
                      )}
                    /> */}
                  </div>
                </div>
              </div>
              {/* Add Lesson */}
              {/* <div className="row">
                <button
                  onClick={() => setVisible(true)}
                  className={styles.buttonField}
                  type="primary"
                  icon={<UploadOutlined />}
                  size="large"
                >
                  Add Lesson
                </button>
                <br />

                <Modal
                  title="+ Add Lesson"
                  centered
                  visible={visible}
                  onCancel={() => setVisible(false)}
                  footer={null}
                >
                  <AddLessonForm
                    handleAddLesson={handleAddLesson}
                    title={title}
                    setTitle={setTitle}
                    content={content}
                    setContent={setContent}
                    video={video}
                    progress={progress}
                    setVideo={setVideo}
                    uploading={uploading}
                    handleVideoRemove={handleVideoRemove}
                    handleVideo={handleVideo}
                    setUploading={setUploading}
                    uploadButtonText={uploadButtonText}
                    setUploadButtonText={setUploadButtonText}
                  />
                </Modal>

                <div className="row pb-5">
                  <div className="col lesson-list">
                    <h4>
                      {course && course.lessons && course.lessons.length}{" "}
                      Lessons
                    </h4>

                    <List
                      itemLayout="horizontal"
                      dataSource={course && course.lessons}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar>{index + 1} </Avatar>}
                            title={item.title}
                          ></List.Item.Meta>
                        </List.Item>
                      )}
                    />
                  </div>
                </div>
              </div> */}
            </div>
          </>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;

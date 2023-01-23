import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { Avatar, Tooltip, Button, Modal, List, Card } from "antd";
import ReactMarkdown from "react-markdown";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import {
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  QuestionOutlined,
  CloseOutlined,
  UserSwitchOutlined
} from "@ant-design/icons";
import AddLessonForm from "../../../../components/forms/AddLessonForm";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [visible, setVisible] = useState(false);
  //
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [video, setVideo] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgess] = useState(0);

  const [students, setStudents]= useState(0)



  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    course && studentCount()
  }, [])

  const studentCount = async() => {
    const {ata} = await axios.post(`/api/instructor/student-count`, {
      courseId:course._id,
    })
    console.log("Student count", data)
    setStudents(data.length)
  }

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
    console.log("content", data);
  };

  // function for add video
  const handleAddLesson = async (e) => {
    e.preventDefault();
    // console.log(title);
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        { video, title, content }
      );

      setTitle("");
      setVideo({});
      setContent("");
      setProgress(0)
      setUploadButtonText("Upload video");
      setVisible(false);
      setCourse(data);
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
            setProgess(Math.round((100 * e.loaded) / e.total));
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
  }, [slug]);

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you publish your course, it will be live in the marketplace for users to enroll"
      );
      if(!answer) return
      const {data} = await axios.put(`/api/course/publish/${courseId}`);
      setCourse(data)
      toast("Congrats ! Your course is live ")
    } catch(err){
      toast("Course publish failed , Try again ")
    }

    //
  };

  const handleUnpublish = async (e, courseId) => {
    
    //
    try {
      let answer = window.confirm(
        "Once you unpublish your course, it will no longer be available for users to enroll"
      );
      if(!answer) return
      const {data} = await axios.put(`/api/course/unpublish/${courseId}`);
      setCourse(data)
      toast("Your course is unpublished ")
    } catch(err){
      toast("course publish failed . Try again ")
    }
  };

  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className="container-fluid pt-1">
            <div className="media pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
              />

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary">{course.name}</h5>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                      {course.category}
                    </p>
                  </div>
                  <div className="d-flex">


                  <Tooltip title={`${students} Enrolled`}>
                      <UserSwitchOutlined-
                        
                        className="h5 pointer text-danger  mr-4"
                      />
                    </Tooltip>



                    <Tooltip title="Edit">
                      <EditOutlined
                        onClick={() =>
                          router.push(`/instructor/course/edit/${slug}`)
                        }
                        className="h5 pointer text-danger  mr-4"
                      />
                    </Tooltip>

                    {course.lessons && course.lessons.length < 4 ? (
                      <Tooltip title="Min 5 Lessons required to publish">
                        <QuestionOutlined className="h5 pointer text-danger" />
                      </Tooltip>
                    ) : course.published ? (
                      <Tooltip title="Unpublish">
                        <CloseOutlined
                          onClick={(e) => handleUnpublish(e, course._id)}
                          className="h5 pointer text-danger"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Publish">
                        <CheckOutlined
                          onClick={(e) => handlePublish(e, course._id)}
                          className="h5 pointer text-danger"
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <ReactMarkdown children={course.description} />
                {/* <p>{course.description}</p> */}
              </div>
            </div>

            <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="coll-md-6 offset-md-3 text-center"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
              >
                Add Lesson
              </Button>
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
                    {course && course.lessons && course.lessons.length} Lessons
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
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
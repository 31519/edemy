import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import Resizer from "react-image-file-resizer";
import { Avatar, Tooltip, Button, Modal, List, Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styles from "../../../../../../styles/CourseEdit.module.css";
const { Option } = Select;
import { useRouter } from "next/router";
import InstructorRoute from "../../../../../../components/routes/InstructorRoute";
import AddSectionForm from "../../../../../../components/forms/AddSectionForm";
import UpdateLessonForm from "../../../../../../components/forms/UpdateLessonForm";
import { DownOutlined } from "@ant-design/icons";
// import { Dropdown, Space } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const SectionEdit = () => {
  const router = useRouter();
  const { slug, sectionSlug } = router.query;

  const [values, setValues] = useState({});
  const [flag, setFlag] = useState(false);
  // state for section
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState({});

  // state for lessons updates\
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState("Upload video");
  const [progress, setProgress] = useState(0);
  const [uploadingLesson, setUploadingLesson] = useState(false);
  const [lessonId, setLessonId] = useState("");

  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("upload image");

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setLoading(true);
    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });
        console.log("image uploaded", data);
        setImage(data);
        // set iamge in the state and toast
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast("image upload failed try again");
      }
    });
  };

  // handle image remove
  const handleImageRemove = async () => {
    console.log("remove image");
    try {
      setLoading(true);
      const res = await axios.post("/api/course/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload image");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast("image delete failed try again");
    }
  };

  // handle edit section button
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // console.log(values);
      const { data } = await axios.put(
        `/api/course/section/${slug}/${sectionSlug}`,
        {
          name,
          description,
        }
      );
      setLoading(false);
      toast("Section Updated !");
      setFlag(!flag);
      //   router.push("/instructor");
    } catch (err) {
      setLoading(false);
      toast("Section update failed");
    }
  };

  const handleDrag = (e, index) => {
    // console.log('On Drag=>', index)
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = async (e, index) => {
    // console.log("ondrop=>", index)
    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = lessons;

    let movingItem = allLessons[movingItemIndex];
    console.log("allLessongindex", movingItem);
    allLessons.splice(movingItemIndex, 1); //remove 1 item from the given index
    allLessons.splice(targetItemIndex, 0, movingItem); // push item after target item index

    setLessons([...allLessons]);
    // save the new lessons order in db
    const { data } = await axios.put(
      `/api/course/section-lesson-update/${slug}/${sectionSlug}`,
      {
        lessons,
      }
    );
    console.log("Lessons Rearrange Response => ", data);
    toast("Lessons Rearranged Successfully");
  };

  const handleDelete = async (index) => {
    console.log(index);
    const answer = window.confirm("Are you sure you want to delete");
    if (!answer) return;
    let allLessons = lessons;
    const removed = allLessons.splice(index, 1);
    console.log("removed id", removed[0]._id);
    // send request to server
    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
    setLessons(data.lessons);
    console.log("lesson delete", data.lessons);
  };

  // lesson update function

  const handleVideo = async (e) => {
    console.log("handle video");
    if (current.video && current.video.Location) {
      const res = await axios.post(
        `/api/course/video-remove/${instructor._id}`,
        current.video
      );
      console.log("remove", res);
    }
    // upload
    const file = e.target.files[0];
    setUploadVideoButtonText(file.name);
    setUploadingLesson(true);
    // send video as form data
    const videoData = new FormData();
    videoData.append("video", file);
    videoData.append("courseId", values._id);
    // save progress bar and send video as form data to backend
    const { data } = await axios.post(
      `/api/course/video-upload/${instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) =>
          setProgress(Math.round((100 * e.loaded) / e.total)),
      }
    );
    console.log("uploaded", data);
    setCurrent({ ...current, video: data });
    setUploadingLesson(false);
  };

  const handleUpdateLesson = async (e) => {
    // console.log("handle lesson");
    e.preventDefault();
    setUploadingLesson(true);
    const { data } = await axios.put(
      `/api/course/lesson-update/${slug}/${section._id}/${lessonId}`,
      current
    );
    setUploadVideoButtonText("Upload video");
    setVisible(false);
    // setCourse(data)
    // update ui
    if (data.ok) {
      let arr = lessons;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setLessons(arr);
      toast("Lesson updated");
    }
    setUploadingLesson(false);
  };

  useEffect(() => {
    slug && loadSection();
  }, [slug, flag, router]);

  const loadSection = async () => {
    const { data } = await axios.get(`/api/course/${slug}/${sectionSlug}`);
    //   setValues(tit)
    if (data) {
      setName(data[0].section[0].name);
      setDescription(data[0].section[0].description);
      setLessons(data[0].section[0].lessons);
      setSection(data[0].section[0]);
      setCurrent(data[0].section[0].lessons);
      console.log("data", data);
    }
  };

  const readLesson = async (lessonId) => {
    try {
      setLoading(true);
      // setLessonId(sec._id);
      setVisible(true);
      const { data } = await axios.get(
        `/api/course/read-lesson/${slug}/${section._id}/${lessonId}`
      );
      //   setValues(tit)
      if (data) {
        console.log("dta", data);
        setCurrent(data[0].lessons[0]);
        console.log("data", data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Update Section</h1>
      <div className="pt-3 pb=3">
        {
          <AddSectionForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            loading={loading}
            setLoading={setLoading}
            handleSubmit={handleSubmit}
            editPage={true}
          />
        }
      </div>

      {/* <pre>{JSON.stringify(name, null, 4)}</pre>
      <pre>{JSON.stringify(price, null, 4)}</pre> */}

      <hr />
      {/* List */}
      {/* <p>{section.title}</p> */}
      {/* <p>{JSON.stringify({ section })}</p> */}

      <div onDragOver={(e) => e.preventDefault()}>
        {lessons &&
          lessons.map((sec, index) => (
            <div
              className={styles.selectMenu}
              draggable
              onDragStart={(e) => handleDrag(e, index)}
              onDrop={(e) => handleDrop(e, index)}
            >
              {/* section name */}
              <div className={styles.selectBtn}>
                <div className={styles.selectBtn}>
                  <div>
                    <p className={styles.indexPara}>{index + 1}</p>
                  </div>
                  <div>
                    <p className={styles.namePara}>{sec.title}</p>
                  </div>
                </div>
                <div onClick={() => {
                  readLesson(sec._id)
                }
                }>
                  <p className={styles.editPara}>{loading? "loading...":"Edit"}</p>
                </div>
              </div>

              <Modal
                title="Update lesson"
                centered
                visible={visible}
                onCancel={() => {
                  setLoading(false);
                  setVisible(false);
                }}
              >
                <UpdateLessonForm
                  current={current}
                  setCurrent={setCurrent}
                  handleUpdateLesson={handleUpdateLesson}
                  handleVideo={handleVideo}
                  uploadVideoButtonText={uploadVideoButtonText}
                  setUploadVideoButtonText={setUploadVideoButtonText}
                  progress={progress}
                  uploadingLesson={uploadingLesson}
                />
                {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
              </Modal>
            </div>
          ))}
      </div>
    </InstructorRoute>
  );
};

export default SectionEdit;

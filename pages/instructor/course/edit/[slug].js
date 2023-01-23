import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import Resizer from "react-image-file-resizer";
import { Avatar, Tooltip, Button, Modal, List, Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../../components/forms/CourseCreateForm";
import UpdateLessonForm from "../../../../components/forms/UpdateLessonForm";

import { SaveOutlined } from "@ant-design/icons";

const CourseEdit = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);

  const [values, setValues] = useState({});
  // state
  const [name, setName] = useState("");
  const [image, setImage] = useState({});
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("1");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const [lessons, setLessons] = useState([]);
  const [instructor, setInstructor] = useState({});

  // state for lessons updates\
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState("Upload video");
  const [progress, setProgress] = useState(0);
  const [uploadingLesson, setUploadingLesson] = useState(false);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // console.log(values);
      const { data } = await axios.put(`/api/course/${slug}`, {
        name,
        category,
        description,
        price,
        paid,
        image,
      });
      setLoading(false);
      toast("Course Updated !");
      //   router.push("/instructor");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
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
    const { data } = await axios.put(`/api/course/${slug}`, {
      name,
      category,
      description,
      price,
      paid,
      image,
      lessons,
    });
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

  const handleUpdateLesson = async(e) => {
    // console.log("handle lesson");
    e.preventDefault();
    setUploadingLesson(true)
    const {data} = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    setUploadVideoButtonText("Upload video")
    setVisible(false)
    // setCourse(data)
    // update ui
    if(data.ok){
      let arr = lessons
      const index = arr.findIndex((el) => el._id === current._id)
      arr[index] = current;
      setLessons(arr)
      toast("Lesson updated")
    }
    setUploadingLesson(false)
  };

  useEffect(() => {
    slug && loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    //   setValues(tit)

    setName(data.name);
    setCategory(data.category);
    setDescription(data.description);
    data && data.image && setImage(data.image);
    setPrice(data.price);
    setPaid(data.paid);
    setLessons(data.lessons);
    data && setInstructor(data.instructor);
    data && console.log("values data", instructor);
  };

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Update Course</h1>
      <div className="pt-3 pb=3">
        {
          <CourseCreateForm
            name={name}
            setName={setName}
            category={category}
            setCategory={setCategory}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            setPaid={setPaid}
            paid={paid}
            uploading={uploading}
            setUploading={setUploading}
            loading={loading}
            setLoading={setLoading}
            preview={preview}
            setPreview={setPreview}
            imagePreview={imagePreview}
            uploadButtonText={uploadButtonText}
            setImagePreview={setImagePreview}
            handleSubmit={handleImage}
            handleImage={handleImage}
            handleImageRemove={handleImageRemove}
            handleSubmit={handleSubmit}
            editPage={true}
            image={image}
          />
        }
      </div>

      {/* <pre>{JSON.stringify(name, null, 4)}</pre>
      <pre>{JSON.stringify(price, null, 4)}</pre> */}

      <hr />
      {/* List */}

      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>{lessons && lessons.length} Lessons</h4>

          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={lessons && lessons}
            renderItem={(item, index) => (
              <List.Item
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <List.Item.Meta
                  onClick={() => {
                    setVisible(true);
                    setCurrent(item);
                  }}
                  avatar={<Avatar>{index + 1} </Avatar>}
                  title={item.title}
                ></List.Item.Meta>

                <DeleteOutlined
                  onClick={() => handleDelete(index)}
                  className="text-danger"
                />
              </List.Item>
            )}
          />
        </div>
      </div>
      <Modal
        title="Update lesson"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
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
    </InstructorRoute>
  );
};

export default CourseEdit;

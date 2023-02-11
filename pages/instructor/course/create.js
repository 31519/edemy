import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Select, Button } from "antd";
import Resizer from "react-image-file-resizer";
const { Option } = Select;
import { useRouter } from "next/router";
import InstructorRoute from "../../../components/routes/InstructorRoute";

import { SaveOutlined } from "@ant-design/icons";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";

const CourseCreate = () => {
  const router = useRouter();
  // state
  const [name, setName] = useState("");
  const [image, setImage] = useState({});
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("2005");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(true);
  const [imagePreview, setImagePreview] = useState("");

  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("upload image");

  // const [values, setValues] = useState({
  //   name: "edemy",
  //   description: "",
  //   price: "3.39",
  //   uploading: false,
  //   paid: true,
  //   loading: false,
  //   imagePreview: "",
  // });

  // const handleChange = (e) => {
  //   setValues[{ ...values, [e.target.name]: e.target.value }];
  // };

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
      const { data } = await axios.post("/api/course", {
        name,
        category,
        description,
        price,
        paid,
        image,
      });
      setLoading(false);
      toast("Great! Now you can start adding lessons");
      router.push("/instructor");                             
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Create Course</h1>
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
            handleImage={handleImage}
            handleImageRemove={handleImageRemove}
            handleSubmit={handleSubmit}
          />
        }
      </div>

      <pre>{JSON.stringify(category, null, 4)}</pre>
      <pre>{JSON.stringify(price, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CourseCreate;

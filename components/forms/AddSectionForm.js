import { Button, Progress, Tooltip } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const AddSectionForm = ({

  name,
  setName,
  description,
  setDescription,
  loading,
  editPage = false,
  uploading,
  handleSubmit
}) => {
  return (
    <div className="container pt">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Title"
          autoFocus
          required
        />
        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Content"
        />

        <button
          onClick={handleSubmit}
          loading={uploading}
          disabled={loading || uploading}
          // className={styles.buttonField}
          shape="round"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
};

export default AddSectionForm;

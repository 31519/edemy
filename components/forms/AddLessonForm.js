import { Button, Progress, Tooltip } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const AddLessonForm = ({
  title,
  setTitle,
  content,
  setContent,
  video,
  setVideo,
  progress,
  uploading,
  setUploading,
  handleVideo,
  handleVideoRemove,
  handleAddLesson,
  uploadButtonText,
  setUploadButtonText,
  slug
}) => {
  return (
    <div className="container pt">
      <form onSubmit={handleAddLesson}>
      {slug}
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
          autoFocus
          required
        />
        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Content"
        />

        <div className="d-flex justify-content-center">
          <label className="btn btn-dark btn-block text-left mt-3">
            {uploadButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>

          {!uploading && video.Location && (
            <Tooltip title="Remove">
              <span onClick={handleVideoRemove} className="pt-1 pl-3">
                <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
              </span>
            </Tooltip>
          )}
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            step={10}
          />
        )}

        <Button
          onClick={handleAddLesson}
          className="col mt-3"
          size="large"
          type="primary"
          loading={uploading}
          shape="round"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddLessonForm;

import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.css";

const VideoList = ({ courses }) => {
  const myStyle = { marginTop: "-15px", fontSize: "10px" };
  return (
    <>
      {courses &&
        courses.map((course) => (
          <Link
            className={styles.link}
            href={`/instructor/course/view/${course.slug}`}
          >
            <div className={styles.courseDiv}>
              <div className={styles.imageDiv}>
                {/* <Avatar
                      size={80}
                      src={course.image ? course.image.Location : "/course.png"}
                    /> */}
                <Image
                  className={styles.image}
                  src={course.image ? course.image.Location : "/course.png"}
                  layout="fill"
                />
              </div>
              <div className={styles.div2}>
                <h3 className={styles.name}>{course.name}</h3>
                <p className={styles.name}>{course.lessons.length} Lessons</p>
                {course.lessons.length < 4 ? (
                  <p style={myStyle} className={styles.danger}>
                    At least 5 lessons are required to publish a course
                  </p>
                ) : course.published ? (
                  <p style={myStyle} className={styles.success}>
                    Your course is live in the marketplace
                  </p>
                ) : (
                  <p style={myStyle} className={styles.primary}>
                    Your course is ready to be published
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default VideoList;

import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { User } from "react-feather";

function index() {
  return (
    <div className={styles.instructor}>
      <div className={styles.instructorAuthor}>
        {/* instructor header */}
        <div className={styles.instructorTitle}>
          <h4 className={styles.instructorTitleStyle}>Instructor</h4>
        </div>
        {/* instructor media */}
        <div className={styles.instructorMedia}>
          <div className={styles.instructorThumbnail}>
            <Link className={styles.link} href="#">
              <Image
                alt="icon"
                src="/myPic.jpg"
                className={styles.instructorImage}
                width={150}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.instructorMediaBody}>
            <div>
              <h5 className={styles.instructorTitle}>
                <Link className={styles.instructorLink} href="#">
                  Cos Rumut
                </Link>
              </h5>
              <span className={styles.instructorProfession}>
                Advanced Educator
              </span>
              <ul className={styles.instructorList}>
                <li className={styles.instructorListStyle}>
                  <User className={styles.instructorListIcon} size={14} />
                  91245 Students
                </li>
              </ul>
            </div>
            {/* instructor descripton */}
            <div className={styles.instructorDescription}>
              <p className={styles.instructorDescriptionPara}>
                John is a brilliant educator, whose life was spent for computer
                science and love of nature.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;

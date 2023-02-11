import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Book, Users } from "react-feather";
import { StarFilled , UserOutlined} from "@ant-design/icons";
import Link from "next/link";
import { Avatar } from 'antd';

function index() {
  return (
    <div className={styles.gridColumn}>
      {/* start single card */}
      <div className={styles.courseGrid}>
        <div className={styles.card}>
          {/* image */}
          <div className={styles.cardImage}>
            <Image
              src="/thumbnail.jpg"
              alt="image"
              fill
              className={styles.image}
            />
          </div>
          {/* detail */}
          <div className={styles.cardBody}>
            {/* rating */}
            <div className={styles.rating}>
              <div className={styles.review}>
                <div className={styles.star}>
                  <StarFilled style={{ color: "#FF9747" }} />
                  <StarFilled style={{ color: "#FF9747" }} />
                  <StarFilled style={{ color: "#FF9747" }} />
                  <StarFilled style={{ color: "#FF9747" }} />
                  <StarFilled style={{ color: "#FF9747" }} />
                </div>
              </div>
              <span className={styles.reviewNumber}>(15 review)</span>
            </div>
            {/* title */}
            <h4 className={styles.courseTitle}>Course title</h4>
            <ul className={styles.meta}>
              <li className={styles.metaList}>
                <Book size={20} />
                12 Lessons
              </li>
              <li className={styles.metaList}>
                <Users size={20} />
                50 Students
              </li>
            </ul>
            {/* decription */}
            <p className={styles.cardText}>
              This is a long description text for the detail course
            </p>
            {/* author */}
            <div className={styles.author}>
              {/* image */}
              <Avatar size="large"  src={<Image fill src="/myPic.jpg" alt="avatar" />}  />
              <div className={styles.authorDiv}>
                By{" "}
                <Link className={styles.authorLink} href="#">
                  Badahunlang
                </Link>
              </div>
            </div>
            {/* price */}
            <div className={styles.priceDiv}>
              <span className={styles.currentPrice}>Rs 5000</span>
              <span className={styles.offPrice}>Rs{5000 + 500}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;

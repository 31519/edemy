import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { Star, Users, Book, ChevronRight } from "react-feather";
import SingleCard from "../SingleCard";

const items = [
  { name: "cos" },
  { name: "cos" },
  { name: "cos" },
  { name: "cos" },
  { name: "cos" },
  { name: "cos" },
  { name: "cos" },
  { name: "cos" },
  { name: "cos" },
  { name: "cos" },
  { name: "cos" },
  { name: "cos" },
  { name: "cos" },
  { name: "cos" },
];

function CourseList() {
  return (
    <div>
      <div>
        <div className={styles.pageBannerWrapper}>
          {/* start banner bg image */}
          <div className={styles.bannerImage}></div>
          {/* end banner bg image */}

          {/* start banner content */}
          <div className={styles.bannerContent}>
            {/* start banner content top */}
            <div className={styles.bannerContentTop}>
              <div className={styles.container}>
                <div className={styles.row}>
                  <div className={styles.colLarge}>
                    {/* start breadcrumb area */}
                    <ul className={styles.pageList}>
                      <li className={styles.breadcrumbItem}>
                        <Link className={styles.link} href="/">
                          Home
                        </Link>
                      </li>
                      <li>
                        <div className={styles.iconRight}>
                          <ChevronRight size={20} />
                        </div>
                      </li>
                      <li className={styles.breadcrumbItem}>All Courses</li>
                    </ul>
                    {/* end breadcrumb area */}
                    <div className={styles.titleWrapper}>
                      <h1 className={styles.title}>All Courses</h1>
                      <Link href="#" className={styles.badge2}>
                        <div className={styles.imageBadge}>🎉</div>
                        50 Courses
                      </Link>
                    </div>
                    <p className={styles.description}>
                      Courses that help you achive your goals and attain new
                      skill
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* end banner content top */}

            {/* start course top */}
          </div>
          {/* heading */}
          <div></div>
          {/* number */}
          <div></div>
          {/* search */}
          <div></div>
        </div>
        {/* course list */}
        <div className={styles.sectionOverlapping}>
          <div className={styles.inner}>
            <div className={styles.courseListContainer}>
              {items.map((item) => (
                <SingleCard key={item.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseList;

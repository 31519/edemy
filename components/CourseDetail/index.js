import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CourseAccordion from "../CourseAccordion";
import {
  Star,
  Users,
  Book,
  ChevronRight,
  Calendar,
  Globe,
  Award,
  Check,
} from "react-feather";
import ExtraFeature from "../ExtraFeature";
import InstructorArea from "../InstructorArea";
import PriceCard from "../PriceCard";
import SingleCard from "../SingleCard";
import { StarFilled } from "@ant-design/icons";
import { Avatar } from 'antd';
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

function CourseDetail() {
  const [show, setShow] = useState(false);
  return (
    <div>
      {/* start breadcrum area */}
      <div className={styles.breadcrumbArea}>
        <div className={styles.breadcrumbInner}>
          <Image
            className={styles.breadcrumbImage}
            src="/bgimage.jpg"
            alt="edu image"
            fill
          />
        </div>

        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col}>
              {/* content */}
              <div className={styles.content}>
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
                  <li className={styles.breadcrumbItem}>Development</li>
                </ul>
                {/* end breadcrumb area */}
                {/* Title */}
                <h2 className={styles.title}>
                  The Complete Histudy 2022: From Zero to Expert!
                </h2>
                {/* description */}
                <p className={styles.description}>
                  Master Python by building 100 projects in 100 days. Learn data
                  science, automation, build websites, games and apps!
                </p>
                {/* start of badge */}
                <div className={styles.startBadge}>
                  {/* seller badge */}
                  <div className={styles.sellerBadge}>
                    <span className={styles.badge}>
                      <span className={styles.badgeImage}>🎉</span>
                      Bestseller
                    </span>
                  </div>
                  {/* rating */}
                  <div className={styles.rating}>
                    <span className={styles.startRating}>4.8</span>
                    <StarFilled style={{ color: "#FF9747" }} />
                    <StarFilled style={{ color: "#FF9747" }} />
                    <StarFilled style={{ color: "#FF9747" }} />
                    <StarFilled style={{ color: "#FF9747" }} />
                    <StarFilled style={{ color: "#FF9747" }} />
                  </div>
                  {/* total rating */}
                  <div className={styles.totalRating}>
                    <h5 className={styles.ratingNumber}>123547 rating</h5>
                  </div>
                  {/* total student */}
                  <div className={styles.totalStudent}>
                    <span className={styles.student}>123584 Students</span>
                  </div>
                </div>
                {/* badge end */}
                {/* author */}
                <div className={styles.author}>
                  {/* image */}
                  <Avatar size={64}  src={<Image fill src="/myPic.jpg" alt="avatar" />}  />
                  <div className={styles.authorDiv}>
                    By{" "}
                    <Link className={styles.authorLink} href="#">
                      Badahunlang
                    </Link>
                  </div>
                </div>
                {/* meta */}
                <ul className={styles.meta}>
                  <li className={styles.metaList}>
                    <Calendar size={14} className={styles.icon} />
                    Last updated 12/2024
                  </li>
                  <li className={styles.metaList}>
                    <Globe size={14} className={styles.icon} />
                    English
                  </li>
                  <li className={styles.metaList}>
                    <Award size={14} className={styles.icon} />
                    Certified Course
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end breadcrumb area */}
      <div className={styles.courseDetail}>
        {/* Start of course detail */}
        <div className={styles.courseDetailContainer}>
          <div className={styles.courseDetailCol}>
            {/* course content */}
            <div className={styles.courseDetailContent}>
              {/* image */}
              <div className={styles.thumbnail}>
                <Image
                  className={styles.thumbnailImage}
                  src="/thumbnail.jpg"
                  alt="thumbnail"
                  fill
                />
              </div>
              {/* start course feature box */}
              <div className={styles.featureBox}>
                <div className={styles.featureBoxInner}>
                  <div className={styles.secondTitle}>
                    <h4 className={styles.secondTitleStyle}>What you learn</h4>
                  </div>
                  <p className={styles.para}>
                    Are you new to PHP or need a refresher? Then this course
                    will help you get all the fundamentals of Procedural PHP,
                    Object Oriented PHP, MYSQLi and ending the course by
                    building a CMS system similar to WordPress, Joomla or
                    Drupal. Knowing PHP has allowed me to make enough money to
                    stay home and make courses like this one for students all
                    over the world.
                  </p>
                  <div
                    className={
                      show ? styles.startFeatureBox : styles.notStartFeatureBox
                    }
                  >
                    <div className={styles.starFeatureCol}>
                      <ul className={styles.listStyle1}>
                        <li className={styles.listStyle2}>
                          <Check
                            className={styles.checkIcon}
                            color="green"
                            size={50}
                          />
                          Become an advanced, confident, and modern JavaScript
                          developer from scratch.
                        </li>
                        <li className={styles.listStyle2}>
                          <Check
                            className={styles.checkIcon}
                            color="green"
                            size={50}
                          />
                          Become an advanced, confident, and modern JavaScript
                          developer from scratch.
                        </li>
                        <li className={styles.listStyle2}>
                          <Check
                            className={styles.checkIcon}
                            color="green"
                            size={50}
                          />
                          Become an advanced, confident, and modern JavaScript
                          developer from scratch.
                        </li>
                        <li className={styles.listStyle2}>
                          <Check
                            className={styles.checkIcon}
                            color="green"
                            size={50}
                          />
                          Become an advanced, confident, and modern JavaScript
                          developer from scratch.
                        </li>
                        <li className={styles.listStyle2}>
                          <Check
                            className={styles.checkIcon}
                            color="green"
                            size={50}
                          />
                          Become an advanced, confident, and modern JavaScript
                          developer from scratch.
                        </li>
                        <li className={styles.listStyle2}>
                          <Check
                            className={styles.checkIcon}
                            color="green"
                            size={50}
                          />
                          Become an advanced, confident, and modern JavaScript
                          developer from scratch.
                        </li>
                        <li className={styles.listStyle2}>
                          <Check
                            className={styles.checkIcon}
                            color="green"
                            size={50}
                          />
                          Become an advanced, confident, and modern JavaScript
                          developer from scratch.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    className={show ? styles.showLess : styles.showMore}
                    onClick={() => setShow(!show)}
                  >
                    {show ? "Show Less" : "Show More"}
                  </div>
                  {/* end of course feature */}
                  {/* start of course content */}
                  <CourseAccordion />
                  {/* end of course content */}
                  {/* Start course reqirement box */}
                  <ExtraFeature title="Requirements" />
                  {/* end requirement bos */}
                  {/* Start course description box */}
                  <ExtraFeature title="Description" />
                  {/* end description bos */}
                  {/* start of instructor area */}
                  <InstructorArea />
                  {/* end of instructor ares */}
                </div>
              </div>
            </div>
          </div>
          {/* price card */}
          <div className={styles.priceCardContainer}>
            {/* price card */}
            <PriceCard />
          </div>
        </div>
        {/* single course */}
        <div className={styles.allCourses}>
          <div className={styles.allCoursesContainer}>
            <div className={styles.allCoursesTitleDiv}>
              <h4 className={styles.allCoursesTitle}>All courses</h4>
            </div>
            <div className={styles.allCoursesContent}>
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

export default CourseDetail;

import styles from "./style.module.css";
import Share from "../Share";
import Link from "next/link";
// import Date from "../Date/Date";
import Moment from "react-moment";
import {useRouter} from 'next/router'

import { ImLocation2 } from "react-icons/im";
import { ImPriceTags } from "react-icons/im";
import { MdDateRange } from "react-icons/md";

const QuestionList = ({
  title,
  excerpt,
  location,
  salary,
  detail,
  type,
  qualification,
  description,
  hiringFrom,
  mode,
  slug,
  date,
  id,
}) => {
  const router = useRouter()
  console.log("router", router)
  return (
    <Link className={styles.link} href={`/education/${id}`}>
      <div className={styles.container}>
        {/* title */}
        <div className={styles.titleDiv}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        {/* location */}
        {/* {location && (
          <div className={styles.locationDiv}>
            <ImLocation2 className={styles.iconsL} />
            <p className={styles.location}>{location}</p>
          </div>
        )} */}
        {date && (
          <div className={styles.dateDiv}>
            <MdDateRange className={styles.iconsD} />
            {/* <Date /> */}
            <p className={styles.date}>
              {" "}
              <Moment date={date} format="D MMM YYYY" />
            </p>
          </div>
        )}
        {/*  */}
        <div className={styles.mixed}>
          {/* salary */}
          {/* {salary && (
            <div className={styles.salaryDiv}>
              <ImPriceTags className={styles.iconsS} />
              <p className={styles.salary}>{salary}</p>
            </div>
          )} */}
          {/* job type  */}
          {/* {type && (
            <div className={styles.typeDiv}>
              <ImPriceTags className={styles.icons} />
              <p className={styles.type}>{type}</p>
            </div>
          )} */}
        </div>
        {/* excert */}
        <div className={styles.excertDiv}>
          <p className={styles.excert}>{excerpt}</p>
        </div>
        {/* Hiring from */}
        {/* <div className={styles.fromDiv}>
          <p className={styles.from}>{hiringFrom}</p>
        </div> */}
        {/* share */}
        {/* <div className={styles.shareDiv}>
          <Share url={`http://localhost:3000/feeds/${id}`} slug={slug} title={title}/>
        </div> */}
      </div>
    </Link>
  );
};

export default QuestionList;

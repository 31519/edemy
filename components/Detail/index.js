import styles from "./style.module.css";
import Share from "../Share";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { ImLocation2 } from "react-icons/im";
import { ImPriceTags } from "react-icons/im";
import { MdDateRange } from "react-icons/md";
import Image from "next/image";
// import remarkGfm from 'remark-gfm'

const Detail = ({
  title,
  excerpt,
  location,
  salary,
  type,
  qualification,
  hiringFrom,
  slug,
  date,
  content,
  howToApply,
  importantLink,
  images,
}) => {
  const router = useRouter();
  console.log("iamge", images)

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${router.asPath}`;
  return (
    <div className={styles.container}>
      {/* title */}
      <div className={styles.titleDiv}>
        <h1 className={styles.header}>{title}</h1>
      </div>
      {/* excerpt */}
      {excerpt && (
        <div className={styles.detailDiv}>
          {/* <h1 className={styles.header}>How To Apply</h1> */}
          <p>{excerpt}</p>
        </div>
      )}
      {/* location */}
      {location && (
        <div className={styles.locationDiv}>
          <ImLocation2 className={styles.iconsL} />
          <p className={styles.location}>{location}</p>
        </div>
      )}

      {/* date */}
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
        {salary && (
          <div className={styles.salaryDiv}>
            <ImPriceTags className={styles.iconsS} />
            <p className={styles.salary}>{salary}</p>
          </div>
        )}
        {/* job type  */}
        {type && (
          <div className={styles.typeDiv}>
            <ImPriceTags className={styles.icons} />
            <p className={styles.type}>{type}</p>
          </div>
        )}
      </div>
      {/* excert */}
      {/* <ReactMarkdown children={content}  /> */}
      {content && (
        <div className={styles.detailDiv}>
          <h1 className={styles.header}>Detail</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}

      {images && (
        <>
          {images.map((d, index) => (
            <div className={styles.imageDiv}>
              <Image
                src={d.sourceUrl}
                alt="pyrtajam"
                layout="fill"
                className={styles.image}
              />
            </div>
          ))}
        </>
      )}

      {qualification && (
        <div className={styles.detailDiv}>
          <h1 className={styles.header}>Qualifications</h1>
          <div dangerouslySetInnerHTML={{ __html: qualification }} />
        </div>
      )}

      {howToApply && (
        <div className={styles.detailDiv}>
          <h1 className={styles.header}>How To Apply</h1>
          <div dangerouslySetInnerHTML={{ __html: howToApply }} />
        </div>
      )}

      {importantLink && (
        <div className={styles.detailDiv}>
          <h1 className={styles.header}>Important Link</h1>
          <div dangerouslySetInnerHTML={{ __html: importantLink }} />
        </div>
      )}

      {/* Hiring from */}
      <div className={styles.fromDiv}>
        <p className={styles.from}>{hiringFrom}</p>
      </div>
      {/* share */}
      <div className={styles.shareDiv}>
        <Share url={URL} slug={slug} title={title} />
      </div>
    </div>
  );
};

export default Detail;

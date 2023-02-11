import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

import { ArrowRight, Clock, Phone } from "react-feather";

function index() {
  return (
    <div className={styles.priceDiv}>
      <div className={styles.priceSidebar}>
        <div className={styles.priceInner}>
          {/* start view wrapper */}
          <Link href="#" className={styles.priceVideo}>
            <div className={styles.videoContent}></div>
          </Link>
          {/* End video wrapper */}
          {/* start price card */}
          <div className={styles.priceContent}>
            <div className={styles.priceWrapper}>
              <div className={styles.price}>
                <span className={styles.currentPrice}>Rs 5000</span>
                <span className={styles.offPrice}>Rs 52000</span>
              </div>
              <div className={styles.discountTime}>
                <span className={styles.priceSpan}>
                  <Clock className={styles.priceSpanIcon} size={14} />3 more
                  days left!
                </span>
              </div>
            </div>
            {/* price buy now */}
            <div className={styles.priceBuy}>
              <Link className={styles.priceBuyLink} href="#">
                <span className={styles.priceBuyText}>Buy Now</span>
                <span className={styles.priceBuyIcon}>
                  <ArrowRight className={styles.priceBuyIconI} size={16} />
                </span>
              </Link>
            </div>
            {/* refund policy */}
            <span className={styles.refund}>15-Day Money-Back Guarantee</span>
            {/* list */}
            <div className={styles.courseMeta}>
              <ul className={styles.metaList}>
                {/* duration */}
                <li className={styles.metaListStyle}>
                  <span className={styles.span1}>Duration</span>
                  <span className={styles.span2}>5 hrs 20 min</span>
                </li>
                {/* lecture */}
                <li className={styles.metaListStyle}>
                  <span className={styles.span1}>Lecture</span>
                  <span className={styles.span2}>50</span>
                </li>
                {/* duration */}
                <li className={styles.metaListStyle}>
                  <span className={styles.span1}>Level</span>
                  <span className={styles.span2}>Beginner</span>
                </li>
                {/* duration */}
                <li className={styles.metaListStyle}>
                  <span className={styles.span1}>Language</span>
                  <span className={styles.span2}>Khasi</span>
                </li>
                {/* duration */}
                <li className={styles.metaListStyle}>
                  <span className={styles.span1}>Certificate</span>
                  <span className={styles.span2}>No</span>
                </li>
              </ul>
            </div>
            {/* social share wrapper */}
            <div className={styles.socialShareWrapper}>
              <div className={styles.socialShare}>

              </div>
              <div className={styles.contact}>
                <p className={styles.detailContack}>For more details about the course</p>
                <p className={styles.contactNumber}>
                  <Phone size={16} style={{marginRight:"10px"}}/>
                  Call Us
                  <Link className={styles.contactNumberLink} href="#">
                    <strong  className={styles.number}>+91 93666993068</strong>
                  </Link>

                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;

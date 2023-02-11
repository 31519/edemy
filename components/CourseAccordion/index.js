import React from "react";
import styles from "./styles.module.css";
import { PlayCircle, Eye } from "react-feather";
import { useState } from "react";

import Link from "next/link";

function Index() {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

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
  ];

  return (
    <div className={styles.courseContent}>
      <div className={styles.courseInner}>
        {/* Heading */}
        <div className={styles.courseSecondTitle}>
          <h4 className={styles.courseTitleStyle}>Course Content</h4>
        </div>
        {/* Course ACcordion */}
        <div className={styles.accordionDiv}>
          <div className={styles.accordion}>
            {/* Accordion item card */}
            {items.map((item, i) => (
              <div
                key={item.name}
                className={styles.accordionItem}
                onClick={() => toggle(i)}
              >
                {/* Heading */}
                <div className={styles.accordionHeadingDiv}>
                  <h2 className={styles.accordionHeader}>
                    <button
                      className={
                        selected === i
                          ? styles.accordionButtonActive
                          : styles.accordionButton
                      }
                    >
                      Intro to course and Histudy
                      <span className={styles.timeBadge}>1hr 30min</span>
                    </button>
                  </h2>
                  <span className={styles.accordionItemIcon}>
                    {selected === i ? "-" : "+"}
                  </span>
                </div>
                {/* lesson collapse */}
                <div
                  className={
                    selected === i
                      ? styles.lessonCollapseShow
                      : styles.lessonCollapse
                  }
                >
                  <div className={styles.cardBody}>
                    <ul className={styles.listStyle}>
                      <li className={styles.listContent}>
                        <Link href="#" className={styles.link}>
                          {/* left */}
                          <div className={styles.courseContentLeft}>
                            <PlayCircle />
                            <span className={styles.text}>Course Intro</span>
                          </div>
                          {/* right */}
                          <div className={styles.courseContentRight}>
                            <span className={styles.minLabel}> 30 min</span>
                            <span className={styles.preview}>
                              <Eye size={14} /> Preview
                            </span>
                          </div>
                        </Link>
                      </li>
                      {/* next list */}
                      <li className={styles.listContent}>
                        <Link href="#" className={styles.link}>
                          {/* left */}
                          <div className={styles.courseContentLeft}>
                            <PlayCircle />
                            <span className={styles.text}>
                              Lesson one of cooking with cos rumut
                            </span>
                          </div>
                          {/* right */}
                          <div className={styles.courseContentRight}>
                            <span className={styles.minLabel}> 30 min</span>
                            <span className={styles.preview}>
                              <Eye size={14} /> Preview
                            </span>
                          </div>
                        </Link>
                      </li>
                      {/* next list */}
                      <li className={styles.listContent}>
                        <Link href="#" className={styles.link}>
                          {/* left */}
                          <div className={styles.courseContentLeft}>
                            <PlayCircle />
                            <span className={styles.text}>
                              Lesson Two to learns Html and css
                            </span>
                          </div>
                          {/* right */}
                          <div className={styles.courseContentRight}>
                            <span className={styles.minLabel}> 30 min</span>
                            <span className={styles.preview}>
                              <Eye size={14} /> Preview
                            </span>
                          </div>
                        </Link>
                      </li>
                      {/* next list */}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;

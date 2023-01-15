import React from "react";
import styles from "./style.module.css";
import FeedList from "../FeedList";

const Feeds = ({ data }) => {
  return (
    <div className={styles.container}>
      {/* <div>Feeds</div> */}
      <div className={styles.listDiv}>
      {data &&
        data.map((d) => (
          <FeedList
            key={d.title}
            title={d.title}
            date={d.date}
            excerpt={d.fields.excerpt}
            location={d.fields.location}
            salary={d.fields.salary}
            detail={d.detail}
            type={d.type}
            qualification={d.fields.qualification}
            description={d.description}
            slug={d.slug}
            id={d.id}
          />
        ))}
        </div>
    </div>
  );
};

export default Feeds;

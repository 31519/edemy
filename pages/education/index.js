import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Question.module.css";
// import navBar from "../components/navbar";
// import navbar from "../components/Navbar";
import Feeds from "../../components/Feeds";
import QuestionList from '../../components/Question/QuestionList'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import MetaScreen from "../../components/MetaScreen/MetaScreen";
import { LoadingOutlined } from "@ant-design/icons";
import Filter from "../../components/Filter"
import { GET_FEEDS } from "../../graphql/queries";

export default function Question() {
  const [feeds, setFeeds] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [classState, setClassState] = useState("");
  const [subState, setSubState] = useState("");
  const [years, setYears] = useState("");
  const router = useRouter();

  const { q: query, cat, cls, sub, yrs } = router.query;
  console.log("category", cat)

  // url
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${router.asPath}`;

  const {
    loading: feedsLoading,
    error: feedsError,
    data: feedsData,
  } = useQuery(GET_FEEDS, {
    variables: {
      title: `${keyword}`,
      category: `${category}`,
      class:`${classState}`,
      subject:`${subState}`,
      year:`${years}`
    },
  });



  // Feeds useEffect
  useEffect(() => {
    if (feedsData) {
      setFeeds(feedsData.feeds.nodes);
    }
    console.log("feeds", feeds);
  }, [router, feedsData, classState, subState, years, ]);

  useEffect(() => {
    if (query) {
      setKeyword(query);
    } else {
      setKeyword("");
    }

    if (cat){
      setCategory(cat)
    } else {
      setCategory("")
    }

    if (cls){
      setClassState(cls)
    } else {
      setClassState("")
    }

    // if (sub){
    //   setSubState(sub)
    // } else {
    //   setSubState("")
    // }
    
    // if (cls){
    //   setClassState(cls)
    // } else {
    //   setClassState("")
    // }

    // if (yrs){
    //   setYears(yrs)
    // } else {
    //   setYears("")
    // }
    
  }, [query, router, category, cat, cls, sub, yrs]);

  return (
    <>
      <MetaScreen
        pageTitle="MegSkill - Job Portal"
        description="MegSkill meghalaya best online Job Portal Platform "
        siteName="www.pyrtajam.com"
        currentURL={router.asPath}
        previewImage={`${URL}/megskill.png`}
      />
      <Filter
        classState={classState}
        subState={subState}
        years={years}
        setClassState={setClassState}
        setSubState={setSubState}
        setYears={setYears}
      />
      {feedsLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LoadingOutlined style={{ fontSize: 40, textAlign: "center" }} spin />
        </div>
      )}
      {feeds.length === 0 && (
        <div className={styles.dataLength}>
          <h1 className={styles.dataLengthText}>No data..</h1>
        </div>
      )}
      <div className={styles.container}>
        {/* <Feeds data={feeds} />
        <Feeds data={feeds} />
        <div className={styles.container}> */}
        {/* <div>Feeds</div> */}
        <div className={styles.listDiv}>
          {feeds &&
            feeds.map((d) => (
              <QuestionList
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
        {/* </div> */}
      </div>
    </>
  );
}

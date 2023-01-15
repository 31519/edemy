import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
// import navBar from "../components/navbar";
// import navbar from "../components/Navbar";
import Feeds from "../../components/Feeds";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import MetaScreen from "../../components/MetaScreen/MetaScreen";
import { LoadingOutlined } from "@ant-design/icons";

import { GET_FEEDS } from "../../graphql/queries";

export default function Home() {
  const [feeds, setFeeds] = useState([]);
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const { q: query } = router.query;

  const {
    loading: feedsLoading,
    error: feedsError,
    data: feedsData,
  } = useQuery(GET_FEEDS, {
    variables: {
      title: `${keyword}`,
      category: "Jobs",
    },
  });

  // Feeds useEffect
  useEffect(() => {
    if (feedsData) {
      setFeeds(feedsData.feeds.nodes);
    }
    console.log("feeds", feeds);
  }, [router, feedsData]);

  useEffect(() => {
    if (query) {
      setKeyword(query);
    } else {
      setKeyword("");
    }
  }, [query, router]);

  return (
    <>
      <MetaScreen
        pageTitle="MegSkill - Job Portal"
        description="MegSkill meghalaya best online Job Portal Platform "
        siteName="www.pyrtajam.com"
        currentURL={router.asPath}
        previewImage="/megskill.png"
      />
      <div className={styles.container}>
        {feedsLoading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LoadingOutlined
              style={{ fontSize: 40, textAlign: "center" }}
              spin
            />
          </div>
        )}
        <Feeds data={feeds} />
      </div>
    </>
  );
}

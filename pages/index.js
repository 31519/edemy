import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import navBar from "../components/navbar";
// import navbar from "../components/Navbar";
import Feeds from "../components/Feeds";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import MetaScreen from "../components/MetaScreen/MetaScreen";
import { LoadingOutlined } from "@ant-design/icons";
import CategoryCard from "../components/CategoryCard"
import { GET_FEEDS } from "../graphql/queries";
import Pagination from "react-js-pagination";
import CourseList from "../components/CourseList"

const syllabus = [
  {
    title: "class 10",
    link: "/education/?cat=syllabus&cls=10",
    image: "/test.png",
  },
  {
    title: "class 9",
    link: "/education/?cat=syllabus&cls=9",
    image: "/test.png",
  },
  {
    title: "class 8",
    link: "/education/?cat=syllabus&cls=8",
    image: "/test.png",
  },
  {
    title: "class 7",
    link: "/education/?cat=syllabus&cls=7",
    image: "/test.png",
  },
  {
    title: "class 6",
    link: "/education/?cat=syllabus&cls=6",
    image: "/test.png",
  },
];


const question = [
  {
    title: "class 10",
    link: "/education/?cat=Questions&cls=10",
    image: "/test.png",
  },
  {
    title: "class 9",
    link: "/education/?cat=Questions&cls=9",
    image: "/test.png",
  },
  {
    title: "class 8",
    link: "/education/?cat=Questions&cls=8",
    image: "/test.png",
  },
  {
    title: "class 7",
    link: "/education/?cat=Questions&cls=7",
    image: "/test.png",
  },
  {
    title: "class 6",
    link: "/education/?cat=Questions&cls=6",
    image: "/test.png",
  },
];

export default function Home() {



  const router = useRouter();
  const [category, setCategory] = useState("");
  const [pages, setPages] =useState(0)

  const {cat,  page } = router.query;
  
  // console.log("screen", page);
  // console.log("keyword", keyword);
  // console.log("routrer.query", router.query);
  let queryParams;
  if (typeof window != "undefined") {
    queryParams = new URLSearchParams(window.location.search);
  }

  useEffect(() => {
    if (!page){
      setPages(0)
    }
  }, [page, category])

  const handlePageClick = async(currentPage) => {
    if (queryParams.has("page")) {
      queryParams.set("page", currentPage);
    } else {
      queryParams.append("page", currentPage);
    }
    console.log("currentpage", currentPage)

    if (cat){
      setCategory(cat)
    } else {
      setCategory("")
    }

    console.log("cat",cat)
    console.log("page", page)
    console.log("pages", pages)
    // if(q){
    //   setKeyword(q)
    // }
    // console.log("keyword", q)

    // var path;
    // if(router.pathname==="/news"){
    //   path = `/news?q=${keyword}&c=${cat}&page=${currentPage}`
    // } else(
    //   path = `/search?q=${keyword}`
    // )
    await router.push(`/?&cat=${category}&page=${currentPage}`)
  };




  const [feeds, setFeeds] = useState([]);
  // const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const { q: query } = router.query;

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
      category: "",
      offset: pages
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
        previewImage={`${URL}/megskill.png`}
      />
      <CategoryCard data={syllabus} header="Syllabus"/>
      <CategoryCard data={question} header="Questions"/>
      <CategoryCard data={syllabus} header="Competative Exam"/>
        {feedsLoading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LoadingOutlined
              style={{ fontSize: 40, textAlign: "center" }}
              spin
            />
          </div>
        )}
      <div className={styles.container}>
        <CourseList/>
        <Feeds data={feeds} />
        {/* <Pagination
            activePage={pages}
            itemsCountPerPage={2}
            totalItemsCount={3}
            onChange={handlePageClick}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          /> */}
        {/* <Feeds data={feeds} /> */}
      </div>
    </>
  );
}

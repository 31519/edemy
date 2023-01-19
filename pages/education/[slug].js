import React, { useState, useEffect } from "react";
import styles from "../../styles/feedDetail.module.css";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Detail from "../../components/Detail";
import { gql } from "@apollo/client";
import { LoadingOutlined } from '@ant-design/icons';
import MetaScreen from "../../components/MetaScreen/MetaScreen"
import client from "../../client/apollo-client";
// COMPONENTS IMPORT

import { GET_FEED } from "../../graphql/queries";

const EducationDetail = ({ feed, slugss }) => {
  const router = useRouter();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${router.asPath}`;


  // Jobs
  // const {
  //   loading: feedLoading,
  //   error: feedError,
  //   data: feedData,
  // } = useQuery(GET_FEED, {
  //   variables: {
  //     id: `${slug}`,
  //   },
  // });

  // Feeds useEffect
  // useEffect(() => {
  //   if (feedData) {
  //     setFeed(feedData.feed);
  //     console.log("feeds", feed?.fields?.salary);
  //   }
  // }, [router, feedData]);

  // Jobs useEffect

  return (
    <>
    <MetaScreen 
      pageTitle={feed.title}
      description={feed?.fields?.excerpt}
      siteName="www.pyrtajam.com"
      currentURL={router.asPath}
      previewImage={`${URL}/megskill.png`}
    />
    {!feed && <LoadingOutlined style={{ fontSize: 40 }} spin />}
      <div className={styles.container}>
        {feed && (
          <Detail
            key={feed.title}
            title={feed.title}
            date={feed.date}
            excerpt={feed?.fields?.excerpt}
            location={feed?.fields?.location}
            salary={feed?.fields?.salary}
            type={feed?.type}
            qualification={feed?.fields?.qualification}
            id={feed.id}
            content={feed.content}
            howToApply={feed?.fields?.howtoapply}
            importantLink={feed?.fields?.importantlink}
            images={feed?.fields?.images}
          />
        )}
      </div>
    </>
  );
};

export default EducationDetail;

// serverside props
export async function getServerSideProps({ query }) {
  const slug = query.slug
  const { data } = await client.query({
    query: GET_FEED, 
        variables: {
          id: `${slug}`,
        },
  });
  return {
    props: {
      feed: data.feed,
      slugss:slug
    },
  };
}

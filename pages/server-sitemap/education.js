const siteUrl = "localhost:3000"
import { getServerSideSitemap } from "next-sitemap";
import client from '../../client/apollo-client'
import { GET_FEEDS } from "../../graphql/queries";

// const sitemapsHandler = (datas) => {
//     datas.map((data) => ({
//         loc:`http://localhost:3000/${data.slug}/${data.id}`,
//         lastmod: new Date().toISOString(),
//     }))

// }

export const getServerSideProps = async (ctx) => {
  const { data } = await client.query({
    query: GET_FEEDS,
    variables: {
        category: "Jobs",
    },
  });

  let feeds = data.feeds.nodes
  console.log("data sitemap", data.feeds.nodes)

  // posts = await feeds.json();
  const newsSitemaps = feeds.map((data) => ({
    loc: `${siteUrl}/education/${data.id}`,
    lastmod: new Date().toISOString(),
    author:"megSkill",
    description:data.fields.excerpt,
    images:"localhost:3000/megskill.png",
    title:data.title
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}

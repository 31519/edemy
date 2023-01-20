import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

// properties
export const GET_PROPERTIES = gql`
  query GetProperty($title: String, $price: String) {
    properties(
      where: {
        title: $title
        

        metaQuery: {
          relation: AND
          metaArray: {
            key: "price"
            compare: GREATER_THAN_OR_EQUAL_TO
            value: $price
            type: NUMERIC
          }
        }
      }
    ) {
      pageInfo {
        offsetPagination {
          total
        }
      }
      nodes {
        databaseId
        date
        id
        title
        uri
        content
        featuredImage {
          node {
            sourceUrl
            title
          }
        }
        propertyFields {
          price
          haspet
          hasparking
          choice
        }
      }
    }
  }
`;

// Feeds
// where: {categoryName: "Educations", metaQuery: {metaArray: {key: "class", value: "9"}}}
export const GET_FEEDS = gql`
  query GetFeeds(
    $title: String
    $category: String
    $class: String
    $year: String
    $subject: String
  ) {
    feeds(
      where: {
        categoryName: $category
        search: $title
        
        metaQuery: {
          relation: OR
          metaArray: [
            { key: "class", value: $class, type: CHAR, compare: LIKE }
            { key: "year", value: $year, type: CHAR, compare: LIKE }
            { key: "subject", value: $subject, type: CHAR, compare: LIKE }
          ]
        }
      }
    ) {
      nodes {
        title
        uri
        slug
        id
        excerpt
        content
        date
        fields {
          images {
            sourceUrl
          }
          location
          price
          qualification
          salary
          excerpt
        }
        
      }
    }
  }
`;

// jobs

//         metaQuery: {
//           relation: OR
//           metaArray:
//           [
//             {
//             key: "class"
//             value: 9
//             type: NUMERIC
//           },
//             {
//             key: "category"
//             value: "questions"
//             type: CHAR
//           }
//           ]
//         }
//       },

// QUERIES WITH FEATURED

// jobs

// Jobs
export const GET_FEED = gql`
  query GetFeed($id: ID!) {
    feed(id: $id) {
      title
      uri
      slug
      id
      excerpt
      content
      date
      fields {
        images {
          sourceUrl
        }
        location
        price
        qualification
        salary
        excerpt
        howtoapply
        importantlink
      }
    }
  }
`;

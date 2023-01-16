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
export const GET_FEEDS = gql`
  query GetFeeds($title: String, $category: String) {
    # posts(where: {categoryName: $category, search: $title }){
    #   pageInfo {
    #     offsetPagination {
    #       total
    #     }
    #   }
    #   nodes {
    #     date
    #     id
    #     title
    #     uri
    #     featuredImage {
    #       node {
    #         sourceUrl
    #       }
    #     }
    #   }
    # }

    feeds(where: { categoryName: $category, search: $title }) {
      nodes {
        title
        uri
        slug
        id
        excerpt
        content
        date
        fields {
          location
          price
          qualification
          salary
          excerpt
          howToApply
          importantLink
        }
      }
    }
  }
`;

// jobs

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
            location
            price
            qualification
            salary
            excerpt
        }
    }
  }
`;

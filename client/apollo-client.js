import { ApolloClient, InMemoryCache, ApolloProvider , HttpLink, from, } from "@apollo/client";


const client = new ApolloClient({
  // uri: "https://rickandmortyapi.com/graphql",
  uri: "https://pyrtajam.com/graphql",
  cache: new InMemoryCache(),
});

export default client
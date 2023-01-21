import TopNav from "../components/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "../public/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import Navbar from "../components/Navbar";
import Footer from "../components/footer/Footer";

const client = new ApolloClient({
  // uri: "https://rickandmortyapi.com/graphql",
  uri: "https://pyrtajam.com/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ApolloProvider client={client}>
        <ToastContainer position="top-center" />
        {/* <TopNav /> */}
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;

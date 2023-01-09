import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// initial state
const initialState = {
  user: null,
};

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// context provider
const Provider = ({ children }) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  axios.interceptors.response.use(
    function (response) {
      console.log("interceptor response", response)
      // any status code that lie within the range 2xx cause this function to trigger
      return response;
    },
    function (error) {
      // any status codes that falls outside the rangee of 2xx cause this function to trigger
      console.log("interceptor error", error)
      // let res = error.response;
      if (error?.response?.status === 401 && error?.response?.config && !error?.response?.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          console.log("interceptor error1", error.response)
          axios
            .get("/api/logout")
            .then((data) => {
              console.log('/401error> logout')
              dispatch({type: 'LOGOUT'})
              window.localStorage.removeItem("user")
              router.push("/login")
            })
            .catch((err) => {
              console.log("Axios interseptor error", err);
              reject(error);
            });
        });
      }
      return Promise.reject(error)
    }
  );

// csrf request
  useEffect(() => {
    const getCsrfToken = async () => {
      const {data} =await axios.get('/api/csrf-token')
      console.log("csrf", data)
      axios.defaults.headers['X-CSRF-Token'] = data.csrfToken
      console.log("csrf1", axios.defaults.headers['X-CSRF-Token'])
    };
    getCsrfToken()
  } ,[])

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };

import { createContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
const INITIAL_STATE = {
  // currentUser: {
  //   _id: "610e5930e558e44154291127",
  //   profilePicture: "/person/1.jpg",
  //   coverPicture: "",
  //   followers: [],
  //   followings: [],
  //   username: "Vien Pham",
  //   email: "trivien@yahoo.com",
  //   password: "$2b$10$V9AwQ2dp17vUEtf7bKK/KOyiNZ2wvBAs/lnd72/lm0DSuFE3LHa5C",
  //   desc: "Hello",
  //   city: "Sai Gon",
  //   from: "Quang Nam",
  //   relationship: 1,
  // },
  currentUser: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

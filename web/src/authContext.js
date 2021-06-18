import { createContext } from "react";

const authContext = createContext({
  userToken: "",
  setUserToken: (auth) => {}
});

export default authContext;

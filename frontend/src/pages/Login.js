import React from "react";
import { LoginGetter, Logout } from "../components/index.js";
import { useUser } from "../UserContext.js";

function Login() {
  const user = useUser();
  return <div>{user ? <Logout /> : <LoginGetter />}</div>;
}

export default Login;

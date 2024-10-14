import { redirect } from "react-router-dom";

export const CheckAuth = () => {
  const isLogin = localStorage.getItem("jwt");
  if (!isLogin) {
    return redirect("/login");
  } else {
    return null;
  }
};

import { Route, redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ ...rest }) => {
  const user = useSelector((state) => state.user.value);
  return user && user.username ? <Route {...rest} /> : redirect("/login");
};

export default PrivateRoute;

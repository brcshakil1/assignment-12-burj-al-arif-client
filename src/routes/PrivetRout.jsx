import { PropTypes } from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./../hook/useAuth";

import Loading from "../components/Loading/Loading";

const PrivetRout = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/"></Navigate>;
};

PrivetRout.propTypes = {
  children: PropTypes.node,
};

export default PrivetRout;

import { PropTypes } from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./../hook/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const PrivetRout = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
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

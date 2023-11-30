import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useAdmin from "../hook/useAdmin";
import useAuth from "../hook/useAuth";
import { PropTypes } from "prop-types";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminPending] = useAdmin();

  if (loading || isAdminPending) {
    return <Loading />;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;

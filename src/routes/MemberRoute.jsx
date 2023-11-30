import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useAuth from "../hook/useAuth";
import { PropTypes } from "prop-types";
import useMember from "../hook/useMember";

const MemberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isMember, isMemberPending] = useMember();

  if (loading || isMemberPending) {
    return <Loading />;
  }

  if (user && isMember) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

MemberRoute.propTypes = {
  children: PropTypes.node,
};

export default MemberRoute;

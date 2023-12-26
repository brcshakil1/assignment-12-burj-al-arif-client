import useMember from "../../../../hook/useMember";
import useAdmin from "../../../../hook/useAdmin";
import AdminProfile from "../../AdminProfile/AdminProfile";
import MemberProfile from "../../MemberProfile/MemberProfile";
import UserProfile from "../../UserProfile/UserProfile";
import Loading from "../../../../components/Loading/Loading";

const Profile = () => {
  const [isAdmin, isAdminPending] = useAdmin();
  const [isMember, isMemberPending] = useMember();
  return (
    <div>
      {isAdmin ? (
        <AdminProfile />
      ) : isMember ? (
        <MemberProfile />
      ) : (
        <UserProfile />
      )}
      {isAdminPending || (isMemberPending && <Loading />)}
    </div>
  );
};

export default Profile;

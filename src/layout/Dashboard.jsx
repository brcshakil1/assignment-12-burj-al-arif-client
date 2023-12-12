import { Announcement, Home, Menu } from "@mui/icons-material";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PaymentsIcon from "@mui/icons-material/Payments";
import HistoryIcon from "@mui/icons-material/History";
import ListAltIcon from "@mui/icons-material/ListAlt";
import useAdmin from "../hook/useAdmin";
import useMember from "../hook/useMember";
import Loading from "../components/Loading/Loading";
import AddIcon from "@mui/icons-material/Add";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, isAdminPending] = useAdmin();
  const [isMember, isMemberPending] = useMember();

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isAdminPending || isMemberPending ? (
        <Loading />
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[300px] h-auto md:min-h-screen bg-secondary text-primary  p-5   md:py-10">
            <Menu
              className="md:hidden block  cursor-pointer"
              onClick={handleMenu}
            />

            <ul
              className={`absolute ${isOpen ? "block" : "hidden"}
            md:block
            md:static z-20 bg-white  md:bg-[#00000000] md:text-primary
             text-secondary md:p-0 p-4 space-y-2 md:space-y-4 rounded-md md:shadow-none shadow-lg`}
            >
              {isAdmin ? (
                <>
                  <li className="flex items-center gap-2 focus:underline">
                    <PersonIcon />
                    <NavLink to="/dashboard/admin-profile">
                      Admin Profile
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-2">
                    <GroupIcon />
                    <NavLink to="/dashboard/manage-members">
                      Manage Members
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-2">
                    <AddIcon />
                    <NavLink to="/dashboard/add-apartment">
                      Add Apartment
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-2">
                    <ListAltIcon />
                    <NavLink to="/dashboard/agreement-requests">
                      Agreement Requests
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-2">
                    <Announcement />
                    <NavLink to="/dashboard/Make-announcement">
                      Make Announcement
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-2">
                    <LocalOfferIcon />
                    <NavLink to="/dashboard/manage-coupons">
                      Manage Coupons
                    </NavLink>
                  </li>
                </>
              ) : isMember ? (
                <>
                  <li className="flex items-center gap-2">
                    <PersonIcon />
                    <NavLink to="/dashboard/member-profile">My Profile</NavLink>
                  </li>
                  <li className="flex items-center gap-2">
                    <PaymentsIcon />
                    <NavLink to="/dashboard/make-payment">Make Payment</NavLink>
                  </li>
                  <li className="flex items-center gap-2">
                    <HistoryIcon />
                    <NavLink to="/dashboard/payment-history">
                      Payment History
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-2">
                    <Announcement />
                    <NavLink to="/dashboard/announcement">Announcement</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <PersonIcon />
                    <NavLink to="/dashboard/user-profile">My Profile</NavLink>
                  </li>
                  <li className="flex items-center gap-2">
                    <Announcement />
                    <NavLink to="/dashboard/announcement">Announcement</NavLink>
                  </li>
                </>
              )}
              <hr />
              <li className="flex items-center gap-2">
                <Home />
                <NavLink to="/">Home</NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full p-5 md:py-10">
            <h2 className="text-xl text-secondary font-bold underline text-center pb-8">
              Your Dashboard
            </h2>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

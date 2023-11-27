import { Announcement, Menu } from "@mui/icons-material";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PaymentsIcon from "@mui/icons-material/Payments";
import HistoryIcon from "@mui/icons-material/History";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  let isAdmin = true;
  let member = false;

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };
  console.log(isOpen);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-[300px] h-auto md:h-screen bg-secondary text-primary  p-5   md:py-10">
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
                <NavLink to="/dashboard/admin-profile">Admin Profile</NavLink>
              </li>
              <li className="flex items-center gap-2">
                <GroupIcon />
                <NavLink to="/dashboard/manage-members">Manage Members</NavLink>
              </li>
              <li className="flex items-center gap-2">
                <Announcement />
                <NavLink to="/dashboard/Make-announcement">
                  Make Announcement
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <LocalOfferIcon />
                <NavLink to="/dashboard/manage-coupons">Manage Coupons</NavLink>
              </li>
            </>
          ) : member ? (
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
        </ul>
      </div>
      <div className="w-full p-5 md:py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

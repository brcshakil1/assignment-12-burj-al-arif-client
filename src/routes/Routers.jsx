import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Apartments from "../pages/Apartments/Apartments";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import About from "../pages/About/About";
import Dashboard from "../layout/Dashboard";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import MemberProfile from "../pages/Dashboard/MemberProfile/MemberProfile";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import ManageMembers from "../pages/Dashboard/ManageMembers/ManageMembers";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import ManageCoupons from "../pages/Dashboard/ManageCoupons/ManageCoupons";
import MakePayment from "../pages/Dashboard/MakePayment/MakePayment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Announcement from "./../pages/Dashboard/Announcement/Announcement";
import PrivetRout from "./PrivetRout";
import AgreementRequest from "../pages/Dashboard/AgreementRequests/AgreementRequest";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/apartment",
        element: <Apartments />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRout>
        <Dashboard />
      </PrivetRout>
    ),
    children: [
      // add
      {
        path: "/dashboard/admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "/dashboard/agreement-requests",
        element: <AgreementRequest />,
      },
      {
        path: "/dashboard/member-profile",
        element: <MemberProfile />,
      },
      {
        path: "/dashboard/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/manage-members",
        element: <ManageMembers />,
      },
      {
        path: "/dashboard/make-announcement",
        element: <MakeAnnouncement />,
      },
      {
        path: "/dashboard/manage-coupons",
        element: <ManageCoupons />,
      },
      {
        path: "/dashboard/make-payment",
        element: <MakePayment />,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "/dashboard/announcement",
        element: <Announcement />,
      },
    ],
  },
]);

export default Routers;

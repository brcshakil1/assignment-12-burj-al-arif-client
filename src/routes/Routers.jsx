import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Apartments from "../pages/Apartments/Apartments";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import About from "../pages/About/About";
import Dashboard from "../layout/Dashboard";

import ManageMembers from "../pages/Dashboard/ManageMembers/ManageMembers";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import ManageCoupons from "../pages/Dashboard/ManageCoupons/ManageCoupons";
import MakePayment from "../pages/Dashboard/MakePayment/MakePayment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Announcement from "./../pages/Dashboard/Announcement/Announcement";
import PrivetRout from "./PrivetRout";
import AgreementRequest from "../pages/Dashboard/AgreementRequests/AgreementRequest";
import Payment from "../pages/Dashboard/Payment/Payment";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AddApartment from "../pages/Dashboard/AddApartment/AddApartment";
import Profile from "../pages/Dashboard/AddApartment/Profile/Profile";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRout>
        <Dashboard />
      </PrivetRout>
    ),
    errorElement: <ErrorPage />,
    children: [
      // admin
      {
        path: "/dashboard/profile",
        element: (
          <PrivetRout>
            <Profile />
          </PrivetRout>
        ),
      },
      {
        path: "/dashboard/admin-profile",
        element: (
          <AdminRoute>
            <Profile />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-apartment",
        element: (
          <AdminRoute>
            <AddApartment />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-members",
        element: (
          <AdminRoute>
            <ManageMembers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/make-announcement",
        element: (
          <AdminRoute>
            <MakeAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/agreement-requests",
        element: (
          <AdminRoute>
            <AgreementRequest />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-coupons",
        element: (
          <AdminRoute>
            {" "}
            <ManageCoupons />
          </AdminRoute>
        ),
      },

      // members
      {
        path: "/dashboard/member-profile",
        element: (
          <MemberRoute>
            <Profile />
          </MemberRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <MemberRoute>
            <Payment />
          </MemberRoute>
        ),
      },
      {
        path: "/dashboard/make-payment",
        element: (
          <MemberRoute>
            <MakePayment />
          </MemberRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <MemberRoute>
            <PaymentHistory />
          </MemberRoute>
        ),
      },
      {
        path: "/dashboard/user-profile",
        element: (
          <PrivetRout>
            <Profile />
          </PrivetRout>
        ),
      },

      {
        path: "/dashboard/announcement",
        element: (
          <PrivetRout>
            <Announcement />
          </PrivetRout>
        ),
      },
    ],
  },
]);

export default Routers;

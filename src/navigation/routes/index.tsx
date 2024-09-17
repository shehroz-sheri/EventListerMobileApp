import React from "react";
import Login from "../../screens/auth/login/Login";
import Register from "../../screens/auth/register/Register";
import ForgotPasswordScreen from "../../screens/auth/forgotPassword/ForgotPassword";
import ResetPassword from "../../screens/resetPassword/ResetPassword";
import TicketDetail from "../../screens/ticketDetail/TicketDetail";
import EditEvent from "../../screens/editEvent/EditEvent";
import EventDetails from "../../screens/eventDetails/EventDetails";
import PublicRoute from "./publicRoute/PublicRoute";
import PrivateRoute from "./privateRoute/PrivateRoute";
import MainTabs from "../components/mainTabs/MainTabs";

export const LoginScreen = () => (
  <PublicRoute>
    <Login />
  </PublicRoute>
);

export const RegisterScreen = () => (
  <PublicRoute>
    <Register />
  </PublicRoute>
);

export const ForgotPasswordScreenComponent = () => (
  <PublicRoute>
    <ForgotPasswordScreen />
  </PublicRoute>
);

export const ResetPasswordScreen = () => (
  <PrivateRoute>
    <ResetPassword />
  </PrivateRoute>
);

export const TicketDetailScreen = () => (
  <PrivateRoute>
    <TicketDetail />
  </PrivateRoute>
);

export const MainTabsScreen = () => (
  <PrivateRoute>
    <MainTabs />
  </PrivateRoute>
);

export const EditEventScreen = () => (
  <PrivateRoute>
    <EditEvent />
  </PrivateRoute>
);

export const EventDetailsScreen = () => (
  <PrivateRoute>
    <EventDetails />
  </PrivateRoute>
);

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import About from "./components/About";
import DeviceDisplay from "./components/DeviceDisplay";
import SignUp from "./Components/SignUp";
import SignUpStep1 from "./signup/steps/SignUpStep1";
import SignUpStep2 from "./signup/steps/SignUpStep2";
import SignUpStep3 from "./signup/steps/SignUpStep3";
import SignUpLayout from "./signup/SignUpLayout";
import { SignUpProvider } from "./signup/SignUpContext";
import "./Components/index.css";
import LoginForm from "./Components/LoginForm";
import CloudLayout from "./Components/CloudLayout";
import AdminDashboard from "./Components/AdminDashboard";
import SignUpSuccess from "./signup/steps/SignUpSuccess";
import DashboardLayout from "./Components/SponsorDashboard/DashboardLayout";
import SponsorHome from "./Components/SponsorDashboard/SponsorHome";
import Campaigns from "./Components/SponsorDashboard/Campaigns";
import Messages from "./Components/SponsorDashboard/Messages";
import Settings from "./Components/SponsorDashboard/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CloudLayout>
        <DeviceDisplay />
      </CloudLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <CloudLayout>
        <About />
      </CloudLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <CloudLayout>
        <LoginForm />
      </CloudLayout>
    ),
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/signup",
    element: (
      <CloudLayout>
        <SignUpProvider>
          <SignUpLayout />
        </SignUpProvider>
      </CloudLayout>
    ),
    children: [
      { index: true, element: <Navigate to="/signup/step1" replace /> },
      { path: "step1", element: <SignUpStep1 /> },
      { path: "step2", element: <SignUpStep2 /> },
      { path: "step3", element: <SignUpStep3 /> },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <CloudLayout>
        <AdminDashboard />
      </CloudLayout>
    ),
  },
  {
    path: "/signup-success",
    element: <SignUpSuccess />
  },
  {
    path: "/sponsor-dashboard",
    element: (
      <CloudLayout>
        <DashboardLayout />
      </CloudLayout>
    ),
    children: [
      { path: "home", element: <SponsorHome /> },
      { path: "campaign", element: <Campaigns /> },
      { path: "messages", element: <Messages /> },
      { path: "settings", element: <Settings /> },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

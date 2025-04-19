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
import CloudLayout from "./Components/CloudLayout"; // import the wrapper

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

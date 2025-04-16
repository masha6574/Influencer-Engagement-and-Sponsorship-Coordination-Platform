import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from "./components/About";
import DeviceDisplay from "./components/DeviceDisplay";
import SignUp from "./Components/SignUp";
import "./Components/index.css";
function App() {
  // const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DeviceDisplay />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/register",
      element: <SignUp />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;

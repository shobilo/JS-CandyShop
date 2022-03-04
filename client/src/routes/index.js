import About from "../components/pages/About"
import Admin from "../components/pages/Admin"
import Login from "../components/pages/Login"
import Basket from "../components/pages/Basket"
import CandyPage from "../components/pages/CandyPage"
import ErrorPage from "../components/pages/ErrorPage"
import Logout from "../components/pages/Logout"
import Registration from "../components/pages/Registration"
import Shop from "../components/pages/Shop"

export const adminRoutes = [
  { path: "/admin", element: <Admin /> },
]

export const authedRoutes = [
  { path: "/basket", element: <Basket /> },
  { path: "/logout", element: <Logout /> }
]

export const unAuthedRoutes = [
  { path: "/login", element: <Login />},
  { path: "/registration", element: <Registration />},
]

export const commonRoutes = [
  { path: "/", element: <Shop />},
  { path: "/about", element: <About /> },
  { path: "/candy/:id", element: <CandyPage />},
  { path: "*", element: <ErrorPage />}
]

import About from "../pages/About"
import Admin from "../pages/Admin"
import Auth from "../pages/Auth"
import Basket from "../pages/Basket"
import CandyPage from "../pages/CandyPage"
import ErrorPage from "../pages/ErrorPage"
import Logout from "../pages/Logout"
import Registration from "../pages/Registration"
import Shop from "../pages/Shop"

export const adminRoutes = [
  { path: "/admin", element: <Admin /> },
]

export const authedRoutes = [
  { path: "/basket", element: <Basket /> },
  { path: "/logout", element: <Logout /> }
]

export const unAuthedRoutes = [
  { path: "/auth", element: <Auth />},
  { path: "/registration", element: <Registration />},
]

export const commonRoutes = [
  { path: "/", element: <Shop />},
  { path: "/about", element: <About /> },
  { path: "/candy/:id", element: <CandyPage />},
  { path: "*", element: <ErrorPage />}
]

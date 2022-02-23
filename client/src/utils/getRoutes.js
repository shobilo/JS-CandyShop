import { adminRoutes, authedRoutes, unAuthedRoutes, commonRoutes } from '../routes'

export const getRoutes = () => {
  let isAdmin = false
  let isAuth = true
  let routes = []

  if (isAdmin) {
    routes = adminRoutes
  } 
  else if (isAuth) {
    routes = authedRoutes
  } 
  else {
    routes = unAuthedRoutes
  }

  let allRoutes = [
    ...routes,
    ...commonRoutes,
  ]

  return allRoutes
}
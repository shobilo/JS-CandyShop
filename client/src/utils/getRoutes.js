import { adminRoutes, authedRoutes, unAuthedRoutes, commonRoutes } from '../routes'

export const getRoutes = (states) => {
  const { isAdmin, isAuth } = states

  let routes = []

  if (isAdmin) {
    routes = adminRoutes.concat(authedRoutes)
  } 
  else if (isAuth) {
    routes = authedRoutes
  } 
  else {
    routes = unAuthedRoutes
  }

  const allRoutes = [
    ...routes,
    ...commonRoutes,
  ]

  return allRoutes
}
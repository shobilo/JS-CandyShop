import React from 'react'
import { Route, Routes } from "react-router-dom"
import { useSelector } from 'react-redux'
import { getRoutes } from '../utils/getRoutes'

const AppRouter = () => {
  const isAdmin = useSelector((state) => state.user.isAdmin)
  const isAuth = useSelector((state) => state.user.isAuth)

  const routes = getRoutes({
    isAdmin,
    isAuth
  })

  return (
    <Routes>
      {routes.map((route) => (
        <Route element={route.element} path={route.path} key={route.path} />
      ))}
    </Routes>
  )
}

export default AppRouter
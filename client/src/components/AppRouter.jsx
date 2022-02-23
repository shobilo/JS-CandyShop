import React from 'react'
import { Route, Routes } from "react-router-dom"
import { getRoutes } from '../utils/getRoutes'

const AppRouter = () => {
  let routes = getRoutes()

  return (
    <Routes>
      {routes.map((route) => (
        <Route element={route.element} path={route.path} key={route.path} />
      ))}
    </Routes>
  )
}

export default AppRouter
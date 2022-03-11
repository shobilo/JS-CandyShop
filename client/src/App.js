import { Grid } from "@mui/material"
import { useEffect } from "react"

import { useDispatch } from "react-redux"
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter"
// import Footer from "./components/shared/Footer"
import Header from "./components/shared/Header"
import LinearProgress from "./components/shared/LinearProgress"
import { checkAuth } from "./redux/features/user/userActionCreators"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header/>
          <LinearProgress />
        </Grid>
        <Grid item xs={12}>
          <AppRouter/>
        </Grid>
        <Grid item xs={12}>
          {/* <Footer/> */}
        </Grid>
      </Grid>
    </BrowserRouter>
  )
}

export default App

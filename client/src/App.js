import {Container, Grid, ThemeProvider} from "@mui/material"
import {useEffect} from "react"

import {useDispatch} from "react-redux"
import {BrowserRouter} from "react-router-dom"
import {theme} from "./styles/theme"
import AppRouter from "./components/AppRouter"
// import Footer from "./components/shared/Footer"
import Header from "./components/shared/Header"
import LinearProgress from "./components/shared/LinearProgress"
import {checkAuth, logout} from "./redux/features/user/userActionCreators"
import ErrorBoundary from "./components/pages/ErrorPage/ErrorBoundary";
import ErrorNotification from "./components/shared/ErrorNotification";

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .then(() => {
      })
      .catch(() => {
        dispatch(logout())
      })
  }, [dispatch])
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <ErrorBoundary>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Header/>
                <LinearProgress/>
              </Grid>
              <Grid item xs={12}>
                <AppRouter/>
              </Grid>
              {/*<Grid item xs={12}>*/}
              {/*  /!* <Footer/> *!/*/}
              {/*</Grid>*/}
            </Grid>
          </ErrorBoundary>
        </Container>
      </ThemeProvider>
      <ErrorNotification/>
    </BrowserRouter>
  )
}

export default App

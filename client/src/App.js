import { Container, Grid } from "@mui/material"
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter"
import Footer from "./components/shared/Footer"
import Header from "./components/shared/Header"

function App() {
  return (
    <BrowserRouter>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header/>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="sm">
            <AppRouter/>
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Footer/>
        </Grid>
      </Grid>
    </BrowserRouter>
  )
}

export default App

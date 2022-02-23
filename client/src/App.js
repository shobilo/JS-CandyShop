import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter"
import Footer from "./components/shared/Footer"
import Header from "./components/shared/Header"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <AppRouter/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

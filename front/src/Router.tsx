import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import Template from "./pages/Template"

function Router() {
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Template />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
      <Footer />
    </BrowserRouter>

  )
}

export default Router;
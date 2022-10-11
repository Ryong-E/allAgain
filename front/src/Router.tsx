import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./components/test";

import Template from "./pages/Template"

function Router() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}/>
        <Route path="/text" element={<Test/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
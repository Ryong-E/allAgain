import { BrowserRouter, Route, Routes } from "react-router-dom";

import Template from "./pages/Template"

function Router() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
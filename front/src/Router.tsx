import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { ROUTE_ARR } from './constant/route';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {ROUTE_ARR.map(( route ) => {
          return <Route path={ route.path } element={ <route.element /> } />
        })}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;

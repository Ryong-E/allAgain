import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { ROUTE_ARR } from './constant/route';
import ScrollToTop from './utils/ScrollToTop';

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        {ROUTE_ARR.map(( route, index ) => {
          const Comp = route.element;
          return <Route path={ route.path } element={ <Comp /> } key={index}/>
        })}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { ROUTE_ARR } from './constant/route';
import Auth from './hoc/auth';
import ScrollToTop from './utils/ScrollToTop';


function Router() {

  const CompArr:any = ROUTE_ARR.map((route) =>
    Auth(route.element, route.authenticated)
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        {ROUTE_ARR.map(( route, idx ) => {
          // const Comp = Auth(route.element, route.authenticated);
          const Comp = CompArr[idx];
          return <Route path={ route.path } element={ <Comp /> } key={idx}/>
        })}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;

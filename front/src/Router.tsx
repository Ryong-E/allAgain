import Test from "./components/test";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FeedListPage from './pages/FeedListPage/FeedListPage';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import Template from './pages/Template';
import CampaignPage from "./pages/CampaignPage/CampaignPage";
import CampaignDetailPage from "./pages/CampaignPage/CampaignDetailPage";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Template />} />
        <Route path="/text" element={<Test/>}/>
        <Route path='/feed-list' element={<FeedListPage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/campaigns" element={<CampaignPage />}/>
        <Route path="/campaigns/:id" element={<CampaignDetailPage />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FeedListPage from './pages/FeedListPage/FeedListPage';

import Template from './pages/Template';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Template />} />
        <Route path='/feed-list' element={<FeedListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

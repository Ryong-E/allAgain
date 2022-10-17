import Template from '../pages/Template';
import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import FeedListPage from '../pages/FeedPage/FeedListPage';
import CampaignPage from '../pages/CampaignPage/CampaignPage';
import CampaignDetailPage from '../pages/CampaignPage/CampaignDetailPage';
import CampaignCreatePage from '../pages/CampaignPage/CampaignCreatePage';
import CampaignUpdatePage from '../pages/CampaignPage/CampaignUpdatePage';
import LandingPage from '../pages/LandingPage/LandingPage';

export const ROUTE = {
  HOME: {
    path: '/',
    link: '/',
    element: MainPage,
  },
  LOGIN: {
    path: '/login',
    link: '/login',
    element: LoginPage,
  },
  REGISTER: {
    path: '/register',
    link: '/register',
    element: RegisterPage,
  },
  MY_PAGE: {
    path: '/mypage',
    link: '/mypage',
    element: Template,
  },
  MY_PROFILE: {
    path: '/profile',
    link: '/profile',
    element: ProfilePage,
  },
  ABOUT: {
    path: '/about',
    link: '/about',
    element: Template,
  },
  ABOUT_TEAM: {
    path: '/team2luda',
    link: '/team2luda',
    element: Template,
  },
  LANDING: {
    path: '/landing',
    link: '/landing',
    element: LandingPage,
  },
  FEED_LIST: {
    path: '/feed',
    link: '/feed',
    element: FeedListPage,
  },
  CAMPAGIN_LIST: {
    path: '/campaign',
    link: '/campaign',
    element: CampaignPage,
  },
  CAMPAGIN_DETAIL: {
    path: '/campaign/:id',
    link: `/campaign/`,
    element: CampaignDetailPage,
  },
  CAMPAGIN_CREATE: {
    path: '/campaign/add',
    link: `/campaign`,
    element: CampaignCreatePage,
  },
  CAMPAGIN_UPDATE: {
    path: '/campaign/update/:id',
    link: `/campaign`,
    element: CampaignUpdatePage,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);

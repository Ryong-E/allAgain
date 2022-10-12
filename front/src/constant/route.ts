import Template from '../pages/Template';
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import FeedListPage from '../pages/FeedListPage/FeedListPage';
import CampaignPage from "../pages/CampaignPage/CampaignPage";
import CampaignDetailPage from "../pages/CampaignPage/CampaignDetailPage";

export const ROUTE = {
  HOME: {
    path: "/",
    link: "/",
    element: Template,
  },
  LOGIN: {
    path: "/login",
    link: "/login",
    element: LoginPage,
  },
  REGISTER: {
    path: "/register",
    link: "/register",
    element: RegisterPage,
  },
  ABOUT: {
    path: "/about",
    link: "/about",
    element: Template,
  },
  ABOUT_TEAM: {
    path: "/team2luda",
    link: "/team2luda",
    element: Template,
  },
  FEED_LIST: {
    path: "/feed",
    link: "/feed",
    element: FeedListPage,
  },
  CAMPAGIN_LIST: {
    path: "/campaign",
    link: "/campaign",
    element: CampaignPage,
  },
  CAMPAGIN_DETAIL: {
    path: "/campaign/123",
    link: "/campaign/123",
    element: CampaignDetailPage,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);
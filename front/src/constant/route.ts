import Template from "../pages/Template";
import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import FeedListPage from "../pages/FeedPage/FeedListPage";
import FeedDetailPage from "../pages/FeedPage/FeedDetailPage";
import FeedAddPage from "../pages/FeedPage/FeedAddPage";
import FeedEditPage from "../pages/FeedPage/FeedEditPage";
import CampaignPage from "../pages/CampaignPage/CampaignPage";
import CampaignDetailPage from "../pages/CampaignPage/CampaignDetailPage";
import CampaignCreatePage from "../pages/CampaignPage/CampaignCreatePage";
import CampaignUpdatePage from "../pages/CampaignPage/CampaignUpdatePage";
import LandingPage from "../pages/LandingPage/LandingPage";
import UserDetailPage from "../pages/UserPage/UserDetailPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const ROUTE = {
  NOT_FOUND: {
    path: "*",
    element: NotFoundPage,
    authenticated: null,
  },
  LANDING: {
    path: "/",
    link: "/",
    element: LandingPage,
    authenticated: null,
  },
  HOME: {
    path: "/home",
    link: "/home",
    element: MainPage,
    authenticated: null,
  },
  LOGIN: {
    path: "/login",
    link: "/login",
    element: LoginPage,
    authenticated: false,
  },
  REGISTER: {
    path: "/register",
    link: "/register",
    element: RegisterPage,
    authenticated: false,
  },
  MY_PROFILE: {
    path: "/profile",
    link: "/profile",
    element: ProfilePage,
    authenticated: true,
  },
  MY_DETAIL_PAGE: {
    path: "/user",
    link: "/user",
    element: Template,
    authenticated: true,
  },
  USER_DETAIL_PAGE: {
    path: "/user/:id",
    link: "/user/",
    element: UserDetailPage,
    authenticated: null,
  },
  ABOUT: {
    path: "/about",
    link: "/about",
    element: Template,
    authenticated: null,
  },
  ABOUT_TEAM: {
    path: "/team2luda",
    link: "/team2luda",
    element: Template,
    authenticated: null,
  },
  FEED_LIST: {
    path: "/feed",
    link: "/feed",
    element: FeedListPage,
    authenticated: null,
  },
  FEED_DETAIL: {
    path: "/feed/:id",
    link: "/feed/",
    element: FeedDetailPage,
    authenticated: null,
  },
  FEED_CREATE: {
    path: "/feed/add",
    link: "/feed",
    element: FeedAddPage,
    authenticated: true,
  },
  FEED_UPDATE: {
    path: "/feed/update/:id",
    link: "/feed/update/",
    element: FeedEditPage,
    authenticated: true,
  },
  CAMPAGIN_LIST: {
    path: "/campaign",
    link: "/campaign",
    element: CampaignPage,
    authenticated: null,
  },
  CAMPAGIN_DETAIL: {
    path: "/campaign/:id",
    link: `/campaign/`,
    element: CampaignDetailPage,
    authenticated: null,
  },
  CAMPAGIN_CREATE: {
    path: "/campaign/add",
    link: `/campaign/add`,
    element: CampaignCreatePage,
    authenticated: true,
  },
  CAMPAGIN_UPDATE: {
    path: "/campaign/update/:id",
    link: `/campaign/update/`,
    element: CampaignUpdatePage,
    authenticated: true,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);

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
import UserPage from "../pages/UserPage/UserPage";

export const ROUTE = {
  HOME: {
    path: "/",
    link: "/",
    element: MainPage,
    authenticated: false,
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
  MY_PAGE: {
    path: "/mypage",
    link: "/mypage",
    element: Template,
    authenticated: true,
  },
  MY_PROFILE: {
    path: "/profile",
    link: "/profile",
    element: ProfilePage,
    authenticated: true,
  },
  USER_PAGE: {
    path: "/profile/:id",
    link: "/profile/",
    element: UserPage,
  },
  ABOUT: {
    path: "/about",
    link: "/about",
    element: Template,
    authenticated: false,
  },
  ABOUT_TEAM: {
    path: "/team2luda",
    link: "/team2luda",
    element: Template,
    authenticated: false,
  },
  LANDING: {
    path: "/landing",
    link: "/landing",
    element: LandingPage,
    authenticated: false,
  },
  FEED_LIST: {
    path: "/feed",
    link: "/feed",
    element: FeedListPage,
    authenticated: false,
  },
  FEED_DETAIL: {
    path: "/feed/:id",
    link: "/feed/",
    element: FeedDetailPage,
    authenticated: false,
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
    authenticated: false,
  },
  CAMPAGIN_DETAIL: {
    path: "/campaign/:id",
    link: `/campaign/`,
    element: CampaignDetailPage,
    authenticated: false,
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

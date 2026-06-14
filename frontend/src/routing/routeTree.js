import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

import { homepageRoute } from "./homepage";
import { authRoute } from "./auth.route";
import { dashboardRoute } from "./dashboard";
import { analyticsRoute } from "./analytics.route";

import AuthPage from "../pages/AuthPage";
import { createRoute } from "@tanstack/react-router";

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: AuthPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: AuthPage,
});

const routeTree = rootRoute.addChildren([
  homepageRoute,
  authRoute,
  dashboardRoute,
  analyticsRoute,
  loginRoute,
  registerRoute,
]);

export default routeTree;
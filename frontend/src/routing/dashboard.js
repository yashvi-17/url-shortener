import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import DashboardPage from "../pages/DashboardPage";
import { store } from "../store/store";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,

  beforeLoad: () => {
    const state = store.getState();
    const { user, loading } = state.auth;

    if (loading || !store.getState().auth) return;

    if (!user) {
      throw redirect({ to: "/login" });
    }
  },
});
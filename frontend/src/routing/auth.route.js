import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",

  beforeLoad: () => {
    throw redirect({
      to: "/login",
    });
  },
});
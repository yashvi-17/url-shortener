import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import AnalyticsPage from "../pages/AnalyticsPage";
import { checkAuth } from "../utils/helper";
import { store } from "../store/store";
import { redirect } from "@tanstack/react-router";

export const analyticsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/analytics",
    component: AnalyticsPage,
    beforeLoad: () => {
        const state = store.getState();
        const { user, loading } = state.auth;

        if (loading || !store.getState().auth) return;

        if (!user) {
        throw redirect({ to: "/login" });
        }
    }, //PROTECTED ROUTE
});
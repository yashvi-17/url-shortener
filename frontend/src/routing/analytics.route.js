import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import AnalyticsPage from "../pages/AnalyticsPage";
import { store } from "../store/store";
import { redirect } from "@tanstack/react-router";

export const analyticsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/analytics",
    component: AnalyticsPage,
    beforeLoad: () => {
        const state = store.getState();
        const { user, loading, initialized } = state.auth;

        if (!initialized || loading) return;
        if (!user) {
        throw redirect({ to: "/login" });
        }
    }, //PROTECTED ROUTE
});
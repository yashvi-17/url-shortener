import {createRootRoute} from "@tanstack/react-router"
import RootLayout from "../RootLayout"

//Main component inside which all routes will come
export const rootRoute = createRootRoute({
    component: RootLayout,
})

import { homepageRoute } from "./homepage"
import { authRoute } from "./auth.route"
import { dashboardRoute } from "./dashboard"
import { analyticsRoute } from "./analytics.route";

const routeTree = rootRoute.addChildren([
    homepageRoute,
    authRoute,
    dashboardRoute,
    analyticsRoute
])

export default routeTree;
import type { RouteRecordRaw } from "vue-router";
import { gymRoutes } from "./gym/routes";

const featureRoutes: RouteRecordRaw[] = [
    ...gymRoutes
]
export default featureRoutes
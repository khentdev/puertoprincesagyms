import { createMemoryHistory, createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import featureRoutes from "../../features";


export const routes: RouteRecordRaw[] = [
    ...featureRoutes
]

const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL),
    routes,
})
export default router



router.beforeEach(async (to, from, next) => {
    const isDev = import.meta.env.DEV
    if (isDev) console.info("Guard entry:", {
        original: to.fullPath,
        toName: to.name,
        toPath: to.path,
        fromName: from.name,
    });

    return next()
})
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";




const routes: RouteRecordRaw[] = [
    /**
     * Spread feature routes here 
     * e.g.
     * ...featureRoutes
     * 
     */

    {
        path: "/:pathMatch(.*)*",
        name: "page-not-found",
        component: () => import("../../views/NotFoundView.vue")
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
import type { RouteRecordRaw } from "vue-router";

export const gymRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "gym-layout",
        component: () => import("./views/VGymLayout.vue"),
        redirect: "/all-gyms",
        children: [
            {
                path: "/all-gyms",
                name: "gym-list-all",
                component: () => import("./views/GymListAll.vue"),
            },
            {
                path: "/barangay/:barangayName",
                name: "gym-list-barangay",
                component: () => import("./views/GymList.vue"),
            },
        ]
    },
]
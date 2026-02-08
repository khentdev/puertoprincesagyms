import type { RouteRecordRaw } from "vue-router";
import { useGymStore } from "./store/useGymStore";
import type { ValidBarangays } from "./types";
import { BARANGAYS } from "./types";

const kebabToTitleCase = (str: string): string => {
    return str.split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

const VALID_BARANGAYS = BARANGAYS.filter(b => b !== "All Locations");
export const gymRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "gym-layout",
        component: () => import("./views/VGymLayout.vue"),
        redirect: "all-gyms",
        children: [
            {
                path: "all-gyms",
                name: "gym-list-all",
                component: () => import("./views/GymListAll.vue"),
            },
            {
                path: "barangay/:barangayName",
                name: "gym-list-barangay",
                component: () => import("./views/GymList.vue"),
                beforeEnter: (to, _, next) => {
                    const gymStore = useGymStore();
                    const paramValue = to.params['barangayName'] as string;

                    if (!paramValue?.trim()) {
                        gymStore.setSelectedBarangay("All Locations");
                        return next({ name: "gym-list-all" });
                    }

                    const titleCaseBarangay = kebabToTitleCase(paramValue);
                    const isValidBarangay = VALID_BARANGAYS.includes(titleCaseBarangay as ValidBarangays);

                    if (!isValidBarangay) {
                        gymStore.setSelectedBarangay("All Locations");
                        return next({ name: "gym-list-all" });
                    }

                    gymStore.setSelectedBarangay(titleCaseBarangay as ValidBarangays);
                    next();
                },
            },
            {
                path: ":pathMatch(.*)*",
                name: "gym-not-found",
                component: () => import("./views/GymNotFound.vue"),
            },
        ]
    },
]
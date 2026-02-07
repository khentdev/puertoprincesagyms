import { defineStore } from "pinia";
import type { Gym } from "../types";
import { ref } from "vue";
import gymsJson from "../data/gyms.json"

export const useGymStore = defineStore("gymStore", () => {
    const gyms = ref<Gym[]>(gymsJson.gyms)

    return {
        gyms
    }
})
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import gymsJson from "../data/gyms.json";
import type { Barangays, Gym } from "../types";
import { useStorage } from "@vueuse/core";

export const useGymStore = defineStore("gymStore", () => {
    const gyms = ref<Gym[]>(gymsJson.gyms)

    const selectedBarangay = useStorage<Barangays>("selectedBarangay", "All Locations")
    const setSelectedBarangay = (barangay: Barangays) => {
        selectedBarangay.value = barangay
    }
    const getGymCountsInBarangay = computed(() => {
        return gyms.value.filter((gym) => gym.barangay === selectedBarangay.value).length
    })

    const filteredGyms = computed(() => {
        if (selectedBarangay.value === "All Locations") return gyms.value
        return gyms.value.filter((gym) => gym.barangay === selectedBarangay.value)
    })

    return {
        gyms,
        selectedBarangay,
        setSelectedBarangay,
        filteredGyms,
        getGymCountsInBarangay
    }
})

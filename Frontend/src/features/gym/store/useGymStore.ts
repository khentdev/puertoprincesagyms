import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";
import gymsJson from "../data/gyms.json";
import type { Barangays, Gym } from "../types";

export const useGymStore = defineStore("gymStore", () => {
    const gyms = ref<Gym[]>(gymsJson.gyms as Gym[])

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

    const selectedGym = ref<Gym | null>(null)
    const setSelectedGym = ({ id }: { id: string }) => {
        selectedGym.value = gyms.value.find((gym) => gym.id === id) || null
    }
    
    const closeSelectedGym = () => {
        selectedGym.value = null
    }

    return {
        gyms: readonly(gyms),
        selectedBarangay,
        setSelectedBarangay,
        filteredGyms: readonly(filteredGyms),
        getGymCountsInBarangay,
        selectedGym: readonly(selectedGym),
        setSelectedGym,
        closeSelectedGym
    }
})

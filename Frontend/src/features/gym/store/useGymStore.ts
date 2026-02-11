import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";
import gymsJson from "../data/gyms.json";
import type { Barangays, Gym, SortOption } from "../types";

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
        const gymsToSort = selectedBarangay.value === "All Locations" ? gyms.value : gyms.value.filter((gym) => gym.barangay === selectedBarangay.value)
        return [...gymsToSort].sort((a, b) => {
            const keyA = a[selectedSort.value.key]
            const keyB = b[selectedSort.value.key]

            if (keyA < keyB) return selectedSort.value.order === "asc" ? -1 : 1
            if (keyA > keyB) return selectedSort.value.order === "asc" ? 1 : -1
            return 0
        })
    })

    const selectedGym = ref<Gym | null>(null)
    const setSelectedGym = ({ id }: { id: string }) => {
        selectedGym.value = gyms.value.find((gym) => gym.id === id) || null
    }

    const closeSelectedGym = () => {
        selectedGym.value = null
    }

    const selectedSort = useStorage<SortOption>("selectedSort", {
        label: "Name (A-Z)",
        key: "name",
        order: "asc"
    })
    const setSelectedSort = (sort: SortOption) => {
        selectedSort.value = sort
    }

    return {
        gyms: readonly(gyms),
        selectedBarangay,
        setSelectedBarangay,
        filteredGyms: readonly(filteredGyms),
        getGymCountsInBarangay,
        selectedGym: readonly(selectedGym),
        setSelectedGym,
        closeSelectedGym,
        selectedSort: readonly(selectedSort),
        setSelectedSort
    }
})

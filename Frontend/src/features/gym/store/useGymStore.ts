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
    const getGymCountsInBarangay = computed(() =>
        gyms.value.filter((gym) => gym.barangay === selectedBarangay.value).length
    )

    const allGymCount = computed(() => gyms.value.length);

    const MAX_CACHE_SIZE = 50
    const sortedCache = new Map<string, Gym[]>()
    const filteredGyms = computed(() => {
        const cacheKey = `${selectedBarangay.value}-${selectedSort.value.key}-${selectedSort.value.order}`
        if (sortedCache.has(cacheKey))
            return sortedCache.get(cacheKey)


        const gymsToSort = selectedBarangay.value === "All Locations" ? gyms.value : gyms.value.filter((gym) => gym.barangay === selectedBarangay.value)
        const sortedGyms = [...gymsToSort].sort((a, b) => {
            const keyA = a[selectedSort.value.key]
            const keyB = b[selectedSort.value.key]
            if (keyA < keyB) return selectedSort.value.order === "asc" ? -1 : 1
            if (keyA > keyB) return selectedSort.value.order === "asc" ? 1 : -1
            return 0
        })

        if (sortedCache.size >= MAX_CACHE_SIZE) {
            const firstKey = sortedCache.keys().next().value!
            sortedCache.delete(firstKey)
        }
        sortedCache.set(cacheKey, sortedGyms)
        return sortedGyms
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
        setSelectedSort,
        allGymCount: readonly(allGymCount),
    }
})

import { useColorMode as colorMode, type BasicColorMode } from "@vueuse/core";
import { computed, readonly } from "vue";

export const useColorMode = () => {
    const { system, store } = colorMode({ storageKey: "user-theme", initialValue: "auto" })

    const setTheme = (theme: BasicColorMode) => {
        store.value = theme
    }
    const currentTheme = computed(() => {
        if (store.value === "auto") return system.value
        if (store.value === "light" || store.value === "dark") return store.value
        return "light"
    })

    return {
        system: readonly(system),
        store: readonly(store),
        currentTheme: readonly(currentTheme),
        setTheme
    }
}
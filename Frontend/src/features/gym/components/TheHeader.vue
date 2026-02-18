<template>
  <header
    class="h-18 flex bg-bg-panel items-center border-b border-border-subtle px-5"
  >
    <div class="flex items-center gap-2">
      <img
        src="../../../../assets/images/logos/ppcgymslogo.png"
        alt="Puerto Princesa Gym Directory Logo"
        class="size-12 object-contain rounded-full" 
      />
      <div class="flex flex-col items-start justify-center">
        <h1 class="text-base sm:text-lg font-medium text-text-high-contrast">
          Puerto Princesa Gym Directory
        </h1>
        <p class="text-xs sm:text-sm text-text-low-contrast">
          Find your perfect workout spot in the city
        </p>
      </div>
    </div>
  </header>
  <header
    class="h-12 flex bg-bg-panel items-center border-b border-border-subtle px-6 md:hidden drop-shadow"
  >
    <button
      @click="toggleSidebar"
      class="flex items-center gap-2 bg-bg-panel border rounded-md p-1.5 border-border-subtle active:bg-component-bg-active"
    >
      <Menu class="size-4 text-text-low-contrast" />
      <span class="text-xs sm:text-sm text-text-low-contrast">{{
        selectedBarangay
      }}</span>
    </button>
  </header>
</template>

<script lang="ts" setup>
import { Menu } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { useToggleSidebar } from "../composables/useToggleSidebar";
import { useGymStore } from "../store/useGymStore";

const gymStore = useGymStore();
const { selectedBarangay } = storeToRefs(gymStore);
const { toggleSidebar } = useToggleSidebar();
</script>

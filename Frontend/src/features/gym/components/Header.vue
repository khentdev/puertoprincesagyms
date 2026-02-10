<template>
  <header
    class="md:h-16 flex md:items-center md:flex-row flex-col md:justify-between"
  >
    <div class="space-y-1 md:space-y-2">
      <h1
        class="sm:text-3xl text-2xl text-text-high-contrast font-extrabold tracking-tight"
      >
        Gyms in Brgy. {{ selectedBarangay }}
      </h1>
      <span class="text-xs sm:text-sm text-text-low-contrast"
        >Showing {{ getGymCountsInBarangay }} results found in this area.</span
      >
    </div>
    <div
      class="flex items-center justify-start gap-3 md:justify-center mt-10 md:mt-auto shrink-0"
    >
      <span class="text-xs sm:text-sm text-text-low-contrast">Sort By:</span>
      <button
        class="flex items-center justify-center gap-3 px-4 py-1 rounded border border-border-subtle"
      >
        <span class="text-xs sm:text-sm text-text-low-contrast">Name</span>
        <chevron-down class="size-4 text-text-low-contrast" />
      </button>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ChevronDown } from "lucide-vue-next";
import { useGymStore } from "../store/useGymStore";

const gymStore = useGymStore();
const { selectedBarangay, getGymCountsInBarangay } = storeToRefs(gymStore);
</script>

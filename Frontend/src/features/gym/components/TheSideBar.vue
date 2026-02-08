<template>
  <aside class="bg-bg-panel w-52 border-r border-border-subtle">
    <nav>
      <ul class="flex flex-col gap-2 p-3">
        <template v-for="(item, index) in barangayNavigations" :key="item.id">
          <h1
            class="px-2 py-1 text-sm text-text-low-contrast tracking-wider"
            v-if="item.id !== 'All Locations' && index === 1"
          >
            Barangays
          </h1>
          <li
            @click="handleBarangayClick(item.id)"
            class="flex items-center gap-3 justify-between px-2 cursor-pointer py-2 rounded group"
          >
            <div class="flex items-center gap-3 shrink-0">
              <component
                :is="item.icon"
                :key="item.id"
                :class="[
                  selectedBarangay === item.id
                    ? 'stroke-text-accent-low'
                    : 'stroke-text-low-contrast group-hover:stroke-text-high-contrast',
                ]"
                class="size-5 transition-colors"
              />
              <span
                :key="item.id"
                :class="[
                  selectedBarangay === item.id
                    ? 'text-text-accent-low'
                    : 'text-text-low-contrast group-hover:text-text-high-contrast',
                ]"
                class="text-sm font-medium transition-colors"
                >{{ item.name }}</span
              >
            </div>
            <div
              v-show="selectedBarangay === item.id"
              class="text-sm text-text-low-contrast truncate"
            >
              {{ getGymCountsInBarangay }}
            </div>
          </li>
          <div
            class="w-full h-px bg-border-subtle"
            v-if="item.id === 'All Locations'"
          ></div>
        </template>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import type { LucideProps } from "lucide-vue-next";
import { Map, MapPin } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { type FunctionalComponent } from "vue";
import { useGymStore } from "../store/useGymStore";
import type { Barangays } from "../types";
import { useRouter } from "vue-router";

const router = useRouter();
const gymStore = useGymStore();
const { selectedBarangay, getGymCountsInBarangay } = storeToRefs(gymStore);

interface BarangayList {
  icon: FunctionalComponent<LucideProps>;
  id: Barangays;
  name: Barangays;
}

const handleBarangayClick = (barangay: Barangays) => {
  gymStore.setSelectedBarangay(barangay);
  const barangayName = barangay.trim().toLowerCase().replace(/\s+/g, "-");
  if (barangay === "All Locations") router.push({ name: "gym-list-all" });
  else
    router.push({
      name: "gym-list-barangay",
      params: { barangayName },
    });
};

const barangayNavigations: BarangayList[] = [
  {
    icon: Map,
    id: "All Locations",
    name: "All Locations",
  },
  {
    icon: MapPin,
    id: "Manggahan",
    name: "Manggahan",
  },
  {
    icon: MapPin,
    id: "San Pedro",
    name: "San Pedro",
  },
];
</script>

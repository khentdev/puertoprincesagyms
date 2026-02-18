<template>
  <Transition
    name="backdrop"
    enter-active-class="transition-opacity duration-[250ms] ease"
    leave-active-class="transition-opacity duration-[250ms] ease"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isMobile && isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black/50 z-20 md:hidden"
    ></div>
  </Transition>
  <Transition
    name="slide"
    enter-active-class="transition-transform duration-300 ease-out"
    leave-active-class="transition-transform duration-300 ease-out"
    enter-from-class="-translate-x-full"
    leave-to-class="-translate-x-full"
  >
    <aside
      v-if="isSidebarOpen || !isMobile"
      class="bg-bg-panel w-52 border-r border-border-subtle md:relative fixed z-30 top-0 left-0 h-full md:block"
    >
      <nav class="h-full flex flex-col">
        <div
          class="w-full h-12 px-2 py-1 flex justify-between items-center md:hidden shrink-0"
        >
          <h2 class="text-sm font-medium text-text-high-contrast px-2">
            Locations
          </h2>
          <button
            @click="toggleSidebar"
            class="p-1 bg-component-bg rounded-full size-8 flex items-center justify-center hover:bg-component-bg-hover transition-colors"
          >
            <X
              class="size-4 text-text-low-contrast active:text-text-high-contrast"
            />
          </button>
        </div>
        <div class="w-full h-px bg-border-subtle shrink-0"></div>
        <ul class="flex flex-col gap-2 p-3 overflow-y-auto flex-1">
          <template v-for="(item, index) in barangayNavigations" :key="item.id">
            <h1
              class="px-2 py-1 text-sm text-text-low-contrast tracking-wider"
              v-if="item.id !== 'All Locations' && index === 1"
            >
              Barangays
            </h1>
            <li>
              <button
                tabindex="0"
                :aria-selected="selectedBarangay === item.id"
                @click="handleBarangayClick(item.id)"
                @keydown.enter="handleBarangayClick(item.id)"
                class="w-full flex items-center gap-3 justify-between px-2 cursor-pointer py-2 rounded group focus:outline-none"
              >
                <div class="flex items-center gap-3 shrink-0">
                  <component
                    :is="item.icon"
                    :key="item.id"
                    :class="[
                      selectedBarangay === item.id
                        ? 'stroke-text-accent-low'
                        : 'stroke-text-low-contrast group-hover:stroke-text-high-contrast group-focus:stroke-text-high-contrast',
                    ]"
                    class="size-5 transition-colors"
                  />
                  <span
                    :key="item.id"
                    :class="[
                      selectedBarangay === item.id
                        ? 'text-text-accent-low'
                        : 'text-text-low-contrast group-hover:text-text-high-contrast group-focus:text-text-high-contrast',
                    ]"
                    class="text-sm font-medium transition-colors"
                    >{{ item.name }}</span
                  >
                </div>
                <div
                  v-show="selectedBarangay === item.id"
                  class="text-xs text-solid-text truncate rounded-full bg-solid-bg size-5 flex items-center justify-center"
                >
                  {{ getGymCountLabel }}
                </div>
              </button>
            </li>
            <div
              class="w-full h-px bg-border-subtle"
              v-if="item.id === 'All Locations'"
            ></div>
          </template>
        </ul>
        <div class="w-full rounded-full p-3 mb-3 flex items-start flex-col">
          <button
            class="px-2 py-2 cursor-pointer rounded-full bg-component-bg border border-border-subtle w-14 h-7 flex items-center relative hover:border-accent-border-focus transition-colors"
            @click="setTheme(currentTheme === 'dark' ? 'light' : 'dark')"
          >
            <TransitionGroup
              move-class="transition-all duration-300 ease-in-out"
              enter-active-class="transition-all duration-300 ease-in-out"
              leave-active-class="transition-all duration-300 ease-in-out"
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
              enter-to-class="opacity-100"
              leave-from-class="opacity-100"
            >
              <div
                key="theme"
                class="size-6.5 rounded-full flex items-center justify-center bg-component-bg-active absolute shadow shadow-black/25"
                :class="[currentTheme === 'dark' ? 'left-0' : 'right-0']"
              >
                <transition
                  enter-active-class="transition-all absolute w-full duration-300 ease-in-out"
                  leave-active-class="transition-all absolute w-full duration-300 ease-in-out"
                  enter-from-class="opacity-0"
                  leave-to-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-from-class="opacity-100"
                >
                  <Moon
                    key="dark"
                    v-if="currentTheme === 'dark'"
                    class="stroke-text-high-contrast size-5"
                  />
                  <Sun
                    key="light"
                    v-else
                    class="stroke-text-low-contrast size-5"
                  />
                </transition>
              </div>
            </TransitionGroup>
          </button>
        </div>
      </nav>
    </aside>
  </Transition>
</template>

<script lang="ts" setup>
import type { LucideProps } from "lucide-vue-next";
import { Map, MapPin, Moon, Sun, X } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { computed, type FunctionalComponent } from "vue";
import { useRouter } from "vue-router";
import { useColorMode } from "../../../shared/composables/useDarkMode";
import { useDeviceDetection } from "../../../shared/composables/useDeviceOrientation";
import { useToggleSidebar } from "../composables/useToggleSidebar";
import { useGymStore } from "../store/useGymStore";
import type { Barangays } from "../types";

const { currentTheme, setTheme } = useColorMode();
const router = useRouter();
const gymStore = useGymStore();
const { selectedBarangay, getGymCountsInBarangay, allGymCount } =
  storeToRefs(gymStore);

const { isSidebarOpen, toggleSidebar } = useToggleSidebar();
const { isMobile } = useDeviceDetection();

const getGymCountLabel = computed(() =>
  selectedBarangay.value === "All Locations"
    ? allGymCount.value
    : getGymCountsInBarangay.value,
);

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

  if (isMobile.value) {
    toggleSidebar();
  }
};

const barangayNavigations: BarangayList[] = [
  {
    icon: Map,
    id: "All Locations",
    name: "All Locations",
  },
  {
    icon: MapPin,
    id: "Sicsican",
    name: "Sicsican",
  },
  {
    icon: MapPin,
    id: "San Miguel",
    name: "San Miguel",
  },
  {
    icon: MapPin,
    id: "Maunlad",
    name: "Maunlad",
  },
  {
    icon: MapPin,
    id: "San Manuel",
    name: "San Manuel",
  },
  {
    icon: MapPin,
    id: "Santa Monica",
    name: "Santa Monica",
  },
  {
    icon: MapPin,
    id: "San Jose",
    name: "San Jose",
  },
  {
    icon: MapPin,
    id: "Tagumpay",
    name: "Tagumpay",
  },
  {
    icon: MapPin,
    id: "Tiniguiban",
    name: "Tiniguiban",
  },
  {
    icon: MapPin,
    id: "San Pedro",
    name: "San Pedro",
  },
].sort((a, b) => a.name.localeCompare(b.name)) as BarangayList[];
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>

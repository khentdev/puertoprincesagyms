<template>
  <section
    class="md:p-8 p-6 md:space-y-8 space-y-6 flex-1 h-[calc(100vh-4.50rem)] overflow-y-auto"
  >
    <Header />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <GymCard v-for="gym in filteredGyms" :key="gym.id" :gym="gym" />
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useHead, useSeoMeta } from "@unhead/vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import GymCard from "../components/GymCard.vue";
import Header from "../components/Header.vue";
import { useGymStore } from "../store/useGymStore";

const gymStore = useGymStore();
const { filteredGyms, selectedBarangay } = storeToRefs(gymStore);

const title = computed(
  () => `Gyms in ${selectedBarangay.value} - Puerto Princesa`,
);

const description = computed(
  () =>
    `Find fitness centers, boxing gyms, and sports facilities in ${selectedBarangay.value}, Puerto Princesa, Palawan. View locations on our interactive map.`,
);

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogImage: "https://puertoprincesagyms.vercel.app/og-banner.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "Puerto Princesa Gyms - Interactive Gym Map & Directory",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: computed(
        () =>
          `https://puertoprincesagyms.vercel.app/barangay/${selectedBarangay.value}`,
      ),
    },
  ],
});
</script>

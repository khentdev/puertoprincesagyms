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
import Header from "../components/Header.vue";
import GymCard from "../components/GymCard.vue";
import { useGymStore } from "../store/useGymStore";
import { storeToRefs } from "pinia";

const gymStore = useGymStore();
const {  filteredGyms } = storeToRefs(gymStore);
</script>

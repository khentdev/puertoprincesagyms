<template>
  <div
    class="flex flex-col h-full bg-bg-panel border border-border-subtle rounded-lg overflow-hidden transition-all duration-200 hover:border-border-default hover:shadow-sm"
  >
    <div class="aspect-video w-full bg-component-bg relative overflow-hidden">
      <img
        v-if="props.gym.profile_image"
        :src="props.gym.profile_image"
        :alt="props.gym.name"
        class="w-full h-full object-cover rounded-t-lg transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-text-low-contrast"
      >
        <span class="text-sm">No Image</span>
      </div>
    </div>

    <div class="flex flex-col flex-1 p-4 gap-3">
      <div>
        <h3
          class="text-lg font-semibold text-text-high-contrast leading-tight mb-1"
        >
          {{ props.gym.name }}
        </h3>
        <div
          class="flex items-center gap-1.5 text-sm text-text-low-contrast font-medium"
        >
          <MapPin class="w-4 h-4 shrink-0" />
          <p>{{ props.gym.barangay }}</p>
        </div>
      </div>

      <div class="flex items-start gap-2 text-sm text-text-low-contrast mt-1">
        <span class="line-clamp-2">{{ props.gym.address }}</span>
      </div>

      <div class="mt-auto pt-2">
        <button
          class="w-full py-2 px-4 rounded-md bg-solid-bg text-solid-text text-sm font-medium transition-colors hover:bg-solid-bg-hover active:bg-solid-bg cursor-pointer flex items-center justify-center gap-2 group"
        >
          See more
          <ArrowRight
            class="w-4 h-4 transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { GymCardData } from "../types";
import { MapPin, ArrowRight } from "lucide-vue-next";

interface GymCardProps {
  gym: GymCardData;
}

const props = defineProps<GymCardProps>();
</script>

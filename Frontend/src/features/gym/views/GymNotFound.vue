<template>
  <div
    class="flex flex-col items-center justify-center h-full p-6 text-center select-none"
  >
    <div class="p-8 max-w-md w-full flex flex-col items-center">
      <div class="mb-6 p-4 bg-bg-app rounded-full">
        <MapPinOff class="w-12 h-12 text-solid-bg" />
      </div>

      <h1 class="text-2xl font-bold text-text-high-contrast mb-2">
        Page Not Found
      </h1>

      <p class="text-text-low-contrast mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <router-link
        :to="{ name: 'gym-list-all' }"
        class="w-full py-2.5 px-4 rounded-md bg-solid-bg text-solid-text text-sm font-medium transition-colors hover:bg-solid-bg-hover active:bg-solid-bg cursor-pointer flex items-center justify-center gap-2 group"
      >
        <ArrowLeft
          class="w-4 h-4 transition-transform group-hover:-translate-x-1"
        />
        Back to All Gyms
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, MapPinOff } from "lucide-vue-next";
import { RouterLink } from "vue-router";
</script>

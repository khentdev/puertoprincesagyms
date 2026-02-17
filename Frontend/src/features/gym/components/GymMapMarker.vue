<template>
  <div class="relative cursor-pointer group" @click="handleClick">
    <div class="flex flex-col items-center gap-1">
      <div
        class="bg-bg-panel border border-border-subtle rounded-md px-2 py-1 shadow-md whitespace-nowrap max-w-[150px]"
      >
        <span
          class="text-xs font-semibold text-text-high-contrast truncate block"
        >
          {{ gymName }}
        </span>
      </div>

      <div
        class="relative bg-solid-bg rounded-full p-2 shadow-lg border-2 border-solid-bg-hover"
      >
        <Dumbbell class="w-5 h-5 text-solid-text" :stroke-width="2.5" />
      </div>

      <div
        class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-solid-bg -mt-1"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Dumbbell } from "lucide-vue-next";

interface GymMapMarkerProps {
  gymName: string;
  gymId: string;
}

const props = defineProps<GymMapMarkerProps>();
const emit = defineEmits<{
  click: [gymId: string];
}>();

const handleClick = () => {
  emit("click", props.gymId);
};
</script>

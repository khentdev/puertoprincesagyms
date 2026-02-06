<template>
  <Teleport to="body">
    <div
      class="fixed bottom-4 right-[10px] md:right-4 z-50 flex flex-col gap-3 pointer-events-none"
    >
      <TransitionGroup
        enter-from-class="opacity-0 translate-x-full scale-90"
        enter-active-class="transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-from-class="opacity-100 translate-x-0 scale-100"
        leave-active-class="transition-all duration-300 [transition-timing-function:cubic-bezier(0.5,0,0.75,0)] absolute right-0"
        leave-to-class="opacity-0 translate-x-[120%] scale-[0.85]"
        move-class="transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        tag="div"
        class="flex flex-col gap-3"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto"
        >
          <Toast
            :id="toast.id"
            :type="toast.type"
            :message="toast.message"
            :title="toast.title"
            @close="removeToast"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from "../../composables/toast/useToast";
import Toast from "./Toast.vue";

const { toasts, removeToast } = useToast();
</script>

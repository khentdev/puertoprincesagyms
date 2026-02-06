<template>
  <div
    :class="[
      toastClasses,
      iconClasses,
      'min-w-[300px] md:min-w-[320px] max-w-[420px]',
      'flex items-start gap-3 p-4 rounded-lg shadow-lg backdrop-blur-sm',
      'border transition-all duration-200',
      'hover:scale-[1.02] active:scale-[0.98]',
      'animate-[slideIn_0.3s_cubic-bezier(0.16,1,0.3,1)]',
    ]"
    role="alert"
  >
    <div :class="['shrink-0 mt-0.5', iconColorClasses]">
      <component :is="TOAST_ICON_MAP[type]" :size="20" />
    </div>

    <div class="flex-1 min-w-0">
      <p
        v-if="title"
        :class="[
          'font-semibold text-sm mb-1 wrap-break-word',
          titleColorClasses,
        ]"
      >
        {{ title }}
      </p>
      <p :class="['text-sm wrap-break-word', messageColorClasses]">
        {{ message }}
      </p>
    </div>

    <button
      type="button"
      :class="[
        'shrink-0 p-1 rounded-md transition-all duration-200',
        'hover:bg-surface-hover active:scale-90',
        closeButtonColorClasses,
      ]"
      @click="handleClose"
      aria-label="Close notification"
    >
      <X :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-vue-next";
import type { ToastType } from "../../composables/toast/types";
import type { Component } from "vue";

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
}

const TOAST_ICON_MAP: Record<ToastType, Component> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const TOAST_STYLES = {
  success: {
    background: "bg-gradient-to-br from-green-500/10 to-green-500/5",
    border: "border-green-500/30",
    icon: "text-green-500",
    title: "text-green-700 dark:text-green-300",
    message: "text-green-800 dark:text-green-200",
    close: "text-green-500",
  },
  error: {
    background: "bg-gradient-to-br from-red-500/10 to-red-500/5",
    border: "border-red-500/30",
    icon: "text-red-500",
    title: "text-red-700 dark:text-red-300",
    message: "text-red-800 dark:text-red-200",
    close: "text-red-500",
  },
  warning: {
    background: "bg-gradient-to-br from-yellow-500/10 to-yellow-500/5",
    border: "border-yellow-500/30",
    icon: "text-yellow-500",
    title: "text-yellow-700 dark:text-yellow-300",
    message: "text-yellow-800 dark:text-yellow-200",
    close: "text-yellow-500",
  },
  info: {
    background: "bg-gradient-to-br from-blue-500/10 to-blue-500/5",
    border: "border-blue-500/30",
    icon: "text-blue-500",
    title: "text-blue-700 dark:text-blue-300",
    message: "text-blue-800 dark:text-blue-200",
    close: "text-blue-500",
  },
} as const;

const props = defineProps<ToastProps>();

const emit = defineEmits<{
  close: [id: string];
}>();

const toastClasses = computed(() => TOAST_STYLES[props.type].background);
const iconClasses = computed(() => TOAST_STYLES[props.type].border);
const iconColorClasses = computed(() => TOAST_STYLES[props.type].icon);
const titleColorClasses = computed(() => TOAST_STYLES[props.type].title);
const messageColorClasses = computed(() => TOAST_STYLES[props.type].message);
const closeButtonColorClasses = computed(() => TOAST_STYLES[props.type].close);

function handleClose() {
  emit("close", props.id);
}
</script>

<style>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}
</style>

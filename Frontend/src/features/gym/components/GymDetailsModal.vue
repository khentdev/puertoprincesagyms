<template>
  <teleport to="body">
    <transition name="modal" :duration="300">
      <div
        v-if="selectedGym"
        class="modal-wrapper fixed inset-0 z-50 flex justify-center items-end md:items-center p-0 md:p-4"
        aria-modal="true"
        role="dialog"
        @click.self="closeSelectedGym"
      >
        <div
          class="modal-backdrop absolute inset-0 bg-black/50 backdrop-blur-sm"
        ></div>

        <div
          class="modal-content relative w-full md:max-w-2xl bg-bg-panel md:rounded-xl rounded-t-xl shadow-xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto"
          @click.stop
        >
          <div class="relative h-48 md:h-56 bg-component-bg">
            <img
              :src="
                selectedGym.static_api_url || 'https://placehold.co/600x400'
              "
              alt="Gym Location Map"
              class="w-full h-full object-cover"
            />
            <button
              @click="closeSelectedGym"
              class="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close modal"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="p-4 md:p-6 space-y-6">
            <div class="space-y-2">
              <h2
                class="text-2xl md:text-3xl font-bold text-text-high-contrast"
              >
                {{ selectedGym.name }}
              </h2>
              <div
                class="flex flex-col items-start gap-2 text-text-low-contrast"
              >
                <div class="flex items-center gap-2">
                  <MapPin class="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{{ selectedGym.barangay }}</p>
                </div>
                <p class="text-text-low-contrast">
                  {{ selectedGym.address }}
                </p>
              </div>
            </div>

            <div v-if="selectedGym.images && selectedGym.images.length > 0">
              <h3 class="text-lg font-semibold text-text-high-contrast mb-3">
                Gallery
              </h3>
              <div class="grid grid-cols-2 gap-2 md:gap-4">
                <div
                  v-for="(img, index) in selectedGym.images"
                  :key="index"
                  class="aspect-video rounded-lg overflow-hidden bg-component-bg"
                >
                  <img
                    :src="img"
                    :alt="`${selectedGym.name} image ${index + 1}`"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div class="pt-2">
              <a
                :href="selectedGym.map_link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-2 w-full py-3 md:py-2.5 px-4 rounded-lg bg-solid-bg hover:bg-solid-bg-hover text-solid-text font-medium transition-colors shadow-sm active:scale-[0.98]"
              >
                <MapPin class="w-5 h-5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { MapPin, X } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted } from "vue";
import { useGymStore } from "../store/useGymStore";

const gymStore = useGymStore();
const { closeSelectedGym } = gymStore;
const { selectedGym } = storeToRefs(gymStore);

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && selectedGym.value) {
    closeSelectedGym();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.modal-enter-active .modal-backdrop,
.modal-leave-active .modal-backdrop {
  transition: opacity 0.3s ease;
}

.modal-enter-from .modal-backdrop,
.modal-leave-to .modal-backdrop {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: all 0.3s ease;
}

.modal-enter-from .modal-content {
  transform: translateY(100%);
}

.modal-leave-to .modal-content {
  transform: translateY(100%);
}

@media (min-width: 768px) {
  .modal-enter-from .modal-content {
    transform: translateY(0);
    opacity: 0;
  }

  .modal-leave-to .modal-content {
    transform: translateY(0);
    opacity: 0;
  }
}
</style>

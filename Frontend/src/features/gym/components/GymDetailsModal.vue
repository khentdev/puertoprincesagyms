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
          class="modal-content relative w-full md:max-w-2xl bg-bg-panel md:rounded-xl rounded-t-xl shadow-xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto ring-1 ring-border-subtle"
          @click.stop
        >
          <button
            @click="closeSelectedGym"
            class="absolute top-4 right-4 z-20 p-2 bg-component-bg/80 hover:bg-component-bg-hover backdrop-blur-sm text-text-high-contrast rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-border-focus shadow-sm border border-border-subtle cursor-pointer"
            aria-label="Close modal"
          >
            <X class="w-5 h-5" />
          </button>

          <div class="p-4 md:p-6 space-y-6">
            <div class="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              <div
                class="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-component-bg shadow-md border border-border-subtle/20 group relative cursor-pointer"
                @click="
                  openImageViewer(
                    selectedGym.profile_image ||
                      'https://placehold.co/600x400/2f855a/ffffff?text=Gym',
                  )
                "
              >
                <img
                  :src="
                    selectedGym.profile_image ||
                    'https://placehold.co/600x400/2f855a/ffffff?text=Gym'
                  "
                  :alt="`${selectedGym.name} profile`"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="high"
                />
                <div
                  class="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"
                ></div>
              </div>

              <div class="flex flex-col gap-2 flex-1 min-w-0 pt-1">
                <div class="space-y-1">
                  <div class="flex items-start justify-between gap-4">
                    <h2
                      class="text-2xl md:text-3xl font-bold text-text-high-contrast leading-tight tracking-tight"
                    >
                      {{ selectedGym.name }}
                    </h2>
                  </div>

                  <div
                    class="flex flex-col items-start gap-2 pt-1 text-text-low-contrast"
                  >
                    <div
                      class="flex items-center gap-1.5 text-sm text-text-low-contrast font-medium"
                    >
                      <MapPin class="w-4 h-4 shrink-0" />
                      <p>{{ selectedGym.barangay }}</p>
                    </div>
                    <p class="text-text-low-contrast leading-relaxed pl-1">
                      {{ selectedGym.address }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="w-full h-48 md:h-56 rounded-lg overflow-hidden bg-component-bg ring-1 ring-border-subtle shadow-sm relative group cursor-pointer"
              @click="
                openImageViewer(staticMapUrl || 'https://placehold.co/600x400')
              "
            >
              <img
                :src="staticMapUrl || 'https://placehold.co/600x400'"
                alt="Gym Location Map"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                referrerpolicy="no-referrer-when-downgrade"
              />
              <div
                class="absolute inset-0 pointer-events-none ring-inset ring-1 ring-black/5 rounded-lg"
              ></div>
            </div>

            <div v-if="selectedGym.images && selectedGym.images.length > 0">
              <h3
                class="text-lg font-semibold text-text-high-contrast mb-4 flex items-center gap-2"
              >
                <span>Gallery</span>
                <span
                  class="text-sm font-normal text-text-low-contrast bg-component-bg px-2 py-0.5 rounded-full border border-border-subtle"
                  >{{ selectedGym.images.length }}</span
                >
              </h3>
              <div class="grid grid-cols-2 gap-3 md:gap-4">
                <div
                  v-for="(img, index) in selectedGym.images"
                  :key="index"
                  class="aspect-video rounded-lg overflow-hidden bg-component-bg ring-1 ring-border-subtle shadow-sm relative group cursor-pointer"
                  @click="openImageViewer(img)"
                >
                  <img
                    :src="img"
                    :alt="`${selectedGym.name} image ${index + 1}`"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                  />
                  <div
                    class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
                  ></div>
                </div>
              </div>
            </div>

            <div
              class="p-2 sticky bottom-0 bg-bg-panel backdrop-blur-sm -mx-4 md:-mx-6 px-4 pb-2 border-t border-transparent"
            >
              <a
                :href="selectedGym.map_link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-solid-bg hover:bg-solid-bg-hover text-solid-text font-semibold transition-all shadow-md hover:shadow-lg active:scale-[0.98] ring-1 ring-white/10"
              >
                <MapPin class="w-5 h-5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <ImageViewerModal
      :is-open="isImageViewerOpen"
      :images="viewerImages"
      :initial-index="viewerInitialIndex"
      @close="closeImageViewer"
    />
  </teleport>
</template>

<script lang="ts" setup>
import { MapPin, X } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useGymStore } from "../store/useGymStore";
import { generateStaticMapUrl } from "../utils/mapHelpers";
import ImageViewerModal from "./ImageViewerModal.vue";

const gymStore = useGymStore();
const { closeSelectedGym } = gymStore;
const { selectedGym } = storeToRefs(gymStore);

const mapUrlCache = new Map<string, string>();
const staticMapUrl = computed(() => {
  if (!selectedGym.value) return "";

  const gymId = selectedGym.value.id;
  if (mapUrlCache.has(gymId)) return mapUrlCache.get(gymId);

  const url = generateStaticMapUrl(selectedGym.value);
  mapUrlCache.set(gymId, url);
  return url;
});

const isImageViewerOpen = ref(false);
const viewerImages = computed(() => {
  if (!selectedGym.value) return [];

  const images = [];
  images.push({
    url: selectedGym.value.profile_image,
    alt: `${selectedGym.value.name} profile`,
  });

  images.push({
    url: staticMapUrl.value!,
    alt: "Gym Location Map",
  });

  if (selectedGym.value.images && selectedGym.value.images.length > 0) {
    selectedGym.value.images.forEach((img, index) => {
      images.push({
        url: img,
        alt: `${selectedGym.value!.name} image ${index + 1}`,
      });
    });
  }
  return images;
});

const viewerInitialIndex = ref(0);

function openImageViewer(imageUrl: string) {
  const index = viewerImages.value.findIndex((img) => img.url === imageUrl);
  viewerInitialIndex.value = index >= 0 ? index : 0;
  isImageViewerOpen.value = true;
}

function closeImageViewer() {
  isImageViewerOpen.value = false;
}

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
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from .modal-content {
  transform: translateY(100%);
  opacity: 0.5;
}

.modal-leave-to .modal-content {
  transform: translateY(100%);
  opacity: 0;
}

@media (min-width: 768px) {
  .modal-enter-from .modal-content {
    transform: translateY(20px) scale(0.95);
    opacity: 0;
  }

  .modal-leave-to .modal-content {
    transform: translateY(20px) scale(0.95);
    opacity: 0;
  }
}
</style>

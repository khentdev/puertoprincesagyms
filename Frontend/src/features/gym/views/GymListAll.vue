<template>
  <section
    class="md:p-8 p-6 md:space-y-8 space-y-6 flex-1 h-[calc(100vh-4.50rem)] overflow-y-auto"
  >
    <div
      class="flex-1 max-h-[40vh] h-[40vh] bg-component-bg rounded-lg overflow-hidden"
    >
      <google-map
        ref="mapRef"
        :api-key="LoadEnv('VITE_GOOGLE_MAP_API_KEY')"
        style="width: 100%; height: 100%"
        :center="center"
        :zoom="15"
        :map-id="LoadEnv('VITE_GOOGLE_MAP_JS_API_MAP_ID')"
      >
        <marker-cluster
          @click="handleClusterClick"
          :options="{ renderer: clusterRenderer() }"
        >
          <custom-marker
            v-for="gym in filteredGyms"
            :key="gym.id"
            :options="{
              position: { lat: gym.location.lat, lng: gym.location.lng },
              title: gym.name,
            }"
          >
            <gym-map-marker
              :gym-name="gym.name"
              :gym-id="gym.id"
              @click="gymStore.setSelectedGym({ id: gym.id })"
            />
          </custom-marker>
        </marker-cluster>
      </google-map>
    </div>
    <Header />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <gym-card v-for="gym in filteredGyms" :key="gym.id" :gym="gym" />
    </div>
  </section>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { CustomMarker, GoogleMap, MarkerCluster } from "vue3-google-map";
import { LoadEnv } from "../../../config/loadEnv";
import GymCard from "../components/GymCard.vue";
import GymMapMarker from "../components/GymMapMarker.vue";
import Header from "../components/Header.vue";
import { useGymStore } from "../store/useGymStore";

const gymStore = useGymStore();
const { filteredGyms } = storeToRefs(gymStore);

const center = { lat: 9.73917, lng: 118.73528 };
const mapRef = ref<InstanceType<typeof GoogleMap>>();

const handleClusterClick = (cluster: { bounds: google.maps.LatLngBounds }) => {
  if (mapRef.value?.map) {
    mapRef.value.map.fitBounds(cluster.bounds);
  }
};

function clusterRenderer() {
  return {
    render: ({
      count,
      position,
    }: {
      count: number;
      position: google.maps.LatLng;
    }) => {
      const radius = 15 + Math.min(count, 20);
      const size = radius * 2;

      const content = document.createElement("div");
      content.style.width = `${size}px`;
      content.style.height = `${size}px`;
      content.style.background = "#2f855a";
      content.style.color = "#ffffff";
      content.style.borderRadius = "50%";
      content.style.display = "flex";
      content.style.alignItems = "center";
      content.style.justifyContent = "center";
      content.style.border = "2px solid #ffffff";
      content.style.fontWeight = "bold";
      content.style.fontSize = "12px";
      content.textContent = String(count);

      return new google.maps.marker.AdvancedMarkerElement({
        position,
        content,
        title: `Cluster of ${count} gyms`,
        zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
      });
    },
  };
}
</script>

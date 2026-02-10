<template>
  <ToastContainer />
  <GymDetailsModal/>
  <router-view></router-view>
</template>
<script setup lang="ts">
import GymDetailsModal from "./features/gym/components/GymDetailsModal.vue";
import ToastContainer from "./shared/components/toast/ToastContainer.vue";
</script>

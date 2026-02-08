<template>
  <the-header />
  <div class="flex min-h-[calc(100vh-4.5rem)]">
    <side-bar />
    <div class="flex-1 bg-bg-app">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SideBar from "../components/TheSideBar.vue";
import TheHeader from "../components/TheHeader.vue";
</script>

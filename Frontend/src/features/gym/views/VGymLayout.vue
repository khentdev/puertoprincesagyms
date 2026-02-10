<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <the-header />
    <div class="flex flex-1 overflow-hidden">
      <side-bar />
      <div class="flex-1 bg-bg-app overflow-y-auto">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SideBar from "../components/TheSideBar.vue";
import TheHeader from "../components/TheHeader.vue";
</script>

<template>
  <m-header />
  <tab></tab>
  <router-view></router-view>
  <player />
</template>

<script>
import Header from "@/components/header/header.vue";
import Tab from "@/components/tab/tab.vue";
import Player from "@/components/player/player";

export default {
  components: {
    MHeader: Header,
    Tab,
    Player,
  },
};
</script>

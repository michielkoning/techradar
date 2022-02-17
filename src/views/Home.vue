<template>
  <div class="home">
    <Radar msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Radar from "@/components/Radar.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    Radar,
  },
});
</script>

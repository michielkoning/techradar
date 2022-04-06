<template>
  <div class="home">
    <Radar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Radar from "@/components/Radar.vue";

export default defineComponent({
  name: "Home",
  components: {
    Radar,
  },
});
</script>

<template>
  <Nav />
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Nav from "@/components/Nav.vue";
export default defineComponent({
  components: {
    Nav,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

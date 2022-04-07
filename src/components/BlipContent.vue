<template>
  <div>
    <h1>{{ props.blip.name }}</h1>
    <div class="description" v-if="props.blip.description">
      {{ props.blip.description }}
    </div>

    <dl class="descriptions">
      <dt class="descriptions__term">Category</dt>
      <dd class="descriptions__details">{{ props.blip.category }}</dd>
      <dt class="descriptions__term">Status</dt>
      <dd class="descriptions__details">{{ props.blip.status }}</dd>
      <dt class="descriptions__term">Url</dt>
      <dd class="descriptions__details">
        <a :href="props.blip.url" target="_blank" rel="noopener noreferrer">
          {{ props.blip.url }}
        </a>
      </dd>
    </dl>
    <div class="comments" v-if="props.blip.comments">
      <h2>Comments</h2>
      {{ props.blip.comments }}
    </div>
    <div class="history" v-if="props.blip.history.length">
      <h2>History</h2>
      <p>TODO: Add history...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Blip } from "@/types";

const props = defineProps<{
  blip: Blip;
}>();
</script>

<style scoped>
.title {
  font-size: 24px;
}

.description {
  white-space: pre-wrap;
}

.descriptions {
  display: inline-grid;
  grid-template-columns: auto auto;
  gap: 4px;
  font-size: 14px;
}
.descriptions__term {
  font-weight: 700;
}
</style>

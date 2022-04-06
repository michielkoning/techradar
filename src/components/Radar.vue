<template>
  <div class="radar">
    <table class="radar-table">
      <thead>
        <tr>
          <th></th>
          <th v-for="status in statuses" :key="status" class="status-header">
            {{ status }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in radar.categories" :key="category">
          <th>{{ category }}</th>
          <td
            v-for="status in statuses"
            class="status"
            :class="getStatusClassName(status)"
            :key="`${category}_${status}`"
          >
            <button
              v-for="blip in filteredBlibs(category, status)"
              :key="blip.name"
              class="blip"
              @click="toggleActiveBlip(blip)"
            >
              {{ blip.name }}
              <sup v-if="blip.isNew">new</sup>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="activeBlip" class="blip-details" id="blip-details">
      {{ activeBlip.name }}
      <dl>
        <dt>Category</dt>
        <dd>{{ activeBlip.category }}</dd>
        <dt>Status</dt>
        <dd>{{ activeBlip.status }}</dd>
        <dt>Url</dt>
        <dd>
          <a :href="activeBlip.url" target="_blank" rel="noopener noreferrer">{{
            activeBlip.url
          }}</a>
        </dd>
      </dl>
      {{ activeBlip.history }}
      {{ comments }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Blip } from "@/types";
import radar from "@/data/radar";

const statuses = ref<string[]>(["Assess", "Trial", "Adopt", "On hold"]);

const activeBlip = ref<Blip | null>(null);

function filteredBlibs(category: string, status: string) {
  return (radar.blips as Blip[])
    .filter((item) => item.category === category && item.status === status)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getStatusClassName(status: string) {
  return `status--${status.split(" ").join("-").toLowerCase()}`;
}

function toggleActiveBlip(blip: Blip) {
  console.log(activeBlip.value);
  if (activeBlip.value && activeBlip.value.name === blip.name) {
    activeBlip.value = null;
  } else {
    activeBlip.value = blip;
  }
}
</script>

<style scoped>
.radar {
  padding: 1rem;
}

.radar-table {
  width: 100%;
}

th,
td {
  vertical-align: top;
  text-align: left;
  padding: 1rem;
}

.status-header {
  background: #ccc;
}

.status {
  background-color: #eee;
}

.status--on-hold {
  --blip-color: #aaa;
  --blip-bg-color: white;
}

.status--assess {
  --blip-color: white;
  --blip-bg-color: cornflowerblue;
}

.status--trial {
  --blip-color: black;
  --blip-bg-color: gold;
}

.status--adopt {
  --blip-color: white;
  --blip-bg-color: green;
}

.blip {
  display: inline-block;
  margin: 0.2em;
  padding: 0.5em;
  border-radius: 0.5em;
  background: var(--blip-bg-color);
  color: var(--blip-color);
  border: 0;
  cursor: pointer;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

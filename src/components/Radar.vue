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

    <dialog class="dialog" ref="dialog">
      <button @click="closeDialog()">Close</button>
      <BlipContent v-if="activeBlip" :blip="activeBlip" />
    </dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import type { Blip } from '@/types'
import radar from '@/data/radar'
import BlipContent from '@/components/BlipContent.vue'

const statuses = ref<string[]>(['Assess', 'Trial', 'Adopt', 'On hold'])

const activeBlip = ref<Blip | null>(null)
const dialog: Ref<HTMLDialogElement | null> = ref(null)

const filteredBlibs = (category: string, status: string) => {
  return (radar.blips as Blip[])
    .filter((item) => item.category === category && item.status === status)
    .sort((a, b) => a.name.localeCompare(b.name))
}

const getStatusClassName = (status: string) => {
  return `status--${status.split(' ').join('-').toLowerCase()}`
}

const toggleActiveBlip = (blip: Blip) => {
  if (activeBlip.value && activeBlip.value.name === blip.name) {
    closeDialog()
  } else {
    activeBlip.value = blip
    openDialog()
  }
}

const openDialog = () => {
  if (!dialog.value) {
    return
  }
  dialog.value.showModal()
}

const closeDialog = () => {
  if (!dialog.value) {
    return
  }
  dialog.value.close()
  activeBlip.value = null
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

.dialog {
  border-radius: 4px;
  border: 0;
  width: 65ch;
  max-width: calc(100% - 30px);
  max-height: calc(100vh - 30px);
  box-shadow: 0 0 10px rgb(0 0 0 / 0.3);
  padding: 1rem;
}
.dialog::backdrop {
  background: rgb(0 0 0 / 0.5);
  padding: 1rem;
  backdrop-filter: blur(2px);
}
</style>

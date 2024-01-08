<template>

  <div class="flex w-full h-screen items-center justify-center rounded">
    <div class="flex flex-col bg-gray-300 p-8 space-y-4 rounded">
      <div>
        <h1 class="text-center">Registrar Máquina</h1>
      </div>
      <div class="flex flex-col">
        <label for="img" class="">IP</label>
        <input type="text" class="rounded p-2" id="img" v-model="ip" placeholder="Digite a imagem">
      </div>
      <div class="flex flex-col">
        <label for="qtd" class="">Nome</label>
        <input type="text" class="rounded p-2" id="qtd" v-model="name" placeholder="Digite a quatidade de copias">
      </div>
      <div class="flex flex-col">
        <label for="qtd" class="">Localização</label>
        <input type="text" class="rounded p-2" id="qtd" v-model="location" placeholder="Digite a quatidade de copias">
      </div>
      <button @click="saveLocation" class="bg-black text-white p-2 rounded">Salvar Máquina</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from "axios";


const ip = ref('')
const name = ref('')
const location = ref('')

const saveLocation = async () => {
  await axios.post('/machines').catch((err) => {
    console.log(err)
  }).then((res) => {
    console.log(res)
  })
}
</script>
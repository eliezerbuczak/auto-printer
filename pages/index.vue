<template>
  <div class="flex w-full h-screen items-center justify-center rounded">
    <div class="flex flex-col bg-gray-300 p-8 space-y-4 rounded">
      <div class="flex flex-col">
        <label for="img" class="">Imagem</label>
        <input type="text" class="rounded p-2" id="img" v-model="img" placeholder="Digite a imagem">
      </div>
      <div class="flex flex-col">
        <label for="qtd" class="">Quantidade</label>
        <input type="text" class="rounded p-2" id="qtd" v-model="qtd" placeholder="Digite a quatidade de copias">
      </div>
      <select @focus="searchMachines" class="rounded p-2" v-model="ip">
        <option :value="null" disabled selected>Selecione o IP</option>
        <option v-for="ip in ips" :key="ip.ip" :value="ip.ip">
          {{ ip.ip }}
        </option>
      </select>
      <select class="rounded p-2" v-model="os">
        <option :value="null" disabled selected>Selecione o Sistema Operacional</option>
        <option v-for="system in oss" :key="system.value" :value="system.value">
          {{ system.name }}
        </option>
      </select>
      <button @click="searchPrinters" class="bg-black text-white p-2 rounded">Imprimir</button>
    </div>
  </div>
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-gray-300 p-4 rounded flex flex-col space-y-2">
      <div class="w-full text-end">
        <button @click="openModal" class=" w-fit">X</button>
      </div>
      <select class="rounded p-2" v-model="printer">
        <option :value="null" disabled selected>Selecione uma impressora</option>
        <option v-for="print in printers" :key="print" :value="print">
          {{ print }}
        </option>
      </select>

      <button @click="send" class="bg-black text-white p-2 rounded">Imprimir</button>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import axios from "axios";

const img = ref('')
const qtd = ref('')
const os = ref(null)
const ip = ref(null)
const oss = ref(
  [
    { name: 'Windows', value: 'win' },
    { name: 'Linux', value: 'linux' },
    { name: 'Mac', value: 'mac' },
  ]
)
const ips = ref([])
const printer = ref(null)
const showModal = ref(false)
const printers = ref([])
const send = async () => {
  const params = new URLSearchParams();
  params.append('image', img.value);
  params.append('copies', qtd.value);
  params.append('os', os.value);
  params.append('printer', printer.value);

  await axios.post('http://'+ip.value+':8080/print', params)
      .catch((err) => {
        console.log(err);
      });
};
const searchMachines  = async () => {
  await axios.get('/api/machines').catch((err) => {
    console.log(err)
  }).then((res) => {
    ips.value = res.data
    console.log(res)
  })
}
const openModal = () => {
  showModal.value = !showModal.value
}

const searchPrinters = async () => {
  await axios.get('http://'+ip.value+':8080/printers?os='+os.value).catch((err) => {
    console.log(err)
  }).then((res) => {
    openModal()
    printers.value = res.data.printers
  })
}
</script>


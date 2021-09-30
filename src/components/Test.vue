<template>
    <div>{{ data }}</div>
</template>

<script setup>
import { ref } from 'vue';
import { createInterbtc } from "@interlay/interbtc";

const DEFAULT_PARACHAIN_ENDPOINT = "wss://api.interlay.io/parachain";
const isMainnet = false;

const data = ref(null);

console.log(createInterbtc)

createInterbtc(DEFAULT_PARACHAIN_ENDPOINT, isMainnet).then((api) => {
    console.log(api.interBtcApi);
    api.interBtcApi.vaults.list().then((list) => {
        data.value = list;
    })
})


</script>

<style>

</style>

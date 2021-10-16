<template>
  <div>{{ data }}</div>
</template>

<script>
import { ref } from 'vue';
import {
  createProvider,
  getAPITypes,
  getRPCTypes,
  DefaultInterBTCAPI,
} from '@interlay/interbtc-api';
// import { Detector } from '@substrate/connect';

const DEFAULT_PARACHAIN_ENDPOINT = 'wss://api.interlay.io/parachain';
const isMainnet = false;

export default {
  setup() {
    const data = ref(null);
    // const detect = new Detector('my cool unstoppable app');

    createApi().then(api => {
      console.log(api.interBtcApi);
      api.interBtcApi.vaults.list().then(list => {
        data.value = list;
      });
    });
  },
};

async function createApi() {
  //   const provider = createProvider(DEFAULT_PARACHAIN_ENDPOINT, false);
  //   const types = getAPITypes();
  //   const rpc = getRPCTypes();

  //   const options = {
  //     provider,
  //     types,
  //     rpc,
  //   };

  //   const api = await detect.connect('interbtc-testnet', undefined, options);
  //   return new DefaultInterBTCAPI(api, isMainnet);

  return await createInterbtc(DEFAULT_PARACHAIN_ENDPOINT, isMainnet);
}

// createInterbtc(DEFAULT_PARACHAIN_ENDPOINT, isMainnet).then((api) => {
//     console.log(api.interBtcApi);
//     api.interBtcApi.vaults.list().then((list) => {
//         data.value = list;
//     })
// })
</script>

<style></style>

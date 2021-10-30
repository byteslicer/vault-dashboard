<template>
  <Stat :value="value" title="BTC/DOT (oracle)" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Stat from '../components/Stat.vue';
import { connect } from '../api/interbtc';
import { Polkadot } from '@interlay/monetary-js';
import { asyncComputed } from '@vueuse/core';

export default defineComponent({
  components: { Stat },
  setup() {
    const oraclePrice = asyncComputed(async () => {
      const api = await connect();

      const price = await api.interBtcApi.oracle.getExchangeRate(Polkadot);

      return price.toHuman();
    });

    const value = computed(
      () => oraclePrice.value && `${oraclePrice.value} DOT`
    );
    return {
      value,
    };
  },
});
</script>

<style></style>

<template>

  <div class="stat" v-resize-text="{ ratio: 0.9 }">{{ price }} USD</div>
</template>

<script lang="ts">
import { ref, defineComponent, Ref, computed, toRaw } from 'vue';
import axios from 'axios';
import { connect } from '../api/kraken'

export default defineComponent({
  setup() {
    const price = ref(null);
    const kraken = connect();
    kraken.then((api) => {
      api.subscribe('BTC/USD', ([channelId, payload]) => {
        console.log(payload)
        price.value = Number(payload.c[0]);
      })
    })
    return { price }
  },
});
</script>

<style>
.stat {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>

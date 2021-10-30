<template>
  <Stat :value="close ? `${close} ${currency}` : null" :title="symbol" />
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';
import { useStreaming } from '../api/kraken';
import Stat from '../components/Stat.vue';

export default defineComponent({
  components: { Stat },
  props: {
    symbol: {
      type: String,
      default: 'BTC/USD',
    },
  },
  setup(props) {
    const { symbol } = toRefs(props);
    const currency = computed(() => symbol.value.split('/')[1].toUpperCase());

    const { close } = useStreaming(symbol);

    // const kraken = connect();
    // kraken.then((api) => {
    //   const unsubscribe = api.subscribe(props.symbol, ([channelId, payload]) => {
    //     console.log(payload)
    //     price.value = Number(payload.c[0]);
    //   })
    // })
    return { close, currency };
  },
});
</script>

<style></style>

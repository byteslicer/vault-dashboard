<template>
  <Stat :value="value" title="Collateral" />
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, computed } from 'vue';
import Stat from '../components/Stat.vue';
import { useVaultStore } from '../stores/vault';

export default defineComponent({
  components: { Stat },
  setup() {
    const vaultStore = useVaultStore();
    const { rank } = storeToRefs(vaultStore);

    const value = computed(
      () =>
        rank.value?.vault && `${rank.value?.vault.backingCollateralHuman} DOT`
    );
    return {
      value,
    };
  },
});
</script>

<style></style>

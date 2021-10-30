<template>
    <Stat :value="value" title="Rank"/>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { ref, defineComponent, computed } from 'vue';
import Stat from '../components/Stat.vue'
import { useVaultStore } from '../stores/vault';

export default defineComponent({
  components: { Stat },
  setup() {
    const vaultStore = useVaultStore();
    const { rank } = storeToRefs(vaultStore);

    const value = computed(() => rank.value?.rank && `#${rank.value?.rank}`)
    return {
      value
    }
  },
});
</script>

<style>
</style>

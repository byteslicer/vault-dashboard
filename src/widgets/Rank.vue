<template>
  <Stat :value="value" title="Rank" />
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, computed, ComputedRef } from 'vue';
import Stat from '../components/Stat.vue';
import { useVaultStore } from '../stores/vault';

export default defineComponent({
  components: { Stat },
  setup() {
    const vaultStore = useVaultStore();
    const { rank } = storeToRefs(vaultStore);

    const value: ComputedRef<string | null> = computed(() =>
      rank.value?.rank ? `#${rank.value?.rank}` : null
    );
    return {
      value,
    };
  },
});
</script>

<style></style>

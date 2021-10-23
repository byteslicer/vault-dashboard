<template>
  <div class="d-flex flex-column container">
    <Nav class="nav" />
    <Grid :widgets="widgets" class="flex-grow" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Grid, { Widget } from './components/Grid.vue';
import Chart from './components/Chart.vue';
import Nav from './components/Nav.vue';
import Test from './components/Test.vue';
import { useVaultStore } from './stores/vault';

export default defineComponent({
  name: 'App',
  components: {
    Grid,
    Nav,
  },
  setup() {
    const vault = useVaultStore();
    const widgets: Widget[] = [
      {
        id: 'a',
        x: 0,
        y: 0,
        width: 2,
        height: 3,
        component: Chart,
      },
      {
        id: 'b',
        x: 2,
        y: 0,
        width: 4,
        height: 2,
        component: Test,
      },
    ];

    onMounted(() => {
      vault.fetchVaults();
    });

    return {
      widgets,
    };
  },
});
</script>

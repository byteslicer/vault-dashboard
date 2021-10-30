<template>
  <div class="d-flex flex-column container">
    <div class="nav">
      <div class="logo">myVault</div>
      <el-select v-model="vault.selectedAccount" placeholder="Select">
        <el-option
          v-for="acc in accounts"
          :key="acc.address"
          :label="acc.meta.name"
          :value="acc.address"
        >
        </el-option>
      </el-select>
      <Settings />
    </div>
    <Grid :widgets="widgets" />
    <!--  -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ComputedRef } from 'vue';
import { ElSelect, ElOption } from 'element-plus';

import Grid, { Widget } from './components/Grid.vue';
import { useVaultStore } from './stores/vault';
import { useConfigStore } from './stores/config';
import { getAccounts } from './api/polkadot';
import { asyncComputed } from '@vueuse/core';
import { widgetMap } from './widgets';
import Settings from './components/Settings.vue';

export default defineComponent({
  name: 'App',
  components: {
    Grid,
    Settings,
    ElSelect,
    ElOption,
  },
  setup() {
    const vault = useVaultStore();
    const config = useConfigStore();

    const accounts = asyncComputed(async () => {
      return await getAccounts();
    }, null);

    const widgets: ComputedRef<Widget[]> = computed(() =>
      config.widgets
        .filter((w: any) => w.component in widgetMap)
        .map((w: any) => ({
          ...w,
          component: widgetMap[w.component],
        }))
    );

    // const widgets: Widget[] = [
    //   {
    //     id: 'chart',
    //     x: 0,
    //     y: 0,
    //     width: 2,
    //     height: 2,
    //     component: Chart,
    //   },
    //   {
    //     id: 'locked',
    //     x: 2,
    //     y: 0,
    //     width: 2,
    //     height: 1,
    //     component: LockedTokens,
    //   },
    //   {
    //     id: 'rank',
    //     x: 4,
    //     y: 0,
    //     width: 1,
    //     height: 1,
    //     component: Rank,
    //   },
    //   {
    //     id: 'btcprice',
    //     x: 0,
    //     y: 2,
    //     width: 2,
    //     height: 1,
    //     component: BitcoinPrice,
    //   },
    // ];

    onMounted(() => {
      vault.fetchVaults();
    });

    return {
      vault,
      widgets,
      accounts,
    };
  },
});
</script>

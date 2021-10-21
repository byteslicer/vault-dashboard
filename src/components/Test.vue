<template>
  <apexchart
    width="100%"
    type="bar"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script lang="ts">
import type { VaultExt } from '@interlay/interbtc-api';
import { BitcoinUnit } from "@interlay/monetary-js";

import { computed, defineComponent, ref, Ref } from 'vue';
import { useVaultStore } from '../stores/vault';


export default defineComponent({
  setup() {
    const vault = useVaultStore();
    const series = computed(() => {
      let data: any  = [];
      if (vault.entries) {
        data = Object.values(vault.entries as VaultExt<BitcoinUnit>[]).filter(
          (x) => x.status === 0
        ).map(x => ({
          x: x.id.toHuman(),
          y: Number(x.issuedTokens.toHuman())
        })).sort((a, b) => b.y - a.y );
      }
      return [{
        data
      }];
    });
    const options = {
      chart: {
        height: '100%',
        foreColor: '#93A1A1',
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom',
          },
        },
      },
      colors: [
        '#268BD2', // Blue
        '#D33682', // Magenta
        '#B58900', // Orange
        '#CB4B16', // Red
        '#DC322F', // Yellow
        '#6C71C4', // Violet
        '#2AA198', // Cyan
        '#859900', // Green
      ],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#93A1A1'],
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
      stroke: {
        width: 0.5,
        colors: ['#586E75'],
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      xaxis: {
        type: 'category'
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        borderColor: '#586E75',
        strokeDashArray: 2,
      },
      title: {
        text: 'Ranking (Issued interBTC)',
        align: 'center',
        floating: true
      },
    };

    return {
      options,
      series,
    };
  },
});
</script>

<style></style>

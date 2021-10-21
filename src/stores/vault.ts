import { defineStore } from 'pinia';
import { connect } from '../api/interbtc';
import type { VaultExt } from '@interlay/interbtc-api';
import { BitcoinUnit } from "@interlay/monetary-js";

export const useVaultStore = defineStore('vault', {
  state: () => {
    return {
      entries: {},
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async fetchVaults() {
      const api = await connect();

      const entries: VaultExt<BitcoinUnit>[] = await api.interBtcApi.vaults.list();
      this.entries = entries.reduce((acc: Record<string, VaultExt<BitcoinUnit>>, x) => {
        acc[x.id.toHuman()] = x;

        return acc;
      }, {});
      //   dd.then(list => list.reduce((acc, x) => {}, {}));
      //   this.todos.push({ text, id: this.nextId++, isFinished: false });
    },
  },
});

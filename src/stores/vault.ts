import { defineStore } from 'pinia';
import { connect } from '../api/interbtc';
import type { VaultExt } from '@interlay/interbtc-api';
import { BitcoinUnit } from "@interlay/monetary-js";
import { useStorage } from '@vueuse/core'
import { Ref } from 'vue';

export type VaultState = {
  selectedAccount: Ref<string>;
  entries: Record<string, VaultExt<BitcoinUnit>>;
};

export const useVaultStore = defineStore('vault', {
  state: () => {
    return {
      selectedAccount: useStorage('selectedAccount', null),
      entries: {},
    } as VaultState;
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  getters: {
    rank(state) {
      if (!state.entries) {
        return null;
      }

      let entries: any[] = Object.values(state.entries as Record<string, VaultExt<BitcoinUnit>>).map(x => ({
        ...x,
        id: x.id.toHuman(),
        issuedTokens: x.issuedTokens.toBig().toNumber(),
        issuedTokensHuman: x.issuedTokens.toHuman()
      }))

      entries.sort((a, b) => b.issuedTokens - a.issuedTokens);

      const ownedVaultIndex = entries.findIndex(x => x.id === state.selectedAccount)

      return {
        vault: ownedVaultIndex >= 0 ? entries[ownedVaultIndex] : null,
        rank: ownedVaultIndex >= 0 ? ownedVaultIndex + 1 : null, 
        entries 
      };
    }
  },
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

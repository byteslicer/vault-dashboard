import { defineStore } from 'pinia';
import defaultConfig from '../default.json';
import { useStorage } from '@vueuse/core'

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      widgets: useStorage('widgets', defaultConfig.widgets)
    };
  },
});

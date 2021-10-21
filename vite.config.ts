import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import inject from '@rollup/plugin-inject';

import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { 'bitcoin-core': './src/bitcoin-core-stub.js' },
  },
  plugins: [
    inject({
      global: path.resolve('src/global.js'),
      Buffer: ['buffer', 'Buffer'],
    }),
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  define: {
    process: { env: {} },
  },
});

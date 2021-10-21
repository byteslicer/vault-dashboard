import { createApp } from 'vue';
import App from './App.vue';
import VueApexCharts from 'vue3-apexcharts';
import { Buffer } from 'buffer';
import './styles/index.scss';
import { createPinia } from 'pinia';
window.Buffer = Buffer;

const pinia = createPinia();
const app = createApp(App);
app.use(VueApexCharts);
app.use(pinia);
app.mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import VueApexCharts from 'vue3-apexcharts';
import { Buffer } from 'buffer';
import 'element-plus/dist/index.css';
import './styles/index.scss';
import { createPinia } from 'pinia';
import 'chartjs-adapter-luxon';

// Chart.defaults.color = '#93A1A1';
// Chart.defaults.borderColor = '#073d4b';

window.Buffer = Buffer;

const pinia = createPinia();
const app = createApp(App);
app.use(VueApexCharts);
app.use(pinia);
app.mount('#app');

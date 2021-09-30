import { createApp } from 'vue'
import App from './App.vue'
import VueApexCharts from 'vue3-apexcharts';

import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'

const app = createApp(App);
app.use(VueApexCharts);
app.mount('#app')

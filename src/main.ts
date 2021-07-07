import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//Axiosセットアップ
import axios from 'axios'
import VueAxios from 'vue-axios'
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';

import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primeicons/primeicons.css'




createApp(App)
  .use(store,axios,VueAxios,PrimeVue)
  .use(PrimeVue)
  .component('InputText', InputText)
  .component('Dialog', Dialog)
  .component('Tag', Tag)
  .use(router).mount('#app')

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
import Panel from 'primevue/panel';

import VueStarRating from 'vue-star-rating';


import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';

// import 'primeflex/src/_variables.scss';
// import 'primeflex/src/_grid.scss';
// import 'primeflex/src/_formlayout.scss';
// import 'primeflex/src/_display.scss';
// import 'primeflex/src/_text.scss';
// import 'primeflex/src/flexbox/_flexbox.scss';
// import 'primeflex/src/_spacing.scss';
// import 'primeflex/src/_elevation.scss';

// バリデーション


createApp(App)
  .use(store,axios,VueAxios,PrimeVue)
  .use(PrimeVue)
  .component('InputText', InputText)
  .component('Dialog', Dialog)
  .component('Tag', Tag)
  .component("Panel", Panel)
  .component('star-rating', VueStarRating) 
  .use(router).mount('#app')

import './assets/css/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  HiRefresh,
  FaMapMarkerAlt,
  FaMapPin,
  RiCelsiusLine,
  IoClose,
  LaGlobeAsiaSolid,
  IoSearch
} from 'oh-vue-icons/icons';

import App from './App.vue';
import { router } from './router';

addIcons(HiRefresh, FaMapMarkerAlt, FaMapPin, RiCelsiusLine, IoClose, LaGlobeAsiaSolid, IoSearch);

const app = createApp(App);

app.component('v-icon', OhVueIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');

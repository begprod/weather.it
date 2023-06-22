import './assets/css/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  FaCircle,
  FaMapMarkerAlt,
  FaMapPin,
  HiRefresh,
  IoClose,
  IoSearch,
  RiCelsiusLine,
  RiLoaderLine,
  LaGlobeAsiaSolid,
  MdLocationoffTwotone,
  MdDoneallOutlined,
  MdNotinterestedOutlined,
} from 'oh-vue-icons/icons';

import App from './App.vue';
import { router } from './router';

addIcons(
  FaCircle,
  FaMapMarkerAlt,
  FaMapPin,
  HiRefresh,
  IoClose,
  IoSearch,
  RiCelsiusLine,
  RiLoaderLine,
  LaGlobeAsiaSolid,
  MdLocationoffTwotone,
  MdDoneallOutlined,
  MdNotinterestedOutlined,
);

const app = createApp(App);

app.component('v-icon', OhVueIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');

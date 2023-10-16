import './assets/css/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  CoTrash,
  FaCircle,
  FaMapMarkerAlt,
  FaMapPin,
  HiDotsVertical,
  HiRefresh,
  IoSearch,
  RiCelsiusLine,
  RiLoaderLine,
  LaGlobeAsiaSolid,
  MdLocationoffTwotone,
  MdDoneallOutlined,
  MdNotinterestedOutlined,
  MdKeyboardcommandkeyRound,
} from 'oh-vue-icons/icons';

import App from './App.vue';
import { router } from './router';
import { clickOutside } from '@/directives/clickOutsideDirective';

addIcons(
  CoTrash,
  FaCircle,
  FaMapMarkerAlt,
  FaMapPin,
  HiDotsVertical,
  HiRefresh,
  IoSearch,
  RiCelsiusLine,
  RiLoaderLine,
  LaGlobeAsiaSolid,
  MdLocationoffTwotone,
  MdDoneallOutlined,
  MdNotinterestedOutlined,
  MdKeyboardcommandkeyRound,
);

const app = createApp(App);

app.directive('click-outside', clickOutside);

app.component('v-icon', OhVueIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');

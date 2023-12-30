import './assets/css/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';
import { clickOutside } from '@/directives/clickOutsideDirective';

const app = createApp(App);

app.directive('click-outside', clickOutside);

app.use(createPinia());
app.use(router);

app.mount('#app');

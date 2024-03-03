import './assets/css/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import { clickOutside } from '@/directives/clickOutsideDirective';
import App from './App.vue';

const app = createApp(App);

app.directive('click-outside', clickOutside);

app.use(createPinia());
app.use(router);

app.mount('#app');

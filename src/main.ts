import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiRefresh, FaMapMarkerAlt, FaRegularCircle, IoClose } from "oh-vue-icons/icons";

import App from './App.vue'
import router from './router'

addIcons(HiRefresh, FaMapMarkerAlt, FaRegularCircle, IoClose);

const app = createApp(App)

app.component("v-icon", OhVueIcon);

app.use(createPinia())
app.use(router)

app.mount('#app')

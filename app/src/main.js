import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import '@/assets/css/main.css'


window.app = createApp(App)
    .use(store)
    .mount('#app');
 
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
import './index.css'


const app = createApp(App);
app.component('BootstrapIcon', BootstrapIcon);
app.use(store).use(router).mount("#app");

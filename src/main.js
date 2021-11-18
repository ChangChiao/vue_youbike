import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueToast from "vue-toast-notification";
import "./index.css";
import "vue-toast-notification/dist/theme-sugar.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faPhone,
    faMapMarkerAlt,
    faSearch,
    faExchangeAlt,
    faRoute
} from "@fortawesome/free-solid-svg-icons";

library.add(faPhone);
library.add(faMapMarkerAlt);
library.add(faSearch);
library.add(faExchangeAlt);
library.add(faRoute);
// export const app = createApp(App);
const app = createApp(App);

// app.config.globalProperties.$app = app;

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store).use(router).use(VueToast).mount("#app");

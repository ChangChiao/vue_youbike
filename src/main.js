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
    faMapMarkerAlt,
    faSearch,
    faExchangeAlt,
    faRoute,
    faCrosshairs
} from "@fortawesome/free-solid-svg-icons";

library.add(faMapMarkerAlt);
library.add(faSearch);
library.add(faExchangeAlt);
library.add(faRoute);
library.add(faCrosshairs);
const app = createApp(App);

// app.config.globalProperties.$app = app;

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store).use(router).use(VueToast).mount("#app");

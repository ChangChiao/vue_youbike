import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueToast from "vue-toast-notification";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import "./index.css";
import "vue-toast-notification/dist/theme-sugar.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faPhone);
library.add(faMapMarkerAlt);

const app = createApp(App);
app.config.globalProperties.$app = app;

app.component("BootstrapIcon", BootstrapIcon).component(
    "font-awesome-icon",
    FontAwesomeIcon
);
app.use(store).use(router).use(VueToast).mount("#app");

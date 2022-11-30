import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { getToken } from "./utils/api";
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


const checkToken = async () => {
    if (
      new Date().getTime() / 1000 <=
          Number(localStorage.getItem('expireTime'))
    ) { return }
    const res = await getToken()
    if (res.access_token) {
      localStorage.setItem('token', res.access_token)
      localStorage.setItem(
        'expireTime',
        new Date().getTime() / 1000 + res.expires_in
      )
    }
  }

  checkToken()


const app = createApp(App);

// app.config.globalProperties.$app = app;

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store).use(router).use(VueToast).mount("#app");

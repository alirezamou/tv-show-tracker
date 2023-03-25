import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bulma/css/bulma.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSearch,
  faTimes,
  faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faTimes, faAngleDoubleLeft);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");

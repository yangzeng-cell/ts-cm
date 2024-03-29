import "./assets/css/index.less";
import "normalize.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { setupStore } from "./store";
const app = createApp(App);
app.use(store);
setupStore();
app.use(router);
app.mount("#app");

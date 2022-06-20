import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

window.addEventListener("hashchange", (e) => {
  console.log(e);
});

window.addEventListener("popstate", (e) => {
  console.log(e);
});

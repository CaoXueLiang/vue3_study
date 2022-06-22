import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element3 from "element3";
import "element3/lib/theme-chalk/index.css";
import NProgress from "nprogress";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Element3);
app.mount("#app");

// window.addEventListener("hashchange", (e) => {
//   console.log(e);
// });

// window.addEventListener("popstate", (e) => {
//   console.log(e);
// });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

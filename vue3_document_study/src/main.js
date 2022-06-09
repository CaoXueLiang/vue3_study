import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import MyComponent from "./views/components/MyComponent.vue";

const app = createApp(App);
app.component("MyComponent", MyComponent);
app.use(createPinia());
app.use(router);

app.mount("#app");

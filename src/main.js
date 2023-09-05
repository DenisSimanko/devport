import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { createPinia, PiniaVuePlugin } from "pinia";
import router from "./router/index.js";

Vue.use(PiniaVuePlugin);
Vue.use(VueRouter);

const pinia = createPinia();

// TODO: add i18n
// TODO: add vue-test-utils
new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");

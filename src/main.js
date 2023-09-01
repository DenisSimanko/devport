import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { createPinia, PiniaVuePlugin } from "pinia";
import router from "./router";

Vue.use(PiniaVuePlugin);
Vue.use(VueRouter);

const pinia = createPinia();

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");

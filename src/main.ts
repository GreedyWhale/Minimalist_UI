import Vue from "vue";
import App from "./App.vue";
import "./assets/scss/global.scss";
import toast from "@/plugin/toast.ts";

Vue.use(toast);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

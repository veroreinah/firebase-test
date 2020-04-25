import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import initFirebase from "./initFirebase";

Vue.config.productionTip = false;

initFirebase(() => {
  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
});

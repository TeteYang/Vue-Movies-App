import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
import store from "./store";
import './plugins/bootsrap';

Vue.config.productionTip = false;
Vue.use(Router);
const router = new Router({
  node: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "root",
      component: App,
    }
  ]
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

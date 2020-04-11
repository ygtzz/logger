import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import store from './vuex/store';
import './index.less';
import routes from './router.js';
import App from './app.vue';
import axios from 'axios';

Vue.use(VueRouter);

const router = new VueRouter({
    mode:'hash',
    routes:routes
});

sync(store, router);

new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App)
})

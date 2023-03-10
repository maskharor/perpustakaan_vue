import Vue from 'vue';
import App from './App.vue';
import router from './router';


// add bootstrap
// import { BootstrapVue, IconPlugin } from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/css/bootstrap-vue.css';
Vue.config.productionTip = false

Vue.component('navbar-component', require('./components/template/NavigationBar.vue').default);
Vue.component('sidebar-component', require('./components/template/AppSidebar.vue').default);

// vueAxios.use(BootstrapVue);
// vueAxios.use(IconPlugin);

new Vue({
  router,
  
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue';
import App from './App.vue';
import router from './router';

new Vue({
  el: '#app',
  router, // Agrega la instancia de router aquí
  render: h => h(App)
});

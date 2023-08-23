import Vue from 'vue';
import VueRouter from 'vue-router';

// Importa los componentes que usarás como páginas
import Home from './components/Home.vue';
import Select from './components/Select.vue';
import Questons from './components/Questions.vue';
import QDoctors from './components/QuestionsDoctor.vue';
import Info from './components/Info.vue';

// Instala el enrutador en Vue
Vue.use(VueRouter);

// Define las rutas de tu aplicación
const routes = [
  { path: '/', component: Home },
  { path: '/select', component: Select },
  { path: '/questions/:groupId', component: Questons },
  { path: '/qdoctor/', component: QDoctors },
  { path: '/info', component: Info },
];

// Crea una instancia de VueRouter
const router = new VueRouter({
    mode: 'history', // Cambia al modo de historial
    routes
  });

export default router;

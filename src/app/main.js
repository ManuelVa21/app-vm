import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

//Importar components
import App from './App.vue'
import Inicio from './components/Inicio.vue'
import Login from './components/Login.vue'
import Registrar from './components/Registrar.vue'
//Componentes Panel Usuario
import PanelUsuario from './components/PanelUsuario/PanelUsuario.vue'
import PerfilUsuario from './components/PanelUsuario/PerfilUsuario.vue'
import AlertasNotificaciones from './components/PanelUsuario/AlertasNotificaciones.vue'
import Instancias from './components/PanelUsuario/Instancias.vue'
import Peticiones from './components/PanelUsuario/Peticiones.vue'
//Componentes Panel Admin
import PanelAdmin from './components/PanelAdmin/PanelAdmin.vue'
import InfoUsuarios from './components/PanelAdmin/InfoUsuarios.vue'
import Solicitudes from './components/PanelAdmin/Solicitudes.vue'
import Recursos from './components/PanelAdmin/Recursos.vue'
import Alertas from './components/PanelAdmin/Alertas.vue'
import Sugerencias from './components/PanelAdmin/Sugerencias.vue'

Vue.config.productionTip = false

const routes = [
  {
    name: 'Inicio',
    path: '/',
    component: Inicio
  },
  {
    name: 'Login',
    path: '/Login',
    component: Login
  },
  {
    name: 'PanelUsuario',
    path: '/PanelUsuario',
    component: PanelUsuario
  },
  {
    name: 'Registrar',
    path: '/Registrar',
    component: Registrar
  },
  {
    name: 'PerfilUsuario',
    path: '/PerfilUsuario',
    component: PerfilUsuario
  },
  {
    name: 'AlertasNotificaciones',
    path: '/AlertasNotificaciones',
    component: AlertasNotificaciones
  },
  {
    name: 'Instancias',
    path: '/Instancias',
    component: Instancias
  },
  {
    name: 'Peticiones',
    path: '/Peticiones',
    component: Peticiones
  },
  {
    name: 'InfoUsuarios',
    path: '/InfoUsuarios',
    component: InfoUsuarios
  },
  {
    name: 'Solicitudes',
    path: '/Solicitudes',
    component: Solicitudes
  },
  {
    name: 'Recursos',
    path: '/Recursos',
    component: Recursos
  },
  {
    name: 'Alertas',
    path: '/Alertas',
    component: Alertas
  },
  {
    name: 'Sugerencias',
    path: '/Sugerencias',
    component: Sugerencias
  },
  {
    name: 'PanelAdmin',
    path: '/PanelAdmin',
    component: PanelAdmin
  }

];

const router = new VueRouter({ mode: 'history', routes: routes });
//new Vue(Vue.util.extend({router}, App)).$mount('#app');
new Vue({ render: h => h(App), router }).$mount('#app')


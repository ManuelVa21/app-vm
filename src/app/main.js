import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//Importar components
import App from './App.vue'
import Inicio from './components/Inicio.vue'
import Login from './components/Login.vue'
import Registrar from './components/Registrar.vue'
import Pruebas from './components/Pruebas.vue'
//Componentes Panel Usuario
import PanelUsuario from './components/PanelUsuario/PanelUsuario.vue'
import PerfilUsuario from './components/PanelUsuario/PerfilUsuario.vue'
import Notificaciones from './components/PanelUsuario/Notificaciones.vue'
import AlertasUsuario from './components/PanelUsuario/AlertasUsuario.vue'
import MiProyecto from './components/PanelUsuario/MiProyecto.vue'
import SolicitudesUsuario from './components/PanelUsuario/SolicitudesUsuario.vue'
//Componentes Panel Admin
import PanelAdmin from './components/PanelAdmin/PanelAdmin.vue'
import InfoUsuarios from './components/PanelAdmin/InfoUsuarios.vue'
import Solicitudes from './components/PanelAdmin/Solicitudes.vue'
import Recursos from './components/PanelAdmin/Recursos.vue'
import Alertas from './components/PanelAdmin/Alertas.vue'
import Sugerencias from './components/PanelAdmin/Sugerencias.vue'

Vue.config.productionTip = false

const routes = [
  { name: 'Pruebas', path: '/Pruebas', component: Pruebas },
  { name: 'Inicio', path: '/', component: Inicio },
  { name: 'Login', path: '/Login', component: Login },
  { name: 'PanelUsuario', path: '/PanelUsuario', component: PanelUsuario },
  { name: 'Registrar', path: '/Registrar', component: Registrar },
  { name: 'PanelUsuario/PerfilUsuario', path: '/PanelUsuario/PerfilUsuario', component: PerfilUsuario },
  { name: 'PanelUsuario/Notificaciones', path: '/PanelUsuario/Notificaciones', component: Notificaciones },
  { name: 'PanelUsuario/AlertasUsuario', path: '/PanelUsuario/AlertasUsuario', component: AlertasUsuario },
  { name: 'PanelUsuario/MiProyecto', path: '/PanelUsuario/MiProyecto', component: MiProyecto },
  { name: 'PanelUsuario/SolicitudesUsuario', path: '/PanelUsuario/SolicitudesUsuario', component: SolicitudesUsuario },
  { name: 'PanelAdmin/InfoUsuarios', path: '/PanelAdmin/InfoUsuarios', component: InfoUsuarios },
  { name: 'PanelAdmin/Solicitudes', path: '/PanelAdmin/Solicitudes', component: Solicitudes },
  { name: 'PanelAdmin/Recursos', path: '/PanelAdmin/Recursos', component: Recursos },
  { name: 'PanelAdmin/Alertas', path: '/PanelAdmin/Alertas', component: Alertas },
  { name: 'PanelAdmin/Sugerencias', path: '/PanelAdmin/Sugerencias', component: Sugerencias },
  { name: 'PanelAdmin', path: '/PanelAdmin', component: PanelAdmin },
  { path: '*', redirectTo: 'Inicio' }

];

//const router = new VueRouter({ mode: 'history', routes: routes });
const router = new VueRouter({ routes: routes });
new Vue({ render: h => h(App), router }).$mount('#app')


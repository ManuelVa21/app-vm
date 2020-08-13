import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//Importar components
//Importar components
import App from './App.vue'
import VueComp from '@vue/composition-api';
Vue.use(VueComp);
import VueToastr from 'vue-toastr';
Vue.use(VueToastr,{
  defaultTimeout: 2500,
  defaultPosition: "toast-top-center"
  //clickClose: true
});

import Inicio from './components/Inicio.vue'
import Login from './components/Login.vue'
import Registrar from './components/Registrar.vue'
import Pruebas from './components/Pruebas.vue'
//Componentes Panel Usuario
import PanelUsuario from './components/PanelUsuario/PanelUsuario.vue'
import PerfilUsuario from './components/PanelUsuario/PerfilUsuario.vue'
import NotificacionesUsuario from './components/PanelUsuario/Notificaciones.vue'
import AlertasUsuario from './components/PanelUsuario/AlertasUsuario.vue'
import MiProyecto from './components/PanelUsuario/MiProyecto.vue'
import SolicitudesUsuario from './components/PanelUsuario/SolicitudesUsuario.vue'
//Componentes Panel Admin
import PanelAdmin from './components/PanelAdmin/PanelAdmin.vue'
import InfoUsuarios from './components/PanelAdmin/InfoUsuarios.vue'
import Solicitudes from './components/PanelAdmin/Solicitudes/Solicitudes.vue'
  import PoolRecursos from './components/PanelAdmin/Solicitudes/PoolRecursos.vue'
  import AumentoPool from './components/PanelAdmin/Solicitudes/AumentoPool.vue'
  import Backup from './components/PanelAdmin/Solicitudes/Backup.vue'
import Recursos from './components/PanelAdmin/Recursos/Recursos.vue'
  import Estadisticas from './components/PanelAdmin/Recursos/Estadisticas.vue'
  import MaquinasVirtuales from './components/PanelAdmin/Recursos/MaquinasVirtuales.vue'
  import Proyectos from './components/PanelAdmin/Recursos/Proyectos.vue'
  import RecursosTelco from './components/PanelAdmin/Recursos/RecursosTelco.vue'
import AlertasYNot from './components/PanelAdmin/Alertas/AlertasYNot.vue'
  import Alertas from './components/PanelAdmin/Alertas/Alertas.vue'
  import Notificaciones from './components/PanelAdmin/Alertas/Notificaciones.vue'
import Sugerencias from './components/PanelAdmin/Sugerencias.vue'


Vue.config.productionTip = false

const routes = [
  { name: 'Pruebas', path: '/Pruebas', component: Pruebas },
  { name: 'Inicio', path: '/', component: Inicio },
  { name: 'Login', path: '/Login', component: Login },
  { name: 'PanelUsuario', path: '/PanelUsuario', component: PanelUsuario },
  { name: 'Registrar', path: '/Registrar', component: Registrar },
  { name: 'PanelUsuario/NotificacionesUsuario', path: '/PanelUsuario/Notificaciones', component: NotificacionesUsuario },
  { name: 'PanelUsuario/AlertasUsuario', path: '/PanelUsuario/AlertasUsuario', component: AlertasUsuario },
  { name: 'PanelUsuario/MiProyecto', path: '/PanelUsuario/MiProyecto', component: MiProyecto },
  { name: 'PanelUsuario/SolicitudesUsuario', path: '/PanelUsuario/SolicitudesUsuario', component: SolicitudesUsuario },
  { name: 'PanelAdmin/InfoUsuarios', path: '/PanelAdmin/InfoUsuarios', component: InfoUsuarios },
  { name: 'PanelAdmin/Solicitudes', path: '/PanelAdmin/Solicitudes', component: Solicitudes },
    { name: 'PanelAdmin/Solicitudes/PoolRecursos', path: '/PanelAdmin/Solicitudes/PoolRecursos', component: PoolRecursos },
    { name: 'PanelAdmin/Solicitudes/AumentoPool', path: '/PanelAdmin/Solicitudes/AumentoPool', component: AumentoPool },
    { name: 'PanelAdmin/Solicitudes/Backup', path: '/PanelAdmin/Solicitudes/Backup', component: Backup },
  { name: 'PanelAdmin/Recursos', path: '/PanelAdmin/Recursos', component: Recursos },
    { name: 'PanelAdmin/Recursos/Estadisticas', path: '/PanelAdmin/Recursos/Estadisticas', component: Estadisticas },
    { name: 'PanelAdmin/Recursos/MaquinasVirtuales', path: '/PanelAdmin/Recursos/MaquinasVirtuales', component: MaquinasVirtuales },
    { name: 'PanelAdmin/Recursos/Proyectos', path: '/PanelAdmin/Recursos/Proyectos', component: Proyectos },
    { name: 'PanelAdmin/Recursos/RecursosTelco', path: '/PanelAdmin/Recursos/RecursosTelco', component: RecursosTelco },
  { name: 'PanelAdmin/AlertasYNot', path: '/PanelAdmin/AlertasYNot', component: AlertasYNot },
    { name: 'PanelAdmin/AlertasYNot/Alertas', path: '/PanelAdmin/AlertasYNot/Alertas', component: Alertas },
    { name: 'PanelAdmin/AlertasYNot/Notificaciones', path: '/PanelAdmin/AlertasYNot/Notificaciones', component: Notificaciones },
  { name: 'PanelAdmin/Sugerencias', path: '/PanelAdmin/Sugerencias', component: Sugerencias },
  { name: 'PanelAdmin', path: '/PanelAdmin', component: PanelAdmin },
  { path: '*', redirectTo: 'Inicio' }

];

//const router = new VueRouter({ mode: 'history', routes: routes });
const router = new VueRouter({ routes: routes });
new Vue({ render: h => h(App), router }).$mount('#app')


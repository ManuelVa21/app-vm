<!--  --> 
<template lang='html'>
    <div id="app">
      <navbar></navbar>
         
      

      <router-view />
    </div>
</template>

<!-- Codigo de javascript que lleva la logica --> 
<script>
import Navbar from './components/Navbar.vue';

//import  inicio  from './components/inicio.vue';
//import  Login  from './components/Login.vue';
//import  perfilUsuario  from './components/perfilUsuarios.vue';

export default {
  name: 'App',
  components: {
    'Navbar': Navbar  
  }
}
</script>

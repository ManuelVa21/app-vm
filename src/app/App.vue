<!--  --> 
<template lang='html'>
  <div id="app">
    <div class="section fixed-top">
      <navbar></navbar>
    </div>
    <div class="section" role="main" style="margin-top: 75px">
      <router-view/>
    </div>
    
    <div class="section bg-dark text-white static-bottom">
      <Footer></Footer> 
    </div>
  </div>
</template>

<!-- Codigo de javascript que lleva la logica --> 
<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    'Navbar' : Navbar,
    'Footer' : Footer  
  }
}
</script>

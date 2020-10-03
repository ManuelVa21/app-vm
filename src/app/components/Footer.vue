<template>
    <div class="container">
        <div class="row">
            <div class="col m-lg-4">
                <div class="row"><h5>Plataforma Telco 2.0</h5></div>
                <div class="row"><p>Este es el servicio de máquinas virtuales de la Plataforma Telco 2.0. Solicita y administra tus recursos.</p></div>
            </div>
            <div class="col m-lg-4">
                <div class="col m-2">
                    <div class="row"><h5>Contáctanos</h5></div>
                    <div class="row"><p>Visitanos en redes sociales <a href="#"> facebook</a> <a href="#">Twitter</a> o envianos un correo <a href="#">contacto</a>. Nuestro personal siempre esta dispuesto a ayudar.</p></div>
                </div>
            </div>
            <div class="col bg-danger p-lg-4 ">
                <div class="row ">
                    <div class="mx-auto d-flex align-items-center">
                            <i class="fa fa-user fa-3x"></i>
                            <h3 class="align-self-end">   Contacto</h3>
                    </div>  
                </div>
                <hr>
                <div class="row d-flex align-items-center">
                    <div class="col-4"><i class="fa fa-envelope fa-2x"></i></div>
                    <div class="col-8"><span>telco@unicauca.edu.co</span></div>
                       
                </div>
                <div class="row d-flex align-items-center">
                        <div class="col-4"><i class="fa fa-map-marker fa-2x"></i></div>
                        <div class="col-8"><span>Sala 324 FIET</span></div>
                             
                </div>
                <div class="row d-flex align-items-center">
                        <div class="col-4"><i class="fa fa-user fa-2x"></i></div>
                        <div class="col-8"><span>Director: PhD. Oscar Maurico Caicedo</span></div>
                       
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import VueRouter from 'vue-router'
export default {
    data () {
    return {
      auth: '',
      user: ''
    }
  },methods: {
    
  },

  mounted () {
    
  }
    
}
</script>
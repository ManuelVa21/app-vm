<!-- -->
<!-- Sidebar Usuario -->
<template>
    <div>
        <div class="d-flex" id="wrapper">
          <!-- Sidebar -->
          <div class="bg-light border-right" id="sidebar-wrapper">
            <!-- <img src="..." alt="..." class="rounded-circle"> -->
            <div class="sidebar-heading text-center text-primary">Telco 2.0 </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/PerfilUsuario">Perfil Usuario</router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/Instancias">Instancias</router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/AlertasNotificaciones">Alertas y Notificaciones</router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/Peticiones">Peticiones</router-link></li>
            </ul>
          </div>
      </div>
    </div>
</template>

<script>
import VueRouter from 'vue-router'

export default {
    
}
</script>
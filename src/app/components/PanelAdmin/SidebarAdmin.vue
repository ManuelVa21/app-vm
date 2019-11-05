<!-- -->
<!-- Sidebar Admin -->
<template>
    <div>
        <div class="d-flex" id="wrapper">
          <!-- Sidebar -->
          <div class="bg-light border-right" id="sidebar-wrapper">
            <!-- <img src="..." alt="..." class="rounded-circle"> -->
            <div class="sidebar-heading text-center text-primary">Admin Telco 2.0</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/InfoUsuarios">InfoUsuarios</router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/Solicitudes">Solicitudes</router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/Recursos">Recursos</router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/Alertas">Alertas</router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/Sugerencias">Sugerencias</router-link></li>
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
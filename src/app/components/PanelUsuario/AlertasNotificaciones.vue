<template>
    <div>
        <div>
            <section class="header">
                <h1 class="page-title">Alertas y Notificaciones</h1>
            </section>
        </div>
        <section>
            <div class="row">
                <div class="col-sm-2 col-with-right-dorder">
                    <SidebarUsuario></SidebarUsuario> 
                </div>
                <div class="col-sm-8">
                    <p>El contenido de las alertas y notificaciones va aqui</p>
                </div>
            </div> 
        </section>
    </div>
</template>

<script>
import VueRouter from 'vue-router'
import SidebarUsuario from './SidebarUsuario.vue'

export default {
    components:{
        'SidebarUsuario': SidebarUsuario  
    }
}
</script>
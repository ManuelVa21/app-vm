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
                    <Sidebar></Sidebar> 
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
import Sidebar from '../Sidebar.vue'

export default {
    components:{
        'Sidebar': Sidebar  
    }
}
</script>
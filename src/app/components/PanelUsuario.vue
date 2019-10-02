<template>
    <div>
        <div>
            <section class="header">
                <h1 class="page-title">Panel Usuario</h1>
            </section>
        </div>
        <section class="content">
            <div class="row">
                <div class="col-sm-2 col-with-right-dorder">
                    <SidebarUsuario></SidebarUsuario>
                </div>
                <div class="col-sm-8">
                    <h3>Completar front</h3>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarUsuario from './PanelUsuario/SidebarUsuario.vue'


export default{
    components:{
        'SidebarUsuario': SidebarUsuario  
    }
    /*data(){

    },
    created(){
        this.getUsuarios();
    },
    methods:{
        getUsuarios(){
            axios.get('/usuarios/usuarios')
            .then( res => {console.log(res)} )
            .catch(err => { console.log(err)} );
            console.log(res)
        }
    }*/
}
</script>
    <!--   -->


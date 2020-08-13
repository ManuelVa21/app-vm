<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-2 col-with-right-border">
                    <SidebarUsuario></SidebarUsuario>
                </div>
                <div class="col-10">
                    <div>
                        <InfoGen></InfoGen>
                    </div>
                    <div class="panel panel-info">
                        <div class="panel-heading">Información general</div>
                        <div class="panel-body">Aqui va la Información General de la Plataforma Telco 2.0. Esta información es de utilidad para el usuarios</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarUsuario from './SidebarUsuario.vue'
import InfoGen from '../InfoGen.vue'


export default{
    components:{
        'SidebarUsuario': SidebarUsuario,
        'InfoGen':  InfoGen
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


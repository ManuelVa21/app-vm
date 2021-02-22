<template>
    <div class="content">        
        <div class="row">
                
            <div class="col-2 col-with-right-border">
                <SidebarAdmin style="position: sticky; top: 75px"></SidebarAdmin>
            </div>
                
            <div class="col-10">
                    
            <div style=" float: right;">
                <span>/</span>
                <strong class="final-path">Panel Admin</strong>
                <span>/</span>
            </div> <br>
                    
                <div>
                        <InfoGen></InfoGen>
                </div>
                    
                <div class="panel panel-info">
                    <div class="panel-heading">Información general</div>
                    <div class="panel-body">Aqui va la Información General de la Plataforma Telco 2.0. Esta información es de utilidad para el usuarios</div>
                </div>
                
            </div>
        </div>
        
    </div>
</template>

<script>

import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarAdmin from './SidebarAdmin.vue'
import InfoGen from '../InfoGen.vue'


export default{
    components:{
        'SidebarAdmin': SidebarAdmin,
        'InfoGen':  InfoGen
    }
}
</script>
    <!--   -->


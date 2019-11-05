<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-sm-2 col-with-right-border">
                    <SidebarAdmin></SidebarAdmin>
                </div>
                <div class="col-sm-8">
                    <div class="panel panel-info">
                        <div class="panel-heading">Sugerencias</div>                        
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarAdmin from './SidebarAdmin.vue'

export default{
    components:{
        'SidebarAdmin': SidebarAdmin
    }
}
</script>
    <!--   -->

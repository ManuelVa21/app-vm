<template>
    <div class="content">
    <div class="row">

    <div class="col-2">
        <SidebarUsuario style="position: sticky; top: 75px"></SidebarUsuario> 
    </div>
        
    <div class="col-10 ">
            
    <div style=" float: right; margin-right: 1em">
        <span>/</span>
        <router-link to="/PanelUsuario">Mi Proyecto</router-link>
        <span>/</span>
        <strong class="final-path">Sugerencias</strong>
        <span>/</span>
    </div><br>


    <div class="container">
        <form @submit.prevent="enviarSugerencia()">
            
            <div class="form-group ">
                <h4>Ingrese la descripción de la sugerencia.</h4><br>
                <textarea v-model="sugerencia.descripcion" cols="50" rows="4" placeholder="Sugerencia."></textarea><br><br>
               
                <button type="submit" class="btn btn-success">Enviar</button>
                <button @click="limpiarSugerencia()" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                
            </div>
            
        </form>
    </div><br>
            
        
    </div>
    </div> 
    </div>
</template>

<script>
import VueRouter from 'vue-router'
import VueyeTable from 'vueye-table'
import VueToastr from 'vue-toastr'
import axios from 'axios'
import SidebarUsuario from './SidebarUsuario.vue'
const configG = require('../../../config')

export default {
    data(){
        return{
            notificaciones: [],  
            storage:[],
            sugerencia:[]
        }
    },
    async created(){
        await this.getStorage();
    },
    components:{
        'SidebarUsuario': SidebarUsuario,
        VueyeTable  
    },
    methods:{
        getStorage: async function(){    
            try {
                if (localStorage.getItem) {
                    this.storage = JSON.parse(localStorage.getItem('userInfo'))
                    //console.log('se muestra el storage ', this.storage)
                    //this.getNotificaciones(this.storage.email)
                }
            } catch(e) {
               this.storage = {};
            }
        },
        enviarSugerencia: async function(){
            let data={
                
                usuario: this.storage.name,
                correo: this.storage.email,
                descripcion: this.sugerencia.descripcion,                
            }
            
            await axios.post('/api/sugerencias',data)
                .then(res => {
                    this.$toastr.s("Sugerencia enviada")
                    this.limpiarSugerencia()  
                })
                .catch(error => {
                    this.$toastr.e("Error al enviar la sugerencia")
                })
        },
        limpiarSugerencia: async function(){
            this.sugerencia.descripcion = ""
        }        
    }
}
</script>
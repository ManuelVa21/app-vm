<template>
    <div class="content">
    <div class="row">
        <div class="col-2">
            <SidebarUsuario style="position: sticky; top: 75px"></SidebarUsuario> 
        </div>
        
        <div class="col-10 pl-0">
            
        <div style=" float: right; margin-right: 1em">
            <span>/</span>
            <router-link to="/PanelUsuario">Mi Proyecto</router-link>
            <span>/</span>
            <strong class="final-path">Sugerencias</strong>
            <span>/</span>
        </div><br>


        <div class="container ml-5">

            <form @submit.prevent="enviarSugerencia()">
                <div class="form-group">
                    <h4>Ingrese la descripción de la sugerencia.</h4>
                    <textarea v-model="sugerencia.descripcion" cols="50" rows="4" placeholder="Sugerencia."></textarea><br>
                        <button type="submit" class="btn btn-success">Enviar</button>
                        <button @click="limpiarSugerencia()" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    </div>
            </form>
        </div><br>
            
        <!--    <div class="table-responsive">
            <VueyeTable 
            :data="notificaciones" 
            :columns="columns" 
            title="Notificaciones de Usuario"
            filter-by="estado">


                <template v-slot:estado="{item}">
                    <template v-if="item.estado == 'Sin Atender'">  
                        <td class="bg-danger font-weight-bold text-white">Sin Atender</td>
                          
                    </template>
                    <template v-else>
                         <td class="bg-success font-weight-bold text-white">Atendido</td> 
                     </template>                                                                
                 </template> 

                <template v-slot:_id="{item}"> 
                    <template v-if="item.estado == 'Sin Atender'">  
                        <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                            <button v-on:click="atenderNotificacion(item._id)" type="button" class="btn btn-success ml-3" data-toggle="tooltip" data-placement="top" title="Aceptar"><i class="fas fa-check"></i></button>                                            
                        </div>
                    </template>
                    <template v-else>
                        <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                            <button v-on:click="eliminarNotificacion(item._id)" type="button" class="btn btn-danger ml-3" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                           
                        </div>
                    </template>
                </template>  
            </VueyeTable>  
            </div> -->

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
            columns:[
                {key: "fecha", label: "Fecha", display: true},
                {key: "descripcion", label: "Descripcion", display: true, sortable: true},
                {key: "estado", label: "Estado", display: true},                
                {key: "_id", label: "Acciones", display: true},
            ],
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
                    console.log('se muestra el storage ', this.storage)
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
        /*getNotificaciones: async function(email){
            //console.log('Se ingresa a getnotificaciones y se muestra el email '+email)
            await axios.get('/api/alertas_notificaciones?correo_usuario='+email+'&tipo=Notificación')
            .then(res => {
                //console.log('Se muestra respuesta get ',res.data.content)
                this.notificaciones = res.data.content;                   
            })
            .catch(error => {this.$toastr.e("Error al obtener las notificaciones: " + error ) });
        },*/
        
    }
}
</script>
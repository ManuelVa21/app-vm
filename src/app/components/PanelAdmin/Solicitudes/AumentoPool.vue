<template>
  <div class="content">
    <div class="row">
      <div class="col-2">
        <SidebarAdmin></SidebarAdmin>
      </div>
        
        <div class="col-10" style="padding-left: 0;">
            
            <div class="btn-group btn-group-lg" style="display: flex; align-items: center;">   
              <button @click="$router.push('/PanelAdmin/Solicitudes/PoolRecursos')" class="btn btn-outline-info ">Solicitudes de recursos</button>
              <button @click="$router.push('/PanelAdmin/Solicitudes/Backup')" class="btn btn-outline-info">Backup</button>
            </div>
           
            <div class="table-responsive">     
              <VueyeTable 
                :data="solicitudes" 
                :columns="columns" 
                title="Solicitudes de aumento de recursos"                           
                filter-by="estado">   
    <!-- Ver Estado de solicitud -->
                <template v-slot:estado="{item}">
                    <template v-if="item.estado == 'true'">                                        
                      <td class="bg-success text-white"><b>Resuelto</b></td>                                        
                    </template>
                    <template v-else>
                      <td class="bg-danger text-white"><b> Pendiente </b></td>
                    </template>                                                                        
                </template>

    <!-- Ver recursos solicitados -->               
                <template v-slot:_id="{item}">                                                                                                                                 
                    <button v-on:click="getUnaSolicitud(item._id)" class="btn-sm btn-primary" data-toggle="modal" data-target="#modalRecursos" data-placement="top" title="Ver y aceptar recursos"><i class="far fa-eye"></i></button>                                            
                                                                   
                    <div class="modal fade" id="modalRecursos" tabindex="-1" role="dialog" aria-labelledby="ModalRecursosLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-white bg-primary"> 
                            <h5 class="modal-title modal-dark" id="modalID"><b>Información de la solicitud</b></h5>
                            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>                                        
                        </div>
                        <div class="modal-body">
                          <div class="container">
                            <div class="row">
                                <div class="col"> 
                                <div style="text-align: center"> <b>Antiguos recursos</b></div>
                                <hr> 
                                    <label><b> Fecha Finalización: </b></label>
                                    <label>{{PoolEditar.fecha_fin}}</label><br>
                                    <label><b> # VM's: </b></label>
                                    <label>{{PoolEditar.numero_vm}}</label><br> 
                                    <label><b> RAM: </b></label>
                                    <label>{{PoolEditar.ram}} Gb</label><br>
                                    <label><b># VCPU: </b></label>
                                    <label>{{PoolEditar.cpu}}</label><br>
                                    <label><b> Almacenamiento: </b></label>
                                    <label>{{PoolEditar.disco_duro}} Gb</label><br>                                            
                                </div>  
                                           
                                <div class="col">
                                <div style="text-align: center"> <b>Nuevos recursos</b></div>
                                <hr>  
                                    <label><b> Fecha Finalización: </b></label>
                                    <label>{{solicitud.fecha_fin}}</label><br>
                                    <label><b> # VM's: </b></label>
                                    <label>{{solicitud.numvm}}</label><br> 
                                    <label><b> RAM: </b></label>
                                    <label>{{solicitud.ram}} Gb</label><br>
                                    <label><b># VCPU: </b></label>
                                    <label>{{solicitud.cpu}}</label><br>
                                    <label><b> Almacenamiento: </b></label>
                                    <label>{{solicitud.disco_duro}} Gb</label><br>
                                </div>
                            </div>                                             
                          </div>                                         
                        </div>
                        <div class="modal-footer">

                            <template v-if="solicitud.estado == 'true'">  
                                <button type="button" class="btn btn-success" data-dismiss="modal" aria-label="Close">
                                 Solicitud Aceptada
                                </button>  
                            </template>
                            <template v-else>
                                <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                <button v-on:click="confirmarSolicitud(solicitud._id)" type="button" class="btn btn-success" data-dismiss="modal" aria-label="Close"><b>Aceptar solicitud </b></button>
                                <button v-on:click="confirmarNegar(solicitud._id)" type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close"> <b>Negar solicitud </b></button>                                            
                                </div>
                            </template> 

                        </div>                                  
                    </div>
                   </div>
                  </div>                                                                                                       
                </template>                              
        <!-- Acciones -->                                       
                <template v-slot:acciones="{item}"> 

                  <template v-if="item.estado == 'true'">  
                    <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                        <button  type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Aceptar" disabled><i class="fas fa-check"></i></button>
                        <button  type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Rechazar" disabled><i class="fas fa-times"></i></button>                                            
                    </div>
                  </template>
                  <template v-else>
                        <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                        <button v-on:click="confirmarSolicitud(item._id)" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Aceptar"><i class="fas fa-check"></i></button>
                        <button v-on:click="confirmarNegar(item._id)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Rechazar"><i class="fas fa-times"></i></button>                                            
                        </div>
                  </template>
                </template>       
              </VueyeTable>
              
            </div> 
       
        </div>
    </div>
  </div>  
</template>


<script>
import VueRouter from 'vue-router'
import axios from 'axios'
import VueComp from '@vue/composition-api'
import SidebarAdmin from '../SidebarAdmin.vue'
import VueyeTable from 'vueye-table'

import Token from '!!raw-loader!../../PanelAdmin/Token.txt'
const configG = require('../../../../config')



export default {
    
    components:{        
        VueyeTable,
        SidebarAdmin
    },

    data(){
        return{
            solicitudes:[],
            solicitud:[],
            PoolEditar:[],
            columns:[              
                {key: "usuario", label: "Usuario", display: true, sortable: true},
                {key: "correo", label: "Correo usuario", display: true},
                {key: "nombre_proyecto", label: "Proyecto", display: true},                
                {key: "tutor", label: "Director", display: true},
                {key: "correo_tutor", label: "Correo director", display: true},
                //{key: "numvm", label: "# VM's", display: true},                             
                {key: "estado", label: "Estado", display: true, sortable: true},
                {key: "_id", label: "Recursos", display: true},
                {key: "acciones", label: "Acciones", display: true},
                //{key: "fecha", label: "fecha", display: true}                               
            ]
        }


    },
    created(){
        this.getSolicitudes('Pool de Recursos');
    },
   
    methods:{
        getSolicitudes: async function(tipo){
            //console.log('Se ingresa a getSolicitudesPool')
            await axios.get('/api/solicitudes?tipo='+tipo)            
            .then(res => {
                //console.log('Se muestra respuesta get')
                //console.log(res.data.content);
                this.solicitudes = res.data.content;                
                console.log(this.solicitudes);
            })            
            .catch(error => { console.log('Error en get solicitudes',error); });
        },
        getUnaSolicitud: async function(id){
            //console.log('Se ingresa a get una solicitud' + id)
            await axios.get('/api/solicitudes/unasolicitud?_id='+id)            
            .then(res => {
                //console.log('Se muestra respuesta get')
                //console.log(res.data.content);
                this.solicitud = res.data.content;   
                this.getPool(this.solicitud.correo); 
                //console.log(this.solicitud);
            })            
            .catch(error => { console.log('Error en get solicitudes',error); });
        },
        getPool: async function(correoUsuario){
            console.log('Se muestra el info en getpool ',correoUsuario)
            await axios.get('/api/pool_recursos/unpool?emailPropietario='+correoUsuario)
            .then(res => {
            if (res.data.status == '404' || res.data.status == '400') {
                console.log('Error al obtener pool de OpenStack')                    
            }
            else{
                this.PoolEditar = res.data.content;              
            }                    
            })
            .catch(error => { 
                console.log('Error en getPool',error);                    
            });          
        }, 

        confirmarSolicitud: async function (idSolicitud){            
            await this.getUnaSolicitud(idSolicitud);
            //console.log(this.solicitud)
            var respuesta = confirm ('¿Estás seguro de aceptar esta solicitud?');
            if (respuesta == true)
            {
                this.setQuota(this.PoolEditar.id_openstack)
                this.aceptarAumento(this.PoolEditar._id)
                this.cambiarEstado(this.solicitud._id)                
                this.getSolicitudes(this.solicitud.tipo)               
            }
            else{
                console.log("canceló")
                //this.getUsuarios();
            }
        },
        confirmarNegar: async function (idSolicitud){
            await this.getUnaSolicitud(idSolicitud)
            var respuesta = confirm ('¿Estás seguro de negar esta solicitud?');
            if (respuesta == true)
            {
                console.log("negó la solicitud aquí enviar el motivo al usuario")
                this.negarSolicitud(this.solicitud._id, this.solicitud.tipo)               
            }
            else{
                console.log("canceló")
                //this.getUsuarios();
            }            
        },
        negarSolicitud: async function(id,tipo){
            console.log('Se ingresa a negarPool')
            this.cambiarEstado(id)
            this.getSolicitudes(tipo)
            
        },
        setQuota: async function(id_project){
            //Se recibe el id y la información de la quota se toma de solicitud []
            let data={
                "quota_set":{
                    "instances": this.solicitud.numvm, 
                    "ram": (this.solicitud.ram*1024), 
                    "cores": this.solicitud.cpu
                }
            };
            await axios.put('http://'+configG.ipOpenstack+'/compute/v2.1/os-quota-sets/'+id_project,data,this.configOS)
            .then(res => {
                console.log('Se muestra la respuesta del set quota')
                console.log(res)
            })
            .catch(error => { console.log('Error en set quota',error); });
        },
        aceptarAumento: async function(idPool){
            console.log('Se ingresa a aceptarAumento y se muestra el ID ', idPool)
        //Actualizar pool nuevos recursos
            await axios.put('/api/pool_recursos/',{
                _id: idPool,
                numero_vm: this.solicitud.numvm,
                disco_duro: this.solicitud.disco_duro,
                ram: this.solicitud.ram,
                cpu: this.solicitud.cpu,
                fecha_fin: this.solicitud.fecha_fin
            },
            this.config)
                .then(res => { 
                    console.log('Respuesta del put ',res)
                })
                .catch(error => { console.log('Error en aceptarAumento',error); });
        },
        cambiarEstado: async function(id){
            console.log('Se va a cambiar el estado de la solicitud')
            await axios.put('/api/solicitudes/'+id,{estado: 'Resuelto' }, this.config)
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error en cambiar estado',error); });
        }
    }    
}
</script>
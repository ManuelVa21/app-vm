<template>
  <div class="content">
    <div class="row">
      <div class="col-2">
        <SidebarAdmin></SidebarAdmin>
      </div>
        
        <div class="col-10" style="padding-left: 0;">
            
        <div style=" float: right;">
            <span>/</span>
            <router-link to="/PanelAdmin">Panel Admin</router-link>
            <span>/</span>
            <router-link to="/PanelAdmin/Solicitudes">Solicitudes</router-link>
            <span>/</span>
            <strong class="final-path">Pool Recursos</strong>
            <span>/</span>
        </div>
            <!-- <div class="btn-group btn-group-lg" style="display: flex; align-items: center;">   
              <button @click="$router.push('/PanelAdmin/Solicitudes/PoolRecursos')" class="btn btn-outline-info ">Solicitudes de recursos</button>
              <button @click="$router.push('/PanelAdmin/Solicitudes/Backup')" class="btn btn-outline-info">Backup</button>
            </div> -->
           
            <div class="table-responsive">     
              <VueyeTable 
                :data="solicitudes" 
                :columns="columns" 
                title="Solicitudes de aumento de recursos"                           
                filter-by="estado">   
    <!-- Ver Estado de solicitud -->
           <template v-slot:estado="{item}">
                <template v-if="item.estado == 'Aceptada'">                                        
                    <div class="pl-2">
                    <td class="bg-success text-white"><b>Aceptada</b></td>   
                    </div>                                     
               </template>
               <template v-else-if="item.estado == 'Sin Atender'">
                    <td class="bg-danger text-white"><b> Sin Atender </b></td>
                </template>
                <template v-else>
                    <div class="pl-1">
                    <td style="background-color: #ff9800 ; color: white"><b> Rechazada </b></td>
                    </div>
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

                            <template v-if="solicitud.estado == 'Aceptada'">  
                               <button class="btn btn-success" data-dismiss="modal" aria-label="Close">
                                <b>Solicitud Aceptada</b>
                               </button>
                            </template>

                            <template v-else-if="solicitud.estado == 'Rechazada'">  
                               <button style="background-color: #ff9800 ; color: white" class="btn" data-dismiss="modal" aria-label="Close">
                                <b>Solicitud Rechazada</b>
                               </button>
                            </template>
                            
                            <template v-else>
                                <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                <button v-on:click="confirmarSolicitud(solicitud._id)" type="button" class="btn btn-success" data-dismiss="modal" aria-label="Close"><b>Aceptar solicitud </b></button>
                                 <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#ModalCancelarSolicitud" data-dismiss="modal"> <b>Rechazar solicitud </b></button>                                            
                                </div>
                            </template> 

                        </div>                                  
                    </div>
                   </div>
                  </div>                                                                                                       
                </template>                              
<!-- Acciones -->                                       
                <template v-slot:acciones="{item}"> 

                  <template v-if="item.estado == 'Aceptada'">  
                    <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                        <button  type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Aceptar" disabled><i class="fas fa-check"></i></button>
                        <button  type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Rechazar" disabled><i class="fas fa-times"></i></button>                                            
                    </div>
                  </template>

                  <template v-else-if="item.estado == 'Rechazada'" style="text-align: center">  
                         <div class="pl-3">                                                                                                                                     
                            <button v-on:click="getUnaSolicitud(item._id)" type="button" class="btn-sm btn-info" data-toggle="modal" data-target="#ModalMotivoRechazo" data-placement="top" title="Motivo rechazo"><i class="fas fa-question-circle"></i></button>                                            
                         </div>
                  </template>

                  <template v-else>
                        <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                        <button v-on:click="confirmarSolicitud(item._id)" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Aceptar"><i class="fas fa-check"></i></button>
                        <button v-on:click="getUnaSolicitud(item._id)" type="button" class="btn btn-danger" data-toggle="modal" data-target="#ModalCancelarSolicitud" data-placement="top" title="Rechazar"><i class="fas fa-times"></i></button>                                            
                         </div>
                  </template>
                </template>       
              </VueyeTable>              
            </div>
<!--MODAL cancelar solicitud  -->  
            <div class="modal fade" id="ModalCancelarSolicitud" tabindex="-1" role="dialog" aria-labelledby="ModalCancelarSolicitud" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header text-white bg-primary">
                        <h5 class="modal-title" id="ModalCancelarSolicitud"><b>Enviar motivo del rechazo</b></h5>
                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span> </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group text-left">
                            <label class="control-label" for="UsuarioDes">Usuario Destino: {{solicitud.usuario}}</label>
                        </div>
                        <div class="form-group text-left">
                            <label class="control-label" for="CorreoDes">Correo: {{solicitud.correo}}</label>
                        </div>
                        <div class="form-group text-left required">
                            <label class="control-label" for="DescripcionNoti">Motivo: </label>
                                <textarea v-model="solicitud.motivo" id="MotivoCancelacion" rows="4" cols="40" class="form-control" placeholder="Ingrese el motivo por el cuál se rechaza la solicitud"></textarea>   
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button v-on:click="negarSolicitud()" type="button" class="btn btn-success">Enviar</button>
                    <button class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
            </div>
            </div> 

<!--MODAL Motivo Rechazo  -->  
            <div class="modal fade bg-modal-sm" id="ModalMotivoRechazo" tabindex="-1" role="dialog" aria-labelledby="ModalMotivoRechazo" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">
                 <div class="modal-header text-white bg-primary">
                        <div class="modal-title" id="ModalMotivoRechazo"><b>Motivo de rechazo:</b></div>
                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span> </button>
                </div>
                <div class="modal-body">
                 
                  {{this.solicitud.motivo}}
                </div>
                </div>
              </div>
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
        this.getSolicitudes();
    },
    methods:{
        getSolicitudes: async function(){
            let tipo = 'Pool de Recursos'   //  OJOOOOOOOOOO cambiar a aumento de recursos
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
                await this.setQuota(this.PoolEditar.id_openstack)
                await this.aceptarAumento(this.PoolEditar._id)                
                this.solicitud.estado = "Aceptada"
                await this.cambiarEstado(this.solicitud._id)
                this.solicitud.motivo = "Solicitud de AUMENTO de pool recursos asignado a su proyecto: "+ this.solicitud.nombre_proyecto
                this.enviarCorreo()                    
                this.getSolicitudes()               
            }
            else{
                console.log("canceló")
            }
        },
        negarSolicitud: async function(){
            if(!this.solicitud.motivo){
                //alert("El nombre de usuario es obligatorio")
                this.$toastr.w("El motivo de cancelación es obligatorio")
                MotivoCancelacion.focus()                                        
            }
            else 
            {   
                console.log('Se ingresa a negarPool')
                this.solicitud.estado = "Rechazada"
                await this.cambiarEstado(this.solicitud._id)
                $('#ModalCancelarSolicitud').modal('hide')
                this.solicitud.motivo = "Solicitud de AUMENTO de pool de recursos para el proyecto '"+ this.solicitud.nombre_proyecto +"' rechazada por el siguiente motivo: "+ this.solicitud.motivo
                await this.enviarCorreo ()
                this.getSolicitudes()                 
            }           
            
        },
//Se recibe el id y la información de la quota se toma de solicitud []       
        setQuota: async function(id_project){
    
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
//Actualizar pool nuevos recursos
        aceptarAumento: async function(idPool){
            console.log('Se ingresa a aceptarAumento y se muestra el ID ', idPool)
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
            await axios.put('/api/solicitudes/'+id,{estado: this.solicitud.estado, motivo: this.solicitud.motivo}, this.config)
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error en cambiar estado',error); });
        },

   //ENVIAR CORREO
        enviarCorreo: async function(){
            console.log('Se ingresa a send notificación')
            await axios.post('/api/enviar_correo',{
                mensaje: this.solicitud.motivo,
                correo_usuario: this.solicitud.correo
                })
                .then(res => {
                    this.$toastr.s("Notificación enviada al usuario: "+ this.solicitud.usuario)
                    //console.log('Respuesta sendNotificacion')
                    //console.log(res) 
                    })
                .catch(error => { 
                    //console.log('Error en sendNotificacion ',error);
                    this.$toastr.e("Error al enviar notificación: "+ error)
                    //console.log(error) 
                });                                    
        }, 


    }    
}
</script>
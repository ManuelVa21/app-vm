<template>
    <div class="content" >
    <div class="row">
        
        <div class="col-2">
          <SidebarAdmin style="position: sticky; top: 70px"></SidebarAdmin>
        </div>
    <div class="col-10">
            
        <div style=" float: right;">
            <span>/</span>
            <router-link to="/PanelAdmin">Panel Admin</router-link>
            <span>/</span>
            <router-link to="/PanelAdmin/Solicitudes">Solicitudes</router-link>
            <span>/</span>
            <strong class="final-path">Pool Recursos</strong>
            <span>/</span>
        </div> <br>
        <!--<div class="btn-group btn-group-lg" style="display: flex; align-items: center;">   
            <button @click="$router.push('/PanelAdmin/Solicitudes/AumentoPool')" class="btn btn-outline-info">Aumento de recursos</button>
            <button @click="$router.push('/PanelAdmin/Solicitudes/Backup')" class="btn btn-outline-info ">Backup</button>
        </div> -->

        <button @click="prueba()"  type="button" class="btn btn-success"> </button>

 <!-- TABLA SOLICITUDES -->        
        <div class="table-responsive">
        <VueyeTable 
            :data="solicitudes" 
            :columns="columns" 
            title="Solicitudes de recursos"                           
            filter-by="estado">                            
    <!-- Mostrar estado solicitud -->   

            <template v-slot:estado="{item}">
                <template v-if="item.estado == 'Aceptada'">   
                    <div class="ml-1">
                    <td class="bg-success font-weight-bold text-white">Aceptada</td>   
                    </div>
               </template>
               <template v-else-if="item.estado == 'Sin Atender'">
                    <td class="bg-danger font-weight-bold text-white">Sin Atender</td>
                </template>
                <template v-else>                    
                    <td class="ml-1" style="background-color: #ff9800 ; color: white"><b>Rechazada</b></td>
                </template>                                                                        
            </template> 

    <!--Ver recursos solicitados -->                
            <template v-slot:_id="{item}">   
                <button v-on:click="getUnaSolicitud(item._id)" class="btn-sm btn-primary ml-3" data-toggle="modal" data-target="#modalRecursos" data-placement="top" title="Ver y aceptar recursos"><i class="far fa-eye"></i></button>                                                                                                                                                  
            </template>                              
<!-- Acciones tabla -->                   
            <template v-slot:acciones="{item}">
               
                <template v-if="item.estado == 'Aceptada'">  
                 <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                    <button @click="eliminarSolicitud(item._id)" type="button" class="btn btn-danger ml-3" data-toggle="tooltip" data-placement="top" title="eliminar solicitud"><i class="fas fa-trash"></i></button>                                            
                 </div>
                </template>

                <template v-else-if="item.estado == 'Rechazada'" style="text-align: center">  
                 <div class="pl-3">                                                                                                                                     
                    <button v-on:click="getUnaSolicitud(item._id)" type="button" class="btn-sm btn-info" data-toggle="modal" data-target="#ModalMotivoRechazo" data-placement="top" title="Motivo rechazo"><i class="fas fa-question-circle"></i></button>                                            
                 </div>
                </template>

                <template v-else>
                 <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                    <button v-on:click="getUnaSolicitud(item._id)" type="button" class="btn btn-success" data-toggle="modal"  data-target="#ModalSeleccionarServidor" data-placement="top" title="Aceptar"><i class="fas fa-check"></i></button>
                    <button v-on:click="getUnaSolicitud(item._id)" type="button" class="btn btn-danger" data-toggle="modal" data-target="#ModalCancelarSolicitud" data-placement="top" title="Rechazar"><i class="fas fa-times"></i></button>                                            
                 </div>
                </template>
            </template>                         
        </VueyeTable>
        </div>

<!--modal para Ver recursos solicitados -->

        <div class="modal fade" id="modalRecursos" tabindex="-1" role="dialog" aria-labelledby="ModalRecursosLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">                    
            <div class="modal-header text-white bg-primary"> 
                <h5 class="modal-title modal-dark" id="modalID"><b>Recursos solicitados</b></h5>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>                                        
            </div>
                   
            <div class="modal-body">
            <div class="container">
                <div class="row"> <div class="col">
                    <label> El usuario <b>{{solicitud.usuario}}</b> requiere para el proyecto <b>{{solicitud.nombre_proyecto}}</b>, 
                            el siguiente pool de recursos:</label>
                </div></div>  
                <hr>    
                <div class="row">
                     <div class="col">
                       <label><b> RAM:</b> </label>
                            <span class="font-weight-bold text-primary">{{solicitud.ram}} (Gb)</span>
                            <input v-model="solicitud.ram" type="range"  min="1" max="20">  <br>                                          
                       <label><b> Disco duro: </b></label>
                            <span class="font-weight-bold text-primary">{{solicitud.disco_duro}} (Gb)</span>
                            <input v-model="solicitud.disco_duro" type="range"  min="1" max="200">  <br>                                          
                        <label><b> CPU: </b></label>
                            <span class="font-weight-bold text-primary">{{solicitud.cpu}} (Vcpu)</span>
                            <input v-model="solicitud.cpu" type="range"  min="1" max="20">  <br>                                          
                    </div>
                    <div class="col"> 
                        <label><b> Número de VM's: </b></label>
                            <span class="font-weight-bold text-primary">{{solicitud.numvm}}</span>
                            <input v-model="solicitud.numvm" type="range"  min="1" max="10">  <br> 
                        <label><b> Cat Usuario: </b></label><br>
                        <label>{{solicitud.catUsuario}}</label><br>                        
                        <label><b> Fecha Finalización: </b></label><br>
                        <label>{{solicitud.fecha_fin}}</label>                                           
                    </div>
                   
                </div> 
                <div class="row"> <div class="col">
                    <label><b> Descripción: </b></label>
                    <br>
                    <label>{{solicitud.descripcion}}</label></div>
                </div>                                   
                </div>                                         
            </div>                        
<!-- Mostrar el footer del Modal segun el estado de la solicitud -->
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
                     <button type="button" class="btn btn-success" data-dismiss="modal" data-toggle="modal" data-target="#ModalSeleccionarServidor" aria-label="Close"><b>Aceptar solicitud </b></button>
                     <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#ModalCancelarSolicitud" data-dismiss="modal"> <b>Rechazar solicitud </b></button>                                            
                    </div>
                </template> 
            </div>  

        </div>
        </div>                     
        </div> 

<!--modal RECHAZAR solicitud  -->  
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

<!--MODAL seleccionar donde asignar el Pool de recursos: OPENSTACK - VMware -->  
        
        <div class="modal fade bg-modal" id="ModalSeleccionarServidor" tabindex="-1" role="dialog" aria-labelledby="ModalSeleccionarServidor" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal" role="document">
        <div class="modal-content">
            
            <div class="modal-header text-white bg-primary">
                   <div class="modal-title"><b>Seleccione en que hypervisor se va a crear el proyecto</b></div>
                   <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span> </button>
            </div>
            
            <div class="modal-body text-center">
                <p style="text-align: justify;">* Recuerde que al seleccionar VMware, debe dirigirse al servidor seleccionado y 
                   crear la agrupación de recursos y las VM's con la información suministrada (Ver documentación de administración).</p>
                <p style="text-align: justify;">* Por su parte al seleccionar OpenStack, se crea el proyecto, usuario, 
                   la red y demás. De esta manera, el usuario se encarga de crear sus propias VM's y gestionar sus propios recursos. </p>
                <button @click="getServidoresVMware()" class="btn font-weight-bold btn-info mr-3" data-dismiss="modal" data-toggle="modal" data-target="#ModalServidoresVMware"  >VMware</button>
                <button @click="aceptarPoolOpenStack(solicitud)" class="btn font-weight-bold btn-info ml-3" data-dismiss="modal">OpenStack</button>
            </div>
        </div>
        </div>
        </div>    

<!--MODAL Seleccionar servidor VMWARE  -->  
        
        <div class="modal fade bg-modal" id="ModalServidoresVMware" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            
            <div class="modal-header text-white bg-primary">
                   <div class="modal-title" ><b>Seleccione un servidor</b></div>
                   <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span> </button>
            </div>
            
            <div class="modal-body">
                <p class="text-secondary" style="text-align: justify;">A continuación se presentan los servidores VMware y sus recursos disponibles. 
                    Al seleccionar uno, se actualizan las bases de datos, posteriormente cree el proyecto y VM's utilizando vShpere.
                    Una ves cree las VM's comuníquese con el usuario para dar los datos de acceso.
                    </p>
                <table class="table text-center table-responsive-xl table-striped table-hover w-auto ml-3">
                <thead class="thead-dark">
                    <tr class="text-center">
                        <th scope="col">Nombre Host (#Bahía)</th>
                        <th scope="col">ip Host</th>
                        <th scope="col">Almacenamiento (Gb)</th>
                        <th scope="col">RAM (Gb)</th>
                        <th scope="col">CPU</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody  v-for="servidorVMware in servidoresVMware" v-bind:key="servidorVMware._id" >
                             
                    <tr class="text-center">
                        <td>{{servidorVMware.nombre}}</td>
                        <td>{{servidorVMware.direccion_ip}}</td>
                        <td>{{(servidorVMware.disco_duro_blade - servidorVMware.disco_duro_uso)}}</td>
                        <td>{{(servidorVMware.ram_blade - servidorVMware.ram_blade_uso)}}</td>
                        <td>{{(servidorVMware.cpu_blade + (servidorVMware.cpu_blade*(servidorVMware.sobreasignacion_cpu/100)) - servidorVMware.cpu_blade_uso)}}</td>
                        <td>  
                           <button @click="verificarRecursos(servidorVMware)" type="button" class="btn btn-success btn-sm"  data-placement="top" title="Añadir en este servidor"><i class="fas fa-check"></i></button>
                             
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        </div>
        </div>    


<!--MODAL Motivo Rechazo  -->  
        
        <div class="modal fade bg-modal-sm" id="ModalMotivoRechazo" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
            
            <div class="modal-header text-white bg-primary">
                   <div class="modal-title"><b>Motivo de rechazo:</b></div>
                   <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span> </button>
            </div>
            
            <div class="modal-body">
                {{this.solicitud.motivo}}
            </div>
        </div>
        </div>
        </div>
<!--MODAL Ir a agregar el rol del proyecto -->
        <div class="modal fade bg-modal" id="ModalAddRol" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            
            <div class="modal-header text-white bg-primary">
                   <div class="modal-title"><b>Agregar rol member:</b></div>
                   <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span> </button>
            </div>
            
            <div class="modal-body">
                <div style="text-align: justify;">                    
                     
                       Querid@ Admin, para completar la creación del proyecto, dirígete a la siguiente
                       <a href="http://10.55.2.20/dashboard/identity" target="_blank">ruta,</a> y accede
                       con tus credenciales. Selecciona el proyecto creado y en la sección <b>administrar miembros</b> 
                       agrega el usuario con el mismo nombre y rol "member".
                                        
                </div>
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
import SidebarAdmin from '../SidebarAdmin.vue'
import VueyeTable from 'vueye-table'
import VueComp from '@vue/composition-api'
import axios from 'axios'

import Token from '!!raw-loader!../../PanelAdmin/Token.txt'
const configG = require('../../../../config')

export default {
    data(){
        return{
        
        config:{
            headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin":"*"
            }
        },
        configOS:{
            headers:{
            'User-Agent': 'python-keystoneclient',
            'X-Auth-Token':Token,
            'Access-Control-Allow-Origin': '10.55.6.39',
            'Access-Control-Allow-Credentials':'true',
            'Access-Control-Expose-Headers': 'Authorization',
            'Access-Control-Max-Age':'86400',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-OpenStack-Nova-API-Version': '2.1' 
            }
        },
        configSimple:{
            headers:{
            'X-Auth-Token': Token,
            'Content-Type': 'application/json'
            }
        },
        configOSS:{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Auth-Token': Token,
                'User-Agent': 'openstacksdk/0.48.0 keystoneauth1/4.2.1 python-requests/2.23.0 CPython/3.8.2',
                'Access-Control-Allow-Origin': '10.55.6.39',
                'Access-Control-Allow-Credentials':'true',
                'Access-Control-Expose-Headers': 'Authorization',
                'Access-Control-Max-Age':'86400'
            }
        },
        configUserAddRole:{
            headers:{            
                'Accept' : 'application/json',
                'User-Agent' : 'python-keystoneclient',
                'X-Auth-Token' : Token,
            }
        },
            solicitudes:[],
            solicitud:[],
            servidoresVMware: [],
            columns:[              
                {key: "usuario", label: "Usuario", display: true, sortable: true},
                {key: "correo", label: "Correo usuario", display: true},
                {key: "nombre_proyecto", label: "Proyecto", display: true},                
                {key: "tutor", label: "Director", display: true},
                {key: "correo_tutor", label: "Correo director", display: true},
                {key: "estado", label: "Estado", display: true, sortable: true},
                {key: "_id", label: "Recursos", display: true},
                {key: "acciones", label: "Acciones", display: true},
            ]
        }
    },
    created(){
        this.getSolicitudes();
    },
    components:{        
        VueyeTable,
        'SidebarAdmin': SidebarAdmin,
    },
    methods:{
//Funciones para obtener solicitudes
        getSolicitudes: async function(){
            let tipo = 'Pool de Recursos'
            await axios.get('/api/solicitudes?tipo='+tipo)            
            .then(res => {
                this.solicitudes = res.data.content;    
            })            
            .catch(error => { this.$toastr.e("Error al obtener las solicitudes: " + error) });
        },
        getUnaSolicitud: async function(id){
            await axios.get('/api/solicitudes/unasolicitud?_id='+id)            
            .then(res => {
                this.solicitud = res.data.content;    
            })            
            .catch(error => { this.$toastr.e("Error al obtener el usuario " + error) });
        },
//Funciones para añadir un proyecto a VMWARE
        getServidoresVMware: async function (){
            await axios.get('/api/recursos_telco')
            .then(res => {                
               this.servidoresVMware = res.data.content; 
            })
            .catch(error => { this.$toastr.e("Error al obtener los recursos de VMware: " + error ) });        
            if (this.servidoresVMware.length == 0 )
            {this.$toastr.i("No tiene servidores en VMware")}
        },
    //Verificar si hay recursos disponibles en el servidor VMWARE
        verificarRecursos: async function(servidorVMware){    
            if( (servidorVMware.disco_duro_blade - servidorVMware.disco_duro_uso) > this.solicitud.disco_duro &&
                (servidorVMware.ram_blade - servidorVMware.ram_blade_uso) > this.solicitud.ram &&
                (servidorVMware.cpu_blade + (servidorVMware.cpu_blade*(servidorVMware.sobreasignacion_cpu/100)) - servidorVMware.cpu_blade_uso) > this.solicitud.cpu )
            {
                console.log("Recursosdisponibles")
                this.solicitud.servidor_ubicacion = "VMware"
                let id_pro = servidorVMware.direccion_ip
                this.createPool(id_pro,this.solicitud) //Crear el pool en la BD
                this.createUsuario(this.solicitud) //Crear el usuario en el BD

                let addRecursosUso = {
                    "_id" : servidorVMware._id,
                    "disco_duro_uso" : servidorVMware.disco_duro_uso + this.solicitud.disco_duro,
                    "ram_blade_uso" : servidorVMware.ram_blade_uso + this.solicitud.ram,
                    "cpu_blade_uso" : servidorVMware.cpu_blade_uso + this.solicitud.cpu,
                    "numero_vm" : servidorVMware.numero_vm + this.solicitud.numvm,
                }
                this.solicitud.estado = "Aceptada"
                this.cambiarEstado(this.solicitud._id)
                this.editarServidor(addRecursosUso)
                
            }
            else{
                this.$toastr.w("El servidor seleccionado no tiene recursos disponibles")
            }
        },
    //Al aceptar el proyecto en VMware se actualizan los recursos
        editarServidor: async function(addRecursosUso){ 
            await axios.put('/api/recursos_telco',addRecursosUso)
            .then(res => { 
                this.$toastr.s("Pool Creado y recursos disponibles actualizados")
                $('#ModalServidoresVMware').modal('hide') 
            })
            .catch(error => { this.$toastr.e("Error al actualizar el servidor:" + error) });
        },
//Acciones
        eliminarSolicitud: async function(_id){
            await axios.delete('/api/solicitudes?_id='+_id)
            .then(res => { 
                this.$toastr.s("Solicitud eliminada")
                this.getSolicitudes()
            })
            .catch(error => { this.$toastr.e("Error al eliminar la solicitud:" + error) });
        },
       negarSolicitud: async function(){
            if(!this.solicitud.motivo){
                this.$toastr.w("El motivo de cancelación es obligatorio")
                MotivoCancelacion.focus()                                        
            }
            else 
            {   
                this.solicitud.estado = "Rechazada"
                await this.cambiarEstado(this.solicitud._id)
                $('#ModalCancelarSolicitud').modal('hide')
                this.solicitud.motivo = "Solicitud de pool de recursos para el proyecto '"+ this.solicitud.nombre_proyecto +"' rechazada por el siguiente motivo: "+ this.solicitud.motivo
                this.enviarNotificacion()                 
            }           
            
        },
    //Aceptar POOL en OpenStack
        aceptarPoolOpenStack: async function(info){
            info.servidor_ubicacion = "OpenStack"
            
            this.$toastr.i("Se está creando el proyecto y asignando el pool de recursos, por favor espere!!")     
            await this.createProyecto(info) //crea el proyecto en openstack
            await this.createUsuario(info)
            this.solicitud.estado = "Aceptada"
            await this.cambiarEstado(info._id)
            this.solicitud.motivo = "Pool de recursos asignado a su proyecto: "+ this.solicitud.nombre_proyecto
            this.enviarNotificacion()
            $('#ModalSeleccionarServidor').modal('hide')
        },
        createUsuario: async function(){
            await axios.post('/api/usuarios',{
                nombre: this.solicitud.usuario,
                correo: this.solicitud.correo,
                estado: 'Activo',
                categoria_us: this.solicitud.catUsuario,
                tutor: this.solicitud.tutor,
                correo_tutor: this.solicitud.correo_tutor,
                pool_asociado: this.solicitud.nombre_proyecto })
            .then(res => { this.$toastr.s("Usuario y Pool de recursos asignado")})
            .catch(error => { this.$toastr.e("Error al crear el usuario' " + error);  });
            
        },
// AÑADIR EL PROYECTO A OpenStack
        createProyecto: async function(info){           
            let data={
                "project": {
                    "tags": [], 
                    "enabled": true, 
                    "description": info.descripcion, 
                    "name": info.nombre_proyecto
                }
            };
            await axios.post('http://'+configG.ipOpenstack+'/identity/v3/projects',data,this.configOS)
                .then(res => {
                    //console.log('Se muestra la respuesta despues de crear el proyecto') 
                    //console.log(res)
                    if (res.status == '201') {
                        this.setQuota(res.data.project.id,info);
                        this.createUser(res.data.project.id,info)
                        this.createNetwork(res.data.project.id,info)
                        this.createPool(res.data.project.id,info)
                        this.$toastr.i("El proyecto y el pool de recursos se ha creado correctamente")
                    } else { this.$toastr.e("Error al crear el proyecto: "+ res.status)}
                    })
                .catch(error => { this.$toastr.e("Error al crear el proyecto en OpenStack " + error); });
        },
        setQuota: async function(id_project,info){
            //Se recibe el id y la información de la quota
            let data={
                "quota_set":{
                    "instances": info.numvm, 
                    "ram": (info.ram*1024), 
                    "cores": info.cpu
                }
            };
            await axios.put('http://'+configG.ipOpenstack+'/compute/v2.1/os-quota-sets/'+id_project,data,this.configOS)
            .then(res => {
            })
            .catch(error => { this.$toastr.e("Error al asignar la Quota en OpenStack 'Pool de recursos' " + error ) });
        },
        createUser: async function(id_project,info){
            let data={
                "user":{
                    //"default_project_id" : id_project,
                    //"description" : 'Usuario del proyecto: '+id_project,
                    //"email" : info.correo,
                    "enable" : true,
                    "name" : info.nombre_proyecto,
                    "password" : info.contrasenap,
                    "domain_id" : "default"
                }
            };
            //await axios.post('http://'+configG.ipOpenstack+'/identity/v3/users',data,this.configSimple)
            await axios.post('http://'+configG.ipOpenstack+'/identity/v3/users',data,this.configOS)
            .then(res => {
                //console.log('Se muestra la respuesta del create user')                
                this.roleAdd(id_project,res.data.user.id)
            })
            .catch(error => { this.$toastr.e("Error al crear el usuario en OpenStack' " + error )});
        },
        roleAdd: async function(id_project,id_user){
            
            console.log('se ingresa a roleAdd, se muestra id_project e id_user')
            console.log(id_project)
            console.log(id_user)
            //console.log(id_project)
            //console.log(id_user)
            //http://10.55.2.24/identity/v3/projects/{id proyecto}/users/{id usuario creado}/roles/{id role member}
            //http://10.55.2.24/identity/v3/projects/d4e480ee2284481b9bb7db926ba7cfb1/users/9ba3f2cf490b44a6aafe6d09deaac518/roles/e6dfb94eb95542a0b415279abe461aab
            await axios.put('http://'+configG.ipOpenstack+'/identity/v3/projects/'+id_project+'/users/'+id_user+'/roles/'+configG.roleMember,this.configUserAddRole)
            .then(res => {                
            })
            .catch(error => { 
                console.log('error al añadir el Rol')
                console.log(error)
                $('#ModalAddRol').modal('show')
                
            });
        },
        createNetwork: async function(id_project,info){
            //console.log('se ingresa a createNetwork')
            let data={
                "network": {
                    "admin_state_up": true, 
                    "availability_zone_hints": ["nova"], 
                    "project_id": id_project, 
                    "description": "network para proyecto "+info.nombre_proyecto, 
                    "name": info.nombre_proyecto+"-net"
                    }
            };
            await axios.post('http://'+configG.ipOpenstack+':9696/v2.0/networks',data,this.configOSS)
            .then(res => {
               // console.log('Se muestra la respuesta del create network')
                //console.log(res)
                this.createSubNet(res.data.network.id,info,id_project)
            })
            .catch(error => { this.$toastr.e("Error al crear la red de acceso para las VM's del proyecto ' " + error);  });
        },
        createSubNet: async function(id_net,info,id_project){
           //console.log(info)
            let data={
                "subnet": {
                    "ip_version": 4, 
                    "network_id": id_net, 
                    "cidr": "192.168.205.0/24", 
                    "name": info.nombre_proyecto+"-subnet", 
                    "project_id": id_project
                    }
            };
            await axios.post('http://'+configG.ipOpenstack+':9696/v2.0/subnets',data,this.configOSS)
            .then(res => {
               // console.log('Se muestra la respuesta del create sub network')
                //console.log(res)
                this.createRouter(id_project,info.nombre_proyecto,res.data.subnet.id)
            })
            .catch(error => { this.$toastr.e("Error al crear la subred del proyecto' " + error);  });
        },
        createRouter: async function(id_project,nombre_pro,idSubnet){
           // console.log('se ingresa a createRouter')
            let data={
                "router": {
                    "tenant_id": id_project, 
                    "availability_zone_hints": ["nova"], 
                    "description": "Router para project "+nombre_pro, 
                    "name": nombre_pro+"-router", 
                    "admin_state_up": true
                    }
            };
            await axios.post('http://'+configG.ipOpenstack+':9696/v2.0/routers',data,this.configOSS)
            .then(res => {
               // console.log('Se muestra la respuesta del create router')
                //console.log(res)
                this.routerAddSubnet(res.data.router.id,idSubnet)
            })
            .catch(error => { this.$toastr.e("Error al crear el router para la red interna del proyecto' " + error);  });
        },
        routerAddSubnet: async function(id_router,idSubnet){
            //console.log('Se ingresa a routerAdd Subnet')
            //console.log('Los datos recibidos son ',id_router,' y ',idSubnet)
            let data={
                "subnet_id": idSubnet
            }
            await axios.put('http://'+configG.ipOpenstack+':9696/v2.0/routers/'+id_router+'/add_router_interface',data,this.configOSS)
            .then(res => {
               // console.log('Se muestra la respuesta del add router')
                //console.log(res)
                this.routerSet(id_router)
            })
            .catch(error => { this.$toastr.e("Error al añadir la subred a la red OpenStack' " + error);  });
        },
        routerSet: async function(id_router){
          //  console.log('Se ingresa a router set')
            let data={
                "router": {
                    "external_gateway_info": {
                        //"network_id": {id red publica para salir a internet}
                        "network_id": configG.idNetPublic
                    }
                }
            };
            await axios.put('http://'+configG.ipOpenstack+':9696/v2.0/routers/'+id_router,data,this.configOSS)
            .then(res => {
               // console.log('Se muestra la respuesta del set router')
               // console.log(res)
            })
            .catch(error => { this.$toastr.e("Error en routerSet' " + error);  });
        },
// AÑADIR POOL a la base de datos
        createPool: async function(id_pro,info){
            //console.log("se ingresa a crear el pool")
            //console.log(info)
            await axios.post('/api/pool_recursos',{
                id_openstack: id_pro,
                nombre_proyecto: info.nombre_proyecto,
                servidor_ubicacion: info.servidor_ubicacion,
                contrasena: info.contrasenap,
                descripcion: info.descripcion,
                propietario: info.usuario,
                emailPropietario: info.correo,
                numero_vm: info.numvm,
                disco_duro: info.disco_duro,
                ram: info.ram,
                cpu: info.cpu,
                fecha_fin: info.fecha_fin
            },this.config)
                .then(res => { //console.log(res)
                 })
                .catch(error => { this.$toastr.e("Error al añadir el Pool a la base de datos' " + error);  });
        },
        cambiarEstado: async function(id){
            console.log('Se va a cambiar el estado de la solicitud')
            await axios.put('/api/solicitudes/'+id,{estado: this.solicitud.estado, motivo: this.solicitud.motivo}, this.config)
                .then(res => {this.getSolicitudes() })
                .catch(error => { console.log('Error en cambiar estado',error); });
        },
   //ENVIAR CORREO
        enviarCorreo: async function(){
            console.log('Se ingresa a send Enviar Correo')
            await axios.post('/api/enviar_correo',{
                mensaje: this.solicitud.motivo,
                correo_usuario: this.solicitud.correo
                })
                .then(res => {                  
                })
                .catch(error => { 
                    this.$toastr.e("Error al enviar notificación: "+ error)
                });                                        
        },
        enviarNotificacion: async function(){
            //console.log('Se ingresa a send notificación')
            await axios.post('/api/alertas_notificaciones',{
                tipo: "Notificación",
                descripcion: this.solicitud.motivo,
                usuario_destino: this.solicitud.usuario,
                correo_usuario: this.solicitud.correo
                })
                .then(res => {
                    this.enviarCorreo ()                                        
                })
                .catch(error => { this.$toastr.e("Error al enviar notificación a la aplicación: "+ error) });
        } 
    }
}
</script>
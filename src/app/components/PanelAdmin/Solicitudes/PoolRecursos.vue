<template>
    <div class="content" >
    <div class="row">
        <div class="col-2">
          <SidebarAdmin></SidebarAdmin>
        </div>
        <div class="col-10">
        <div class="btn-group btn-group-lg" style="display: flex; align-items: center;">   
            <button @click="$router.push('/PanelAdmin/Solicitudes/AumentoPool')" class="btn btn-outline-info">Aumento de recursos</button>
            <button @click="$router.push('/PanelAdmin/Solicitudes/Backup')" class="btn btn-outline-info ">Backup</button>
        </div>
        
        <div class="table-responsive">
      
                        <VueyeTable 
                            :data="solicitudes" 
                            :columns="columns" 
                            title="Solicitudes de recursos"                           
                            filter-by="estado">                            
        <!-- Mostrar estado solicitud -->     
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
                                        <h5 class="modal-title modal-dark" id="modalID"><b>Recursos solicitados</b></h5>
                                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>                                        
                                    </div>
                                    <div class="modal-body">
                                     <div class="container">
                                         <div class="row"> <div class="col">
                                            <label> <b>El usuario: {{solicitud.usuario}} requiere {{solicitud.numvm}} 
                                                VM's y el siguiente Pool de recursos</b></label>
                                         </div></div>  
                                         <hr>    
                                        <div class="row">
                                         <div class="col"> 
                                            <label><b> Cat Usuario: </b></label><br>
                                            <label>{{solicitud.catUsuario}}</label><br>
                                            <label><b> Fecha Solicitud: </b></label><br>
                                            <label>{{solicitud.fecha}}</label><br>
                                            <label><b> Fecha Finalización: </b></label><br>
                                            <label>{{solicitud.fecha_fin}}</label>                                           
                                         </div>
                                         <div class="col">
                                            <label><b> RAM: </b></label><br>
                                            <label>{{solicitud.ram}} Gb</label><br>
                                            <label><b> Disco duro: </b></label><br>
                                            <label>{{solicitud.disco_duro}} Gb</label><br>
                                            <label><b> CPU: </b></label><br>
                                            <label>{{solicitud.cpu}}</label>
                                         </div>
                                        </div>                                        
                                        <div class="row"> <div class="col">
                                            <label><b> Descripción: </b></label>
                                            <br>
                                            <label>{{solicitud.descripcion}}</label>
                                        </div></div>                                   
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
                                       <button v-on:click="aceptarPool(solicitud)" type="button" class="btn btn-success" data-dismiss="modal" aria-label="Close"><b>Aceptar solicitud </b></button>
                                       <button v-on:click="negarSolicitud(solicitud._id, solicitud.tipo)" type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close"> <b>Negar solicitud </b></button>                                            
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
           /* configOS:{
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
                'X-Auth-Token':Token,
                'Content-Type': 'application/json'
                }
            },
            configOSS:{
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Auth-Token':Token,
                    'User-Agent': 'openstacksdk/0.36.0 keystoneauth1/3.18.0 python-requests/2.22.0 CPython/2.7.17',
                    'Access-Control-Allow-Origin': '10.55.6.39',
                    'Access-Control-Allow-Credentials':'true',
                    'Access-Control-Expose-Headers': 'Authorization',
                    'Access-Control-Max-Age':'86400'
                }
            },
            configUseraddrole:{
                headers:{
                    'X-Auth-Token':Token,
                    'Accept': 'application/json',
                    'User-Agent': 'python-keystoneclient'
                }
            },*/

            solicitudes:[],
            solicitud:[],
            columns:[              
                {key: "usuario", label: "Usuario", display: true, sortable: true},
                {key: "correo", label: "Correo usuario", display: true},
                {key: "nombre_proyecto", label: "Proyecto", display: true},                
                {key: "tutor", label: "Director", display: true},
                {key: "correo_tutor", label: "Correo director", display: true},
                {key: "numvm", label: "# VM's", display: true},                             
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
    components:{        
        VueyeTable,
        'SidebarAdmin': SidebarAdmin,
       
    },
    methods:{
       
        

        getSolicitudes: async function(tipo){
            //console.log('Se ingresa a getSolicitudesPool')
            await axios.get('/api/solicitudes?tipo='+tipo)            
            .then(res => {
                //console.log('Se muestra respuesta get')
                //console.log(res.data.content);
                this.solicitudes = res.data.content; 
                //console.log(this.solicitudes)               
    // Cambiar de true a resuelto y de false a pendiente
             /*this.solicitudes.forEach(function(element) {
                    if (element.estado) {
                        element.estado = "Resuelto"
                    }
                    else{
                        element.estado = "Pendiente"
                    }                    
                });*/                  
                console.log(this.solicitudes);
            })            
            .catch(error => { console.log('Error en get solicitudes',error); });
        },
         getUnaSolicitud: async function(id){
            console.log('Se ingresa a get una solicitud' + id)
            await axios.get('/api/solicitudes/unasolicitud?_id='+id)            
            .then(res => {
                //console.log('Se muestra respuesta get')
                //console.log(res.data.content);
                this.solicitud = res.data.content;    
                //console.log(this.solicitud);
            })            
            .catch(error => { console.log('Error en get solicitudes',error); });
        },
//Acciones
        confirmarSolicitud: async function (idSolicitud){            
            await this.getUnaSolicitud(idSolicitud);
            console.log(this.solicitud)
            var respuesta = confirm ('¿Estás seguro de aceptar esta solicitud?');
            if (respuesta == true)
            {
                //this.aceptarPool(this.solicitud)                
            }
            else{
                console.log("canceló")
                //this.getUsuarios();
            }
        },
        confirmarNegar: async function (idSolicitud){
            await this.getUnaSolicitud(idSolicitud)
            console.log(this.solicitud)
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
        aceptarPool: async function(info){
            //console.log('se muestra el info recibido en aceptar pool')
            console.log(info)          
            /*this.createProyecto(info)
            this.createUsuario(info)
            this.cambiarEstado(info._id)
            this.getSolicitudes(info.tipo)*/
        },
        createUsuario: async function(info){
            //Se crea el registro del usuario
            console.log('Se ingresa crear usuario')
            //console.log(info)
            if (info.categoria_us === 'Estudiante') {
                await axios.post('/api/usuarios',{
                    nombre: info.usuario,
                    correo: info.correo,
                    estado: 'Activo',
                    categoria_us: info.catUsuario,
                    tutor_proy: info.tutor,
                    correo_tutor: info.correo_tutor,
                    pool_asociado: info.nombre_proyecto
                },this.config)
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error en create usuario',error); });
            } else if (info.categoria_us === 'Docente'){
                await axios.post('/api/usuarios',{
                    nombre: info.usuario,
                    correo: info.correo,
                    categoria_us: info.catUsuario,
                    pool_asociado: info.nombre_proyecto
                },this.config)
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error ',error); });
            }else {
                await axios.post('/api/usuarios',{
                    nombre: info.usuario,
                    correo: info.correo,
                    categoria_us: info.catUsuario,
                    pool_asociado: info.nombre_proyecto
                },this.config)
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error ',error); });
            }
        },

        createProyecto: async function(info){
            console.log('Se crea el proyecto en openstack')
            //console.log('Se muestra el info desde crear proyecto')
            //console.log(info)            
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
                    console.log('Se muestra la respuesta despues de crear el proyecto') 
                    console.log(res)
                    if (res.status == '201') {
                        this.setQuota(res.data.project.id,info);
                        this.createUser(res.data.project.id,info)
                        this.createNetwork(res.data.project.id,info)
                        this.createPool(res.data.project.id,info)
                    } else { console.log('Error al crear ')}
                    })
                .catch(error => { console.log('Error  en create project',error); });
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
                console.log('Se muestra la respuesta del set quota')
                console.log(res)
            })
            .catch(error => { console.log('Error en set quota',error); });
        },
        createUser: async function(id_project,info){
            console.log('se ingresa a createUser')
            //console.log('se muestra el info en create user')
            //console.log(info)
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
            await axios.post('http://'+configG.ipOpenstack+'/identity/v3/users',data,this.configSimple)
            .then(res => {
                console.log('Se muestra la respuesta del create user')
                console.log(res)
                if (res.status == '201') {
                    this.roleAdd(id_project,res.data.user.id)
                } else { console.log('Error al crear ')}
            })
            .catch(error => { console.log('Error en create user',error); });
        },
        roleAdd: async function(id_project,id_user){
            console.log('se ingresa a roleAdd')
            //console.log(id_project)
            //console.log(id_user)
            //http://10.55.2.24/identity/v3/projects/{id proyecto}/users/{id usuario creado}/roles/{id role member}
            //http://10.55.2.24/identity/v3/projects/d4e480ee2284481b9bb7db926ba7cfb1/users/9ba3f2cf490b44a6aafe6d09deaac518/roles/e6dfb94eb95542a0b415279abe461aab
            await axios.put('http://'+configG.ipOpenstack+'/identity/v3/projects/'+id_project+'/users/'+id_user+'/roles/'+configG.roleMember,this.configUseraddrole)
            .then(res => {
                console.log('Se muestra la respuesta del role add')
                console.log(res)
            })
            .catch(error => { console.log('Error en roleAdd',error); });
        },
        createNetwork: async function(id_project,info){
            console.log('se ingresa a createNetwork')
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
                console.log('Se muestra la respuesta del create network')
                console.log(res)
                if (res.status == '201') {
                    this.createSubNet(res.data.network.id,info,id_project)
                    
                } else { console.log('Error al crear ') }
            })
            .catch(error => { console.log('Error en create network',error); });
        },
        createSubNet: async function(id_net,info,id_project){
            console.log('se ingresa a createSubNet')
            //console.log('se muestra el info en create subnet')
            //console.log(info)
            //console.log(id_project)
            let data={
                "subnet": {
                    "ip_version": 4, 
                    "network_id": id_net, 
                    "cidr": "192.168.205.0/24", 
                    "name": info.nombre_proyecto+"-subnet", 
                    "tenant_id": id_project
                    }
            };
            await axios.post('http://'+configG.ipOpenstack+':9696/v2.0/subnets',data,this.configOSS)
            .then(res => {
                console.log('Se muestra la respuesta del create sub network')
                console.log(res)
                this.createRouter(id_project,info.nombre_proyecto,res.data.subnet.id)

            })
            .catch(error => { console.log('Error en create subnet',error); });
        },
        createRouter: async function(id_project,nombre_pro,idSubnet){
            console.log('se ingresa a createRouter')
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
                console.log('Se muestra la respuesta del create router')
                console.log(res)
                this.routerAddSubnet(res.data.router.id,idSubnet)
            })
            .catch(error => { console.log('Error en create router',error); });
        },
        routerAddSubnet: async function(id_router,idSubnet){
            console.log('Se ingresa a routerAdd Subnet')
            console.log('Los datos recibidos son ',id_router,' y ',idSubnet)
            let data={
                "subnet_id": idSubnet
            }
            await axios.put('http://'+configG.ipOpenstack+':9696/v2.0/routers/'+id_router+'/add_router_interface',data,this.configOSS)
            .then(res => {
                console.log('Se muestra la respuesta del add router')
                console.log(res)
                this.routerSet(id_router)
            })
            .catch(error => { console.log('Error en router add ',error); });
        },
        routerSet: async function(id_router){
            console.log('Se ingresa a router set')
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
                console.log('Se muestra la respuesta del set router')
                console.log(res)
            })
            .catch(error => { console.log('Error en router set',error); });
        },
        createPool: async function(id_pro,info){
            console.log('Se ingresa a crear pool en la bd')
            await axios.post('/api/pool_recursos',{
                id_openstack: id_pro,
                nombre_proyecto: info.nombre_proyecto,
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
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error en create pool',error); });
        },
        cambiarEstado: async function(id){
            console.log('Se va a cambiar el estado de la solicitud')
            await axios.put('/api/solicitudes/'+id,{estado: 'true' }, this.config)
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error en cambiar estado',error); });
        }
    }
}
</script>
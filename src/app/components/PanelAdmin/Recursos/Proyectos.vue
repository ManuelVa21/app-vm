<template>
    <div class="content">
    <div class="row">
        <div class="col-2">
          <SidebarAdmin style="position: sticky; top: 70px"></SidebarAdmin>
        </div>
    <div class="col-10" style="padding-left: 0;">
          
        <div style=" float: right;">
            <span>/</span>
            <router-link to="/PanelAdmin">Panel Admin</router-link>
            <span>/</span>
            <router-link to="/PanelAdmin/Recursos">Recursos</router-link>
            <span>/</span>
            <strong class="final-path">Proyectos</strong>
            <span>/</span>
        </div><br>

        
        <div class="table-responsive">
                
            <VueyeTable 
            :data="projects" 
            :columns="columns" 
            title="Proyectos"                           
            filter-by="estado">
<!-- Ver estado del proyecto -->
                <template v-slot:estado="{item}">
                    <template v-if="item.estado == 'Activo'">  
                        <td class="bg-success font-weight-bold text-white">Activo</td>   
                    </template>
                    <template v-else-if="item.estado == 'Inactivo'">
                         <td class="bg-danger font-weight-bold text-white">Inactivo</td>
                     </template>                                                                
                 </template> 
<!-- Ver hypervisor e id -->

                <template v-slot:servidor_ubicacion="{item}"> 
                    <template v-if="item.servidor_ubicacion == 'VMware'">  
                        <td>VMware {{item.id_openstack}}</td>   
                    </template>
                    <template v-else>
                         <td>Openstack</td>
                     </template> 
                </template>
<!-- Ver recursos del proyecto -->
                <template v-slot:ver_mas="{item}"> 
                    <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                         <button @click="getOnePool(item)" type="button" class="btn-sm btn-primary ml-3" data-toggle="modal" data-target="#ModalVerRecursos"  data-placement="top" title="Recursos del proyecto"><i class="fas fa-eye"></i></button>                                                        
                    </div>
                </template>

<!-- Acciones -->
                <template v-slot:_id="{item}"> 
                    <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                         <button @click="getOnePool(item)" type="button" class="btn btn-danger ml-3" data-toggle="modal" data-target="#ModalConfirmarEliminar" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                                        
                    </div>
                </template>

            </VueyeTable>
            </div>  
<!--MODAL Confirmar eliminar  -->  
        
        <div class="modal fade bg-modal-sm" id="ModalConfirmarEliminar" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header text-white bg-primary">
                   <div class="modal-title"><b>De verdad quiere eliminar este proyecto??</b></div>
                   <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span> </button>
            </div>
            <div class="modal-body text-center">
                <button  class="btn font-weight-bold btn-success " data-dismiss="modal">cancelar</button>
                <button @click="verificarEliminar()" class="btn font-weight-bold btn-danger" data-dismiss="modal">ELIMINAR</button>
            
            </div>
        </div>
        </div>
        </div>


<!--  Modal ver información del proyecto  -->        
            <div class="modal fade" id="ModalVerRecursos" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            
                <div class="modal-header text-white bg-primary">
                        <h5 class="modal-title" ><b>información del proyecto</b></h5>
                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span> </button>
                </div>

                <div class="modal-body">
                <div class="container">
                    <div class="row"> <div class="col">
                        <label> El proyecto: <b>{{project.nombre_proyecto}}</b> pertenece al usuario: <b>{{project.propietario}}</b> 
                                y tiene asignado el siguiente pool de recursos:</label>
                    </div></div>  
                    <hr>    
                    <div class="row">
                        <div class="col">
                           <label><b> RAM: </b></label>
                           <label>{{project.ram}} (Gb)</label><br>
                           <label><b> Disco duro: </b></label>
                           <label>{{project.disco_duro}} (Gb)</label><br>
                           <label><b> CPU: </b></label>
                           <label>{{project.cpu}}</label>
                        </div>
                        
                        <div class="col"> 
                            <label><b> Número de VM's: </b></label>
                            <label>{{project.numero_vm}}</label>
                            <label><b> Fecha Finalización: </b></label><br>
                            <label>{{project.fecha_fin}}</label>                                           
                        </div>
                    </div> 
                    <div class="row"> <div class="col">
                        <label><b> Descripción: </b></label>
                        <br>
                        <label>{{project.descripcion}}</label></div>
                    </div>                                   
                </div> 
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" data-dismiss="modal">Cerrar</button>
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
//import func from '../../../../../vue-temp/vue-editor-bridge'
const configG = require('../../../../config') 



export default {
    
    components:{        
        VueyeTable,
        SidebarAdmin
    },

    data(){
        return{
            config:{
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
            configDeleteNetwork:{
                headers:{
                'Accept' : 'application/json',
                'User-Agent': 'openstacksdk/0.48.0 keystoneauth1/4.2.1 python-requests/2.23.0 CPython/3.8.2',
                'X-Auth-Token':Token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '10.55.6.39',
                'Access-Control-Allow-Credentials':'true',
                'Access-Control-Expose-Headers': 'Authorization',
                'Access-Control-Max-Age':'86400'
                }
            },    
            configEdit:{
                headers:{
                'User-Agent': 'python-novaclient',
                'X-Auth-Token':Token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-OpenStack-Nova-API-Version': '2.1' 
                }
            },
                projects:[],
                project:[],
                servidorVMware:[],
                network:[],
           
           columns:[              
                {key: "nombre_proyecto", label: "Nombre Proyecto", display: true, sortable: true},
                {key: "propietario", label: "Usuario", display: true},
                {key: "disco_duro", label: "Almacenamiento (Gb)", display: true},
                {key: "ram", label: "RAM (Gb)", display: true},
                {key: "cpu", label: "CPU", display: true},
                {key: "servidor_ubicacion", label: "Hypervisor", display: true},
                {key: "id_openstack", label: "servidor", display: false},
                {key: "ver_mas", label: "Información", display: true},
                {key: "estado", label: "Estado", display: true, sortable: true},                
                {key: "_id", label: "Acciones", display: true}                                              
            ] 
        }
    },
    created(){
       // this.getProjects();
        this.getPools();

    },
    methods:{
// Obtener información de los proyectos
        getPools: async function(){
            await axios.get('/api/pool_recursos')
                .then(res => {
                   this.projects = res.data.content;
                })
                .catch(error => { this.$toastr.e("Error al cargar los pool de recursos " + error) });                
        },
        getOnePool: async function(item){
            await axios.get('/api/pool_recursos/unpool?_id='+item._id)
                .then(res => {
                    this.project = res.data.content;})
                .catch(error => { this.$toastr.e("Error al cargar el pool de recursos " + error) });                
        },
    //Se verifica si el proyecto está en VMware u OpenStack
    //para realizar el proceso de eliminación
        verificarEliminar: async function (){            
            if (this.project.servidor_ubicacion == "OpenStack")
                {
                    this.deleteProjectOpenStack () ;  // Se debe eliminar todo lo relacionado con el proyecto en OpenStack
                    this.eliminarUsuario (); //Eliminar usuario de la BD local
                    this.eliminarPool () ;  //finalmente se elimina el pool de recursos de la BD                 
                }
            else
            {
                this.getServidorVMware (); // Se actualiza la información del servidor donde se encuentra el poryecto
                this.eliminarUsuario (); //Eliminar usuario de la BD local
                this.eliminarPool () ; // finalmente se elimina el pool de recursos de la BD
            }
        },
        eliminarUsuario: async function (){
            await axios.delete('/api/usuarios?correo='+this.project.emailPropietario)            
            .then(res => {})            
            .catch(error => { this.$toastr.e("Error al eliminar el usuario: " + error )});
        },
        eliminarPool: async function(){
            await axios.delete('/api/pool_recursos?_id='+this.project._id)
            .then(res => {
                this.$toastr.s("El proyecto y usuario eliminados correctamente")                                              
                this.getPools();
            })
            .catch(error => { this.$toastr.e("Error al eliminar el pool de recursos " + error) });                
        },
//Funciones VMWARE
        getServidorVMware: async function (){
            await axios.get('/api/recursos_telco/unservidor?direccion_ip='+this.project.id_openstack)            
            .then(res => {
                this.servidorVMware = res.data.content  
               let actualizarRecursos = {
                    "_id" : this.servidorVMware._id,
                    "disco_duro_uso" : this.servidorVMware.disco_duro_uso - this.project.disco_duro,
                    "ram_blade_uso" : this.servidorVMware.ram_blade_uso - this.project.ram,
                    "cpu_blade_uso" : this.servidorVMware.cpu_blade_uso - this.project.cpu,
                    "numero_vm" : this.servidorVMware.numero_vm - this.project.numero_vm,
                } 
                this.liberarRecursosVMware(actualizarRecursos) 
                
            })            
            .catch(error => { this.$toastr.e("Error al obtener el servidor donde se encuentra el proyecto: " + error )
            });
        },
        liberarRecursosVMware: async function(actualizarRecursos){
           console.log(actualizarRecursos)
            await axios.put('/api/recursos_telco',actualizarRecursos)
            .then(res => { 
                this.$toastr.s("recursos disponibles actualizados")
            })
            .catch(error => { this.$toastr.e("Error al actualizar el servidor:" + error) });
        },
// Eliminar de OPENSTACK

        deleteProjectOpenStack: async function(){            
    //Primero se eliminan los puertos del router, el router y la red
            await axios.get('http://'+configG.ipOpenstack+':9696/v2.0/networks?name='+this.project.nombre_proyecto+'-net',this.config)
                .then(res => {
                    console.log('Respuesta get network',res)
                    this.network.networkId = res.data.networks[0].id                   
                })
                .catch(error => { this.$toastr.e("Error al obtener la red del proyecto " + error) });
            await axios.get('http://'+configG.ipOpenstack+':9696/v2.0/routers?name='+this.project.nombre_proyecto+'-router',this.config)
                .then(res => {
                    this.network.routerId = res.data.routers[0].id                
                    this.getInterfaceRouter()                    
                })
                .catch(error => { this.$toastr.e("Error al obtener router del proyecto " + error) });
    //Segundo el usuario  
            await axios.get('http://'+configG.ipOpenstack+'/identity/v3/users?name='+this.project.nombre_proyecto,this.config)
                .then(res => {
                    //console.log('Respuesta get user',res.data.users[0].id)
                    this.deleteUser(res.data.users[0].id)
                })
                .catch(error => { this.$toastr.e("Error al obtener el usuario del proyecto " + error) });
    //Tercero el proyecto    
            await axios.delete('http://'+configG.ipOpenstack+'/identity/v3/projects/'+this.project.id_openstack,this.config)
                .then(res => {                   
                   this.$toastr.s("Proyecto eliminado")                                     
                })
                .catch(error => { this.$toastr.e("Error al borrar el proyecto " + error) });
        },        
    //Eliminar los puertos y red    
        getInterfaceRouter: async function(){
            await axios.get('http://'+configG.ipOpenstack+':9696/v2.0/ports?device_id='+this.network.routerId,this.configDeleteNetwork)
                .then(res => {
                   if(res.data.ports[0].network_id == this.network.networkId){
                        let interfaceId = res.data.ports[0].id                  
                        this.deleteInterfaceRouter(interfaceId)
                    }
                    else{
                        let interfaceId = res.data.ports[1].id                  
                        this.deleteInterfaceRouter(interfaceId)
                    }                  
                })
                .catch(error => { this.$toastr.e("Error al obtener los puertos del router" + error) });
        },
        deleteInterfaceRouter: async function(interfaceId){            
            let data = {
                "port_id": interfaceId
            }
             console.log("la id de la data es:"+ data)
            await axios.put('http://'+configG.ipOpenstack+':9696/v2.0/routers/'+this.network.routerId+'/remove_router_interface',data,this.configDeleteNetwork)
                .then(res => {
                    console.log('Si se pudo eliminar la interface')
                    this.deleteRouter()
                })
                .catch(error => { 
                    console.log('ERROR delete Interface',error)
                    this.$toastr.e("Error al eliminar los puertos del router" + error) });
        },        
        deleteRouter: async function(){
            await axios.delete('http://'+configG.ipOpenstack+':9696/v2.0/routers/'+this.network.routerId,this.configDeleteNetwork)
                .then(res => {
                    this.deleteNetwork()                    
                })
                .catch(error => { 
                    console.log('ERROR delete router',error)
                    this.$toastr.e("Error al eliminar el router del proyecto " + error) });
        },        
        deleteNetwork: async function(){
            await axios.delete('http://'+configG.ipOpenstack+':9696/v2.0/networks/'+this.network.networkId,this.configDeleteNetwork)
                .then(res => {
                    this.$toastr.s("Red eliminada ")
                })
                .catch(error => {
                    //console.log('ERROR delete Network',error)
                    this.$toastr.e("Error al eliminar la red del proyecto, por favor ur al dashboard y eliminarla manualmente") });     
        },
        deleteUser: async function(userId){
            await axios.delete('http://'+configG.ipOpenstack+'/identity/v3/users/'+userId,this.config)
                .then(res => { })
                .catch(error => { this.$toastr.e("Error al eliminar el usuario en OpenStack " + error) });
        }
       

    }
}
</script>
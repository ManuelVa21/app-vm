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
            <strong class="final-path">Recursos Telco</strong>
            <span>/</span>
        </div>

        <p class="text-secondary">Infomación correspondiente a los recursos de la plataforma Telco 2.0</p>    
<!-- Mostrar los recursos de OPENSTACK   -->
        <h3>Recursos Totales Telco: OpenStack</h3>
        <div class="table-responsive">
            <table class="table text-center table-responsive-xl table-striped table-hover w-auto">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Nombre Host</th>
                        <th scope="col">ip Host</th>
                        <th scope="col">Almacenamiento (Gb)</th>
                        <th scope="col">Almacenamiento libre (Gb)</th>
                        <th scope="col">RAM (Gb)</th>
                        <th scope="col">RAM libre (Gb)</th>
                        <th scope="col">CPU</th>
                        <th scope="col">CPU libre</th>
                        <th scope="col">VM corriendo</th>
                    </tr>
                </thead>
                <tbody  v-for="recursosT in recursosTs" v-bind:key="recursosT.id">
                    <tr class="text-center">
                        <td>{{recursosT.hypervisor_hostname}}</td>
                        <td>{{recursosT.host_ip}}</td>
                        <td>{{recursosT.local_gb}}</td>
                        <td>{{recursosT.free_disk_gb}}</td>
                        <td>{{(recursosT.memory_mb/1024).toFixed(1)}}</td>
                        <td>{{(recursosT.free_ram_mb/1024).toFixed(1)}}</td>
                        <td>{{recursosT.vcpus}}</td>
                        <td>{{(recursosT.vcpus - recursosT.vcpus_used)}}</td>
                        <td>{{recursosT.running_vms}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>

        <div class="row pl-3">
        <h3>Recursos Totales Telco: VMWare</h3>              
            <button @click="limpiarServer()"  class="btn-sm btn-success ml-2 mb-2" data-toggle="modal" data-target="#AddVMwareServer">
                <span data-toggle="tooltip" data-placement="top" title="Agregar servidor"><i class="fas fa-plus"></i></span>
            </button> 
        </div>
<!-- MODAL añadir servidor VMWARE   -->

        <div class="modal fade" id="AddVMwareServer" tabindex="-1" role="dialog" aria-labelledby="ModalAdd" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">

            <div class="modal-header text-white bg-primary">
                <h5 class="modal-title modal-dark"><b>Añadir Servidor VMware</b></h5>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button> 
            </div>

            <div class="modal-body">
                
                <span class="text-danger">Esta información sirve de control, 
                                          contraste con los datos que se observan en vSphere 
                                          y en la información de gestión.</span><br><br>
                       
                <form id="formAddServer">
                                     
                <label>Nombre Host: * </label> 
                <span class="text-secondary">  </span> <br>
                <input v-model="servidorVMware.nombre" type="text" id="nombre_host" class="form-control" placeholder="Blade#_genX  ( # Bahía en la que se ubica el servidor)" ><br>                                                          
                                                
                <label>IP del Host: * </label> <br>
                <input v-model="servidorVMware.direccion_ip" type="text" id="direccion_IP" class="form-control" placeholder="X.X.X.X  (IP, para acceder desde vSphere)"><br>                                                          
                      
                <label>Almacenamiento (Gb): * </label> <br>
                <input v-model="servidorVMware.disco_duro_blade" type="number" id="disco_duro" class="form-control" min="0" placeholder="Ingresar Almacenamiento"><br>                                                          
                     
                <label>RAM (Gb): * </label> <br>
                <input v-model="servidorVMware.ram_blade" type="number" id="ram" class="form-control" min="0" placeholder="Ingresar RAM"><br>                                                          
                  
                <label>VCPU: * </label> <br>
                <input v-model="servidorVMware.cpu_blade" type="number" id="cpu" class="form-control" min="0" placeholder="Ingresar número de CPU"><br>                                                          
                  
                <div class="form-group">
                    <label>Sobre asignación CPU (%): </label> <br>
                    <span class="text-secondary">Permite asignar más recursos de procesamiento, 
                                                 verifique el uso de CPU entregado por vSphere y
                                                 asigne más o menos % de sobreasignación de CPU. 
                                                 Una ves creado el servidor, se puede modificar este campo. </span><br><br>
                    <div class="form-group d-flex justify-content-center w-75">                                         
                      <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                        <input v-model="servidorVMware.sobreasignacion_cpu" type="range" class="form-control" id="sobreasignacion"  min="1" max="40" required>                                            
                      <span class="font-weight-bold text-primary ml-2 mt-1">{{servidorVMware.sobreasignacion_cpu}}</span>
                    </div>
                        
                </div>    
                   
                </form>
            </div>

                <div class="modal-footer">
                    <button @click="addServer()" type="button" class="btn btn-success" >Añadir</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">Cancelar</button>                                                                 
                </div> 
                            
            </div>
            </div>
            </div>



<!-- Mostrar los recursos de VMWARE  -->
        <div class="table-responsive">
        
        <table class=" table text-center table-responsive-xl table-striped table-hover w-auto">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Nombre Host</th>
                <th scope="col">ip Host</th>
                <th scope="col">Almacenamiento (Gb)</th>
                <th scope="col">Almacenamiento Asignable (Gb)</th>
                <th scope="col">RAM (Gb)</th>
                <th scope="col">RAM Asignable (Gb)</th>
                <th scope="col">CPU</th>
                <th scope="col">CPU Asignable</th>
                <th scope="col">VM corriendo</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody  v-for="servidorVMware in servidoresVMware" v-bind:key="servidorVMware._id" >
                     
            <tr class="text-center">
                <td>{{servidorVMware.nombre}}</td>
                <td>{{servidorVMware.direccion_ip}}</td>
                <td>{{servidorVMware.disco_duro_blade}}</td>
                <td>{{(servidorVMware.disco_duro_blade - servidorVMware.disco_duro_uso)}}</td>
                <td>{{(servidorVMware.ram_blade)}}</td>
                <td>{{(servidorVMware.ram_blade - servidorVMware.ram_blade_uso)}}</td>
                <td>{{servidorVMware.cpu_blade }}</td>
                <td>{{(servidorVMware.cpu_blade + (servidorVMware.cpu_blade*(parseInt(servidorVMware.sobreasignacion_cpu)/100)) - servidorVMware.cpu_blade_uso)}}</td>
                <td>{{servidorVMware.numero_vm}}</td>
                <td>    
                    <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                    
                        <button @click="getUnServidor(servidorVMware._id)" type="button" class="btn btn-success" data-toggle="modal"  data-target="#ModalEditarServidor" data-placement="top" title="Editar servidor"><i class="fas fa-edit"></i></button>
                        <button @click="getUnServidor(servidorVMware._id)" type="button" class="btn btn-danger" data-toggle="modal" data-target="#ModalEliminarServidor" data-placement="top" title="Eliminar servidor"><i class="fas fa-trash"></i></button>
                                                                           
                    </div>
                </td>
            </tr>
        </tbody>
        </table>
        </div>


<!--MODAL confirmar eliminar servidor  -->  
        <div class="modal fade bg-modal" id="ModalEliminarServidor" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header text-white bg-primary">
                <div class="modal-title" ><h4>Seguro que desea eliminar el servidor:</h4></div>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span> </button>
            </div>
        <div class="modal-body">

            <span class="text-danger">No puede eliminar el servidor si tiene recursos en uso</span><br>
            <span class="text-secondary">(los proyectos inactivos aún siguen ocupando el almacenamiento asignado)</span>
            <br><br>
                
            <label class="control-label"><b>Nombre Servidor: </b>{{servidorVMware.nombre}}</label><br>                
            <label class="control-label"><b>IP Servidor: </b>{{servidorVMware.direccion_ip}}</label><br> 
            <label class="control-label"><b>Almacenamiento en uso (Gb): </b>{{servidorVMware.disco_duro_uso}}</label><br>
            <label class="control-label"><b>RAM en uso (Gb): </b>{{servidorVMware.ram_blade_uso}}</label><br>
            <label class="control-label"><b>VCPU en uso (Gb): </b>{{servidorVMware.cpu_blade_uso}}</label><br>
            <label class="control-label"><b>VM Corriendo: </b>{{servidorVMware.numero_vm}}</label><br>
                
            <div class="text-center">
                <button class="btn btn-success" data-dismiss="modal"><b>Cancelar</b></button>
                <button @click="eliminarServidor()" class="btn btn-danger"><b>Eliminar!!!</b></button>
            </div>   
        </div>

        </div>
        </div>
        </div>


<!--MODAL EDITAR servidor  -->  
        <div class="modal fade bg-modal" id="ModalEditarServidor" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header text-white bg-primary">
                <div class="modal-title" ><h4>Servidor a Editar:</h4></div>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span> </button>
            </div>
        <div class="modal-body">
             
           <form id="formEditarServidor">
                                     
                <label>Nombre Host: * </label> 
                <span class="text-secondary">  </span> <br>
                <input v-model="servidorVMware.nombre" type="text" id="editar_nombre" class="form-control" ><br>                                                          
                                                
                <label>IP del Host: * </label> <br>
                <input v-model="servidorVMware.direccion_ip" type="text" id="editar_direccion" class="form-control" placeholder="X.X.X.X  (IP, para acceder desde vSphere)"><br>                                                          
                      
                <label>Almacenamiento (Gb): * </label> <br>
                <input v-model="servidorVMware.disco_duro_blade" type="number" id="editar_almacenamiento" class="form-control" min="0" placeholder="Ingresar Almacenamiento"><br>                                                          
                     
                <label>RAM (Gb): * </label> <br>
                <input v-model="servidorVMware.ram_blade" type="number" id="editar_ram" class="form-control" min="0" placeholder="Ingresar RAM"><br>                                                          
                  
                <label>VCPU: * </label> <br>
                <input v-model="servidorVMware.cpu_blade" type="number" id="editar_cpu" class="form-control" min="0" placeholder="Ingresar número de CPU"><br>                                                          
                  
                <div class="form-group">
                    <label>Sobre asignación CPU: {{servidorVMware.sobreasignacion_cpu}} (%) </label> <br>
                    <span class="text-secondary">Verifique el uso de CPU entregado por vSphere y
                                                 asigne más o menos % de sobreasignación de CPU.</span><br><br>
                    <div class="form-group d-flex justify-content-center w-75">                                         
                      <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                        <input v-model="servidorVMware.sobreasignacion_cpu" type="range" class="form-control" id="editar_sobreasignacion"  min="0" max="40" required>                                            
                      <span class="font-weight-bold text-primary ml-2 mt-1">{{servidorVMware.sobreasignacion_cpu}}</span>
                    </div>
                        
                </div>    
                   
                </form>  
            <div class="text-center">
                <button @click="editarServidor()" class="btn btn-success"><b>Editar</b></button>
                <button class="btn btn-danger" data-dismiss="modal"><b>Cancelar</b></button>
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
import axios from 'axios'
import VueComp from '@vue/composition-api'
import SidebarAdmin from '../SidebarAdmin.vue'
import VueyeTable from 'vueye-table'

import Token from '!!raw-loader!../../PanelAdmin/Token.txt'
const configG = require('../../../../config')

class servidorVMware{
    constructor(_id,nombre,direccion_ip,disco_duro_blade,disco_duro_uso,ram_blade,ram_blade_uso,cpu_blade,cpu_blade_uso,sobreasignacion_cpu,numero_vm){
        this._id = _id      
        this.nombre = nombre 
        this.direccion_ip = direccion_ip 
        this.disco_duro_blade = disco_duro_blade
        this.disco_duro_uso = disco_duro_uso
        this.ram_blade = ram_blade
        this.ram_blade_uso = ram_blade_uso
        this.cpu_blade = cpu_blade
        this.cpu_blade_uso = cpu_blade_uso
        this.sobreasignacion_cpu = sobreasignacion_cpu
        this.numero_vm = numero_vm
    }
}

export default {
    
    components:{        
        VueyeTable,
        SidebarAdmin
    },

    data(){
        return{
            //Definir el TOKEN
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
            servidorVMware: new servidorVMware(),
            recursosTs:[],
            servidoresVMware: []

        }
    },
    created(){
        this.getRecursosTelco();
        this.getRecursosVMware();

    },
   
    methods:{

        getRecursosTelco: async function(){
            //console.log('Se ingresa a recursosTelco')
            console.log('Se ingresa a recursosTelco ',this.config)
            await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/os-hypervisors/detail', this.config)
            .then(res => {
                //console.log(res);
                //console.log(res.data.hypervisors[0]);
                this.recursosTs = res.data.hypervisors;
            })
            .catch(error => { this.$toastr.e("Error al obtener los recursos de OpenStack: " + error ) });
        },
        getRecursosVMware: async function (){
            await axios.get('/api/recursos_telco')
            .then(res => {                
               this.servidoresVMware = res.data.content; 
               console.log(this.servidoresVMware) 
                 
            })
            .catch(error => { this.$toastr.e("Error al obtener los recursos de VMware: " + error ) });        
            
            if (this.servidoresVMware.length == 0 )
            {this.$toastr.i("No tiene servidores en VMware")}
        },
        limpiarServer(){                
            this.servidorVMware = new servidorVMware();                
        },
        getUnServidor: async function(_id){
            this.servidorVMware = new servidorVMware();   
            await axios.get('/api/recursos_telco/unservidor?_id='+_id)            
            .then(res => {
                this.servidorVMware = res.data.content;   
            })            
            .catch(error => { this.$toastr.e("Error al obtener este servidor: " + error )});
        },

        eliminarServidor: async function(){ 
            //await axios.delete('/api/recursos_telco?_id='+this.servidorVMware._id) 
            //this.getRecursosVMware();
            if( this.servidorVMware.disco_duro_uso != 0 || 
                this.servidorVMware.ram_blade_uso != 0  || 
                this.servidorVMware.cpu_blade_uso != 0  ||
                this.servidorVMware.numero_vm != 0 )
            {
               this.$toastr.e("No se puede eliminar este servidor. !!Hay recursos en uso")
            }
            else{
                await axios.delete('/api/recursos_telco?_id='+this.servidorVMware._id)            
                .then(res => {
                    this.getRecursosVMware(); 
                    this.$toastr.s("Servidor eliminado")
                    $('#ModalEliminarServidor').modal('hide') 

                })            
                .catch(error => { this.$toastr.e("Error al eliminar este servidor: " + error )});
            }
        },
        editarServidor: async function(){ 
            let info={
                    "_id": this.servidorVMware._id,
                    "nombre": this.servidorVMware.nombre, 
                    "direccion_ip": this.servidorVMware.direccion_ip, 
                    "disco_duro_blade": this.servidorVMware.disco_duro_blade,
                    "disco_duro_uso": this.servidorVMware.disco_duro_uso,
                    "ram_blade": this.servidorVMware.ram_blade,
                    "ram_blade_uso": this.servidorVMware.ram_blade_uso,
                    "cpu_blade": this.servidorVMware.cpu_blade,
                    "cpu_blade_uso": this.servidorVMware.cpu_blade_uso,
                    "numero_vm": this.servidorVMware.numero_vm,
                    "sobreasignacion_cpu": this.servidorVMware.sobreasignacion_cpu
                };             
                        
                await axios.put('/api/recursos_telco',info)
                .then(res => { 
                    this.$toastr.s("Servidor actualizado correctamente correctamente")
                     $('#ModalEditarServidor').modal('hide') 
                    this.getRecursosVMware();
                })
                .catch(error => { this.$toastr.e("Error al actualizar el servidor:" + error) });
               
            
        },

        addServer: async function(){ 
         //Se valida que esté la información obligatoria   
            if(this.servidorVMware.nombre && this.servidorVMware.direccion_ip && 
               this.servidorVMware.disco_duro_blade && this.servidorVMware.ram_blade &&
               this.servidorVMware.cpu_blade )
            {
                 let info={
                    "nombre": this.servidorVMware.nombre, 
                    "direccion_ip": this.servidorVMware.direccion_ip, 
                    "disco_duro_blade": this.servidorVMware.disco_duro_blade,
                    "ram_blade": this.servidorVMware.ram_blade,
                    "cpu_blade": this.servidorVMware.cpu_blade,
                    "sobreasignacion_cpu": parseInt(this.servidorVMware.sobreasignacion_cpu)
                };             
                        
                await axios.post('/api/recursos_telco',info)
                .then(res => { 
                    this.$toastr.s("El servidor: "+ this.servidorVMware.nombre +" fue creado correctamente")
                    $('#AddVMwareServer').modal('hide') 
                    this.getRecursosVMware(); 
                })
                .catch(error => { this.$toastr.e("Error al crear el servidor:" + error) });
                                    
            }
            else{
                this.$toastr.w("Hay información obligatoria")
            }
            
           
        },
        

    }
}
</script>
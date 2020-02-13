<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-sm-2 col-with-right-border">
                    <SidebarAdmin></SidebarAdmin>
                </div>
                <div class="col-sm-8">
                    <p>Descripción de las funciones que se pueden realizar en esta sección</p>
                    <div class="container">
                        <div class="accordion" id="accordionPU">
                            <!-- -->
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Recursos Telco
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <p>Infomación correspondiente a los recursos de la plataforma Telco 2.0</p>                                        
                                        <h3>Recursos Totales Telco: OpenStack</h3>
                                        <table class="text-center table-responsive-xl table-striped table-hover w-auto">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">Nombre Host</th>
                                                <th scope="col">ip Host</th>
                                                <th scope="col">Almacenamiento</th>
                                                <th scope="col">Almacenamiento libre</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">RAM libre</th>
                                                <th scope="col">CPU</th>
                                                <th scope="col">CPU libre</th>
                                                <th scope="col">VM corriendo</th>
                                                </tr>
                                            </thead>
                                            <tbody  v-for="recursosT in recursosTs" v-bind:key="recursosT.id">
                                                <tr>
                                                <td>{{recursosT.hypervisor_hostname}}</td>
                                                <td>{{recursosT.host_ip}}</td>
                                                <td>{{recursosT.local_gb+' Gb'}}</td>
                                                <td>{{recursosT.free_disk_gb+' Gb'}}</td>
                                                <td>{{(recursosT.memory_mb/1024).toFixed(1)+' Gb'}}</td>
                                                <td>{{(recursosT.free_ram_mb/1024).toFixed(1)+' Gb'}}</td>
                                                <td>{{recursosT.vcpus}}</td>
                                                <td>{{(recursosT.vcpus - recursosT.vcpus_used)}}</td>
                                                <td>{{recursosT.running_vms}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br>
                                        <h3>Recursos Totales Telco: VMWare</h3>
                                        <table class="text-center table-responsive-xl table-striped table-hover w-auto">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nombre Host</th>
                                                <th scope="col">ip Host</th>
                                                <th scope="col">Almacenamiento</th>
                                                <th scope="col">Almacenamiento libre</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">RAM libre</th>
                                                <th scope="col">CPU</th>
                                                <th scope="col">CPU libre</th>
                                                <th scope="col">VM corriendo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <th>-</th>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <h3>Info Recursos Plataforma T</h3>
                                        <div class="col">
                                            <div class="row-group text-center">
                                                <h4>Almacenamiento</h4>
                                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                                    <label class="btn btn-secondary active btn-sm">OpenStack
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option2" autocomplete="off"> VMWare
                                                    </label>
                                                </div>
                                                <div class="Chart">
                                                <h5 style="text-align:center;">Grafico</h5>
                                                <LineChart/>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row-group text-center">
                                                <h4>RAM</h4>
                                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                                    <label class="btn btn-secondary active btn-sm">
                                                        <input type="radio" name="options" id="option1" autocomplete="off" checked> OpenStack
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option2" autocomplete="off"> VMWare
                                                    </label>
                                                </div>
                                                <div class="Chart">
                                                <h5 style="text-align:center;">Grafico</h5>
                                                <LineChart/>
                                                </div>

                                            </div>
                                            <br>
                                            <div class="row-group text-center">
                                                <h4>CPU</h4>
                                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                                    <label class="btn btn-secondary active btn-sm">
                                                        <input type="radio" name="options" id="option1" autocomplete="off" checked> OpenStack
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option2" autocomplete="off"> VMWare
                                                    </label>
                                                </div>
                                                <div class="Chart">
                                                <h5 style="text-align:center;">Grafico</h5>
                                                <LineChart/>
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- -->
                            <div class="card">
                                <div class="card-header" id="headingTwo">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Proyectos Openstack
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">                                    
                                    <div class="card-body">
                                        <div>
                                            <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#ModalAddProject">
                                            <span data-toggle="tooltip" data-placement="top" title="Agregar proyecto"><i class="fas fa-plus"></i></span>
                                            </button>
                                            <!-- Modal -->
                                            <div class="modal fade" id="ModalAddProject" tabindex="-1" role="dialog" aria-labelledby="ModalAddProjectLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="ModalAddProjectLabel">Crear Proyecto</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form>
                                                        <div class="form-group text-left required">
                                                            <label class="control-label required" for="NombreProj">Nombre </label>
                                                            <input v-model="project.nombre" type="text" class="form-control" id="NombreProj" required placeholder="Ingresar Nombre">                                                          
                                                        </div>
                                                        <div class="form-group text-left required">
                                                            <label class="control-label" for="DescripcionProj">Descripción
                                                            </label>
                                                            <textarea v-model="project.descripcion" name="" id="DescripcionProj" rows="4" cols="40" class="form-control" placeholder="Ingresar Descripción"></textarea>   
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                                    <button v-on:click="addProject()" type="button" class="btn btn-primary" data-dismiss="modal">Crear</button>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div>
                                        <table class="table-responsive-xl table-striped table-hover w-auto text-center">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Descripción</th>
                                                <th scope="col">Propietario</th>
                                                <th scope="col">Almacenamiento</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">CPU</th>
                                                <th scope="col">#máquinas</th>
                                                <th scope="col">Fecha Inicio</th>
                                                <th scope="col">Fecha fin</th>
                                                <th scope="col">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody v-for="(project, index) in projects" v-bind:key="project.id">
                                                <tr>
                                                <th>{{index+1}}</th>
                                                <td>{{project.name}}</td>
                                                <td>{{project.description}}</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>
                                                    <div class="btn-group-sm" role="group" aria-label="Basic example">
                                                        <button v-on:click="deleteProject(project.id)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                                        
                                                    </div>
                                                </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- -->
                            <div class="card">
                                <div class="card-header" id="headingFour">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Máquinas Virtuales
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <button v-on:click="addServer()" type="button" class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Agregar máquina"><i class="fas fa-plus"></i></button>
                                        <table class="table-responsive-xl table-striped table-hover w-auto text-center">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Proyecto</th>
                                                <th scope="col">Propietario</th>
                                                <th scope="col">Nombre VM</th>
                                                <th scope="col">Creado</th>
                                                <th scope="col">SO</th>
                                                <th scope="col">Disco</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">CPU</th>
                                                <th scope="col">IP</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody v-for="(server, index) in servers" v-bind:key="server.id" >
                                                <tr>
                                                <th>{{index+1}}</th>
                                                <td>{{server.tenant_id}}</td>
                                                <td>-</td>
                                                <td>{{server.name}}</td>
                                                <td>{{server.created}}</td>
                                                <td>{{server.image.id}}</td>
                                                <td>{{server.flavor.id[0]+' Gb'}}</td>
                                                <td>{{server.flavor.id[1]+' Gb'}}</td>
                                                <td>{{server.flavor.id[2]+' vcpu'}}</td>
                                                <td>
                                                    {{server.addresses[Object.keys(server.addresses)[0]][1].addr}}
                                                    <!-- 
                                                    <template v-if="server.addresses.shared">{{server.addresses.shared[0].addr}}</template>
                                                    <template v-else-if="server.addresses.privada">{{server.addresses.privada[0].addr}}</template>
                                                    <template v-else-if="server.addresses.aiotest">{{server.addresses.aiotest[0].addr}}</template>
                                                    <template v-else-if="server.addresses.aio2">{{server.addresses.aio2[0].addr}}</template>
                                                    <template v-else-if="server.addresses.aio1">{{server.addresses.aio1[0].addr}}</template>
                                                    <template v-else-if="server.addresses.NetOpenstackDist">{{server.addresses.NetOpenstackDist[0].addr}}</template>
                                                    <template v-else> - </template>
                                                    -->
                                                </td>
                                                <td>{{server.status}}</td>
                                                <td>
                                                    <div class="btn-group-sm" role="group" aria-label="Basic example">
                                                        <div>
                                                            <!-- Material switch -->
                                                        </div>                                                        
                                                        <button v-on:click="consola(server.id)" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Abrir en consola"><i class="fas fa-expand"></i></button>
                                                        <button v-on:click="backup(server.id)" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Realizar Backup"><i class="fas fa-save"></i></button>
                                                        <button v-on:click="deleteServer(server.id)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                                        
                                                    </div>
                                                </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingFive">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    Estadísticas de funcionamiento
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <p>Definir cuales son las Estadísticas que se van a presentar inicialmente</p>

                                    </div>
                                </div>
                            </div>
                        </div>
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
import Token from '!!raw-loader!../PanelAdmin/Token.txt'
import LineChart from './Chart/LineChart.vue';
const configG = require('../../../config')

class Project{
    constructor(nombre,descripcion){
        this.nombre = nombre;
        this.descripcion= descripcion;
    }
}

export default{
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
            project: new Project(),
            recursosTs:[],
            servers:[],
            projects:[],
            flavor:[]
        }
    },
    created(){
        this.getrecursosTelco();
        this.getServers();
        this.getProjects();
    },
    components:{
        'SidebarAdmin': SidebarAdmin,
        'LineChart': LineChart
    },
    methods:{        
        //Se obtiene un arreglo con todos los servidores
         getServers: async function(){
            let server
            //console.log('Se ingresa a getServers')
            await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/servers/detail?all_tenants=True', this.config)
                .then(res => {
                    console.log(res.data.servers);
                    this.servers = res.data.servers;
                    //console.log(res.data.servers[4].addresses);
                })
                .catch(error => { console.log('Error ',error); });
                for await ( server of this.servers){
                    server.tenant_id = await this.getOneProject(server.tenant_id);
                    if (server.image.id) {
                        server.image.id = await this.getOneImage(server.image.id);                        
                    }
                    else{
                        server.image.id =server.image.id; 
                    }
                    server.flavor.id= await this.getOneFlavor(server.flavor.id);
                }
        },
        //Se obtiene el proyecto para nombre de proyecto. --Usar tenant_id--
        getOneProject: async function(id){
            let answer
            //console.log('Se ingresa  getOneProject')
            await axios.get('http://'+configG.ipOpenstack+'/identity/v3/projects/'+id,this.config)
                .then(res => {
                    //console.log(res.data.project.name)
                    answer= res.data.project.name;
                })
                .catch(error => { 
                    console.log('Error ',error);
                    answer="error";
                    });
            return answer;
        },
        getOneImage: async function(id){
            let answer
            //console.log('Se ingresa  getOneImage')
            await axios.get('http://'+configG.ipOpenstack+'/image/v2/images/'+id,this.config)
                .then(res => {
                    //console.log(res)
                    //console.log(res.data.name)
                    answer= res.data.name;
                })
                .catch(error => { 
                    console.log('Error ',error);
                    answer="error";
                    });
            return answer;
        },
        //Se obtiene un solo flavor
        getOneFlavor: async function(id){
            let answer=[] 
            //console.log('Se ingresa  getOneFlavor')
            await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/flavors/'+id, this.config)
                .then(res => {
                    //console.log(res.data);
                    answer[0] = res.data.flavor.disk;
                    answer[1] = res.data.flavor.ram;
                    answer[2] = res.data.flavor.vcpus;
                })
                .catch(error => { console.log('Error ',error); });
                return answer;
        },
        //
        //
        getProjects: async function(){
            await axios.get('http://'+configG.ipOpenstack+'/identity/v3/projects/', this.config)
                .then(res => {
                    //console.log(res.data.projects);
                    this.projects = res.data.projects;
                })
                .catch(error => { console.log('Error ',error); });                
        },
        //
        //
        //Recursos Telco
        getrecursosTelco: async function(){
            //console.log('Se ingresa a recursosTelco')
            await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/os-hypervisors/detail', this.config)
                .then(res => {
                    //console.log(res.data.hypervisors[0]);
                    this.recursosTs = res.data.hypervisors;
                })
                .catch(error => { console.log('Error ',error); });
        },
        //
        //
        //Buttons
        consola: async function(idServer){
            let data={
                "os-getVNCConsole": {
                    "type": "novnc"
                }
            };
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
                .then(res => {
                    //console.log(res.data)
                    window.open(res.data.console.url)
                })
                .catch(error => { console.log('Error ',error); });
        },
        deleteServer: async function(idServer){
            //console.log('Se ingresa a deleteServer')
            await axios.delete('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer,this.config)
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => { console.log('Error ',error); });
                this.getServers();
        },
        deleteProject: async function(idProject){
            await axios.delete('http://'+configG.ipOpenstack+'/identity/v3/projects/'+idProject,this.config)
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => { console.log('Error ',error); });
                this.getProjects();
        },
        addProject: async function(){
            //console.log('Se ingresa a addProject')
            let data={
                "project": {
                    "tags": [], 
                    "enabled": true, 
                    "description": this.project.descripcion, 
                    "name": this.project.nombre
                }
            };
            await axios.post('http://'+configG.ipOpenstack+'/identity/v3/projects',data,this.config)
                .then(res => {
                    //console.log(res.data)
                })
                .catch(error => { console.log('Error ',error); });
                this.getProjects();
                this.project = new Project();
        },
        addServer: async function(){
            console.log('Se ingresa a addServer')
            let data={
                "server": {
                    "name": "pruebaconhost",
                    "OS-DCF:diskConfig": "AUTO", 
                    "imageRef": "4ea30d31-e460-428e-9a32-4de90cabca2d", 
                    "flavorRef": "d1", 
                    "max_count": 1, 
                    "min_count": 1,
                    "host": "bl3-ProLiant-BL460c-Gen10",  
                    "networks": [{"uuid": "f8ac43ad-01cb-44e4-806c-112cd26b0fdb"}]
                }
            };
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers ',data,this.config)
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => { console.log('Error ',error); });
                this.getServers();
        },
        backup: async function(idServer){
            console.log('Se ingresa a backup')
        }      
    }
}
</script>
    <!--   -->

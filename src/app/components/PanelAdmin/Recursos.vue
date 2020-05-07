<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-sm-2 col-with-right-border">
                    <SidebarAdmin></SidebarAdmin>
                </div>
                <div class="col-sm-8 position-static">
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
                                        <div class="table-responsive">
                                        <table class="table text-center table-responsive-xl table-striped table-hover w-auto">
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
                                        </div>
                                        <br>
                                        <h3>Recursos Totales Telco: VMWare</h3>
                                        <div class="table-responsive">
                                        <table class=" table text-center table-responsive-xl table-striped table-hover w-auto">
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
                                        </div>
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
                                        <div class="table-responsive">
                                        <table class="table table-striped table-hover w-auto text-center">
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
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>}</td>
                                                <td></td>
                                                <td></td>                                                   
                                                <td>
                                                    <div class="btn-group-sm" role="group" aria-label="Basic example">
                                                        <button v-on:click="deleteProject(project)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                                        
                                                    </div>
                                                </td>
                                                </tr> 
                                            </tbody>
                                        </table>
                                        </div>
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
                                        <div class="table-responsive">
                                        <table class="table table-striped table-hover w-auto text-center">
                                            <thead class="thead-dark">
                                                <tr class="table-active">
                                                <th scope="col">#</th>
                                                <th scope="col">Proyecto</th>
                                                <th scope="col">Propietario</th>
                                                <th scope="col">Nombre VM</th>
                                                <th scope="col">Creado</th>
                                                <th scope="col">S.O.</th>
                                                <th scope="col">Disco</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">CPU</th>
                                                <th scope="col">IP</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody v-for="(server, index) in servers" v-bind:key="server.id" >
                                                <template v-if="server.status === 'ACTIVE'">
                                                    <tr class="table-success">
                                                        <th>{{index+1}}</th>
                                                        <td>{{server.tenant_id}}</td>
                                                        <td>-</td>
                                                        <td>{{server.name}}</td>
                                                        <td>{{server.created}}</td>
                                                        <td>{{server.image.id}}</td>
                                                        <td>{{server.flavor.id[0]+' Gb'}}</td>
                                                        <td>{{server.flavor.id[1]+' Mb'}}</td>
                                                        <td>{{server.flavor.id[2]+' vcpu'}}</td>
                                                        <td>
                                                            <!-- {{server.addresses[Object.keys(server.addresses)[0]][1].addr}}-->
                                                        </td>
                                                        <td>{{server.status}}</td>
                                                        <td>
                                                            <div class="dropdown dropleft">
                                                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    Action
                                                                </button>
                                                                <div class="dropdown-menu">
                                                                    <button v-on:click="editarServer(server.id)" type="button" class="btn btn-primary dropdown-item" data-toggle="tooltip" data-placement="top" title="Editar"><i class="fas fa-edit"></i> Editar</button>
                                                                    <button v-on:click="apagarServer(server.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Apagar"><i class="fas fa-power-off"></i> Apagar</button>
                                                                    <button v-on:click="reiniciarServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Reiniciar"><i class="fas fa-redo-alt"></i> Reiniciar</button>
                                                                    <button v-on:click="consola(server.id)" type="button" class="btn btn-secondary dropdown-item" data-toggle="tooltip" data-placement="top" title="Abrir en consola"><i class="fas fa-expand"></i> Abrir</button>
                                                                    <button v-on:click="backupServer(server.id)" type="button" class="btn btn-primary dropdown-item" data-toggle="tooltip" data-placement="top" title="Realizar Backup"><i class="fas fa-save"></i> Backup</button>
                                                                    <button v-on:click="pausarServer(server.id)" type="button" class="btn btn-warning dropdown-item" data-toggle="tooltip" data-placement="top" title="Pausar"><i class="fas fa-pause"></i> Pausar</button>
                                                                    <button v-on:click="bloquearServer(server.id)" type="button" class="btn btn-warning dropdown-item" data-toggle="tooltip" data-placement="top" title="Bloquear"><i class="fas fa-lock"></i> Bloquear</button>
                                                                    <button v-on:click="suspenderServer(server.id)" type="button" class="btn btn-warning dropdown-item" data-toggle="tooltip" data-placement="top" title="Suspender"><i class="fas fa-moon"></i> Suspender</button>
                                                                    <div class="dropdown-divider"></div>
                                                                    <button v-on:click="deleteServer(server.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i> Eliminar</button>
                                                                    <!--<button v-on:click="reconstruirServer(server.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Reconstruir"><i class="fas fa-circle-notch"></i> Reconstruir</button>-->
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </template>
                                                <template v-else-if="server.status === 'VERIFY_RESIZE'">
                                                    <tr class="table-danger">
                                                        <th>{{index+1}}</th>
                                                        <td>{{server.tenant_id}}</td>
                                                        <td>-</td>
                                                        <td>{{server.name}}</td>
                                                        <td>{{server.created}}</td>
                                                        <td>{{server.image.id}}</td>
                                                        <td>{{server.flavor.id[0]+' Gb'}}</td>
                                                        <td>{{server.flavor.id[1]+' Mb'}}</td>
                                                        <td>{{server.flavor.id[2]+' vcpu'}}</td>
                                                        <td>
                                                            <!-- {{server.addresses[Object.keys(server.addresses)[0]][1].addr}}-->
                                                        </td>
                                                        <td>{{server.status}}</td>
                                                        <td>
                                                            <div class="dropdown dropleft">
                                                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    Action
                                                                </button>
                                                                <div class="dropdown-menu">
                                                                    <button v-on:click="confirmEditarServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Desbloquear"><i class="far fa-check-circle"></i> Confirmar edición</button>
                                                                    <div class="dropdown-divider"></div>
                                                                    <button v-on:click="deleteServer(server.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i> Eliminar</button>
                                                                    <!--<button v-on:click="reconstruirServer(server.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Reconstruir"><i class="fas fa-circle-notch"></i> Reconstruir</button>-->
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </template>
                                                <template v-else>
                                                    <tr class="table-danger">
                                                        <th>{{index+1}}</th>
                                                        <td>{{server.tenant_id}}</td>
                                                        <td>-</td>
                                                        <td>{{server.name}}</td>
                                                        <td>{{server.created}}</td>
                                                        <td>{{server.image.id}}</td>
                                                        <td>{{server.flavor.id[0]+' Gb'}}</td>
                                                        <td>{{server.flavor.id[1]+' Mb'}}</td>
                                                        <td>{{server.flavor.id[2]+' vcpu'}}</td>
                                                        <td>
                                                            <!-- {{server.addresses[Object.keys(server.addresses)[0]][1].addr}}-->
                                                        </td>
                                                        <td>{{server.status}}</td>
                                                        <td>
                                                            <div class="dropdown dropleft">
                                                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    Action
                                                                </button>
                                                                <div class="dropdown-menu">
                                                                    <button v-on:click="encenderServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Encender"><i class="fas fa-power-off"></i> Encender</button>
                                                                    <button v-on:click="reanudarServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Reanudar"><i class="fas fa-tv"></i> Reanudar</button>
                                                                    <button v-on:click="consola(server.id)" type="button" class="btn btn-secondary dropdown-item" data-toggle="tooltip" data-placement="top" title="Abrir en consola"><i class="fas fa-expand"></i> Abrir</button>
                                                                    <button v-on:click="editarServer(server.id)" type="button" class="btn btn-primary dropdown-item" data-toggle="tooltip" data-placement="top" title="Editar"><i class="fas fa-edit"></i> Editar</button>
                                                                    <button v-on:click="reiniciarServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Reiniciar"><i class="fas fa-redo-alt"></i> Reiniciar</button>
                                                                    <button v-on:click="backupServer(server.id)" type="button" class="btn btn-primary dropdown-item" data-toggle="tooltip" data-placement="top" title="Realizar Backup"><i class="fas fa-save"></i> Backup</button>
                                                                    <button v-on:click="desPausarServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Despausar"><i class="fas fa-play"></i> Despausar</button>
                                                                    <button v-on:click="desBloquearServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Desbloquear"><i class="fas fa-lock-open"></i> Desbloquear</button>
                                                                    <div class="dropdown-divider"></div>
                                                                    <button v-on:click="deleteServer(server.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i> Eliminar</button>
                                                                    <!--<button v-on:click="reconstruirServer(server.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Reconstruir"><i class="fas fa-circle-notch"></i> Reconstruir</button>-->
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>                                                        
                                                </template>
                                            </tbody>
                                        </table>
                                        </div>
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
            configDelete:{
                'User-Agent': 'openstacksdk/0.36.0 keystoneauth1/3.18.0 python-requests/2.22.0 CPython/2.7.17',
                'X-Auth-Token':Token
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
            project: new Project(),
            recursosTs:[],
            servers:[],
            projects:[],
            pools:[],
            flavor:[]
        }
    },
    created(){
        this.getrecursosTelco();
        this.getServers();
        this.getProjects();
        //this.getPools();
    },
    components:{
        'SidebarAdmin': SidebarAdmin,
        'LineChart': LineChart
    },
    methods:{
        getPools: async function(){
            console.log('Se ingresa a getPools')
            let answer
            await axios.get('/api/pool_recursos/unpool?id_openstack='+id, configG.headersDataBase)
            .then(res => {
                console.log('Se muestra la respuesta del getPools')
                console.log(res.data.content)
                this.pools= res.data.contents
                this.comparacion()
            })
            .catch(error => { 
                console.log('Error en getPools',error);               
            });
        },
        comparacion: async function(){
            console.log('se ingresa a comparación')

        },   
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
                .catch(error => { console.log('Error getServers',error); });
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
                    console.log('Error getOneProject ',error);
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
                    console.log('Error getOneImage',error);
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
                .catch(error => { console.log('Error getOneFlavor',error); });
                return answer;
        },
        //
        //
        getProjects: async function(){
            await axios.get('http://'+configG.ipOpenstack+'/identity/v3/projects/', this.config)
                .then(res => {
                    console.log(res.data.projects);
                    this.projects = res.data.projects;
                })
                .catch(error => { console.log('Error getProjects',error); });                
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
            .catch(error => { console.log('Error getrecursosTelco',error); });
        },
        //
        //
        //Buttons
        deleteProject: async function(info){
            //Delete project openstack
            await axios.delete('http://'+configG.ipOpenstack+'/identity/v3/projects/'+info.id,this.config)
                .then(res => {
                    console.log('Respuesta delete project',res)
                })
                .catch(error => { console.log('Error en deleteProject ',error); });
            //get user openstack
            await axios.get('http://'+configG.ipOpenstack+'/identity/v3/users?name='+info.name,this.config)
                .then(res => {
                    console.log('Respuesta get user',res.data.users[0].id)
                    this.deleteUser(res.data.users[0].id)
                })
                .catch(error => { console.log('Error en get user ',error); });
            //get network
            await axios.get('http://'+configG.ipOpenstack+':9696/v2.0/networks?name='+info.name+'-net',this.config)
                .then(res => {
                    console.log('Respuesta get network',res.data.networks[0].id)
                    this.deleteNetwork(res.data.networks[0].id)
                })
                .catch(error => { console.log('Error en get network ',error); });
            //get subnetwork 
            await axios.get('http://'+configG.ipOpenstack+':9696/v2.0/subnets?name='+info.name+'-subnet',this.config)
                .then(res => {
                    console.log('Respuesta get subnetwork',res.data.subnets[0].id)
                    this.deleteSubnetwork(res.data.subnets[0].id)
                })
                .catch(error => { console.log('Error en get subnetwork ',error); });
            //get Router
            await axios.get('http://'+configG.ipOpenstack+':9696/v2.0/routers?name='+info.name+'-router',this.config)
                .then(res => {
                    console.log('Respuesta get router',res.data.routers[0].id)
                    this.deleteRouter(res.data.routers[0].id)
                })
                .catch(error => { console.log('Error en get get ',error); });
            //Delete pool from database
            await axios.delete('/api/pool_recursos?id_openstack='+info.id, configG.headersDataBase)
                .then(res => { 
                        console.log('Respuesta del delete pool bd ',res)
                    })
                .catch(error => { console.log('Error en deletepool',error); });
                this.getProjects();
        },
        deleteUser: async function(userId){
            await axios.delete('http://'+configG.ipOpenstack+'/identity/v3/users/'+userId,this.config)
                .then(res => {
                    console.log('Respuesta delete user',res)
                })
                .catch(error => { console.log('Error en delete user ',error); });
        },
        deleteNetwork: async function(netId){
            await axios.delete('http://'+configG.ipOpenstack+':9696/v2.0/networks/'+netId,this.configDelete)
                .then(res => {
                    console.log('Respuesta delete network',res)
                })
                .catch(error => { console.log('Error en delete network ',error); });     
        },
        deleteSubnetwork: async function(subnetId){
            await axios.delete('http://'+configG.ipOpenstack+':9696/v2.0/subnets/'+subnetId,this.configDelete)
                .then(res => {
                    console.log('Respuesta delete subnetwork',res)
                })
                .catch(error => { console.log('Error en delete subnetwork ',error); });       
        },
        deleteRouter: async function(routerId){
            await axios.delete('http://'+configG.ipOpenstack+':9696/v2.0/routers/'+routerId,this.configDelete)
                .then(res => {
                    console.log('Respuesta delete router',res)
                })
                .catch(error => { console.log('Error en delete router ',error); });
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
                    console.log(res.data)
                })
                .catch(error => { console.log('Error addProject',error); });
                this.getProjects();
                this.project = new Project();
        },
//SERVER//
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
                    "networks": [{"uuid": "f8ac43ad-01cb-44e4-806c-112cd26b0fdb"}]
                }
            };
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers',data,this.config)
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => { console.log('Error addServer',error); });
                this.getServers();
        },
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
                .catch(error => { console.log('Error consola',error); });
        },
        deleteServer: async function(idServer){
            //console.log('Se ingresa a deleteServer')
            await axios.delete('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer,this.config)
                .then(res => {
                    console.log(res)
                })
                .catch(error => { console.log('Error deleteServer',error); });
                this.getServers();
        },
        backupServer: async function(idServer){
            console.log('Se ingresa a backup')
        },
        apagarServer: async function(idServer) {
            console.log('Se ingresa a apagar')
            let data={ "os-stop": null }
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error apagarServer',error); });
            this.getServers();
        },
        encenderServer: async function(idServer) {
            console.log('Se ingresa a encender')
            let data={ "os-start": null }
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error encenderServer',error); });
            this.getServers();
        },
        editarServer: async function(idServer) {
            console.log('Se ingresa a editar')
            let data={"resize": {"flavorRef": "d2"}}
            // para revertir {"revertResize": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error editarServer',error); });
            this.getServers();
        },
        confirmEditarServer: async function(idServer){
            console.log('Se ingresa a confirmEditarServer')
            let data={"confirmResize": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error confirmEditarServer',error); });
            this.getServers();
        },
        reiniciarServer: async function(idServer) {
            console.log('Se ingresa a reiniciar')
            let data={"reboot": {"type": "SOFT"}}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error reiniciarServer',error); });
            this.getServers();
        },
        pausarServer: async function(idServer) {
            console.log('Se ingresa a pausar')
            let data={"pause": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error pausarServer',error); });
            this.getServers();
        },
        desPausarServer: async function(idServer) {
            console.log('Se ingresa a despausar')
            let data={"unpause": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error desPausarServer',error); });
            this.getServers();
        },
        bloquearServer: async function(idServer) {
            console.log('Se ingresa a bloquear')
            let data={"lock": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error bloquearServer',error); });
            this.getServers();
        },
        desBloquearServer: async function(idServer) {
            console.log('Se ingresa a desbloquear')
            let data={"unlock": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error desBloquearServer',error); });
            this.getServers();
        },
        suspenderServer: async function(idServer) {
            console.log('Se ingresa a suspender')
            let data={"suspend": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error suspenderServer',error); });
            this.getServers();
        },
        reanudarServer: async function(idServer) {
            console.log('Se ingresa a reanudar')
            let data={"resume": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error reanudarServer',error); });
            this.getServers();
        },
        reconstruirServer: async function(idServer) {
            console.log('Se ingresa a reanudar')
            let data={"resume": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error  en reconstruirServer',error); });
            this.getServers();
        }
    }
}
</script>
    <!--   -->

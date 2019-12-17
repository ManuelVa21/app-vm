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
                                        <h3>Recursos Totales Telco</h3>
                                        <table class="table-responsive-xl table-striped table-hover w-auto">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">Almacenamiento</th>
                                                <th scope="col">Almacenamiento libre</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">RAM libre</th>
                                                <th scope="col">CPU</th>
                                                <th scope="col">CPU libre</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <th scope="row">-</th>
                                                <th scope="row">-</th>
                                                <th scope="row">-</th>
                                                <th scope="row">-</th>
                                                <th scope="row">-</th>
                                                <th scope="row">-</th>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <h3>Info Recursos Blade</h3>
                                        <div class="col">
                                            <div class="row-group text-center">
                                                <h4>Almacenamiento</h4>
                                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                                    <label class="btn btn-secondary active btn-sm">
                                                        <input type="radio" name="options" id="option1" autocomplete="off" checked> Blade 1
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option2" autocomplete="off"> Blade 2
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option3" autocomplete="off"> Blade 3
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option4" autocomplete="off"> Blade 4
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option5" autocomplete="off"> Blade 5
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
                                                        <input type="radio" name="options" id="option1" autocomplete="off" checked> Blade 1
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option2" autocomplete="off"> Blade 2
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option3" autocomplete="off"> Blade 3
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option4" autocomplete="off"> Blade 4
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option5" autocomplete="off"> Blade 5
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
                                                        <input type="radio" name="options" id="option1" autocomplete="off" checked> Blade 1
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option2" autocomplete="off"> Blade 2
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option3" autocomplete="off"> Blade 3
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option4" autocomplete="off"> Blade 4
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option5" autocomplete="off"> Blade 5
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
                                        <table class="table-responsive-xl table-striped table-hover w-auto">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Propietario</th>
                                                <th scope="col">Descripción</th>
                                                <th scope="col">Almacenamiento</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">CPU</th>
                                                <th scope="col">#máquinas</th>
                                                <th scope="col">Fecha Inicio</th>
                                                <th scope="col">Fecha fin</th>
                                                </tr>
                                            </thead>
                                            <tbody v-for="(project, index) in projects" v-bind:key="project.id">
                                                <tr>
                                                <th scope="row">{{index+1}}</th>
                                                <td>{{project.name}}</td>
                                                <td>{{project.description}}</td>
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
                                                <!--<td>{{getOneProject(server.tenant_id)}}</td> -->
                                                <td>{{server.tenant_id}}</td>
                                                <td>-</td>
                                                <td>{{server.name}}</td>
                                                <td>{{server.created}}</td>
                                                <!--<td><template v-if="server.image.id">
                                                    {{server.image.id}}
                                                    </template>
                                                    <template v-else> - </template>
                                                </td>-->
                                                <td>{{server.image.id}}</td>
                                                <td>{{flavor[0]}}</td>
                                                <td>{{flavor[1]}}</td>
                                                <td>{{flavor[2]}}</td>
                                                <td>
                                                    <template v-if="server.addresses.shared">{{server.addresses.shared[0].addr}}</template>
                                                    <template v-else-if="server.addresses.aiotest">{{server.addresses.aiotest[0].addr}}</template>
                                                    <template v-else-if="server.addresses.aio2">{{server.addresses.aio2[0].addr}}</template>
                                                    <template v-else-if="server.addresses.aio1">{{server.addresses.aio1[0].addr}}</template>
                                                    <template v-else-if="server.addresses.NetOpenstackDist">{{server.addresses.NetOpenstackDist[0].addr}}</template>
                                                    <template v-else> - </template>
                                                </td>
                                                <td>{{server.status}}</td>
                                                <td>
                                                    <div class="btn-group-sm" role="group" aria-label="Basic example">
                                                        <div>
                                                            <!-- Material switch -->
                                                            <div class="checkbox">
                                                            <label>
                                                                <button type="button" class="btn btn-sm btn-secondary btn-toggle" data-toggle="button" aria-pressed="false" autocomplete="off">
                                                                <div class="handle"></div>
                                                            </button>
                                                            </label>
                                                            </div>
                                                        </div>
                                                        <button type="button" class="btn btn-primary">Editar</button>
                                                        <button type="button" class="btn btn-danger">Eliminar</button>
                                                        <button type="button" class="btn btn-success">Consola</button>
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
import LineChart from './Chart/LineChart.vue'

export default{
    data(){
        return{
            config:{
                headers:{
                'X-Auth-Token':Token,
                'Access-Control-Allow-Origin': '10.55.6.39',
                'Access-Control-Allow-Credentials':'true',
                'Access-Control-Expose-Headers': 'Authorization',
                'Access-Control-Max-Age':'86400',
                'Content-Type': 'application/json'
                }
            },
            servers:[],
            projects:[],
            flavor:[]
        }
    },
    created(){
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
            console.log('Se ingresa  getServers')
            let server
            await axios.get('http://10.55.2.24/compute/v2.1/servers/detail?all_tenants=True', this.config)
                .then(res => {
                    //console.log(res.data);
                    //console.log(res.data.servers);
                    //console.log(res.data.servers[0].name);
                    this.servers = res.data.servers;
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
                    await this.getOneFlavor(server.flavor.id);                    
                    //console.log(this.flavor)
                }
        },
        //Se obtiene el proyecto para nombre de proyecto. --Usar tenant_id--
        getOneProject: async function(id){
            let answer
            //console.log('Se ingresa  getOneProject')
            await axios.get('http://10.55.2.24/identity/v3/projects/'+id,this.config)
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
            await axios.get('http://10.55.2.24/image/v2/images/'+id,this.config)
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
            //let answer 
            this.flavor=[];
            //console.log('Se ingresa  getOneFlavor')
            return axios.get('http://10.55.2.24/compute/v2.1/flavors/'+id, this.config)
                .then(res => {
                    //console.log(res.data);
                    this.flavor[0] = res.data.flavor.disk;
                    this.flavor[1] = res.data.flavor.ram;
                    this.flavor[2] = res.data.flavor.vcpus;
                })
                .catch(error => { console.log('Error ',error); });
                //return flavor;
        },
        //
        //
        getProjects: async function(){
            console.log('Se ingresa  getProjects')
            await axios.get('http://10.55.2.24/identity/v3/projects/', this.config)
                .then(res => {
                    //console.log(res.data.projects);
                    this.projects = res.data.projects;
                })
                .catch(error => { console.log('Error ',error); });                
        }
    }
}
</script>
    <!--   -->

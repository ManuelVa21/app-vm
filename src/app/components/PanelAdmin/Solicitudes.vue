<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-sm-2 col-with-right-border">
                    <SidebarAdmin></SidebarAdmin>
                </div>
                <div class="col-sm-8">
                    <div class="panel panel-info">
                        <p>Descripción de las funciones que se pueden realizar en esta sección</p>
                        <div class="container">
                            <div class="accordion" id="accordionPU">
                                <!-- Solicitud de Pool de recursos -->
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                        <button v-on:click="getSolicitudes('Pool de Recursos')" class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Solicitud de Pool de recursos
                                        </button>
                                    </h5>
                                    </div>
                                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionPU">
                                        <div class="card-body">
                                            <p>Lista de solicitudes de Pool de recursos</p>
                                            <table class="table-responsive-xl table-striped table-hover w-auto text-center">
                                                <thead class="thead-dark text-center">
                                                    <tr class="table-active">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Fecha solicitud</th>
                                                    <th scope="col">Usuario</th>
                                                    <th scope="col">Nombre Proyecto</th>
                                                    <th scope="col">Descripción</th>
                                                    <th scope="col">Tutor</th>
                                                    <th scope="col">Correo Tutor</th>
                                                    <th scope="col">Disco Duro</th>
                                                    <th scope="col">RAM</th>
                                                    <th scope="col">CPU</th>
                                                    <th scope="col">Fecha Finalización</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-for="(solicitud, index) in solicitudes" v-bind:key="solicitud.id">
                                                    <template v-if="solicitud.estado === false">
                                                        <tr class="table-danger">
                                                    <th>{{index+1}}</th>
                                                    <td>{{solicitud.fecha}}</td>
                                                    <td>{{solicitud.usuario}}</td> 
                                                    <td>{{solicitud.nombre_proyecto}}</td>
                                                    <td>{{solicitud.descripcion}}</td>
                                                    <td>{{solicitud.tutor}}</td> 
                                                    <td>{{solicitud.correo_tutor}}</td>
                                                    <td>{{solicitud.disco_duro+' Gb'}}</td>
                                                    <td>{{solicitud.ram+' Gb'}}</td>
                                                    <td>{{solicitud.cpu}}</td>
                                                    <td>{{solicitud.fecha_fin}}</td>
                                                    <td>Pendiente</td>
                                                    <td> 
                                                        <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                                            <button v-on:click="aceptarPool(solicitud)" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Aceptar"><i class="fas fa-check"></i></button>
                                                            <button v-on:click="negarSolicitud(solicitud._id,solicitud.tipo)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Rechazar"><i class="fas fa-times"></i></button>                                            
                                                        </div>
                                                    </td>                                              
                                                    </tr> 
                                                    </template>
                                                    <template v-else>
                                                    <tr class="table-success">
                                                    <th>{{index+1}}</th>
                                                    <td>{{solicitud.fecha}}</td>
                                                    <td>{{solicitud.usuario}}</td> 
                                                    <td>{{solicitud.nombre_proyecto}}</td>
                                                    <td>{{solicitud.descripcion}}</td>
                                                    <td>{{solicitud.tutor}}</td> 
                                                    <td>{{solicitud.correo_tutor}}</td>
                                                    <td>{{solicitud.disco_duro}}</td>
                                                    <td>{{solicitud.ram}}</td>
                                                    <td>{{solicitud.cpu}}</td> 
                                                    <td>{{solicitud.fecha_fin}}</td>
                                                    <td>Resuelto</td>
                                                    <td> 
                                                        <div class="btn-group-sm" role="group" aria-label="Basic example">
                                                            <button v-on:click="eliminarSolicitud(solicitud._id)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                               
                                                        </div>
                                                    </td>                                              
                                                    </tr>
                                                    </template>                                       
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- Solicitud de aumento de pool de recursos -->
                                <div class="card">
                                    <div class="card-header" id="headingTwo">
                                    <h5 class="mb-0">
                                        <button v-on:click="getSolicitudes('Aumento Pool de Recursos')" class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Solicitud de aumento de pool de recursos
                                        </button>
                                    </h5>
                                    </div>
                                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                                        <div class="card-body">
                                            <p>Lista de solicitudes de Aumento de Pool de recursos</p>
                                            <table class="table-responsive-xl table-striped table-hover w-auto">
                                                <thead class="thead-dark text-center">
                                                    <tr class="table-active">
                                                        <th scope="col">#</th>
                                                        <th scope="col">Fecha solicitud</th>
                                                        <th scope="col">Motivo</th>
                                                        <th scope="col">Usuario</th>
                                                        <th scope="col">Nombre Proyecto</th>
                                                        <th scope="col">Extensión de tiempo</th>
                                                        <th scope="col">Almacenamiento nuevo</th>
                                                        <th scope="col">RAM nueva</th>
                                                        <th scope="col">CPU nuevo</th>
                                                        <th scope="col">Estado</th>
                                                        <th scope="col">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-for="(solicitud, index) in solicitudes" v-bind:key="solicitud.id">
                                                    <template v-if="solicitud.estado === false">
						                            <tr class="table-danger">
                                                        <th>{{index+1}}</th>
                                                        <td>{{solicitud.fecha}}</td>
                                                        <td>{{solicitud.motivo}}</td> 
                                                        <td>{{solicitud.usuario}}</td>
                                                        <td>{{solicitud.nombre_proyecto}}</td>
                                                        <td>{{solicitud.aumento_fecha_fin}}</td> 
                                                        <td>{{solicitud.aumento_disco_duro+' Gb'}}</td> 
                                                        <td>{{solicitud.aumento_ram+' Gb'}}</td>
                                                        <td>{{solicitud.aumento_cpu+' vcpu'}}</td>
                                                        <td>Pendiente</td>
                                                        <td>
                                                        <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                                            <button v-on:click="aceptarAumento(solicitud)" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Aceptar"><i class="fas fa-check"></i></button>
                                                            <button v-on:click="negarSolicitud(solicitud._id,solicitud.tipo)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Rechazar"><i class="fas fa-times"></i></button>                                                   
                                                        </div>
                                                        </td>                                              
                                                    </tr>
                                                    </template>
                                                    <template v-else>
                                                    <tr class="table-success">
                                                        <th>{{index+1}}</th>
                                                        <td>{{solicitud.fecha}}</td>
                                                        <td>{{solicitud.motivo}}</td> 
                                                        <td>{{solicitud.usuario}}</td>
                                                        <td>{{solicitud.nombre_proyecto}}</td>
                                                        <td>{{solicitud.aumento_fecha_fin}}</td> 
                                                        <td>{{solicitud.aumento_disco_duro+' Gb'}}</td> 
                                                        <td>{{solicitud.aumento_ram+' Gb'}}</td>
                                                        <td>{{solicitud.aumento_cpu+' vcpu'}}</td>
                                                        <td>Resuelto</td>
                                                        <td>
                                                            <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                                                <button v-on:click="eliminarSolicitud(solicitud._id,solicitud.tipo)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                                    
                                                            </div>
                                                        </td>                                              
                                                    </tr>
                                                    </template>                                           
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- Solicitud de backup -->
                                <div class="card">
                                    <div class="card-header" id="headingThree">
                                    <h5 class="mb-0">
                                        <button v-on:click="getSolicitudes('Backup')" class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Solicitud de backup
                                        </button>
                                    </h5>
                                    </div>                              
                                    <div id="collapseThree" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                                        <div class="card-body">
                                            <p>Lista de solicitudes de Backup</p>
                                            <table class="table-responsive-xl table-striped table-hover w-auto">
                                                <thead class="thead-dark text-center">
                                                    <tr class="table-active">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Fecha solicitud</th>
                                                    <th scope="col">Usuario</th>                                                    
                                                    <th scope="col">Nombre Proyecto</th>
                                                    <th scope="col">Motivo</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-for="(solicitud, index) in solicitudes" v-bind:key="solicitud.id">
                                                    <template v-if="solicitud.estado === false">
						                                <tr class="table-danger">
                                                        <th>{{index+1}}</th>
                                                        <td>{{solicitud.fecha}}</td>
                                                        <td>{{solicitud.usuario}}</td> 
                                                        <td>{{solicitud.nombre_proyecto}}</td>
                                                        <td>{{solicitud.motivo}}</td>
                                                        <td>Pendiente</td>
                                                        <td>
                                                            <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                                                <button v-on:click="aceptarBackup()" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Aceptar"><i class="fas fa-check"></i></button>
                                                                <button v-on:click="negarSolicitud()" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Rechazar"><i class="fas fa-times"></i></button>                                                  
                                                            </div>
                                                        </td>
                                                        </tr>
                                                    </template>
                                                    <template v-else>
                                                        <tr class="table-success">
                                                        <th>{{index+1}}</th>
                                                        <td>{{solicitud.fecha}}</td>
                                                        <td>{{solicitud.usuario}}</td> 
                                                        <td>{{solicitud.nombre_proyecto}}</td>
                                                        <td>{{solicitud.motivo}}</td>
                                                        <td>Resuelto</td>
                                                        <td>
                                                            <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                                                <button v-on:click="eliminarSolicitud(solicitud._id,solicitud.tipo)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                        
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
const configG = require('../../../config')

export default{
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
            solicitudes:[]
        }
    },
    created(){
        //this.getSolicitudesPool();
        //this.getStorage();

    },
    components:{
        'SidebarAdmin': SidebarAdmin
    },
    methods:{
        getStorage: async function(){
            console.log('Se ingresa a get storage')
            var storage;
            try {
                if (localStorage.getItem) {
                    storage = localStorage;
                    console.log('se muestra el storage')
                    console.log(storage)
                }
            } catch(e) {
                storage = {};
            }
        },
        getSolicitudes: async function(tipo){
            //console.log('Se ingresa a getSolicitudesPool')
            await axios.get('/api/solicitudes?tipo='+tipo)
            .then(res => {
                //console.log('Se muestra respuesta get')
                console.log(res.data.content);
                this.solicitudes = res.data.content;                    
            })
            .catch(error => { console.log('Error ',error); });
        },
        //Acciones
        aceptarPool: async function(info){
            console.log('Se ingresa a aceptarPool')
            console.log('Se muestra la info')
            console.log(info)
            this.createUsuario(info)
            this.createProyecto(info)
            this.createPool(info)
            this.cambiarEstado(info._id)
            this.getSolicitudes(info.tipo)
        },
        aceptarAumento: async function(info){

        },
        aceptarBackup: async function(info){

        },
        negarSolicitud: async function(id,tipo){
            console.log('Se ingresa a negarPool')
            this.cambiarEstado(id)
            this.getSolicitudes(tipo)
        },
        eliminarSolicitud: async function(id,tipo){
            //console.log('Se ingresa a eliminarSolicitud')
            await axios.delete('/api/solicitudes?_id='+id, this.config)
            .then(res => { 
                //console.log(res)
                this.getSolicitudes(tipo)
                })
            .catch(error => { console.log('Error ',error); });
        },
        createUsuario: async function(info){
            //Se crea el registro del usuario
            console.log('Se ingresa crear usuario')
            //console.log(info)
            if (info.categoria_us === 'Estudiante') {
                await axios.post('/api/usuarios',{
                    nombre: info.usuario,
                    correo: info.correo,
                    categoria_us: info.catUsuario,
                    tutor_proy: info.tutor,
                    correo_tutor: info.correo_tutor,
                    pool_asociado: info.nombre_proyecto
                },this.config)
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error ',error); });
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
            //Se crea el proyecto en openstack
            console.log('Se muestra el info desde crear proyecto')
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
                .then(res => { console.log(res) })
                .catch(error => { console.log('Error ',error); });
        },
        createPool: async function(info){
            console.log('Se ingresa a crear pool en la bd')
            await axios.post('/api/pool_recursos',{
                nombre_proyecto: info.nombre_proyecto,
                contrasena: info.contrasenap,
                descripcion: info.descripcion,
                propietario: info.usuario,
                numero_vm: info.numvm,
                disco_duro: info.disco_duro,
                ram: info.ram,
                cpu: info.cpu,
                fecha_fin: info.usuario.fecha_fin
            },this.config)
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error ',error); });
        },
        cambiarEstado: async function(id){
            console.log('Se va a cambiar el estado de la solicitud')
            await axios.put('/api/solicitudes/'+id,{estado: true }, this.config)
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error ',error); });
        }
    }
}
</script>
    <!--   -->


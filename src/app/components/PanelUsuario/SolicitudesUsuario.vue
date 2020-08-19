<template>
    <div class="content">
        <div class="row">

        <div class="col-2 col-with-right-dorder">
            <SidebarUsuario></SidebarUsuario> 
        </div>

        <div class="col-10" style="padding-left: 0;">
            
        <div style=" float: right;">
            <router-link to="/PanelUsuario">Panel Usuario</router-link>
            <span>/</span>
            <strong class="final-path">Solicitudes</strong>
            <span>/</span>
        </div><br>
            
            <p>Descripción de las funciones que se pueden realizar en esta sección</p>
            <div class="container">

            <div class="accordion" id="accordionPU">
                <!-- Solicitud de Pool de recursos -->
                <div class="card">
                
                <div class="card-header" id="headingOne">
                    <h5 class="mb-0" style="display: flex; align-items: center">
                        <template v-if="pool === true">
                            <button disabled class="btn btn-outline-info btn-lg btn-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Pool de recursos
                            </button>
                        </template>
                        <template v-else>
                            <button  class="btn btn-outline-info btn-lg btn-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Pool de recursos
                            </button>
                        </template>
                    </h5>
                </div>

                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionPU">
                    <div class="card-body">
                        <form @submit.prevent="sendSolicitud('Pool de Recursos')">                                        
                                <div class="panel panel-default">
                                    <div class="panel-heading font-weight-bold">Información de usuario</div>
                                    <div class="panel-body">
                                        <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <div class="form-group">
                                                <label for="categoria">Categoría de usuario</label>
                                                <select v-model="solicitudpool.catUsuario" class="form-control" id="categoria" required>
                                                    <option selected>Seleccione categoría de usuario</option>
                                                    <option>Estudiante</option>
                                                    <option>Docente</option>
                                                    <option>Curso</option>
                                                </select>
                                            </div>                                                            
                                        </div>
                                        </div>                                                        
                                    </div>
                                </div>
                                <!-- Formulario para estudiantes -->
                                <template v-if="solicitudpool.catUsuario === 'Estudiante'">
                                    <div class="panel panel-default">
                                    <div class="panel-heading font-weight-bold">Información básica del proyecto</div>
                                        <div class="panel-body">
                                            <div class="form-row">
                                            <div class="form-group col-md-6">
                                            <div class="form-group">
                                                <label for="nombre">Nombre del proyecto</label>
                                                <input v-model="solicitudpool.nombrep" type="text" class="form-control" id="nombre" placeholder="Ingrese nombre del proyecto" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="nombretu">Nombre del tutor</label>
                                                <input v-model="solicitudpool.tutorp" type="text" class="form-control" id="nombretu" placeholder="Ingrese nombre del tutor" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="des">Descripción</label>
                                                <textarea v-model="solicitudpool.descripcionp" name="" id="des" cols="30" rows="10" placeholder="Ingrese descripción del proyecto"></textarea>
                                            </div>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="pass">Contraseña</label>
                                                    <input v-model="solicitudpool.contrasenap" type="password" class="form-control" id="pass" placeholder="Ingrese contraseña" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="emailtu">Correo tutor</label>
                                                    <input v-model="solicitudpool.correotp" type="email" class="form-control" id="emailtu" placeholder="Ingrese Correo del tutor" required>
                                                </div>
                                            </div>
                                            </div>                                                        
                                        </div>
                                    </div>
                                    <div class="panel panel-default">
                                        <div class="panel-heading font-weight-bold">Información de Recursos</div>
                                        <div class="panel-body">
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="disco">Disco duro</label>
                                                    <input v-model="solicitudpool.disco_duro" type="number" class="form-control" id="disco" placeholder="Seleccione el disco duro" min="1" max="30" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="cpu">CPU</label>
                                                    <input v-model="solicitudpool.cpu" type="number" class="form-control" id="cpu" placeholder="Seleccione CPU" min="1" max="8" required> 
                                                </div>                                                                
                                            </div>
                                            <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="ram">Ram</label>
                                                    <input v-model="solicitudpool.ram" type="number" class="form-control" id="ram" placeholder="Seleccione RAM" min="1" max="8" required>
                                                </div> 
                                                <div class="form-group">
                                                    <label for="fechafin">Fecha finalización del servicio</label>
                                                    <input v-model="solicitudpool.fechafin" class="form-control" type="date" id="fechafin" value="2020-01-01" min="2020-01-01" max="2025-12-31" required>
                                                </div>                                                            
                                            </div>
                                            <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="numvm">Número de máquinas virtuales</label>
                                                    <input v-model="solicitudpool.numvm" type="number" class="form-control" id="numvm" placeholder="Ingrese el número de máquinas virtuales" min="1" max="2" required>
                                                </div>                                                            
                                                </div>
                                            </div>                                                      
                                        </div>
                                    </div>
                                    <div class="text-center"><button type="submit" class="btn btn-primary">Enviar</button></div>
                                </template>
                                <!-- Formulario para docentes -->
                                <template v-else-if="solicitudpool.catUsuario === 'Docente'">
                                    <div class="panel panel-default">
                                    <div class="panel-heading font-weight-bold">Información básica del proyecto</div>
                                        <div class="panel-body">
                                            <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="nombre">Nombre del proyecto</label>
                                                    <input v-model="solicitudpool.nombrep" type="text" class="form-control" id="nombre" placeholder="Ingrese nombre del proyecto">
                                                </div>
                                                <div class="form-group">
                                                    <label for="des">Descripción</label>
                                                    <textarea v-model="solicitudpool.descripcionp" name="" id="des" cols="30" rows="10" placeholder="Ingrese descripción del proyecto"></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="pass">Contraseña</label>
                                                    <input v-model="solicitudpool.contrasenap" type="password" class="form-control" id="pass" placeholder="Ingrese contraseña" required>
                                                </div>
                                            </div>
                                            </div>                                                        
                                        </div>
                                    </div>
                                    <div class="panel panel-default">
                                        <div class="panel-heading font-weight-bold">Información de Recursos</div>
                                        <div class="panel-body">
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="disco">Disco duro</label>
                                                    <input v-model="solicitudpool.disco_duro" type="number" class="form-control" id="disco" placeholder="Seleccione el disco duro" min="1" max="60" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="cpu">CPU</label>
                                                    <input v-model="solicitudpool.cpu" type="number" class="form-control" id="cpu" placeholder="Seleccione CPU" min="1" max="16" required>
                                                </div>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="ram">Ram</label>
                                                    <input v-model="solicitudpool.ram" type="number" class="form-control" id="ram" placeholder="Seleccione RAM" min="1" max="16" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="fechafin">Fecha finalización del servicio</label>
                                                    <input v-model="solicitudpool.fechafin" type="date" class="form-control" id="fechafin" value="2020-01-01" min="2020-01-01" max="2025-12-31" required>
                                                </div>                                                            
                                            </div>
                                            <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="numvm">Número de máquinas virtuales</label>
                                                    <input v-model="solicitudpool.numvm" type="number" class="form-control" id="numvm" placeholder="Ingrese el número de máquinas virtuales" min="1" max="4" required>
                                                </div>                                                            
                                                </div>
                                            </div>                                                       
                                        </div>
                                    </div>
                                    <div class="text-center"><button type="submit" class="btn btn-primary">Enviar</button></div>
                                </template> 
                                <!-- Formulario para cursos -->
                                <template v-else-if="solicitudpool.catUsuario === 'Curso'">
                                    <div class="panel panel-default">
                                    <div class="panel-heading font-weight-bold">Información básica del proyecto</div>
                                        <div class="panel-body">
                                            <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="nombre">Nombre del curso</label>
                                                    <input v-model="solicitudpool.nombrep" type="text" class="form-control" id="nombre" placeholder="Ingrese nombre del curso" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="des">Descripción</label>
                                                    <textarea v-model="solicitudpool.descripcionp" name="" id="des" cols="30" rows="10" placeholder="Ingrese descripción del proyecto"></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="pass">Contraseña para el proyecto</label>
                                                    <input v-model="solicitudpool.contrasenap" type="password" class="form-control" id="pass" placeholder="Ingrese contraseña" required>
                                                </div>
                                            </div>
                                            </div>                                                        
                                        </div>
                                    </div>
                                    <div class="panel panel-default">
                                        <div class="panel-heading font-weight-bold">Información de Recursos</div>
                                        <div class="panel-body">
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="disco">Disco duro</label>
                                                    <input v-model="solicitudpool.disco_duro" type="number" class="form-control" id="disco" placeholder="Seleccione el disco duro" min="1" max="200" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="cpu">CPU</label>
                                                    <input v-model="solicitudpool.cpu" type="number" class="form-control" id="cpu" placeholder="Seleccione CPU" min="1" max="80" required>
                                                </div>                                                                                                                          
                                            </div>
                                            <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="ram">Ram</label>
                                                    <input v-model="solicitudpool.ram" type="number" class="form-control" id="ram" placeholder="Seleccione RAM" min="1" max="40" required>
                                                </div>  
                                                <div class="form-group">
                                                    <label for="fechafin">Fecha finalización del servicio</label>
                                                    <input v-model="solicitudpool.fechafin" type="date" class="form-control" id="fechafin" value="2020-01-01" min="2020-01-01" max="2025-12-31" required>
                                                </div>                                                            
                                            </div>
                                            <div class="form-group col-md-6">
                                                <div class="form-group">
                                                    <label for="numvm">Número de máquinas virtuales</label>
                                                    <input v-model="solicitudpool.numvm" type="number" class="form-control" id="numvm" placeholder="Ingrese el número de máquinas virtuales" min="1" max="20" required>
                                                </div>                                                            
                                                </div>
                                            </div>                                                       
                                        </div>
                                    </div>
                                    <div class="text-center"><button type="submit" class="btn btn-primary">Enviar</button></div>
                                </template>
                                <template v-else>
                                </template> 
                        </form>
                    </div>

                    </div>
                </div>
                <!-- Solicitud de aumento de pool de recursos -->
                <div class="card">

                <div class="card-header" id="headingTwo">
                    <h5 class="mb-0">
                        <template v-if="pool === true">
                            <button class="btn btn-outline-info btn-lg btn-block" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Aumento de pool de recursos
                            </button>
                        </template>
                        <template v-else>
                            <button disabled class="btn btn-outline-info btn-lg btn-block" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Aumento de pool de recursos
                            </button>
                        </template>
                    </h5>
                </div>
                
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                    <div class="card-body">
                        <p>Seleccione las características de su pool de recursos</p>
                        <form @submit.prevent="sendSolicitud('Aumento Pool de Recursos')">                                           
                            <div class="form-row">
                                <div class="form-group col-md-6">                                            
                                    <div class="form-group">
                                        <label for="Disco">Almacenamiento Actual: <b>{{this.Project.disco_duro}}</b></label>
                                        <input v-model="solicitudpool.disco_duro" type="number" class="form-control" id="Disco" placeholder="Seleccione el disco duro" min="1" max="100">
                                    </div>                                                    
                                    <div class="form-group">
                                        <label for="CPU">Número de Procesadores Actual: <b>{{this.Project.cpu}}</b></label>
                                        <input v-model="solicitudpool.cpu" type="number" class="form-control" id="CPU" placeholder="Seleccione CPU" min="1" max="50">
                                    </div>
                                    <div class="form-group">
                                        <label for="vms">Número de VM Actual: <b>{{this.Project.numero_vm}}</b></label>
                                        <input v-model="solicitudpool.numvm" type="number" class="form-control" id="vms" placeholder="Ingrese el número de máquinas virtuales" min="1" max="50">
                                    </div>                                                     
                                </div>
                                <div class="form-group col-md-6">
                                    <div class="form-group">
                                        <label for="RAM">Memoria RAM Actual: <b>{{this.Project.ram}}</b></label>
                                        <input v-model="solicitudpool.ram" type="number" class="form-control" id="RAM" placeholder="Seleccione RAM" min="1" max="50">
                                    </div>
                                    <div class="form-group">
                                        <label for="fechafin">Fecha Finalización Actual: <b>{{this.Project.fecha_fin}}</b></label>
                                        <input v-model="solicitudpool.fechafin" class="form-control" type="date" id="fechafin" value="2020-01-01" min="2020-01-01" max="2026-12-31">
                                    </div> 
                                </div>                                               
                            </div>
                            <div class="form-group">
                                <p>Por favor escriba el motivo por el cual desea ampliar sus recursos.</p>
                                <textarea v-model="solicitudpool.motivo" name="" id="" cols="30" rows="10" placeholder="Motivo de ampliación de recursos" required></textarea>
                            </div> 
                            <div class="text-center"><button type="submit" class="btn btn-primary">Enviar</button></div>
                        </form>
                    </div>
                    </div>
                </div>
                <!-- Solicitud de backup -->
                <div class="card">

                <div class="card-header" id="headingThree">
                    <h5 class="mb-0">
                        <template v-if="pool === true">
                            <button class="btn btn-outline-info btn-lg btn-block" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Backup
                            </button>
                        </template>
                        <template v-else>
                            <button disabled class="btn btn-outline-info btn-lg btn-block" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Backup
                            </button>
                        </template>
                    </h5>
                </div>

                <div id="collapseThree" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                    <div class="card-body">
                        <p>Diligencie los datos requeridos para realizar la solicitud de Backup</p>
                        <form @submit.prevent="sendSolicitud('Backup')">
                            <div class="form-group">
                                <div class="form-group col">
                                    <label for="maquina">Máquina virtual</label>
                                    <select v-model="solicitudpool.maquina" type="maquina" class="form-control" id="maquina" required>
                                        <option v-for="server in servers" v-bind:key="server.id">{{server.name}}</option>
                                    </select>
                                    
                                </div> 
                                <p>Por favor escriba el motivo por el cual desea realizar el Backup.</p>
                                <textarea v-model="solicitudpool.motivo" name="" id="" cols="30" rows="10" placeholder="Motivo de ampliación de recursos"></textarea>
                            </div>
                        <div class="text-center"><button type="submit" class="btn btn-primary">Enviar</button></div>
                        </form>
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
import SidebarUsuario from './SidebarUsuario.vue'
import Token from '!!raw-loader!../PanelAdmin/Token.txt'
const configG = require('../../../config')

class SolocitudPool{
    constructor(catUsuario,correo,nombrep,contrasenap,descripcionp,tutorp,correotp,numvm,disco_duro,ram,cpu,fechafin,motivo,maquina){
        this.catUsuario = catUsuario;
        this.correo = correo;
        this.nombrep = nombrep;
        this.contrasenap = contrasenap;
        this.descripcionp = descripcionp;
        this.tutorp = tutorp;
        this.correotp = correotp;
        this.numvm = numvm;
        this.disco_duro = disco_duro;
        this.ram = ram;
        this.cpu = cpu;
        this.fechafin= fechafin;
        this.motivo= motivo;
        this.maquina=maquina;
    }
}

export default {
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
            solicitudpool: new SolocitudPool(),
            storage:{},
            Project:[],
            servers: [],
            pool: false
        }
    },
    created(){
        this.getStorage()
    },
    components:{
        'SidebarUsuario': SidebarUsuario  
    },
    methods:{
        getStorage: async function(){
        //console.log('Se ingresa a get storage')            
        var storage;
        try {
          if (localStorage.getItem) {
              storage = JSON.parse(localStorage.getItem('userInfo'))
              //console.log('se muestra el storage ',storage)
              //console.log('se muestra el name ',storage.name)
              this.user = storage
              this.getPool(this.user.email)
          }
        } catch(e) {
            storage = {};
        }
      },
      getPool: async function(email){
            await axios.get('/api/pool_recursos/unpool?emailPropietario='+email)
                .then(res => {
                   //console.log(res.data);
                   if (res.data.status == '404' || res.data.status == '400') {
                      this.pool = "false";                      
                    }
                    else{
                        this.pool = true;
                        this.Project = res.data.content;
                        this.solicitudpool.nombrep = this.Project.nombre_proyecto
                        this.getServers(); 
                    }                    
                })
                .catch(error => { 
                    console.log('Error ',error);                    
                });            
        },
        getServers: async function(){
            let server
            await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/servers/detail?all_tenants=True&project_id='+this.Project.id_openstack, this.config)
            .then(res => {
            console.log(res.data.servers);
            this.servers = res.data.servers;
            })
            .catch(error => { console.log('Error en getServers',error); });                
        },
        limpiar: async function(){this.solicitudpool = new SolocitudPool()},
        sendSolicitud: async function(tipoSol){
            await axios.post('/api/solicitudes',{
                tipo: tipoSol,
                catUsuario: this.solicitudpool.catUsuario,
                usuario : this.user.name,
                correo: this.user.email,
                nombre_proyecto: this.solicitudpool.nombrep,
                contrasenap: this.solicitudpool.contrasenap,
                descripcion: this.solicitudpool.descripcionp,
                tutor: this.solicitudpool.tutorp,
                correo_tutor: this.solicitudpool.correotp,
                fecha_fin: this.solicitudpool.fechafin,
                numvm: this.solicitudpool.numvm,
                disco_duro: this.solicitudpool.disco_duro,
                ram: this.solicitudpool.ram,
                cpu: this.solicitudpool.cpu,
                motivo: this.solicitudpool.motivo,
                maquina: this.solicitudpool.maquina
                }, configG.headersDataBase)
                .then(res => { console.log(res) })
                .catch(error => { console.log('Error ',error); });
                this.solicitudpool = new SolocitudPool();
        }
    }
}
</script>
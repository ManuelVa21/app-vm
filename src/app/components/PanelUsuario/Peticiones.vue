<template>
    <div>
        <section>
            <div class="row">
                <div class="col-sm-2 col-with-right-dorder">
                    <SidebarUsuario></SidebarUsuario> 
                </div>
                <div class="col-sm-8">
                    <p>Descripción de las funciones que se pueden realizar en esta sección</p>
                    <div class="container">
                        <div class="accordion" id="accordionPU">
                            <!-- Solicitud de Pool de recursos -->
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Solicitud de Pool de recursos
                                    </button>
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
                                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Solicitud de aumento de pool de recursos
                                        </button>
                                    </template>
                                    <template v-else>
                                        <button disabled class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Solicitud de aumento de pool de recursos
                                        </button>
                                    </template>
                                </h5>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <p>Seleccione las características de su pool de recursos</p>
                                        <form @submit.prevent="sendSolicitud('Aumento Pool de Recursos')">
                                            <div class="form-group">
                                                <p>Por favor escriba el motivo por el cual desea ampliar sus recursos.</p>
                                                <textarea name="" id="" cols="30" rows="10" placeholder="Motivo de ampliación de recursos"></textarea>
                                            </div>                                            
                                            <div class="form-row">
                                                <div class="form-group col-md-6">                                            
                                                    <div class="form-group">
                                                        <label for="Disco">Almacenamiento Actual X</label>
                                                        <select type="Disco" class="form-control" id="Disco">
                                                            <option selected>Seleccione nuevo valor disco duro</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div>                                                    
                                                    <div class="form-group">
                                                        <label for="CPU">Número de Procesadores Actual X</label>
                                                        <select type="CPU" class="form-control" id="CPU">
                                                            <option selected>Seleccione nuevo valor de procesadores</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div>                                                    
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <div class="form-group">
                                                        <label for="RAM">Memoria RAM Actual X</label>
                                                        <select type="RAM" class="form-control" id="RAM">
                                                            <option selected>Seleccione nuevo valor de RAM</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="CPU">Fecha Finalización Actual X/X/X</label>
                                                        <select type="CPU" class="form-control" id="CPU">
                                                            <option selected>Seleccione nueva fecha finalización</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div> 

                                                </div>                                               

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
                                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Solicitud de backup
                                        </button>
                                    </template>
                                    <template v-else>
                                        <button disabled class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Solicitud de backup
                                        </button>
                                    </template>
                                </h5>
                                </div>                              
                                <div id="collapseThree" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <p>Aqui va el form de solicitud de backup</p>
                                        <form @submit.prevent="sendSolicitud('Backup')">
                                            <div class="form-group">
                                                <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <div class="form-group">
                                                        <label for="Proyecto">Proyecto</label>
                                                        <input v-model="solicitudpool.nombrep" type="text" class="form-control" id="Proyecto" placeholder="Ingrese el nombre del proyecto">
                                                    </div>                                                            
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <div class="form-group">
                                                        <label for="maquina">Máquina virtual</label>
                                                        <input v-model="solicitudpool.maquina" type="text" class="form-control" id="maquina" placeholder="Ingrese el nombre de la máquina" required>
                                                    </div>
                                                </div>
                                                </div>  
                                                <p>Por favor escriba el motivo por el cual desea ampliar sus recursos.</p>
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
        </section>
    </div>
</template>

<script>
import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarUsuario from './SidebarUsuario.vue'

class SolocitudPool{
    constructor(catUsuario,correo,nombrep,contrasenap,descripcionp,tutorp,correotp,numvm,disco_duro,ram,cpu,fechafin,aumento_fecha_fin,aumento_disco_duro,aumento_ram,aumento_cpu,motivo,maquina){
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
        this.aumento_fecha_fin = aumento_fecha_fin;
        this.aumento_disco_duro= aumento_disco_duro;
        this.aumento_ram= aumento_ram;
        this.aumento_cpu= aumento_cpu;
        this.motivo= motivo;
        this.maquina=maquina;
    }
}

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
            solicitudpool: new SolocitudPool(),
            storage:{},
            Project:[],
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
        console.log('Se ingresa a get storage')            
        var storage;
        try {
          if (localStorage.getItem) {
              storage = JSON.parse(localStorage.getItem('userInfo'))
              console.log('se muestra el storage ',storage)
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
                   console.log(res.data);
                   if (res.data.status == '404' || res.data.status == '400') {
                      this.pool = "false";                      
                    }
                    else{
                        this.pool = true;
                        this.Project = res.data.content; 
                    }                    
                })
                .catch(error => { 
                    console.log('Error ',error);                    
                });            
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
                aumento_fecha_fin: this.solicitudpool.aumento_fecha_fin,
                aumento_disco_duro: this.solicitudpool.aumento_disco_duro,
                aumento_ram: this.solicitudpool.aumento_ram,
                aumento_cpu: this.solicitudpool.aumento_cpu,
                motivo: this.solicitudpool.motivo,
                maquina: this.solicitudpool.maquina
                }, this.config)
                .then(res => { console.log(res) })
                .catch(error => { console.log('Error ',error); });
                this.solicitudpool = new SolocitudPool();
        }
    }
}
</script>
<template>
    <div class="content">
    <div class="row">

        <div class="col-2 col-with-right-dorder">
            <SidebarUsuario style="position: sticky; top: 75px"></SidebarUsuario> 
        </div>

        <div class="col-10 pl-0">
            
        <div class="mr-2" style=" float: right;">
            <span>/</span>
            <router-link to="/PanelUsuario">Mi Proyecto</router-link>
            <span>/</span>
            <strong class="final-path">Solicitudes</strong>
            <span>/</span>
        </div><br>

        <br><br>
        <div class="btn-group-vertical btn-group-lg mr-4" style="display: flex; align-items: center">   
            
            <template v-if="pool === true">
                <button  disabled class="btn btn-outline-info " data-toggle="modal" data-target="#ModalSolicitudPool">
                    Pool de recursos  </button>
                <button @click="igualarValores()" class="btn btn-outline-info" data-toggle="modal" data-target="#ModalSolicitudAumento" >
                    Aumento de pool de recursos  </button>
            
            </template>
            
            <template v-else> 
                <button @click="limpiar()" class="btn btn-outline-info " data-toggle="modal" data-target="#ModalSolicitudPool" >
                    Pool de recursos </button>
                <button disabled class="btn btn-outline-info " data-toggle="modal" data-target="#ModalSolicitudAumento">
                    Aumento de pool de recursos </button>
             
            </template>   
                     
        </div>
           
<!--#MODAL solicitud de pool de recursos -->           
        <div class="modal fade" id="ModalSolicitudPool" tabindex="-1" role="dialog" aria-labelledby="SolicitudPool" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">                
        
        <div class="modal-header text-white bg-primary">
            <h5 class="modal-title modal-dark" id="solicitudPool"><b>Recursos a solicitar</b></h5>
            <button  type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
                
        <div class="modal-body">
            
        <form @submit.prevent="sendSolicitud('Pool de Recursos')">                                        
            <div class="panel panel-default">
                <div class="panel-heading font-weight-bold">Información de usuario</div>
               <hr>
                <div class="panel-body">
                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <div class="form-group">
                            <label for="categoria">Categoría de usuario: </label>
                            <select v-model="solicitudPool.catUsuario" class="form-control" id="categoria" required>
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
            <template v-if="solicitudPool.catUsuario === 'Estudiante'">
                <div class="panel panel-default">
                <div class="panel-heading font-weight-bold">Información básica del proyecto</div>
                <span class="text-danger">La información debe ser verídica y lo más específica posible.</span>
                <hr>
                
                <div class="panel-body">
                <div class="form-row">
                <div class="form-group col-md-6">
                    <div class="form-group">
                        <label for="nombre">Nombre del proyecto: *</label>  
                        <input v-model="solicitudPool.nombrep" type="text" class="form-control" id="nombre" placeholder="Ingrese nombre del proyecto" required>
                    </div>
                    <div class="form-group">
                        <label for="nombretu">Nombre del tutor: *</label>
                        <input v-model="solicitudPool.tutor" type="text" class="form-control" id="nombretu" placeholder="Ingrese nombre del tutor" required>
                    </div>
                    <div class="form-group">
                        <label for="des">Descripción: *</label>
                        <textarea v-model="solicitudPool.descripcionp" type="text" id="des" cols="80" rows="4" placeholder="Ingrese una breve descripción del proyecto" required></textarea>
                    </div>
                </div>
                    <div class="form-group col-md-6">
                        <div class="form-group">
                            <label for="pass">Contraseña: *</label>
                            <span class=" text-small text-danger"> (Por favor utilice la misma contraseña de registro)</span>
                            <input v-model="solicitudPool.contrasenap" type="password" class="form-control" id="pass" placeholder="Ingrese contraseña" required>
                        </div>
                        <div class="form-group">
                            <label for="emailtu">Correo tutor: *</label>
                            <input v-model="solicitudPool.correo_tutor" type="email" class="form-control" id="emailtu" placeholder="Ingrese correo del tutor" required>
                        </div>
                    </div>
                </div>                                                        
                </div>
                </div>
                
                <div class="panel panel-default">
                    <div class="panel-heading font-weight-bold">Información de Recursos</div>
                        <span class="text-danger">Recuerda que los recursos solicitados se asignan como un pool para dividirlo entre las VM's solicitadas. 
                        Si requiere más recuros, agregar la información en la descripción y 
                        si posteriormente requiere más recursos, debe realizar una solicitud de aumento de pool de recursos.</span>
                    <hr>
                    
                    <div class="panel-body">
                    <div class="form-row">
                    <div class="form-group col-md-6">
                    
                        <div class="form-group">
                        <label for="disco">Disco duro (Gb): </label>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudPool.disco_duro" type="range" class="form-control" id="disco"  min="1" max="40" required>                                            
                              <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.disco_duro}}</span>
                            </div>              
                        </div>

                        <div class="form-group">
                            <label for="cpu">CPU: </label> <span class="text-secondary">(número de nucleos)</span>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudPool.cpu" type="range" class="form-control" id="cpu" min="1" max="8" required>                                             
                              <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.cpu}}</span>
                            </div>
                        </div>                                                                
                    </div>
                    
                    <div class="form-group col-md-6">
                        <div class="form-group">
                            <label for="ram">Ram (Gb): </label>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudPool.ram" type="range" class="form-control" id="ram" min="1" max="8" required>
                                <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.ram}}</span>
                            </div>
                        </div> 

                        <div class="form-group">
                            <label for="fechafin">Fecha finalización del servicio: *</label>
                            <input v-model="solicitudPool.fechafin" class="form-control" type="date" id="fechafin" value="2020-01-01" min="2020-01-01" max="2025-12-31" required>
                        </div>                                                            
                    </div>
                    
                    <div class="form-group col-md-6">
                        <div class="form-group">
                            <label for="numvm">Número de máquinas virtuales:</label>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudPool.numvm" type="range" class="form-control" id="numvm" min="1" max="2" required>
                            <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.numvm}}</span>
                            </div>
                        </div>                                                            
                    </div>
                    </div>                                                      
                    </div>
                </div>
                
                    <div class="text-center">
                        <button type="submit" class="btn btn-success">Enviar</button>
                        <button  type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                   </div>
            </template>
    <!-- Formulario para docentes -->
                
            <template v-else-if="solicitudPool.catUsuario === 'Docente'">
                <div class="panel panel-default">
                <div class="panel-heading font-weight-bold">Información básica del proyecto</div>
                <span class="text-danger">La información debe ser verídica y lo más específica posible.</span>                          
               <hr>
            
                <div class="panel-body">
                <div class="form-row">
                        
                    <div class="form-group col-md-6">
                        <div class="form-group">
                            <label for="nombre">Nombre del proyecto: *</label>
                            <input v-model="solicitudPool.nombrep" type="text" class="form-control" id="nombre" placeholder="Ingrese nombre del proyecto">
                        </div>
                        <div class="form-group">
                            <label for="des">Descripción: *</label>
                            <textarea v-model="solicitudPool.descripcionp" name="" id="des" cols="80" rows="4" placeholder="Ingrese descripción del proyecto"></textarea>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="form-group">
                            <label for="pass">Contraseña: *</label>
                            <span class=" text-small text-danger"> (Por favor utilice la misma contraseña de registro)</span>
                            <input v-model="solicitudPool.contrasenap" type="password" class="form-control" id="pass" placeholder="Ingrese contraseña" required>
                        </div>
                    </div>
                </div>                                                        
                </div>
                </div>                        
                <div class="panel panel-default">
                <div class="panel-heading font-weight-bold">Información de Recursos</div>
                    <span class="text-danger">Recuerda que los recursos solicitados se asignan como un pool para dividirlo entre las VM's solicitadas. 
                        Si requiere más recuros, agregar la información en la descripción y 
                        si posteriormente requiere más recursos, debe realizar una solicitud de aumento de pool de recursos.</span>
                    <hr>
                    <div class="panel-body">
                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <div class="form-group">
                            <label for="disco">Disco duro (Gb):</label>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudPool.disco_duro" type="range" class="form-control" id="disco"  min="1" max="80" required>                                            
                              <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.disco_duro}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="cpu">CPU: </label>
                            <span class="text-secondary">(número de nucleos)</span>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudPool.cpu" type="range" class="form-control" id="cpu"  min="1" max="16" required>                                            
                              <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.cpu}}</span>
                            </div>
                        </div>
                    </div>
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="ram">Ram (Gb):</label>
                                <div class="form-group d-flex justify-content-center w-75">                                         
                                  <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                    <input v-model="solicitudPool.ram" type="range" class="form-control" id="ram"  min="1" max="16" required>                                            
                                  <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.ram}}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="fechafin">Fecha finalización del servicio: *</label>
                                <input v-model="solicitudPool.fechafin" type="date" class="form-control" id="fechafin" value="2020-01-01" min="2020-01-01" max="2025-12-31" required>
                            </div>                                                            
                        </div>
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="numvm">Número de máquinas virtuales:</label>
                                <div class="form-group d-flex justify-content-center w-75">                                         
                                  <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                    <input v-model="solicitudPool.numvm" type="range" class="form-control" id="numvm"  min="1" max="4" required>                                            
                                  <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.numvm}}</span>
                                </div>
                            </div>                                                            
                            </div>
                        </div>                                                       
                    </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-success">Enviar</button>
                        <button @click="limpiar()" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                </div>
            </template> 
    <!-- Formulario para cursos -->
            <template v-else-if="solicitudPool.catUsuario === 'Curso'">
            <div class="panel panel-default">
            <div class="panel-heading font-weight-bold">Información básica del proyecto</div>
                <span class="text-danger">La información debe ser verídica y lo más específica posible.</span>                          
            <hr>
                <div class="panel-body">
                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="nombre">Nombre del curso: *</label>
                                <input v-model="solicitudPool.nombrep" type="text" class="form-control" id="nombre" placeholder="Ingrese nombre del curso" required>
                            </div>
                            <div class="form-group">
                                <label for="des">Descripción: *</label>
                                <textarea v-model="solicitudPool.descripcionp" name="" id="des" cols="80" rows="4" placeholder="Ingrese descripción del proyecto"></textarea>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="pass">Contraseña: *</label>
                                <span class=" text-small text-danger"> (Por favor utilice la misma contraseña de registro)</span>
                                <input v-model="solicitudPool.contrasenap" type="password" class="form-control" id="pass" placeholder="Ingrese contraseña" required>
                            </div>
                        </div>
                        </div>                                                        
                    </div>
                </div>
                <div class="panel panel-default">
                <div class="panel-heading font-weight-bold">Información de Recursos</div>
                    <span class="text-danger">Recuerda que los recursos solicitados se asignan como un pool para dividirlo entre las VM's solicitadas. 
                        Si requiere más recuros, agregar la información en la descripción y 
                        si posteriormente requiere más recursos, debe realizar una solicitud de aumento de pool de recursos.</span>
                    <hr>
                    <div class="panel-body">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="disco">Disco duro (Gb):</label>   
                                <div class="form-group d-flex justify-content-center w-75">                                         
                                  <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                    <input v-model="solicitudPool.disco_duro" type="range" class="form-control" id="disco"  min="1" max="225" required>                                            
                                  <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.disco_duro}}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="cpu">CPU:</label>
                                <span class="text-secondary"> (número de nucleos)</span>
                                <div class="form-group d-flex justify-content-center w-75">                                         
                                  <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                    <input v-model="solicitudPool.cpu" type="range" class="form-control" id="cpu"  min="1" max="30" required>                                            
                                  <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.cpu}}</span>
                                </div>
                            </div>                                                                                                                          
                        </div>
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="ram">Ram (Gb): </label>
                                <div class="form-group d-flex justify-content-center w-75">                                         
                                  <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                    <input v-model="solicitudPool.ram" type="range" class="form-control" id="ram"  min="1" max="30" required>                                            
                                  <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.ram}}</span>
                                </div>
                            </div>  
                            <div class="form-group">
                                <label for="fechafin">Fecha finalización del servicio: *</label>
                                <input v-model="solicitudPool.fechafin" type="date" class="form-control" id="fechafin" value="2020-01-01" min="2020-01-01" max="2025-12-31" required>
                            </div>                                                            
                        </div>
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="numvm">Número de máquinas virtuales: </label>
                                <div class="form-group d-flex justify-content-center w-75">                                         
                                  <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                    <input v-model="solicitudPool.numvm" type="range" class="form-control" id="numvm"  min="1" max="15" required>                                            
                                  <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.numvm}}</span>
                                </div>
                            </div>                                                            
                            </div>
                        </div>                                                       
                    </div>
                </div>
                
               <div class="text-center">
                <button type="submit" class="btn btn-success">Enviar</button>
                <button  type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
               </div>
            </template>
                        
            </form>
            </div>
               
        </div>
        </div>
        </div>      

<!-- #MODAL Solicitud de aumento de pool de recursos -->
        <div class="modal fade" id="ModalSolicitudAumento" tabindex="-1" role="dialog" aria-labelledby="SolicitudAumento" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">

            <div class="modal-header text-white bg-primary">
              <h5 class="modal-title modal-dark" id="ModalAumento"><b>Solicitar aumento de recursos</b></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
            <p>Seleccione los nuevos recursos requeridos en su pool</p>
            <span class="text-danger">Al menos uno de los recursos a solicitar debe ser mayor y diferente al anterior.</span>
            <hr>
                <form @submit.prevent="validarAumento()">                                           
                <div class="form-row">
                    <div class="form-group col-md-6">                                            
                        <div class="form-group">
                            <label for="Disco">Almacenamiento Actual (Gb): <b>{{this.project.disco_duro}}</b></label>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudPool.disco_duro" type="range" class="form-control" id="Disco" min="1" max="300" required>
                                <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.disco_duro}}</span>
                            </div>
                        </div>                                                    
                        <div class="form-group">
                            <label for="CPU">Número de Procesadores Actual: <b>{{this.project.cpu}}</b></label>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudPool.cpu" type="range" class="form-control" id="CPU" min="1" max="40" required>
                                <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.cpu}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="vms">Número de VM's Actual: <b>{{this.project.numero_vm}}</b></label>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudPool.numvm" type="range" class="form-control" id="vms" min="1" max="20" required>
                                <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.numvm}}</span>
                            </div>
                        </div>                                                     
                    </div>
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="RAM">Memoria RAM Actual (Gb): <b>{{this.project.ram}}</b></label>
                                <div class="form-group d-flex justify-content-center w-75">                                         
                                  <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                    <input v-model="solicitudPool.ram" type="range" class="form-control" id="Disco" min="1" max="40" required>
                                    <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudPool.ram}}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="fechafin">Fecha Finalización Actual: <b>{{this.project.fecha_fin}}</b></label>
                                <input v-model="solicitudPool.fechafin" class="form-control" type="date" id="fechafin" value="2020-01-01" min="2020-01-01" max="2026-12-31">
                            </div> 
                        </div>                                               
                </div>
                    <div class="form-group">
                        <p>Por favor escriba el motivo por el cual desea ampliar sus recursos. *</p>
                        <span class="text-danger">La información debe ser lo más específica posible.</span>
                        <hr>
                        <textarea v-model="solicitudPool.motivo" name="" id="" cols="80" rows="4" placeholder="Motivo de ampliación de recursos" required></textarea>
                    </div> 
                    <div class="text-center">
                        <button type="submit" class="btn btn-success">Enviar</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    </div>
                        
                </form>
                
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
    constructor(catUsuario,correo,nombrep,contrasenap,descripcionp,tutor,correo_tutor,numvm,disco_duro,ram,cpu,fechafin,motivo,maquina){
        this.catUsuario = catUsuario;
        this.correo = correo;
        this.nombrep = nombrep;
        this.contrasenap = contrasenap;
        this.descripcionp = descripcionp;
        this.tutor = tutor;
        this.correo_tutor = correo_tutor;
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
            solicitudPool: new SolocitudPool(),
            storage:{},
            project:[],
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
                        this.project = res.data.content;
                        this.solicitudPool.nombrep = this.project.nombre_proyecto
                        this.getServers(); 
                    }                    
                })
                .catch(error => { 
                    console.log('Error ',error);                    
                });            
        },
        getServers: async function(){
            let server
            await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/servers/detail?all_tenants=True&project_id='+this.project.id_openstack, this.config)
            .then(res => {
            //console.log(res.data.servers);
            this.servers = res.data.servers;
            })
            .catch(error => { console.log('Error en getServers',error); });                
        },

//Para que en el modal SOLICITAR AUMENTO se vean los recursos actuales
        igualarValores: async function(){
            this.solicitudPool.disco_duro = this.project.disco_duro
            this.solicitudPool.numvm = this.project.numero_vm
            this.solicitudPool.cpu = this.project.cpu
            this.solicitudPool.ram = this.project.ram
            this.solicitudPool.fechafin = this.project.fecha_fin 
        },

        validarAumento: async function(){
            if (  this.solicitudPool.disco_duro > this.project.disco_duro ||
                  this.solicitudPool.numvm > this.project.numero_vm ||
                  this.solicitudPool.cpu > this.project.cpu ||
                  this.solicitudPool.ram > this.project.ram ||
                  this.solicitudPool.fechafin > this.project.fecha_fin ){
                
                this.sendSolicitud('Aumento Pool de Recursos')}
            else {
                this.$toastr.e("Almenos uno de los recursos debe ser mayor")
            }

            //

        },

        limpiar: async function(){this.solicitudPool = new SolocitudPool()},
        sendSolicitud: async function(tipoSol){
           let solicitud             
            if(this.solicitudPool.catUsuario == "Estudiante"){ 
                solicitud = {
                tipo: tipoSol,
                catUsuario: this.solicitudPool.catUsuario,
                usuario : this.user.name,
                correo: this.user.email,
                nombre_proyecto: this.solicitudPool.nombrep,
                contrasenap: this.solicitudPool.contrasenap,
                descripcion: this.solicitudPool.descripcionp,
                tutor: this.solicitudPool.tutor,
                correo_tutor: this.solicitudPool.correo_tutor,
                fecha_fin: this.solicitudPool.fechafin,
                numvm: parseInt(this.solicitudPool.numvm),
                disco_duro: parseInt(this.solicitudPool.disco_duro),
                ram: parseInt(this.solicitudPool.ram),
                cpu: parseInt(this.solicitudPool.cpu),
                motivo: this.solicitudPool.motivo,
                maquina: this.solicitudPool.maquina}
            } 
            else{
                solicitud = {
                tipo: tipoSol,
                catUsuario: this.solicitudPool.catUsuario,
                usuario : this.user.name,
                correo: this.user.email,
                nombre_proyecto: this.solicitudPool.nombrep,
                contrasenap: this.solicitudPool.contrasenap,
                descripcion: this.solicitudPool.descripcionp,
                tutor: this.user.name,
                correo_tutor: this.user.email,
                fecha_fin: this.solicitudPool.fechafin,
                numvm: parseInt(this.solicitudPool.numvm),
                disco_duro: parseInt(this.solicitudPool.disco_duro),
                ram: parseInt(this.solicitudPool.ram),
                cpu: parseInt(this.solicitudPool.cpu),
                motivo: this.solicitudPool.motivo,
                maquina: this.solicitudPool.maquina}

            }  
                    
           await axios.post('/api/solicitudes',solicitud)
            .then(res => { this.$toastr.s("Solicitud creada correctamente, espere la confirmación del administrador") 
                $('#ModalSolicitudPool').modal('hide')
                $('#ModalSolicitudAumento').modal('hide')
                })
            .catch(error => { this.$toastr.e("Error al envíar la solicitud: " + error ) });
            this.solicitudPool = new SolocitudPool();
            
            //Si el usuario es profesor o curso, el nombre y correo director es el mismo
            
                
        }
    }
}
</script>
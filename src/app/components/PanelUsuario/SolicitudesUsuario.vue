<template>
    <div class="content">
    <div class="row">

        <div class="col-2 col-with-right-dorder">
            <SidebarUsuario style="position: sticky; top: 70px"></SidebarUsuario> 
        </div>

        <div class="col-10" style="padding-left: 0;">
            
        <div style=" float: right;">
            <span>/</span>
            <router-link to="/PanelUsuario">Mi Proyecto</router-link>
            <span>/</span>
            <strong class="final-path">Solicitudes</strong>
            <span>/</span>
        </div><br>

        <br><br><p>
        <div class="btn-group-vertical btn-group-lg" style="display: flex; align-items: center">   
            
            <template v-if="pool === true">
                <button  disabled class="btn btn-outline-info " data-toggle="modal" data-target="#ModalSolicitudPool">
                    Pool de recursos  </button>
                <button @click="igualarValores()" class="btn btn-outline-info" data-toggle="modal" data-target="#ModalSolicitudAumento" >
                    Aumento de pool de recursos  </button>
                <button class="btn btn-outline-info " data-toggle="modal" data-target="#ModalSolicitudBackup" >
                    Backup </button>            
            </template>
            
            <template v-else> 
                <button @click="limpiar()" class="btn btn-outline-info " data-toggle="modal" data-target="#ModalSolicitudPool" >
                    Pool de recursos </button>
                <button disabled class="btn btn-outline-info " data-toggle="modal" data-target="#ModalSolicitudAumento">
                    Aumento de pool de recursos </button>
                <button disabled class="btn btn-outline-info " data-toggle="modal" data-target="#ModalSolicitudBackup" >
                    Backup </button>
            </template>   
                     
        </div>
           
<!--#MODAL solicitud de pool de recursos -->           
        <div class="modal fade" id="ModalSolicitudPool" tabindex="-1" role="dialog" aria-labelledby="SolicitudPool" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">                
        
        <div class="modal-header text-white bg-primary">
            <h5 class="modal-title modal-dark" id="SolicitudPool"><b>Recursos a solicitar</b></h5>
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
                <span class="text-danger">La información debe ser verídica y lo más específica posible.</span>
                <hr>
                
                <div class="panel-body">
                <div class="form-row">
                <div class="form-group col-md-6">
                    <div class="form-group">
                        <label for="nombre">Nombre del proyecto: *</label>  
                        <input v-model="solicitudpool.nombrep" type="text" class="form-control" id="nombre" placeholder="Ingrese nombre del proyecto" required>
                    </div>
                    <div class="form-group">
                        <label for="nombretu">Nombre del tutor: *</label>
                        <input v-model="solicitudpool.tutor" type="text" class="form-control" id="nombretu" placeholder="Ingrese nombre del tutor" required>
                    </div>
                    <div class="form-group">
                        <label for="des">Descripción: *</label>
                        <textarea v-model="solicitudpool.descripcionp" type="text" id="des" cols="80" rows="4" placeholder="Ingrese una breve descripción del proyecto" required></textarea>
                    </div>
                </div>
                    <div class="form-group col-md-6">
                        <div class="form-group">
                            <label for="pass">Contraseña: *</label>
                            <span class=" text-small text-danger"> (Por favor utilice la misma contraseña de registro)</span>
                            <input v-model="solicitudpool.contrasenap" type="password" class="form-control" id="pass" placeholder="Ingrese contraseña" required>
                        </div>
                        <div class="form-group">
                            <label for="emailtu">Correo tutor: *</label>
                            <input v-model="solicitudpool.correo_tutor" type="email" class="form-control" id="emailtu" placeholder="Ingrese correo del tutor" required>
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
                                <input v-model="solicitudpool.disco_duro" type="range" class="form-control" id="disco"  min="1" max="40" required>                                            
                              <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.disco_duro}}</span>
                            </div>              
                        </div>

                        <div class="form-group">
                            <label for="cpu">CPU: </label> <span class="text-secondary">(número de nucleos)</span>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudpool.cpu" type="range" class="form-control" id="cpu" min="1" max="8" required>                                             
                              <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.cpu}}</span>
                            </div>
                        </div>                                                                
                    </div>
                    
                    <div class="form-group col-md-6">
                        <div class="form-group">
                            <label for="ram">Ram (Gb): </label>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudpool.ram" type="range" class="form-control" id="ram" min="1" max="8" required>
                                <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.ram}}</span>
                            </div>
                        </div> 

                        <div class="form-group">
                            <label for="fechafin">Fecha finalización del servicio: *</label>
                            <input v-model="solicitudpool.fechafin" class="form-control" type="date" id="fechafin" value="2020-01-01" min="2020-01-01" max="2025-12-31" required>
                        </div>                                                            
                    </div>
                    
                    <div class="form-group col-md-6">
                        <div class="form-group">
                            <label for="numvm">Número de máquinas virtuales:</label>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudpool.numvm" type="range" class="form-control" id="numvm" min="1" max="2" required>
                            <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.numvm}}</span>
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
                
            <template v-else-if="solicitudpool.catUsuario === 'Docente'">
                <div class="panel panel-default">
                <div class="panel-heading font-weight-bold">Información básica del proyecto</div>
                <span class="text-danger">La información debe ser verídica y lo más específica posible.</span>                          
               <hr>
            
                <div class="panel-body">
                <div class="form-row">
                        
                    <div class="form-group col-md-6">
                        <div class="form-group">
                            <label for="nombre">Nombre del proyecto: *</label>
                            <input v-model="solicitudpool.nombrep" type="text" class="form-control" id="nombre" placeholder="Ingrese nombre del proyecto">
                        </div>
                        <div class="form-group">
                            <label for="des">Descripción: *</label>
                            <textarea v-model="solicitudpool.descripcionp" name="" id="des" cols="80" rows="4" placeholder="Ingrese descripción del proyecto"></textarea>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="form-group">
                            <label for="pass">Contraseña: *</label>
                            <span class=" text-small text-danger"> (Por favor utilice la misma contraseña de registro)</span>
                            <input v-model="solicitudpool.contrasenap" type="password" class="form-control" id="pass" placeholder="Ingrese contraseña" required>
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
                                <input v-model="solicitudpool.disco_duro" type="range" class="form-control" id="disco"  min="1" max="80" required>                                            
                              <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.disco_duro}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="cpu">CPU: </label>
                            <span class="text-secondary">(número de nucleos)</span>
                            <div class="form-group d-flex justify-content-center w-75">                                         
                              <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                <input v-model="solicitudpool.cpu" type="range" class="form-control" id="cpu"  min="1" max="16" required>                                            
                              <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.cpu}}</span>
                            </div>
                        </div>
                    </div>
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="ram">Ram (Gb):</label>
                                <div class="form-group d-flex justify-content-center w-75">                                         
                                  <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                    <input v-model="solicitudpool.ram" type="range" class="form-control" id="ram"  min="1" max="16" required>                                            
                                  <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.ram}}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="fechafin">Fecha finalización del servicio: *</label>
                                <input v-model="solicitudpool.fechafin" type="date" class="form-control" id="fechafin" value="2020-01-01" min="2020-01-01" max="2025-12-31" required>
                            </div>                                                            
                        </div>
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="numvm">Número de máquinas virtuales:</label>
                                <div class="form-group d-flex justify-content-center w-75">                                         
                                  <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                    <input v-model="solicitudpool.numvm" type="range" class="form-control" id="numvm"  min="1" max="4" required>                                            
                                  <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.numvm}}</span>
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
            <template v-else-if="solicitudpool.catUsuario === 'Curso'">
            <div class="panel panel-default">
            <div class="panel-heading font-weight-bold">Información básica del proyecto</div>
                <span class="text-danger">La información debe ser verídica y lo más específica posible.</span>                          
            <hr>
                <div class="panel-body">
                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="nombre">Nombre del curso: *</label>
                                <input v-model="solicitudpool.nombrep" type="text" class="form-control" id="nombre" placeholder="Ingrese nombre del curso" required>
                            </div>
                            <div class="form-group">
                                <label for="des">Descripción: *</label>
                                <textarea v-model="solicitudpool.descripcionp" name="" id="des" cols="80" rows="4" placeholder="Ingrese descripción del proyecto"></textarea>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="pass">Contraseña: *</label>
                                <span class=" text-small text-danger"> (Por favor utilice la misma contraseña de registro)</span>
                                <input v-model="solicitudpool.contrasenap" type="password" class="form-control" id="pass" placeholder="Ingrese contraseña" required>
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
                                    <input v-model="solicitudpool.disco_duro" type="range" class="form-control" id="disco"  min="1" max="225" required>                                            
                                  <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.disco_duro}}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="cpu">CPU:</label>
                                <span class="text-secondary"> (número de nucleos)</span>
                                <div class="form-group d-flex justify-content-center w-75">                                         
                                  <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                    <input v-model="solicitudpool.cpu" type="range" class="form-control" id="cpu"  min="1" max="30" required>                                            
                                  <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.cpu}}</span>
                                </div>
                            </div>                                                                                                                          
                        </div>
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="ram">Ram (Gb): </label>
                                <div class="form-group d-flex justify-content-center w-75">                                         
                                  <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                    <input v-model="solicitudpool.ram" type="range" class="form-control" id="ram"  min="1" max="30" required>                                            
                                  <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.ram}}</span>
                                </div>
                            </div>  
                            <div class="form-group">
                                <label for="fechafin">Fecha finalización del servicio: *</label>
                                <input v-model="solicitudpool.fechafin" type="date" class="form-control" id="fechafin" value="2020-01-01" min="2020-01-01" max="2025-12-31" required>
                            </div>                                                            
                        </div>
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="numvm">Número de máquinas virtuales: </label>
                                <div class="form-group d-flex justify-content-center w-75">                                         
                                  <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                    <input v-model="solicitudpool.numvm" type="range" class="form-control" id="numvm"  min="1" max="15" required>                                            
                                  <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.numvm}}</span>
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
                                        <label for="Disco">Almacenamiento Actual (Gb): <b>{{this.Project.disco_duro}}</b></label>
                                        <div class="form-group d-flex justify-content-center w-75">                                         
                                          <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                            <input v-model="solicitudpool.disco_duro" type="range" class="form-control" id="Disco" min="1" max="300" required>
                                            <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.disco_duro}}</span>
                                        </div>
                                    </div>                                                    
                                    <div class="form-group">
                                        <label for="CPU">Número de Procesadores Actual: <b>{{this.Project.cpu}}</b></label>
                                        <div class="form-group d-flex justify-content-center w-75">                                         
                                          <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                            <input v-model="solicitudpool.cpu" type="range" class="form-control" id="CPU" min="1" max="40" required>
                                            <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.cpu}}</span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="vms">Número de VM's Actual: <b>{{this.Project.numero_vm}}</b></label>
                                        <div class="form-group d-flex justify-content-center w-75">                                         
                                          <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                            <input v-model="solicitudpool.numvm" type="range" class="form-control" id="vms" min="1" max="20" required>
                                            <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.numvm}}</span>
                                        </div>
                                    </div>                                                     
                                </div>
                                <div class="form-group col-md-6">
                                    <div class="form-group">
                                        <label for="RAM">Memoria RAM Actual (Gb): <b>{{this.Project.ram}}</b></label>
                                        <div class="form-group d-flex justify-content-center w-75">                                         
                                          <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                                            <input v-model="solicitudpool.ram" type="range" class="form-control" id="Disco" min="1" max="40" required>
                                            <span class="font-weight-bold text-primary ml-2 mt-1">{{solicitudpool.ram}}</span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="fechafin">Fecha Finalización Actual: <b>{{this.Project.fecha_fin}}</b></label>
                                        <input v-model="solicitudpool.fechafin" class="form-control" type="date" id="fechafin" value="2020-01-01" min="2020-01-01" max="2026-12-31">
                                    </div> 
                                </div>                                               
                            </div>
                            <div class="form-group">
                                <p>Por favor escriba el motivo por el cual desea ampliar sus recursos. *</p>
                                <span class="text-danger">La información debe ser lo más específica posible.</span>
                                <hr>
                                <textarea v-model="solicitudpool.motivo" name="" id="" cols="80" rows="4" placeholder="Motivo de ampliación de recursos" required></textarea>
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

<!-- #MODAL  Solicitud de Backup -->  
        <div class="modal fade" id="ModalSolicitudBackup" tabindex="-1" role="dialog" aria-labelledby="SolicitudBackup" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
              <div class="modal-header text-white bg-primary">
                <h5 class="modal-title modal-dark" id="SolicitudBackup"><b>Información de la VM a guardar</b></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                 <p>Diligencie los datos requeridos para realizar la solicitud de Backup</p>
                
                        <form @submit.prevent="sendSolicitud('Backup')">
                            <div class="form-group">
                                <div class="form-group col">
                                    <label for="maquina">Máquina virtual</label>
                                    <select v-model="solicitudpool.maquina" type="maquina" class="form-control" id="maquina" required>
                                        <option v-for="server in servers" v-bind:key="server.id">{{server.name}}</option>
                                    </select>
                                    
                                </div> 
                                <hr>
                                <p>Por favor escriba el motivo por el cual desea realizar el Backup.</p>
                                
                                <textarea v-model="solicitudpool.motivo" class="ml-3" id="" cols="77" rows="4" placeholder="Motivo de ampliación de recursos"></textarea>
                            </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-success">Enviar</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cacncelar</button>
                        </div>
                    </form>
              </div>
              
            </div>
          </div>
        </div>                    
<!-- finaliza solicitud back UP -->

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
        igualarValores: async function(){
            this.solicitudpool.disco_duro = this.Project.disco_duro
            this.solicitudpool.numvm = this.Project.numero_vm
            this.solicitudpool.cpu = this.Project.cpu
            this.solicitudpool.ram = this.Project.ram
            this.solicitudpool.fechafin = this.Project.fecha_fin 
        },

        validarAumento: async function(){
            if (  this.solicitudpool.disco_duro > this.Project.disco_duro ||
                  this.solicitudpool.numvm > this.Project.numero_vm ||
                  this.solicitudpool.cpu > this.Project.cpu ||
                  this.solicitudpool.ram > this.Project.ram ||
                  this.solicitudpool.fechafin > this.Project.fecha_fin ){
                
                this.sendSolicitud('Aumento Pool de Recursos')}
            else {
                this.$toastr.e("Almenos uno de los recursos debe ser mayor")
            }

            //

        },

        limpiar: async function(){this.solicitudpool = new SolocitudPool()},
        sendSolicitud: async function(tipoSol){
           let solicitud             
            if(this.solicitudpool.catUsuario == "Estudiante"){ 
                solicitud = {
                tipo: tipoSol,
                catUsuario: this.solicitudpool.catUsuario,
                usuario : this.user.name,
                correo: this.user.email,
                nombre_proyecto: this.solicitudpool.nombrep,
                contrasenap: this.solicitudpool.contrasenap,
                descripcion: this.solicitudpool.descripcionp,
                tutor: this.solicitudpool.tutor,
                correo_tutor: this.solicitudpool.correo_tutor,
                fecha_fin: this.solicitudpool.fechafin,
                numvm: this.solicitudpool.numvm,
                disco_duro: this.solicitudpool.disco_duro,
                ram: this.solicitudpool.ram,
                cpu: this.solicitudpool.cpu,
                motivo: this.solicitudpool.motivo,
                maquina: this.solicitudpool.maquina}
            } 
            else{
                solicitud = {
                tipo: tipoSol,
                catUsuario: this.solicitudpool.catUsuario,
                usuario : this.user.name,
                correo: this.user.email,
                nombre_proyecto: this.solicitudpool.nombrep,
                contrasenap: this.solicitudpool.contrasenap,
                descripcion: this.solicitudpool.descripcionp,
                tutor: this.user.name,
                correo_tutor: this.user.email,
                fecha_fin: this.solicitudpool.fechafin,
                numvm: this.solicitudpool.numvm,
                disco_duro: this.solicitudpool.disco_duro,
                ram: this.solicitudpool.ram,
                cpu: this.solicitudpool.cpu,
                motivo: this.solicitudpool.motivo,
                maquina: this.solicitudpool.maquina}

            }  
                    
           await axios.post('/api/solicitudes',solicitud)
            .then(res => { this.$toastr.s("Solicitud enviada correctamente") 
                $('#ModalSolicitudPool').modal('hide')})
            .catch(error => { this.$toastr.e("Error al envíar la solicitud: " + error ) });
            this.solicitudpool = new SolocitudPool();
            
            //Si el usuario es profesor o curso, el nombre y correo director es el mismo
            
                
        }
    }
}
</script>
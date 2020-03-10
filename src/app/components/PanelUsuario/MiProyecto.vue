<template>
    <div>
        <section>
            <div class="row">
                <div class="col-sm-2 col-with-right-dorder">
                    <SidebarUsuario></SidebarUsuario> 
                </div>
                <div class="col-sm-8">
                    <br>                      
                    <h2>Hola {{this.user.name}} este es tu proyecto y características de los recursos asignados</h2>
                          
                   <div class="container" >
                      
                       <p> </p>
                                <table class="table-responsive-xl table-striped table-hover w-auto text-center">
                                    <thead class="thead-dark">
                                         <tr>
                                         <th scope="col">Proyecto</th>
                                         <th scope="col">Almacenamiento</th>
                                         <th scope="col">RAM</th>
                                         <th scope="col">CPU</th>
                                         <th scope="col">#máquinas</th>
                                         <th scope="col">Fecha Inicio</th>
                                         <th scope="col">Fecha fin</th>
                                        </tr>
                                     </thead>
                                    <tbody>
                                        <tr>
                                         <td> {{Project.nombre_proyecto}} </td>
                                         <td>{{Project.disco_duro}}</td>
                                         <td>{{Project.ram}}</td> 
                                         <td>{{Project.cpu}}</td> 
                                         <td>{{Project.numero_vm}}</td>
                                         <td>{{Project.fecha_inicio}}</td>
                                         <td>-</td>                                              
                                        </tr>                                                
                                    </tbody>
                             </table> 
                   </div>
                     <p> </p>
                    <div class="container">                    
                        <div class="accordion" id="accordionI">
<!-- Pestaña para crear y modificar -->
                        <div class="card">
                            <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse"
                                data-target="#collapseOne" aria-expanded="true"
                                aria-controls="collapseOne">
                                Crear y modificar máquinas virtuales
                            </button>
                        </h5>
                        </div>
                             <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionI">
                                <div class="card-body">
                                 <div class="row">
                                    <div class="col text-center">
                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalCrear">
                                            Crear Máquina Virtual
                                        </button>
 <!-- Modal CREAR Máquina virtual-->
                                    <div class="modal fade" id="ModalCrear" tabindex="-1" role="dialog" aria-labelledby="ModalCrearTitle" aria-hidden="true">
                                       <div class="modal-dialog modal-dialog-centered" role="document">
                                          <div class="modal-content">
                                          <div class="modal-header">
                                             <h5 class="modal-title" id="exampleModalLongTitle">Máquina Virtual</h5>
                                             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                             </button>
                                          </div>
            <!-- BODY MODAL crear VM -->
                                          <div class="modal-body">
                                              <form >
                                                <div class="form-group text-left">
                                                  <label for="NombreVM">Nombre</label>
                                                  <input type="text" class="form-control" id="NombreVM" placeholder="Ingresar Nombre">
                                               </div>
                                               <div class="form-row">
                        <!-- Colunma 1-->
                                              <div class="form-group col text-left">
                                                <div class="form-group">
                                                  <label for="SO">Sistema Operativo</label>
                                                  <select type="SO" class="form-control" id="SO">
                                                    <option selected>Seleccione el SO</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                  </select>
                                              </div>
                                               <div class="form-group">
                                                 <label for="Disco">Almacenamiento</label>
                                                   <select type="Disco" class="form-control" id="Disco">
                                                    <option selected>Seleccione disco duro</option>
                                                     <option>1</option>
                                                     <option>2</option>
                                                     <option>3</option>
                                                   </select>
                                               </div>                                                    
                                               <div class="form-group">
                                                 <label for="CPU">Número de Procesadores</label>
                                                 <select type="CPU" class="form-control" id="CPU">
                                                     <option selected>Seleccione procesadores</option>
                                                     <option>1</option>
                                                     <option>2</option>
                                                     <option>3</option>
                                                 </select>
                                                </div>                                                                        
                                             </div>
                    <!-- Colunma 2-->                                                                        
                                             <div class="form-group col text-left">
                                             <div class="form-group">
                                               <label for="Version">Versión o distribución</label>
                                                <select type="SO" class="form-control" id="SO">
                                                 <option selected>Seleccione la versión</option>
                                                 <option>1</option>
                                                 <option>2</option>
                                                 <option>3</option>
                                                </select>
                                             </div>

                                             <div class="form-group">
                                             <label for="RAM">Memoria RAM</label>
                                               <select type="RAM" class="form-control" id="RAM">
                                                 <option selected>Seleccione RAM</option>
                                                 <option>1</option>
                                                 <option>2</option>
                                                 <option>3</option>
                                               </select>
                                             </div>

                                            <div class="form-group">
                                                <label for="Interfaces">Interfaces de Red</label>
                                                <select type="Interfaces" class="form-control" id="Interfaces">
                                                   <option selected>Seleccione el número de interfaces</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                </select>
                                            </div>
                                           </div>
                                          </div>
                                       </form>
                                       </div>
         <!-- Pie del MODAL-->
                                <div class="modal-footer">
                                   <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                   <button type="button" class="btn btn-primary">Enviar</button>
                                </div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div class="col text-center">
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalModificar">
                                Modificar Máquina Virtual
                                </button>
 <!-- Modal MODIFICAR Máquina virtual-->
                             <div class="modal fade" id="ModalModificar" tabindex="-1" role="dialog" aria-labelledby="ModalModificarTitle" aria-hidden="true">
                               <div class="modal-dialog modal-dialog-centered" role="document">
                                 <div class="modal-content">
                                   <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Modificar Máquina Virtual</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
    <!-- BODY modal Crear Máquina virtual-->                   
                                  <div class="modal-body">
                                    <form>
                                     <div class="form-group text-left">
                                        <label for="NombreVM">Nombre Actual xxx</label>
                                        <input type="text" class="form-control" id="NombreVM" placeholder="Ingresar Nuevo Nombre">
                                     </div>
                                     <div class="form-row">
             <!-- Colunma 1-->
                                       <div class="form-group col text-left">
                                         <div class="form-group">
                                         <label for="Disco">Almacenamiento actual xxx</label>
                                         <select type="Disco" class="form-control" id="Disco">
                                           <option selected>Seleccione nueva capacidad de almacenamiento</option>
                                             <option>1</option>
                                             <option>2</option>
                                             <option>3</option>
                                        </select>
                                        </div>                                                    
                                       <div class="form-group">
                                         <label for="CPU">Número de procesadores actuales xxx</label>
                                           <select type="CPU" class="form-control" id="CPU">
                                           <option selected>Seleccione cueva capacidad de procesadores</option>
                                           <option>1</option>
                                           <option>2</option>
                                           <option>3</option>
                                           </select>
                                        </div>                                                                        
                                     </div>
             <!-- Colunma 2-->                                                                        
                                     <div class="form-group col text-left">
                                     <div class="form-group">
                                        <label for="RAM">Memoria RAM actual xxx</label>
                                          <select type="RAM" class="form-control" id="RAM">
                                           <option selected>Seleccione nueva capacidad de RAM</option>
                                           <option>1</option>
                                           <option>2</option>
                                           <option>3</option>
                                          </select>
                                     </div>
                                     <div class="form-group">
                                        <label for="Interfaces">Número de interfaces de Red actuales</label>
                                          <select type="Interfaces" class="form-control" id="Interfaces">
                                            <option selected>Seleccione nueva cantidad de interfaces</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                          </select>
                                      </div>
                                      </div>
                                      </div>
                                    </form>
                                    </div>
        <!-- PIE  Modal Crear Máquina virtual-->
                                     <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-primary">Enviar</button>
                             </div> 
                            </div>
                           </div>
                          </div>
                         </div>
                        </div>
                       </div>
                      </div>
                    </div>


                            
<!-- Pestaña para listar VM con sus características básicas, encenderlos, apagarlos, eliminarlos -->
                    <div class="card">
                        <div class="card-header" id="headingTwo">
                         <h5 class="mb-0">
                          <button v-on:click="getServers()" class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Listar Máquinas Virtuales
                          </button>
                         </h5>
                        </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionI">
                        <div class="card-body">
                                <p>Estas son las máquinas virtuales creadas y sus características:</p>
                                  <h3>Máquinas virtuales</h3>
                                <table class="table-responsive-xl table-striped table-hover w-auto text-center">
                                    <thead class="thead-dark">
                                        <tr class="table-active">
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">S.O.</th>                                        
                                        <th scope="col">Almacenamiento</th>
                                        <th scope="col">RAM</th>
                                        <th scope="col">CPU</th>
                                        <th scope="col">IP</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Acciones</th>
                                       </tr>
                                    </thead>
                                    <tbody v-for="(server, index) in servers" v-bind:key="server.id">
                                      <template v-if="server.status === 'ACTIVE'">
                                        <tr class="table-success">
                                            <th>{{index+1}}</th>
                                            <td>{{server.name}}</td>
                                            <td>{{server.image.id}}</td>
                                            <td>{{server.flavor.id[0]+' Gb'}}</td>
                                            <td>{{server.flavor.id[1]+' Gb'}}</td>
                                            <td>{{server.flavor.id[2]+' vcpu'}}</td>
                                            <td>-</td>
                                            <td>{{server.status}}</td>
                                            <td>-</td>
                                        </tr> 
                                      </template>  

                                      <template v-else>
                                         <tr class="table-danger">
                                            <th>{{index+1}}</th>
                                            <td>{{server.name}}</td>
                                            <td>{{server.image.id}}</td>
                                            <td>{{server.flavor.id[0]+' Gb'}}</td>
                                            <td>{{server.flavor.id[1]+' Gb'}}</td>
                                            <td>{{server.flavor.id[2]+' vcpu'}}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>{{server.status}}</td>
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
   </section>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarUsuario from './SidebarUsuario.vue'
import Token from '!!raw-loader!../PanelAdmin/Token.txt'
const configG = require('../../../config')
//importar token de usuario para tener el dato del nombre del proyecto
// si tiene nombre de proyecto mostrar información, sino diga que debe solicitar recursos


export default {
    
    data(){
        return{
            config:{
                headers:{
                'User-Agent': 'python-keystoneclient',
                'X-Auth-Token':Token,
                'Access-Control-Allow-Origin': '10.55.6.59',
                'Access-Control-Allow-Credentials':'true',
                'Access-Control-Expose-Headers': 'Authorization',
                'Access-Control-Max-Age':'86400',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-OpenStack-Nova-API-Version': '2.1' 
                }
            },
            //Project: new Project(),
           Project: [],
           servers: [],
           user:{}
          // cuota proyecto
           // be3f1add2a3d4a0f9bcf2042efc2278b    Id Proyecto OpenStack

           // "779634de0b0040f28f6f99d09d9d5006"   Id project testbed_ims
           //  "2dfeb6d3-9a12-4cb5-a823-bb639f05fd35"  Id project testbed_ims
           //  4b7b34691b5a40d5a4be9b8a26c12ec3  usuario ID 
            
        }
    },
    created(){
      this.getStorage()
      this.getPool();
    },
    components:{
        'SidebarUsuario': SidebarUsuario  
    },

    methods: {
      getStorage: async function(){
            console.log('Se ingresa a get storage')
            var storage;
            try {
                if (localStorage.getItem) {
                    storage = JSON.parse(localStorage.getItem('userInfo'))
                    console.log('se muestra el storage ',storage)
                    console.log('se muestra el name ',storage.name)
                    this.user = storage
                }
            } catch(e) {
                storage = {};
            }
        },

 //Traer información del pool del usuario 
 //Mirar de donde traer el ID_POOL      

        getPool: async function(){
            let idPool = "5e589dc671235a141e6ab393";
            //console.log('Se ingresa  getOneProject' + idPool)
            await axios.get('/api/pool_recursos/unpool?_id='+idPool)
                .then(res => {
                   //console.log(res.data.content);
                   this.Project = res.data.content;
                   
                })
                .catch(error => { 
                    console.log('Error ',error);
                    
                });            
        },  
        getServers: async function(){
            let server
            let idProject = "779634de0b0040f28f6f99d09d9d5006";
            //let idProject = "be3f1add2a3d4a0f9bcf2042efc2278b";
            console.log('Se ingresa a getServers')
           await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/servers/detail?all_tenants=True&project_id='+idProject, this.config)
                .then(res => {
                    //console.log(res);
                    console.log(res.data.servers);
                    this.servers = res.data.servers;
                    //console.log(res.data.servers[4].addresses);
                })
                .catch(error => { console.log('Error ',error); });
                 for await ( server of this.servers){
                    server.image.id = await this.getOneImage(server.image.id);
                   
                   /*if (server.image.id) {
                        server.image.id = await this.getOneImage(server.image.id);                        
                    }
                    else{
                        server.image.id =server.image.id; 
                    }*/
                    server.flavor.id= await this.getOneFlavor(server.flavor.id);
                }
        },

        getOneImage: async function(idImage){
            let answer
            //console.log('Se ingresa  getOneImage')
            await axios.get('http://'+configG.ipOpenstack+'/image/v2/images/'+idImage,this.config)
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
        
        getOneFlavor: async function(idFlavor){
            let answer=[] 
            //console.log('Se ingresa  getOneFlavor')
            await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/flavors/'+idFlavor, this.config)
                .then(res => {
                    //console.log(res.data);
                    answer[0] = res.data.flavor.disk;
                    answer[1] = res.data.flavor.ram;
                    answer[2] = res.data.flavor.vcpus;
                })
                .catch(error => { console.log('Error ',error); });
                return answer;
        },
    }
}
</script>
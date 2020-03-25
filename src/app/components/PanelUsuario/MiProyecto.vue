<template>
    <div>
        <section>
          
            <div class="row">
                <div class="col-sm-2 col-with-right-border">
                    <SidebarUsuario></SidebarUsuario> 
                </div>
            <div class="col-sm-8"> 
             <div class="container">
<!-- En esta sección se verifica si el usuario que ingresa tiene proyecto asignado -->            
             <template v-if="Project == 'false'">
                <br>
                <p>  
                   Hola {{this.user.name}}, aún no tienes un Pool de recursos signado, 
                </p>
                <p>  puedes solicitarlo ingresando a la siguiente 
                     <button @click="$router.push('/PanelUsuario/Peticiones')"
                     class="btn btn-link">
                     ruta,        
                     </button>en la sección "Solicitud de Pool de recursos"
                </p>                     
               
            </template>
<!-- En esta sección se presenta la información del proyecto y las VM --> 
            <template v-else>         
                   <br>                      
                     <h2 class= "text-center">Hola {{this.user.name}}, tu proyecto es: {{Project.nombre_proyecto}} </h2>
                     <p>En esta sección se presentan los recursos asignados a tu proyecto.
                         Además, puedes ver tus máquinas virtuales, crearlas, modificarlas y acceder a ellas. </p>
                     <h4>Tienes los siguientes recursos asignados: </h4>
                        
                      <table class="table-sm table-bordered table-hover text-center ">
                       <thead class="thead-dark">
                         <tr class="table-active">
                                                                
                         <th scope="col">Almacenamiento</th>
                         <th scope="col">RAM</th>
                         <th scope="col">CPU</th>
                        
                        </tr>
                     </thead>
                     <tbody >
                        <tr >
                          <td>{{Project.disco_duro}} Gb</td>
                          <td>{{Project.ram}} Gb</td>
                          <td>{{Project.cpu}}</td>                       
                        </tr>
                     </tbody>                               
                    </table> 
                    <br>
                    <h4> Puedes crear {{Project.numero_vm}} máquinas Virtuales, </h4>
                    <h4> Fecha asignación: {{Project.fecha_inicio}} </h4>
                    <h4> Fecha finalización: {{Project.fecha_inicio}} </h4>
                                           
                <p> </p>
<!-- Pestaña para listar VM con sus características básicas, encenderlos, apagarlos, eliminarlos -->
           <div class="accordion" id="accordionI">
           <div class="card">
               <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                 <button v-on:click="getServers()" class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                   Listar Máquinas Virtuales
                 </button>
                </h5>
               </div>
           <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionI">
           <div class="card-body">
<!-- MODAL CREAR VM -->          
           <div>
             
             <p></p>
              <h3>
                <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#ModalCrear">
                  <span data-toggle="tooltip" data-placement="top" title="Crear VM"><i class="fas fa-plus"></i></span>
                </button>
                <b> Crear máquina virtual</b>
              </h3>
              
             
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
           <!-- Colunma 1  Crear VM-->
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
       <!-- Colunma 2 crear VM-->                                                                        
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
<!-- Verificar estado de las VM-->    
            <br>                        
            <template v-if="servers.length == 0">  
              <p>Actualmente no tienes máquinas virtuales creadas</p>
            </template>
            <template v-else>
                <p>Estas son las máquinas virtuales creadas y sus características:</p>
                <h3>Máquinas virtuales</h3>
                
                <table class="table table-striped table-hover  text-center">
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
                        <td>
                          <div class="btn-group-sm" role="group" aria-label="Basic example">
                              <div>
                            <!-- Material switch -->
                              </div>                                                        
                              <button v-on:click="consola(server.id)" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Abrir en consola"><i class="fas fa-expand"></i></button>
                              <button v-on:click="editServer(server.id)" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Editar VM"><i class="fas fa-edit"></i></button>
                              <button v-on:click="deleteServer(server.id)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar VM"><i class="fas fa-trash"></i></button>                                                        
                          </div>
                        </td>
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
                           <td>{{server.status}}</td>
                           <td>
                               <div class="btn-group-sm" role="group" aria-label="Basic example">
                                 <div>
                                <!-- Material switch -->
                                 </div>                                                        
                                 <button v-on:click="consola(server.id)" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Abrir en consola"><i class="fas fa-expand"></i></button>
                                 <button v-on:click="editServer(server.id)" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Editar VM"><i class="fas fa-edit"></i></button>
                                 <button v-on:click="deleteServer(server.id)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar VM"><i class="fas fa-trash"></i></button>                                                        
                             </div>
                           </td>
                        </tr>
                       </template>
                      </tbody>
                     </table>
                    </template>
                  </div>     
                </div>
            </div>
            </div>                
        
      </template>

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
       //this.getPool();
    },
    components:{
        'SidebarUsuario': SidebarUsuario  
    },
    methods: {
 //Se obtiene información del localStor
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
              
              //this.getPool()
          }
        } catch(e) {
            storage = {};
        }
      },
//Se trae el pool de recursos con el correo del localStorage         
        getPool: async function(email){
            //await axios.get('/api/pool_recursos/unpool?propietario='+propietario)
            await axios.get('/api/pool_recursos/unpool?emailPropietario='+email)
                .then(res => {
                   console.log(res.data);
                   if (res.data.status == '404' || res.data.status == '400') {
                       console.log("ENTRE AL IF");
                       this.Project = "false";  
                       //console.log(Project.nombre_proyecto);                      
                    }
                    else{
                        //this.verifyProject = "true";
                        console.log("ENTRE AL ELSE");
                        this.Project = res.data.content; 
                    }                    
                })
                .catch(error => { 
                    console.log('Error ',error);                    
                });            
        }, 
// TRAER VM's del usuario por idProject_OPENSTACK 
//                                              Poner ID proyecto OpenStack        
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
                 if (this.servers.length == 0 )
                    {console.log("no hay servidores")}
                else{
                      console.log("Si hay servidores ")
                      for await ( server of this.servers){
                      server.image.id = await this.getOneImage(server.image.id);

                     if (server.image.id) {
                          server.image.id = await this.getOneImage(server.image.id);                        
                      }
                      else{
                          server.image.id =server.image.id; 
                      }
                      server.flavor.id= await this.getOneFlavor(server.flavor.id);
                    }
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
//ACCIONES VM's  Acceder por consola - Eliminar - Editar - Encender - Apagar - Reiniciar        
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

        editServer: async function (idServer){
          console.log (idServer)
        }

//Crear VM

//Modificar VM

       
       
    }
}
</script>
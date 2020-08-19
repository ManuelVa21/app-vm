<template>
  <div class="content">
    <div class="row">
    
      <div class="col-2 col-with-right-border">
          <SidebarUsuario></SidebarUsuario> 
      </div>

      <div class="col-10">

        <div style=" float: right;">
                    <router-link to="/PanelUsuario">Panel Usuario</router-link>
                    <span>/</span>
                    <strong class="final-path">Mi Proyecto</strong>
                    <span>/</span>
        </div><br> 
        
             <div class="container">
<!-- En esta sección se verifica si el usuario que ingresa tiene proyecto asignado -->            
             <template v-if="Project == 'false'">
                <br>
                <p>  
                   Hola {{this.user.name}}, aún no tienes un Pool de recursos signado, 
                </p>
                <p>  puedes solicitarlo ingresando a la siguiente 
                     <button @click="$router.push('/PanelUsuario/SolicitudesUsuario')"
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
                          <form>
                            <div class="form-group text-left">
                              <label for="NombreVM">Nombre</label>
                              <input v-model="vm.nombre" type="text" class="form-control" id="NombreVM" placeholder="Ingresar Nombre" required>
                            </div>
                            <div class="form-group">
                              <label for="desciption">Descripción</label>
                              <textarea v-model="vm.descripcion" name="desciption" class="form-control" id="desciption" placeholder="Descripción VM" required> </textarea>
                            </div>
                            <div class="form-group">
                                <label for="SO">Sistema Operativo</label>
                                <select v-model="vm.SO" type="SO" class="form-control" id="SO" required>
                                  <option v-for="image in images" v-bind:key="image.id">{{image.name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                              <div class="form-row">
                                <div class="form-group col">
                                  <div class="form-group">
                                      <label for="disco">Disco duro</label>
                                      <input v-model="vm.disco_duro" type="number" class="form-control" id="disco" placeholder="Seleccione el disco duro" min="1" max="20" required>
                                  </div>
                                  <div class="form-group">
                                      <label for="cpu">CPU</label>
                                      <input v-model="vm.cpu" type="number" class="form-control" id="cpu" placeholder="Seleccione CPU" min="1" max="8" required> 
                                  </div>
                                  <div class="form-group">
                                      <label for="ram">Ram</label>
                                      <input v-model="vm.ram" type="number" class="form-control" id="ram" placeholder="Seleccione RAM" min="1" max="8" required>
                                  </div>
                                </div>
                              </div>                                                 
                            </div>
                          </form>
                        </div>
         <!-- Pie del MODAL-->
                            <div class="modal-footer">
                               <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                               <button v-on:click="createFlavor(vm)" type="button" class="btn btn-primary">Enviar</button>
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
                <div class="table-responsive">
                <table class="table table-striped table-hover  text-center">
                 <thead class="thead-dark">
                  <tr class="table-active">
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Creada</th>
                    <th scope="col">S.O.</th>                                        
                    <th scope="col">Disco</th>
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
                    <td>{{server.created}}</td>
                    <td>{{server.image.id}}</td>
                    <td>{{server.flavor.id[0]+' Gb'}}</td>
                    <td>{{server.flavor.id[1]+' Mb'}}</td>
                    <td>{{server.flavor.id[2]+' vcpu'}}</td>
                    <td>-</td>
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
                        </div>
                      </div>
                    </td>
                  </tr> 
                  </template>
                  <template v-else>
                    <tr class="table-danger">
                    <th>{{index+1}}</th>
                    <td>{{server.name}}</td>
                    <td>{{server.created}}</td>
                    <td>{{server.image.id}}</td>
                    <td>{{server.flavor.id[0]+' Gb'}}</td>
                    <td>{{server.flavor.id[1]+' Gb'}}</td>
                    <td>{{server.flavor.id[2]+' vcpu'}}</td>
                    <td>-</td>
                    <td>{{server.status}}</td>
                    <td>
                      <div class="dropdown dropleft">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Action
                        </button>
                        <div class="dropdown-menu">
                            <button v-on:click="encenderServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Encender"><i class="fas fa-power-off"></i> Encender</button>
                            <button v-on:click="consola(server.id)" type="button" class="btn btn-secondary dropdown-item" data-toggle="tooltip" data-placement="top" title="Abrir en consola"><i class="fas fa-expand"></i> Abrir</button>
                            <button v-on:click="editarServer(server.id)" type="button" class="btn btn-primary dropdown-item" data-toggle="tooltip" data-placement="top" title="Editar"><i class="fas fa-edit"></i> Editar</button>
                            <button v-on:click="reiniciarServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Reiniciar"><i class="fas fa-redo-alt"></i> Reiniciar</button>
                            <button v-on:click="backupServer(server.id)" type="button" class="btn btn-primary dropdown-item" data-toggle="tooltip" data-placement="top" title="Realizar Backup"><i class="fas fa-save"></i> Backup</button>
                            <button v-on:click="desPausarServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Despausar"><i class="fas fa-play"></i> Despausar</button>
                            <button v-on:click="desBloquearServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Desbloquear"><i class="fas fa-lock-open"></i> Desbloquear</button>
                            <div class="dropdown-divider"></div>
                            <button v-on:click="deleteServer(server.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i> Eliminar</button>
                        </div>
                      </div>
                    </td>
                    </tr>
                   </template>
                      </tbody>
                     </table>
                </div>
                    </template>
                  </div>     
                </div>
            </div>
            </div>                
        
      </template>

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
import TokenProject from '!!raw-loader!../PanelAdmin/TokenProjects.txt'
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
                'Access-Control-Allow-Origin': '10.55.6.39',
                'Access-Control-Allow-Credentials':'true',
                'Access-Control-Expose-Headers': 'Authorization',
                'Access-Control-Max-Age':'86400',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-OpenStack-Nova-API-Version': '2.1' 
                }
            },
            configCreatetoken:{
                headers:{
                  'User-Agent': 'python-keystoneclient',
                  'X-Auth-Token': TokenProject, 
                  'Access-Control-Allow-Origin': '10.55.6.39', 
                  'Access-Control-Allow-Credentials': 'true',
                  'Access-Control-Expose-Headers': 'Authorization',
                  'Access-Control-Max-Age':'86400',
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',                  
                  'X-OpenStack-Nova-API-Version': '2.1'
                }
            },
           Project: [],
           servers: [],
           flavors: [],
           images: [],
           vm:{},
           checked:false 
        }
    },
    created(){
      this.getStorage()
      this.getImage()
      
    },
    components:{
        'SidebarUsuario': SidebarUsuario  
    },
    methods: {
//Se obtiene información del localStor
      getStorage: async function(){
        //console.log('Se ingresa a get storage')            
        var storage;
        try {
          if (localStorage.getItem) {
              storage = JSON.parse(localStorage.getItem('userInfo'))
              console.log('se muestra el storage ',storage)
              this.user = storage
              this.getPool(this.user.email)
          }
        } catch(e) {
            storage = {};
        }
      },
//Se trae el pool de recursos con el correo del localStorage         
      getPool: async function(){
        await axios.get('/api/pool_recursos/unpool?emailPropietario='+this.user.email)
        .then(res => {
          if (res.data.status == '404' || res.data.status == '400') {
            this.Project = "false";                      
          }
          else{
            this.Project = res.data.content;
            this.getNetwork()
          }                    
        })
        .catch(error => { 
            console.log('Error en getPool',error);                    
        });            
      }, 
// TRAER VM's del usuario por idProject_OPENSTACK 
//                                              Poner ID proyecto OpenStack        
      getServers: async function(){
        let server
        await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/servers/detail?all_tenants=True&project_id='+this.Project.id_openstack, this.config)
        .then(res => {
          //console.log(res.data.servers);
          this.servers = res.data.servers;
          //console.log(res.data.servers[4].addresses);
        })
        .catch(error => { console.log('Error en getServers',error); });
        if (this.servers.length == 0 )
          {console.log("no hay servidores")}
        else{
          //console.log("Si hay servidores ")
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
        await axios.get('http://'+configG.ipOpenstack+'/image/v2/images/'+idImage,this.config)
        .then(res => { answer= res.data.name; })
        .catch(error => { 
          console.log('Error en getOneImage',error);
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
        .catch(error => { console.log('Error en getOneFlavor',error); });
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
        .catch(error => { console.log('Error en consola',error); });
      },
      deleteServer: async function(idServer){
        //console.log('Se ingresa a deleteServer')
        await axios.delete('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer,this.config)
        .then(res => {
          console.log(res.data)
        })
        .catch(error => { console.log('Error en delete server',error); });
        this.getServers();
      },
      editServer: async function (idServer){
        console.log (idServer)
      },
//Crear VM
      addServer: async function(vm,id_flavor){
        console.log('Se ingresa a addServer') 
        console.log(vm)
        let data={
          "server": {
            "name": vm.nombre, 
            "imageRef": vm.SO, 
            "flavorRef": id_flavor,
            "description": vm.descripcion,
            //"adminPass ": vm.contrasena,
            "availability_zone": "nova", 
            "max_count": 1, 
            "min_count": 1,  
            "networks": [{"uuid": this.network}]
          }
        }
        await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers',data,this.configCreatetoken)
        .then(res => {
          console.log('Respuesta del post')
          console.log(res.data)
        })
        .catch(error => { console.log('Error en addServer',error); });
      },
      getImage: async function(){
        console.log('Se ingresa a getImage')
        await axios.get('http://'+configG.ipOpenstack+'/image/v2/images',this.config)
        .then(res => {
          //console.log('Respuesta del post')
          //console.log(res.data.images)
          this.images = res.data.images
        })
        .catch(error => { console.log('Error en getImage',error); });        
      },
      getNetwork: async function(){
        console.log('Se ingresa a getNetwrk ')
        await axios.get('http://'+configG.ipOpenstack+':9696/v2.0/networks?tenant_id='+this.Project.id_openstack,this.config)
        .then(res => {
          console.log('Respuesta del get network')
          console.log(res)
          this.network = res.data.networks[0].id
        })
        .catch(error => { console.log('Error en getNetwork',error); }); 
      },
      createFlavor: async function(vm){
        //console.log('Se ingresa a createFlavor')
        let data={
          "flavor": {
            "vcpus": vm.cpu, 
            "disk": vm.disco_duro, 
            "name": "flavor-"+vm.nombre, 
            //"os-flavor-access:is_public": true, 
            "description": "Flavor creado para máquina "+vm.nombre,
            "rxtx_factor": 1.0, 
            //"OS-FLV-EXT-DATA:ephemeral": 0, 
            "ram": (vm.ram*1024), 
            "id": "id-"+vm.nombre
            //"swap": 0
          }
        }
        await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/flavors',data,this.config)
        .then(res => {
          console.log('Respuesta del post')
          console.log(res.data)
          this.addServer(vm,res.data.flavor.id)
        })
        .catch(error => { console.log('Error en createFlavor',error); }); 
      }

    }
}
</script>
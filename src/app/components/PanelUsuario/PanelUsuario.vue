<template>
    <div class="content">
    <div class="row">
    
      <div class="col-2 pr-0">
          <SidebarUsuario style="position: sticky; top: 75px"></SidebarUsuario> 
      </div>

    <div class="col-10 pl-0">

        <div style=" float: right;">
            <span>/</span>
            <strong class="final-path">Mi Proyecto</strong>
            <span>/</span>
        </div><br> 
             
<!-- En esta sección se verifica si el usuario que ingresa tiene proyecto asignado -->            
      <template v-if="project == 'false'">
          <br>
          <div style="text-align: center;">
              <button @click="$router.push('/PanelUsuario/SolicitudesUsuario')" class="btn btn-primary btn-lg"
                 data-placement="top" title="Solicitud de Recursos"><i class="fas fa-exclamation-triangle"></i> 
              </button>
              <div>  
                 Hola <b>{{this.user.name}}</b>, aún no tienes un Pool de recursos asignado, 
              </div>
              <div> 
                puedes solicitarlo ingresando a la siguiente
                <button @click="$router.push('/PanelUsuario/SolicitudesUsuario')"
                   class="btn btn-link">ruta,</button> 
                   en la sección <b>"Solicitud de Pool de recursos"</b>
              </div> 
          </div>
      </template>
<!-- En esta sección se presenta la información del proyecto y las VM --> 
      <template v-else-if = " project.servidor_ubicacion == 'VMware' ">
        <h3 class= "text-center">Hola <b>{{this.user.name}}</b>, tu proyecto es: <b>{{project.nombre_proyecto}}</b> </h3>
          
            <div>
              <h4>Tienes los siguientes recursos asignados: </h4>
                <h5>Almacenamiento (Gb): {{project.disco_duro}}</h5>                                                  
                <h5>RAM (Gb): {{project.ram}}</h5>
                <h5>CPU: {{project.cpu}}</h5> 
                <h5> Puedes crear {{project.numero_vm}} máquinas Virtuales</h5>
                <h5> Fecha finalización: {{project.fecha_fin}} </h5> 
              <h4> <b>NOTA:</b> Tus recursos están asignados en VMware, contáctate con el administrador para acceder a tus VM's </h4>
            </div>  
      </template>
      <template v-else-if = " project.servidor_ubicacion == 'OpenStack' ">         
        <br>                      
          <h3 class= "text-center">Hola <b>{{this.user.name}}</b>, tu proyecto es: <b>{{project.nombre_proyecto}}</b> </h3>
          
            <div>
              <h4>Tienes los siguientes recursos asignados: </h4>
                <h5>Almacenamiento (Gb): {{project.disco_duro}}</h5>                                                  
                <h5>RAM (Gb): {{project.ram}}</h5>
                <h5>CPU: {{project.cpu}}</h5> 
                <h5> Puedes crear {{project.numero_vm}} máquinas Virtuales</h5>
                <h5> Fecha finalización: {{project.fecha_fin}} </h5> 
            </div>                         
                
<!-- Pestaña para listar VM con sus características básicas, encenderlos, apagarlos, eliminarlos -->
           
       
           
          
            <br> 
              <h3>
                <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#ModalCrear">
                  <span data-toggle="tooltip" data-placement="top" title="Crear VM"><i class="fas fa-plus"></i></span>
                </button>
                <b> Crear máquina virtual</b>
              </h3>  
              
                                                                                        
<!-- Verificar estado de las VM-->    
            <br>                        
            <template v-if="servers.length == 0">  
              <p>Actualmente no tienes máquinas virtuales creadas</p>
            </template>
            <template v-else>
                <p>Estas son las máquinas virtuales creadas y sus características:</p>
                <p class="text-danger">* Si la máquina no muestra el usuario/contraseña. Utilice por defecto root/root y 
                  posteriormente cree su usuario y contraseña.</p>
                <p class="text-danger">* Al crear una VM espere un tiempo mientras se crea la VM (1 min) y vuelva a cargar la página. </p>
              
                <div class="table-responsive">
                <table class="table table-striped table-hover  text-center">
                 <thead class="thead-dark">
                  <tr class="table-active">
                    
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
                    
                <tbody v-for="(server) in servers" v-bind:key="server.id">
                  <template v-if="server.status === 'ACTIVE'">
                  <tr class="table-success">
                    
                    <td>{{server.name}}</td>
                    <td>{{server.created}}</td>
                    <td>{{server.image.id}}</td>
                    <td>{{server.flavor.id[0]+' Gb'}}</td>
                    <td>{{server.flavor.id[1]+' Mb'}}</td>
                    <td>{{server.flavor.id[2]+' vcpu'}}</td>
                    <td>-</td>
                    <td>{{server.status}}</td>
                    <td>
                      <div class="dropdown" style="position: static" >
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Action
                        </button>
                        <div class="dropdown-menu" >
                            
                             <!--<button v-on:click="editarServer(server.id)" type="button" class="btn btn-primary dropdown-item" data-toggle="tooltip" data-placement="top" title="Editar"><i class="fas fa-edit"></i> Editar</button>-->
                            <button v-on:click="apagarServer(server.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Apagar"><i class="fas fa-power-off"></i> Apagar</button>
                            <button v-on:click="consola(server.id)" type="button" class="btn btn-secondary dropdown-item" data-toggle="tooltip" data-placement="top" title="Abrir en consola"><i class="fas fa-expand"></i> Abrir</button>
                            <button v-on:click="reiniciarServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Reiniciar"><i class="fas fa-redo-alt"></i> Reiniciar</button>
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
                    <td>{{server.name}}</td>
                    <td>{{server.created}}</td>
                    <td>{{server.image.id}}</td>
                    <td>{{server.flavor.id[0]+' Gb'}}</td>
                    <td>{{server.flavor.id[1]+' Gb'}}</td>
                    <td>{{server.flavor.id[2]+' vcpu'}}</td>
                    <td>-</td>
                    <td>{{server.status}}</td>
                    <td>
                      <div class="dropdown" style="position: static">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Action
                        </button>
                        <div class="dropdown-menu">
                            <button v-on:click="encenderServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Encender"><i class="fas fa-power-off"></i> Encender</button>
                            <button v-on:click="consola(server.id)" type="button" class="btn btn-secondary dropdown-item" data-toggle="tooltip" data-placement="top" title="Abrir en consola"><i class="fas fa-expand"></i> Abrir</button>
                            <!-- <button v-on:click="editarServer(server.id)" type="button" class="btn btn-primary dropdown-item" data-toggle="tooltip" data-placement="top" title="Editar"><i class="fas fa-edit"></i> Editar</button>-->
                            <button v-on:click="reiniciarServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Reiniciar"><i class="fas fa-redo-alt"></i> Reiniciar</button>
                            <button v-on:click="desPausarServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Despausar"><i class="fas fa-play"></i> Despausar</button>
                            <button v-on:click="desBloquearServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Desbloquear"><i class="fas fa-lock-open"></i> Desbloquear</button>
                            <button v-on:click="reanudarServer(server.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Reanudar"><i class="fas fa-tv"></i> Reanudar</button>
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


                            
        
      </template><br>

<!-- MODAL CREAR VM -->   
            <div class="modal fade" id="ModalCrear" tabindex="-1" role="dialog" aria-labelledby="ModalCrear" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              
              <div class="modal-header text-white bg-primary">                                                 
                <h5 class="modal-title modal-dark"><b>Máquina Virtual</b></h5>
                <button  type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button> 
              </div>
<!-- BODY MODAL crear VM -->
              <div class="modal-body">

                <form>
                  <div class="form-group text-left">
                    <label for="NombreVM">Nombre:</label>
                    <input v-model="vm.nombre" type="text" class="form-control" id="NombreVM" placeholder="Ingresar Nombre" required>
                  </div>
                  <div class="form-group">
                    <label for="desciption">Descripción:</label>
                    <textarea v-model="vm.descripcion" name="desciption" class="form-control" id="desciption" placeholder="Descripción VM" required> </textarea>
                  </div>
                  <div class="form-group">
                      <label for="SO">Sistema Operativo:</label>
                      <select v-model="vm.SO" type="SO" class="form-control" id="SO" required>
                        <option v-for="image in images" v-bind:key="image.id">{{image.name}}</option>
                      </select>
                  </div>
                  <div class="form-group">
                  <div class="form-row">
                  <div class="form-group col">
                    <span class="text-danger">Los recursos deben estár dentro del rango de recursos asignados </span>
                      <div class="form-group">
                        <label for="disco">Disco duro (Gb):</label>
                        <div class="form-group d-flex justify-content-center w-75">                                         
                          <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                            <input v-model="vm.disco_duro" type="range" class="form-control" id="disco"  min="1" max="100" required>                                            
                          <span class="font-weight-bold text-primary ml-2 mt-1">{{vm.disco_duro}}</span>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="cpu">CPU:</label>
                        <div class="form-group d-flex justify-content-center w-75">                                         
                          <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                            <input v-model="vm.cpu" type="range" class="form-control" id="cpu"  min="1" max="8" required>                                            
                          <span class="font-weight-bold text-primary ml-2 mt-1">{{vm.cpu}}</span>
                        </div>                           
                      </div>
                      <div class="form-group">
                        <label for="ram">Ram (GB):</label>
                        <div class="form-group d-flex justify-content-center w-75">                                         
                          <span class="font-weight-bold text-primary mr-2 mt-1">0</span>                                                
                            <input v-model="vm.ram" type="range" class="form-control" id="ram"  min="1" max="16" required>                                            
                          <span class="font-weight-bold text-primary ml-2 mt-1">{{vm.ram}}</span>
                        </div>                        
                        </div>
                    </div>
                    </div>                                                 
                  </div>
                </form>
              </div>
    <!-- Pie del MODAL-->
              <div class="modal-footer">
                <button v-on:click="comprobarFlavor(vm)" type="button" class="btn btn-success">Crear</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
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
//var SSH = require('simple-ssh');
//const { stdout } = require('process');
//const exec = require('child_process').exec;

export default {
    data(){
        return{
          
            config:{
                headers:{
                  'User-Agent': 'python-keystoneclient',
                  'X-Auth-Token': Token, 
                  'Access-Control-Allow-Origin': '10.55.6.39', 
                  'Access-Control-Allow-Credentials': 'true',
                  'Access-Control-Expose-Headers': 'Authorization',
                  'Access-Control-Max-Age':'86400',
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',                  
                  'X-OpenStack-Nova-API-Version': '2.1'
                }
            },
            configG:{
                headers:{
                  'User-Agent': 'python-keystoneclient',
                  'X-Auth-Token': this.tokenProject, 
                  'Access-Control-Allow-Origin': '10.55.6.39', 
                  'Access-Control-Allow-Credentials': 'true',
                  'Access-Control-Expose-Headers': 'Authorization',
                  'Access-Control-Max-Age':'86400',
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',                  
                  'X-OpenStack-Nova-API-Version': '2.1'
                }
            },
            project: [],
            tokenProject:[],
            servers: [],
            flavors: [],
            images: [],
            network:[],
            vm:{},
            valorKeyPair:'',
            answerServer:{
               'content' :'Bad Request'
            } 
        }
    },
    async created(){
      await this.getStorage()
      if(this.project.servidor_ubicacion == "OpenStack"){        
        this.getImages()
        this.getNetwork()
        this.getServers()
        //this.getFlavors
        //this.generateKeypair() 
      }
             
    },
//COMPONENTES
    components:{
        'SidebarUsuario': SidebarUsuario  
    },
    methods: {
//Se obtiene información del localStorage      
      getStorage: async function(){
        var storage;
        try {
          if (localStorage.getItem) {
              storage = JSON.parse(localStorage.getItem('userInfo'))
              this.user = storage
              await this.getPool(this.user.email)     //Traer el pool de recursos         
          }}
          catch(e) {
            storage = {}; }
      },
      
//Se trae el pool de recursos con el correo del localStorage         
      getPool: async function(){
        await axios.get('/api/pool_recursos/unpool?emailPropietario='+this.user.email)
        .then( res => {
          if (res.data.status == '404' || res.data.status == '400') {
            this.project = "false";             //no hay pool asociado         
          }
          else{             
            this.project = res.data.content;            
            this.project.fecha_fin = new Date (this.project.fecha_fin)
            this.project.fecha_fin = this.project.fecha_fin.toLocaleDateString()
            this.tokenProject = this.project.token_openstack; // asignamos el token de Openstack
            //console.log(this.project)
            this.configG = {
                  headers:{
                    'User-Agent': 'python-keystoneclient',
                    'X-Auth-Token': this.tokenProject, 
                    'Access-Control-Allow-Origin': '10.55.6.39', 
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Expose-Headers': 'Authorization',
                    'Access-Control-Max-Age':'86400',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',                  
                    'X-OpenStack-Nova-API-Version': '2.1'
                  }
              }
            if(this.project.private_key === '')  
            {
              this.crearKeyPair()
            }
            else{
              //console.log(this.project.private_key)
            }
             
          }                    
        })
        .catch(error => { 
            this.$toastr.e("Error al obtener el pool del usuario: " + error )
            //console.log(error)                    
        });            
      }, 
// Funciones en OPENSTACK
//                                              Poner ID proyecto OpenStack  

crearKeyPair: async function(){
        console.log('Se ingresa a key pair')
        let data = {
          "keypair": {
          "name": "key-"+this.project.nombre_proyecto
          }
        }
        await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/os-keypairs', data, this.configG)
        .then(async res =>{
         // console.log('Se muestra la respuesta de post keypair ',res)
         // console.log(res.data.keypair)
          this.valorKeyPair =  res.data.keypair.private_key
          //console.log("clave privada")
          //console.log(this.valorKeyPair)
            await axios.put('http://localhost:4000/api/pool_recursos/',{
                _id: this.project._id,
                private_key: this.valorKeyPair,
            })
                .then(res => { 
             //       console.log('Respuesta del put ',res)
             //console.log(res)
                })//
                .catch(error => { 
               //     console.log('Error en axios put ',error);                    
                });
        })
        .catch(error =>{ console.log('error en post keypair', error) })  
      }, 
      getServers: async function(){
        let server
        await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/servers/detail?all_tenants=false&project_id='+this.project.id_openstack, this.configG)
        .then(res => {
          //console.log(res.data.servers);
          this.servers = res.data.servers;
          //console.log(res.data.servers[4].addresses);          
        })
        .catch(error => { this.$toastr.e("Error al obtener las VM's " + error )
        })
        if (this.servers.length == 0 )
            { this.$toastr.i("No tiene Máquinas creadas ")}
          else{
            //console.log("Si hay servidores ")
            for await ( server of this.servers){
              server.image.id = await this.getOneImage(server.image.id);
              server.flavor.id = await this.getOneFlavor(server.flavor.id);
          }
        }                         
      },       
      getOneImage: async function(idImage){
        let answer
        await axios.get('http://'+configG.ipOpenstack+'/image/v2/images/'+idImage,this.configG)
        .then(res => { answer= res.data.name; })
        .catch(error => { 
          this.$toastr.e("Error al obtener las imagenes de las VM's: " + error )
          answer="error";
        });
        return answer;
      },        
      getOneFlavor: async function(idFlavor){
        let answer=[] 
        //console.log('Se ingresa  getOneFlavor')
        await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/flavors/'+idFlavor, this.configG)
        .then(res => {
          //console.log(res.data);
          answer[0] = res.data.flavor.disk;
          answer[1] = res.data.flavor.ram;
          answer[2] = res.data.flavor.vcpus;
          answer[3] = idFlavor;
        })
        .catch(error => { this.$toastr.e("Error al obtener el flavor de las VM's: " + error ) });
        return answer;
      },
      
//ACCIONES VM's  Acceder por consola - Eliminar - Editar - Encender - Apagar - Reiniciar        
     encenderServer: async function(idServer) {
            console.log('Se ingresa a encender')
            let data={ "os-start": null }
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.configG)
            .then(res => {
                this.$toastr.i("Encendiendo VM ")
            })
            .catch(error => { this.$toastr.e("Error al encender la VM " + error) });
            this.getServers();
        },
     apagarServer: async function(idServer) {
            console.log('Se ingresa a apagar')
            let data={ "os-stop": null }
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.configG)
            .then(res => {
                this.$toastr.i("Apagando VM ")
            })
            .catch(error => { this.$toastr.e("Error al apagar la VM" + error) });
            this.getServers();
        },
     consola: async function(idServer){
        let data={
          "os-getVNCConsole": {
            "type": "novnc"
          }
        };
        await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.configG)
        .then(res => {
          //console.log(res.data)
          window.open(res.data.console.url)
        })
        .catch(error => { this.$toastr.e("Error al abrir la consola: " + error ) });
      },
      deleteServer: async function(idServer){
        //console.log('Se ingresa a deleteServer')
        await axios.delete('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer,this.configG)
        .then(res => {
          
          this.$toastr.s("VM eliminada")
          var esperando = setTimeout(this.getServers(),100000); 
        })
        .catch(error => { this.$toastr.e("Error al eliminar la VM " + error ) });
        
    
        
      },
      reiniciarServer: async function(idServer) {
            console.log('Se ingresa a reiniciar')
            let data={"reboot": {"type": "SOFT"}}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.configG)
            .then(res => {
                this.$toastr.i("Reiniciando la VM " )
            })
            .catch(error => { this.$toastr.e("Error al reiniciar la VM " + error) });
            this.getServers();
        },
      pausarServer: async function(idServer) {
            console.log('Se ingresa a pausar')
            let data={"pause": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.configG)
            .then(res => {
                this.$toastr.i("Servidor pausado ")
            })
            .catch(error => { this.$toastr.e("Error al pausar la VM " + error) });
            this.getServers();
        },
      desPausarServer: async function(idServer) {
            console.log('Se ingresa a despausar')
            let data={"unpause": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.configG)
            .then(res => {
                this.$toastr.i("VM despausada ")
            })
            .catch(error => { this.$toastr.e("Error al despausar la VM " + error) });
            this.getServers();
        },
      bloquearServer: async function(idServer) {
            console.log('Se ingresa a bloquear')
            let data={"lock": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.configG)
            .then(res => {
                this.$toastr.i("VM bloqueada ")
            })
            .catch(error => { this.$toastr.e("Error al bloquear la VM " + error) });
            this.getServers();
        },
      desBloquearServer: async function(idServer) {
            console.log('Se ingresa a desbloquear')
            let data={"unlock": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.configG)
            .then(res => {
                this.$toastr.i("VM desbloqueada ")
            })
            .catch(error => { this.$toastr.e("Error al desbloquear la VM " + error) });
            this.getServers();
        }, 
        suspenderServer: async function(idServer) {
            console.log('Se ingresa a suspender')
            let data={"suspend": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.configG)
            .then(res => {
                this.$toastr.i("VM suspendida ")
            })
            .catch(error => { this.$toastr.e("Error al suspender la VM " + error) });
            this.getServers();
        },
        reanudarServer: async function(idServer) {
            console.log('Se ingresa a reanudar')
            let data={"resume": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.configG)
            .then(res => {
                this.$toastr.i("VM reanudada")
            })
            .catch(error => { this.$toastr.e("Error al reanudar la VM " + error) 
            console.log(error)
            });
            this.getServers();
        },
        reconstruirServer: async function(idServer) {
            console.log('Se ingresa a reanudar')
            let data={"resume": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.configG)
            .then(res => {
                console.log(res)
            })
            .catch(error => { this.$toastr.e("Error al reconstruir la VM " + error) });
            this.getServers();
        }, 
      
      editServer: async function (idServer){
        console.log (idServer)
      },
//Crear VM     
      getImages: async function(){
        //console.log('Se ingresa a getImage')
        await axios.get('http://'+configG.ipOpenstack+'/image/v2/images',this.configG)
        .then(res => {
          //console.log('Respuesta del post')          
          this.images = res.data.images          
        })
        .catch(error => {           
          this.$toastr.e("Error al obtener las imagenes: " + error ) });        
      },
      getNetwork: async function(){
       // console.log('Se ingresa a getNetwork ')
        await axios.get('http://'+configG.ipOpenstack+':9696/v2.0/networks?project_id='+this.project.id_openstack,this.configG)
        .then(res => {
          //console.log('Respuesta del get network')
          //console.log(res)
          this.network = res.data.networks[0].id
         // console.log(this.network)
        })
        .catch(error => { this.$toastr.e("Error al obtener la red del proyecto: " + error ) }); 
      },
//--------------------------------------------------------------------------------//
//-----------------------------Create server---------------------------------------//
//--------------------------------------------------------------------------------//
      comprobarFlavor: async function(vm){
        //console.log('Se muestra el vm inicial ',vm)
        
 //---------------------------------------------------------------------------------//
 //-- Consultar si existe flavor con el nombre, FORMATO ((RAM(Mb)-ALMACENAMIENTO(Gb)-VCPU(#)))
 //-- Si no existe, se manda a crear y si existe se toma el id del flavor para crear la VM 

        
        //Vamos a cambiar el nombre de la imagen por el id de la imagen
        for (let index = 0; index < this.images.length; index++) {
          if (this.images[index].name==vm.SO) {
            //console.log('El id buscado es ',this.images[index].id)
            vm.SO = this.images[index].id
        }}
        console.log('Se ingresa a comprobarFlavor')
        
        let name = vm.ram*1024+'-'+vm.disco_duro+'-'+vm.cpu
       
        await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/flavors/'+name,this.configG)
            .then(res => {
                //console.log("Si existe el flavor se envia el id y los demás datos")
               // console.log(res.data.flavor.id)
                //this.flavors = res.data.flavors
                this.addServer(vm,res.data.flavor.id)                                
            }).catch(async error => {                
                let data={
                  "flavor": {
                    "vcpus": parseInt(vm.cpu), 
                    "disk": parseInt(vm.disco_duro),
                    "ram": (parseInt(vm.ram)*1024), 
                    "id": name, 
                    "name": name 
                  }
                }        
               await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/flavors',data,this.config)
                .then(res => {
                  //console.log('Respuesta del CREATE FLAVOR')
                  //console.log(res.data.flavor.id)
                  
                  this.addServer(vm,res.data.flavor.id)
                  
                })
                .catch(error => {
                  console.log(error)
                  this.$toastr.e("Error al crear el flavor: " + error )
                });
              })
      },
      addServer: async function(vm,id_flavor){       
         $('#ModalCrear').modal('hide')
        let data={
          "server": {
            "name": vm.nombre,
            "imageRef": vm.SO, 
            "flavorRef": id_flavor,
            "key_name": "key-"+this.project.nombre_proyecto,
            //"availability_zone": "nova",            
            "max_count": 1, 
            "min_count": 1,  
            "networks": [{"uuid": this.network}]
          }
        }
        await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers',data,this.configG)
        .then( res => {
          
          this.$toastr.s("Creando VM ");       
          
          var esperando =  setTimeout(this.getServers(),60000 );   
                  
        })
        .catch(error => { this.$toastr.e("Error, verifique tener recursos disponibles.") 
        
        console.log(error)});
        
      }     
      
    },
    

    
}
</script>
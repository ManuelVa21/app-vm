<template>
    
    <div class="content">
    <div class="row">
        <div class="col-2">
          <SidebarAdmin style="position: sticky; top: 70px"></SidebarAdmin>
        </div>
        <div class="col-10" style="padding-left: 0;">
          
        <div style=" float: right;">
            <span>/</span>
            <router-link to="/PanelAdmin">Panel Admin</router-link>
            <span>/</span>
            <router-link to="/PanelAdmin/Recursos">Recursos</router-link>
            <span>/</span>
            <strong class="final-path">Máquinas Virtuales</strong>
            <span>/</span>
        </div><br>
            
            
                                        
            
          <div class="table-responsive">
            
            <VueyeTable 
                :data="listServer" 
                :columns="columns" 
                title="Máquinas Virtuales"                           
                filter-by="status">                            
<!-- Mostrar estado VM -->     
                <template v-slot:status="{item}">
                    <template v-if="item.status === 'ACTIVE'">                                        
                        <td class="bg-success text-white"><b>ACTIVE</b></td>                                        
                    </template>
                    <template v-if="item.status === 'VERIFY_RESIZE'">
                        <td class="bg-warning text-white"><b>VERIFICANDO</b></td>
                    </template>
                    <template v-else>
                        <td class="bg-danger text-white"><b>APAGADO</b></td>
                    </template>                                                                          
                </template>
 <!-- Mostrar Acciones sobre VM's -->
                <template v-slot:_id="{item}">
                    <template v-if="item.status === 'ACTIVE'">                                        
                        <div class="dropdown dropleft">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Action </button>
                        <div class="dropdown-menu">
                            <button v-on:click="editarServer(item.id)" type="button" class="btn btn-primary dropdown-item" data-toggle="tooltip" data-placement="top" title="Editar"><i class="fas fa-edit"></i> Editar</button>
                            <button v-on:click="apagarServer(item.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Apagar"><i class="fas fa-power-off"></i> Apagar</button>
                            <button v-on:click="reiniciarServer(item.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Reiniciar"><i class="fas fa-redo-alt"></i> Reiniciar</button>
                            <button v-on:click="consola(item.id)" type="button" class="btn btn-secondary dropdown-item" data-toggle="tooltip" data-placement="top" title="Abrir en consola"><i class="fas fa-expand"></i> Abrir</button>
                            <button v-on:click="backupServer(item.id)" type="button" class="btn btn-primary dropdown-item" data-toggle="tooltip" data-placement="top" title="Realizar Backup"><i class="fas fa-save"></i> Backup</button>
                            <button v-on:click="pausarServer(item.id)" type="button" class="btn btn-warning dropdown-item" data-toggle="tooltip" data-placement="top" title="Pausar"><i class="fas fa-pause"></i> Pausar</button>
                            <button v-on:click="bloquearServer(item.id)" type="button" class="btn btn-warning dropdown-item" data-toggle="tooltip" data-placement="top" title="Bloquear"><i class="fas fa-lock"></i> Bloquear</button>
                            <button v-on:click="suspenderServer(item.id)" type="button" class="btn btn-warning dropdown-item" data-toggle="tooltip" data-placement="top" title="Suspender"><i class="fas fa-moon"></i> Suspender</button>
                        <div class="dropdown-divider"></div>
                            <button v-on:click="deleteServer(item.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i> Eliminar</button>
                            <!--<button v-on:click="reconstruirServer(item.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Reconstruir"><i class="fas fa-circle-notch"></i> Reconstruir</button>-->
                        </div>
                        </div>                                        
                    </template>

                    <template v-if="item.status === 'VERIFY_RESIZE'">
                        <div class="dropdown dropleft">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Action
                            </button>
                        <div class="dropdown-menu">
                            <button v-on:click="confirmEditarServer(item.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Desbloquear"><i class="far fa-check-circle"></i> Confirmar edición</button>
                        <div class="dropdown-divider"></div>
                            <button v-on:click="deleteServer(item.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i> Eliminar</button>
                            <!--<button v-on:click="reconstruirServer(server.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Reconstruir"><i class="fas fa-circle-notch"></i> Reconstruir</button>-->
                        </div>
                        </div>
                    </template>

                    <template v-else>
                        <div class="dropdown dropleft">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Action
                            </button>
                        <div class="dropdown-menu">
                            <button v-on:click="encenderServer(item.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Encender"><i class="fas fa-power-off"></i> Encender</button>
                            <button v-on:click="reanudarServer(item.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Reanudar"><i class="fas fa-tv"></i> Reanudar</button>
                            <button v-on:click="consola(item.id)" type="button" class="btn btn-secondary dropdown-item" data-toggle="tooltip" data-placement="top" title="Abrir en consola"><i class="fas fa-expand"></i> Abrir</button>
                            <button v-on:click="editarServer(item.id)" type="button" class="btn btn-primary dropdown-item" data-toggle="tooltip" data-placement="top" title="Editar"><i class="fas fa-edit"></i> Editar</button>
                            <button v-on:click="reiniciarServer(item.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Reiniciar"><i class="fas fa-redo-alt"></i> Reiniciar</button>
                            <button v-on:click="backupServer(item.id)" type="button" class="btn btn-primary dropdown-item" data-toggle="tooltip" data-placement="top" title="Realizar Backup"><i class="fas fa-save"></i> Backup</button>
                            <button v-on:click="desPausarServer(item.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Despausar"><i class="fas fa-play"></i> Despausar</button>
                            <button v-on:click="desBloquearServer(item.id)" type="button" class="btn btn-success dropdown-item" data-toggle="tooltip" data-placement="top" title="Desbloquear"><i class="fas fa-lock-open"></i> Desbloquear</button>
                        <div class="dropdown-divider"></div>
                            <button v-on:click="deleteServer(item.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i> Eliminar</button>
                            <!--<button v-on:click="reconstruirServer(item.id)" type="button" class="btn btn-danger dropdown-item" data-toggle="tooltip" data-placement="top" title="Reconstruir"><i class="fas fa-circle-notch"></i> Reconstruir</button>-->
                        </div>
                        </div>
                    </template>
                </template>

            </VueyeTable>
                                                  
                
            </div>
            
        </div>
    </div>
  </div>  
</template>


<script>
import VueRouter from 'vue-router'
import axios from 'axios'
import VueComp from '@vue/composition-api'
import SidebarAdmin from '../SidebarAdmin.vue'
import VueyeTable from 'vueye-table'
import Token from '!!raw-loader!../../PanelAdmin/Token.txt'
const configG = require('../../../../config') 


export default {
    
    components:{        
        VueyeTable,
        SidebarAdmin
    },

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
            configDelete:{
                'User-Agent': 'openstacksdk/0.48.0 keystoneauth1/4.2.1 python-requests/2.23.0 CPython/3.8.2',
                'X-Auth-Token':Token
            },
            configEdit:{
                headers:{
                'User-Agent': 'python-novaclient',
                'X-Auth-Token':Token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-OpenStack-Nova-API-Version': '2.1' 
                }
            },
            servers: [],
            listServer: [],
            columns:[              
                {key: "tenant_id", label: "Proyecto", display: true, sortable: true},
                {key: "", label: "Usuario", display: true},
                {key: "name", label: "Nombre VM", display: true},                
                {key: "created", label: "Creado", display: true},
                {key: "image.id", label: "S.O.", display: true},
                {key: "flavor.id[0]", label: "Disco 'Gb'", display: true},                             
                {key: "flavor.id[1]", label: "RAM 'Mb'", display: true, sortable: true},
                {key: "flavor.id[2]", label: "CPU", display: true},
                {key: "", label: "IP", display: true},
                {key: "status", label: "Estado", display: true},
                {key: "id", label: "Acciones", display: true},                              
            ]  
        }
    },
    created(){
        this.getServers();
    },
    methods:{
        getServers: async function(){
            let server
            //console.log('Se ingresa a getServers')
            await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/servers/detail?all_tenants=True', this.config)
                .then(res => {
                    console.log(res.data.servers);
                    this.servers = res.data.servers;
                    //console.log(res.data.servers[4].addresses);
                })
                .catch(error => { this.$toastr.e("Error al cargar las VM's de OpenStack " + error) });
                for await ( server of this.servers){
                    server.tenant_id = await this.getOneProject(server.tenant_id);
                    if (server.image.id) {
                        server.image.id = await this.getOneImage(server.image.id);                        
                    }
                    else{
                        server.image.id =server.image.id; 
                    }
                    server.flavor.id= await this.getOneFlavor(server.flavor.id);
                }
                this.listServer = this.servers;
                console.log('list server es: ',this.listServer)
        },
        //Se obtiene el proyecto para nombre de proyecto. --Usar tenant_id--
        getOneProject: async function(id){
            let answer
            //console.log('Se ingresa  getOneProject')
            await axios.get('http://'+configG.ipOpenstack+'/identity/v3/projects/'+id,this.config)
                .then(res => {
                    //console.log(res.data.project.name)
                    answer= res.data.project.name;
                })
                .catch(error => { 
                    this.$toastr.e("Error al cargar el proyecto OpenStack " + error)
                    answer="error";
                    });
            return answer;
        },
        getOneImage: async function(id){
            let answer
            //console.log('Se ingresa  getOneImage')
            await axios.get('http://'+configG.ipOpenstack+'/image/v2/images/'+id,this.config)
                .then(res => {
                    //console.log(res)
                    //console.log(res.data.name)
                    answer= res.data.name;
                })
                .catch(error => { 
                    this.$toastr.e("Error al cargar la imagen de OpenStack " + error)
                    answer="error";
                    });
            return answer;
        },
        //Se obtiene un solo flavor
        getOneFlavor: async function(id){
            let answer=[] 
            //console.log('Se ingresa  getOneFlavor')
            await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/flavors/'+id, this.config)
                .then(res => {
                    //console.log(res.data);
                    answer[0] = res.data.flavor.disk;
                    answer[1] = res.data.flavor.ram;
                    answer[2] = res.data.flavor.vcpus;
                })
                .catch(error => { this.$toastr.e("Error al cargar el flavor OpenStack " + error) });
                return answer;
        },

//SERVER//
        addServer: async function(){
            console.log('Se ingresa a addServer')
            /*let data={
                "server": {
                    "name": "pruebaconhost",
                    "OS-DCF:diskConfig": "AUTO", 
                    "imageRef": "4ea30d31-e460-428e-9a32-4de90cabca2d", 
                    "flavorRef": "d1", 
                    "max_count": 1, 
                    "min_count": 1,  
                    "networks": [{"uuid": "f8ac43ad-01cb-44e4-806c-112cd26b0fdb"}]
                }
            };
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers',data,this.config)
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => { this.$toastr.e("Error al crear la VM " + error)});
                this.getServers();*/
        },
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
                .catch(error => { this.$toastr.e("Error al cargar la consola " + error) });
        },
        deleteServer: async function(idServer){
            //console.log('Se ingresa a deleteServer')
            await axios.delete('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer,this.config)
                .then(res => {
                    this.$toastr.i("VM eliminada ")
                })
                .catch(error => { this.$toastr.e("Error al eliminar el servidor " + error) });
                this.getServers();
        },
        backupServer: async function(idServer){
            console.log('Se ingresa a backup')
        },
        apagarServer: async function(idServer) {
            console.log('Se ingresa a apagar')
            let data={ "os-stop": null }
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                this.$toastr.i("Apagando VM ")
            })
            .catch(error => { this.$toastr.e("Error al apagar la VM" + error) });
            this.getServers();
        },
        encenderServer: async function(idServer) {
            console.log('Se ingresa a encender')
            let data={ "os-start": null }
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                this.$toastr.i("Encendiendo VM ")
            })
            .catch(error => { this.$toastr.e("Error al encender la VM " + error) });
            this.getServers();
        },
        editarServer: async function(idServer) {
            console.log('Se ingresa a editar')
            let data={"resize": {"flavorRef": "d2"}}
            // para revertir {"revertResize": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                this.$toastr.i("Editando la VM ")
            })
            .catch(error => { this.$toastr.e("Error al editar la VM " + error) });
            this.getServers();
        },
        confirmEditarServer: async function(idServer){
            console.log('Se ingresa a confirmEditarServer')
            let data={"confirmResize": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error confirmEditarServer',error); });
            this.getServers();
        },
        reiniciarServer: async function(idServer) {
            console.log('Se ingresa a reiniciar')
            let data={"reboot": {"type": "SOFT"}}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                this.$toastr.i("Reiniciando la VM " )
            })
            .catch(error => { this.$toastr.e("Error al reiniciar la VM " + error) });
            this.getServers();
        },
        pausarServer: async function(idServer) {
            console.log('Se ingresa a pausar')
            let data={"pause": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                this.$toastr.i("Servidor pausado ")
            })
            .catch(error => { this.$toastr.e("Error al pausar la VM " + error) });
            this.getServers();
        },
        desPausarServer: async function(idServer) {
            console.log('Se ingresa a despausar')
            let data={"unpause": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                this.$toastr.i("VM despausada ")
            })
            .catch(error => { this.$toastr.e("Error al despausar la VM " + error) });
            this.getServers();
        },
        bloquearServer: async function(idServer) {
            console.log('Se ingresa a bloquear')
            let data={"lock": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                this.$toastr.i("VM bloqueada ")
            })
            .catch(error => { this.$toastr.e("Error al bloquear la VM " + error) });
            this.getServers();
        },
        desBloquearServer: async function(idServer) {
            console.log('Se ingresa a desbloquear')
            let data={"unlock": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                this.$toastr.i("VM desbloqueada ")
            })
            .catch(error => { this.$toastr.e("Error al desbloquear la VM " + error) });
            this.getServers();
        },
        suspenderServer: async function(idServer) {
            console.log('Se ingresa a suspender')
            let data={"suspend": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                this.$toastr.i("VM suspendida ")
            })
            .catch(error => { this.$toastr.e("Error al suspender la VM " + error) });
            this.getServers();
        },
        reanudarServer: async function(idServer) {
            console.log('Se ingresa a reanudar')
            let data={"resume": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                this.$toastr.i("VM reanudada " + error)
            })
            .catch(error => { this.$toastr.e("Error al reanudar la VM " + error) });
            this.getServers();
        },
        reconstruirServer: async function(idServer) {
            console.log('Se ingresa a reanudar')
            let data={"resume": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { this.$toastr.e("Error al reconstruir la VM " + error) });
            this.getServers();
        }

    }
}
</script>
<template>
    <div class="content">
        <div class="row">
            
            <div class="col-2">
                <SidebarAdmin></SidebarAdmin>
            </div>

            <div class="col-10 " style="padding-left: 0;">
                <br><br><p>
                <div class="btn-group-vertical btn-group-lg" style="display: flex; align-items: center">   
                <button @click="$router.push('/PanelAdmin/Recursos/RecursosTelco')" class="btn btn-outline-info">Recursos Telco</button>
                <button @click="$router.push('/PanelAdmin/Recursos/Proyectos')" class="btn btn-outline-info">Proyectos</button>
                <button @click="$router.push('/PanelAdmin/Recursos/MaquinasVirtuales')" class="btn btn-outline-info">Máquinas Virtuales</button>
                <button @click="$router.push('/PanelAdmin/Recursos/Estadisticas')" class="btn btn-outline-info">Estadísticas</button>
                </div>      
            </div>

        </div>
    </div>
</template>

<script>
import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarAdmin from '../SidebarAdmin.vue'
import LineChart from '../Chart/LineChart.vue';

import Token from '!!raw-loader!../../PanelAdmin/Token.txt'
const configG = require('../../../../config')

class Project{
    constructor(nombre,descripcion){
        this.nombre = nombre;
        this.descripcion= descripcion;
    }
}

export default{
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
                'User-Agent': 'openstacksdk/0.36.0 keystoneauth1/3.18.0 python-requests/2.22.0 CPython/2.7.17',
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
            project: new Project(),
            recursosTs:[],
            servers:[],
            projects:[],
            pools:[],
            flavor:[]
        }
    },
    created(){
        this.getrecursosTelco();
        this.getServers();
        this.getProjects();
        //this.getPools();
    },
    components:{
        'SidebarAdmin': SidebarAdmin,
        'LineChart': LineChart
    },
    methods:{
        getPools: async function(){
            console.log('Se ingresa a getPools')
            let answer
            await axios.get('/api/pool_recursos/unpool?id_openstack='+id, configG.headersDataBase)
            .then(res => {
                console.log('Se muestra la respuesta del getPools')
                console.log(res.data.content)
                this.pools= res.data.contents
                this.comparacion()
            })
            .catch(error => { 
                console.log('Error en getPools',error);               
            });
        },
        comparacion: async function(){
            console.log('se ingresa a comparación')

        },   
        //Se obtiene un arreglo con todos los servidores
        getServers: async function(){
            let server
            //console.log('Se ingresa a getServers')
            await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/servers/detail?all_tenants=True', this.config)
                .then(res => {
                    console.log(res.data.servers);
                    this.servers = res.data.servers;
                    //console.log(res.data.servers[4].addresses);
                })
                .catch(error => { console.log('Error getServers',error); });
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
                    console.log('Error getOneProject ',error);
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
                    console.log('Error getOneImage',error);
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
                .catch(error => { console.log('Error getOneFlavor',error); });
                return answer;
        },
        //
        //
        getProjects: async function(){
            await axios.get('http://'+configG.ipOpenstack+'/identity/v3/projects/', this.config)
                .then(res => {
                    console.log(res.data.projects);
                    this.projects = res.data.projects;
                })
                .catch(error => { console.log('Error getProjects',error); });                
        },
        //
        //
        //Recursos Telco
        getrecursosTelco: async function(){
            //console.log('Se ingresa a recursosTelco')
            console.log('Se muestra token config',configG.tokenOpenStack)
            await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/os-hypervisors/detail', this.config)
            .then(res => {
                //console.log(res.data.hypervisors[0]);
                this.recursosTs = res.data.hypervisors;
            })
            .catch(error => { console.log('Error getrecursosTelco',error); });
        },
        //
        //
        //Buttons
        deleteProject: async function(info){
            //Delete project openstack
            await axios.delete('http://'+configG.ipOpenstack+'/identity/v3/projects/'+info.id,this.config)
                .then(res => {
                    console.log('Respuesta delete project',res)
                })
                .catch(error => { console.log('Error en deleteProject ',error); });
            //get user openstack
            await axios.get('http://'+configG.ipOpenstack+'/identity/v3/users?name='+info.name,this.config)
                .then(res => {
                    console.log('Respuesta get user',res.data.users[0].id)
                    this.deleteUser(res.data.users[0].id)
                })
                .catch(error => { console.log('Error en get user ',error); });
            //get network
            await axios.get('http://'+configG.ipOpenstack+':9696/v2.0/networks?name='+info.name+'-net',this.config)
                .then(res => {
                    console.log('Respuesta get network',res.data.networks[0].id)
                    this.deleteNetwork(res.data.networks[0].id)
                })
                .catch(error => { console.log('Error en get network ',error); });
            //get subnetwork 
            await axios.get('http://'+configG.ipOpenstack+':9696/v2.0/subnets?name='+info.name+'-subnet',this.config)
                .then(res => {
                    console.log('Respuesta get subnetwork',res.data.subnets[0].id)
                    this.deleteSubnetwork(res.data.subnets[0].id)
                })
                .catch(error => { console.log('Error en get subnetwork ',error); });
            //get Router
            await axios.get('http://'+configG.ipOpenstack+':9696/v2.0/routers?name='+info.name+'-router',this.config)
                .then(res => {
                    console.log('Respuesta get router',res.data.routers[0].id)
                    this.deleteRouter(res.data.routers[0].id)
                })
                .catch(error => { console.log('Error en get get ',error); });
            //Delete pool from database
            await axios.delete('/api/pool_recursos?id_openstack='+info.id, configG.headersDataBase)
                .then(res => { 
                        console.log('Respuesta del delete pool bd ',res)
                    })
                .catch(error => { console.log('Error en deletepool',error); });
                this.getProjects();
        },
        deleteUser: async function(userId){
            await axios.delete('http://'+configG.ipOpenstack+'/identity/v3/users/'+userId,this.config)
                .then(res => {
                    console.log('Respuesta delete user',res)
                })
                .catch(error => { console.log('Error en delete user ',error); });
        },
        deleteNetwork: async function(netId){
            await axios.delete('http://'+configG.ipOpenstack+':9696/v2.0/networks/'+netId,this.configDelete)
                .then(res => {
                    console.log('Respuesta delete network',res)
                })
                .catch(error => { console.log('Error en delete network ',error); });     
        },
        deleteSubnetwork: async function(subnetId){
            await axios.delete('http://'+configG.ipOpenstack+':9696/v2.0/subnets/'+subnetId,this.configDelete)
                .then(res => {
                    console.log('Respuesta delete subnetwork',res)
                })
                .catch(error => { console.log('Error en delete subnetwork ',error); });       
        },
        deleteRouter: async function(routerId){
            await axios.delete('http://'+configG.ipOpenstack+':9696/v2.0/routers/'+routerId,this.configDelete)
                .then(res => {
                    console.log('Respuesta delete router',res)
                })
                .catch(error => { console.log('Error en delete router ',error); });
        },
        addProject: async function(){
            //console.log('Se ingresa a addProject')
            let data={
                "project": {
                    "tags": [], 
                    "enabled": true, 
                    "description": this.project.descripcion, 
                    "name": this.project.nombre
                }
            };
            await axios.post('http://'+configG.ipOpenstack+'/identity/v3/projects',data,this.config)
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => { console.log('Error addProject',error); });
                this.getProjects();
                this.project = new Project();
        },
//SERVER//
        addServer: async function(){
            console.log('Se ingresa a addServer')
            let data={
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
                .catch(error => { console.log('Error addServer',error); });
                this.getServers();
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
                .catch(error => { console.log('Error consola',error); });
        },
        deleteServer: async function(idServer){
            //console.log('Se ingresa a deleteServer')
            await axios.delete('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer,this.config)
                .then(res => {
                    console.log(res)
                })
                .catch(error => { console.log('Error deleteServer',error); });
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
                console.log(res)
            })
            .catch(error => { console.log('Error apagarServer',error); });
            this.getServers();
        },
        encenderServer: async function(idServer) {
            console.log('Se ingresa a encender')
            let data={ "os-start": null }
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error encenderServer',error); });
            this.getServers();
        },
        editarServer: async function(idServer) {
            console.log('Se ingresa a editar')
            let data={"resize": {"flavorRef": "d2"}}
            // para revertir {"revertResize": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error editarServer',error); });
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
                console.log(res)
            })
            .catch(error => { console.log('Error reiniciarServer',error); });
            this.getServers();
        },
        pausarServer: async function(idServer) {
            console.log('Se ingresa a pausar')
            let data={"pause": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error pausarServer',error); });
            this.getServers();
        },
        desPausarServer: async function(idServer) {
            console.log('Se ingresa a despausar')
            let data={"unpause": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error desPausarServer',error); });
            this.getServers();
        },
        bloquearServer: async function(idServer) {
            console.log('Se ingresa a bloquear')
            let data={"lock": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error bloquearServer',error); });
            this.getServers();
        },
        desBloquearServer: async function(idServer) {
            console.log('Se ingresa a desbloquear')
            let data={"unlock": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error desBloquearServer',error); });
            this.getServers();
        },
        suspenderServer: async function(idServer) {
            console.log('Se ingresa a suspender')
            let data={"suspend": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error suspenderServer',error); });
            this.getServers();
        },
        reanudarServer: async function(idServer) {
            console.log('Se ingresa a reanudar')
            let data={"resume": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error reanudarServer',error); });
            this.getServers();
        },
        reconstruirServer: async function(idServer) {
            console.log('Se ingresa a reanudar')
            let data={"resume": null}
            await axios.post('http://'+configG.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action',data,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log('Error  en reconstruirServer',error); });
            this.getServers();
        }
    }
}
</script>
    <!--   -->

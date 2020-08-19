<template>
    
    <div class="content">
    <div class="row">
        <div class="col-2">
          <SidebarAdmin></SidebarAdmin>
        </div>
        <div class="col-10" style="padding-left: 0;">
          
        <div style=" float: right;">
            <span>/</span>
            <router-link to="/PanelAdmin">Panel Admin</router-link>
            <span>/</span>
            <router-link to="/PanelAdmin/Recursos">Recursos</router-link>
            <span>/</span>
            <strong class="final-path">Proyectos</strong>
            <span>/</span>
        </div><br>

            <p> Aquí va la información de proyectos </p>

            <div>
                <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#ModalAddProject">
                <span data-toggle="tooltip" data-placement="top" title="Agregar proyecto"><i class="fas fa-plus"></i></span>
                </button>
<!-- Modal Crear Proyecto -->
                <div class="modal fade" id="ModalAddProject" tabindex="-1" role="dialog" aria-labelledby="ModalAddProjectLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalAddProjectLabel">Crear Proyecto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div class="modal-body">
                    <form>
                        <div class="form-group text-left required">
                            <label class="control-label required" for="NombreProj">Nombre </label>
                            <input v-model="project.nombre" type="text" class="form-control" id="NombreProj" required placeholder="Ingresar Nombre">                                                          
                        </div>
                        <div class="form-group text-left required">
                            <label class="control-label" for="DescripcionProj">Descripción
                            </label>
                            <textarea v-model="project.descripcion" name="" id="DescripcionProj" rows="4" cols="40" class="form-control" placeholder="Ingresar Descripción"></textarea>   
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    <button v-on:click="addProject()" type="button" class="btn btn-primary" data-dismiss="modal">Crear</button>
                </div>
                </div>
                </div>
                </div>
            </div>
            <div class="table-responsive">
                
                <VueyeTable 
                :data="projects" 
                :columns="columns" 
                title="Proyectos"                           
                filter-by="name">


                <template v-slot:_id="{item}"> 
                    <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                         <button v-on:click="deleteProject(item)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                                        
                    </div>
                </template>

                </VueyeTable>  
                
                
                   
                   <!-- <div class="btn-group-sm" role="group" aria-label="Basic example">
                        </div> -->
                                                
                   
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
            projects:[],
            project:[],
           
           columns:[              
                {key: "name", label: "Nombre", display: true, sortable: true},
                {key: "description", label: "Descripción", display: true}, 
                {key: "correo", label: "Propietario", display: true},
                {key: "nombre_proyecto", label: "Almacenamiento", display: true},                
                {key: "motivo", label: "RAM", display: true},
                {key: "correo_tutor", label: "CPU", display: true},
                {key: "numvm", label: "# VM's", display: true},                             
                {key: "estado", label: "Fecha inicio", display: true, sortable: true},
                {key: "", label: "Fecha fin", display: true},
                {key: "_id", label: "Acciones", display: true},                                              
            ] 
        }
    },
    created(){
        this.getProjects();

    },
    methods:{
        getProjects: async function(){
            await axios.get('http://'+configG.ipOpenstack+'/identity/v3/projects/', this.config)
                .then(res => {
                    console.log(res.data.projects);
                    this.projects = res.data.projects;
                })
                .catch(error => { console.log('Error getProjects',error); });                
        },
        addProject: async function(){
            let data={
                "project": {
                    "tags": [], 
                    "enabled": true, 
                    "description": this.project.descripcion, 
                    "name": this.project.nombre
                }
            };
            console.log(data)
            await axios.post('http://'+configG.ipOpenstack+'/identity/v3/projects',data,this.config)
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => { console.log('Error addProject',error); });
                this.getProjects();
        },
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

    }
}
</script>
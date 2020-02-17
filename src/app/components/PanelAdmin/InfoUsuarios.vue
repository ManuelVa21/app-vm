<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-sm-2 col-with-right-border">
                    <SidebarAdmin></SidebarAdmin>
                </div>
                <div class="col-sm-8">
                 <div class="panel panel-info">
                    <p>Descripción de la sección</p>
                    <div class="container">
                        <div class="accordion" id="accordionIU">
                            <!-- Pestaña para listar elementos con sus características básicas, encenderlos, apagarlos, eliminarlos -->
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Listar usuarios
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionIU">
                                    <div class="card-body">
                                        <p>usuarios registrados en la plataforma Telco2.0</p>
                                        <h3>Usuarios</h3>
                                        <table class="table-responsive-xl table-striped table-hover w-auto text-center">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Correo</th>
                                                <th scope="col">Categoría de usuario</th>
                                               <!--  <th scope="col">Pool Recursos</th>
                                                <th scope="col">#MV</th> -->
                                                <th scope="col">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody  v-for="(usuario, index) in usuarios" v-bind:key="usuario.id">
                                                <tr>
                                                <th>{{index+1}}</th>
                                                <td>{{usuario.name}}</td>
                                                <td>{{usuario.email}}</td>
                                                <td> {{usuario.role}}</td>  
                                                <td>
                                                    <div class="btn-group-sm" role="group" aria-label="Basic example">
                                                                                                            
                                                       
                                                    <div>
                                                             <button  type="button" class="btn btn-info" data-toggle="tooltip"  data-target="#EditUsuario">
                                                                <span data-toggle="tooltip" data-placement="top" title="Editar"><i class="fas fa-edit"></i></span>
                                                            </button>
                                                             <!-- Modal -->
                                                            <div class="modal fade" id="EditUsuario" tabindex="-1" role="dialog" aria-labelledby="EditUsuarioLabel" aria-hidden="true">
                                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                                <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title" id="EditUsuarioLabel">Editar Información Usuario</h5>
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
                                                        
                                                        <button  type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Realizar Backup"><i class="fas fa-save"></i></button>
                                                        <button  type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                                        
                                                    </div>
                                                </td>
                                                </tr>                                                
                                            </tbody>
                                        </table>                                       
                                    </div>
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
import SidebarAdmin from './SidebarAdmin.vue'
const configG = require('../../../config')
//import Token from '!!raw-loader!../PanelAdmin/Token.txt'

export default{
   data(){
         return{
            /*config:{
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
            },*/
            usuarios:[],
            
        }
    },
    
    
    //10.55.6.31:3000/api/users/
    
    created(){
        //this.getFlavor();
        //this.getServers();
        //this.getOneFlavor();
        this.getUsuarios();
      //  this.getOneUser();
        //this.updateUsuario();
    },

    components:{
        'SidebarAdmin': SidebarAdmin
    },


   methods:{
        
        //Se obtienen los proyectos 

        getUsuarios: async function(){
            let usuario
            console.log('Se ingresa  getUsuarios')
            await axios.get('http://'+configG.ipServerUsuarios+':3000/api/users')
                .then(res => {
                    console.log(res);
                    this.usuarios = res.data;
                   
                   
                   //console.log(res.data.servers);
                    //this.addresses = res.data.servers[0].addresses;
                })
                .catch(error => {
                    console.log('Error ',error);
                });
        },
        
        /*getOneUser: async function(idUser){
            let usuario
            console.log('Se ingresa  getOneUser')
            await axios.get('http://'+configG.ipServerUsuarios+':3000/api/users/'+idUser)
                .then(res => {
                    console.log(res);
                    this.usuarios = res.data;
                   
                   
                   //console.log(res.data.servers);
                    //this.addresses = res.data.servers[0].addresses;
                })
                .catch(error => {
                    console.log('Error ',error);
                });
        },*/
        
       /* updateUsuario: async function(idUser){
            
            await axios.put('http://'+configG.ipServerUsuarios+':3000/api/users/'+idUser)
                .then(res => {
                    console.log(res)
                   // window.open(res.data.console.url)
                })
                .catch(error => { console.log('Error ',error); });
        }*/
        /*getUsuarios(){
            console.log('Se ingresa  getUsuarios')
            axios.get('http://10.55.2.24/compute/v2.1/servers/detail?all_tenants=True', this.config)
                .then(res => {
                    console.log(res.data);
                    //console.log(res.data.servers);
                    //console.log(res.data.servers[0].name);
                    this.servers = res.data.servers;
                    this.addresses = res.data.servers[0].addresses;
                })
                .catch(error => {
                    console.log('Error ',error);
                });
        }*/
   }
}
</script>
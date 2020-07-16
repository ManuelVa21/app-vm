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
                                    
                                    <!-- Modal -->
                                        <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#ModalAddUser">
                                           <span data-toggle="tooltip" data-placement="top" title="Agregar usuario"><i class="fas fa-plus"></i></span>
                                        </button>
                                      <!-- Modal -->
                                        <div class="modal fade" id="ModalAddUser" tabindex="-1" role="dialog" aria-labelledby="ModalAddUserLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="ModalAddUserLabel">Crear Usuario</h5>
                                                    <button v-on:click="limpiarUser()" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form>
                                                        <div class="form-group text-left required">
                                                            <label class="control-label required" for="NombreUsuario">Nombre </label>
                                                            <input v-model="User.nombre" type="text" id="NombreUsuario" class="form-control" required placeholder="Ingresar Nombre">                                                          
                                                        </div>
                                                        <div class="form-group text-left required">
                                                            <label class="control-label" for="Correo">Correo electrónico
                                                            </label>
                                                            <input v-model="User.correo" type="text" id="Correo" class="form-control" placeholder="Ingresar Correo">  
                                                        </div>
                                                        <div class="form-group text-left required">
                                                            <label class="control-label" for="Pool">Pool asociado
                                                            </label>
                                                            <input v-model="User.pool_asociado" type="text" id="Pool" class="form-control" placeholder="Ingrese nombre del pool">  
                                                        </div>
                                                        <div class="form-group text-left required">
                                                            <label class="control-label" for="Categoria">Categoría de usuario </label>
                                                            <select v-model="User.categoria_us" class="form-control" id="categoria">
                                                                    <option selected>Seleccione nuevo tipo de usuario</option>
                                                                    <option>Estudiante</option>
                                                                    <option>Docente</option>
                                                                    <option>Curso</option>
                                                                </select>   
                                                        </div>                                                                                                                         


                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button v-on:click="limpiarUser()" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                                    <button v-on:click="addUser()" type="button" class="btn btn-primary" data-dismiss="modal">Crear</button>
                                                </div>
                                                </div>
                                            </div>
                                            </div>


                                        <h3>Usuarios</h3>
                                        <div class="table-responsive">
                                        <table class="table table-striped table-hover w-auto text-center">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Correo</th>
                                                <th scope="col">Categoría de usuario</th>
                                                <th scope="col">Pool asociado</th>
                                               <!--  <th scope="col">Pool Recursos</th>
                                                <th scope="col">#MV</th> -->
                                                <th scope="col">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody  v-for="(usuario, index) in usuarios" v-bind:key="usuario.id">
                                                <tr>
                                                <th>{{index+1}}</th>
                                                <td>{{usuario.nombre}}</td>
                                                <td>{{usuario.correo}}</td>
                                                <td>{{usuario.categoria_us}}</td>  
                                                <td>{{usuario.pool_asociado}}</td> 
                                                <td>
                                                    <div class="btn-group btn-sm" role="group" aria-label="Basic example">
                                                    <div>
                                                        <button v-on:click="getOneUser(usuarios[index]._id)" type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#EditUsuario">
                                                            <span data-toggle="tooltip" data-placement="top" title="Editar Usuario"><i class="fas fa-edit"></i></span>
                                                        </button>          
                                                        <div class="modal fade" id="EditUsuario" tabindex="-1" role="dialog" aria-labelledby="EditUsuarioLabel" aria-hidden="true">
                                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title" id="EditUsuarioLabel">Editar Información Usuario</h5>
                                                                        <button v-on:click="limpiarUser()" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                <div class="modal-body">
                                                                     <form>
                                                                      
                                                                            <div class="form-group text-left required">
                                                                                <label class="control-label required" for="NombreUsuario">Nombre </label>
                                                                                <input v-model="User.nombre" type="text" id="NombreUsuario" class="form-control" required placeholder="Ingresar Nombre">                                                          
                                                                            </div>
                                                                            <div class="form-group text-left required">
                                                                                <label class="control-label" for="Correo">Correo electrónico
                                                                                </label>
                                                                                <input v-model="User.correo" type="text" id="Correo" class="form-control" placeholder="Ingresar Correo">   
                                                                            </div>
                                                                            <div class="form-group text-left required">
                                                                                <label class="control-label" for="Categoria">Categoría de usuario </label>
                                                                                <select v-model="User.categoria_us" class="form-control" id="categoria">
                                                                                        <option selected>Seleccione nuevo tipo de usuario</option>
                                                                                        <option>Estudiante</option>
                                                                                        <option>Docente</option>
                                                                                        <option>Curso</option>
                                                                                    </select>   
                                                                            </div>  
                                                                      </form>          
                                                                </div>
                                                                 <div class="modal-footer">
                                                                     
                                                                    <button v-on:click="updateUser(User.id)" type="button" class="btn btn-success" data-dismiss="modal">Guardar</button>
                                                                    <button v-on:click="limpiarUser()" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                                                        
                                                                 </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                     </div>
                                                        <!-- Boton enviar notificación -->
                                                        <div>
                                                            <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#ModalSendNotificacion">
                                                            <span data-toggle="tooltip" data-placement="top" title="Enviar notificación"><i class="fas fa-envelope"></i></span>
                                                            </button>
                                                            <!-- Modal -->
                                                            <div class="modal fade" id="ModalSendNotificacion" tabindex="-1" role="dialog" aria-labelledby="ModalSendNotificacion" aria-hidden="true">
                                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                                <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title" id="ModalSendNotificacion">Enviar Notificación</h5>
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <form>
                                                                        <div class="form-group text-left">
                                                                            <label class="control-label" for="UsuarioDes">Usuario Destino: {{usuario.nombre}}</label>
                                                                        </div>
                                                                        <div class="form-group text-left">
                                                                            <label class="control-label" for="CorreoDes">Correo: {{usuario.correo}}</label>
                                                                        </div>
                                                                        <div class="form-group text-left required">
                                                                            <label class="control-label" for="DescripcionNoti">Descripción
                                                                            </label>
                                                                            <textarea v-model="notificacion.descripcion" name="" id="DescripcionNoti" rows="4" cols="40" class="form-control" placeholder="Ingresar Descripción"></textarea>   
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                                                    <button v-on:click="sendNotificacion(usuario,notificacion)" type="button" class="btn btn-success" data-dismiss="modal">Enviar</button>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        <button v-on:click="confirmarDelete(usuarios[index]._id)" type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>
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
            </div>
        </section>
    </div>
</template>

<script>
import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarAdmin from './SidebarAdmin.vue'
const configG = require('../../../config')

class User {
    constructor (id, nombre, correo, categoria_us){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.categoria_us = categoria_us;
    }
} 

export default{
   data(){
         return{
            config:{
                headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin":"*"
                }
            },
            User: new User (),
            usuarios:[],
            notificacion:[]
        }
    },    
    created(){  
        this.getUsuarios();
    },
    components:{
        'SidebarAdmin': SidebarAdmin
    },
    methods:{
        //CREAR nuevo usuario   
        limpiarUser: async function(){this.User = new User()},
        addUser: async function(){     
           let info={
                    "nombre": this.User.nombre, 
                    "correo": this.User.correo,
                    "categoria_us": this.User.categoria_us
            };
            //console.log('Se ingresa crear usuario')
            //console.log(info)
            if (info.categoria_us === 'Estudiante') {
                await axios.post('/api/usuarios',info,this.config)
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error ',error); });
                this.getUsuarios();
                this.User = new User();
            } else if (info.categoria_us === 'Docente'){
                await axios.post('/api/usuarios',info,this.config)
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error ',error); });
                this.getUsuarios();
                this.User = new User();
            }else {
                await axios.post('/api/usuarios',info,this.config)
                .then(res => { console.log(res)})
                .catch(error => { console.log('Error ',error); });
                this.getUsuarios();
                this.User = new User();
            }
        },
//Se obtienen los Usuarios       
        getUsuarios: async function(){            
            await axios.get('/api/usuarios')
                .then(res => {
                    //console.log(res.data.content);
                    this.usuarios = res.data.content;  
                    this.User = new User ()
                })
                .catch(error => {
                    console.log('Error ',error);
                });
        },
//Obtener un usuario para luego editarlo
        getOneUser: async function(idUser){
               console.log(idUser);
               await axios.get('/api/usuarios/unusuario?_id='+idUser)
                .then(res => {
                    this.User = new User (res.data.content._id, res.data.content.nombre,
                    res.data.content.correo,res.data.content.categoria_us);  
                })
                .catch(error => {
                    console.log('Error ',error);
                });
        },
 //  Vamos a ACTUALIZAR un usuario
        updateUser: async function(idUser){
           let info={
                    "nombre":this.User.nombre, 
                    "correo":this.User.correo,
                    "categoria_us":this.User.categoria_us
            };
           //console.log(info)
           // console.log(User)
           await axios.put('/api/usuarios/'+idUser, info, this.config)
                .then(res => {
                    this.getUsuarios();
                    console.log(res)
                    this.User = new User ()
                })
                .catch(error => { console.log('Error ',error); });
        },
 //  Vamos a ELIMINAR un usuario
        confirmarDelete (idUser){
            var respuesta = confirm ('¿Estás seguro de eliminar este usuario?');
            if (respuesta == true)
            {
                this.deleteUser(idUser);
            }
            else{ 
                this.getUsuarios();
            }
        },
        deleteUser(idUser){         
            axios.delete('/api/usuarios?_id='+idUser, this.config)
                .then(res => {
                    //console.log(res.data);
                    this.getUsuarios();                    
                })
                .catch(error => {
                    console.log('Error ',error);
                });
        },
        sendNotificacion: async function(usuario,notificacion){
            //console.log('Se ingresa a send notificación')
            await axios.post('/api/alertas_notificaciones',{
                tipo: "Notificación",
                descripcion: notificacion.descripcion,
                usuario_destino: usuario.nombre,
                correo_usuario: usuario.correo
                }, configG.headersDataBase)
                .then(res => {
                    //this.makeToast('success','Notificación')
                    console.log('Respuesta sendNotificacion')
                    console.log(res) })
                .catch(error => { console.log('Error en sendNotificacion ',error); });
        },
        makeToast(variant = null,tipo) {
            $('#element').toast('show')
            
/*
            this.$bvToast.toast('Enviado correctamente', {
            title: tipo,
            toaster: 'b-toaster-top-right',
            variant: variant,
            appendToast: false,
            solid: true
            })*/
        }
    }
}
</script>
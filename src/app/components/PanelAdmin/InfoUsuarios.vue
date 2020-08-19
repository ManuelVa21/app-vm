<template>
 <div class="content">
    <div class="row">
        <div class="col-2">
            <SidebarAdmin></SidebarAdmin>
        </div>
        <div class="col-10">            
            
        <div style=" float: right;">
            <span>/</span>
            <router-link to="/PanelAdmin">Panel Admin</router-link>
            <span>/</span>
            <strong class="final-path">Info Usuarios</strong>
            <span>/</span>
        </div> <br>
            
            <!--  esto es para agregar un usuario sirve para probar-->                                                                                 
            <button @click="limpiarUsuario()" class="btn btn-success btn-sm" data-toggle="modal" data-target="#ModalAddUser">
                <span data-toggle="tooltip" data-placement="top" title="Agregar usuario"><i class="fas fa-plus"></i></span>
            </button>              

             <div class="modal fade" id="ModalAddUser" tabindex="-1" role="dialog" aria-labelledby="ModalAddUserLabel" aria-hidden="true">
             <div class="modal-dialog modal-dialog-centered" role="document">
             <div class="modal-content">

                <div class="modal-header text-white bg-primary">
                    <h5 class="modal-title modal-dark"><b>Crear Usuario</b></h5>
                    <button @click="limpiarUsuario()" type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button> 
                </div>

                <div class="modal-body">
                    
                    <form id="formAddUsuario">
                                             
                        <label>Nombre: * </label> <br>
                        <input v-model="usuario.nombre" type="text" id="nombre" class="form-control" placeholder="Ingresar Nombre"><br>                                                          
                                                        
                        Correo electrónico: *<br>
                        <input v-model="usuario.correo" type="text" id="correo" class="form-control" placeholder="Ingresar Correo"><br>  
                            
                        Pool asociado: *<br>
                        <input v-model="usuario.pool_asociado" type="text" id="pool_asociado" class="form-control" placeholder="Ingrese nombre del pool"> <br> 
                            
                        Categoría de usuario: *<br>
                        <select v-model="usuario.categoria_us" id="categoria_us" class="form-control">
                            <option selected>Seleccione nuevo tipo de usuario</option>
                                <option>Estudiante</option>
                                <option>Docente</option>
                                <option>Curso</option>
                        </select> 

                       
                    </form>
                </div>

                <div class="modal-footer">
                    <button v-on:click="validarForm()" type="button" class="btn btn-success" >Crear</button>
                    <button @click="limpiarUsuario()" type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close"> 
                                    Cancelar</button>                                            
                                      
                </div> 
                            
             </div>
             </div>
             </div>

                                        
        <div class="table-responsive">
            <VueyeTable 
              :data="usuarios" 
              :columns="columns" 
              title="Usuarios registrados"
              filter-by="nombre">

                <template v-slot:_id="{item}">
                    <div class="btn-group btn-sm" role="group">
           
                      <button @click="getOneUser(item._id)" class="btn-sm btn-success" data-toggle="modal" data-target="#modalRecursos" data-placement="top" title="Editar Usuario"><i class="fas fa-edit"></i></button>                                            
<!--MODAL EDITAR USUARIO  -->  
                        <div class="modal fade" id="modalRecursos" tabindex="-1" role="dialog" aria-labelledby="ModalRecursosLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            
                            <div class="modal-header text-white bg-primary"> 
                                <h5 class="modal-title modal-dark" id="modalID"><b>Editar información de usuario</b></h5>
                                <button @click="limpiarUsuario()" type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span></button>                                        
                            </div>

                            <div class="modal-body">
                                <form>
                                           
                                    <div class="form-group text-left required">                                                                                
                                    <label class="control-label required" for="NombreUsuario">Nombre </label>
                                    <input v-model="usuario.nombre" type="text" id="NombreUsuario" class="form-control" required placeholder="Ingresar Nombre">                                                          
                                    </div>
                                        
                                    <div class="form-group text-left required">
                                    <label class="control-label" for="Correo">Correo electrónico
                                    </label>
                                    <input v-model="usuario.correo" type="text" id="Correo" class="form-control" placeholder="Ingresar Correo">   
                                    </div>

                                    <div class="form-group text-left required">
                                      <label class="control-label" for="Categoria">Categoría de usuario </label>
                                      <select v-model="usuario.categoria_us" class="form-control" id="categoria">
                                            <option selected>Estudiante</option>
                                            <option>Docente</option>
                                            <option>Curso</option>
                                      </select>   
                                    </div> 
                                </form>                                         
                            </div>

                            <div class="modal-footer">
                                <button @click="updateUser()" type="button" class="btn btn-success" data-dismiss="modal" aria-label="Close">
                                    Editar Usuario </button>
                                <button @click="limpiarUsuario()" type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close"> 
                                    Cancelar</button>                                           
                                      
                            </div> 

                        </div>
                        </div>
                        </div>

                      <button @click="getOneUser(item._id)" class="btn-sm btn-info" data-toggle="modal" data-target="#ModalSendNotificacion" data-placement="top" title="Enviar notificación"><i class="fas fa-envelope"></i></button>
<!--MODAL ENVIAR NOTIFICACIóN  -->  
                        <div class="modal fade" id="ModalSendNotificacion" tabindex="-1" role="dialog" aria-labelledby="ModalSendNotificacion" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalSendNotificacion">Enviar Notificación</h5>
                                <button @click="limpiarUsuario()" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span> </button>
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
                                    <label class="control-label" for="DescripcionNoti">Descripción </label>
                                        <textarea v-model="notificacion.descripcion" name="" id="DescripcionNoti" rows="4" cols="40" class="form-control" placeholder="Ingresar Descripción"></textarea>   
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button v-on:click="sendNotificacion(usuario,notificacion)" type="button" class="btn btn-success" data-dismiss="modal">Enviar</button>
                            <button @click="limpiarUsuario()" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                    </div>
                    </div>
                      
                      
                      <button v-on:click="confirmarDelete(item._id)" class="btn-sm btn-danger"  title="Eliminar Usuario"><i class="fas fa-trash"></i></button>
                    </div>                                                                                                       
                </template>                                           
                                                
            </VueyeTable>                                        
        </div>
        </div>
    </div>
 </div>   
</template>

<script>
import VueRouter from 'vue-router'
import VueyeTable from 'vueye-table'
import VueToastr from 'vue-toastr'
import axios from 'axios'
import SidebarAdmin from './SidebarAdmin.vue'
const configG = require('../../../config')



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
            notificacion:[],
            usuarios:[],
            usuario: [],            
            columns:[
                {key: "nombre", label: "Usuario", display: true},                
                {key: "correo", label: "Correo usuario", display: true},
                {key: "categoria_us", label: "Categoria", display: true, sortable: true},
                {key: "pool_asociado", label: "Pool", display: true},                
                {key: "_id", label: "Acciones", display: true},             
                
            ]
        }
    },    
    created(){  
        this.getUsuarios();
    },
    components:{
        'SidebarAdmin': SidebarAdmin,
        VueyeTable
    },
   methods:{
       //CREAR nuevo usuario   
        
        addUser: async function(){ 
            let info={
                    "nombre": this.usuario.nombre, 
                    "correo": this.usuario.correo,
                    "categoria_us": this.usuario.categoria_us,
                    "pool_asociado": this.usuario.pool_asociado
            };
            //console.log('Se ingresa crear usuario')
            //console.log(info)
            await axios.post('/api/usuarios',info,this.config)
            .then(res => { 
                this.$toastr.s("El usuario: "+ this.usuario.nombre +" fue creado correctamente")
                   
                //console.log(res)
            })
            .catch(error => { console.log('Error ',error); });
            this.getUsuarios();     
        },
//Se obtienen los Usuarios       
       getUsuarios: async function(){            
            await axios.get('/api/usuarios')
                .then(res => {
                    //console.log(res.data.content);
                    this.usuarios = res.data.content; 
                    this.limpiarUsuario()
                    //console.log(this.usuarios);                    
                })
                .catch(error => {
                    console.log('Error ',error);
                });
        },
//Obtener un usuario para luego editarlo
        getOneUser: async function(idUser){
               //console.log(idUser);
               await axios.get('/api/usuarios/unusuario?_id='+idUser)
                .then(res => {
                    this.usuario = res.data.content;
                     
                })
                .catch(error => {
                    console.log('Error ',error);
                });
        },
 //  Vamos a ACTUALIZAR un usuario
        updateUser: async function(){
                     
           //console.log(info)
           // console.log(User)
           await axios.put('/api/usuarios/'+this.usuario._id , this.usuario, this.config)
                .then(res => {
                    this.getUsuarios();
                    this.$toastr.s("Usuario editado correctamente")
                    //console.log(res)                    
                })
                .catch(error => { console.log('Error ',error); });
        },
 //  Vamos a ELIMINAR un usuario
        confirmarDelete (idUser){
            var respuesta = confirm ('¿Estás seguro de eliminar este usuario?');
            if (respuesta)
            {this.deleteUser(idUser);}
            else {this.limpiarUsuario()}            
        },
       deleteUser: async function(idUser){         
            await axios.delete('/api/usuarios?_id='+idUser, this.config)
                .then(res =>{
                    this.$toastr.s("El usuario fue eliminado correctamente")                                              
                    this.getUsuarios();
                })
                .catch(error => {
                    console.log('Error ',error);
                    this.$toastr.e("El usuario no se pudo eliminar, error:"+ error)
                });
        },
        limpiarUsuario(){
            usuario :[
                        this.usuario.nombre = '', 
                        this.usuario.correo = '',
                        this.usuario.categoria_us = '',
                        this.usuario.pool_asociado = '',
                    ];
        },
        validarForm: async function(){
            if(this.usuario.nombre && this.usuario.correo && 
                this.usuario.categoria_us && this.usuario.pool_asociado){
                    this.addUser();
                    $('#ModalAddUser').modal('hide')
                    //this.$toastr.s("Usuario creado correctamente")
            }
            else if(!this.usuario.nombre)
            {   
                this.$toastr.w("El nombre es obligatorio")
                //alert("El nombre es obligatorio")
                formAddUsuario.nombre.focus() 
            }
            else if(!this.usuario.correo)
            {  
                this.$toastr.w("El correo es obligatorio")
                formAddUsuario.correo.focus() 
            }
            else if (!this.usuario.pool_asociado)
            {   
                this.$toastr.w("El pool es obligatorio")
                formAddUsuario.pool_asociado.focus() 
            }

            else if (!this.usuario.categoria_us)
            {  
                this.$toastr.w("La categoria de usuario es obligatoria")
                
            }
          
        },
//   ENVIAR UNA NOTIFICACION
        sendNotificacion: async function(usuario,notificacion){
            //console.log('Se ingresa a send notificación')
            await axios.post('/api/alertas_notificaciones',{
                tipo: "Notificación",
                descripcion: notificacion.descripcion,
                usuario_destino: usuario.nombre,
                correo_usuario: usuario.correo
                }, configG.headersDataBase)
                .then(res => {
                    this.$toastr.s("Notificación enviada al usuario: "+ this.usuario.nombre)
                    this.limpiarUsuario()
                    console.log('Respuesta sendNotificacion')
                    console.log(res) })
                .catch(error => { console.log('Error en sendNotificacion ',error); });
        }, 
   }
}
</script>
<template>
    <div class="content">
    <div class="row">

        <div class="col-2">
            <SidebarAdmin style="position: sticky; top: 75px"></SidebarAdmin>
        </div>
    <div class="col-10">            
            
        <div style=" float: right;">
            <span>/</span>
            <router-link to="/PanelAdmin">Panel Admin</router-link>
            <span>/</span>
            <strong class="final-path">Info Usuarios</strong>
            <span>/</span>
        </div> <br>
                                        
        <div class="table-responsive">

        <VueyeTable 
          :data="usuarios" 
          :columns="columns" 
          title="Usuarios con pool de recursos"
          filter-by="nombre">

                <template v-slot:_id="{item}">
                    <div class="btn-group-sm" role="group">
           
                      <button @click="getOneUser(item._id)" class="btn-sm btn-success" data-toggle="modal" data-target="#modalRecursos" data-placement="top" title="Editar Usuario"><i class="fas fa-edit"></i></button>                                            
                      <button @click="getOneUser(item._id)" class="btn-sm btn-info" data-toggle="modal" data-target="#ModalSendNotificacion" data-placement="top" title="Enviar notificación"><i class="fas fa-envelope"></i></button>
                     <!-- <button @click="eliminarUsuario(item._id)" class="btn-sm btn-danger" data-placement="top" title="Eliminar usuario"><i class="fas fa-trash"></i></button>  -->
                    </div>                                                                                                       
                </template>                                           
                                                
        </VueyeTable>  
        </div>
        

<!--MODAL EDITAR USUARIO  -->  
        <div class="modal fade" id="modalRecursos" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            
            <div class="modal-header text-white bg-primary"> 
                <h5 class="modal-title modal-dark" ><b>Editar información de usuario</b></h5>
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
                    <label class="control-label" for="Correo">Correo electrónico</label>
                    <input v-model="usuario.correo" type="text" id="Correo" class="form-control" placeholder="Ingresar Correo">   
                </div>
                <div class="form-group text-left required">
                    <label class="control-label" for="Correo">Director</label>
                    <input v-model="usuario.tutor" type="text" id="Correo" class="form-control" placeholder="Ingresar Correo">   
                </div>
                <div class="form-group text-left required">
                    <label class="control-label" for="Correo">Correo Director</label>
                    <input v-model="usuario.correo_tutor" type="text" id="Correo" class="form-control" placeholder="Ingresar Correo">   
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

<!--MODAL ENVIAR NOTIFICACIóN  -->  
        <div class="modal fade" id="ModalSendNotificacion" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header text-white bg-primary">
                <h5 class="modal-title" >Enviar Notificación</h5>
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
                {key: "pool_asociado", label: "Proyecto", display: true},
                {key: "tutor", label: "Director", display: true},
                {key: "correo_tutor", label: "Correo director", display: true},                               
                {key: "categoria_us", label: "Categoria", display: true, sortable: true},
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
//Se obtienen los Usuarios       
       getUsuarios: async function(){            
            await axios.get('/api/usuarios')
            .then(res => {                    
                this.usuarios = res.data.content; 
                //console.log(this.usuarios)
                this.limpiarUsuario()                   
            })
            .catch(error => {
               this.$toastr.e("Error al obtener usuarios: " + error)
            });
        },
//Obtener un usuario para luego editarlo
        getOneUser: async function(idUser){
            await axios.get('/api/usuarios/unusuario?_id='+idUser)
             .then(res => {
                 this.usuario = res.data.content;                     
             })
             .catch(error => {
                 this.$toastr.e("Error al obtener el usuario " + error);
             });
        },
 //  Vamos a ACTUALIZAR un usuario
        updateUser: async function(){                   
           await axios.put('/api/usuarios/'+this.usuario._id , this.usuario, this.config)
            .then(res => {
                this.getUsuarios();
                this.$toastr.s("Usuario editado correctamente")                                        
            })
            .catch(error => { this.$toastr.e("Error al actualizar el usuario: " + error); });
        },
        limpiarUsuario(){
            usuario :[
                this.usuario.nombre = '', 
                this.usuario.correo = '',
                this.usuario.tutor = '',
                this.correo_tutor = '',
                ];
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
                    this.enviarCorreo ()                                        
                })
                .catch(error => { this.$toastr.e("Error al enviar notificación a la aplicación: "+ error) });
        }, 

        enviarCorreo: async function(){
            await axios.post('/api/enviar_correo',{
                mensaje: this.notificacion.descripcion,
                correo_usuario: this.usuario.correo
                })
                .then(res => {
                    this.$toastr.s("Notificación enviada al usuario: "+ this.usuario.nombre)
                    this.limpiarUsuario()                   
                    })
                .catch(error => { 
                    //console.log('Error en sendNotificacion ',error);
                    this.$toastr.e("Error al enviar el correo: "+ error)
                    //console.log(error) 
                });                                        
        }, 
//FUNCIONES DE PRUEBA
        
       
//Delete usuario
        eliminarUsuario: async function (id){
            await axios.delete('/api/usuarios?_id='+id)            
            .then(res => {this.$toastr.s("Usuario eliminado")
            this.getUsuarios();
            })            
            .catch(error => { this.$toastr.e("Error al eliminar el usuario: " + error )});
        }

   }
}
</script>
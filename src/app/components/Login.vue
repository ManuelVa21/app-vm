 <!-- -->
<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form @submit.prevent="login">
                    <h1 class="h3 mb-3 font-weight-normal">Login</h1>
                    <div class="form-group">
                        <div class="form-group">
                            <label for="email">Correo Electrónico</label>
                            <input type="email" v-model="usuario.correo" class="form-control" name="email" placeholder="Correo electrónico">
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña</label>
                            <input type="password" v-model="usuario.contrasena" class="form-control" name="contrasena" placeholder="Contraseña">
                        </div>
                        <button type="submit" class="btn btn-lg btn-primary btn-block" @click="login()"> Ingresar</button>
                    </div>
                </form>
                <p class="text-center">Al ingresear se aceptan <a href="">Terminos y Condiciones</a> de la Plataforma Telco 2.0</p>
            </div>
        </div>
    </div>
    
</div>
</template>

<script>
import VueRouter from 'vue-router'
import axios from 'axios'
import EventBus from './EventBus.vue'
export default{
    //name: 'Login',
    data(){
        return{
            respu:[],
            usuario:{
                correo:"",
                contrasena:""
            }
            
        }
    },
    created(){
        
    },
    methods:{
        login(){
            //Verificar si el usuario ingresa datos
            if (this.usuario.correo != "" && this.usuario.contrasena != "") {         
                var buscar = this.buscaruno(this.usuario.correo)
                console.log('Mostrar buscar')
                console.log(buscar)
                if (buscar) {
                    //Si el usuario existe se hace el loggeo
                    console.log('El usuario existe previamente')
                    
                    axios.post('usuarios/login',{
                        correo: this.usuario.correo,
                        contrasena: this.usuario.contrasena
                    })
                    .then(res => {
                    localStorage.setItem('usertoken', res.data)
                    this.correo = ''
                    this.contrasena = ''
                    this.$router.push({ name: 'PanelUsuario' })
                    })
                    .catch(err => { console.log(err) })
                    this.emitMetodo()
                    
                }
                else{
                    alert('El correo o contraseña son invalidos')
                    console.log('El correo o contraseña son invalidos')
                }
            } else {
                alert('El correo y contraseña son campos obligatorios')
            }
        },
         buscaruno: async function(dato){
            console.log('Buscar uno')
            console.log(dato)
            var self = this
            //let respu = {};
            //console.log(respu)
            //console.log(self.respu)
            await axios.get('/usuarios/unusuario', { params: { correo: dato } })
            .then(function (res) { 
                console.log(res)
                self.respu = res.data;
                console.log('mostrar res.data');
                //console.log(self.respu);
                return self.respu;
            })
            .catch(function (error) { console.log(error); })
            return self.respu
        },
        emitMetodo(){
            EventBus.$emit('logged-in', 'loggedin')
        }
    }
}
</script>
    <!--   -->

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
//            usuarios:[],
            usuario:{
                correo:"",
                contrasena:""
            },
            respu:[]
        }
    },
    created(){
        
    },
    methods:{
        getUsuario(){
            console.log('Buscar uno')
            console.log(this.usuario.correo)
            axios.get('/usuarios/unusuario', { params: { correo: this.usuario.correo } })
            .then(function (res) { 
                if (res.data) {
                    console.log('se encontro el correo')
                    console.log('se muestra el data')
                    console.log(res.data)
                    this.respu = res.data
                }
                else{ console.log('No se encontro el correo') } })
            .catch(function (error) { console.log(error); })  
            console.log('Despues del axios')    
            console.log(this.respu)   
        },
        crearUsuario(){
            axios.post('usuarios/registro',{
                correo: this.usuario.correo,
                contrasena: this.usuario.contrasena
            })
            .then(res => { this.$router.push({ name: 'PanelUsuario' }) })
            .catch(err => { console.log(err) });
            this.emitMetodo()
            console.log('Se crea el usuario')
        },
        login(){
            //Verificar si el usuario ingresa datos
            if (this.usuario.correo != "" && this.usuario.contrasena != "") {         
                //Se verifica si el usuario existe. Segun la respuesta se crea o se ingresa
                console.log(this.usuario.correo)
                console.log(this.usuario.contrasena)
                this.getUsuario(this.usuario.correo)
                console.log('se muestra respu')
                console.log(this.respu)
                if (this.respu) {
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
                    //Se crea el registro y se ingresa a la app
                    //this.crearUsuario()
                    console.log('El correo o contraseña son invalidos')
                }
            } else {
                console.log('El correo y contraseña son campos obligatorios')
            }
        },
        emitMetodo(){
            EventBus.$emit('logged-in', 'loggedin')
        }
        
    }
}
</script>
    <!--   -->


    <!-- <router-link to='/Login' class="btn btn-outline-primary float-right" >Login</router-link> -->
<template>

<div>
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 class="display-4">Servicio de máquinas virtuales Plataforma Telco 2.0</h1>
            <p class="lead">Administra tu mismo los recursos que tenemos asignados para ti en la plataforma.</p>
        </div>
        </div>
</div>

</template>


<script>
import VueRouter from 'vue-router'
import axios from 'axios'

export default{
    data(){
        return {
            token:''
        }
    },
    created(){
        this.limpiar();
    },
    methods:{
        limpiar: async function(){
            
  //          localStorage.clear();
            this.geturl();
        },
        geturl: async function(){
            var URLsearch = window.location.search
            console.log('Se muestra el windowlocation ',URLsearch)
            this.token = URLsearch.substr(1)
            //localStorage.setItem('userToken',this.token)
            console.log('Quitando la poscion 0 queda ',this.token)
            await axios.get('http://10.55.6.31:3000/auth/verify', {headers : {'x-access-token': this.token,'Content-Type':'application/json'}})
            .then(res => { 
                console.log('Se muestra la respuesta del axios de info usuario ',res.data.user)
                //this.$router.push({ name: 'PanelUsuario' })                
                localStorage.setItem('userInfo', JSON.stringify(res.data.user))
                window.location.replace('/')

                //this.user(res.data.user)
                })
            .catch(error => { console.log('Error en el axios del servidor ',error); });            
        },//Fin de getUrl
        user: async function(data){
            console.log('se ingresa a funcion user ', data)
            if (data.role === 'guest') {
                console.log('Se ingresa a panel usuario ')
                window.location.replace('/')
            } else {
                console.log('Se ingresa a panel admin')
            }
        }
    }
}
</script>
    <!-- <router-link to='/Login' class="btn btn-outline-primary float-right" >Login</router-link> -->
<template>

<div>
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 class="display-4">Servicio de máquinas virtuales Plataforma Telco 2.0</h1>
            <p class="lead">Solicita y administra los recursos asignados.</p>
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
        this.geturl();
    },
    methods:{
        geturl: async function(){
            var URLsearch = window.location.search
            if (URLsearch) {
                console.log('Hay token en la url')
                console.log(URLsearch)
                this.token = URLsearch.substr(1)
                localStorage.setItem('userToken',this.token)
                this.consulta(this.token)
            }
        },
        consulta: async function(token){
            await axios.get('http://10.55.6.31:3000/auth/verify', {headers : {'x-access-token': token,'Content-Type':'application/json'}})
            .then(res => { 
                //console.log('Se muestra la respuesta del axios de info usuario ',res.data.user)
                localStorage.setItem('userInfo', JSON.stringify(res.data.user))
                window.location.replace('/')
                })
            .catch(error => { console.log('Error en el axios del inicio ',error); });
        }
    }
}
</script>
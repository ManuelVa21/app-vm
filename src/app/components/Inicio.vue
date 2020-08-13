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
        this.geturl();
    },
    methods:{
        geturl: async function(){
            var URLsearch = window.location.search
            if (URLsearch) {
                //console.log('Hay token en la url')
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
                //Se compara el role
                if (res.data.user.role === 'guest') {
                    //console.log('Se ingresa a panel usuario ')
                    window.location.replace('/')
                    //this.$router.push({ name: 'PanelUsuario' })
                } else {
                    //console.log('Se ingresa a panel admin')
                    window.location.replace('/')
                    //this.$router.push({ name: 'PanelAdmin' })
                }
                })
            .catch(error => { console.log('Error en el axios del inicio ',error); });
        }
    }
}
</script>
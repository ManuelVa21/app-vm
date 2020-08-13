<template>
    
    <div class="content">
    <div class="row">
        <div class="col-2">
          <SidebarAdmin></SidebarAdmin>
        </div>
        <div class="col-10" style="padding-left: 0;">
          
             <div class="btn-group btn-group-lg" style="display: flex; align-items: center;">   
             <button @click="$router.push('/PanelAdmin/Recursos/Proyectos')" class="btn btn-outline-info">Proyectos</button>
             <button @click="$router.push('/PanelAdmin/Recursos/MaquinasVirtuales')" class="btn btn-outline-info">Máquinas Virtuales</button>
             <button @click="$router.push('/PanelAdmin/Recursos/Estadisticas')" class="btn btn-outline-info">Estadísticas</button> 
            </div> 

            <p>Infomación correspondiente a los recursos de la plataforma Telco 2.0</p>    
            <h3>Recursos Totales Telco: OpenStack</h3>
            <div class="table-responsive">
                <table class="table text-center table-responsive-xl table-striped table-hover w-auto">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">Nombre Host</th>
                        <th scope="col">ip Host</th>
                        <th scope="col">Almacenamiento</th>
                        <th scope="col">Almacenamiento libre</th>
                        <th scope="col">RAM</th>
                        <th scope="col">RAM libre</th>
                        <th scope="col">CPU</th>
                        <th scope="col">CPU libre</th>
                        <th scope="col">VM corriendo</th>
                    </tr>
                    </thead>
                    <tbody  v-for="recursosT in recursosTs" v-bind:key="recursosT.id">
                    <tr>
                        <td>{{recursosT.hypervisor_hostname}}</td>
                        <td>{{recursosT.host_ip}}</td>
                        <td>{{recursosT.local_gb+' Gb'}}</td>
                        <td>{{recursosT.free_disk_gb+' Gb'}}</td>
                        <td>{{(recursosT.memory_mb/1024).toFixed(1)+' Gb'}}</td>
                        <td>{{(recursosT.free_ram_mb/1024).toFixed(1)+' Gb'}}</td>
                        <td>{{recursosT.vcpus}}</td>
                        <td>{{(recursosT.vcpus - recursosT.vcpus_used)}}</td>
                        <td>{{recursosT.running_vms}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <br>

            <h3>Recursos Totales Telco: VMWare</h3>
            <div class="table-responsive">
                <table class=" table text-center table-responsive-xl table-striped table-hover w-auto">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">Nombre Host</th>
                        <th scope="col">ip Host</th>
                        <th scope="col">Almacenamiento</th>
                        <th scope="col">Almacenamiento libre</th>
                        <th scope="col">RAM</th>
                        <th scope="col">RAM libre</th>
                        <th scope="col">CPU</th>
                        <th scope="col">CPU libre</th>
                        <th scope="col">VM corriendo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    </tbody>
                </table>
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

/*import Token from '!!raw-loader!../PanelAdmin/Token.txt'
import LineChart from './Chart/LineChart.vue';
const configG = require('../../../config') */



export default {
    
    components:{        
        VueyeTable,
        SidebarAdmin
    },

    data(){
        return{

            //    Definir el TOKEN
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
            recursosTs:[],
            
            //               PARA VUEYE-TABLE
            /*
            columns:[              
                {key: "usuario", label: "Usuario", display: true, sortable: true},
                {key: "correo", label: "Correo usuario", display: true},
                {key: "nombre_proyecto", label: "Proyecto", display: true},                
                {key: "motivo", label: "Motivo", display: true},
                //{key: "correo_tutor", label: "Correo director", display: true},
                //{key: "numvm", label: "# VM's", display: true},                             
                {key: "estado", label: "Estado", display: true, sortable: true},
                //{key: "_id", label: "Recursos", display: true},
                {key: "_id", label: "Acciones", display: true},
                //{key: "fecha", label: "fecha", display: true}                               
            ]*/
        }


    },
    created(){
        //this.getrecursosTelco();

    },
   
    methods:{

        getrecursosTelco: async function(){
            //console.log('Se ingresa a recursosTelco')
            await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/os-hypervisors/detail', this.config)
            .then(res => {
                //console.log(res.data.hypervisors[0]);
                this.recursosTs = res.data.hypervisors;
            })
            .catch(error => { console.log('Error getrecursosTelco',error); });
        },
        

    }
}
</script>
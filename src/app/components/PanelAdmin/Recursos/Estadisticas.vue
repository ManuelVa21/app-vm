<template>
    
    <div class="content">
    <div class="row">
        <div class="col-2">
          <SidebarAdmin style="position: sticky; top: 70px"></SidebarAdmin>
        </div>
        <div class="col-10" style="padding-left: 0;">
          
            <div style=" float: right;">
                <span>/</span>
                <router-link to="/PanelAdmin">Panel Admin</router-link>
                <span>/</span>
                <router-link to="/PanelAdmin/Recursos">Recursos</router-link>
                <span>/</span>
                <strong class="final-path">Estadísticas</strong>
                <span>/</span>
            </div> <br> <br>
            
            

            <div class="text-center">
                <p> Seleccione un rango de fechas para graficar el número de solicitudes, notificaciones y alarmas generadas por mes. </p> <br>
            <div class="row">
                <div class="col"> 
                    
                    <label><b>Ingrese la fecha inicial *</b></label><br>
                    <input  v-model="fechaInicial" type="date" value="2020-01-01" min="2020-01-01" max="2025-12-31" required>
                    
                </div>
                <div class="col">
                    <label><b>Ingrese la fecha final *</b></label><br>
                    <input v-model="fechaFinal" type="date" value="2020-01-01" min="2020-01-01" max="2025-12-31" required>
                </div>                
            </div><br>
                <button @click="crearGrafica()" type="button" class="btn btn-success">crear gráfica</button> 
            </div><br>
            
             <line-chart
                v-if="loaded" 
                :chartdata="chartdata"
                :options="options"> </line-chart>           
          
            
        </div>
    </div>
  </div>  
</template>


<script>
import VueRouter from 'vue-router'
import axios from 'axios'
import VueComp from '@vue/composition-api'
import SidebarAdmin from '../SidebarAdmin.vue'
import LineChart from '../Chart/LineChart.vue'

let fechaInicial 
let fechaFinal


export default {
    
    components:{ 
        SidebarAdmin,
        LineChart
    },

  //  data: () => ({
    data (){ 
        return{    
            loaded: false,        
            chartdata :{
                 //Data to be represented on x-axis
                labels: [],
                datasets: [
                    {
                      label: 'Solicitudes',
                      borderColor: 'blue',
                      pointBackgroundColor: 'white',
                      borderWidth: 1,
                      //pointBorderColor: '#249EBF',
                      //Data to be represented on y-axis
                      data: [] 
                    },
                    {
                      label: 'Notificaciones',
                      borderColor: 'green',
                      pointBackgroundColor: 'white',
                      borderWidth: 1,
                      //pointBorderColor: '#429EBF',
                      //Data to be represented on y-axis
                      data: []
                    },
                    {
                     label: 'Alertas',
                     borderColor: 'red',
                     pointBackgroundColor: 'white',
                     borderWidth: 1,
                     //pointBorderColor: '#429EBF',
                     //Data to be represented on y-axis
                     data: []
                    }
                ]
            },
            options : {          
              responsive: true,
              maintainAspectRatio: false,
              elements:{
                  line:{fill:false}
              },
              tooltips:{
                  //backgroundColor: '#0584f6',
                  titleFontSize: 20,
                  bodyFontSize: 15,
                  bodySpacing: 10,
                  mode: 'x'
              }
            }, 
            
        

            fechaInicial,
            fechaFinal,
        }
    },
    created(){
        //this.prueba();

    },
   
    methods:{

        crearGrafica: async function(){
            //this.mesesSeleccionados = meses.slice(mesInicial, mesFinal+1)
            //
            this.loaded = false
            let fechas = [this.fechaInicial,this.fechaFinal]
            console.log(fechas)
            await axios.post('/api/generar_graficas', fechas)
                .then(res => {
                   
                   this.chartdata.datasets[0].data = res.data.content[0]
                   this.chartdata.datasets[1].data = res.data.content[1]
                   this.chartdata.datasets[2].data = res.data.content[2]
                   this.chartdata.labels = res.data.content[3]
                   this.loaded = true
                   console.log(res.data.content);
                              
                })
                .catch(error => { 
                    console.log('Error ',error);                    
            }); 
        },
        
        

    }
}
</script>
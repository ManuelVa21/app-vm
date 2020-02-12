<template>
    <div>
        <section>
            <div class="row">
                <div class="col-sm-2 col-with-right-dorder">
                    <SidebarUsuario></SidebarUsuario> 
                </div>
                <div class="col-sm-8">
                    <p>Descripción de las funciones que se pueden realizar en esta sección</p>
                    <div class="container">
                        <div class="accordion" id="accordionPU">
                            <!-- Solicitud de Pool de recursos -->
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Solicitud de Pool de recursos
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <form @submit.prevent="sendSolicitudPool">                                        
                                                <div class="panel panel-default">
                                                    <div class="panel-heading font-weight-bold">Información básica del proyecto</div>
                                                    <div class="panel-body">
                                                        <div class="form-row">
                                                            <div class="form-group col-md-6">
                                                            <div class="form-group">
                                                                <label for="nombre">Nombre del proyecto</label>
                                                                <input v-model="solicitudpool.nombrep" type="text" class="form-control" id="nombre" placeholder="Ingrese nombre del proyecto">
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="nombretu">Nombre del tutor</label>
                                                                <input v-model="solicitudpool.tutorp" type="text" class="form-control" id="nombretu" placeholder="Ingrese nombre del tutor">
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="des">Descripción</label>
                                                                <textarea v-model="solicitudpool.descripcionp" name="" id="des" cols="30" rows="10" placeholder="Ingrese descripción del proyecto"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <div class="form-group">
                                                                <label for="pass">Contraseña</label>
                                                                <input v-model="solicitudpool.contrasenap" type="password" class="form-control" id="pass" placeholder="Ingrese contraseña">
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="emailtu">Correo tutor</label>
                                                                <input v-model="solicitudpool.correotp" type="email" class="form-control" id="emailtu" placeholder="Ingrese Correo del tutor">
                                                            </div>
                                                        </div>
                                                        </div>                                                        
                                                    </div>
                                                </div>
                                                <div class="panel panel-default">
                                                    <div class="panel-heading font-weight-bold">Información Adicional</div>
                                                    <div class="panel-body">
                                                        <div class="form-row">
                                                            <div class="form-group col-md-6">
                                                            <div class="form-group">
                                                                <label for="numvm">Número de mááquinas virtuales</label>
                                                                <input v-model="solicitudpool.numvm" type="number" class="form-control" id="numvm" placeholder="Ingrese el número de máquinas virtuales necesarias">
                                                            </div>                                                            
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <div class="form-group">
                                                                <label for="fechafin">Fecha finalización del servicio</label>
                                                                <input v-model="solicitudpool.fechafin" type="date" id="fechafin" value="2020-01-01" min="2020-01-01" max="2025-12-31">
                                                            </div>
                                                        </div>
                                                        </div>                                                        
                                                    </div>
                                                </div>
                                            <div class="text-center"><button type="submit" class="btn btn-primary">Enviar</button></div>                                        
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <!-- Solicitud de aumento de pool de recursos -->
                            <div class="card">
                                <div class="card-header" id="headingTwo">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Solicitud de aumento de pool de recursos
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <p>Seleccione las características de su pool de recursos</p>
                                        <form >
                                            <div class="form-group">
                                                <p>Por favor escriba el motivo por el cual desea ampliar sus recursos.</p>
                                                <textarea name="" id="" cols="30" rows="10" placeholder="Motivo de ampliación de recursos"></textarea>
                                            </div>                                            
                                            <div class="form-row">
                                                <div class="form-group col-md-6">                                            
                                                    <div class="form-group">
                                                        <label for="Disco">Almacenamiento Actual X</label>
                                                        <select type="Disco" class="form-control" id="Disco">
                                                            <option selected>Seleccione nuevo valor disco duro</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div>                                                    
                                                    <div class="form-group">
                                                        <label for="CPU">Número de Procesadores Actual X</label>
                                                        <select type="CPU" class="form-control" id="CPU">
                                                            <option selected>Seleccione nuevo valor de procesadores</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div>                                                    
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <div class="form-group">
                                                        <label for="RAM">Memoria RAM Actual X</label>
                                                        <select type="RAM" class="form-control" id="RAM">
                                                            <option selected>Seleccione nuevo valor de RAM</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="CPU">Fecha Finalización Actual X/X/X</label>
                                                        <select type="CPU" class="form-control" id="CPU">
                                                            <option selected>Seleccione nueva fecha finalización</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div> 

                                                </div>                                               

                                            </div>
                                            <div class="text-center"><button type="submit" class="btn btn-primary">Enviar</button></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <!-- Solicitud de backup -->
                            <div class="card">
                                <div class="card-header" id="headingThree">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Solicitud de backup
                                    </button>
                                </h5>
                                </div>                              
                                <div id="collapseThree" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <p>Aqui va el form de solicitud de backup</p>
                                        <form>
                                            <div class="form-group">
                                                
                                                <p>Por favor escriba el motivo por el cual desea ampliar sus recursos.</p>
                                                <textarea name="" id="" cols="30" rows="10" placeholder="Motivo de ampliación de recursos"></textarea>
                                            </div>
                                        <div class="text-center"><button type="submit" class="btn btn-primary">Enviar</button></div>
                                        </form>
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
import SidebarUsuario from './SidebarUsuario.vue'

class SolocitudPool{
    constructor(nombrep,contrasenap,descripcionp,tutorp,correotp,numvm,fechafin){
        this.nombrep = nombrep;
        this.contrasenap = contrasenap;
        this.descripcionp = descripcionp;
        this.tutorp = tutorp;
        this.correotp = correotp;
        this.numvm = numvm;
        this.fechafin= fechafin;
    }
}

export default {
    data(){
        return{
            config:{
                headers:{
                //'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin":"*"
                }
            },
            solicitudpool: new SolocitudPool()
        }
    },
    created(){

    },
    components:{
        'SidebarUsuario': SidebarUsuario  
    },
    methods:{
        sendSolicitudPool: async function(){
            console.log('Se ingresa a send Solicitud pool recursos')
            console.log(this.solicitudpool)
            let data={                
                "tipo": "Pool de recursos",
                "nombre_proyecto": this.solicitudpool.nombrep,
                "contrasenap": this.solicitudpool.contrasenap,
                "descripcion": this.solicitudpool.descripcionp,
                "tutor": this.solicitudpool.tutorp,
                "correo_tutor": this.solicitudpool.correotp,
                "numero_maquinas": this.solicitudpool.numvm,
                "fecha_fin": this.solicitudpool.fechafin
            };
            await axios.post('/api/solicitudes',data,this.config)
                .then(res => {
                    console.log(res)                    
                })
                .catch(error => { console.log('Error ',error); });
        }
    }
}
</script>
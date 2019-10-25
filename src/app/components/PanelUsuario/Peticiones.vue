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
                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <p>Seleccione las características de su pool de recursos</p>
                                        <form >
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <div class="form-group">
                                                        <label for="SO">Sistema Operativo</label>
                                                        <select type="SO" class="form-control" id="SO">
                                                            <option selected>Seleccione el SO</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div>                                                    
                                                    <div class="form-group">
                                                        <label for="Disco">Almacenamiento</label>
                                                        <select type="Disco" class="form-control" id="Disco">
                                                            <option selected>Seleccione disco duro</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div>                                                    
                                                    <div class="form-group">
                                                        <label for="CPU">Número de Procesadores</label>
                                                        <select type="CPU" class="form-control" id="CPU">
                                                            <option selected>Seleccione procesadores</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div>                                                    
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <div class="form-group">
                                                        <label for="Version">Versión o distribución</label>
                                                        <select type="SO" class="form-control" id="SO">
                                                            <option selected>Seleccione la versión</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="RAM">Memoria RAM</label>
                                                        <select type="RAM" class="form-control" id="RAM">
                                                            <option selected>Seleccione RAM</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="CPU">Fecha Finalización</label>
                                                        <select type="CPU" class="form-control" id="CPU">
                                                            <option selected>Seleccione fecha fin</option>
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
                                <div class="card-header" id="headingTwo">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Solicitud de backup
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <p>Aqui va el form de solicitud de backup</p>
                                        <div class="form-group">
                                                <p>Por favor escriba el motivo por el cual desea ampliar sus recursos.</p>
                                                <textarea name="" id="" cols="30" rows="10" placeholder="Motivo de ampliación de recursos"></textarea>
                                            </div>
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
import SidebarUsuario from './SidebarUsuario.vue'

export default {
    components:{
        'SidebarUsuario': SidebarUsuario  
    }
}
</script>
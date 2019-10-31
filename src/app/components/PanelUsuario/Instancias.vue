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
                        <div class="accordion" id="accordionI">
                            <!-- Pestaña para crear y modificar -->
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Crear y modificar
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionI">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col text-center">
                                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalCrear">
                                                    Crear Máquina Virtual
                                                </button>
                                                <!-- Modal Crear Máquina virtual-->
                                                <div class="modal fade" id="ModalCrear" tabindex="-1" role="dialog" aria-labelledby="ModalCrearTitle" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLongTitle">Máquina Virtual</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <form >
                                                                    <div class="form-group text-left">
                                                                        <label for="NombreVM">Nombre</label>
                                                                        <input type="text" class="form-control" id="NombreVM" placeholder="Ingresar Nombre">
                                                                    </div>
                                                                    <div class="form-row">
                                                                        <!-- Colunma 1-->
                                                                        <div class="form-group col text-left">
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
                                                                        <!-- Colunma 2-->                                                                        
                                                                        <div class="form-group col text-left">
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
                                                                                <label for="Interfaces">Interfaces de Red</label>
                                                                                <select type="Interfaces" class="form-control" id="Interfaces">
                                                                                    <option selected>Seleccione el número de interfaces</option>
                                                                                    <option>1</option>
                                                                                    <option>2</option>
                                                                                    <option>3</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                                                <button type="button" class="btn btn-primary">Enviar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col text-center">
                                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalModificar">
                                                    Modificar Máquina Virtual
                                                </button>
                                                <!-- Modal Modificar Máquina virtual-->
                                                <div class="modal fade" id="ModalModificar" tabindex="-1" role="dialog" aria-labelledby="ModalModificarTitle" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLongTitle">Modificar Máquina Virtual</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <form>
                                                                    <div class="form-group text-left">
                                                                        <label for="NombreVM">Nombre Actual xxx</label>
                                                                        <input type="text" class="form-control" id="NombreVM" placeholder="Ingresar Nuevo Nombre">
                                                                    </div>
                                                                    <div class="form-row">
                                                                        <!-- Colunma 1-->
                                                                        <div class="form-group col text-left">
                                                                            <div class="form-group">
                                                                            <label for="Disco">Almacenamiento actual xxx</label>
                                                                            <select type="Disco" class="form-control" id="Disco">
                                                                                <option selected>Seleccione nueva capacidad de almacenamiento</option>
                                                                                <option>1</option>
                                                                                <option>2</option>
                                                                                <option>3</option>
                                                                            </select>
                                                                            </div>                                                    
                                                                            <div class="form-group">
                                                                                <label for="CPU">Número de procesadores actuales xxx</label>
                                                                                <select type="CPU" class="form-control" id="CPU">
                                                                                    <option selected>Seleccione cueva capacidad de procesadores</option>
                                                                                    <option>1</option>
                                                                                    <option>2</option>
                                                                                    <option>3</option>
                                                                                </select>
                                                                            </div>                                                                        
                                                                        </div>
                                                                        <!-- Colunma 2-->                                                                        
                                                                        <div class="form-group col text-left">
                                                                            <div class="form-group">
                                                                                <label for="RAM">Memoria RAM actual xxx</label>
                                                                                <select type="RAM" class="form-control" id="RAM">
                                                                                    <option selected>Seleccione nueva capacidad de RAM</option>
                                                                                    <option>1</option>
                                                                                    <option>2</option>
                                                                                    <option>3</option>
                                                                                </select>
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <label for="Interfaces">Número de interfaces de Red actuales</label>
                                                                                <select type="Interfaces" class="form-control" id="Interfaces">
                                                                                    <option selected>Seleccione nueva cantidad de interfaces</option>
                                                                                    <option>1</option>
                                                                                    <option>2</option>
                                                                                    <option>3</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                                                <button type="button" class="btn btn-primary">Enviar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Pestaña para listar caracteristicas del pool de recursos -->
                            <div class="card">
                                <div class="card-header" id="headingTwo">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Pool recursos
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionI">
                                    <div class="card-body">
                                        <p>Este es el pool de recursos asignado a su nombre:</p>
                                        <h3>Pool de recursos</h3>
                                        <table class="table table-striped">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">Proyecto</th>
                                                <th scope="col">Descripción</th>
                                                <th scope="col">Almacenamiento</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">CPU</th>
                                                <th scope="col">#máquinas</th>
                                                <th scope="col">Fecha Inicio</th>
                                                <th scope="col">Fecha fin</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <th scope="row">1</th>
                                                <td>Mark</td>                                                
                                                </tr>
                                                <tr>
                                                <th scope="row">2</th>
                                                <td>Jacob</td>                                                
                                                </tr>
                                                <tr>
                                                <th scope="row">3</th>
                                                <td>Larry</td>
                                                </tr>
                                            </tbody>
                                            </table>                                       
                                    </div>
                                </div>
                            </div>

                            <!-- Pestaña para listar elementos con sus características básicas, encenderlos, apagarlos, eliminarlos -->
                            <div class="card">
                                <div class="card-header" id="headingThree">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Listar Máquinas
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionI">
                                    <div class="card-body">
                                        <p>Estas son las máquinas virtuales creadas y sus características:</p>
                                        <h3>Máquinas virtuales</h3>
                                        <table class="table table-striped">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">S.O.</th>
                                                <th scope="col">Versión</th>
                                                <th scope="col">Almacenamiento</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">CPU</th>
                                                <th scope="col">Interfaces</th>
                                                <th scope="col">IP</th>
                                                <th scope="col">Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <th scope="row">1</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                </tr>
                                                <tr>
                                                <th scope="row">2</th>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                </tr>
                                                <tr>
                                                <th scope="row">3</th>
                                                <td>Larry</td>
                                                <td>the Bird</td>
                                                <td>@twitter</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                </tr>
                                            </tbody>
                                            </table>                                       
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
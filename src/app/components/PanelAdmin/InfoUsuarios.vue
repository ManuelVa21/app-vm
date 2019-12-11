<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-sm-2 col-with-right-border">
                    <SidebarAdmin></SidebarAdmin>
                </div>
                <div class="col-sm-8">
                 <div class="panel panel-info">
                    <p>Descripción de la sección</p>
                    <div class="container">
                        <div class="accordion" id="accordionIU">
                            <!-- Pestaña para listar elementos con sus características básicas, encenderlos, apagarlos, eliminarlos -->
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Listar usuarios
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionIU">
                                    <div class="card-body">
                                        <p>usuarios registrados en la plataforma Telco2.0</p>
                                        <h3>Usuarios</h3>
                                        <table class="table-responsive-xl table-striped table-hover w-auto">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Correo</th>
                                                <th scope="col">Categoría</th>
                                                <th scope="col">Pool Recursos</th>
                                                <th scope="col">#MV</th>
                                                <th scope="col">Eliminar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <th scope="row">1</th>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>  
                                                <td>-</td>
                                                <td>-</td>                                                
                                                <td><button type="button" class="btn btn-danger">Eliminar</button></td>
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
            </div>
        </section>
    </div>
</template>

<script>

import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarAdmin from './SidebarAdmin.vue'

export default{
    components:{
        'SidebarAdmin': SidebarAdmin
    }
}
</script>
    <!--   -->


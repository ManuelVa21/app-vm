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
                            <!-- -->
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Información básica
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <form>
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                <label for="Nombre">Nombre</label>
                                                <input type="text" class="form-control" id="Nombre" placeholder="Ingresar nombre">
                                                </div>
                                                <div class="form-group col-md-6">
                                                <label for="CatUs">Categoría Usuario</label>
                                                <select type="CatUs" class="form-control" id="CatUs">
                                                    <option selected>Categoría Usuario</option>
                                                    <option>Estudiante</option>
                                                    <option>Docente</option>
                                                    <option>Curso</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="Codigo">Código Estudiante</label>
                                                <input type="text" class="form-control" id="Codigo" placeholder="Ingresar código">
                                            </div>                                        
                                            <div class="text-center"><button type="submit" class="btn btn-primary">Guardar</button></div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <!-- -->
                            <div class="card">
                                <div class="card-header" id="headingTwo">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Información complementaria
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <!-- Informacion complementaria categoria usuario Estudiante -->
                                        <!-- v-if="categoria_us==='Estudiante'"" -->
                                        <form>
                                            <div class="form-group">
                                                <label for="NombrePro">Nombre Proyecto</label>
                                                <input type="text" class="form-control" id="NombrePro" placeholder="Ingresar nombre del proyecto">
                                            </div>
                                            <div class="form-group">
                                                <label for="Tutor">Tutor</label>
                                                <input type="text" class="form-control" id="Tutor" placeholder="Ingresar nombre del tutor">
                                            </div>
                                            <div class="form-group">
                                                <label for="CorreoTutor">Correo Tutor</label>
                                                <input type="text" class="form-control" id="CorreoTutor" placeholder="Ingresar correo del tutor">
                                            </div>
                                            <button type="submit" class="btn btn-primary">Guardar</button>
                                        </form>
                                        <!-- Informacion complementaria categoria usuario Docente -->
                                        <!-- v-if="categoria_us==='Docente'"" -->
                                        <form>
                                            <div class="form-group">
                                                <label for="NombrePro">Nombre Proyecto</label>
                                                <input type="text" class="form-control" id="NombrePro" placeholder="Ingresar nombre del proyecto">
                                            </div>
                                            <div class="form-group">
                                                <label for="Proposito">Proposito Proyecto</label>
                                                <textarea name="Proposito" id="Proposito" class="form control" placeholder="Inserte una breve descripción"></textarea>
                                            </div>
                                            <button type="submit" class="btn btn-primary">Guardar</button>
                                        </form>
                                        <!-- Informacion complementaria categoria usuario Curso -->
                                        <!-- v-if="categoria_us==='Curso'"" -->
                                        <form>
                                            <div class="form-group">
                                                <label for="NombreCur">Nombre Curso</label>
                                                <input type="text" class="form-control" id="NombreCur" placeholder="Ingresar nombre del curso">
                                            </div>
                                            <div class="form-group">
                                                <label for="DocenteEn">Docente Encargado</label>
                                                <input type="text" class="form-control" id="DocenteEn" placeholder="Ingresar nombre del docente">
                                            </div>
                                            <div class="form-group">
                                                <label for="CoDocenteEn">Correo Docente Encargado</label>
                                                <input type="text" class="form-control" id="CoDocenteEn" placeholder="Ingresar correo del docente">
                                            </div>
                                            <div class="form-group">
                                                <label for="CantVM">Cantidad de máquinas</label>
                                                <input type="text" class="form-control" id="CantVM" placeholder="Ingresar la cantidad de máquinas virtuales">
                                            </div>
                                            <div class="form-group">
                                                <label for="Horario">Horario de Uso</label>
                                                <input type="text" class="form-control" id="Horario" placeholder="Ingresar el horario de uso">
                                            </div>
                                            <button type="submit" class="btn btn-primary">Guardar</button>
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
import SidebarUsuario from './SidebarUsuario.vue'

export default {
    components:{
        'SidebarUsuario': SidebarUsuario  
    }
}
</script>
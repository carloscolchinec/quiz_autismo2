<template>
  <div class="background-overlay">
<div class="container-center">
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="row">
        <div v-for="group in groups" :key="group.id" class="col-md-6">
          <div class="card mb-4">
            <div class="card-body text-center">
              <h5 class="card-title">{{ group.name }}</h5>
              <p class="card-text">{{ group.description }}</p>
              <router-link :to="group.url + (group.id !== 4 ? group.id : '')" class="btn btn-primary">Comenzar</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'SelectComponent',
  data() {
    return {
      groups: [
        { id: 1, name: 'Niños de 3 a 5 años', description: 'Preguntas adaptadas para niños en edad preescolar.', url: '/questions/' },
        { id: 2, name: 'Niños de 6 a 12 años', description: 'Cuestionario diseñado para niños en edad escolar.', url: '/questions/' },
        { id: 3, name: 'Adultos (20 años en adelante)', description: 'Preguntas destinadas a adultos para evaluar el autismo.', url: '/questions/' },
        { id: 4, name: 'Encuesta para Doctores', description: 'Preguntas destinadas a doctores para evaluar este test.', url: '/qdoctor/' },
      ],
    };
  },
};
</script>

<style scoped>

.container-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.background-overlay {
  position: relative;
  background: url('../assets/img/fondo1.webp') center/cover no-repeat;
  min-height: 100vh;
}

.background-overlay::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.card {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}
</style>

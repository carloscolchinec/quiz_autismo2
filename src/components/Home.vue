<script>
export default {
  name: "HomeComponent",
  data() {
    return {
      termsAccepted: false,
    };
  },
  methods: {
    toggleStartButton() {
      this.termsAccepted = !this.termsAccepted;
    },
    startQuiz() {
      if (this.termsAccepted) {
        // Redirige a /select (o donde desees) cuando se acepten los términos y se haga clic en "Comenzar"
        this.$router.push('/select');
      }
    },

    infoQuiz() {

        this.$router.push('/info');
    },
  },
};
</script>

<template>
  <div class="home-container">
    <div class="card quiz-card">
      <div class="card-body text-center">
        <h1 class="quiz-title">TEST de Detección de Autismo</h1>
        <p class="quiz-description">
          Bienvenido/a al test de detección de autismo. Antes de utilizar el
          Test, te pedimos que leas detenidamente los siguientes términos y
          condiciones. Al acceder y utilizar el Test, aceptas cumplir con estos
          términos y condiciones en su totalidad.
        </p>
        <button class="btn btn-primary" :disabled="!termsAccepted" @click="startQuiz">Comenzar</button>
        
        <br>
        <br>
        <label for="accept-terms">
            <input
              type="checkbox"
              id="accept-terms"
              v-model="termsAccepted"
            >
          Acepto
          <a href="#" data-toggle="modal" data-target="#termsModal"
            >términos y condiciones</a
          >
        </label>

        <br>
        <br>
        
    </div>
    <button class="btn btn-warning" @click="infoQuiz">Estadisticas de la encuestas</button>
</div>

    <div
    class="modal fade"
    id="termsModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="termsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="termsModalLabel">
            Términos y Condiciones
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Cerrar"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            Objetivo: Identificar posibles señales o rasgos asociados con el espectro
      autista en un individuo de manera preliminar. Estos tests no son
      diagnósticos definitivos, pero pueden servir como herramienta de detección
      temprana para identificar a personas que podrían beneficiarse de una
      evaluación más exhaustiva por parte de profesionales de la salud.<br>
      Propósito del Test: El Test de detección de autismo es una herramienta
      diseñada para proporcionar una evaluación preliminar y educativa sobre la
      posibilidad de la presencia de rasgos relacionados con el espectro
      autista. No debe utilizarse como diagnóstico médico definitivo. <br>
      Uso Responsable: Al utilizar el Test, entiendes y aceptas que los resultados
      obtenidos son solo una indicación inicial y no reemplazan la evaluación
      médica o profesional realizada por un especialista cualificado.<br>
      Privacidad y Confidencialidad: Toda la información proporcionada durante
      el Test se mantendrá en estricta confidencialidad y será utilizada
      únicamente con fines de evaluación y mejora del Test. No se compartirá ni
      divulgará información personal identificable sin tu consentimiento
      expreso. <br>
      Uso Responsable: Al utilizar el Test, entiendes y aceptas que los
      resultados obtenidos son solo una indicación inicial y no reemplazan la
      evaluación médica o profesional realizada por un especialista cualificado.
      Si tienes preocupaciones sobre la posibilidad de autismo, te recomendamos
      buscar asesoramiento médico o psicológico. <br>
      Limitación de Responsabilidad:
      La entidad/organización que proporciona el Test no se hace responsable de
      las decisiones tomadas en función de los resultados obtenidos a través del
      Test. No se garantiza la precisión ni la exhaustividad de los resultados.<br>
      Derechos de Propiedad Intelectual: El Test, incluidos todos los materiales
      y contenido relacionados, están protegidos por derechos de propiedad
      intelectual. No tienes derecho a copiar, modificar, distribuir,
      transmitir, mostrar ni vender ningún contenido del Test sin autorización
      previa por escrito. <br>
      Modificaciones: La entidad/organización se reserva el
      derecho de modificar, suspender o interrumpir el Test en cualquier momento
      y sin previo aviso. Asimismo, se reserva el derecho de actualizar estos
      términos y condiciones ocasionalmente. Se te notificarán tales cambios a
      través de un aviso en el sitio web. <br> 
      Ley aplicable: no aplica debido a que
      no se gestiona datoas personales o con lo que se pueda identificar a las
      personas evaluadas. <br>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>


</template>






<style>

.modal-title {
    color: #000;
}

.modal-body {
    color: #000;
}
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../assets/img/fondo.png");
  background-size: cover;
  background-position: center;
  color: white;
}

.quiz-card {
  background-color: rgba(17, 17, 17, 0.821);
  border: none;
  border-radius: 10px;
  max-width: 600px;
}

.quiz-title {
  font-size: 36px;
  margin-bottom: 20px;
}

.quiz-description {
  font-size: 18px;
  margin-bottom: 30px;
}

</style>

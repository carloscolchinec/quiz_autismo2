<template>
  <div class="centered-container">
    <div class="questionnaire-container">
      <div class="card">
        <h2 class="questionnaire-title">Encuesta para Doctores</h2>
        <div v-if="currentQuestionIndex < questions.length">
          <p class="question-text">{{ questions[currentQuestionIndex] }}</p>
          <div class="answer-options">
            <label class="answer-option">
              <input
                type="radio"
                v-model="answers[currentQuestionIndex]"
                value="Sí"
              />
              <span class="radio-label">Sí</span>
            </label>
            <label class="answer-option">
              <input    
                type="radio"
                v-model="answers[currentQuestionIndex]"
                value="No"
              />
              <span class="radio-label">No</span>
            </label>
          </div>
          <button @click="nextQuestion">Siguiente</button>
        </div>
        <div v-else>
          <h3 class="result-title">Resultados:</h3>
          <div class="rating-figure">
            <div
              class="filled-stars"
              :style="{
                width: surveyPercentages[surveyPercentages.length - 1] + '%',
                backgroundColor: starBackgroundColor,
              }"
            ></div>
          </div>
          <p v-if="surveyPercentages[surveyPercentages.length - 1] >= 80">
            <br />¡Gracias por completar la encuesta!
          </p>
          <p v-else-if="surveyPercentages[surveyPercentages.length - 1] <= 40">
            <br />¡Gracias por completar la encuesta!, <br />
            Lamentamos no satisfacer tus expectativas!
          </p>
          <br />
          <router-link to="/select" class="back-button">Regresar</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DoctorSurveyComponent",
  data() {
    return {
      questions: [
        "¿Encuentra que la aplicación es fácil de usar y navegar?",
        "¿La aplicación responde de manera rápida y eficiente a sus acciones y comandos?",
        "¿Los menús y opciones de la aplicación son intuitivos y fáciles de entender?",
        "¿Ha experimentado errores o fallas frecuentes mientras usaba la aplicación?",
        "¿Recomienda usar el test para un breve pre-diagnóstico en pacientes?",
      ],
      answers: [],
      currentQuestionIndex: 0,
      surveyPercentages: [], // Array para almacenar los porcentajes de encuesta
    };
  },
  computed: {
    starBackgroundColor() {
      return this.surveyPercentages.length > 0 &&
        this.surveyPercentages[this.surveyPercentages.length - 1] >= 80
        ? "#4caf50"
        : "#ffc107";
    },
  },
  methods: {
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        const yesCount = this.answers.filter(
          (answer) => answer === "Sí"
        ).length;
        const totalQuestions = this.questions.length;
        const percentage = (yesCount / totalQuestions) * 100;
        this.surveyPercentages.push(percentage);

        // Guardar los porcentajes en localStorage
        const previousPercentages = JSON.parse(localStorage.getItem('surveyPercentages')) || [];
        previousPercentages.push(percentage);
        localStorage.setItem('surveyPercentages', JSON.stringify(previousPercentages));

        // Redirigir a una página de agradecimiento o mostrar resultados finales
        this.$router.push("/"); // Ajusta la ruta según tus necesidades
      }
    },
  },
};
</script>


<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/img/fondo3.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;
  height: 100vh;
}

.questionnaire-container {
  font-family: Arial, sans-serif;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
}

.card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.questionnaire-title {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333333;
}

.question-text {
  font-size: 20px;
  margin-bottom: 15px;
  color: #444444;
}

.answer-option {
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #555555;
  width: calc(50% - 10px);
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 30px;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.answer-option:hover {
  background-color: #f7f7f7;
}

.radio-label {
  margin-left: 10px;
}

.rating-figure {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: #f7f7f7;
  border-radius: 5px;
  overflow: hidden;
}

.stars {
  background-color: #ccc;
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
}

.filled-stars {
  background-color: #ffc107;
  height: 100%;
  transition: width 0.3s ease;
}

.answer-option {
  display: inline-flex;
  align-items: center;
  font-size: 18px;
  color: #555555;
  width: calc(50% - 10px);
}

button {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 12px 25px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}

.result-title {
  font-size: 28px;
  margin-top: 20px;
  color: #333333;
}

.result-text {
  font-size: 20px;
  margin-top: 15px;
  color: #444444;
}

/* Agrega más estilos si es necesario */
</style>

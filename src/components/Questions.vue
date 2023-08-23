<script>
import jsPDF from "jspdf";

export default {
  name: "QuestionnaireComponent",
  data() {
    return {
      groupId: null,
      questionGroups: {
        1: [
          "¿El niño/a imita (hace lo mismo que) lo que haces?",
          "¿El niño/a muestra interés en otros niños?",
          "¿El niño/a señala para mostrar algo interesante?",
          "¿El niño/a sigue las direcciones cuando se le habla?",
          "¿El niño/a responde cuando le llaman por su nombre?",
          "¿El niño/a tiene dificultad en iniciar o mantener una conversación con otros?",
          "¿El niño/a usa frases simples para comunicarse?",
          '¿El niño/a muestra interés en jugar a "fingir", como hacer como si cocinara o hablara por teléfono?',
          "¿El niño/a se muestra incómodo o ansioso en situaciones sociales?",
          "¿El niño/a tiene comportamientos o intereses inusuales o intensos?",
        ],
        2: [
          "¿Encuentras difícil entender los chistes o el humor abstracto que otras personas encuentran graciosos?",
          "¿Prefieres pasar tiempo solo o en actividades solitarias en lugar de estar con otras personas?",
          "¿Te resulta difícil entender las señales no verbales, como gestos o expresiones faciales, en los demás?",
          "¿A menudo tienes dificultades para iniciar o mantener una conversación con otros?",
          "¿Tienes intereses muy intensos en temas específicos y te gusta aprender todo lo que puedas sobre esos temas?",
          "¿Te resulta complicado entender los puntos de vista o las emociones de los demás?",
          "¿Te cuesta entender las reglas no escritas en situaciones sociales, como saber cuándo es tu turno para hablar?",
          "¿Encuentras difícil trabajar en grupo o colaborar en actividades con compañeros?",
          "¿Prefieres seguir tus propias rutinas y rituales en lugar de adaptarte a los cambios?",
          "¿Tienes dificultades para reconocer las señales sociales, como cuando alguien está aburrido o molesto?",
        ],
        3: [
          "¿Encuentras difícil entender las señales sociales sutiles, como saber cuándo es tu turno para hablar en una conversación?",
          "¿Prefieres actividades solitarias en lugar de interactuar socialmente?",
          "¿Te resulta complicado leer el lenguaje corporal y las expresiones faciales de los demás?",
          "¿Tienes dificultades para comprender las normas sociales no escritas y las reglas implícitas?",
          "¿Tienes intereses y pasatiempos intensos y especializados que a menudo son diferentes de los de tus compañeros?",
          "¿Encuentras difícil iniciar y mantener conversaciones informales con personas que no conoces bien?",
          "¿Tienes rutinas y rituales específicos que prefieres seguir en tu vida diaria?",
          "¿Tienes dificultades para reconocer y expresar tus propias emociones, así como para comprender las emociones de los demás?",
          "¿Encuentras difícil entender los chistes y el humor abstracto?",
          "¿Prefieres seguir tus propias reglas y normas en lugar de adaptarte a las convenciones sociales?",
        ],
      },
      questions: [],
      randomOrder: [],
      answers: [],
      showResult: false,
      result: "",
      currentQuestionIndex: -1,
      socioeconomic: "",
      sector: "",
    };
  },
  computed: {
    resultPercentage() {
      const maxScore = this.questions.length * 1.5;
      const score = this.answers.reduce((acc, answer) => {
        if (answer === "SI") return acc + 1.45;
        if (answer === "TALVEZ") return acc + 0.5;
        return acc;
      }, 0);

      return Math.min((score / maxScore) * 100, 100);
    },
    answerOptions() {
      return ["SI", "NO", "TALVEZ"];
    },
    currentQuestion() {
      return this.questions[this.randomOrder[this.currentQuestionIndex]];
    },
  },
  created() {
    this.groupId = this.$route.params.groupId;
    this.loadQuestions();
  },
  methods: {
    loadQuestions() {
      this.questions = this.questionGroups[this.groupId];
      this.randomOrder = this.generateRandomOrder(this.questions.length);
    },
    generateRandomOrder(length) {
      const order = [];
      while (order.length < length) {
        const randomIndex = Math.floor(Math.random() * length);
        if (!order.includes(randomIndex)) {
          order.push(randomIndex);
        }
      }
      return order;
    },
    nextQuestion() {
      this.currentQuestionIndex++;
    },
    prevQuestion() {
      this.currentQuestionIndex--;
    },
    goBackToMenu() {
      this.$router.push("/select");
    },
    submitQuestionnaire() {
      this.socioeconomic = this.answers.socioeconomic; // Respuesta de la pregunta 0
      this.sector = this.answers.sector; // Respuesta de la pregunta -1

      const score = this.answers.reduce((acc, answer) => {
        if (answer === "SI") return acc + 1;
        if (answer === "TALVEZ") return acc + 0.5;
        return acc;
      }, 0);

      if (score <= 3) {
        this.result = "No presenta el nivel de autismo";
      } else if (score <= 6) {
        this.result = "Nivel de autismo intermedio";
      } else {
        this.result = "Nivel de autismo avanzado";
      }

      this.showResult = true;

      const dataToSave = {
        socioeconomic: this.socioeconomic,
        sector: this.sector,
        result: this.result,
      };
      const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
      savedData.push(dataToSave);
      localStorage.setItem("savedData", JSON.stringify(savedData));
    },
    downloadPDF() {
  const pdf = new jsPDF();
  const currentDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Encabezado con la fecha actual
  pdf.setFontSize(16);
  pdf.setTextColor(40, 40, 40);
  pdf.text("Resultado del Cuestionario", pdf.internal.pageSize.width / 2, 20, { align: "center" });
  pdf.setFontSize(12);
  pdf.setTextColor(80, 80, 80);
  pdf.text(`Fecha: ${currentDate}`, pdf.internal.pageSize.width / 2, 30, { align: "center" });

  // Resultado del cuestionario
  pdf.setFontSize(13);
  pdf.setTextColor(40, 40, 40);
  pdf.text(`Resultado: ${this.result}`, pdf.internal.pageSize.width / 2, 50, { align: "center" });

  // Respuestas seleccionadas
  pdf.setFontSize(10);
  pdf.setTextColor(40, 40, 40);
  let yOffset = 60;
  for (let i = 0; i < this.questions.length; i++) {
    yOffset += 10;
    pdf.text(`${i + 1}. ${this.questions[i]}`, 20, yOffset);
    yOffset += 10;
    pdf.text(`Respuesta: ${this.answers[i] ? this.answers[i] : 'NO SELECCIONADA'}`, 20, yOffset);
  }

  // Guardar el PDF
  pdf.save("resultado_cuestionario.pdf");
},


  },
};
</script>

<template>
  <div class="main-container">
    <div class="overlay"></div>

    <div class="questionnaire-container">
      <button class="back-button" @click="goBackToMenu">
        Regresar al Menú
      </button>

      <div class="card" v-if="currentQuestionIndex === -1">
        <h2 class="questionnaire-title">Cuestionario</h2>
        <div>
          <div class="question">
            <p class="question-text">¿A qué nivel SocioEconómico perteneces?</p>
            <div class="answer-options">
              <label class="answer-option">
                <input
                  type="radio"
                  v-model="answers.socioeconomic"
                  value="Estrato bajo. ($43,00 mensuales por persona dentro del
                  hogar)"
                />
                <span class="radio-label"
                  >Estrato bajo. ($43,00 mensuales por persona dentro del
                  hogar)</span
                >
              </label>
              <label class="answer-option">
                <input
                  type="radio"
                  v-model="answers.socioeconomic"
                  value="Medio bajo. ($133,00 mensuales por persona dentro del
                  hogar"
                />
                <span class="radio-label"
                  >Medio bajo. ($133,00 mensuales por persona dentro del
                  hogar)</span
                >
              </label>
              <label class="answer-option">
                <input
                  type="radio"
                  v-model="answers.socioeconomic"
                  value="Medio medio. ($320,00 mensuales por persona dentro del
                  hogar)"
                />
                <span class="radio-label"
                  >Medio medio. ($320,00 mensuales por persona dentro del
                  hogar)</span
                >
              </label>
              <label class="answer-option">
                <input
                  type="radio"
                  v-model="answers.socioeconomic"
                  value="Medio alto. ($712,00 mensuales por persona dentro del
                  hogar)"
                />
                <span class="radio-label"
                  >Medio alto. ($712,00 mensuales por persona dentro del
                  hogar)</span
                >
              </label>
              <label class="answer-option">
                <input
                  type="radio"
                  v-model="answers.socioeconomic"
                  value="Alto. ($1955,00 en adelante mensuales por persona dentro del
                  hogar)"
                />
                <span class="radio-label"
                  >Alto. ($1955,00 en adelante mensuales por persona dentro del
                  hogar)</span
                >
              </label>
            </div>
          </div>
          <div class="question">
            <p class="question-text">¿A qué sector de Quito perteneces?</p>
            <div class="answer-options">
              <label class="answer-option">
                <input
                  type="radio"
                  v-model="answers.sector"
                  value="Quito-Sur"
                />
                <span class="radio-label">Quito-Sur</span>
              </label>
              <label class="answer-option">
                <input
                  type="radio"
                  v-model="answers.sector"
                  value="Quito-Centro"
                />
                <span class="radio-label">Quito-Centro</span>
              </label>
              <label class="answer-option">
                <input
                  type="radio"
                  v-model="answers.sector"
                  value="Quito-Norte"
                />
                <span class="radio-label">Quito-Norte</span>
              </label>
            </div>
          </div>
        </div>
        <div class="info-message" v-if="groupId === '1'">
          <p>
            Este test debe ser respondido por el representante legal del
            paciente.
          </p>
        </div>
        <button @click="currentQuestionIndex++">Continuar</button>
      </div>

      <div class="card m-3" v-else>
        <h2 class="questionnaire-title">Cuestionario</h2>
        <div v-if="!showResult">
          <transition name="fade" mode="out-in">
            <div :key="currentQuestionIndex" class="question">
              <p class="question-text">{{ currentQuestion }}</p>
              <div class="answer-options">
                <label
                  class="answer-option"
                  v-for="(option, index) in answerOptions"
                  :key="index"
                >
                  <input
                    type="radio"
                    v-model="answers[currentQuestionIndex]"
                    :value="option"
                  />
                  <span class="radio-label">{{ option }}</span>
                </label>
              </div>
            </div>
          </transition>
          <div class="question-count-card">
            <div class="question-count">
              {{ currentQuestionIndex + 1 }} / {{ questions.length }}
            </div>
          </div>
          <button @click="prevQuestion" v-if="currentQuestionIndex > 0">
            Anterior
          </button>
          <button
            @click="nextQuestion"
            v-if="currentQuestionIndex < questions.length - 1"
          >
            Siguiente
          </button>
          <button @click="submitQuestionnaire" v-else>Obtener Resultado</button>
        </div>

        <div v-else class="result">
          <h3 class="result-title">Resultado:</h3>
          <p class="result-text">{{ result }}</p>

          <br />
          <h3 class="selected-questions-title">Respuestas Seleccionadas:</h3>
          <div class="selected-questions-list">
            <div
              v-for="(question, index) in questions"
              :key="index"
              class="question-answer"
            >
              <div class="question-text_result">{{ question }}</div>
              <div class="answer-text">
                <strong>Respuesta:</strong>
                {{ answers[index] ? answers[index] : "NO SELECCIONADA" }}
              </div>
            </div>
          </div>
          <br />
          <br />

          <div
            v-if="sector && socioeconomic"
            class="selected-questions-container"
          >
            <div class="selected-questions-table">
              <div class="text-left">
                <p><strong>Sector de Quito:</strong> {{ sector }}</p>

                <p>
                  <strong>Nivel Socioeconómico:</strong> {{ socioeconomic }}
                </p>
              </div>
            </div>
          </div>

          <br />
          <button @click="downloadPDF">Descargar Resultados en PDF</button>

          <br />

          <!-- Mostrar información adicional si hay más de 4 respuestas "SI" -->
          <div v-if="resultPercentage > 4">
            <h5 class="text-left">
              <strong
                >Se recomienda visitar esos centros medicos para mas
                información:</strong
              >
            </h5>
            <br />
            <div class="additional-info-table">
              <div class="additional-info-row">
                <div class="additional-info-column">
                  <p><strong>Organización:</strong> Ministerio de Salud</p>
                  <p>
                    <strong>Contacto:</strong> ventanillaunica.msp@msp.gob.ec
                    (593-2) 3814400
                  </p>
                </div>
                <div class="additional-info-column">
                  <p><strong>Organización:</strong> NEUROINFANT</p>
                  <p>
                    <strong>Contacto:</strong> info@neuroinfant.com.ec (593-2)
                    6008189
                  </p>
                </div>
                <div class="additional-info-column">
                  <p>
                    <strong>Organización:</strong> Asociación Ecuatoriana de
                    Autismo
                  </p>
                  <p><strong>Contacto:</strong> (593-4)094977</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected-questions-list {
  display: flex;
  flex-direction: column;
}
.question-answer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
.question-text_result {
  flex: 1;
  font-size: 14px;
}
.answer-text {
  flex: 2;
  text-align: right;
}

.back-button {
  position: absolute;
  top: 90px;
  left: -30px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.info-message {
  background-color: #fcff46;
  border-radius: 30px;
  color: #fff;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.info-message p {
  margin: 0;
  color: #333;
}

.back-button:hover {
  background-color: #388e3c;
}

.main-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../assets/img/fondo2.webp") center/cover no-repeat; /* Cambia a tu imagen de fondo */
  font-family: "Arial", sans-serif;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
.questionnaire-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.questionnaire-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: relative;
  z-index: 1;
}
.questionnaire-title {
  font-size: 2rem;
  color: #333;
}

.question-text {
  font-size: 1.5rem;
  color: #555;
  padding: 1px; /* Añadido padding */
  text-align: center; /* Centrar texto */
  max-width: 600px; /* Ancho máximo para salto de línea */
  margin: 0 auto; /* Centrar el bloque */
}

.answer-options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 3px;
}

.answer-option {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.radio-label {
  display: inline-block;
  padding: 5px 5px;
  border: 2px solid #4caf50;
  border-radius: 5px;
  margin-left: 15px;
  color: #4caf50;
  font-weight: bold;
  cursor: pointer;
  background-color: #f0f8ea;
  transition: background-color 0.3s;
}

.answer-option input[type="radio"]:checked + .radio-label {
  background-color: #4caf50;
  color: white;
}

.result {
  margin-top: 30px;
  text-align: center;
}

.result-title {
  font-size: 1.8rem;
  color: #4caf50;
  margin-bottom: 15px;
}

.result-text {
  font-size: 1.2rem;
  color: #333;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  height: 30px;
  border-radius: 5px;
  margin-top: 20px;
}

.progress.white-bg {
  background-color: #4caf50;
  color: #000;
  width: 0;
  transition: width 0.3s ease-in-out;
  text-align: center;
  border-radius: 5px;
}

.question-count-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  display: inline-block;
}

.question-count {
  font-size: 1.2rem;
  color: #666;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 12px 25px;
  border: none;
  margin-left: 30px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

/* Estilos para las filas y columnas de las respuestas seleccionadas */
.selected-questions-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.text-left {
  text-align: left;
}

.selected-questions-column {
  flex: 1;
  padding: 5px;

  padding-left: 10px; /* Padding izquierdo */
  padding-right: 10px; /* Padding derecho */
  border: 1px solid #ccc;
  background-color: #f2f2f2;
}

/* Estilos para las filas y columnas de la información adicional */
.additional-info-row {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.additional-info-column {
  flex: 1;
  padding: 10px;
  margin-left: 20px; /* Padding izquierdo */
  padding-right: 20px; /* Padding derecho */
  border: 1px solid #ccc;
  background-color: #f2f2f2;
}
</style>

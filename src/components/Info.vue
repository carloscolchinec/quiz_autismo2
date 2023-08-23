<template>
    <div class="background">
      <div class="centered-container">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <div class="chart-column">
                  <h3>Gráfico basado en socioeconómico</h3>
                  <canvas ref="socioeconomicChartCanvas"></canvas>
                </div>
              </div>
              <div class="col-6">
                <div class="chart-column">
                  <h3>Gráfico basado en resultados de encuesta</h3>
                  <canvas ref="resultsChartCanvas"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="back-button" @click="goToHome">Volver al inicio</button>
    </div>
  </template>


  <script>
  export default {
    name: "ChartComponent",
    mounted() {
      this.drawSocioeconomicChart();
      this.drawResultsChart();
    },
    methods: {
        goToHome() {
      this.$router.push("/"); // Reemplaza "/select" con la ruta a la página de inicio
    },
      drawSocioeconomicChart() {
        const ctx = this.$refs.socioeconomicChartCanvas.getContext("2d");
        const socioeconomicData = this.getSocioeconomicData();
  
        new window.Chart(ctx, {
          type: "doughnut",
          data: {
            labels: socioeconomicData.labels,
            datasets: [
              {
                data: socioeconomicData.data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  // Add more colors if needed
                ],
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          },
        });
      },
      drawResultsChart() {
        const ctx = this.$refs.resultsChartCanvas.getContext("2d");
        const labels = ["Menores de 50%", "Mayores de 50%"];
        const data = [
          this.calculatePercentage(this.surveyPercentages.filter(percentage => percentage < 50).length),
          this.calculatePercentage(this.surveyPercentages.filter(percentage => percentage >= 50).length),
        ];
  
        new window.Chart(ctx, {
          type: "doughnut",
          data: {
            labels,
            datasets: [
              {
                data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  // Add more colors if needed
                ],
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          },
        });
      },
      getSocioeconomicData() {
        const socioeconomicMap = new Map();
        this.savedData.forEach(item => {
          const socioeconomic = item.socioeconomic;
          if (!socioeconomicMap.has(socioeconomic)) {
            socioeconomicMap.set(socioeconomic, 1);
          } else {
            socioeconomicMap.set(socioeconomic, socioeconomicMap.get(socioeconomic) + 1);
          }
        });
  
        const labels = Array.from(socioeconomicMap.keys());
        const data = Array.from(socioeconomicMap.values());
  
        return {
          labels,
          data,
        };
      },
      calculatePercentage(value) {
        const total = this.savedData.length;
        return (value / total) * 100;
      },
    },
    computed: {
      savedData() {
        return JSON.parse(localStorage.getItem("savedData")) || [];
      },
      surveyPercentages() {
        return JSON.parse(localStorage.getItem("surveyPercentages")) || [];
      },
    },
  };
  </script>
  
  <style scoped>
.background {
  background-image: url("../assets/img/fondo.png"); /* Ruta de tu imagen de fondo */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centrar verticalmente */
}

.card {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin: 10px;
  width: 90%;
  max-width: 800px;
  text-align: center;
}

.chart-column {
  padding: 20px;
  text-align: center;
}

.back-button {
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #0056b3;
}

@media screen and (min-width: 600px) {
  .centered-container {
    flex-direction: row;
  }
}
</style>
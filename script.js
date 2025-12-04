// ----------------------------------------
// SCRIPT QUIZ · RETO ZEYRA 21 DÍAS
// ----------------------------------------

// Seleção dos elementos principais
const startBtn = document.getElementById("startQuiz");
const heroSection = document.querySelector(".hero");
const quizContainer = document.getElementById("quizContainer");
const quizStep = document.getElementById("quizStep");
const progressBar = document.getElementById("progressBar");
const resultSection = document.getElementById("resultSection");

// URL da landing final (ajusta depois)
const landingUrl = "landing.html";

function goToLanding() {
    window.location.href = landingUrl;
}

// Array de perguntas + respostas (copy adaptada)
const questions = [
  {
    question: "¿Sientes que estás viviendo por debajo de lo que podrías ser?",
    answers: [
      "🤩 Sí, totalmente",
      "🙂 A veces lo olvido, pero sí",
      "🤔 Nunca lo pensé… pero tiene sentido"
    ]
  },
  {
    question: "¿Te reconoces con más potencial del que estás mostrando hoy?",
    answers: [
      "🔥 Muchísimo más",
      "😓 Creo que sí, pero algo me bloquea",
      "🤔 No lo sé, nunca me paré a sentirlo"
    ]
  },
  {
    question:
      "¿Alguna vez pensaste que tu vida sería distinta si hubieras cuidado de ti antes?",
    answers: [
      "🥹 Muchas veces",
      "😓 Sí, y eso me frustra",
      "😣 Lo pienso… y sigo cargando esa sensación hoy"
    ]
  },
  {
    question: "¿Qué es lo que más te incomoda de tu vida en este momento?",
    answers: [
      "❌ Mi mente no para y me drena",
      "😣 No tengo tiempo ni energía para mí",
      "💔 Me siento desconectada de quien quiero ser"
    ]
  },
  {
    question: "¿Qué sensación te visita con más frecuencia últimamente?",
    answers: [
      "😰 Ansiedad y agotamiento",
      "😞 Sensación de no ser suficiente",
      "😔 Cansancio mental constante"
    ]
  },
  {
    question:
      "Si pudieras cambiar UNA sola cosa ahora mismo, ¿qué sería?",
    answers: [
      "🏃 Mis hábitos y mi autocuidado",
      "🧘 Mi energía emocional",
      "🔄 La forma en la que me trato cada día"
    ]
  },
  {
    question:
      "Si te quedara solo 1 año de vida… ¿cómo evaluarías los últimos 5?",
    answers: [
      "❌ Tiempo perdido",
      "👎 Hice menos por mí de lo que merecía",
      "🤖 Viví en automático, sobreviviendo"
    ]
  }
];

let currentQuestionIndex = 0;
// Se quiseres usar as respostas depois, guarda aqui:
let selectedAnswers = [];

// Iniciar quiz ao clicar no botão do hero
if (startBtn) {
  startBtn.addEventListener("click", () => {
    heroSection.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    currentQuestionIndex = 0;
    selectedAnswers = [];
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Renderizar pergunta atual
function renderQuestion() {
  const q = questions[currentQuestionIndex];

  // Atualizar barra de progresso
  const progressPercent =
    ((currentQuestionIndex) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Montar HTML da pergunta e opções
  let html = `
    <div class="quiz-question">
      ${q.question}
    </div>
    <div class="quiz-options">
  `;

  q.answers.forEach((answer, index) => {
    html += `
      <div class="quiz-option" data-index="${index}">
        ${answer}
      </div>
    `;
  });

  html += `</div>`;

  quizStep.innerHTML = html;

  // Adicionar listeners às opções
  const optionElements = document.querySelectorAll(".quiz-option");
  optionElements.forEach((opt) => {
    opt.addEventListener("click", handleAnswerClick);
  });
}

// Ao clicar numa resposta
function handleAnswerClick(e) {
  const el = e.currentTarget;
  const answerText = el.textContent.trim();

  // Guardar resposta (se quiseres usar depois)
  selectedAnswers.push({
    question: questions[currentQuestionIndex].question,
    answer: answerText
  });

  // Ir para próxima pergunta ou finalizar
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

// Quando terminar todas as perguntas
function finishQuiz() {
  // Barra de progresso cheia
  progressBar.style.width = "100%";

  // Esconder quiz e mostrar resultado
  quizContainer.classList.add("hidden");
  resultSection.classList.remove("hidden");

  // (Opcional) redirecionar automaticamente para a landing após alguns segundos:
  // setTimeout(() => {
  //   window.location.href = landingUrl;
  // }, 3000);
}
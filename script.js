// ----------------------------------------
// SCRIPT QUIZ · RETO ZEYRA 21 DÍAS
// ----------------------------------------

// Safe wrapper para GA4
function safeGtag() {
  if (typeof window.gtag === "function") {
    window.gtag.apply(null, arguments);
  }
}

// Evento: quiz aberto
window.addEventListener("DOMContentLoaded", () => {
  safeGtag("event", "quiz_opened");
});

// Seleção dos elementos principais
const startBtn = document.getElementById("startQuiz");
const heroSection = document.querySelector(".hero");
const quizContainer = document.getElementById("quizContainer");
const quizStep = document.getElementById("quizStep");
const progressBar = document.getElementById("progressBar");
const resultSection = document.getElementById("resultSection");

// URL da landing final
const landingUrl = "https://lucashel-design.github.io/desafio-zeyra-landing/landing.html";

function goToLanding() {
  safeGtag("event", "go_to_landing_click");
  window.location.href = landingUrl;
}

// Perguntas
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
    question: "¿Alguna vez pensaste que tu vida sería distinta si hubieras cuidado de ti antes?",
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
    question: "Si pudieras cambiar UNA sola cosa ahora mismo, ¿qué sería?",
    answers: [
      "🏃 Mis hábitos y mi autocuidado",
      "🧘 Mi energía emocional",
      "🔄 La forma en la que me trato cada día"
    ]
  },
  {
    question: "Si te quedara solo 1 año de vida… ¿cómo evaluarías los últimos 5?",
    answers: [
      "❌ Tiempo perdido",
      "👎 Hice menos por mí de lo que merecía",
      "🤖 Viví en automático, sobreviviendo"
    ]
  }
];

let currentQuestionIndex = 0;
let selectedAnswers = [];

// Iniciar quiz
if (startBtn) {
  startBtn.addEventListener("click", () => {
    safeGtag("event", "quiz_started");

    heroSection.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    currentQuestionIndex = 0;
    selectedAnswers = [];
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function renderQuestion() {
  const q = questions[currentQuestionIndex];

  const progressPercent =
    (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  let html = `
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
  `;

  q.answers.forEach((answer) => {
    html += `<div class="quiz-option">${answer}</div>`;
  });

  html += `</div>`;
  quizStep.innerHTML = html;

  document.querySelectorAll(".quiz-option").forEach((opt) => {
    opt.addEventListener("click", handleAnswerClick);
  });
}

function handleAnswerClick(e) {
  selectedAnswers.push(e.currentTarget.textContent.trim());
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  progressBar.style.width = "100%";

  safeGtag("event", "quiz_completed");

  quizContainer.classList.add("hidden");
  resultSection.classList.remove("hidden");

  setTimeout(() => {
    window.location.href = landingUrl;
  }, 3000);
}
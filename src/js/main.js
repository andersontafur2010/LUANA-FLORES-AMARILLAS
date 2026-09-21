onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};

const audio = document.getElementById('mySong');
const message = document.getElementById('message');
const note = document.getElementById('note');

const START_AT = 29;

const phrases = [
  "Feliz día de las flores amarillas, Luu 🌼",
  "Que hoy te lleguen muchas cosas bonitas ✨",
  "Eres una persona increíble, Luu 💛",
  "Que tu día sea tan lindo como tu sonrisa 😊",
  "Que nunca te falte luz, como a estas flores 🌻",
  "Gracias por ser tan especial 🌼",
  "Mereces todo lo bonito que la vida tiene para ti ✨"
];

audio.addEventListener('loadedmetadata', () => {
  if (audio.duration > START_AT) audio.currentTime = START_AT;
});

let phrasesStarted = false;

function startPhrases() {
  if (phrasesStarted) return;
  phrasesStarted = true;
  note.classList.add('hide');

  let i = 0;
  const showNext = () => {
    message.classList.add('fade-out');
    setTimeout(() => {
      message.textContent = phrases[i];
      message.classList.add('phrase');
      message.classList.remove('fade-out');
      i = (i + 1) % phrases.length;
    }, 700);
  };
  showNext();
  setInterval(showNext, 5500);
}

audio.addEventListener('playing', startPhrases);

// Intenta sonar sola; si el navegador lo bloquea, empieza con el primer toque
audio.play().catch(() => {});

document.body.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch((error) => console.error('Error al reproducir audio:', error));
  } else {
    audio.pause();
  }
});

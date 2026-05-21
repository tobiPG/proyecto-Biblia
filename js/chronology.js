// ============================================================
// PREGUNTAS DE CRONOLOGÍA - BibliaQuiz
// ============================================================

const CHRONOLOGY_QUESTIONS = [
  {
    id: 'chr1',
    question: 'Ordena los días de la Creación según el Génesis:',
    items: ['Luz (día y noche)', 'Firmamento y aguas', 'Tierra seca y plantas', 'Sol, luna y estrellas'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr2',
    question: 'Ordena cronológicamente estos eventos del Jardín del Edén:',
    items: ['Creación de Adán', 'Creación de Eva', 'La serpiente tienta a Eva', 'Dios expulsa a Adán y Eva del Edén'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr3',
    question: 'Ordena cronológicamente estos patriarcas del Génesis:',
    items: ['Noé', 'Abraham', 'Isaac', 'Jacob'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr4',
    question: 'Ordena los eventos de la vida de Moisés:',
    items: ['Nacimiento y rescate por la hija del Faraón', 'La zarza ardiente', 'Las 10 plagas de Egipto', 'La entrega de los Diez Mandamientos en el Sinaí'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr5',
    question: 'Ordena cronológicamente estos eventos del Éxodo:',
    items: ['La Pascua (primera)', 'Cruce del Mar Rojo', 'El maná en el desierto', 'El becerro de oro'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr6',
    question: 'Ordena cronológicamente estos jueces de Israel:',
    items: ['Otoniel', 'Débora', 'Gedeón', 'Sansón'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr7',
    question: 'Ordena cronológicamente los primeros reyes de Israel:',
    items: ['Saúl', 'David', 'Salomón', 'División del reino (Roboam/Jeroboam)'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr8',
    question: 'Ordena estos eventos de la vida del rey David:',
    items: ['David mata a Goliat', 'David huye del rey Saúl', 'David es ungido rey sobre Israel', 'David construye el palacio en Jerusalén'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr9',
    question: 'Ordena cronológicamente estos eventos del libro de Job:',
    items: ['Dios permite a Satanás probar a Job', 'Job pierde sus hijos y posesiones', 'Los tres amigos de Job lo visitan', 'Dios restaura la fortuna de Job'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr10',
    question: 'Ordena cronológicamente estos profetas mayores de Israel:',
    items: ['Isaías', 'Jeremías', 'Ezequiel', 'Daniel'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr11',
    question: 'Ordena estos eventos del profeta Elías:',
    items: ['Elías anuncia sequía al rey Acab', 'El cuervo alimenta a Elías en el arroyo', 'El desafío en el Monte Carmelo', 'El torbellino lleva a Elías al cielo'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr12',
    question: 'Ordena cronológicamente los eventos del libro de Jonás:',
    items: ['Dios llama a Jonás a ir a Nínive', 'Jonás huye en un barco a Tarsis', 'Jonás es tragado por el gran pez', 'Jonás predica en Nínive'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr13',
    question: 'Ordena cronológicamente estos eventos de la vida de Jesús:',
    items: ['Nacimiento en Belén', 'Bautismo en el Jordán', 'Tentación en el desierto', 'Llamado de los primeros discípulos'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr14',
    question: 'Ordena cronológicamente los eventos de la Pasión de Cristo:',
    items: ['La Última Cena', 'La traición de Judas en Getsemaní', 'El juicio ante Pilato', 'La crucifixión en el Calvario'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr15',
    question: 'Ordena cronológicamente los eventos de la Resurrección y Ascensión:',
    items: ['La tumba vacía', 'Jesús aparece a María Magdalena', 'Jesús aparece a los Once discípulos', 'La Ascensión de Jesús al cielo'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr16',
    question: 'Ordena cronológicamente los eventos del libro de los Hechos:',
    items: ['Pentecostés: descenso del Espíritu Santo', 'Martirio de Esteban', 'Conversión de Saulo en el camino a Damasco', 'Primer viaje misionero de Pablo'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr17',
    question: 'Ordena cronológicamente los tres viajes misioneros de Pablo:',
    items: ['Primer viaje: Chipre y Asia Menor', 'Concilio de Jerusalén', 'Segundo viaje: Macedonia y Grecia', 'Tercer viaje: Éfeso y Corinto'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr18',
    question: 'Ordena estos eventos de la vida del patriarca José:',
    items: ['José vendido como esclavo por sus hermanos', 'José en la cárcel por la acusación de la esposa de Potifar', 'José interpreta los sueños del Faraón', 'José revela su identidad a sus hermanos'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr19',
    question: 'Ordena cronológicamente los eventos de la conquista de Canaán:',
    items: ['Cruce del río Jordán', 'La toma de Jericó', 'Batalla de Hai', 'Reparto de la tierra entre las tribus'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr20',
    question: 'Ordena cronológicamente estos eventos del libro de Daniel:',
    items: ['Daniel y sus amigos en la corte de Babilonia', 'Los tres jóvenes en el horno de fuego', 'Daniel interpreta el sueño de Nabucodonosor', 'Daniel en el foso de los leones'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr21',
    question: 'Ordena cronológicamente los eventos de la historia de Ester:',
    items: ['Ester es elegida reina', 'Amán conspira para destruir a los judíos', 'Mardoqueo pide a Ester que interceda', 'Amán es ahorcado y los judíos son salvados'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr22',
    question: 'Ordena cronológicamente los eventos de la historia de Rut:',
    items: ['Noemí y Rut regresan a Belén', 'Rut espiga en el campo de Booz', 'Booz habla con el pariente redentor', 'Booz y Rut se casan'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr23',
    question: 'Ordena cronológicamente estos momentos de la vida de Abraham:',
    items: ['Llamado a salir de Ur de los Caldeos', 'Pacto de Dios con Abraham (circuncisión)', 'Anuncio del nacimiento de Isaac', 'Sacrificio de Isaac en el Monte Moria'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr24',
    question: 'Ordena los días de la Creación completos según Génesis 1:',
    items: ['Día 1: Luz', 'Día 3: Tierra y plantas', 'Día 5: Aves y peces', 'Día 7: Descanso'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr25',
    question: 'Ordena cronológicamente los reyes del reino del Norte (Israel) más notables:',
    items: ['Jeroboam I (fundador)', 'Omri (fundó Samaria)', 'Acab (esposo de Jezabel)', 'Caída de Samaria ante Asiria'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr26',
    question: 'Ordena estos eventos de la parábola del hijo pródigo:',
    items: ['El hijo pide su herencia al padre', 'El hijo malgasta todo en vida desordenada', 'El hijo vuelve en sí y decide regresar', 'El padre sale corriendo a recibirlo'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr27',
    question: 'Ordena cronológicamente estos eventos del ministerio de Juan el Bautista:',
    items: ['Predicación en el desierto', 'Bautismo de Jesús en el Jordán', 'Juan enviado a la cárcel por Herodes', 'Decapitación de Juan el Bautista'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr28',
    question: 'Ordena cronológicamente los grandes imperios que dominaron Israel:',
    items: ['Imperio Asirio (caída de Samaria)', 'Imperio Babilónico (destrucción del Templo)', 'Imperio Persa (regreso del exilio)', 'Imperio Romano (época de Jesús)'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr29',
    question: 'Ordena cronológicamente los eventos del nacimiento de Moisés hasta su llamado:',
    items: ['Moisés es puesto en el río Nilo en una cesta', 'Moisés crece en el palacio del Faraón', 'Moisés huye a Madián tras matar al egipcio', 'La zarza ardiente y el llamado de Dios'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 'chr30',
    question: 'Ordena cronológicamente los eventos de Pentecostés y la Iglesia primitiva:',
    items: ['Venida del Espíritu Santo en Pentecostés', 'Pedro predica y 3000 personas se convierten', 'Persecución de la iglesia en Jerusalén', 'El evangelio se extiende a Samaria y gentiles'],
    correctOrder: [0, 1, 2, 3]
  }
];

const ChronologyManager = {
  currentQuestion: null,
  userOrder: [],
  questionIndex: 0,
  score: 0,
  totalQuestions: 15,
  questions: [],
  answered: false,

  // Start the game
  startGame() {
    // Pick 15 random questions
    const shuffled = [...CHRONOLOGY_QUESTIONS].sort(() => Math.random() - 0.5);
    this.questions = shuffled.slice(0, this.totalQuestions);
    this.questionIndex = 0;
    this.score = 0;
    this.renderQuestion();
    App.showScreen('chronology');
  },

  // Render current question
  renderQuestion() {
    this.answered = false;
    this.userOrder = [];
    const q = this.questions[this.questionIndex];
    this.currentQuestion = q;

    // Update progress
    const progressEl = document.getElementById('chrono-progress');
    if (progressEl) progressEl.textContent = `${this.questionIndex + 1} / ${this.totalQuestions}`;

    const scoreEl = document.getElementById('chrono-score');
    if (scoreEl) scoreEl.textContent = this.score + ' pts';

    // Render question text
    const questionEl = document.getElementById('chrono-question-text');
    if (questionEl) questionEl.textContent = q.question;

    // Shuffle items for display
    this.shuffledItems = [...q.items.map((item, i) => ({ text: item, originalIndex: i }))].sort(() => Math.random() - 0.5);

    // Render items
    const itemsContainer = document.getElementById('chrono-items');
    if (itemsContainer) {
      itemsContainer.innerHTML = this.shuffledItems.map((item, displayIndex) => `
        <div class="chrono-item" id="chrono-item-${displayIndex}" onclick="ChronologyManager.handleItemTap(${displayIndex})">
          <div class="chrono-item-badge" id="chrono-badge-${displayIndex}"></div>
          <div class="chrono-item-text">${item.text}</div>
        </div>
      `).join('');
    }

    // Hide verify button initially
    const verifyBtn = document.getElementById('btn-chrono-verify');
    if (verifyBtn) verifyBtn.classList.add('hidden');

    // Hide result feedback
    const feedbackEl = document.getElementById('chrono-feedback');
    if (feedbackEl) {
      feedbackEl.classList.add('hidden');
      feedbackEl.className = 'chrono-feedback hidden';
    }

    const nextBtn = document.getElementById('btn-chrono-next');
    if (nextBtn) nextBtn.classList.add('hidden');
  },

  // Handle item tap
  handleItemTap(displayIndex) {
    if (this.answered) return;

    const alreadySelected = this.userOrder.indexOf(displayIndex);
    if (alreadySelected !== -1) {
      // Deselect: remove from order and update all badges
      this.userOrder.splice(alreadySelected, 1);
      document.getElementById(`chrono-item-${displayIndex}`).classList.remove('selected');
      document.getElementById(`chrono-badge-${displayIndex}`).textContent = '';
      // Re-number remaining
      this.userOrder.forEach((idx, pos) => {
        document.getElementById(`chrono-badge-${idx}`).textContent = pos + 1;
      });
    } else {
      // Select
      this.userOrder.push(displayIndex);
      const badge = document.getElementById(`chrono-badge-${displayIndex}`);
      const item = document.getElementById(`chrono-item-${displayIndex}`);
      if (badge) badge.textContent = this.userOrder.length;
      if (item) item.classList.add('selected');
    }

    // Show verify button when all items selected
    const verifyBtn = document.getElementById('btn-chrono-verify');
    if (verifyBtn) {
      if (this.userOrder.length === this.currentQuestion.items.length) {
        verifyBtn.classList.remove('hidden');
      } else {
        verifyBtn.classList.add('hidden');
      }
    }
  },

  // Check the answer
  checkAnswer() {
    if (this.answered) return;
    this.answered = true;

    const q = this.currentQuestion;
    // Map userOrder (display indices) to original indices
    const userOriginalOrder = this.userOrder.map(di => this.shuffledItems[di].originalIndex);
    const isCorrect = JSON.stringify(userOriginalOrder) === JSON.stringify(q.correctOrder);

    // Count how many consecutive correct from start
    let correctFromStart = 0;
    for (let i = 0; i < q.correctOrder.length; i++) {
      if (userOriginalOrder[i] === q.correctOrder[i]) correctFromStart++;
      else break;
    }

    let pointsEarned = 0;
    let feedbackMsg = '';
    let feedbackClass = '';

    if (isCorrect) {
      pointsEarned = 100;
      feedbackMsg = '¡Correcto! +100 puntos';
      feedbackClass = 'correct';
    } else if (correctFromStart >= q.correctOrder.length - 1) {
      pointsEarned = 50;
      feedbackMsg = '¡Casi! +50 puntos';
      feedbackClass = 'partial';
    } else {
      feedbackMsg = 'Incorrecto';
      feedbackClass = 'wrong';
    }

    this.score += pointsEarned;

    // Show feedback
    const feedbackEl = document.getElementById('chrono-feedback');
    if (feedbackEl) {
      feedbackEl.textContent = feedbackMsg;
      feedbackEl.className = `chrono-feedback ${feedbackClass}`;
    }

    // Color items based on correct order
    this.shuffledItems.forEach((item, di) => {
      const el = document.getElementById(`chrono-item-${di}`);
      const correctPos = q.correctOrder.indexOf(item.originalIndex);
      const userPos = this.userOrder.indexOf(di);
      if (el) {
        if (userPos === correctPos) {
          el.classList.add('item-correct');
        } else {
          el.classList.add('item-wrong');
        }
      }
      // Show correct number
      const badge = document.getElementById(`chrono-badge-${di}`);
      if (badge) badge.textContent = correctPos + 1;
    });

    // Show correct order explanation
    const correctOrderEl = document.getElementById('chrono-correct-order');
    if (correctOrderEl) {
      const orderedItems = [...q.correctOrder].map(idx => q.items[idx]);
      correctOrderEl.innerHTML = `<strong>Orden correcto:</strong><ol>${orderedItems.map(item => `<li>${item}</li>`).join('')}</ol>`;
      correctOrderEl.classList.remove('hidden');
    }

    // Update score display
    const scoreEl = document.getElementById('chrono-score');
    if (scoreEl) scoreEl.textContent = this.score + ' pts';

    // Hide verify, show next
    const verifyBtn = document.getElementById('btn-chrono-verify');
    if (verifyBtn) verifyBtn.classList.add('hidden');

    const nextBtn = document.getElementById('btn-chrono-next');
    if (nextBtn) {
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = this.questionIndex + 1 < this.totalQuestions ? 'Siguiente →' : 'Ver Resultados';
    }
  },

  // Next question or results
  nextQuestion() {
    const correctOrderEl = document.getElementById('chrono-correct-order');
    if (correctOrderEl) correctOrderEl.classList.add('hidden');

    this.questionIndex++;
    if (this.questionIndex < this.totalQuestions) {
      this.renderQuestion();
    } else {
      this.showResults();
    }
  },

  // Show results
  showResults() {
    const maxScore = this.totalQuestions * 100;
    const percentage = Math.round((this.score / maxScore) * 100);

    const scoreEl = document.getElementById('chrono-result-score');
    const pctEl = document.getElementById('chrono-result-pct');
    const msgEl = document.getElementById('chrono-result-msg');

    if (scoreEl) scoreEl.textContent = this.score;
    if (pctEl) pctEl.textContent = percentage + '%';

    let msg = '';
    if (percentage >= 90) msg = '¡Eres un experto en cronología bíblica!';
    else if (percentage >= 70) msg = '¡Excelente conocimiento del orden bíblico!';
    else if (percentage >= 50) msg = '¡Buen intento! Sigue estudiando la Biblia.';
    else msg = 'Repasa el orden de los eventos bíblicos.';

    if (msgEl) msgEl.textContent = msg;

    App.showScreen('chronology-result');
  }
};

window.ChronologyManager = ChronologyManager;

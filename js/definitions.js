// BibliaQuiz - Definiciones con iconos estilizados
// Version con simbolos Unicode decorativos

// Categorias con iconos bonitos
window.CATEGORIES = {
  personajes: { name: "Personajes", icon: "🧑‍🤝‍🧑", color: "#4CAF50" },
  libros: { name: "Libros", icon: "📚", color: "#2196F3" },
  historias: { name: "Historias", icon: "📜", color: "#FF9800" },
  reyes: { name: "Reyes", icon: "👑", color: "#9C27B0" },
  profetas: { name: "Profetas", icon: "🔮", color: "#F44336" },
  vida_jesus: { name: "Vida de Jesús", icon: "✝️", color: "#E91E63" },
  milagros: { name: "Milagros", icon: "✨", color: "#00BCD4" },
  cartas: { name: "Cartas", icon: "💌", color: "#795548" },
  aleatorio: { name: "Aleatorio", icon: "🎲", color: "#607D8B" }
};

// Niveles de dificultad
window.DIFFICULTIES = {
  facil: { name: "Fácil", icon: "🌱", color: "#4CAF50", points: 10 },
  intermedio: { name: "Intermedio", icon: "📗", color: "#FF9800", points: 20 },
  dificil: { name: "Difícil", icon: "🔥", color: "#F44336", points: 30 },
  experto: { name: "Experto", icon: "👑", color: "#9C27B0", points: 50 }
};

// Insignias con iconos elaborados
window.BADGES = [
  { id: "first_win", name: "Primera Victoria", icon: "🏆", description: "Responde tu primera pregunta correctamente", condition: (stats) => stats.totalCorrect >= 1 },
  { id: "streak_5", name: "En Racha", icon: "🔥", description: "5 respuestas correctas seguidas", condition: (stats) => stats.bestStreak >= 5 },
  { id: "streak_10", name: "Imparable", icon: "⚡", description: "10 respuestas correctas seguidas", condition: (stats) => stats.bestStreak >= 10 },
  { id: "streak_20", name: "Leyenda Bíblica", icon: "💎", description: "20 respuestas correctas seguidas", condition: (stats) => stats.bestStreak >= 20 },
  { id: "points_100", name: "Centurión", icon: "🛡️", description: "Alcanza 100 puntos", condition: (stats) => stats.totalPoints >= 100 },
  { id: "points_500", name: "Guerrero de Fe", icon: "⚔️", description: "Alcanza 500 puntos", condition: (stats) => stats.totalPoints >= 500 },
  { id: "points_1000", name: "Campeón Bíblico", icon: "👑", description: "Alcanza 1,000 puntos", condition: (stats) => stats.totalPoints >= 1000 },
  { id: "points_5000", name: "Maestro Supremo", icon: "🌟", description: "Alcanza 5,000 puntos", condition: (stats) => stats.totalPoints >= 5000 },
  { id: "games_10", name: "Fiel Jugador", icon: "📿", description: "Juega 10 partidas", condition: (stats) => stats.totalGames >= 10 },
  { id: "games_50", name: "Devoto", icon: "🕯️", description: "Juega 50 partidas", condition: (stats) => stats.totalGames >= 50 },
  { id: "perfect_game", name: "Perfección", icon: "💯", description: "10/10 en una partida", condition: (stats) => stats.perfectGames >= 1 },
  { id: "all_categories", name: "Explorador", icon: "🗺️", description: "Juega en todas las categorías", condition: (stats) => stats.categoriesPlayed >= 8 },
  { id: "expert_win", name: "Sabio", icon: "🦉", description: "Acierta 10 preguntas en nivel Experto", condition: (stats) => stats.expertCorrect >= 10 },
  { id: "total_100", name: "Estudioso", icon: "📚", description: "Responde 100 preguntas en total", condition: (stats) => stats.totalAnswered >= 100 },
  { id: "streak_30", name: "Constante", icon: "📅", description: "Racha de 30 días jugando", condition: (stats) => stats.dailyStreak >= 30 },
  { id: "fast_5", name: "Rápido", icon: "⏱️", description: "Responde 5 preguntas en menos de 3 segundos", condition: (stats) => stats.fastAnswers >= 5 },
  { id: "fast_10", name: "Relámpago", icon: "⚡", description: "Responde 10 preguntas en menos de 3 segundos", condition: (stats) => stats.fastAnswers >= 10 },
  { id: "category_personajes", name: "Maestro de Personajes", icon: "🧑‍🤝‍🧑", description: "Completa la categoría Personajes", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('personajes') },
  { id: "category_libros", name: "Maestro de Libros", icon: "📚", description: "Completa la categoría Libros", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('libros') },
  { id: "category_historias", name: "Maestro de Historias", icon: "📜", description: "Completa la categoría Historias", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('historias') },
  { id: "category_reyes", name: "Maestro de Reyes", icon: "👑", description: "Completa la categoría Reyes", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('reyes') },
  { id: "category_profetas", name: "Maestro de Profetas", icon: "🔮", description: "Completa la categoría Profetas", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('profetas') },
  { id: "category_vida_jesus", name: "Maestro de Jesús", icon: "✝️", description: "Completa la categoría Vida de Jesús", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('vida_jesus') },
  { id: "category_milagros", name: "Maestro de Milagros", icon: "✨", description: "Completa la categoría Milagros", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('milagros') },
  { id: "category_cartas", name: "Maestro de Cartas", icon: "💌", description: "Completa la categoría Cartas", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('cartas') },
  { id: "category_aleatorio", name: "Maestro Aleatorio", icon: "🎲", description: "Completa la categoría Aleatorio", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('aleatorio') },
  { id: "super_streak", name: "Racha Legendaria", icon: "🔥", description: "Racha de 50 respuestas correctas seguidas", condition: (stats) => stats.bestStreak >= 50 },
  { id: "games_365", name: "Dedicación", icon: "🏅", description: "Juega 365 días distintos", condition: (stats) => stats.uniqueDaysPlayed >= 365 },
  { id: "lives_0", name: "Sin Margen de Error", icon: "💪", description: "Gana una partida sin perder vidas", condition: (stats) => stats.gamesNoLivesLost >= 1 },
  { id: "challenge_win", name: "Contrarreloj", icon: "⏰", description: "Gana un desafío diario", condition: (stats) => stats.dailyChallengesWon >= 1 },
  { id: "impostor_win", name: "Detective", icon: "🔍", description: "Gana una partida en modo Impostor", condition: (stats) => stats.impostorWins >= 1 },
];

// Versículos diarios
window.DAILY_VERSES = [
  { text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.", ref: "Juan 3:16" },
  { text: "El Señor es mi pastor; nada me faltará.", ref: "Salmos 23:1" },
  { text: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13" },
  { text: "Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia.", ref: "Proverbios 3:5" },
  { text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.", ref: "Jeremías 29:11" },
  { text: "Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo de ellos, porque Jehová tu Dios es el que va contigo.", ref: "Deuteronomio 31:6" },
  { text: "Jehová es mi luz y mi salvación; ¿de quién temeré?", ref: "Salmos 27:1" },
  { text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.", ref: "Mateo 6:33" },
  { text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.", ref: "Mateo 11:28" },
  { text: "Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.", ref: "Juan 14:6" },
  { text: "El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.", ref: "Salmos 91:1" },
  { text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", ref: "Salmos 119:105" },
  { text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.", ref: "Isaías 41:10" },
  { text: "Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.", ref: "1 Tesalonicenses 5:18" }
];

console.log('[BibliaQuiz] Definiciones cargadas correctamente');

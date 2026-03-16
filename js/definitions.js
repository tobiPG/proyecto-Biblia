// BibliaQuiz - Definiciones con iconos estilizados
// Version con simbolos Unicode decorativos

// Categorias con iconos bonitos e imágenes decorativas
window.CATEGORIES = {
  personajes: { name: "Personajes", icon: "🧑‍🤝‍🧑", color: "#4CAF50", bigIcon: "👨‍👩‍👧‍👦" },
  libros: { name: "Libros", icon: "📚", color: "#2196F3", bigIcon: "📖" },
  historias: { name: "Historias", icon: "📜", color: "#FF9800", bigIcon: "🎬" },
  reyes: { name: "Reyes", icon: "👑", color: "#9C27B0", bigIcon: "👑" },
  profetas: { name: "Profetas", icon: "🔮", color: "#F44336", bigIcon: "🧙" },
  vida_jesus: { name: "Vida de Jesús", icon: "✝️", color: "#E91E63", bigIcon: "✝️" },
  milagros: { name: "Milagros", icon: "✨", color: "#00BCD4", bigIcon: "🌟" },
  cartas: { name: "Cartas", icon: "💌", color: "#795548", bigIcon: "✉️" },
  aleatorio: { name: "Aleatorio", icon: "🎲", color: "#607D8B", bigIcon: "🎲" }
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
  // Juan
  { text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.", ref: "Juan 3:16" },
  { text: "Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.", ref: "Juan 14:6" },
  { text: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.", ref: "Juan 1:1" },
  { text: "Jesús le dijo: Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá.", ref: "Juan 11:25" },
  { text: "La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.", ref: "Juan 14:27" },
  { text: "Si permanecéis en mí, y mis palabras permanecen en vosotros, pedid todo lo que queráis, y os será hecho.", ref: "Juan 15:7" },
  { text: "La verdad os hará libres.", ref: "Juan 8:32" },
  
  // Salmos
  { text: "El Señor es mi pastor; nada me faltará.", ref: "Salmos 23:1" },
  { text: "Jehová es mi luz y mi salvación; ¿de quién temeré?", ref: "Salmos 27:1" },
  { text: "El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.", ref: "Salmos 91:1" },
  { text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", ref: "Salmos 119:105" },
  { text: "Este es el día que hizo Jehová; nos gozaremos y alegraremos en él.", ref: "Salmos 118:24" },
  { text: "Estad quietos, y conoced que yo soy Dios.", ref: "Salmos 46:10" },
  { text: "Gustad, y ved que es bueno Jehová; dichoso el hombre que confía en él.", ref: "Salmos 34:8" },
  { text: "Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu.", ref: "Salmos 34:18" },
  { text: "Bendice, alma mía, a Jehová, y bendiga todo mi ser su santo nombre.", ref: "Salmos 103:1" },
  { text: "Alzaré mis ojos a los montes; ¿de dónde vendrá mi socorro?", ref: "Salmos 121:1" },
  { text: "Tu palabra es verdad.", ref: "Salmos 119:160" },
  
  // Proverbios
  { text: "Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia.", ref: "Proverbios 3:5" },
  { text: "El principio de la sabiduría es el temor de Jehová.", ref: "Proverbios 9:10" },
  { text: "El hierro con hierro se aguza; y así el hombre aguza el rostro de su amigo.", ref: "Proverbios 27:17" },
  { text: "Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.", ref: "Proverbios 22:6" },
  { text: "El que halla esposa halla el bien, y alcanza la benevolencia de Jehová.", ref: "Proverbios 18:22" },
  
  // Mateo
  { text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.", ref: "Mateo 6:33" },
  { text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.", ref: "Mateo 11:28" },
  { text: "Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá.", ref: "Mateo 7:7" },
  { text: "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.", ref: "Mateo 18:20" },
  { text: "He aquí, yo estoy con vosotros todos los días, hasta el fin del mundo.", ref: "Mateo 28:20" },
  { text: "Así alumbre vuestra luz delante de los hombres, para que vean vuestras buenas obras.", ref: "Mateo 5:16" },
  
  // Filipenses
  { text: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13" },
  { text: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios.", ref: "Filipenses 4:6" },
  { text: "Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones.", ref: "Filipenses 4:7" },
  { text: "Haya, pues, en vosotros este sentir que hubo también en Cristo Jesús.", ref: "Filipenses 2:5" },
  
  // Romanos
  { text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.", ref: "Romanos 8:28" },
  { text: "Porque la paga del pecado es muerte, mas la dádiva de Dios es vida eterna.", ref: "Romanos 6:23" },
  { text: "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento.", ref: "Romanos 12:2" },
  { text: "Así que la fe es por el oír, y el oír, por la palabra de Dios.", ref: "Romanos 10:17" },
  
  // Isaías
  { text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.", ref: "Isaías 41:10" },
  { text: "Los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas.", ref: "Isaías 40:31" },
  { text: "Porque yo Jehová soy tu Dios, quien te sostiene de tu mano derecha.", ref: "Isaías 41:13" },
  { text: "He aquí que yo hago cosa nueva; pronto saldrá a luz; ¿no la conoceréis?", ref: "Isaías 43:19" },
  
  // Jeremías
  { text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.", ref: "Jeremías 29:11" },
  { text: "Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas.", ref: "Jeremías 33:3" },
  
  // Deuteronomio/Josué
  { text: "Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo de ellos, porque Jehová tu Dios es el que va contigo.", ref: "Deuteronomio 31:6" },
  { text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes.", ref: "Josué 1:9" },
  
  // Tesalonicenses
  { text: "Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.", ref: "1 Tesalonicenses 5:18" },
  { text: "Orad sin cesar.", ref: "1 Tesalonicenses 5:17" },
  
  // Hebreos
  { text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.", ref: "Hebreos 11:1" },
  { text: "Jesucristo es el mismo ayer, y hoy, y por los siglos.", ref: "Hebreos 13:8" },
  
  // Santiago
  { text: "La oración eficaz del justo puede mucho.", ref: "Santiago 5:16" },
  { text: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios.", ref: "Santiago 1:5" },
  
  // Pedro
  { text: "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.", ref: "1 Pedro 5:7" },
  { text: "Mas vosotros sois linaje escogido, real sacerdocio, nación santa.", ref: "1 Pedro 2:9" },
  
  // Gálatas
  { text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe.", ref: "Gálatas 5:22" },
  
  // Efesios
  { text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.", ref: "Efesios 2:8" },
  { text: "Vestíos de toda la armadura de Dios, para que podáis estar firmes contra las asechanzas del diablo.", ref: "Efesios 6:11" },
  
  // Corintios
  { text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso.", ref: "1 Corintios 13:4" },
  { text: "Si digo que hablo con las lenguas de los hombres y de los ángeles, y no tengo amor, vengo a ser como metal que resuena.", ref: "1 Corintios 13:1" },
  { text: "De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron.", ref: "2 Corintios 5:17" },
  
  // Apocalipsis
  { text: "He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él.", ref: "Apocalipsis 3:20" },
  { text: "Enjugará Dios toda lágrima de los ojos de ellos.", ref: "Apocalipsis 21:4" },
  
  // 1 Juan
  { text: "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados.", ref: "1 Juan 1:9" },
  { text: "Hijitos, amémonos unos a otros; porque el amor es de Dios.", ref: "1 Juan 4:7" },
  
  // Génesis
  { text: "En el principio creó Dios los cielos y la tierra.", ref: "Génesis 1:1" },
  { text: "Y creó Dios al hombre a su imagen, a imagen de Dios lo creó.", ref: "Génesis 1:27" },
  
  // Lamentaciones
  { text: "Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias.", ref: "Lamentaciones 3:22" },
  { text: "Nuevas son cada mañana; grande es tu fidelidad.", ref: "Lamentaciones 3:23" },
  
  // Colosenses
  { text: "Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.", ref: "Colosenses 3:23" },
  { text: "Y la paz de Dios gobierne en vuestros corazones.", ref: "Colosenses 3:15" },
  
  // Miqueas/Nahúm
  { text: "Él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios.", ref: "Miqueas 6:8" },
  { text: "Jehová es bueno, fortaleza en el día de la angustia.", ref: "Nahúm 1:7" },
  
  // Timoteo
  { text: "Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.", ref: "2 Timoteo 1:7" },
  { text: "Pelea la buena batalla de la fe, echa mano de la vida eterna.", ref: "1 Timoteo 6:12" }
];

console.log('[BibliaQuiz] Definiciones cargadas correctamente');

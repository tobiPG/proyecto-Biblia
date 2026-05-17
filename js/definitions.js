// BibliaQuiz - Definiciones con iconos estilizados
// Version con simbolos Unicode decorativos

// Imágenes por categoría (gratuitas de Unsplash)
window.CATEGORY_IMAGES = {
  personajes: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", // rostros
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop", // grupo personas
    "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=300&fit=crop", // comunidad
    "https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&h=300&fit=crop", // siluetas
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop"  // personas orando
  ],
  libros: [
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop", // biblioteca
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop", // libros antiguos
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop", // libro abierto
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop", // estante libros
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop"  // estudio
  ],
  historias: [
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop", // pergamino
    "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400&h=300&fit=crop", // desierto
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop", // naturaleza épica
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop", // luz divina
    "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=300&fit=crop"  // biblia antigua
  ],
  reyes: [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", // corona
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop", // trono/castillo
    "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=400&h=300&fit=crop", // palacio
    "https://images.unsplash.com/photo-1564429238535-b3749f1a15ac?w=400&h=300&fit=crop", // cetro/oro
    "https://images.unsplash.com/photo-1533282960533-51328aa49826?w=400&h=300&fit=crop"  // arquitectura real
  ],
  profetas: [
    "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=300&fit=crop", // cielo dramático
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=300&fit=crop", // montaña mística
    "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=400&h=300&fit=crop", // fuego
    "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=400&h=300&fit=crop", // tormenta
    "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=400&h=300&fit=crop"  // desierto profético
  ],
  vida_jesus: [
    "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=400&h=300&fit=crop", // cruz
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop", // manos orando
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&h=300&fit=crop", // amanecer esperanza
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=300&fit=crop", // iglesia
    "https://images.unsplash.com/photo-1499652848871-1527a310b13a?w=400&h=300&fit=crop"  // luz celestial
  ],
  milagros: [
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop", // mar/agua
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop", // montaña majestuosa
    "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400&h=300&fit=crop", // luz milagrosa
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop", // naturaleza divina
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop"  // amanecer glorioso
  ],
  cartas: [
    "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400&h=300&fit=crop", // carta antigua
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop", // escribiendo
    "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop", // pluma y papel
    "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400&h=300&fit=crop", // escritura
    "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=300&fit=crop"  // manuscrito
  ],
  aleatorio: [
    "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=300&fit=crop", // biblia
    "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=300&fit=crop", // cruz luz
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", // montañas
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop", // flores
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=300&fit=crop"  // cielo estrellado
  ]
};

// Función para obtener imagen aleatoria de categoría
window.getCategoryImage = function(category) {
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES.aleatorio;
  return images[Math.floor(Math.random() * images.length)];
};

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
  { text: "Pelea la buena batalla de la fe, echa mano de la vida eterna.", ref: "1 Timoteo 6:12" },
  
  // === VERSÍCULOS ADICIONALES (54-120+) ===
  
  // Más de Juan
  { text: "En él estaba la vida, y la vida era la luz de los hombres.", ref: "Juan 1:4" },
  { text: "A lo suyo vino, y los suyos no le recibieron.", ref: "Juan 1:11" },
  { text: "Mas a todos los que le recibieron, a los que creen en su nombre, les dio potestad de ser hechos hijos de Dios.", ref: "Juan 1:12" },
  { text: "De cierto, de cierto te digo, que el que no naciere de nuevo, no puede ver el reino de Dios.", ref: "Juan 3:3" },
  { text: "Respondió Jesús y le dijo: Cualquiera que bebiere de esta agua, volverá a tener sed.", ref: "Juan 4:13" },
  { text: "Mas la hora viene, y ahora es, cuando los verdaderos adoradores adorarán al Padre en espíritu y en verdad.", ref: "Juan 4:23" },
  { text: "Yo soy el pan de vida; el que a mí viene, nunca tendrá hambre.", ref: "Juan 6:35" },
  { text: "El ladrón no viene sino para hurtar y matar y destruir; yo he venido para que tengan vida.", ref: "Juan 10:10" },
  { text: "Yo soy el buen pastor; el buen pastor su vida da por las ovejas.", ref: "Juan 10:11" },
  { text: "Mis ovejas oyen mi voz, y yo las conozco, y me siguen.", ref: "Juan 10:27" },
  { text: "El que cree en mí, como dice la Escritura, de su interior correrán ríos de agua viva.", ref: "Juan 7:38" },
  { text: "Un mandamiento nuevo os doy: Que os améis unos a otros; como yo os he amado.", ref: "Juan 13:34" },
  { text: "Yo soy la vid verdadera, y mi Padre es el labrador.", ref: "Juan 15:1" },
  { text: "Nadie tiene mayor amor que este, que uno ponga su vida por sus amigos.", ref: "Juan 15:13" },
  { text: "Y conoceréis la verdad, y la verdad os hará libres.", ref: "Juan 8:32" },
  
  // Más de Salmos
  { text: "Los cielos cuentan la gloria de Dios, y el firmamento anuncia la obra de sus manos.", ref: "Salmos 19:1" },
  { text: "La ley de Jehová es perfecta, que convierte el alma.", ref: "Salmos 19:7" },
  { text: "Sean gratos los dichos de mi boca y la meditación de mi corazón delante de ti.", ref: "Salmos 19:14" },
  { text: "Jehová es mi fortaleza y mi escudo; en él confió mi corazón.", ref: "Salmos 28:7" },
  { text: "Espera en Jehová, y guarda su camino, y él te exaltará.", ref: "Salmos 37:34" },
  { text: "Como el ciervo brama por las corrientes de las aguas, así clama por ti, oh Dios, el alma mía.", ref: "Salmos 42:1" },
  { text: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.", ref: "Salmos 46:1" },
  { text: "Crea en mí, oh Dios, un corazón limpio, y renueva un espíritu recto dentro de mí.", ref: "Salmos 51:10" },
  { text: "Ten misericordia de mí, oh Dios, conforme a tu misericordia.", ref: "Salmos 51:1" },
  { text: "Echa sobre Jehová tu carga, y él te sustentará.", ref: "Salmos 55:22" },
  { text: "Porque mejor es un día en tus atrios que mil fuera de ellos.", ref: "Salmos 84:10" },
  { text: "Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera.", ref: "Isaías 26:3" },
  { text: "Él sana a los quebrantados de corazón, y venda sus heridas.", ref: "Salmos 147:3" },
  { text: "Te alabaré, porque formidables, maravillosas son tus obras.", ref: "Salmos 139:14" },
  { text: "Tus ojos vieron mi cuerpo en formación; todo eso estaba escrito en tu libro.", ref: "Salmos 139:16" },
  
  // Más de Proverbios
  { text: "En todo camino reconócele, y él enderezará tus veredas.", ref: "Proverbios 3:6" },
  { text: "Porque Jehová da la sabiduría, y de su boca viene el conocimiento y la inteligencia.", ref: "Proverbios 2:6" },
  { text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.", ref: "Proverbios 3:5" },
  { text: "Hijo mío, no menosprecies la disciplina de Jehová, ni te fatigues de su corrección.", ref: "Proverbios 3:11" },
  { text: "Guarda tu corazón con toda diligencia, porque de él mana la vida.", ref: "Proverbios 4:23" },
  { text: "El camino de los impíos es como la oscuridad; no saben en qué tropiezan.", ref: "Proverbios 4:19" },
  { text: "La lengua apacible es árbol de vida; mas la perversidad de ella es quebrantamiento de espíritu.", ref: "Proverbios 15:4" },
  { text: "Mejor es lo poco con el temor de Jehová, que el gran tesoro donde hay turbación.", ref: "Proverbios 15:16" },
  { text: "Del hombre son las disposiciones del corazón; mas de Jehová es la respuesta de la lengua.", ref: "Proverbios 16:1" },
  { text: "El corazón alegre constituye buen remedio; mas el espíritu triste seca los huesos.", ref: "Proverbios 17:22" },
  
  // Más de Mateo
  { text: "Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos.", ref: "Mateo 5:3" },
  { text: "Bienaventurados los mansos, porque ellos recibirán la tierra por heredad.", ref: "Mateo 5:5" },
  { text: "Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados.", ref: "Mateo 5:6" },
  { text: "Bienaventurados los misericordiosos, porque ellos alcanzarán misericordia.", ref: "Mateo 5:7" },
  { text: "Bienaventurados los pacificadores, porque ellos serán llamados hijos de Dios.", ref: "Mateo 5:9" },
  { text: "Vosotros sois la sal de la tierra; pero si la sal se desvaneciere, ¿con qué será salada?", ref: "Mateo 5:13" },
  { text: "Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder.", ref: "Mateo 5:14" },
  { text: "No os afanéis por vuestra vida, qué habéis de comer o qué habéis de beber.", ref: "Mateo 6:25" },
  { text: "Mirad las aves del cielo, que no siembran, ni siegan, ni recogen en graneros.", ref: "Mateo 6:26" },
  { text: "No juzguéis, para que no seáis juzgados.", ref: "Mateo 7:1" },
  
  // Más de Romanos
  { text: "Por tanto, somos sepultados juntamente con él para muerte por el bautismo.", ref: "Romanos 6:4" },
  { text: "Porque el ocuparse de la carne es muerte, pero el ocuparse del Espíritu es vida y paz.", ref: "Romanos 8:6" },
  { text: "Porque si vivís conforme a la carne, moriréis; mas si por el Espíritu hacéis morir las obras de la carne, viviréis.", ref: "Romanos 8:13" },
  { text: "Y si hijos, también herederos; herederos de Dios y coherederos con Cristo.", ref: "Romanos 8:17" },
  { text: "¿Qué, pues, diremos a esto? Si Dios es por nosotros, ¿quién contra nosotros?", ref: "Romanos 8:31" },
  { text: "Ni lo alto, ni lo profundo, ni ninguna otra cosa creada nos podrá separar del amor de Dios.", ref: "Romanos 8:39" },
  { text: "Que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón, serás salvo.", ref: "Romanos 10:9" },
  { text: "El amor sea sin fingimiento. Aborreced lo malo, seguid lo bueno.", ref: "Romanos 12:9" },
  { text: "Gozosos en la esperanza; sufridos en la tribulación; constantes en la oración.", ref: "Romanos 12:12" },
  { text: "Bendecid a los que os persiguen; bendecid, y no maldigáis.", ref: "Romanos 12:14" },
  
  // Más de Corintios
  { text: "Porque la palabra de la cruz es locura a los que se pierden; pero a los que se salvan, es poder de Dios.", ref: "1 Corintios 1:18" },
  { text: "Antes bien, como está escrito: Cosas que ojo no vio, ni oído oyó.", ref: "1 Corintios 2:9" },
  { text: "¿No sabéis que sois templo de Dios, y que el Espíritu de Dios mora en vosotros?", ref: "1 Corintios 3:16" },
  { text: "Y ahora permanecen la fe, la esperanza y el amor, estos tres; pero el mayor de ellos es el amor.", ref: "1 Corintios 13:13" },
  { text: "Velad, estad firmes en la fe; portaos varonilmente, y esforzaos.", ref: "1 Corintios 16:13" },
  { text: "Bendito sea el Dios y Padre de nuestro Señor Jesucristo, Padre de misericordias.", ref: "2 Corintios 1:3" },
  { text: "Porque nuestra leve tribulación momentánea produce en nosotros un cada vez más excelente y eterno peso de gloria.", ref: "2 Corintios 4:17" },
  { text: "Porque por fe andamos, no por vista.", ref: "2 Corintios 5:7" },
  { text: "Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad.", ref: "2 Corintios 12:9" },
  
  // Más de Efesios
  { text: "Bendito sea el Dios y Padre de nuestro Señor Jesucristo, que nos bendijo con toda bendición espiritual.", ref: "Efesios 1:3" },
  { text: "Porque somos hechura suya, creados en Cristo Jesús para buenas obras.", ref: "Efesios 2:10" },
  { text: "Por esta causa doblo mis rodillas ante el Padre de nuestro Señor Jesucristo.", ref: "Efesios 3:14" },
  { text: "Un cuerpo, y un Espíritu, como fuisteis también llamados en una misma esperanza de vuestra vocación.", ref: "Efesios 4:4" },
  { text: "Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros.", ref: "Efesios 4:32" },
  { text: "Sed, pues, imitadores de Dios como hijos amados.", ref: "Efesios 5:1" },
  { text: "Andad como hijos de luz.", ref: "Efesios 5:8" },
  { text: "Orando en todo tiempo con toda oración y súplica en el Espíritu.", ref: "Efesios 6:18" },
  
  // Más de Filipenses
  { text: "Estando persuadido de esto, que el que comenzó en vosotros la buena obra, la perfeccionará.", ref: "Filipenses 1:6" },
  { text: "Porque para mí el vivir es Cristo, y el morir es ganancia.", ref: "Filipenses 1:21" },
  { text: "Ocupaos en vuestra salvación con temor y temblor.", ref: "Filipenses 2:12" },
  { text: "Prosigo a la meta, al premio del supremo llamamiento de Dios en Cristo Jesús.", ref: "Filipenses 3:14" },
  { text: "Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!", ref: "Filipenses 4:4" },
  
  // Más de Colosenses
  { text: "Él es la imagen del Dios invisible, el primogénito de toda creación.", ref: "Colosenses 1:15" },
  { text: "En quien están escondidos todos los tesoros de la sabiduría y del conocimiento.", ref: "Colosenses 2:3" },
  { text: "Poned la mira en las cosas de arriba, no en las de la tierra.", ref: "Colosenses 3:2" },
  { text: "La palabra de Cristo more en abundancia en vosotros.", ref: "Colosenses 3:16" },
  
  // Más de Hebreos
  { text: "Dios, habiendo hablado muchas veces y de muchas maneras en otro tiempo a los padres por los profetas.", ref: "Hebreos 1:1" },
  { text: "Pero sin fe es imposible agradar a Dios.", ref: "Hebreos 11:6" },
  { text: "Por tanto, nosotros también, teniendo en derredor nuestro tan grande nube de testigos.", ref: "Hebreos 12:1" },
  { text: "Puestos los ojos en Jesús, el autor y consumador de la fe.", ref: "Hebreos 12:2" },
  { text: "Permanezca el amor fraternal.", ref: "Hebreos 13:1" },
  { text: "No os olvidéis de la hospitalidad, porque por ella algunos, sin saberlo, hospedaron ángeles.", ref: "Hebreos 13:2" },
  
  // Más de Santiago
  { text: "Hermanos míos, tened por sumo gozo cuando os halléis en diversas pruebas.", ref: "Santiago 1:2" },
  { text: "Bienaventurado el varón que soporta la tentación; porque cuando haya resistido la prueba, recibirá la corona de vida.", ref: "Santiago 1:12" },
  { text: "Toda buena dádiva y todo don perfecto desciende de lo alto, del Padre de las luces.", ref: "Santiago 1:17" },
  { text: "Por esto, mis amados hermanos, todo hombre sea pronto para oír, tardo para hablar, tardo para airarse.", ref: "Santiago 1:19" },
  { text: "Pero sed hacedores de la palabra, y no tan solamente oidores.", ref: "Santiago 1:22" },
  { text: "Acercaos a Dios, y él se acercará a vosotros.", ref: "Santiago 4:8" },
  
  // Más de Pedro
  { text: "Bendito el Dios y Padre de nuestro Señor Jesucristo, que según su grande misericordia nos hizo renacer.", ref: "1 Pedro 1:3" },
  { text: "Siendo renacidos, no de simiente corruptible, sino de incorruptible, por la palabra de Dios.", ref: "1 Pedro 1:23" },
  { text: "Desead, como niños recién nacidos, la leche espiritual no adulterada.", ref: "1 Pedro 2:2" },
  { text: "Porque también Cristo padeció una sola vez por los pecados, el justo por los injustos.", ref: "1 Pedro 3:18" },
  { text: "Sed sobrios, y velad; porque vuestro adversario el diablo, como león rugiente, anda alrededor buscando a quien devorar.", ref: "1 Pedro 5:8" },
  { text: "El Señor no retarda su promesa, según algunos la tienen por tardanza.", ref: "2 Pedro 3:9" },
  
  // Más de 1 Juan
  { text: "Lo que era desde el principio, lo que hemos oído, lo que hemos visto con nuestros ojos.", ref: "1 Juan 1:1" },
  { text: "Si andamos en luz, como él está en luz, tenemos comunión unos con otros.", ref: "1 Juan 1:7" },
  { text: "Hijitos míos, estas cosas os escribo para que no pequéis.", ref: "1 Juan 2:1" },
  { text: "No améis al mundo, ni las cosas que están en el mundo.", ref: "1 Juan 2:15" },
  { text: "Mirad cuál amor nos ha dado el Padre, para que seamos llamados hijos de Dios.", ref: "1 Juan 3:1" },
  { text: "Amados, amémonos unos a otros; porque el amor es de Dios.", ref: "1 Juan 4:7" },
  { text: "En el amor no hay temor, sino que el perfecto amor echa fuera el temor.", ref: "1 Juan 4:18" },
  { text: "Y esta es la confianza que tenemos en él, que si pedimos alguna cosa conforme a su voluntad, él nos oye.", ref: "1 Juan 5:14" },
  
  // Más de Apocalipsis
  { text: "Yo soy el Alfa y la Omega, principio y fin, dice el Señor.", ref: "Apocalipsis 1:8" },
  { text: "No temas; yo soy el primero y el último.", ref: "Apocalipsis 1:17" },
  { text: "Sé fiel hasta la muerte, y yo te daré la corona de la vida.", ref: "Apocalipsis 2:10" },
  { text: "Al que venciere, le daré que se siente conmigo en mi trono.", ref: "Apocalipsis 3:21" },
  { text: "Vi un cielo nuevo y una tierra nueva; porque el primer cielo y la primera tierra pasaron.", ref: "Apocalipsis 21:1" },
  { text: "Y no habrá más maldición; y el trono de Dios y del Cordero estará en ella.", ref: "Apocalipsis 22:3" },
  
  // Más de Isaías
  { text: "Todos nosotros nos descarriamos como ovejas, cada cual se apartó por su camino.", ref: "Isaías 53:6" },
  { text: "Mas él herido fue por nuestras rebeliones, molido por nuestros pecados.", ref: "Isaías 53:5" },
  { text: "A todos los sedientos: Venid a las aguas; y los que no tienen dinero, venid, comprad y comed.", ref: "Isaías 55:1" },
  { text: "Buscad a Jehová mientras puede ser hallado, llamadle en tanto que está cercano.", ref: "Isaías 55:6" },
  { text: "Porque mis pensamientos no son vuestros pensamientos, ni vuestros caminos mis caminos.", ref: "Isaías 55:8" },
  { text: "Así será mi palabra que sale de mi boca; no volverá a mí vacía.", ref: "Isaías 55:11" },
  
  // Más de Génesis
  { text: "Y dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza.", ref: "Génesis 1:26" },
  { text: "Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera.", ref: "Génesis 1:31" },
  { text: "No es bueno que el hombre esté solo; le haré ayuda idónea para él.", ref: "Génesis 2:18" },
  { text: "Creyó Abraham a Dios, y le fue contado por justicia.", ref: "Génesis 15:6" },
  
  // Más libros diversos
  { text: "Amarás a Jehová tu Dios de todo tu corazón, y de toda tu alma, y con todas tus fuerzas.", ref: "Deuteronomio 6:5" },
  { text: "Escribe la visión, y declárala en tablas, para que corra el que leyere en ella.", ref: "Habacuc 2:2" },
  { text: "Porque tú formaste mis entrañas; tú me hiciste en el vientre de mi madre.", ref: "Salmos 139:13" },
  { text: "He aquí que satisfaré de grasa el alma del sacerdote, y mi pueblo será satisfecho de mi bien.", ref: "Jeremías 31:14" },
  { text: "Edificad casas, y habitad en ellas; y plantad huertos, y comed del fruto de ellos.", ref: "Jeremías 29:5" },
  { text: "Hasta que de lo alto sea derramado sobre nosotros el Espíritu.", ref: "Isaías 32:15" }
];

console.log('[BibliaQuiz] Definiciones cargadas correctamente - ' + window.DAILY_VERSES.length + ' versículos');

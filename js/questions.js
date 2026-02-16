// ============================================================



// BibliaQuiz - Base de Datos de Preguntas



// ============================================================



const QUESTIONS_DB = [



  // ===================== FACIL =====================



  // --- Personajes (50 preguntas) ---



  {



    id: 1, difficulty: "facil", category: "personajes",



    question: "?Quien construyo el arca?",



    options: ["Isaac", "Noe", "Moises", "Abraham"],



    correct: 1, reference: "Genesis 6-9",



    explanation: "Noe fue elegido por Dios para construir el arca y salvar a su familia y a los animales del diluvio, segun Genesis 6-9."



  },



  {



    id: 2, difficulty: "facil", category: "personajes",



    question: "?Quien fue el primer hombre?",



    options: ["Set", "Noe", "Adan", "Abel"],



    correct: 2, reference: "Genesis 2:7",



    explanation: "Adan fue el primer hombre creado por Dios, segun el relato de Genesis 2:7."



  },



  {



    id: 3, difficulty: "facil", category: "personajes",



    question: "?Quien fue la primera mujer?",



    options: ["Eva", "Sara", "Rebeca", "Lea"],



    correct: 0, reference: "Genesis 2:22",



    explanation: "Eva fue creada a partir de una costilla de Adan, siendo la primera mujer segun Genesis 2:22."



  },



  {



    id: 4, difficulty: "facil", category: "personajes",



    question: "?Quien vencio a Goliat?",



    options: ["Sanson", "Samuel", "Saul", "David"],



    correct: 3, reference: "1 Samuel 17:50",



    explanation: "David derroto al gigante Goliat con una honda y una piedra, demostrando su fe en Dios (1 Samuel 17:50)."



  },



  {



    id: 5, difficulty: "facil", category: "personajes",



    question: "?Quien libero a Israel de Egipto?",



    options: ["Moises", "Caleb", "Josue", "Aaron"],



    correct: 0, reference: "Exodo 3:10",



    explanation: "Moises fue llamado por Dios para liberar al pueblo de Israel de la esclavitud en Egipto (Exodo 3:10)."



  },



  {



    id: 450, difficulty: "facil", category: "personajes",



    question: "?Quien fue tragado por un gran pez?",



    options: ["Elias", "Jonas", "Pedro", "Pablo"],



    correct: 1, reference: "Jonas 1:17"



  },



  {



    id: 451, difficulty: "facil", category: "personajes",



    question: "?Quien fue el padre de Isaac?",



    options: ["Esau", "Abraham", "Lot", "Jacob"],



    correct: 1, reference: "Genesis 21:3"



  },



  {



    id: 452, difficulty: "facil", category: "personajes",



    question: "?Quien nego a Jesus tres veces?",



    options: ["Tomas", "Pedro", "Juan", "Mateo"],



    correct: 1, reference: "Lucas 22:54-62"



  },



  {



    id: 453, difficulty: "facil", category: "personajes",



    question: "?Quien fue el rey mas sabio?",



    options: ["Roboam", "Salomon", "David", "Saul"],



    correct: 1, reference: "1 Reyes 3:12"



  },



  {



    id: 454, difficulty: "facil", category: "personajes",



    question: "?Quien fue llevado al cielo sin morir?",



    options: ["Job", "Moises", "Noe", "Elias"],



    correct: 3, reference: "2 Reyes 2:11"



  },



  {



    id: 455, difficulty: "facil", category: "personajes",



    question: "?Quien fue la madre de Jesus?",



    options: ["Marta", "Maria", "Isabel", "Ana"],



    correct: 1, reference: "Lucas 1:30-31"



  },



  {



    id: 456, difficulty: "facil", category: "personajes",



    question: "?Quien bautizo a Jesus?",



    options: ["Juan el Bautista", "Pedro", "Andres", "Felipe"],



    correct: 0, reference: "Mateo 3:13-16"



  },



  {



    id: 457, difficulty: "facil", category: "personajes",



    question: "?Quien escribio muchos Salmos?",



    options: ["Salomon", "Isaias", "Jeremias", "David"],



    correct: 3, reference: "Salmos"



  },



  {



    id: 458, difficulty: "facil", category: "personajes",



    question: "?Quien fue el primer rey de Israel?",



    options: ["Samuel", "David", "Saul", "Salomon"],



    correct: 2, reference: "1 Samuel 10:1"



  },



  {



    id: 459, difficulty: "facil", category: "personajes",



    question: "?Quien traiciono a Jesus?",



    options: ["Judas", "Mateo", "Pedro", "Juan"],



    correct: 0, reference: "Mateo 26:14-16"



  },



  {



    id: 460, difficulty: "facil", category: "personajes",



    question: "?Quien fue hermano de Moises?",



    options: ["Aaron", "Eli", "Caleb", "Josue"],



    correct: 0, reference: "Exodo 4:14"



  },



  {



    id: 461, difficulty: "facil", category: "personajes",



    question: "?Quien interpreto suenos en Egipto?",



    options: ["Daniel", "Jacob", "Jose", "Ruben"],



    correct: 2, reference: "Genesis 41"



  },



  {



    id: 462, difficulty: "facil", category: "personajes",



    question: "?Quien lucho con un angel?",



    options: ["Abraham", "Isaac", "Jacob", "Moises"],



    correct: 2, reference: "Genesis 32:24-28"



  },



  {



    id: 463, difficulty: "facil", category: "personajes",



    question: "?Quien fue conocido por su fuerza?",



    options: ["Elias", "Sanson", "Gedeon", "David"],



    correct: 1, reference: "Jueces 14-16"



  },



  {



    id: 464, difficulty: "facil", category: "personajes",



    question: "?Quien fue el padre de Juan el Bautista?",



    options: ["Felipe", "Andres", "Zacarias", "Simeon"],



    correct: 2, reference: "Lucas 1:13"



  },



  {



    id: 465, difficulty: "facil", category: "personajes",



    question: "?Quien recibio los Diez Mandamientos?",



    options: ["Josue", "Caleb", "Moises", "Aaron"],



    correct: 2, reference: "Exodo 20"



  },



  {



    id: 466, difficulty: "facil", category: "personajes",



    question: "?Quien camino sobre el agua con Jesus?",



    options: ["Pedro", "Tomas", "Juan", "Andres"],



    correct: 0, reference: "Mateo 14:29"



  },



  {



    id: 467, difficulty: "facil", category: "personajes",



    question: "?Quien fue amigo de David?",



    options: ["Saul", "Jonatan", "Joab", "Abner"],



    correct: 1, reference: "1 Samuel 18:1"



  },



  {



    id: 468, difficulty: "facil", category: "personajes",



    question: "?Quien fue vendido por sus hermanos?",



    options: ["Ruben", "Juda", "Benjamin", "Jose"],



    correct: 3, reference: "Genesis 37:28"



  },



  {



    id: 469, difficulty: "facil", category: "personajes",



    question: "?Quien fue padre de Salomon?",



    options: ["David", "Natan", "Roboam", "Saul"],



    correct: 0, reference: "2 Samuel 12:24"



  },



  {



    id: 470, difficulty: "facil", category: "personajes",



    question: "?Quien construyo el templo?",



    options: ["Saul", "Josias", "David", "Salomon"],



    correct: 3, reference: "1 Reyes 6:1"



  },



  {



    id: 471, difficulty: "facil", category: "personajes",



    question: "?Quien fue el primer martir cristiano?",



    options: ["Pablo", "Pedro", "Esteban", "Juan"],



    correct: 2, reference: "Hechos 7:59-60"



  },



  {



    id: 472, difficulty: "facil", category: "personajes",



    question: "?Quien fue sanado de lepra por Eliseo?",



    options: ["Jehu", "Gedeon", "Naaman", "Uzias"],



    correct: 2, reference: "2 Reyes 5:14"



  },



  {



    id: 473, difficulty: "facil", category: "personajes",



    question: "?Quien fue esposa de Abraham?",



    options: ["Rebeca", "Raquel", "Lea", "Sara"],



    correct: 3, reference: "Genesis 17:15"



  },



  {



    id: 474, difficulty: "facil", category: "personajes",



    question: "?Quien nego conocer a Jesus?",



    options: ["Juan", "Pedro", "Judas", "Mateo"],



    correct: 1, reference: "Mateo 26:69-75"



  },



  {



    id: 475, difficulty: "facil", category: "personajes",



    question: "?Quien fue el primer discipulo llamado?",



    options: ["Felipe", "Tomas", "Pedro", "Juan"],



    correct: 2, reference: "Mateo 4:18-19"



  },



  {



    id: 476, difficulty: "facil", category: "personajes",



    question: "?Quien fue madre de Samuel?",



    options: ["Ester", "Ana", "Debora", "Rut"],



    correct: 1, reference: "1 Samuel 1:20"



  },



  {



    id: 477, difficulty: "facil", category: "personajes",



    question: "?Quien fue reina y salvo a su pueblo?",



    options: ["Maria", "Ester", "Marta", "Rut"],



    correct: 1, reference: "Ester 4:14"



  },



  {



    id: 478, difficulty: "facil", category: "personajes",



    question: "?Quien fue profeta llevado por un carro de fuego?",



    options: ["Isaias", "Eliseo", "Elias", "Jeremias"],



    correct: 2, reference: "2 Reyes 2:11"



  },



  {



    id: 479, difficulty: "facil", category: "personajes",



    question: "?Quien fue hermano de Esau?",



    options: ["Jose", "Jacob", "Isaac", "Juda"],



    correct: 1, reference: "Genesis 25:26"



  },



  {



    id: 480, difficulty: "facil", category: "personajes",



    question: "?Quien escribio Hechos?",



    options: ["Juan", "Lucas", "Marcos", "Pablo"],



    correct: 1, reference: "Hechos 1:1"



  },



  {



    id: 481, difficulty: "facil", category: "personajes",



    question: "?Quien fue el discipulo amado?",



    options: ["Juan", "Pedro", "Felipe", "Andres"],



    correct: 0, reference: "Juan 13:23"



  },



  {



    id: 482, difficulty: "facil", category: "personajes",



    question: "?Quien fue padre de Juan el Bautista?",



    options: ["Eli", "Zacarias", "Simeon", "Felipe"],



    correct: 1, reference: "Lucas 1:13"



  },



  {



    id: 483, difficulty: "facil", category: "personajes",



    question: "?Quien fue el primer asesinado en la Biblia?",



    options: ["Set", "Cain", "Noe", "Abel"],



    correct: 3, reference: "Genesis 4:8"



  },



  {



    id: 484, difficulty: "facil", category: "personajes",



    question: "?Quien fue padre de Jacob?",



    options: ["Lot", "Esau", "Isaac", "Abraham"],



    correct: 2, reference: "Genesis 25:26"



  },



  {



    id: 485, difficulty: "facil", category: "personajes",



    question: "?Quien fue madre de Jesus?",



    options: ["Rut", "Maria", "Ana", "Marta"],



    correct: 1, reference: "Lucas 1:30-31"



  },



  {



    id: 486, difficulty: "facil", category: "personajes",



    question: "?Quien escribio Apocalipsis?",



    options: ["Pedro", "Juan", "Lucas", "Pablo"],



    correct: 1, reference: "Apocalipsis 1:1"



  },



  {



    id: 487, difficulty: "facil", category: "personajes",



    question: "?Quien fue resucitado por Jesus?",



    options: ["Nicodemo", "Zaqueo", "Bartimeo", "Lazaro"],



    correct: 3, reference: "Juan 11:43-44"



  },



  {



    id: 488, difficulty: "facil", category: "personajes",



    question: "?Quien era recaudador de impuestos?",



    options: ["Felipe", "Mateo", "Pedro", "Juan"],



    correct: 1, reference: "Mateo 9:9"



  },



  {



    id: 489, difficulty: "facil", category: "personajes",



    question: "?Quien fue padre de Samuel?",



    options: ["Isai", "Natan", "Caleb", "Elcana"],



    correct: 3, reference: "1 Samuel 1:1"



  },



  {



    id: 490, difficulty: "facil", category: "personajes",



    question: "?Quien fue profeta en el vientre del pez?",



    options: ["Miqueas", "Amos", "Jonas", "Oseas"],



    correct: 2, reference: "Jonas 2:1"



  },



  {



    id: 491, difficulty: "facil", category: "personajes",



    question: "?Quien fue padre de Juan?",



    options: ["Andres", "Zacarias", "Felipe", "Simeon"],



    correct: 1, reference: "Lucas 1:13"



  },



  {



    id: 492, difficulty: "facil", category: "personajes",



    question: "?Quien fue esposa de Isaac?",



    options: ["Raquel", "Sara", "Lea", "Rebeca"],



    correct: 3, reference: "Genesis 24:67"



  },



  {



    id: 493, difficulty: "facil", category: "personajes",



    question: "?Quien fue padre de David?",



    options: ["Caleb", "Saul", "Isai", "Abner"],



    correct: 2, reference: "1 Samuel 16:11"



  },



  {



    id: 494, difficulty: "facil", category: "personajes",



    question: "?Quien fue hermano de Marta y Maria?",



    options: ["Nicodemo", "Lazaro", "Zaqueo", "Felipe"],



    correct: 1, reference: "Juan 11:1"



  },



  // --- Libros (50 preguntas) ---



  {



    id: 6, difficulty: "facil", category: "libros",



    question: "?Cual es el primer libro de la Biblia?",



    options: ["Genesis", "Salmos", "Exodo", "Levitico"],



    correct: 0, reference: "Genesis 1:1"



  },



  {



    id: 7, difficulty: "facil", category: "libros",



    question: "?Cual es el ultimo libro de la Biblia?",



    options: ["Romanos", "Apocalipsis", "Judas", "Hebreos"],



    correct: 1, reference: "Apocalipsis 22:21"



  },



  {



    id: 8, difficulty: "facil", category: "libros",



    question: "?En que libro se encuentra la creacion del mundo?",



    options: ["Exodo", "Salmos", "Genesis", "Job"],



    correct: 2, reference: "Genesis 1:1"



  },



  {



    id: 9, difficulty: "facil", category: "libros",



    question: "?En que libro aparecen los Diez Mandamientos?",



    options: ["Levitico", "Genesis", "Exodo", "Deuteronomio"],



    correct: 2, reference: "Exodo 20:1-17"



  },



  {



    id: 10, difficulty: "facil", category: "libros",



    question: "?Que libro contiene muchos salmos de alabanza?",



    options: ["Cantares", "Eclesiastes", "Salmos", "Proverbios"],



    correct: 2, reference: "Salmos"



  },



  {



    id: 101, difficulty: "facil", category: "libros",



    question: "?En que libro se habla del diluvio?",



    options: ["Genesis", "Jueces", "Josue", "Numeros"],



    correct: 0, reference: "Genesis 6-9"



  },



  {



    id: 102, difficulty: "facil", category: "libros",



    question: "?Cual libro sigue despues de Genesis?",



    options: ["Exodo", "Numeros", "Levitico", "Deuteronomio"],



    correct: 0, reference: "Exodo 1:1"



  },



  {



    id: 103, difficulty: "facil", category: "libros",



    question: "?En que libro esta la historia de Moises?",



    options: ["Exodo", "Rut", "Genesis", "Job"],



    correct: 0, reference: "Exodo 2-14"



  },



  {



    id: 104, difficulty: "facil", category: "libros",



    question: "?Que libro contiene proverbios de sabiduria?",



    options: ["Job", "Isaias", "Proverbios", "Salmos"],



    correct: 2, reference: "Proverbios 1:1"



  },



  {



    id: 105, difficulty: "facil", category: "libros",



    question: "?En que libro aparece la historia de Job?",



    options: ["Salmos", "Job", "Proverbios", "Eclesiastes"],



    correct: 1, reference: "Job 1:1"



  },



  {



    id: 106, difficulty: "facil", category: "libros",



    question: "?Cual es el primer libro del Nuevo Testamento?",



    options: ["Juan", "Marcos", "Mateo", "Lucas"],



    correct: 2, reference: "Mateo 1:1"



  },



  {



    id: 107, difficulty: "facil", category: "libros",



    question: "?Cual libro cuenta la vida de Jesus?",



    options: ["Hechos", "Judas", "Mateo", "Romanos"],



    correct: 2, reference: "Mateo (Evangelio)"



  },



  {



    id: 108, difficulty: "facil", category: "libros",



    question: "?Que libro escribio principalmente el apostol Pablo?",



    options: ["Romanos", "Hechos", "Juan", "Mateo"],



    correct: 0, reference: "Romanos 1:1"



  },



  {



    id: 109, difficulty: "facil", category: "libros",



    question: "?En que libro estan los Hechos de los Apostoles?",



    options: ["Lucas", "Romanos", "Juan", "Hechos"],



    correct: 3, reference: "Hechos 1:1"



  },



  {



    id: 110, difficulty: "facil", category: "libros",



    question: "?Cual libro contiene el Sermon del Monte?",



    options: ["Lucas", "Mateo", "Marcos", "Juan"],



    correct: 1, reference: "Mateo 5-7"



  },



  {



    id: 111, difficulty: "facil", category: "libros",



    question: "?En que libro esta el Salmo 23?",



    options: ["Proverbios", "Job", "Salmos", "Isaias"],



    correct: 2, reference: "Salmos 23"



  },



  {



    id: 112, difficulty: "facil", category: "libros",



    question: "?Cual libro habla del amor entre esposos?",



    options: ["Job", "Eclesiastes", "Cantares", "Proverbios"],



    correct: 2, reference: "Cantares 1:1"



  },



  {



    id: 113, difficulty: "facil", category: "libros",



    question: "?En que libro aparece Noe?",



    options: ["Rut", "Genesis", "Numeros", "Exodo"],



    correct: 1, reference: "Genesis 6:9"



  },



  {



    id: 114, difficulty: "facil", category: "libros",



    question: "?Cual libro fue escrito por Juan en Patmos?",



    options: ["Judas", "Apocalipsis", "Pedro", "Romanos"],



    correct: 1, reference: "Apocalipsis 1:9"



  },



  {



    id: 115, difficulty: "facil", category: "libros",



    question: "?Que libro contiene cartas a iglesias?",



    options: ["Hechos", "Salmos", "Apocalipsis", "Mateo"],



    correct: 2, reference: "Apocalipsis 2-3"



  },



  {



    id: 116, difficulty: "facil", category: "libros",



    question: "?En que libro aparece Abraham?",



    options: ["Josue", "Exodo", "Levitico", "Genesis"],



    correct: 3, reference: "Genesis 12:1"



  },



  {



    id: 117, difficulty: "facil", category: "libros",



    question: "?Cual libro habla del exodo de Israel?",



    options: ["Numeros", "Genesis", "Exodo", "Deuteronomio"],



    correct: 2, reference: "Exodo 12-14"



  },



  {



    id: 118, difficulty: "facil", category: "libros",



    question: "?En que libro esta la historia de Rut?",



    options: ["Jueces", "Reyes", "Samuel", "Rut"],



    correct: 3, reference: "Rut 1:1"



  },



  {



    id: 119, difficulty: "facil", category: "libros",



    question: "?Que libro contiene leyes para Israel?",



    options: ["Salmos", "Levitico", "Rut", "Ester"],



    correct: 1, reference: "Levitico 1:1"



  },



  {



    id: 120, difficulty: "facil", category: "libros",



    question: "?En que libro se narra la conquista de Canaan?",



    options: ["Josue", "Numeros", "Samuel", "Jueces"],



    correct: 0, reference: "Josue 1:1"



  },



  {



    id: 121, difficulty: "facil", category: "libros",



    question: "?Cual libro habla de los jueces de Israel?",



    options: ["Rut", "Cronicas", "Reyes", "Jueces"],



    correct: 3, reference: "Jueces 2:16"



  },



  {



    id: 122, difficulty: "facil", category: "libros",



    question: "?En que libro aparece el rey Saul?",



    options: ["Rut", "1 Samuel", "Reyes", "Cronicas"],



    correct: 1, reference: "1 Samuel 10:1"



  },



  {



    id: 123, difficulty: "facil", category: "libros",



    question: "?Que libro narra el reinado de David?",



    options: ["Rut", "1 Samuel", "Ester", "2 Reyes"],



    correct: 1, reference: "1 Samuel 16"



  },



  {



    id: 124, difficulty: "facil", category: "libros",



    question: "?En que libro se habla del rey Salomon?",



    options: ["Rut", "Jueces", "1 Reyes", "Job"],



    correct: 2, reference: "1 Reyes 3:1"



  },



  {



    id: 125, difficulty: "facil", category: "libros",



    question: "?Cual libro cuenta la historia de Ester?",



    options: ["Rut", "Nehemias", "Job", "Ester"],



    correct: 3, reference: "Ester 1:1"



  },



  {



    id: 126, difficulty: "facil", category: "libros",



    question: "?En que libro se reconstruyo Jerusalen?",



    options: ["Reyes", "Nehemias", "Job", "Ester"],



    correct: 1, reference: "Nehemias 2:17"



  },



  {



    id: 127, difficulty: "facil", category: "libros",



    question: "?Que libro habla del templo reconstruido?",



    options: ["Isaias", "Esdras", "Rut", "Jueces"],



    correct: 1, reference: "Esdras 3:10"



  },



  {



    id: 128, difficulty: "facil", category: "libros",



    question: "?En que libro esta el profeta Isaias?",



    options: ["Isaias", "Daniel", "Ezequiel", "Jeremias"],



    correct: 0, reference: "Isaias 1:1"



  },



  {



    id: 129, difficulty: "facil", category: "libros",



    question: "?Que libro habla del profeta Daniel?",



    options: ["Amos", "Daniel", "Jeremias", "Oseas"],



    correct: 1, reference: "Daniel 1:1"



  },



  {



    id: 130, difficulty: "facil", category: "libros",



    question: "?En que libro aparece Jonas?",



    options: ["Jonas", "Miqueas", "Nahum", "Joel"],



    correct: 0, reference: "Jonas 1:1"



  },



  {



    id: 131, difficulty: "facil", category: "libros",



    question: "?Cual es el primer evangelio?",



    options: ["Lucas", "Juan", "Marcos", "Mateo"],



    correct: 3, reference: "Mateo 1:1"



  },



  {



    id: 132, difficulty: "facil", category: "libros",



    question: "?Que libro escribio Lucas?",



    options: ["Juan", "Mateo", "Marcos", "Lucas"],



    correct: 3, reference: "Lucas 1:1-3"



  },



  {



    id: 133, difficulty: "facil", category: "libros",



    question: "?En que libro esta la conversion de Pablo?",



    options: ["Hechos", "Corintios", "Romanos", "Galatas"],



    correct: 0, reference: "Hechos 9:1-19"



  },



  {



    id: 134, difficulty: "facil", category: "libros",



    question: "?Que libro habla de la fe?",



    options: ["Santiago", "Judas", "Pedro", "Hebreos"],



    correct: 3, reference: "Hebreos 11"



  },



  {



    id: 135, difficulty: "facil", category: "libros",



    question: "?En que libro esta 'Todo lo puedo en Cristo'?",



    options: ["Colosenses", "Efesios", "Tito", "Filipenses"],



    correct: 3, reference: "Filipenses 4:13"



  },



  {



    id: 136, difficulty: "facil", category: "libros",



    question: "?Que libro escribio Pedro?",



    options: ["1 Pedro", "Romanos", "Judas", "Juan"],



    correct: 0, reference: "1 Pedro 1:1"



  },



  {



    id: 137, difficulty: "facil", category: "libros",



    question: "?En que libro esta el amor cristiano descrito extensamente?",



    options: ["1 Corintios", "Galatas", "Tito", "Romanos"],



    correct: 0, reference: "1 Corintios 13"



  },



  {



    id: 138, difficulty: "facil", category: "libros",



    question: "?Cual libro habla del fruto del Espiritu?",



    options: ["Efesios", "Hebreos", "Romanos", "Galatas"],



    correct: 3, reference: "Galatas 5:22-23"



  },



  {



    id: 139, difficulty: "facil", category: "libros",



    question: "?En que libro aparece la epistola de Judas?",



    options: ["Pedro", "Juan", "Santiago", "Judas"],



    correct: 3, reference: "Judas 1:1"



  },



  {



    id: 140, difficulty: "facil", category: "libros",



    question: "?Cual es el libro mas corto del Nuevo Testamento?",



    options: ["2 Pedro", "Filemon", "Judas", "Tito"],



    correct: 2, reference: "Judas"



  },



  {



    id: 141, difficulty: "facil", category: "libros",



    question: "?Que libro escribio Juan sobre el amor?",



    options: ["Tito", "Romanos", "Pedro", "1 Juan"],



    correct: 3, reference: "1 Juan 4:8"



  },



  {



    id: 142, difficulty: "facil", category: "libros",



    question: "?En que libro esta la armadura de Dios?",



    options: ["Galatas", "Efesios", "Filipenses", "Colosenses"],



    correct: 1, reference: "Efesios 6:10-18"



  },



  {



    id: 143, difficulty: "facil", category: "libros",



    question: "?Que libro escribio Santiago?",



    options: ["Pedro", "Santiago", "Juan", "Judas"],



    correct: 1, reference: "Santiago 1:1"



  },



  {



    id: 144, difficulty: "facil", category: "libros",



    question: "?En que libro esta el 'Padre Nuestro'?",



    options: ["Juan", "Mateo", "Marcos", "Lucas"],



    correct: 1, reference: "Mateo 6:9-13"



  },



  {



    id: 145, difficulty: "facil", category: "libros",



    question: "?Que libro cierra la Biblia?",



    options: ["Judas", "Romanos", "Hebreos", "Apocalipsis"],



    correct: 3, reference: "Apocalipsis 22:21"



  },



  // --- Historias Facil (50 preguntas) ---



  {



    id: 11, difficulty: "facil", category: "historias",



    question: "?Que construyo Noe por mandato de Dios?",



    options: ["Un palacio", "Una torre", "Un templo", "Un arca"],



    correct: 3, reference: "Genesis 6:14"



  },



  {



    id: 12, difficulty: "facil", category: "historias",



    question: "?Que evento cubrio toda la tierra con agua?",



    options: ["El diluvio", "El exodo", "La plaga", "La sequia"],



    correct: 0, reference: "Genesis 7:17-24"



  },



  {



    id: 13, difficulty: "facil", category: "historias",



    question: "?Donde vivian Adan y Eva?",



    options: ["Sinai", "Eden", "Egipto", "Canaan"],



    correct: 1, reference: "Genesis 2:8"



  },



  {



    id: 14, difficulty: "facil", category: "historias",



    question: "?Que pueblo cruzo el Mar Rojo?",



    options: ["Babilonia", "Grecia", "Roma", "Israel"],



    correct: 3, reference: "Exodo 14:21-22"



  },



  {



    id: 15, difficulty: "facil", category: "historias",



    question: "?Que cayo del cielo para alimentar a Israel?",



    options: ["Carne", "Agua", "Pan", "Mana"],



    correct: 3, reference: "Exodo 16:14-15"



  },



  {



    id: 800, difficulty: "facil", category: "historias",



    question: "?Que ciudad cayeron sus muros?",



    options: ["Samaria", "Jerusalen", "Hebron", "Jerico"],



    correct: 3, reference: "Josue 6:20"



  },



  {



    id: 801, difficulty: "facil", category: "historias",



    question: "?Que torre quisieron construir hasta el cielo?",



    options: ["Betel", "Sinai", "Babel", "Sion"],



    correct: 2, reference: "Genesis 11:4"



  },



  {



    id: 802, difficulty: "facil", category: "historias",



    question: "?Que plaga fue la ultima en Egipto?",



    options: ["Granizo", "Oscuridad", "Muerte de primogenitos", "Ranas"],



    correct: 2, reference: "Exodo 12:29"



  },



  {



    id: 803, difficulty: "facil", category: "historias",



    question: "?Donde recibio Moises los mandamientos?",



    options: ["Sinai", "Nebo", "Horeb", "Carmelo"],



    correct: 0, reference: "Exodo 19:20"



  },



  {



    id: 804, difficulty: "facil", category: "historias",



    question: "?Cuantos dias cayo mana doble antes del sabado?",



    options: ["3", "1", "7", "2"],



    correct: 3, reference: "Exodo 16:22-26"



  },



  {



    id: 805, difficulty: "facil", category: "historias",



    question: "?Que animal hablo con Balaam?",



    options: ["Burro", "Leon", "Caballo", "Oveja"],



    correct: 0, reference: "Numeros 22:28"



  },



  {



    id: 806, difficulty: "facil", category: "historias",



    question: "?Quien derribo a Goliat?",



    options: ["David", "Samuel", "Jonatan", "Saul"],



    correct: 0, reference: "1 Samuel 17:50"



  },



  {



    id: 807, difficulty: "facil", category: "historias",



    question: "?Que ciudad fue destruida con fuego?",



    options: ["Betel", "Ninive", "Jerico", "Sodoma"],



    correct: 3, reference: "Genesis 19:24"



  },



  {



    id: 808, difficulty: "facil", category: "historias",



    question: "?Que profeta enfrento a los profetas de Baal?",



    options: ["Elias", "Amos", "Eliseo", "Jonas"],



    correct: 0, reference: "1 Reyes 18:20-40"



  },



  {



    id: 809, difficulty: "facil", category: "historias",



    question: "?Donde nacio Jesus?",



    options: ["Jerusalen", "Belen", "Galilea", "Nazaret"],



    correct: 1, reference: "Mateo 2:1"



  },



  {



    id: 810, difficulty: "facil", category: "historias",



    question: "?Que senal guio a los sabios?",



    options: ["Un sueno", "Una estrella", "Un angel", "Una nube"],



    correct: 1, reference: "Mateo 2:2"



  },



  {



    id: 811, difficulty: "facil", category: "historias",



    question: "?Que multiplico Jesus?",



    options: ["Carne y vino", "Pan y vino", "Agua y pan", "Pan y peces"],



    correct: 3, reference: "Mateo 14:17-21"



  },



  {



    id: 812, difficulty: "facil", category: "historias",



    question: "?Que mar calmo Jesus?",



    options: ["Galilea", "Rojo", "Mediterraneo", "Muerto"],



    correct: 0, reference: "Marcos 4:39"



  },



  {



    id: 813, difficulty: "facil", category: "historias",



    question: "?Que instrumento derribo Jerico?",



    options: ["Trompetas", "Campanas", "Arpas", "Espadas"],



    correct: 0, reference: "Josue 6:20"



  },



  {



    id: 814, difficulty: "facil", category: "historias",



    question: "?Que arca contenia la Ley?",



    options: ["Del rey", "De David", "Del pacto", "De Noe"],



    correct: 2, reference: "Exodo 25:16"



  },



  {



    id: 815, difficulty: "facil", category: "historias",



    question: "?Que ciudad fue capital de David?",



    options: ["Betel", "Jerusalen", "Hebron", "Samaria"],



    correct: 1, reference: "2 Samuel 5:6-7"



  },



  {



    id: 816, difficulty: "facil", category: "historias",



    question: "?Cuantos dias estuvo Jonas en el pez?",



    options: ["7", "3", "1", "5"],



    correct: 1, reference: "Jonas 1:17"



  },



  {



    id: 817, difficulty: "facil", category: "historias",



    question: "?Que libro narra la creacion?",



    options: ["Exodo", "Levitico", "Numeros", "Genesis"],



    correct: 3, reference: "Genesis 1:1"



  },



  {



    id: 818, difficulty: "facil", category: "historias",



    question: "?Que plaga convirtio el agua en sangre?",



    options: ["5ta", "10ma", "2da", "1ra"],



    correct: 3, reference: "Exodo 7:20"



  },



  {



    id: 819, difficulty: "facil", category: "historias",



    question: "?Donde fue crucificado Jesus?",



    options: ["Horeb", "Golgota", "Sion", "Getsemani"],



    correct: 1, reference: "Mateo 27:33"



  },



  {



    id: 820, difficulty: "facil", category: "historias",



    question: "?Que pueblo cayo en idolatria con un becerro?",



    options: ["Persia", "Egipto", "Roma", "Israel"],



    correct: 3, reference: "Exodo 32:4"



  },



  {



    id: 821, difficulty: "facil", category: "historias",



    question: "?Que rey pidio sabiduria?",



    options: ["David", "Salomon", "Saul", "Asa"],



    correct: 1, reference: "1 Reyes 3:9"



  },



  {



    id: 822, difficulty: "facil", category: "historias",



    question: "?Que profeta fue llevado al cielo?",



    options: ["Daniel", "Samuel", "Jeremias", "Elias"],



    correct: 3, reference: "2 Reyes 2:11"



  },



  {



    id: 823, difficulty: "facil", category: "historias",



    question: "?Que mujer salvo a su pueblo?",



    options: ["Lea", "Ana", "Ester", "Rut"],



    correct: 2, reference: "Ester 4:14"



  },



  {



    id: 824, difficulty: "facil", category: "historias",



    question: "?Que apostol camino sobre el agua?",



    options: ["Pedro", "Felipe", "Juan", "Tomas"],



    correct: 0, reference: "Mateo 14:29"



  },



  {



    id: 825, difficulty: "facil", category: "historias",



    question: "?Donde oraba Jesus?",



    options: ["Sion", "Sinai", "Monte de los Olivos", "Palacio"],



    correct: 2, reference: "Lucas 22:39"



  },



  {



    id: 826, difficulty: "facil", category: "historias",



    question: "?Que ciudad fue reconstruida por Nehemias?",



    options: ["Hebron", "Jerico", "Samaria", "Jerusalen"],



    correct: 3, reference: "Nehemias 2:17"



  },



  {



    id: 827, difficulty: "facil", category: "historias",



    question: "?Que libro relata jueces de Israel?",



    options: ["Cronicas", "Reyes", "Jueces", "Rut"],



    correct: 2, reference: "Jueces 2:16"



  },



  {



    id: 828, difficulty: "facil", category: "historias",



    question: "?Que rey persiguio a David?",



    options: ["Roboam", "Asa", "Saul", "Acab"],



    correct: 2, reference: "1 Samuel 19"



  },



  {



    id: 829, difficulty: "facil", category: "historias",



    question: "?Que mar cruzo Moises?",



    options: ["Mediterraneo", "Galilea", "Muerto", "Rojo"],



    correct: 3, reference: "Exodo 14:21-22"



  },



  {



    id: 830, difficulty: "facil", category: "historias",



    question: "?Que plaga fueron langostas?",



    options: ["7ma", "5ta", "6ta", "8va"],



    correct: 3, reference: "Exodo 10:4-6"



  },



  {



    id: 831, difficulty: "facil", category: "historias",



    question: "?Que libro relata el exodo?",



    options: ["Exodo", "Levitico", "Deuteronomio", "Genesis"],



    correct: 0, reference: "Exodo 12-14"



  },



  {



    id: 832, difficulty: "facil", category: "historias",



    question: "?Que ciudad cayo por obediencia?",



    options: ["Dan", "Betel", "Hebron", "Jerico"],



    correct: 3, reference: "Josue 6:20"



  },



  {



    id: 833, difficulty: "facil", category: "historias",



    question: "?Que apostol escribio Apocalipsis?",



    options: ["Pablo", "Pedro", "Juan", "Lucas"],



    correct: 2, reference: "Apocalipsis 1:1"



  },



  {



    id: 834, difficulty: "facil", category: "historias",



    question: "?Que animal fue sacrificado en Pascua?",



    options: ["Buey", "Cabra", "Cordero", "Paloma"],



    correct: 2, reference: "Exodo 12:3-5"



  },



  {



    id: 835, difficulty: "facil", category: "historias",



    question: "?Que rey construyo el templo?",



    options: ["Saul", "Asa", "David", "Salomon"],



    correct: 3, reference: "1 Reyes 6:1"



  },



  {



    id: 836, difficulty: "facil", category: "historias",



    question: "?Que libro narra el nacimiento de Jesus?",



    options: ["Hechos", "Mateo", "Juan", "Marcos"],



    correct: 1, reference: "Mateo 1:18-25"



  },



  {



    id: 837, difficulty: "facil", category: "historias",



    question: "?Que rio cruzo Josue?",



    options: ["Tigris", "Eufrates", "Nilo", "Jordan"],



    correct: 3, reference: "Josue 3:17"



  },



  {



    id: 838, difficulty: "facil", category: "historias",



    question: "?Que libro cuenta la caida de Jerusalen?",



    options: ["Lamentaciones", "Ester", "Joel", "Rut"],



    correct: 0, reference: "Lamentaciones 1:1"



  },



  {



    id: 839, difficulty: "facil", category: "historias",



    question: "?Que discipulo dudo?",



    options: ["Pedro", "Juan", "Tomas", "Andres"],



    correct: 2, reference: "Juan 20:25"



  },



  {



    id: 840, difficulty: "facil", category: "historias",



    question: "?Que evento celebran en Pentecostes?",



    options: ["Navidad", "Ayuno", "Espiritu Santo", "Pascua"],



    correct: 2, reference: "Hechos 2:1-4"



  },



  {



    id: 841, difficulty: "facil", category: "historias",



    question: "?Que libro relata la iglesia primitiva?",



    options: ["Hechos", "Romanos", "Hebreos", "Galatas"],



    correct: 0, reference: "Hechos 1:1"



  },



  {



    id: 842, difficulty: "facil", category: "historias",



    question: "?Que profeta cerro el AT?",



    options: ["Malaquias", "Amos", "Joel", "Zacarias"],



    correct: 0, reference: "Malaquias 4:6"



  },



  {



    id: 843, difficulty: "facil", category: "historias",



    question: "?Que ciudad fue destruida junto a Sodoma?",



    options: ["Jerico", "Gomorra", "Samaria", "Ninive"],



    correct: 1, reference: "Genesis 19:24-25"



  },



  {



    id: 844, difficulty: "facil", category: "historias",



    question: "?Que evento marca la resurreccion?",



    options: ["Domingo", "Sabado", "Viernes", "Jueves"],



    correct: 0, reference: "Mateo 28:1-6"



  },



  // --- Vida de Jesus ---



  {



    id: 1400, difficulty: "facil", category: "vida_jesus",



    question: "?En que ciudad nacio Jesus?",



    options: ["Capernaum", "Belen", "Nazaret", "Jerusalen"],



    correct: 1, reference: "Mateo 2:1"



  },



  {



    id: 1401, difficulty: "facil", category: "vida_jesus",



    question: "?En que lugar fue acostado Jesus al nacer?",



    options: ["El suelo", "Una cama", "Una cuna", "Un pesebre"],



    correct: 3, reference: "Lucas 2:7"



  },



  {



    id: 1402, difficulty: "facil", category: "vida_jesus",



    question: "?Quienes visitaron al nino Jesus guiados por una estrella?",



    options: ["Los sacerdotes", "Los magos de oriente", "Los pastores", "Los angeles"],



    correct: 1, reference: "Mateo 2:1-2"



  },



  {



    id: 1403, difficulty: "facil", category: "vida_jesus",



    question: "?Quienes fueron los primeros en visitar a Jesus recien nacido?",



    options: ["Los magos", "Los sacerdotes", "Los pastores", "Los reyes"],



    correct: 2, reference: "Lucas 2:15-16"



  },



  {



    id: 1404, difficulty: "facil", category: "vida_jesus",



    question: "?Como se llamaba la madre de Jesus?",



    options: ["Ana", "Maria", "Elisabet", "Marta"],



    correct: 1, reference: "Mateo 1:18"



  },



  {



    id: 1405, difficulty: "facil", category: "vida_jesus",



    question: "?Como se llamaba el padre terrenal de Jesus?",



    options: ["Jose", "Zacarias", "David", "Jacob"],



    correct: 0, reference: "Mateo 1:18-20"



  },



  {



    id: 1406, difficulty: "facil", category: "vida_jesus",



    question: "?A que pais huyo la familia de Jesus para escapar de Herodes?",



    options: ["Babilonia", "Egipto", "Siria", "Grecia"],



    correct: 1, reference: "Mateo 2:13-14"



  },



  {



    id: 1407, difficulty: "facil", category: "vida_jesus",



    question: "?Que rey quiso matar al nino Jesus?",



    options: ["Cesar Augusto", "Herodes", "Pilato", "Faraon"],



    correct: 1, reference: "Mateo 2:13"



  },



  {



    id: 1408, difficulty: "facil", category: "vida_jesus",



    question: "?En que ciudad crecio Jesus?",



    options: ["Belen", "Jerusalen", "Nazaret", "Jerico"],



    correct: 2, reference: "Lucas 2:39-40"



  },



  {



    id: 1409, difficulty: "facil", category: "vida_jesus",



    question: "?En que rio fue bautizado Jesus?",



    options: ["Eufrates", "Jordan", "Nilo", "Tigris"],



    correct: 1, reference: "Mateo 3:13"



  },



  {



    id: 1410, difficulty: "facil", category: "vida_jesus",



    question: "?Quien bautizo a Jesus?",



    options: ["Pablo", "Juan el Bautista", "Santiago", "Pedro"],



    correct: 1, reference: "Mateo 3:13-14"



  },



  {



    id: 1411, difficulty: "facil", category: "vida_jesus",



    question: "?Que descendio sobre Jesus al ser bautizado?",



    options: ["Fuego", "Una nube", "Una paloma", "Un rayo de luz"],



    correct: 2, reference: "Mateo 3:16"



  },



  {



    id: 1412, difficulty: "facil", category: "vida_jesus",



    question: "?Cuantos dias ayuno Jesus en el desierto?",



    options: ["30", "21", "40", "7"],



    correct: 2, reference: "Mateo 4:2"



  },



  {



    id: 1413, difficulty: "facil", category: "vida_jesus",



    question: "?Quien tento a Jesus en el desierto?",



    options: ["Un fariseo", "El diablo", "Un demonio", "Un angel"],



    correct: 1, reference: "Mateo 4:1"



  },



  {



    id: 1414, difficulty: "facil", category: "vida_jesus",



    question: "?Cuantos apostoles eligio Jesus?",



    options: ["7", "14", "10", "12"],



    correct: 3, reference: "Mateo 10:1-4"



  },



  {



    id: 1415, difficulty: "facil", category: "vida_jesus",



    question: "?Cual fue la profesion de Jesus antes de predicar?",



    options: ["Pescador", "Carpintero", "Agricultor", "Pastor"],



    correct: 1, reference: "Marcos 6:3"



  },



  {



    id: 1416, difficulty: "facil", category: "vida_jesus",



    question: "?Cual de estos era uno de los 12 apostoles?",



    options: ["Lucas", "Pedro", "Marcos", "Pablo"],



    correct: 1, reference: "Mateo 10:2"



  },



  {



    id: 1417, difficulty: "facil", category: "vida_jesus",



    question: "?Que profesion tenian Pedro y Andres antes de seguir a Jesus?",



    options: ["Carpinteros", "Pescadores", "Agricultores", "Pastores"],



    correct: 1, reference: "Mateo 4:18"



  },



  {



    id: 1418, difficulty: "facil", category: "vida_jesus",



    question: "?Que famoso sermon predico Jesus en una montana?",



    options: ["Sermon del desierto", "Sermon del templo", "Sermon del lago", "Sermon del Monte"],



    correct: 3, reference: "Mateo 5:1-2"



  },



  {



    id: 1419, difficulty: "facil", category: "vida_jesus",



    question: "?Que oracion enseno Jesus a sus discipulos?",



    options: ["El Padrenuestro", "El Ave Maria", "El Credo", "El Salmo 23"],



    correct: 0, reference: "Mateo 6:9-13"



  },



  {



    id: 1420, difficulty: "facil", category: "vida_jesus",



    question: "?Como se llama la parabola del hijo que regresa a su padre?",



    options: ["El buen pastor", "El sembrador", "El hijo prodigo", "El buen samaritano"],



    correct: 2, reference: "Lucas 15:11-32"



  },



  {



    id: 1421, difficulty: "facil", category: "vida_jesus",



    question: "?Como se llama la parabola donde un hombre ayuda a un herido en el camino?",



    options: ["La oveja perdida", "El buen samaritano", "El sembrador", "El hijo prodigo"],



    correct: 1, reference: "Lucas 10:30-37"



  },



  {



    id: 1422, difficulty: "facil", category: "vida_jesus",



    question: "?Sobre que animal entro Jesus a Jerusalen el Domingo de Ramos?",



    options: ["A pie", "Un burro", "Un caballo", "Un camello"],



    correct: 1, reference: "Mateo 21:7"



  },



  {



    id: 1423, difficulty: "facil", category: "vida_jesus",



    question: "?Que ponian las personas en el camino cuando Jesus entro a Jerusalen?",



    options: ["Flores", "Ramas de palma y mantos", "Alfombras", "Piedras"],



    correct: 1, reference: "Mateo 21:8"



  },



  {



    id: 1424, difficulty: "facil", category: "vida_jesus",



    question: "?Como se llama la ultima cena que Jesus tuvo con sus discipulos?",



    options: ["La Pascua", "La fiesta", "El banquete", "La Santa Cena"],



    correct: 3, reference: "Mateo 26:26-28"



  },



  {



    id: 1425, difficulty: "facil", category: "vida_jesus",



    question: "?Que representaba el pan en la ultima Cena?",



    options: ["La vida eterna", "La bendicion", "El cuerpo de Cristo", "El mana del cielo"],



    correct: 2, reference: "Mateo 26:26"



  },



  {



    id: 1426, difficulty: "facil", category: "vida_jesus",



    question: "?Que representaba el vino en la ultima Cena?",



    options: ["La nueva vida", "El Espiritu Santo", "La sangre de Cristo", "La alegria"],



    correct: 2, reference: "Mateo 26:27-28"



  },



  {



    id: 1427, difficulty: "facil", category: "vida_jesus",



    question: "?Quien traiciono a Jesus?",



    options: ["Pedro", "Tomas", "Mateo", "Judas Iscariote"],



    correct: 3, reference: "Mateo 26:14-16"



  },



  {



    id: 1428, difficulty: "facil", category: "vida_jesus",



    question: "?Con que gesto traiciono Judas a Jesus?",



    options: ["Un abrazo", "Senalandolo", "Un beso", "Un saludo"],



    correct: 2, reference: "Mateo 26:49"



  },



  {



    id: 1429, difficulty: "facil", category: "vida_jesus",



    question: "?Cuantas monedas de plata recibio Judas por traicionar a Jesus?",



    options: ["50", "20", "30", "10"],



    correct: 2, reference: "Mateo 26:15"



  },



  {



    id: 1430, difficulty: "facil", category: "vida_jesus",



    question: "?Que discipulo nego conocer a Jesus tres veces?",



    options: ["Andres", "Pedro", "Santiago", "Juan"],



    correct: 1, reference: "Mateo 26:69-75"



  },



  {



    id: 1431, difficulty: "facil", category: "vida_jesus",



    question: "?Que gobernador romano juzgo a Jesus?",



    options: ["Poncio Pilato", "Cesar", "Herodes", "Felix"],



    correct: 0, reference: "Mateo 27:2"



  },



  {



    id: 1432, difficulty: "facil", category: "vida_jesus",



    question: "?En que lugar fue crucificado Jesus?",



    options: ["El Golgota (Calvario)", "El monte Sinai", "El monte de los Olivos", "El monte Carmelo"],



    correct: 0, reference: "Mateo 27:33"



  },



  {



    id: 1433, difficulty: "facil", category: "vida_jesus",



    question: "?Cuantos dias despues de morir resucito Jesus?",



    options: ["Una semana despues", "Al dia siguiente", "Al segundo dia", "Al tercer dia"],



    correct: 3, reference: "1 Corintios 15:4"



  },



  {



    id: 1434, difficulty: "facil", category: "vida_jesus",



    question: "?Quienes fueron las primeras en descubrir la tumba vacia de Jesus?",



    options: ["Los sacerdotes", "Los soldados", "Los apostoles", "Unas mujeres"],



    correct: 3, reference: "Mateo 28:1-6"



  },



  {



    id: 1435, difficulty: "facil", category: "vida_jesus",



    question: "?Que encontraron las mujeres al llegar a la tumba de Jesus?",



    options: ["La tumba cerrada", "A Jesus dormido", "La piedra removida y un angel", "A los soldados"],



    correct: 2, reference: "Mateo 28:2-5"



  },



  {



    id: 1436, difficulty: "facil", category: "vida_jesus",



    question: "?Que discipulo dudo de la resurreccion hasta ver a Jesus?",



    options: ["Tomas", "Pedro", "Felipe", "Juan"],



    correct: 0, reference: "Juan 20:24-25"



  },



  {



    id: 1437, difficulty: "facil", category: "vida_jesus",



    question: "?Que evento se celebra con la ascension de Jesus al cielo?",



    options: ["Pentecostes", "La Epifania", "La Transfiguracion", "La Ascension"],



    correct: 3, reference: "Hechos 1:9"



  },



  {



    id: 1438, difficulty: "facil", category: "vida_jesus",



    question: "¿Como subio Jesus al cielo el dia de la Ascension?",



    options: ["Desaparecio", "En un carro de fuego", "Fue elevado en una nube", "Caminando"],



    correct: 2, reference: "Hechos 1:9"



  },



  {



    id: 1439, difficulty: "facil", category: "vida_jesus",



    question: "?Que significa el nombre 'Emmanuel'?",



    options: ["Salvador del mundo", "Hijo de Dios", "Dios con nosotros", "Rey de reyes"],



    correct: 2, reference: "Mateo 1:23"



  },



  {



    id: 1440, difficulty: "facil", category: "vida_jesus",



    question: "?Que significa el nombre 'Jesus'?",



    options: ["Maestro", "Ungido", "Dios es grande", "Salvador"],



    correct: 3, reference: "Mateo 1:21"



  },



  {



    id: 1441, difficulty: "facil", category: "vida_jesus",



    question: "?Que titulo significa 'Ungido' y se aplica a Jesus?",



    options: ["Rabi", "Profeta", "Mesias (Cristo)", "Maestro"],



    correct: 2, reference: "Juan 1:41"



  },



  {



    id: 1442, difficulty: "facil", category: "vida_jesus",



    question: "?Donde oro Jesus la noche antes de ser arrestado?",



    options: ["En el desierto", "En el huerto de Getsemani", "En el templo", "En el monte Sinai"],



    correct: 1, reference: "Mateo 26:36"



  },



  {



    id: 1443, difficulty: "facil", category: "vida_jesus",



    question: "?Que dijo Jesus que era el mandamiento mas importante?",



    options: ["Honrar a los padres", "No mentir", "No robar", "Amar a Dios con todo el corazon"],



    correct: 3, reference: "Mateo 22:37-38"



  },



  {



    id: 1444, difficulty: "facil", category: "vida_jesus",



    question: "?Jesus dijo: 'Yo soy el camino, la verdad y la...'?",



    options: ["Puerta", "Luz", "Vida", "Esperanza"],



    correct: 2, reference: "Juan 14:6"



  },



  {



    id: 1445, difficulty: "facil", category: "vida_jesus",



    question: "?Cuantos regalos llevaron los magos al nino Jesus?",



    options: ["4", "5", "2", "3"],



    correct: 3, reference: "Mateo 2:11"



  },



  {



    id: 1446, difficulty: "facil", category: "vida_jesus",



    question: "?Que les guio a los magos hasta donde estaba Jesus?",



    options: ["Un angel", "Una estrella", "Un profeta", "Un sueno"],



    correct: 1, reference: "Mateo 2:9-10"



  },



  {



    id: 1447, difficulty: "facil", category: "vida_jesus",



    question: "?Que edad tenia Jesus cuando fue encontrado ensenando en el templo?",



    options: ["12 anos", "10 anos", "15 anos", "8 anos"],



    correct: 0, reference: "Lucas 2:42-46"



  },



  {



    id: 1448, difficulty: "facil", category: "vida_jesus",



    question: "?En que parabola Jesus habla de un pastor que busca una oveja perdida?",



    options: ["La oveja perdida", "El sembrador", "Los talentos", "El buen samaritano"],



    correct: 0, reference: "Lucas 15:3-7"



  },



  {



    id: 1449, difficulty: "facil", category: "vida_jesus",



    question: "?Que le pusieron a Jesus en la cabeza antes de crucificarlo?",



    options: ["Una venda", "Un velo", "Un casco", "Una corona de espinas"],



    correct: 3, reference: "Mateo 27:29"



  },



  // --- Milagros Facil (50 preguntas) ---



  {



    id: 1600, difficulty: "facil", category: "milagros",



    question: "?Cual fue el primer milagro de Jesus segun el Evangelio de Juan?",



    options: ["Convertir agua en vino", "Sanar a un leproso", "Multiplicar los panes", "Caminar sobre el agua"],



    correct: 0, reference: "Juan 2:1-11"



  },



  {



    id: 1601, difficulty: "facil", category: "milagros",



    question: "?A quien resucito Jesus despues de estar 4 dias muerto?",



    options: ["El hijo de la viuda", "Jairo", "Tabita", "Lazaro"],



    correct: 3, reference: "Juan 11:43-44"



  },



  {



    id: 1602, difficulty: "facil", category: "milagros",



    question: "?Que mar dividio Moises para que el pueblo de Israel cruzara?",



    options: ["Mar de Galilea", "Mar Muerto", "Mar Rojo", "Mar Mediterraneo"],



    correct: 2, reference: "Exodo 14:21"



  },



  {



    id: 1603, difficulty: "facil", category: "milagros",



    question: "?Con cuantos panes y peces alimento Jesus a 5,000 personas?",



    options: ["5 panes y 2 peces", "3 panes y 3 peces", "7 panes y 5 peces", "2 panes y 5 peces"],



    correct: 0, reference: "Mateo 14:17-21"



  },



  {



    id: 1604, difficulty: "facil", category: "milagros",



    question: "?Quien camino sobre el agua junto a Jesus?",



    options: ["Pedro", "Juan", "Andres", "Santiago"],



    correct: 0, reference: "Mateo 14:29"



  },



  {



    id: 1605, difficulty: "facil", category: "milagros",



    question: "?Que hizo Jesus para calmar la tempestad en el mar?",



    options: ["Reprendio al viento y al mar", "Lanzo aceite al agua", "Oro toda la noche", "Pidio ayuda a los discipulos"],



    correct: 0, reference: "Marcos 4:39"



  },



  {



    id: 1606, difficulty: "facil", category: "milagros",



    question: "?A quien sano Jesus de ceguera en Jerico?",



    options: ["Nicodemo", "Bartimeo", "Zaqueo", "Lazaro"],



    correct: 1, reference: "Marcos 10:46-52"



  },



  {



    id: 1607, difficulty: "facil", category: "milagros",



    question: "?Que aparicion milagrosa vio Moises en el monte Horeb?",



    options: ["Un angel con espada", "Una columna de fuego", "Una zarza que ardia sin consumirse", "Un arcoiris"],



    correct: 2, reference: "Exodo 3:2"



  },



  {



    id: 1608, difficulty: "facil", category: "milagros",



    question: "?Que alimento envio Dios del cielo al pueblo de Israel en el desierto?",



    options: ["Pan y leche", "Trigo", "Mana", "Frutas"],



    correct: 2, reference: "Exodo 16:14-15"



  },



  {



    id: 1609, difficulty: "facil", category: "milagros",



    question: "?Que animal se trago a Jonas?",



    options: ["Una ballena", "Un gran pez", "Un tiburon", "Un cocodrilo"],



    correct: 1, reference: "Jonas 1:17"



  },



  {



    id: 1610, difficulty: "facil", category: "milagros",



    question: "?Cuantos dias estuvo Jonas dentro del gran pez?",



    options: ["3 dias y 3 noches", "2 dias", "7 dias", "1 dia"],



    correct: 0, reference: "Jonas 1:17"



  },



  {



    id: 1611, difficulty: "facil", category: "milagros",



    question: "?Que murallas cayeron milagrosamente al marchar el pueblo de Israel alrededor?",



    options: ["Las de Jerusalen", "Las de Egipto", "Las de Babilonia", "Las de Jerico"],



    correct: 3, reference: "Josue 6:20"



  },



  {



    id: 1612, difficulty: "facil", category: "milagros",



    question: "?De que fue protegido Daniel milagrosamente?",



    options: ["De los leones", "Del fuego", "De serpientes", "De una inundacion"],



    correct: 0, reference: "Daniel 6:22"



  },



  {



    id: 1613, difficulty: "facil", category: "milagros",



    question: "?Quienes fueron arrojados al horno de fuego ardiente y no se quemaron?",



    options: ["Moises y Aaron", "Daniel y sus amigos", "Elias y Eliseo", "Sadrac, Mesac y Abed-nego"],



    correct: 3, reference: "Daniel 3:26-27"



  },



  {



    id: 1614, difficulty: "facil", category: "milagros",



    question: "?Que profeta hizo descender fuego del cielo en el monte Carmelo?",



    options: ["Eliseo", "Jeremias", "Elias", "Isaias"],



    correct: 2, reference: "1 Reyes 18:38"



  },



  {



    id: 1615, difficulty: "facil", category: "milagros",



    question: "?Como fue llevado Elias al cielo?",



    options: ["Un carro de fuego con caballos de fuego", "Un angel lo llevo", "Subio caminando", "Desaparecio"],



    correct: 0, reference: "2 Reyes 2:11"



  },



  {



    id: 1616, difficulty: "facil", category: "milagros",



    question: "?Que rio dividio Eliseo golpeandolo con el manto de Elias?",



    options: ["El Tigris", "El Jordan", "El Eufrates", "El Nilo"],



    correct: 1, reference: "2 Reyes 2:14"



  },



  {



    id: 1617, difficulty: "facil", category: "milagros",



    question: "?A quien resucito Jesus, la hija de un principal de la sinagoga?",



    options: ["La hija de Nicodemo", "La hija de Pedro", "La hija de Herodes", "La hija de Jairo"],



    correct: 3, reference: "Marcos 5:41-42"



  },



  {



    id: 1618, difficulty: "facil", category: "milagros",



    question: "?Que enfermedad sano Jesus tocando al enfermo, aunque era considerado impuro?",



    options: ["Sordera", "Lepra", "Paralisis", "Ceguera"],



    correct: 1, reference: "Mateo 8:3"



  },



  {



    id: 1619, difficulty: "facil", category: "milagros",



    question: "?Cuantos leprosos sano Jesus de los cuales solo uno volvio a dar gracias?",



    options: ["10", "7", "12", "5"],



    correct: 0, reference: "Lucas 17:12-17"



  },



  {



    id: 1620, difficulty: "facil", category: "milagros",



    question: "?Que hizo Jesus en la boda de Cana?",



    options: ["Resucito a un muerto", "Multiplico panes", "Convirtio agua en vino", "Sano a un enfermo"],



    correct: 2, reference: "Juan 2:1-11"



  },



  {



    id: 1621, difficulty: "facil", category: "milagros",



    question: "?A quien le dijo Jesus 'Toma tu lecho y anda' en el estanque de Betesda?",



    options: ["A un paralitico", "A un ciego", "A un leproso", "A un sordomudo"],



    correct: 0, reference: "Juan 5:8-9"



  },



  {



    id: 1622, difficulty: "facil", category: "milagros",



    question: "?Que milagro hizo Jesus con el hombre de la mano seca?",



    options: ["Le dio una mano nueva", "Le puso una venda", "Le restauro la mano", "Le corto la mano"],



    correct: 2, reference: "Marcos 3:5"



  },



  {



    id: 1623, difficulty: "facil", category: "milagros",



    question: "?Que plaga envio Dios como la ultima sobre Egipto?",



    options: ["Oscuridad", "Langostas", "La muerte de los primogenitos", "Granizo"],



    correct: 2, reference: "Exodo 12:29"



  },



  {



    id: 1624, difficulty: "facil", category: "milagros",



    question: "?De donde saco Moises agua golpeando con su vara?",



    options: ["De un pozo", "De un arbol", "De una roca", "Del rio Nilo"],



    correct: 2, reference: "Exodo 17:6"



  },



  {



    id: 1625, difficulty: "facil", category: "milagros",



    question: "?Que convirtio Moises en serpiente delante de Faraon?",



    options: ["Su mano", "Una piedra", "Una cuerda", "Su vara"],



    correct: 3, reference: "Exodo 7:10"



  },



  {



    id: 1626, difficulty: "facil", category: "milagros",



    question: "?Quien fue sanada al tocar el borde del manto de Jesus?",



    options: ["La suegra de Pedro", "Una mujer con flujo de sangre", "Maria Magdalena", "Marta"],



    correct: 1, reference: "Marcos 5:25-29"



  },



  {



    id: 1627, difficulty: "facil", category: "milagros",



    question: "?A quien sano Jesus de fiebre en la casa de Pedro?",



    options: ["La hija de Pedro", "La suegra de Pedro", "La esposa de Pedro", "La madre de Pedro"],



    correct: 1, reference: "Mateo 8:14-15"



  },



  {



    id: 1628, difficulty: "facil", category: "milagros",



    question: "?Que milagro ocurrio cuando Jesus murio en la cruz?",



    options: ["El mar se seco", "El velo del templo se rasgo en dos", "Llovio fuego", "El templo se derrumbo"],



    correct: 1, reference: "Mateo 27:51"



  },



  {



    id: 1629, difficulty: "facil", category: "milagros",



    question: "?Cual es el mayor milagro de Jesus segun el cristianismo?",



    options: ["Multiplicar los panes", "Caminar sobre el agua", "Su resurreccion", "Convertir agua en vino"],



    correct: 2, reference: "Mateo 28:5-6"



  },



  {



    id: 1630, difficulty: "facil", category: "milagros",



    question: "?Que le sucedio a la vara de Aaron que confirmo su sacerdocio?",



    options: ["Se volvio serpiente", "Brillo con luz", "Se convirtio en oro", "Florecio y dio almendras"],



    correct: 3, reference: "Numeros 17:8"



  },



  {



    id: 1631, difficulty: "facil", category: "milagros",



    question: "?Que animal hablo milagrosamente en el Antiguo Testamento?",



    options: ["Una burra", "Un leon", "Un perro", "Una serpiente"],



    correct: 0, reference: "Numeros 22:28"



  },



  {



    id: 1632, difficulty: "facil", category: "milagros",



    question: "?Que hizo Jesus antes de alimentar a los 5,000?",



    options: ["Ayuno", "Dio gracias y bendijo los panes", "Envio a comprar pan", "Pidio mas comida"],



    correct: 1, reference: "Mateo 14:19"



  },



  {



    id: 1633, difficulty: "facil", category: "milagros",



    question: "?Cuantas canastas sobraron despues de alimentar a los 5,000?",



    options: ["3", "7", "5", "12"],



    correct: 3, reference: "Mateo 14:20"



  },



  {



    id: 1634, difficulty: "facil", category: "milagros",



    question: "?Que le dijo Jesus al paralitico que bajaron por el techo?",



    options: ["Cree en mi", "Tus pecados te son perdonados", "Vete a tu casa", "Levantate y salta"],



    correct: 1, reference: "Marcos 2:5"



  },



  {



    id: 1635, difficulty: "facil", category: "milagros",



    question: "?Que sucedio en Pentecostes segun el libro de Hechos?",



    options: ["Se abrio el mar", "El Espiritu Santo descendio con lenguas de fuego", "Llovio mana", "Un terremoto"],



    correct: 1, reference: "Hechos 2:3-4"



  },



  {



    id: 1636, difficulty: "facil", category: "milagros",



    question: "?Que hicieron Pedro y Juan con el cojo de la puerta del templo llamada la Hermosa?",



    options: ["Le dieron dinero", "Le dieron comida", "Lo sanaron en el nombre de Jesus", "Lo llevaron al medico"],



    correct: 2, reference: "Hechos 3:6-8"



  },



  {



    id: 1637, difficulty: "facil", category: "milagros",



    question: "?Como fue liberado Pedro de la carcel segun Hechos?",



    options: ["Soborno al guardia", "Cavo un tunel", "Los discipulos lo rescataron", "Un angel abrio las puertas"],



    correct: 3, reference: "Hechos 12:7-10"



  },



  {



    id: 1638, difficulty: "facil", category: "milagros",



    question: "?A quien resucito Pedro en Jope?",



    options: ["Maria", "Tabita (Dorcas)", "Lidia", "Priscila"],



    correct: 1, reference: "Hechos 9:40-41"



  },



  {



    id: 1639, difficulty: "facil", category: "milagros",



    question: "?Que le paso a Pablo cuando fue mordido por una vibora en Malta?",



    options: ["Perdio la mano", "Se enfermo", "Murio", "No le paso nada"],



    correct: 3, reference: "Hechos 28:3-5"



  },



  {



    id: 1640, difficulty: "facil", category: "milagros",



    question: "?Que milagro hizo Eliseo con el aceite de una viuda?",



    options: ["Lo convirtio en agua", "Lo convirtio en oro", "Lo hizo arder sin consumirse", "Multiplico el aceite en muchas vasijas"],



    correct: 3, reference: "2 Reyes 4:1-7"



  },



  {



    id: 1641, difficulty: "facil", category: "milagros",



    question: "?A quien resucito Eliseo, el hijo de una mujer sunamita?",



    options: ["Al hijo de una viuda", "A un soldado", "Al siervo de Naaman", "Al hijo de la sunamita"],



    correct: 3, reference: "2 Reyes 4:32-35"



  },



  {



    id: 1642, difficulty: "facil", category: "milagros",



    question: "?Que enfermedad fue sanada en Naaman al sumergirse en el rio Jordan?",



    options: ["Ceguera", "Paralisis", "Sordera", "Lepra"],



    correct: 3, reference: "2 Reyes 5:14"



  },



  {



    id: 1643, difficulty: "facil", category: "milagros",



    question: "?Como alimentaron los cuervos a Elias junto al arroyo de Querit?",



    options: ["Le traian pan y carne", "Le traian peces", "Le traian agua", "Le traian frutas"],



    correct: 0, reference: "1 Reyes 17:6"



  },



  {



    id: 1644, difficulty: "facil", category: "milagros",



    question: "?Que milagro hizo Jesus con el ciego de nacimiento usando lodo?",



    options: ["Le dio una medicina", "Le toco con su manto", "Le puso lodo en los ojos y lo envio a lavarse", "Le soplo en los ojos"],



    correct: 2, reference: "Juan 9:6-7"



  },



  {



    id: 1645, difficulty: "facil", category: "milagros",



    question: "?Que hizo Josue pidiendo a Dios que detuviera en Gabaon?",



    options: ["El sol y la luna", "El viento", "La lluvia", "Un terremoto"],



    correct: 0, reference: "Josue 10:12-13"



  },



  {



    id: 1646, difficulty: "facil", category: "milagros",



    question: "?Con que se alimento Elias durante 40 dias gracias a un angel?",



    options: ["Pan y vino", "Una torta cocida y agua", "Frutas del desierto", "Mana"],



    correct: 1, reference: "1 Reyes 19:5-8"



  },



  {



    id: 1647, difficulty: "facil", category: "milagros",



    question: "?Que milagro ocurrio cuando Jesus toco la oreja del siervo del sumo sacerdote?",



    options: ["El siervo quedo sordo", "La oreja fue sanada", "La oreja se volvio de oro", "El siervo cayo muerto"],



    correct: 1, reference: "Lucas 22:51"



  },



  {



    id: 1648, difficulty: "facil", category: "milagros",



    question: "?Que encontro Pedro en la boca de un pez por instruccion de Jesus?",



    options: ["Una llave", "Una moneda", "Un anillo", "Una perla"],



    correct: 1, reference: "Mateo 17:27"



  },



  {



    id: 1649, difficulty: "facil", category: "milagros",



    question: "?Que milagro realizo Jesus al liberar al endemoniado gadareno?",



    options: ["Lo resucito", "Expulso los demonios a una piara de cerdos", "Lo sano de lepra", "Le devolvio la vista"],



    correct: 1, reference: "Marcos 5:1-13"



  },



  // --- Reyes Facil (50 preguntas) ---



  {



    id: 1000, difficulty: "facil", category: "reyes",



    question: "?Quien fue el primer rey de Israel?",



    options: ["Saul", "David", "Samuel", "Salomon"],



    correct: 0, reference: "1 Samuel 10:1"



  },



  {



    id: 1001, difficulty: "facil", category: "reyes",



    question: "?Que rey de Israel vencio al gigante Goliat?",



    options: ["Salomon", "Jonatan", "Saul", "David"],



    correct: 3, reference: "1 Samuel 17:50"



  },



  {



    id: 1002, difficulty: "facil", category: "reyes",



    question: "?Que rey construyo el primer templo de Jerusalen?",



    options: ["Josias", "Ezequias", "David", "Salomon"],



    correct: 3, reference: "1 Reyes 6:1"



  },



  {



    id: 1003, difficulty: "facil", category: "reyes",



    question: "?Que le pidio Salomon a Dios cuando comenzo a reinar?",



    options: ["Victoria sobre sus enemigos", "Sabiduria", "Larga vida", "Riquezas"],



    correct: 1, reference: "1 Reyes 3:9"



  },



  {



    id: 1004, difficulty: "facil", category: "reyes",



    question: "?Que instrumento musical tocaba el rey David?",



    options: ["Trompeta", "Flauta", "Arpa", "Tambor"],



    correct: 2, reference: "1 Samuel 16:23"



  },



  {



    id: 1005, difficulty: "facil", category: "reyes",



    question: "?Cual era la ocupacion de David antes de ser rey?",



    options: ["Pescador", "Carpintero", "Agricultor", "Pastor"],



    correct: 3, reference: "1 Samuel 16:11"



  },



  {



    id: 1006, difficulty: "facil", category: "reyes",



    question: "?Que profeta ungio a Saul como primer rey de Israel?",



    options: ["Samuel", "Natan", "Elias", "Isaias"],



    correct: 0, reference: "1 Samuel 10:1"



  },



  {



    id: 1007, difficulty: "facil", category: "reyes",



    question: "?Que rey fue conocido como el mas sabio de todos?",



    options: ["Josafat", "Ezequias", "Salomon", "David"],



    correct: 2, reference: "1 Reyes 4:30-31"



  },



  {



    id: 1008, difficulty: "facil", category: "reyes",



    question: "?De que tribu era el rey Saul?",



    options: ["Levi", "Juda", "Benjamin", "Efrain"],



    correct: 2, reference: "1 Samuel 9:1-2"



  },



  {



    id: 1009, difficulty: "facil", category: "reyes",



    question: "?Quien fue el hijo de David que reino despues de el?",



    options: ["Amnon", "Adonias", "Salomon", "Absalon"],



    correct: 2, reference: "1 Reyes 1:39"



  },



  {



    id: 1010, difficulty: "facil", category: "reyes",



    question: "?Que ciudad conquisto David para hacerla su capital?",



    options: ["Samaria", "Hebron", "Jerusalen", "Belen"],



    correct: 2, reference: "2 Samuel 5:6-7"



  },



  {



    id: 1011, difficulty: "facil", category: "reyes",



    question: "?Con que arma vencio David a Goliat?",



    options: ["Lanza", "Honda y una piedra", "Espada", "Arco y flecha"],



    correct: 1, reference: "1 Samuel 17:49"



  },



  {



    id: 1012, difficulty: "facil", category: "reyes",



    question: "?Que rey dividio el reino de Israel en dos?",



    options: ["Salomon", "Jeroboam", "Roboam", "David"],



    correct: 2, reference: "1 Reyes 12:16-17"



  },



  {



    id: 1013, difficulty: "facil", category: "reyes",



    question: "?Quien fue la esposa malvada del rey Acab?",



    options: ["Atalia", "Ester", "Jezabel", "Betsabe"],



    correct: 2, reference: "1 Reyes 16:31"



  },



  {



    id: 1014, difficulty: "facil", category: "reyes",



    question: "?Que libro de la Biblia contiene muchos salmos escritos por el rey David?",



    options: ["Proverbios", "Cantares", "Eclesiastes", "Salmos"],



    correct: 3, reference: "Salmos 72:20"



  },



  {



    id: 1015, difficulty: "facil", category: "reyes",



    question: "?Que rey de Juda hizo una gran reforma religiosa y encontro el libro de la Ley?",



    options: ["Ezequias", "Asa", "Josias", "Josafat"],



    correct: 2, reference: "2 Reyes 22:8-11"



  },



  {



    id: 1016, difficulty: "facil", category: "reyes",



    question: "?Cuantas tribus se separaron para formar el reino del norte (Israel)?",



    options: ["Doce", "Diez", "Dos", "Cinco"],



    correct: 1, reference: "1 Reyes 11:31"



  },



  {



    id: 1017, difficulty: "facil", category: "reyes",



    question: "?Que pecado cometio David con Betsabe?",



    options: ["Robo", "Adulterio", "Idolatria", "Blasfemia"],



    correct: 1, reference: "2 Samuel 11:4"



  },



  {



    id: 1018, difficulty: "facil", category: "reyes",



    question: "?Que profeta confronto a David por su pecado con Betsabe?",



    options: ["Samuel", "Isaias", "Elias", "Natan"],



    correct: 3, reference: "2 Samuel 12:1-7"



  },



  {



    id: 1019, difficulty: "facil", category: "reyes",



    question: "?Que rey de Israel adoro a Baal por influencia de su esposa?",



    options: ["Omri", "Acab", "Jehu", "Jeroboam"],



    correct: 1, reference: "1 Reyes 16:31-33"



  },



  {



    id: 1020, difficulty: "facil", category: "reyes",



    question: "?Que hijo de David se rebelo contra el para quitarle el trono?",



    options: ["Adonias", "Amnon", "Salomon", "Absalon"],



    correct: 3, reference: "2 Samuel 15:10"



  },



  {



    id: 1021, difficulty: "facil", category: "reyes",



    question: "?Cual fue el primer rey del reino del norte (Israel) tras la division?",



    options: ["Jeroboam", "Roboam", "Baasa", "Omri"],



    correct: 0, reference: "1 Reyes 12:20"



  },



  {



    id: 1022, difficulty: "facil", category: "reyes",



    question: "?Que rey de Juda enfermo y Dios le anadio 15 anos de vida?",



    options: ["Asa", "Josias", "Manases", "Ezequias"],



    correct: 3, reference: "2 Reyes 20:5-6"



  },



  {



    id: 1023, difficulty: "facil", category: "reyes",



    question: "?Que reina visito a Salomon para comprobar su sabiduria?",



    options: ["Atalia", "La reina de Saba", "Ester", "Jezabel"],



    correct: 1, reference: "1 Reyes 10:1"



  },



  {



    id: 1024, difficulty: "facil", category: "reyes",



    question: "?Cuantos proverbios se le atribuyen al rey Salomon?",



    options: ["Quinientos", "Cinco mil", "Tres mil", "Mil"],



    correct: 2, reference: "1 Reyes 4:32"



  },



  {



    id: 1025, difficulty: "facil", category: "reyes",



    question: "?Quien ungio a David como rey?",



    options: ["Natan", "Elias", "Moises", "Samuel"],



    correct: 3, reference: "1 Samuel 16:13"



  },



  {



    id: 1026, difficulty: "facil", category: "reyes",



    question: "?En que ciudad nacio el rey David?",



    options: ["Nazaret", "Jerusalen", "Hebron", "Belen"],



    correct: 3, reference: "1 Samuel 17:12"



  },



  {



    id: 1027, difficulty: "facil", category: "reyes",



    question: "?Como murio el rey Saul?",



    options: ["En batalla, cayendo sobre su propia espada", "Fue ejecutado por los filisteos", "Fue asesinado por David", "Murio de enfermedad"],



    correct: 0, reference: "1 Samuel 31:4"



  },



  {



    id: 1028, difficulty: "facil", category: "reyes",



    question: "?Que pidio Dios a Abraham que sacrificara, prefigurando la obediencia de los reyes?",



    options: ["Una paloma", "A su hijo Isaac", "Un cordero", "Un buey"],



    correct: 1, reference: "Genesis 22:2"



  },



  {



    id: 1029, difficulty: "facil", category: "reyes",



    question: "?Que rey mando construir becerros de oro para que el pueblo no fuera a Jerusalen?",



    options: ["Baasa", "Acab", "Jeroboam", "Roboam"],



    correct: 2, reference: "1 Reyes 12:28-29"



  },



  {



    id: 1030, difficulty: "facil", category: "reyes",



    question: "?Quien era el mejor amigo de David, hijo del rey Saul?",



    options: ["Jonatan", "Abner", "Abiatar", "Joab"],



    correct: 0, reference: "1 Samuel 18:1"



  },



  {



    id: 1031, difficulty: "facil", category: "reyes",



    question: "?Que objeto sagrado llevo David a Jerusalen con gran celebracion?",



    options: ["Las tablas de la Ley", "El Arca del Pacto", "El altar de incienso", "El candelabro de oro"],



    correct: 1, reference: "2 Samuel 6:14-15"



  },



  {



    id: 1032, difficulty: "facil", category: "reyes",



    question: "?Que rey fue el padre de Salomon?",



    options: ["David", "Samuel", "Roboam", "Saul"],



    correct: 0, reference: "2 Samuel 12:24"



  },



  {



    id: 1033, difficulty: "facil", category: "reyes",



    question: "?Cuantos anos reino Salomon sobre Israel?",



    options: ["20 anos", "50 anos", "40 anos", "30 anos"],



    correct: 2, reference: "1 Reyes 11:42"



  },



  {



    id: 1034, difficulty: "facil", category: "reyes",



    question: "?Que rey de Juda fue puesto en el trono a los 8 anos de edad?",



    options: ["Joas", "Josias", "Manases", "Amon"],



    correct: 1, reference: "2 Reyes 22:1"



  },



  {



    id: 1035, difficulty: "facil", category: "reyes",



    question: "?Que rey tuvo 700 esposas y 300 concubinas?",



    options: ["Acab", "Roboam", "Salomon", "David"],



    correct: 2, reference: "1 Reyes 11:3"



  },



  {



    id: 1036, difficulty: "facil", category: "reyes",



    question: "?Que rey de Juda destruyo los lugares altos y purifico el templo?",



    options: ["Manases", "Acaz", "Ezequias", "Amon"],



    correct: 2, reference: "2 Cronicas 29:3-5"



  },



  {



    id: 1037, difficulty: "facil", category: "reyes",



    question: "?Contra que pueblo luchaba frecuentemente el rey Saul?",



    options: ["Los asirios", "Los babilonios", "Los filisteos", "Los egipcios"],



    correct: 2, reference: "1 Samuel 14:52"



  },



  {



    id: 1038, difficulty: "facil", category: "reyes",



    question: "?Que le sucedio a Salomon al final de su vida por causa de sus esposas extranjeras?",



    options: ["Se hizo mas sabio", "Escribio mas proverbios", "Se aparto tras dioses ajenos", "Conquisto mas territorios"],



    correct: 2, reference: "1 Reyes 11:4"



  },



  {



    id: 1039, difficulty: "facil", category: "reyes",



    question: "?Que profeta se enfrento a los profetas de Baal en el monte Carmelo durante el reinado de Acab?",



    options: ["Eliseo", "Jeremias", "Elias", "Isaias"],



    correct: 2, reference: "1 Reyes 18:19-20"



  },



  {



    id: 1040, difficulty: "facil", category: "reyes",



    question: "?Que pecado cometio Saul que hizo que Dios lo rechazara como rey?",



    options: ["Idolatria", "Adulterio", "Asesinato", "Desobedecio el mandato de Dios"],



    correct: 3, reference: "1 Samuel 15:22-23"



  },



  {



    id: 1041, difficulty: "facil", category: "reyes",



    question: "?Que rey de Israel fue conocido por su maldad y fue esposo de Jezabel?",



    options: ["Jehu", "Omri", "Jeroboam", "Acab"],



    correct: 3, reference: "1 Reyes 21:25"



  },



  {



    id: 1042, difficulty: "facil", category: "reyes",



    question: "?En que libro de la Biblia se narra la historia de los reyes de Israel y Juda?",



    options: ["Genesis", "Exodo", "Apocalipsis", "1 y 2 Reyes"],



    correct: 3, reference: "1 Reyes 1:1"



  },



  {



    id: 1043, difficulty: "facil", category: "reyes",



    question: "?Quien sucedio a Roboam como rey de Juda?",



    options: ["Abias", "Josafat", "Joram", "Asa"],



    correct: 0, reference: "1 Reyes 14:31"



  },



  {



    id: 1044, difficulty: "facil", category: "reyes",



    question: "?Que rey de Juda confio en Dios y vio la destruccion del ejercito asirio?",



    options: ["Josias", "Manases", "Asa", "Ezequias"],



    correct: 3, reference: "2 Reyes 19:35"



  },



  {



    id: 1045, difficulty: "facil", category: "reyes",



    question: "?De quien era hijo el gigante Goliat segun su pueblo?",



    options: ["De los moabitas", "De los amonitas", "De los amalecitas", "De los filisteos"],



    correct: 3, reference: "1 Samuel 17:4"



  },



  {



    id: 1046, difficulty: "facil", category: "reyes",



    question: "?Que escribio Salomon ademas de Proverbios?",



    options: ["El libro de Isaias", "Lamentaciones", "El libro de Job", "Eclesiastes y Cantares"],



    correct: 3, reference: "Eclesiastes 1:1"



  },



  {



    id: 1047, difficulty: "facil", category: "reyes",



    question: "?Que rey fue llevado cautivo a Babilonia con cadenas y luego se arrepintio?",



    options: ["Sedequias", "Manases", "Joaquin", "Acaz"],



    correct: 1, reference: "2 Cronicas 33:11-13"



  },



  {



    id: 1048, difficulty: "facil", category: "reyes",



    question: "?Quien fue el ultimo rey de Juda antes del exilio a Babilonia?",



    options: ["Joaquin", "Josias", "Joacaz", "Sedequias"],



    correct: 3, reference: "2 Reyes 25:1-7"



  },



  {



    id: 1049, difficulty: "facil", category: "reyes",



    question: "?Que rey de Israel fue ungido por el profeta Eliseo para destruir la casa de Acab?",



    options: ["Jehu", "Salum", "Zacarias", "Jeroboam II"],



    correct: 0, reference: "2 Reyes 9:6-7"



  },



  // --- Profetas Facil (50 preguntas) ---



  {



    id: 1200, difficulty: "facil", category: "profetas",



    question: "?Que profeta fue tragado por un gran pez?",



    options: ["Miqueas", "Amos", "Eliseo", "Jonas"],



    correct: 3, reference: "Jonas 1:17"



  },



  {



    id: 1201, difficulty: "facil", category: "profetas",



    question: "?A que ciudad fue enviado Jonas a predicar?",



    options: ["Babilonia", "Tarsis", "Jerusalen", "Ninive"],



    correct: 3, reference: "Jonas 1:2"



  },



  {



    id: 1202, difficulty: "facil", category: "profetas",



    question: "?Que profeta fue llevado al cielo en un carro de fuego?",



    options: ["Eliseo", "Elias", "Ezequiel", "Isaias"],



    correct: 1, reference: "2 Reyes 2:11"



  },



  {



    id: 1203, difficulty: "facil", category: "profetas",



    question: "?Que profeta fue lanzado al foso de los leones?",



    options: ["Isaias", "Jeremias", "Ezequiel", "Daniel"],



    correct: 3, reference: "Daniel 6:16"



  },



  {



    id: 1204, difficulty: "facil", category: "profetas",



    question: "?Que profeta interpreto los suenos del rey Nabucodonosor?",



    options: ["Jeremias", "Ezequiel", "Isaias", "Daniel"],



    correct: 3, reference: "Daniel 2:27-28"



  },



  {



    id: 1205, difficulty: "facil", category: "profetas",



    question: "?Que profeta tuvo la vision de los huesos secos que cobraron vida?",



    options: ["Isaias", "Daniel", "Ezequiel", "Jeremias"],



    correct: 2, reference: "Ezequiel 37:1-10"



  },



  {



    id: 1206, difficulty: "facil", category: "profetas",



    question: "?Que profeta escribio: 'Porque un nino nos es nacido, hijo nos es dado'?",



    options: ["Malaquias", "Miqueas", "Isaias", "Jeremias"],



    correct: 2, reference: "Isaias 9:6"



  },



  {



    id: 1207, difficulty: "facil", category: "profetas",



    question: "?Que profeta es conocido como 'el profeta lloron'?",



    options: ["Isaias", "Ezequiel", "Jeremias", "Oseas"],



    correct: 2, reference: "Jeremias 9:1"



  },



  {



    id: 1208, difficulty: "facil", category: "profetas",



    question: "?Que profeta desafio a los profetas de Baal en el monte Carmelo?",



    options: ["Eliseo", "Samuel", "Elias", "Natan"],



    correct: 2, reference: "1 Reyes 18:20-40"



  },



  {



    id: 1209, difficulty: "facil", category: "profetas",



    question: "?Quien fue el discipulo y sucesor del profeta Elias?",



    options: ["Isaias", "Samuel", "Eliseo", "Natan"],



    correct: 2, reference: "1 Reyes 19:19-21"



  },



  {



    id: 1210, difficulty: "facil", category: "profetas",



    question: "?Que profeta ungio a David como rey de Israel?",



    options: ["Samuel", "Natan", "Gad", "Elias"],



    correct: 0, reference: "1 Samuel 16:13"



  },



  {



    id: 1211, difficulty: "facil", category: "profetas",



    question: "?Que profeta confronto a David por su pecado con Betsabe?",



    options: ["Natan", "Samuel", "Isaias", "Gad"],



    correct: 0, reference: "2 Samuel 12:1-7"



  },



  {



    id: 1212, difficulty: "facil", category: "profetas",



    question: "?Que profeta profetizo que el Mesias naceria en Belen?",



    options: ["Isaias", "Zacarias", "Malaquias", "Miqueas"],



    correct: 3, reference: "Miqueas 5:2"



  },



  {



    id: 1213, difficulty: "facil", category: "profetas",



    question: "?Que profeta tuvo una vision del trono de Dios con serafines?",



    options: ["Daniel", "Jeremias", "Isaias", "Ezequiel"],



    correct: 2, reference: "Isaias 6:1-3"



  },



  {



    id: 1214, difficulty: "facil", category: "profetas",



    question: "?Que profeta fue llamado por Dios siendo aun muy joven?",



    options: ["Isaias", "Daniel", "Jeremias", "Samuel"],



    correct: 3, reference: "1 Samuel 3:4-10"



  },



  {



    id: 1215, difficulty: "facil", category: "profetas",



    question: "?Cuantos dias estuvo Jonas dentro del gran pez?",



    options: ["Dos", "Tres", "Uno", "Siete"],



    correct: 1, reference: "Jonas 1:17"



  },



  {



    id: 1216, difficulty: "facil", category: "profetas",



    question: "?Que profeta fue alimentado por cuervos junto al arroyo de Querit?",



    options: ["Elias", "Samuel", "Isaias", "Eliseo"],



    correct: 0, reference: "1 Reyes 17:4-6"



  },



  {



    id: 1217, difficulty: "facil", category: "profetas",



    question: "?Que profeta multiplico el aceite de una viuda para pagar sus deudas?",



    options: ["Isaias", "Samuel", "Eliseo", "Elias"],



    correct: 2, reference: "2 Reyes 4:1-7"



  },



  {



    id: 1218, difficulty: "facil", category: "profetas",



    question: "?Que profeta sano las aguas amargas de Jerico con sal?",



    options: ["Eliseo", "Elias", "Samuel", "Moises"],



    correct: 0, reference: "2 Reyes 2:19-22"



  },



  {



    id: 1219, difficulty: "facil", category: "profetas",



    question: "?Cuales son los cuatro profetas mayores?",



    options: ["Isaias, Jeremias, Ezequiel y Daniel", "Amos, Oseas, Joel y Jonas", "Miqueas, Nahum, Habacuc y Sofonias", "Elias, Eliseo, Samuel y Natan"],



    correct: 0, reference: "Isaias 1:1; Jeremias 1:1; Ezequiel 1:1; Daniel 1:1"



  },



  {



    id: 1220, difficulty: "facil", category: "profetas",



    question: "?Que profeta escribio el libro de Lamentaciones?",



    options: ["Isaias", "Daniel", "Ezequiel", "Jeremias"],



    correct: 3, reference: "Lamentaciones 1:1"



  },



  {



    id: 1221, difficulty: "facil", category: "profetas",



    question: "?Que profeta fue pastor de ovejas antes de ser llamado por Dios?",



    options: ["Oseas", "Amos", "Jeremias", "Isaias"],



    correct: 1, reference: "Amos 7:14-15"



  },



  {



    id: 1222, difficulty: "facil", category: "profetas",



    question: "?A que profeta Dios le ordeno casarse con una mujer infiel como simbolo de Israel?",



    options: ["Oseas", "Amos", "Joel", "Miqueas"],



    correct: 0, reference: "Oseas 1:2-3"



  },



  {



    id: 1223, difficulty: "facil", category: "profetas",



    question: "?Que profeta escribio: 'He aqui que la virgen concebira y dara a luz un hijo'?",



    options: ["Jeremias", "Miqueas", "Malaquias", "Isaias"],



    correct: 3, reference: "Isaias 7:14"



  },



  {



    id: 1224, difficulty: "facil", category: "profetas",



    question: "?Que le pidio Eliseo a Elias antes de que este fuera llevado al cielo?",



    options: ["Su manto", "Su baston", "Una doble porcion de su espiritu", "Su bendicion"],



    correct: 2, reference: "2 Reyes 2:9"



  },



  {



    id: 1225, difficulty: "facil", category: "profetas",



    question: "?Con que instrumento se le cayo el manto a Elias cuando fue llevado al cielo?",



    options: ["Cayo cuando subio al carro de fuego", "Lo dejo caer con su mano", "Un angel lo recogio", "Lo lanzo a Eliseo"],



    correct: 0, reference: "2 Reyes 2:13"



  },



  {



    id: 1226, difficulty: "facil", category: "profetas",



    question: "?Que profeta dijo: 'Preparen camino al Senor' como profecia sobre Juan el Bautista?",



    options: ["Ezequiel", "Jeremias", "Isaias", "Malaquias"],



    correct: 2, reference: "Isaias 40:3"



  },



  {



    id: 1227, difficulty: "facil", category: "profetas",



    question: "?Que tres amigos de Daniel fueron lanzados al horno de fuego ardiente?",



    options: ["Ananias, Misael y Azarias", "Sem, Cam y Jafet", "Sadrac, Mesac y Abed-nego", "Pedro, Juan y Santiago"],



    correct: 2, reference: "Daniel 3:19-23"



  },



  {



    id: 1228, difficulty: "facil", category: "profetas",



    question: "?Que profeta vio una zarza ardiente que no se consumia?",



    options: ["Isaias", "Elias", "Samuel", "Moises"],



    correct: 3, reference: "Exodo 3:2-4"



  },



  {



    id: 1229, difficulty: "facil", category: "profetas",



    question: "?Que profeta es el autor del libro mas largo del Antiguo Testamento?",



    options: ["Jeremias", "Daniel", "Isaias", "Ezequiel"],



    correct: 2, reference: "Isaias 1:1"



  },



  {



    id: 1230, difficulty: "facil", category: "profetas",



    question: "?Que profeta fue echado en una cisterna de lodo por predicar la verdad?",



    options: ["Ezequiel", "Isaias", "Jeremias", "Daniel"],



    correct: 2, reference: "Jeremias 38:6"



  },



  {



    id: 1231, difficulty: "facil", category: "profetas",



    question: "?Que profeta le dijo a Naaman que se lavara siete veces en el rio Jordan?",



    options: ["Elias", "Eliseo", "Samuel", "Natan"],



    correct: 1, reference: "2 Reyes 5:10"



  },



  {



    id: 1232, difficulty: "facil", category: "profetas",



    question: "?De que enfermedad fue sanado Naaman al obedecer al profeta Eliseo?",



    options: ["Sordera", "Lepra", "Ceguera", "Paralisis"],



    correct: 1, reference: "2 Reyes 5:14"



  },



  {



    id: 1233, difficulty: "facil", category: "profetas",



    question: "?Que profeta vio una escritura en la pared durante el banquete de Belsasar?",



    options: ["Jeremias", "Daniel", "Isaias", "Ezequiel"],



    correct: 1, reference: "Daniel 5:5-17"



  },



  {



    id: 1234, difficulty: "facil", category: "profetas",



    question: "?Que profeta huyo de la reina Jezabel y se escondio en una cueva?",



    options: ["Elias", "Eliseo", "Samuel", "Natan"],



    correct: 0, reference: "1 Reyes 19:1-9"



  },



  {



    id: 1235, difficulty: "facil", category: "profetas",



    question: "?Que profeta profetizo sobre el valle de los huesos secos que representa la restauracion de Israel?",



    options: ["Daniel", "Jeremias", "Isaias", "Ezequiel"],



    correct: 3, reference: "Ezequiel 37:11-14"



  },



  {



    id: 1236, difficulty: "facil", category: "profetas",



    question: "?Cual fue el ultimo profeta del Antiguo Testamento?",



    options: ["Hageo", "Malaquias", "Joel", "Zacarias"],



    correct: 1, reference: "Malaquias 1:1"



  },



  {



    id: 1237, difficulty: "facil", category: "profetas",



    question: "?Que profeta resucito al hijo de la viuda de Sarepta?",



    options: ["Samuel", "Isaias", "Eliseo", "Elias"],



    correct: 3, reference: "1 Reyes 17:21-23"



  },



  {



    id: 1238, difficulty: "facil", category: "profetas",



    question: "?Que profeta resucito al hijo de la sunamita?",



    options: ["Eliseo", "Samuel", "Natan", "Elias"],



    correct: 0, reference: "2 Reyes 4:32-37"



  },



  {



    id: 1239, difficulty: "facil", category: "profetas",



    question: "?Que planta crecio y luego se seco causando enojo a Jonas?",



    options: ["Una vid", "Una calabacera", "Una higuera", "Un olivo"],



    correct: 1, reference: "Jonas 4:6-7"



  },



  {



    id: 1240, difficulty: "facil", category: "profetas",



    question: "?Que profeta dijo: 'Busquen al Senor y viviran'?",



    options: ["Miqueas", "Oseas", "Joel", "Amos"],



    correct: 3, reference: "Amos 5:6"



  },



  {



    id: 1241, difficulty: "facil", category: "profetas",



    question: "?Que profeta hablo de la venida del 'Sol de justicia'?",



    options: ["Sofonias", "Malaquias", "Zacarias", "Hageo"],



    correct: 1, reference: "Malaquias 4:2"



  },



  {



    id: 1242, difficulty: "facil", category: "profetas",



    question: "?Que profetas animaron al pueblo a reconstruir el templo despues del exilio?",



    options: ["Hageo y Zacarias", "Isaias y Jeremias", "Amos y Oseas", "Malaquias y Joel"],



    correct: 0, reference: "Esdras 5:1"



  },



  {



    id: 1243, difficulty: "facil", category: "profetas",



    question: "?De que tribu era el profeta Samuel?",



    options: ["Benjamin", "Juda", "Levi", "Efrain"],



    correct: 2, reference: "1 Cronicas 6:33-38"



  },



  {



    id: 1244, difficulty: "facil", category: "profetas",



    question: "?Como se llamaba la madre de Samuel?",



    options: ["Rut", "Sara", "Ana", "Raquel"],



    correct: 2, reference: "1 Samuel 1:20"



  },



  {



    id: 1245, difficulty: "facil", category: "profetas",



    question: "?Que profeta fue llamado por Dios desde antes de nacer?",



    options: ["Ezequiel", "Jeremias", "Isaias", "Daniel"],



    correct: 1, reference: "Jeremias 1:5"



  },



  {



    id: 1246, difficulty: "facil", category: "profetas",



    question: "?Que profeta hablo de un nuevo pacto que Dios haria con su pueblo?",



    options: ["Isaias", "Ezequiel", "Jeremias", "Malaquias"],



    correct: 2, reference: "Jeremias 31:31-33"



  },



  {



    id: 1247, difficulty: "facil", category: "profetas",



    question: "?Que profeta vio cuatro bestias que representaban imperios mundiales?",



    options: ["Isaias", "Daniel", "Jeremias", "Ezequiel"],



    correct: 1, reference: "Daniel 7:1-7"



  },



  {



    id: 1248, difficulty: "facil", category: "profetas",



    question: "?Que profeta escribio: 'Jehova es mi pastor, nada me faltara'?",



    options: ["Isaias", "David", "Samuel", "Jeremias"],



    correct: 1, reference: "Salmos 23:1"



  },



  {



    id: 1249, difficulty: "facil", category: "profetas",



    question: "?Que profeta anuncio que Dios enviaria al profeta Elias antes del dia del Senor?",



    options: ["Malaquias", "Joel", "Zacarias", "Hageo"],



    correct: 0, reference: "Malaquias 4:5"



  },



  // --- Cartas Facil (50 preguntas) ---



  {



    id: 1800, difficulty: "facil", category: "cartas",



    question: "?Quien escribio la mayoria de las cartas del Nuevo Testamento?",



    options: ["Pedro", "Santiago", "Pablo", "Juan"],



    correct: 2, reference: "Romanos 1:1"



  },



  {



    id: 1801, difficulty: "facil", category: "cartas",



    question: "?A que ciudad fue dirigida la carta a los Romanos?",



    options: ["Roma", "Corinto", "Efeso", "Filipos"],



    correct: 0, reference: "Romanos 1:7"



  },



  {



    id: 1802, difficulty: "facil", category: "cartas",



    question: "?Cual es conocido como el 'capitulo del amor' en las cartas de Pablo?",



    options: ["Romanos 8", "Efesios 5", "1 Corintios 13", "Filipenses 4"],



    correct: 2, reference: "1 Corintios 13"



  },



  {



    id: 1803, difficulty: "facil", category: "cartas",



    question: "?Que versiculo dice: 'Todo lo puedo en Cristo que me fortalece'?",



    options: ["Romanos 8:28", "Galatas 2:20", "Efesios 6:10", "Filipenses 4:13"],



    correct: 3, reference: "Filipenses 4:13"



  },



  {



    id: 1804, difficulty: "facil", category: "cartas",



    question: "?Que versiculo dice: 'Porque de tal manera amo Dios al mundo...'?",



    options: ["1 Juan 4:8", "Juan 3:16", "Efesios 2:8", "Romanos 5:8"],



    correct: 1, reference: "Juan 3:16"



  },



  {



    id: 1805, difficulty: "facil", category: "cartas",



    question: "?Que carta de Pablo habla sobre la armadura de Dios?",



    options: ["Romanos", "Filipenses", "Efesios", "Colosenses"],



    correct: 2, reference: "Efesios 6:10-18"



  },



  {



    id: 1806, difficulty: "facil", category: "cartas",



    question: "?Cuantas cartas escribio Pablo a los Corintios que estan en la Biblia?",



    options: ["Cuatro", "Tres", "Una", "Dos"],



    correct: 3, reference: "1 y 2 Corintios"



  },



  {



    id: 1807, difficulty: "facil", category: "cartas",



    question: "?Que versiculo dice: 'Sabemos que a los que aman a Dios, todas las cosas les ayudan a bien'?",



    options: ["Romanos 8:28", "1 Pedro 5:7", "Filipenses 4:13", "Santiago 1:2"],



    correct: 0, reference: "Romanos 8:28"



  },



  {



    id: 1808, difficulty: "facil", category: "cartas",



    question: "?A quien escribio Pablo las cartas llamadas 'epistolas pastorales'?",



    options: ["Timoteo y Tito", "Pedro y Juan", "Santiago y Judas", "Filemon y Lucas"],



    correct: 0, reference: "1 Timoteo 1:1; Tito 1:1"



  },



  {



    id: 1809, difficulty: "facil", category: "cartas",



    question: "?Quien escribio la epistola de Santiago?",



    options: ["Santiago hijo de Zebedeo", "Santiago hermano de Jesus", "Pedro", "Pablo"],



    correct: 1, reference: "Santiago 1:1"



  },



  {



    id: 1810, difficulty: "facil", category: "cartas",



    question: "?Cuantas cartas de Pedro hay en el Nuevo Testamento?",



    options: ["Dos", "Una", "Cuatro", "Tres"],



    correct: 0, reference: "1 Pedro 1:1; 2 Pedro 1:1"



  },



  {



    id: 1811, difficulty: "facil", category: "cartas",



    question: "?Cuantas cartas del apostol Juan hay en el Nuevo Testamento?",



    options: ["Cuatro", "Una", "Dos", "Tres"],



    correct: 3, reference: "1, 2 y 3 Juan"



  },



  {



    id: 1812, difficulty: "facil", category: "cartas",



    question: "?Que carta de Pablo fue escrita a un dueno de un esclavo llamado Onesimo?",



    options: ["Filemon", "Tito", "Timoteo", "Galatas"],



    correct: 0, reference: "Filemon 1:10"



  },



  {



    id: 1813, difficulty: "facil", category: "cartas",



    question: "?En que carta se encuentra el fruto del Espiritu?",



    options: ["Romanos", "Galatas", "Colosenses", "Efesios"],



    correct: 1, reference: "Galatas 5:22-23"



  },



  {



    id: 1814, difficulty: "facil", category: "cartas",



    question: "?Que dice Romanos 6:23 que es la paga del pecado?",



    options: ["Muerte", "Soledad", "Enfermedad", "Sufrimiento"],



    correct: 0, reference: "Romanos 6:23"



  },



  {



    id: 1815, difficulty: "facil", category: "cartas",



    question: "?Que carta habla de que la fe sin obras es muerta?",



    options: ["Santiago", "1 Pedro", "Hebreos", "Romanos"],



    correct: 0, reference: "Santiago 2:26"



  },



  {



    id: 1816, difficulty: "facil", category: "cartas",



    question: "?Que versiculo dice: 'Por gracia sois salvos por medio de la fe'?",



    options: ["Galatas 3:11", "Efesios 2:8", "Romanos 3:23", "Tito 3:5"],



    correct: 1, reference: "Efesios 2:8"



  },



  {



    id: 1817, difficulty: "facil", category: "cartas",



    question: "?En que carta se describe a Jesus como sumo sacerdote?",



    options: ["Romanos", "Hebreos", "Colosenses", "Efesios"],



    correct: 1, reference: "Hebreos 4:14"



  },



  {



    id: 1818, difficulty: "facil", category: "cartas",



    question: "?Que carta contiene el capitulo de la fe conocido como 'los heroes de la fe'?",



    options: ["Romanos", "Hebreos", "Galatas", "Santiago"],



    correct: 1, reference: "Hebreos 11"



  },



  {



    id: 1819, difficulty: "facil", category: "cartas",



    question: "?Que carta de Pablo fue escrita a los creyentes de Filipos?",



    options: ["Efesios", "Filipenses", "Colosenses", "Galatas"],



    correct: 1, reference: "Filipenses 1:1"



  },



  {



    id: 1820, difficulty: "facil", category: "cartas",



    question: "?Que carta ensena que 'Dios es amor'?",



    options: ["1 Juan", "1 Corintios", "Santiago", "Romanos"],



    correct: 0, reference: "1 Juan 4:8"



  },



  {



    id: 1821, difficulty: "facil", category: "cartas",



    question: "?En que carta Pablo dice: 'Ya no vivo yo, mas vive Cristo en mi'?",



    options: ["Romanos", "Galatas", "Filipenses", "Efesios"],



    correct: 1, reference: "Galatas 2:20"



  },



  {



    id: 1822, difficulty: "facil", category: "cartas",



    question: "?Que carta menciona que debemos echar toda nuestra ansiedad sobre Dios?",



    options: ["Filipenses", "1 Pedro", "Santiago", "Romanos"],



    correct: 1, reference: "1 Pedro 5:7"



  },



  {



    id: 1823, difficulty: "facil", category: "cartas",



    question: "?A quien esta dirigida la carta a Tito?",



    options: ["A un diacono en Efeso", "A un anciano en Corinto", "A un colaborador en Creta", "A un pastor en Roma"],



    correct: 2, reference: "Tito 1:4-5"



  },



  {



    id: 1824, difficulty: "facil", category: "cartas",



    question: "?Cuales son los tres elementos que permanecen segun 1 Corintios 13?",



    options: ["Fe, esperanza y amor", "Verdad, justicia y amor", "Gracia, paz y amor", "Bondad, paciencia y amor"],



    correct: 0, reference: "1 Corintios 13:13"



  },



  {



    id: 1825, difficulty: "facil", category: "cartas",



    question: "?Que carta de Pablo trata principalmente sobre la justificacion por la fe?",



    options: ["Efesios", "Filipenses", "1 Corintios", "Romanos"],



    correct: 3, reference: "Romanos 3:28"



  },



  {



    id: 1826, difficulty: "facil", category: "cartas",



    question: "?Que dijo Pablo que debemos hacer sin cesar segun 1 Tesalonicenses?",



    options: ["Ayunar", "Cantar", "Orar", "Predicar"],



    correct: 2, reference: "1 Tesalonicenses 5:17"



  },



  {



    id: 1827, difficulty: "facil", category: "cartas",



    question: "?Que carta dice: 'Toda la Escritura es inspirada por Dios'?",



    options: ["Tito", "1 Timoteo", "Hebreos", "2 Timoteo"],



    correct: 3, reference: "2 Timoteo 3:16"



  },



  {



    id: 1828, difficulty: "facil", category: "cartas",



    question: "?A que iglesia Pablo le escribio sobre los problemas de divisiones?",



    options: ["Efeso", "Filipos", "Corinto", "Roma"],



    correct: 2, reference: "1 Corintios 1:10-13"



  },



  {



    id: 1829, difficulty: "facil", category: "cartas",



    question: "?Que carta habla del arrebatamiento de los creyentes?",



    options: ["Romanos", "Hebreos", "1 Tesalonicenses", "Efesios"],



    correct: 2, reference: "1 Tesalonicenses 4:16-17"



  },



  {



    id: 1830, difficulty: "facil", category: "cartas",



    question: "?Cuantas cartas escribio Pablo a los Tesalonicenses?",



    options: ["Una", "Tres", "Dos", "Cuatro"],



    correct: 2, reference: "1 y 2 Tesalonicenses"



  },



  {



    id: 1831, difficulty: "facil", category: "cartas",



    question: "?Quien escribio la epistola de Judas?",



    options: ["Pablo", "Juan", "Judas Iscariote", "Judas hermano de Jesus"],



    correct: 3, reference: "Judas 1:1"



  },



  {



    id: 1832, difficulty: "facil", category: "cartas",



    question: "?Que carta de Pablo enfatiza la supremacia de Cristo sobre toda la creacion?",



    options: ["Efesios", "Filipenses", "Romanos", "Colosenses"],



    correct: 3, reference: "Colosenses 1:15-18"



  },



  {



    id: 1833, difficulty: "facil", category: "cartas",



    question: "?En que carta Pablo habla sobre los dones espirituales comparandolos con el cuerpo humano?",



    options: ["Romanos", "Galatas", "1 Corintios", "Efesios"],



    correct: 2, reference: "1 Corintios 12:12-27"



  },



  {



    id: 1834, difficulty: "facil", category: "cartas",



    question: "?Que carta dice: 'No os unais en yugo desigual con los incredulos'?",



    options: ["Efesios", "1 Corintios", "2 Corintios", "Galatas"],



    correct: 2, reference: "2 Corintios 6:14"



  },



  {



    id: 1835, difficulty: "facil", category: "cartas",



    question: "?Cuantas cartas escribio Pablo a Timoteo?",



    options: ["Una", "Cuatro", "Dos", "Tres"],



    correct: 2, reference: "1 y 2 Timoteo"



  },



  {



    id: 1836, difficulty: "facil", category: "cartas",



    question: "?Que carta dice que si confesamos nuestros pecados, Dios es fiel para perdonarnos?",



    options: ["Hebreos", "Romanos", "1 Juan", "Santiago"],



    correct: 2, reference: "1 Juan 1:9"



  },



  {



    id: 1837, difficulty: "facil", category: "cartas",



    question: "?En que carta se habla de las 'obras de la carne' y el 'fruto del Espiritu'?",



    options: ["Galatas", "Efesios", "Colosenses", "Romanos"],



    correct: 0, reference: "Galatas 5:19-23"



  },



  {



    id: 1838, difficulty: "facil", category: "cartas",



    question: "?Que carta fue escrita a los creyentes de Efeso?",



    options: ["Colosenses", "Filipenses", "Galatas", "Efesios"],



    correct: 3, reference: "Efesios 1:1"



  },



  {



    id: 1839, difficulty: "facil", category: "cartas",



    question: "?Que versiculo dice: 'No se amolden al mundo actual'?",



    options: ["Romanos 12:2", "Filipenses 2:5", "Colosenses 3:1", "Efesios 4:1"],



    correct: 0, reference: "Romanos 12:2"



  },



  {



    id: 1840, difficulty: "facil", category: "cartas",



    question: "?Que carta describe la resurreccion de los muertos en detalle?",



    options: ["1 Tesalonicenses", "Hebreos", "1 Corintios", "Romanos"],



    correct: 2, reference: "1 Corintios 15"



  },



  {



    id: 1841, difficulty: "facil", category: "cartas",



    question: "?Quien es el autor tradicional de la carta a los Hebreos?",



    options: ["Pedro", "Santiago", "Se desconoce con certeza", "Juan"],



    correct: 2, reference: "Hebreos 1:1"



  },



  {



    id: 1842, difficulty: "facil", category: "cartas",



    question: "?Que carta dice: 'Dad gracias en todo, porque esta es la voluntad de Dios'?",



    options: ["1 Tesalonicenses", "Filipenses", "Efesios", "Romanos"],



    correct: 0, reference: "1 Tesalonicenses 5:18"



  },



  {



    id: 1843, difficulty: "facil", category: "cartas",



    question: "?Que carta habla sobre la relacion entre esposos comparandola con Cristo y la iglesia?",



    options: ["Efesios", "1 Corintios", "Colosenses", "Romanos"],



    correct: 0, reference: "Efesios 5:22-33"



  },



  {



    id: 1844, difficulty: "facil", category: "cartas",



    question: "?Que carta aconseja a los creyentes a presentar sus cuerpos como sacrificio vivo?",



    options: ["Hebreos", "Galatas", "Efesios", "Romanos"],



    correct: 3, reference: "Romanos 12:1"



  },



  {



    id: 1845, difficulty: "facil", category: "cartas",



    question: "?Que carta dice: 'Estad siempre gozosos'?",



    options: ["Filipenses", "1 Tesalonicenses", "1 Pedro", "Santiago"],



    correct: 1, reference: "1 Tesalonicenses 5:16"



  },



  {



    id: 1846, difficulty: "facil", category: "cartas",



    question: "?En que carta Pablo pide que reciban a Onesimo como hermano?",



    options: ["Tito", "Filemon", "Colosenses", "1 Timoteo"],



    correct: 1, reference: "Filemon 1:16"



  },



  {



    id: 1847, difficulty: "facil", category: "cartas",



    question: "?Que carta habla de que la lengua es un fuego y un mundo de maldad?",



    options: ["Judas", "1 Pedro", "Santiago", "Romanos"],



    correct: 2, reference: "Santiago 3:6"



  },



  {



    id: 1848, difficulty: "facil", category: "cartas",



    question: "?Que carta dice: 'Si alguno esta en Cristo, nueva criatura es'?",



    options: ["2 Corintios", "Efesios", "Romanos", "Galatas"],



    correct: 0, reference: "2 Corintios 5:17"



  },



  {



    id: 1849, difficulty: "facil", category: "cartas",



    question: "?Que carta comienza diciendo: 'Pablo, siervo de Jesucristo, llamado a ser apostol'?",



    options: ["Filipenses", "Efesios", "Romanos", "Galatas"],



    correct: 2, reference: "Romanos 1:1"



  },



  // ===================== INTERMEDIO =====================



  // --- Personajes Intermedio (50 preguntas) ---



  {



    id: 26, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el padre de Moises?",



    options: ["Amram", "Caleb", "Josue", "Aaron"],



    correct: 0, reference: "Exodo 6:20"



  },



  {



    id: 27, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue la esposa de Isaac?",



    options: ["Rebeca", "Lea", "Raquel", "Sara"],



    correct: 0, reference: "Genesis 24:67"



  },



  {



    id: 28, difficulty: "intermedio", category: "personajes",



    question: "?Quien ayudo a esconder a los espias en Jerico?",



    options: ["Rut", "Debora", "Ester", "Rahab"],



    correct: 3, reference: "Josue 2:1-6"



  },



  {



    id: 29, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el suegro de Moises?",



    options: ["Natan", "Jetro", "Eli", "Laban"],



    correct: 1, reference: "Exodo 3:1"



  },



  {



    id: 30, difficulty: "intermedio", category: "personajes",



    question: "?Quien reemplazo a Moises como lider?",



    options: ["Gedeon", "Caleb", "Josue", "Aaron"],



    correct: 2, reference: "Josue 1:1-2"



  },



  {



    id: 500, difficulty: "intermedio", category: "personajes",



    question: "?Quien interpreto los suenos del rey Nabucodonosor?",



    options: ["Daniel", "Isaias", "Ezequiel", "Jeremias"],



    correct: 0, reference: "Daniel 2:27-28"



  },



  {



    id: 501, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el profeta que ungio a David?",



    options: ["Natan", "Gad", "Eli", "Samuel"],



    correct: 3, reference: "1 Samuel 16:13"



  },



  {



    id: 502, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue la esposa de Jacob que dio a luz a Jose?",



    options: ["Raquel", "Zilpa", "Bilha", "Lea"],



    correct: 0, reference: "Genesis 30:22-24"



  },



  {



    id: 503, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el rey que persiguio a David?",



    options: ["Saul", "Acab", "Roboam", "Jeroboam"],



    correct: 0, reference: "1 Samuel 19"



  },



  {



    id: 504, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue la madre de Juan el Bautista?",



    options: ["Isabel", "Maria", "Rut", "Ana"],



    correct: 0, reference: "Lucas 1:13"



  },



  {



    id: 505, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el primer juez de Israel?",



    options: ["Sanson", "Debora", "Gedeon", "Otoniel"],



    correct: 3, reference: "Jueces 3:9"



  },



  {



    id: 506, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el padre de Salomon?",



    options: ["Saul", "Roboam", "David", "Natan"],



    correct: 2, reference: "2 Samuel 12:24"



  },



  {



    id: 507, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue llamado 'amigo de Dios'?",



    options: ["Isaac", "Abraham", "Moises", "Jacob"],



    correct: 1, reference: "Santiago 2:23"



  },



  {



    id: 508, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue la esposa de Booz?",



    options: ["Ana", "Ester", "Lea", "Rut"],



    correct: 3, reference: "Rut 4:13"



  },



  {



    id: 509, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el profeta que enfrento a Acab?",



    options: ["Eliseo", "Elias", "Amos", "Jonas"],



    correct: 1, reference: "1 Reyes 18"



  },



  {



    id: 510, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el padre de Juan y Santiago?",



    options: ["Andres", "Zebedeo", "Felipe", "Simeon"],



    correct: 1, reference: "Mateo 4:21"



  },



  {



    id: 511, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue conocido como 'el hombre conforme al corazon de Dios'?",



    options: ["David", "Saul", "Josias", "Salomon"],



    correct: 0, reference: "Hechos 13:22"



  },



  {



    id: 512, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue la mujer que juzgo a Israel?",



    options: ["Ester", "Rut", "Ana", "Debora"],



    correct: 3, reference: "Jueces 4:4"



  },



  {



    id: 513, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el rey mas rico de Israel?",



    options: ["Salomon", "David", "Roboam", "Saul"],



    correct: 0, reference: "1 Reyes 10:23"



  },



  {



    id: 514, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el padre de Samuel?",



    options: ["Isai", "Elcana", "Caleb", "Natan"],



    correct: 1, reference: "1 Samuel 1:1"



  },



  {



    id: 515, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue convertido en el camino a Damasco?",



    options: ["Pablo", "Marcos", "Juan", "Pedro"],



    correct: 0, reference: "Hechos 9:3-6"



  },



  {



    id: 516, difficulty: "intermedio", category: "personajes",



    question: "?Quien nego a Jesus antes del gallo cantar?",



    options: ["Tomas", "Juan", "Pedro", "Andres"],



    correct: 2, reference: "Mateo 26:74-75"



  },



  {



    id: 517, difficulty: "intermedio", category: "personajes",



    question: "?Quien escribio el libro de Lamentaciones?",



    options: ["Ezequiel", "Jeremias", "Isaias", "Daniel"],



    correct: 1, reference: "Lamentaciones 1:1"



  },



  {



    id: 518, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el profeta llamado desde nino?",



    options: ["Samuel", "Isaias", "Elias", "Oseas"],



    correct: 0, reference: "1 Samuel 3:4"



  },



  {



    id: 519, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el padre de Sanson?",



    options: ["Gad", "Manoah", "Eli", "Natan"],



    correct: 1, reference: "Jueces 13:2"



  },



  {



    id: 520, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el gobernador que juzgo a Jesus?",



    options: ["Felix", "Agripa", "Pilato", "Herodes"],



    correct: 2, reference: "Mateo 27:2"



  },



  {



    id: 521, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el companero de Pablo en viajes misioneros?",



    options: ["Tomas", "Pedro", "Juan", "Bernabe"],



    correct: 3, reference: "Hechos 13:2"



  },



  {



    id: 522, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue resucitado por Pedro?",



    options: ["Lazaro", "Felipe", "Esteban", "Dorcas"],



    correct: 3, reference: "Hechos 9:40"



  },



  {



    id: 523, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el padre de Isaac?",



    options: ["Jacob", "Abraham", "Esau", "Lot"],



    correct: 1, reference: "Genesis 21:3"



  },



  {



    id: 524, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el rey durante la vida de Jesus?",



    options: ["Herodes", "Pilato", "Cesar", "Agripa"],



    correct: 0, reference: "Mateo 2:1"



  },



  {



    id: 525, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue la madre de Samuel?",



    options: ["Ester", "Lea", "Rut", "Ana"],



    correct: 3, reference: "1 Samuel 1:20"



  },



  {



    id: 526, difficulty: "intermedio", category: "personajes",



    question: "?Quien escribio el evangelio mas corto?",



    options: ["Mateo", "Lucas", "Juan", "Marcos"],



    correct: 3, reference: "Marcos"



  },



  {



    id: 527, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el profeta que vio huesos secos?",



    options: ["Daniel", "Isaias", "Ezequiel", "Jeremias"],



    correct: 2, reference: "Ezequiel 37:1-10"



  },



  {



    id: 528, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el padre de Juan el Bautista?",



    options: ["Zacarias", "Felipe", "Andres", "Simeon"],



    correct: 0, reference: "Lucas 1:13"



  },



  {



    id: 529, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el rey que reconstruyo Jerusalen?",



    options: ["Nabucodonosor", "Dario", "Artajerjes", "Ciro"],



    correct: 2, reference: "Nehemias 2:1-8"



  },



  {



    id: 530, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue sanado de ceguera por Jesus?",



    options: ["Lazaro", "Bartimeo", "Zaqueo", "Felipe"],



    correct: 1, reference: "Marcos 10:46-52"



  },



  {



    id: 531, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el profeta que hablo con Dios en el monte Horeb?",



    options: ["Elias", "Oseas", "Amos", "Eliseo"],



    correct: 0, reference: "1 Reyes 19:8-12"



  },



  {



    id: 532, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue padre de Jacob y Esau?",



    options: ["Abraham", "Lot", "Laban", "Isaac"],



    correct: 3, reference: "Genesis 25:26"



  },



  {



    id: 533, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el primer rey ungido por Samuel?",



    options: ["Saul", "Salomon", "Roboam", "David"],



    correct: 0, reference: "1 Samuel 10:1"



  },



  {



    id: 534, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue la esposa de David que era hija de Saul?",



    options: ["Betsabe", "Abigail", "Mical", "Tamar"],



    correct: 2, reference: "1 Samuel 18:27"



  },



  {



    id: 535, difficulty: "intermedio", category: "personajes",



    question: "?Quien escribio muchas cartas del NT?",



    options: ["Lucas", "Juan", "Pablo", "Pedro"],



    correct: 2, reference: "Romanos-Filemon"



  },



  {



    id: 536, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el padre de Juan Marcos?",



    options: ["No se menciona claramente", "Felipe", "Pedro", "Jose"],



    correct: 0, reference: "Hechos 12:12"



  },



  {



    id: 537, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el profeta que huyo a Tarsis?",



    options: ["Nahum", "Miqueas", "Amos", "Jonas"],



    correct: 3, reference: "Jonas 1:3"



  },



  {



    id: 538, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el rey que cayo por orgullo?",



    options: ["Ezequias", "David", "Uzias", "Josias"],



    correct: 2, reference: "2 Cronicas 26:16-21"



  },



  {



    id: 539, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el sacerdote que crio a Samuel?",



    options: ["Eli", "Natan", "Gad", "Zacarias"],



    correct: 0, reference: "1 Samuel 2:11"



  },



  {



    id: 540, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el primer misionero gentil?",



    options: ["Cornelio", "Felipe", "Marcos", "Lucas"],



    correct: 0, reference: "Hechos 10"



  },



  {



    id: 541, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue la esposa de Abraham despues de Sara?",



    options: ["Lea", "Rebeca", "Quetura", "Raquel"],



    correct: 2, reference: "Genesis 25:1"



  },



  {



    id: 542, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el profeta que reprendio a David?",



    options: ["Samuel", "Eli", "Gad", "Natan"],



    correct: 3, reference: "2 Samuel 12:1-7"



  },



  {



    id: 543, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue padre de Jose (esposo de Maria)?",



    options: ["Jacob", "Natan", "David", "Eli"],



    correct: 0, reference: "Mateo 1:16"



  },



  {



    id: 544, difficulty: "intermedio", category: "personajes",



    question: "?Quien fue el discipulo que dudo de Jesus resucitado?",



    options: ["Tomas", "Juan", "Pedro", "Andres"],



    correct: 0, reference: "Juan 20:24-29"



  },



  // --- Libros Intermedio (50 preguntas) ---



  {



    id: 200, difficulty: "intermedio", category: "libros",



    question: "?En que libro se registran las generaciones desde Adan hasta Noe?",



    options: ["Numeros", "Cronicas", "Genesis", "Exodo"],



    correct: 2, reference: "Genesis 5"



  },



  {



    id: 201, difficulty: "intermedio", category: "libros",



    question: "?Que libro repite gran parte de la ley dada en el desierto?",



    options: ["Josue", "Levitico", "Deuteronomio", "Numeros"],



    correct: 2, reference: "Deuteronomio 5"



  },



  {



    id: 202, difficulty: "intermedio", category: "libros",



    question: "?En que libro se describen los sacrificios del tabernaculo?",



    options: ["Rut", "Exodo", "Jueces", "Levitico"],



    correct: 3, reference: "Levitico 1-7"



  },



  {



    id: 203, difficulty: "intermedio", category: "libros",



    question: "?Que libro narra el conteo del pueblo de Israel?",



    options: ["Reyes", "Numeros", "Josue", "Exodo"],



    correct: 1, reference: "Numeros 1"



  },



  {



    id: 204, difficulty: "intermedio", category: "libros",



    question: "?En que libro aparece la oracion de Ana?",



    options: ["1 Samuel", "Salmos", "Jueces", "Rut"],



    correct: 0, reference: "1 Samuel 2:1-10"



  },



  {



    id: 205, difficulty: "intermedio", category: "libros",



    question: "?Que libro registra la caida del reino del norte?",



    options: ["2 Reyes", "Esdras", "1 Reyes", "Cronicas"],



    correct: 0, reference: "2 Reyes 17"



  },



  {



    id: 206, difficulty: "intermedio", category: "libros",



    question: "?En que libro se mencionan los valientes de David?",



    options: ["Nehemias", "Ester", "2 Samuel", "Rut"],



    correct: 2, reference: "2 Samuel 23:8-39"



  },



  {



    id: 207, difficulty: "intermedio", category: "libros",



    question: "?Que libro contiene listas genealogicas extensas?",



    options: ["Reyes", "Rut", "Job", "Cronicas"],



    correct: 3, reference: "1 Cronicas 1-9"



  },



  {



    id: 208, difficulty: "intermedio", category: "libros",



    question: "?En que libro se relata el decreto de Ciro?",



    options: ["Nehemias", "Daniel", "Ester", "Esdras"],



    correct: 3, reference: "Esdras 1:1-4"



  },



  {



    id: 209, difficulty: "intermedio", category: "libros",



    question: "?Que libro muestra el lamento por Jerusalen destruida?",



    options: ["Ezequiel", "Lamentaciones", "Jeremias", "Isaias"],



    correct: 1, reference: "Lamentaciones 1:1"



  },



  {



    id: 210, difficulty: "intermedio", category: "libros",



    question: "?En que libro Dios habla desde un torbellino?",



    options: ["Isaias", "Job", "Salmos", "Daniel"],



    correct: 1, reference: "Job 38:1"



  },



  {



    id: 211, difficulty: "intermedio", category: "libros",



    question: "?Que libro inicia con 'Vision de Isaias'?",



    options: ["Jeremias", "Isaias", "Oseas", "Amos"],



    correct: 1, reference: "Isaias 1:1"



  },



  {



    id: 212, difficulty: "intermedio", category: "libros",



    question: "?En que libro aparece la vision del valle de huesos secos?",



    options: ["Joel", "Miqueas", "Ezequiel", "Daniel"],



    correct: 2, reference: "Ezequiel 37:1-14"



  },



  {



    id: 213, difficulty: "intermedio", category: "libros",



    question: "?Que libro menciona las setenta semanas?",



    options: ["Daniel", "Isaias", "Jeremias", "Zacarias"],



    correct: 0, reference: "Daniel 9:24-27"



  },



  {



    id: 214, difficulty: "intermedio", category: "libros",



    question: "?En que libro se anuncia el 'Dia del Senor' con langostas?",



    options: ["Oseas", "Joel", "Amos", "Abdias"],



    correct: 1, reference: "Joel 1:4"



  },



  {



    id: 215, difficulty: "intermedio", category: "libros",



    question: "?Que libro contiene profecias contra Ninive?",



    options: ["Sofonias", "Nahum", "Jonas", "Habacuc"],



    correct: 1, reference: "Nahum 1:1"



  },



  {



    id: 216, difficulty: "intermedio", category: "libros",



    question: "?En que libro aparece 'el justo vivira por fe'?",



    options: ["Oseas", "Habacuc", "Malaquias", "Amos"],



    correct: 1, reference: "Habacuc 2:4"



  },



  {



    id: 217, difficulty: "intermedio", category: "libros",



    question: "?Que libro anuncia la venida del mensajero del Senor?",



    options: ["Zacarias", "Malaquias", "Joel", "Ageo"],



    correct: 1, reference: "Malaquias 3:1"



  },



  {



    id: 218, difficulty: "intermedio", category: "libros",



    question: "?En que evangelio esta la genealogia de Jesus desde Abraham?",



    options: ["Mateo", "Marcos", "Lucas", "Juan"],



    correct: 0, reference: "Mateo 1:1-17"



  },



  {



    id: 219, difficulty: "intermedio", category: "libros",



    question: "?Que evangelio presenta a Jesus como el Verbo?",



    options: ["Mateo", "Marcos", "Lucas", "Juan"],



    correct: 3, reference: "Juan 1:1"



  },



  {



    id: 220, difficulty: "intermedio", category: "libros",



    question: "?En que libro Jesus cuenta mas parabolas?",



    options: ["Marcos", "Mateo", "Hechos", "Juan"],



    correct: 1, reference: "Mateo 13"



  },



  {



    id: 221, difficulty: "intermedio", category: "libros",



    question: "?Que libro narra el concilio de Jerusalen?",



    options: ["Romanos", "Hechos", "Efesios", "Galatas"],



    correct: 1, reference: "Hechos 15"



  },



  {



    id: 222, difficulty: "intermedio", category: "libros",



    question: "?En que libro Pablo explica la justificacion por la fe?",



    options: ["Romanos", "Tito", "Filipenses", "Corintios"],



    correct: 0, reference: "Romanos 3:21-28"



  },



  {



    id: 223, difficulty: "intermedio", category: "libros",



    question: "?Que libro corrige abusos en la Cena del Senor?",



    options: ["Efesios", "1 Corintios", "Colosenses", "Galatas"],



    correct: 1, reference: "1 Corintios 11:17-34"



  },



  {



    id: 224, difficulty: "intermedio", category: "libros",



    question: "?En que libro se habla del 'cuerpo de Cristo'?",



    options: ["Tito", "Hebreos", "Romanos", "1 Corintios"],



    correct: 3, reference: "1 Corintios 12:12-27"



  },



  {



    id: 225, difficulty: "intermedio", category: "libros",



    question: "?Que libro destaca el gozo en medio de pruebas?",



    options: ["Filipenses", "Colosenses", "Efesios", "Filemon"],



    correct: 0, reference: "Filipenses 1:4"



  },



  {



    id: 226, difficulty: "intermedio", category: "libros",



    question: "?En que libro se menciona la armadura espiritual completa?",



    options: ["Galatas", "Tito", "Efesios", "Romanos"],



    correct: 2, reference: "Efesios 6:10-18"



  },



  {



    id: 227, difficulty: "intermedio", category: "libros",



    question: "?Que libro enfatiza la supremacia de Cristo?",



    options: ["Colosenses", "Pedro", "Juan", "Hebreos"],



    correct: 0, reference: "Colosenses 1:15-20"



  },



  {



    id: 228, difficulty: "intermedio", category: "libros",



    question: "?En que libro se compara a Jesus con Melquisedec?",



    options: ["Judas", "Romanos", "Tito", "Hebreos"],



    correct: 3, reference: "Hebreos 7"



  },



  {



    id: 229, difficulty: "intermedio", category: "libros",



    question: "?Que libro ensena que la fe sin obras esta muerta?",



    options: ["Judas", "Santiago", "Pedro", "Juan"],



    correct: 1, reference: "Santiago 2:26"



  },



  {



    id: 230, difficulty: "intermedio", category: "libros",



    question: "?En que libro se exhorta a resistir al diablo?",



    options: ["Santiago", "Juan", "Tito", "Pedro"],



    correct: 0, reference: "Santiago 4:7"



  },



  {



    id: 231, difficulty: "intermedio", category: "libros",



    question: "?Que libro habla del sufrimiento cristiano?",



    options: ["Romanos", "1 Pedro", "Filemon", "Galatas"],



    correct: 1, reference: "1 Pedro 4:12-19"



  },



  {



    id: 232, difficulty: "intermedio", category: "libros",



    question: "?En que libro se advierte contra falsos maestros?",



    options: ["Pedro", "Lucas", "Tito", "Judas"],



    correct: 3, reference: "Judas 1:4"



  },



  {



    id: 233, difficulty: "intermedio", category: "libros",



    question: "?Que libro menciona el anticristo?",



    options: ["1 Juan", "Judas", "Hebreos", "Apocalipsis"],



    correct: 0, reference: "1 Juan 2:18"



  },



  {



    id: 234, difficulty: "intermedio", category: "libros",



    question: "?En que libro Juan recibe visiones celestiales?",



    options: ["Apocalipsis", "Hechos", "Judas", "Pedro"],



    correct: 0, reference: "Apocalipsis 1:1"



  },



  {



    id: 235, difficulty: "intermedio", category: "libros",



    question: "?Que libro contiene cartas a siete iglesias?",



    options: ["Tito", "Hebreos", "Romanos", "Apocalipsis"],



    correct: 3, reference: "Apocalipsis 2-3"



  },



  {



    id: 236, difficulty: "intermedio", category: "libros",



    question: "?En que libro aparece el Cordero como figura central?",



    options: ["Mateo", "Juan", "Hechos", "Apocalipsis"],



    correct: 3, reference: "Apocalipsis 5:6"



  },



  {



    id: 237, difficulty: "intermedio", category: "libros",



    question: "?Que libro habla del trono blanco?",



    options: ["Zacarias", "Apocalipsis", "Isaias", "Daniel"],



    correct: 1, reference: "Apocalipsis 20:11"



  },



  {



    id: 238, difficulty: "intermedio", category: "libros",



    question: "?En que libro se describe la Nueva Jerusalen?",



    options: ["Juan", "Pedro", "Apocalipsis", "Hebreos"],



    correct: 2, reference: "Apocalipsis 21:1-4"



  },



  {



    id: 239, difficulty: "intermedio", category: "libros",



    question: "?Que libro muestra el inicio de la iglesia?",



    options: ["Mateo", "Hechos", "Corintios", "Romanos"],



    correct: 1, reference: "Hechos 2"



  },



  {



    id: 240, difficulty: "intermedio", category: "libros",



    question: "?En que libro se ensena sobre los dones espirituales?",



    options: ["Hebreos", "Romanos", "Tito", "1 Corintios"],



    correct: 3, reference: "1 Corintios 12"



  },



  {



    id: 241, difficulty: "intermedio", category: "libros",



    question: "?Que libro habla del amor como mandamiento nuevo?",



    options: ["Pedro", "Judas", "Juan", "Tito"],



    correct: 2, reference: "Juan 13:34"



  },



  {



    id: 242, difficulty: "intermedio", category: "libros",



    question: "?En que libro Pablo escribe desde prision?",



    options: ["Galatas", "Filipenses", "Romanos", "Hechos"],



    correct: 1, reference: "Filipenses 1:13"



  },



  {



    id: 243, difficulty: "intermedio", category: "libros",



    question: "?Que libro trata sobre liderazgo pastoral?",



    options: ["Romanos", "1 Timoteo", "Hebreos", "Judas"],



    correct: 1, reference: "1 Timoteo 3"



  },



  {



    id: 244, difficulty: "intermedio", category: "libros",



    question: "?En que libro Pablo aconseja a Tito?",



    options: ["Judas", "Pedro", "Filemon", "Tito"],



    correct: 3, reference: "Tito 1:1"



  },



  {



    id: 245, difficulty: "intermedio", category: "libros",



    question: "?Que libro defiende la sana doctrina?",



    options: ["2 Timoteo", "Romanos", "Juan", "Judas"],



    correct: 0, reference: "2 Timoteo 4:3"



  },



  {



    id: 246, difficulty: "intermedio", category: "libros",



    question: "?En que libro se habla de Onesimo?",



    options: ["Tito", "Hebreos", "Pedro", "Filemon"],



    correct: 3, reference: "Filemon 1:10"



  },



  {



    id: 247, difficulty: "intermedio", category: "libros",



    question: "?Que libro exhorta a perseverar hasta el fin?",



    options: ["Romanos", "Juan", "Hebreos", "Judas"],



    correct: 2, reference: "Hebreos 10:36"



  },



  {



    id: 248, difficulty: "intermedio", category: "libros",



    question: "?En que libro se menciona a Enoc?",



    options: ["Tito", "Pedro", "Judas", "Juan"],



    correct: 2, reference: "Judas 1:14"



  },



  {



    id: 249, difficulty: "intermedio", category: "libros",



    question: "?Que libro une profecia, cartas y visiones?",



    options: ["Daniel", "Apocalipsis", "Isaias", "Zacarias"],



    correct: 1, reference: "Apocalipsis"



  },



  // --- Reyes ---



  {



    id: 1050, difficulty: "intermedio", category: "reyes",



    question: "?Cuantos anos reino David en Hebron antes de trasladarse a Jerusalen?",



    options: ["Diez anos", "Siete anos y medio", "Cinco anos", "Tres anos"],



    correct: 1, reference: "2 Samuel 5:5"



  },



  {



    id: 1051, difficulty: "intermedio", category: "reyes",



    question: "?Que reforma importante realizo el rey Josias al encontrar el libro de la Ley?",



    options: ["Dividio el reino", "Establecio nuevos sacerdotes levitas", "Elimino la idolatria y renovo el pacto", "Construyo un nuevo templo"],



    correct: 2, reference: "2 Reyes 23:1-25"



  },



  {



    id: 1052, difficulty: "intermedio", category: "reyes",



    question: "?Que rey del norte establecio Samaria como capital del reino de Israel?",



    options: ["Acab", "Jeroboam I", "Baasa", "Omri"],



    correct: 3, reference: "1 Reyes 16:24"



  },



  {



    id: 1053, difficulty: "intermedio", category: "reyes",



    question: "?Que pecado especifico cometio Jeroboam I que se convirtio en referencia para los reyes posteriores?",



    options: ["Consultar adivinos", "Hacer becerros de oro en Dan y Bet-el", "Adorar a Baal", "Sacrificar a sus hijos"],



    correct: 1, reference: "1 Reyes 12:28-30"



  },



  {



    id: 1054, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda quito los lugares altos y destruyo la serpiente de bronce de Moises?",



    options: ["Asa", "Ezequias", "Josafat", "Josias"],



    correct: 1, reference: "2 Reyes 18:4"



  },



  {



    id: 1055, difficulty: "intermedio", category: "reyes",



    question: "?Con que profeta tuvo el rey Acab frecuentes enfrentamientos?",



    options: ["Eliseo", "Isaias", "Jeremias", "Elias"],



    correct: 3, reference: "1 Reyes 18:17-18"



  },



  {



    id: 1056, difficulty: "intermedio", category: "reyes",



    question: "?Cuantos anos reino Salomon sobre todo Israel?",



    options: ["Cincuenta anos", "Veinte anos", "Cuarenta anos", "Treinta anos"],



    correct: 2, reference: "1 Reyes 11:42"



  },



  {



    id: 1057, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda fue herido de lepra por quemar incienso en el templo?",



    options: ["Acaz", "Amasias", "Uzias (Azarias)", "Jotam"],



    correct: 2, reference: "2 Cronicas 26:19-21"



  },



  {



    id: 1058, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda hizo alianza con el rey de Israel para pelear en Ramot de Galaad?",



    options: ["Amasias", "Asa", "Josafat", "Joas"],



    correct: 2, reference: "1 Reyes 22:1-4"



  },



  {



    id: 1059, difficulty: "intermedio", category: "reyes",



    question: "?Cual fue la causa principal de la division del reino despues de Salomon?",



    options: ["Una guerra civil", "La invasion asiria", "Los impuestos excesivos y el trabajo forzado", "La idolatria"],



    correct: 2, reference: "1 Reyes 12:4-16"



  },



  {



    id: 1060, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Israel reino solo siete dias antes de suicidarse?",



    options: ["Zimri", "Nadab", "Pekaia", "Ela"],



    correct: 0, reference: "1 Reyes 16:15-18"



  },



  {



    id: 1061, difficulty: "intermedio", category: "reyes",



    question: "?Que profeta ungio a Jehu como rey de Israel para destruir la casa de Acab?",



    options: ["Un discipulo de Eliseo", "Miqueas", "Eliseo", "Elias"],



    correct: 0, reference: "2 Reyes 9:1-6"



  },



  {



    id: 1062, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda fue escondido en el templo durante seis anos siendo nino?",



    options: ["Joas", "Amon", "Josias", "Manases"],



    correct: 0, reference: "2 Reyes 11:1-3"



  },



  {



    id: 1063, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Israel expandio las fronteras del reino del norte a su mayor extension?",



    options: ["Acab", "Peka", "Jeroboam II", "Omri"],



    correct: 2, reference: "2 Reyes 14:25"



  },



  {



    id: 1064, difficulty: "intermedio", category: "reyes",



    question: "?Quien fue la reina que usurpo el trono de Juda e intento destruir la descendencia real?",



    options: ["Atalia", "Betsabe", "Jezabel", "Maaca"],



    correct: 0, reference: "2 Reyes 11:1"



  },



  {



    id: 1065, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda llevo cautivo al profeta Jeremias a Egipto?",



    options: ["Joaquin", "Sedequias", "Joacim", "Nadie, fue Johanan hijo de Carea"],



    correct: 3, reference: "Jeremias 43:5-7"



  },



  {



    id: 1066, difficulty: "intermedio", category: "reyes",



    question: "?Cuantos anos reino Asa en Juda haciendo lo recto ante los ojos de Jehova?",



    options: ["Veinticinco anos", "Cuarenta y un anos", "Veinte anos", "Treinta y un anos"],



    correct: 1, reference: "1 Reyes 15:10"



  },



  {



    id: 1067, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda cavo cisternas, tuvo vinas y fue amante de la agricultura?",



    options: ["Uzias", "Josafat", "Jotam", "Ezequias"],



    correct: 0, reference: "2 Cronicas 26:10"



  },



  {



    id: 1068, difficulty: "intermedio", category: "reyes",



    question: "?Que pecado cometio el rey Saul que provoco que Dios lo rechazara como rey?",



    options: ["Matar a los sacerdotes", "Desobedecer ofreciendo sacrificio sin Samuel", "Consultar adivinos", "Adulterio"],



    correct: 1, reference: "1 Samuel 13:8-14"



  },



  {



    id: 1069, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Israel fue asesinado por su propio oficial Zimri?",



    options: ["Nadab", "Baasa", "Jeroboam I", "Ela"],



    correct: 3, reference: "1 Reyes 16:8-10"



  },



  {



    id: 1070, difficulty: "intermedio", category: "reyes",



    question: "?Que hizo Ezequias cuando recibio la carta amenazante de Senaquerib?",



    options: ["La extendio delante de Jehova en el templo", "Huyo al desierto", "Pidio ayuda a Egipto", "Reunio su ejercito"],



    correct: 0, reference: "2 Reyes 19:14"



  },



  {



    id: 1071, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda reino mas tiempo segun la Biblia?",



    options: ["Uzias", "Manases", "Asa", "Josafat"],



    correct: 1, reference: "2 Reyes 21:1"



  },



  {



    id: 1072, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Israel construyo un templo a Baal en Samaria?",



    options: ["Omri", "Jeroboam II", "Acab", "Jehu"],



    correct: 2, reference: "1 Reyes 16:32"



  },



  {



    id: 1073, difficulty: "intermedio", category: "reyes",



    question: "?A que edad comenzo Josias a reinar en Juda?",



    options: ["Siete anos", "Dieciseis anos", "Doce anos", "Ocho anos"],



    correct: 3, reference: "2 Reyes 22:1"



  },



  {



    id: 1074, difficulty: "intermedio", category: "reyes",



    question: "?Que profeta reprendio a David por su pecado con Betsabe?",



    options: ["Samuel", "Isaias", "Natan", "Gad"],



    correct: 2, reference: "2 Samuel 12:1-7"



  },



  {



    id: 1075, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda mando a sus principes a ensenar la ley en las ciudades?",



    options: ["Josafat", "Asa", "Josias", "Ezequias"],



    correct: 0, reference: "2 Cronicas 17:7-9"



  },



  {



    id: 1076, difficulty: "intermedio", category: "reyes",



    question: "?Cual fue el ultimo rey del reino del norte (Israel) antes de la caida ante Asiria?",



    options: ["Peka", "Oseas", "Jeroboam II", "Manahem"],



    correct: 1, reference: "2 Reyes 17:1-6"



  },



  {



    id: 1077, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda fue llevado cautivo a Babilonia con ganchos y cadenas?",



    options: ["Joacim", "Joaquin", "Sedequias", "Manases"],



    correct: 3, reference: "2 Cronicas 33:11"



  },



  {



    id: 1078, difficulty: "intermedio", category: "reyes",



    question: "?Que hizo Josias con los huesos de los sacerdotes de los lugares altos?",



    options: ["Los enterro con honores", "Los quemo sobre los altares", "Los arrojo al mar", "Los llevo a Jerusalen"],



    correct: 1, reference: "2 Reyes 23:16-20"



  },



  {



    id: 1079, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Israel fue conocido como un guerrero valiente pero hizo lo malo ante Jehova?",



    options: ["Peka", "Baasa", "Jeroboam II", "Omri"],



    correct: 3, reference: "1 Reyes 16:25-26"



  },



  {



    id: 1080, difficulty: "intermedio", category: "reyes",



    question: "?Cuantos anos anadio Dios a la vida de Ezequias cuando oro por sanidad?",



    options: ["Quince anos", "Diez anos", "Cinco anos", "Veinte anos"],



    correct: 0, reference: "2 Reyes 20:6"



  },



  {



    id: 1081, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda hizo pasar a su hijo por fuego como sacrificio?",



    options: ["Joacim", "Manases", "Amon", "Acaz"],



    correct: 3, reference: "2 Reyes 16:3"



  },



  {



    id: 1082, difficulty: "intermedio", category: "reyes",



    question: "?Que senal dio Dios a Ezequias para confirmar su sanidad?",



    options: ["Fuego del cielo", "Un terremoto", "La sombra retrocedio diez grados", "Una voz del cielo"],



    correct: 2, reference: "2 Reyes 20:8-11"



  },



  {



    id: 1083, difficulty: "intermedio", category: "reyes",



    question: "?Que rey sucedio a Salomon y causo la division del reino?",



    options: ["Roboam", "Abias", "Jeroboam", "Asa"],



    correct: 0, reference: "1 Reyes 12:1-17"



  },



  {



    id: 1084, difficulty: "intermedio", category: "reyes",



    question: "?Que profeta le dijo a Asa que confiara en Dios en lugar de en el rey de Siria?",



    options: ["Micaias", "Hanani", "Jehu", "Azarias"],



    correct: 1, reference: "2 Cronicas 16:7"



  },



  {



    id: 1085, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Israel derroto a Ben-adad rey de Siria tres veces segun la profecia de Eliseo?",



    options: ["Jehu", "Joacaz", "Jeroboam II", "Joas de Israel"],



    correct: 3, reference: "2 Reyes 13:18-25"



  },



  {



    id: 1086, difficulty: "intermedio", category: "reyes",



    question: "?Que hizo Salomon en su vejez que desagrado a Dios?",



    options: ["Su corazon se inclino tras dioses ajenos", "Destruyo el templo", "Aumento los impuestos", "Abandono Jerusalen"],



    correct: 0, reference: "1 Reyes 11:4"



  },



  {



    id: 1087, difficulty: "intermedio", category: "reyes",



    question: "?Que vina codicio el rey Acab y Jezabel tramo para obtenerla?",



    options: ["La vina de Efrain", "La vina de Caleb", "La vina de Nabot", "La vina de Isai"],



    correct: 2, reference: "1 Reyes 21:1-16"



  },



  {



    id: 1088, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda organizo cantores y musicos para alabar a Dios antes de la batalla?",



    options: ["Josias", "Josafat", "Ezequias", "David"],



    correct: 1, reference: "2 Cronicas 20:21-22"



  },



  {



    id: 1089, difficulty: "intermedio", category: "reyes",



    question: "?Cuantas tribus siguieron a Jeroboam cuando se dividio el reino?",



    options: ["Cinco", "Dos", "Ocho", "Diez"],



    correct: 3, reference: "1 Reyes 11:31"



  },



  {



    id: 1090, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda restauro el templo usando las ofrendas del pueblo?",



    options: ["Josias", "Asa", "Ezequias", "Joas"],



    correct: 3, reference: "2 Reyes 12:4-14"



  },



  {



    id: 1091, difficulty: "intermedio", category: "reyes",



    question: "?Quien ungio a Saul como primer rey de Israel?",



    options: ["Eli", "Gad", "Natan", "Samuel"],



    correct: 3, reference: "1 Samuel 10:1"



  },



  {



    id: 1092, difficulty: "intermedio", category: "reyes",



    question: "?Que rey del norte destruyo completamente el culto a Baal en Israel?",



    options: ["Jeroboam II", "Oseas", "Jehu", "Manahem"],



    correct: 2, reference: "2 Reyes 10:18-28"



  },



  {



    id: 1093, difficulty: "intermedio", category: "reyes",



    question: "?En que batalla murio el rey Saul?",



    options: ["En Jerico", "En el monte Gilboa", "En Gilgal", "En Hebron"],



    correct: 1, reference: "1 Samuel 31:1-6"



  },



  {



    id: 1094, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda fue contemporaneo del profeta Isaias?",



    options: ["Ezequias", "Josias", "Manases", "Amon"],



    correct: 0, reference: "Isaias 1:1"



  },



  {



    id: 1095, difficulty: "intermedio", category: "reyes",



    question: "?Que condicion puso Dios a Salomon para bendecir su reinado?",



    options: ["Andar en sus caminos y guardar sus mandamientos", "Conquistar naciones vecinas", "No tomar esposas extranjeras", "Construir el templo"],



    correct: 0, reference: "1 Reyes 9:4-5"



  },



  {



    id: 1096, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda cavo el tunel de Siloe para abastecer agua a Jerusalen?",



    options: ["Josias", "Manases", "Ezequias", "Josafat"],



    correct: 2, reference: "2 Reyes 20:20"



  },



  {



    id: 1097, difficulty: "intermedio", category: "reyes",



    question: "?Que le sacaron los babilonios al rey Sedequias despues de capturarlo?",



    options: ["Le cortaron la lengua", "Le raparon la cabeza", "Le sacaron los ojos", "Le cortaron las manos"],



    correct: 2, reference: "2 Reyes 25:7"



  },



  {



    id: 1098, difficulty: "intermedio", category: "reyes",



    question: "?Que rey de Juda se arrepintio en el cautiverio y Dios lo restauro a su trono?",



    options: ["Sedequias", "Joaquin", "Manases", "Joacim"],



    correct: 2, reference: "2 Cronicas 33:12-13"



  },



  {



    id: 1099, difficulty: "intermedio", category: "reyes",



    question: "?Que consejero aconsejo a Roboam aumentar la carga sobre el pueblo?",



    options: ["Los sacerdotes", "Los profetas", "Los jovenes que se habian criado con el", "Los ancianos"],



    correct: 2, reference: "1 Reyes 12:8-11"



  },



  // --- Profetas ---



  {



    id: 1250, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta fue llamado por Dios cuando era nino mientras dormia en el templo?",



    options: ["Jeremias", "Isaias", "Samuel", "Elias"],



    correct: 2, reference: "1 Samuel 3:1-10"



  },



  {



    id: 1251, difficulty: "intermedio", category: "profetas",



    question: "?Bajo que rey de Juda profetizo Isaias principalmente?",



    options: ["Ezequias", "Manases", "Acab", "Josias"],



    correct: 0, reference: "Isaias 1:1"



  },



  {



    id: 1252, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta fue enviado a predicar a Ninive pero huyo hacia Tarsis?",



    options: ["Jonas", "Miqueas", "Nahum", "Amos"],



    correct: 0, reference: "Jonas 1:1-3"



  },



  {



    id: 1253, difficulty: "intermedio", category: "profetas",



    question: "?Que accion simbolica realizo Ezequiel acostandose sobre su lado izquierdo?",



    options: ["Simbolizar la caida de Babilonia", "Anunciar el nacimiento del Mesias", "Cargar la iniquidad de Israel", "Representar la destruccion de Egipto"],



    correct: 2, reference: "Ezequiel 4:4-5"



  },



  {



    id: 1254, difficulty: "intermedio", category: "profetas",



    question: "?Cuantos dias debia Ezequiel acostarse sobre su lado izquierdo segun Dios?",



    options: ["40 dias", "150 dias", "390 dias", "70 dias"],



    correct: 2, reference: "Ezequiel 4:5"



  },



  {



    id: 1255, difficulty: "intermedio", category: "profetas",



    question: "?A que profeta Dios le ordeno casarse con una mujer adultera como senal?",



    options: ["Joel", "Amos", "Oseas", "Miqueas"],



    correct: 2, reference: "Oseas 1:2-3"



  },



  {



    id: 1256, difficulty: "intermedio", category: "profetas",



    question: "?Como se llamaba la esposa de Oseas?",



    options: ["Gomer", "Raquel", "Abigail", "Ester"],



    correct: 0, reference: "Oseas 1:3"



  },



  {



    id: 1257, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta menor hablo especificamente sobre la destruccion de Edom?",



    options: ["Joel", "Amos", "Habacuc", "Abdias"],



    correct: 3, reference: "Abdias 1:1-4"



  },



  {



    id: 1258, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta tuvo la vision de las cuatro bestias que salian del mar?",



    options: ["Zacarias", "Isaias", "Daniel", "Ezequiel"],



    correct: 2, reference: "Daniel 7:1-8"



  },



  {



    id: 1259, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta fue arrebatado al cielo en un carro de fuego?",



    options: ["Eliseo", "Elias", "Enoc", "Moises"],



    correct: 1, reference: "2 Reyes 2:11"



  },



  {



    id: 1260, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta recibio el manto de Elias al ser este arrebatado?",



    options: ["Natan", "Gad", "Samuel", "Eliseo"],



    correct: 3, reference: "2 Reyes 2:13-14"



  },



  {



    id: 1261, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta visito la casa del alfarero por orden de Dios?",



    options: ["Isaias", "Jeremias", "Ezequiel", "Oseas"],



    correct: 1, reference: "Jeremias 18:1-6"



  },



  {



    id: 1262, difficulty: "intermedio", category: "profetas",



    question: "?Que vision tuvo Zacarias sobre un candelabro de oro entre dos olivos?",



    options: ["El poder del Espiritu Santo", "La gloria del templo", "La venida del Mesias", "El juicio final"],



    correct: 0, reference: "Zacarias 4:1-6"



  },



  {



    id: 1263, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta profetizo que el Mesias naceria en Belen?",



    options: ["Malaquias", "Zacarias", "Isaias", "Miqueas"],



    correct: 3, reference: "Miqueas 5:2"



  },



  {



    id: 1264, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta anuncio que una virgen concebiria y daria a luz un hijo llamado Emanuel?",



    options: ["Ezequiel", "Daniel", "Jeremias", "Isaias"],



    correct: 3, reference: "Isaias 7:14"



  },



  {



    id: 1265, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta describio al Siervo Sufriente en el capitulo 53 de su libro?",



    options: ["Ezequiel", "Isaias", "Daniel", "Jeremias"],



    correct: 1, reference: "Isaias 53:1-12"



  },



  {



    id: 1266, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta fue contemporaneo de Jeremias y profetizo en el exilio babilonico?",



    options: ["Amos", "Miqueas", "Isaias", "Ezequiel"],



    correct: 3, reference: "Ezequiel 1:1-3"



  },



  {



    id: 1267, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta confronto al rey David por su pecado con Betsabe?",



    options: ["Samuel", "Gad", "Elias", "Natan"],



    correct: 3, reference: "2 Samuel 12:1-7"



  },



  {



    id: 1268, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta era pastor y cultivador de higos silvestres antes de ser llamado?",



    options: ["Oseas", "Miqueas", "Amos", "Joel"],



    correct: 2, reference: "Amos 7:14"



  },



  {



    id: 1269, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta hablo del 'Dia del Senor' usando una plaga de langostas como ilustracion?",



    options: ["Sofonias", "Joel", "Amos", "Nahum"],



    correct: 1, reference: "Joel 1:4 - 2:11"



  },



  {



    id: 1270, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta predijo la caida de Ninive como juicio de Dios?",



    options: ["Jonas", "Sofonias", "Nahum", "Habacuc"],



    correct: 2, reference: "Nahum 1:1; 3:7"



  },



  {



    id: 1271, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta cuestiono a Dios sobre por que permitia la injusticia?",



    options: ["Malaquias", "Amos", "Miqueas", "Habacuc"],



    correct: 3, reference: "Habacuc 1:2-4"



  },



  {



    id: 1272, difficulty: "intermedio", category: "profetas",



    question: "?En tiempos de que rey reformador profetizo Sofonias?",



    options: ["Manases", "Josias", "Ezequias", "Joacim"],



    correct: 1, reference: "Sofonias 1:1"



  },



  {



    id: 1273, difficulty: "intermedio", category: "profetas",



    question: "?Que profetas animaron al pueblo a reconstruir el templo despues del exilio?",



    options: ["Amos y Oseas", "Hageo y Zacarias", "Isaias y Jeremias", "Malaquias y Joel"],



    correct: 1, reference: "Esdras 5:1"



  },



  {



    id: 1274, difficulty: "intermedio", category: "profetas",



    question: "?Que reprocho Malaquias al pueblo de Israel respecto a los diezmos?",



    options: ["Que ofrecian solo los primogenitos", "Que daban demasiado", "Que robaban a Dios al no diezmar", "Que no ayunaban"],



    correct: 2, reference: "Malaquias 3:8-10"



  },



  {



    id: 1275, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta fue echado en un foso de leones por orar a Dios?",



    options: ["Elias", "Jeremias", "Ezequiel", "Daniel"],



    correct: 3, reference: "Daniel 6:16"



  },



  {



    id: 1276, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta interpreto la escritura en la pared durante el banquete de Belsasar?",



    options: ["Isaias", "Daniel", "Jeremias", "Ezequiel"],



    correct: 1, reference: "Daniel 5:25-28"



  },



  {



    id: 1277, difficulty: "intermedio", category: "profetas",



    question: "?Que significaban las palabras 'Mene, Mene, Tekel, Uparsin' que Daniel interpreto?",



    options: ["Victoria y gloria eterna", "Paz y prosperidad vendran", "Arrepentimiento y perdon", "Dios ha contado tu reino, has sido pesado y hallado falto, tu reino sera dividido"],



    correct: 3, reference: "Daniel 5:26-28"



  },



  {



    id: 1278, difficulty: "intermedio", category: "profetas",



    question: "?Que vision tuvo Isaias al ser llamado como profeta en el templo?",



    options: ["Una zarza ardiente", "Al Senor sentado en un trono alto con serafines", "Un ejercito de angeles", "Un arco iris"],



    correct: 1, reference: "Isaias 6:1-4"



  },



  {



    id: 1279, difficulty: "intermedio", category: "profetas",



    question: "?Que hizo el serafin con una brasa del altar cuando Isaias fue llamado?",



    options: ["La arrojo al suelo", "Toco sus labios para purificarlo", "La puso sobre su frente", "La coloco en sus manos"],



    correct: 1, reference: "Isaias 6:6-7"



  },



  {



    id: 1280, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta fue puesto en una cisterna de lodo por predicar la rendicion ante Babilonia?",



    options: ["Jeremias", "Daniel", "Ezequiel", "Isaias"],



    correct: 0, reference: "Jeremias 38:6"



  },



  {



    id: 1281, difficulty: "intermedio", category: "profetas",



    question: "?Quien rescato a Jeremias de la cisterna de lodo?",



    options: ["El rey Sedequias", "Ebed-melec el etiope", "Gedalias", "Baruc"],



    correct: 1, reference: "Jeremias 38:7-13"



  },



  {



    id: 1282, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta tuvo la vision de una vara de almendro como senal del cuidado de Dios?",



    options: ["Amos", "Isaias", "Jeremias", "Zacarias"],



    correct: 2, reference: "Jeremias 1:11-12"



  },



  {



    id: 1283, difficulty: "intermedio", category: "profetas",



    question: "?Que accion simbolica realizo Jeremias al comprar un cinto de lino y esconderlo?",



    options: ["Anunciar una nueva alianza", "Representar la pureza de Israel", "Simbolizar que Dios se habia unido a Israel pero el pueblo se corrompio", "Mostrar la riqueza venidera"],



    correct: 2, reference: "Jeremias 13:1-11"



  },



  {



    id: 1284, difficulty: "intermedio", category: "profetas",



    question: "?Cuantos anos profetizo Jeremias que duraria el cautiverio en Babilonia?",



    options: ["50 anos", "100 anos", "40 anos", "70 anos"],



    correct: 3, reference: "Jeremias 25:11-12"



  },



  {



    id: 1285, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta vio la vision de un rollo que volaba?",



    options: ["Zacarias", "Ezequiel", "Isaias", "Daniel"],



    correct: 0, reference: "Zacarias 5:1-2"



  },



  {



    id: 1286, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta profetizo la entrada triunfal de Jesus montado sobre un pollino?",



    options: ["Malaquias", "Zacarias", "Isaias", "Miqueas"],



    correct: 1, reference: "Zacarias 9:9"



  },



  {



    id: 1287, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta menciono las treinta piezas de plata como precio de traicion?",



    options: ["Daniel", "Zacarias", "Jeremias", "Isaias"],



    correct: 1, reference: "Zacarias 11:12-13"



  },



  {



    id: 1288, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta tuvo la vision de las cuatro carros tirados por caballos de colores?",



    options: ["Ezequiel", "Daniel", "Isaias", "Zacarias"],



    correct: 3, reference: "Zacarias 6:1-8"



  },



  {



    id: 1289, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta menor predico contra la injusticia social y la opresion de los pobres en Israel?",



    options: ["Malaquias", "Amos", "Hageo", "Abdias"],



    correct: 1, reference: "Amos 2:6-7; 5:11-12"



  },



  {



    id: 1290, difficulty: "intermedio", category: "profetas",



    question: "?Desde que lugar fue llamado Amos para profetizar en Israel?",



    options: ["Samaria", "Tecoa", "Belen", "Jerusalen"],



    correct: 1, reference: "Amos 1:1"



  },



  {



    id: 1291, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta realizo el milagro de hacer flotar un hacha de hierro en el agua?",



    options: ["Samuel", "Elias", "Eliseo", "Moises"],



    correct: 2, reference: "2 Reyes 6:5-7"



  },



  {



    id: 1292, difficulty: "intermedio", category: "profetas",



    question: "?Cuantos milagros registrados realizo Eliseo en comparacion con Elias?",



    options: ["La misma cantidad", "La mitad", "Tres veces mas", "El doble"],



    correct: 3, reference: "2 Reyes 2:9 (pidio doble porcion)"



  },



  {



    id: 1293, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta fue alimentado por cuervos junto al arroyo de Querit?",



    options: ["Isaias", "Elias", "Samuel", "Eliseo"],



    correct: 1, reference: "1 Reyes 17:3-6"



  },



  {



    id: 1294, difficulty: "intermedio", category: "profetas",



    question: "?Que planta crecio sobre Jonas para darle sombra y luego se seco?",



    options: ["Un olivo", "Una vid", "Una calabacera", "Una higuera"],



    correct: 2, reference: "Jonas 4:6-7"



  },



  {



    id: 1295, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta tuvo la vision de la gloria de Dios junto al rio Quebar?",



    options: ["Ezequiel", "Isaias", "Jeremias", "Daniel"],



    correct: 0, reference: "Ezequiel 1:1-3"



  },



  {



    id: 1296, difficulty: "intermedio", category: "profetas",



    question: "?Que accion simbolica realizo Ezequiel al hacer un modelo de Jerusalen en un adobe?",



    options: ["Celebrar una fiesta", "Construir un altar", "Ensenar arquitectura", "Representar el asedio de Jerusalen"],



    correct: 3, reference: "Ezequiel 4:1-3"



  },



  {



    id: 1297, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta describio un templo futuro con medidas detalladas en los ultimos capitulos de su libro?",



    options: ["Zacarias", "Isaias", "Ezequiel", "Jeremias"],



    correct: 2, reference: "Ezequiel 40-48"



  },



  {



    id: 1298, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta anuncio un nuevo pacto que Dios escribiria en los corazones?",



    options: ["Ezequiel", "Isaias", "Malaquias", "Jeremias"],



    correct: 3, reference: "Jeremias 31:31-34"



  },



  {



    id: 1299, difficulty: "intermedio", category: "profetas",



    question: "?Que profeta es considerado el ultimo del Antiguo Testamento antes del periodo intertestamentario?",



    options: ["Malaquias", "Zacarias", "Hageo", "Joel"],



    correct: 0, reference: "Malaquias 1:1"



  },



  // --- Cartas ---



  {



    id: 1850, difficulty: "intermedio", category: "cartas",



    question: "?Desde que ciudad escribio Pablo la carta a los Filipenses?",



    options: ["Corinto", "Cesarea", "Efeso", "Roma"],



    correct: 3, reference: "Filipenses 1:13"



  },



  {



    id: 1851, difficulty: "intermedio", category: "cartas",



    question: "?Cual era el problema principal que Pablo abordo en la carta a los Galatas?",



    options: ["La persecucion romana", "La inmoralidad sexual", "La imposicion de la ley mosaica a los gentiles", "Las divisiones internas"],



    correct: 2, reference: "Galatas 2:16; 3:1-5"



  },



  {



    id: 1852, difficulty: "intermedio", category: "cartas",



    question: "?En que carta Pablo explica en detalle la justificacion por la fe?",



    options: ["Filipenses", "Romanos", "Colosenses", "Efesios"],



    correct: 1, reference: "Romanos 3:21-28"



  },



  {



    id: 1853, difficulty: "intermedio", category: "cartas",



    question: "?Que problema de divisiones existia en la iglesia de Corinto?",



    options: ["Se dividian segun las tribus de Israel", "Disputaban por el dia de reposo", "Seguian a diferentes lideres como Pablo, Apolos y Cefas", "Peleaban por el liderazgo femenino"],



    correct: 2, reference: "1 Corintios 1:12"



  },



  {



    id: 1854, difficulty: "intermedio", category: "cartas",



    question: "?A quien estaba dirigida la carta a Filemon?",



    options: ["A un dueno de esclavos cristiano", "A un gobernador romano", "A un pastor de Efeso", "A un lider judio"],



    correct: 0, reference: "Filemon 1:1-2"



  },



  {



    id: 1855, difficulty: "intermedio", category: "cartas",



    question: "?Cual es el tema central de la carta a los Hebreos?",



    options: ["El bautismo del Espiritu Santo", "La segunda venida de Cristo", "La organizacion de la iglesia", "La superioridad de Cristo sobre el antiguo pacto"],



    correct: 3, reference: "Hebreos 1:1-4; 8:6"



  },



  {



    id: 1856, difficulty: "intermedio", category: "cartas",



    question: "?Que ensena Pablo sobre los dones espirituales en 1 Corintios 12?",



    options: ["Que todos deben hablar en lenguas", "Que hay diversidad de dones pero un mismo Espiritu", "Que los dones ya cesaron", "Que solo los apostoles tienen dones"],



    correct: 1, reference: "1 Corintios 12:4-11"



  },



  {



    id: 1857, difficulty: "intermedio", category: "cartas",



    question: "?Por que razon Pablo escribio la segunda carta a los Corintios?",



    options: ["Para corregir doctrina sobre la resurreccion", "Para defender su apostolado y reconciliarse con la iglesia", "Para anunciar su visita a Roma", "Para pedir dinero"],



    correct: 1, reference: "2 Corintios 1:23-24; 7:8-12"



  },



  {



    id: 1858, difficulty: "intermedio", category: "cartas",



    question: "?Que metafora usa Pablo en Efesios 6 para describir la vida cristiana?",



    options: ["La armadura de Dios", "Un atleta en competencia", "Un agricultor sembrando", "Un barco en la tormenta"],



    correct: 0, reference: "Efesios 6:10-18"



  },



  {



    id: 1859, difficulty: "intermedio", category: "cartas",



    question: "?Que herejia combatia Pablo en la carta a los Colosenses?",



    options: ["El culto a Diana", "El gnosticismo y el legalismo", "El arrianismo", "El judaismo farisaico"],



    correct: 1, reference: "Colosenses 2:8-23"



  },



  {



    id: 1860, difficulty: "intermedio", category: "cartas",



    question: "?Que tema trata Pablo en 1 Tesalonicenses 4:13-18?",



    options: ["El matrimonio cristiano", "Los dones espirituales", "La venida del Senor y la resurreccion de los muertos", "La ofrenda para Jerusalen"],



    correct: 2, reference: "1 Tesalonicenses 4:13-18"



  },



  {



    id: 1861, difficulty: "intermedio", category: "cartas",



    question: "?Cual carta del NT fue escrita para acompanar a un esclavo fugitivo que regresaba a su amo?",



    options: ["Filemon", "3 Juan", "2 Timoteo", "Tito"],



    correct: 0, reference: "Filemon 1:10-16"



  },



  {



    id: 1862, difficulty: "intermedio", category: "cartas",



    question: "?Como se llamaba el esclavo que Pablo envio de regreso a Filemon?",



    options: ["Onesimo", "Epafrodito", "Aristarco", "Tiquico"],



    correct: 0, reference: "Filemon 1:10"



  },



  {



    id: 1863, difficulty: "intermedio", category: "cartas",



    question: "?Que ensena Santiago sobre la relacion entre la lengua y la sabiduria?",



    options: ["Que la lengua solo es danina para los incredulos", "Que hay que guardar silencio siempre", "Que la lengua es un miembro pequeno pero puede causar gran dano", "Que solo los sabios deben hablar"],



    correct: 2, reference: "Santiago 3:1-12"



  },



  {



    id: 1864, difficulty: "intermedio", category: "cartas",



    question: "?En que carta Pablo habla del 'aguijon en la carne' que Dios no le quito?",



    options: ["Filipenses", "2 Corintios", "Galatas", "Romanos"],



    correct: 1, reference: "2 Corintios 12:7-9"



  },



  {



    id: 1865, difficulty: "intermedio", category: "cartas",



    question: "?Que les enseno Pablo a los tesalonicenses sobre el 'hombre de pecado'?",



    options: ["Que era el emperador romano", "Que ya habia venido", "Que era Satanas mismo", "Que se manifestaria antes de la venida del Senor"],



    correct: 3, reference: "2 Tesalonicenses 2:1-12"



  },



  {



    id: 1866, difficulty: "intermedio", category: "cartas",



    question: "?Que significa la palabra 'justificacion' segun Pablo en Romanos?",



    options: ["Ser declarado justo por Dios mediante la fe", "Hacerse justo por obras", "Cumplir toda la ley", "Vivir sin pecar jamas"],



    correct: 0, reference: "Romanos 3:24-26; 5:1"



  },



  {



    id: 1867, difficulty: "intermedio", category: "cartas",



    question: "?Cual es el famoso himno cristologico que se encuentra en Filipenses 2?",



    options: ["El himno sobre la kenosis o vaciamiento de Cristo", "El himno de la creacion", "El himno de victoria sobre la muerte", "El cantico del siervo sufriente"],



    correct: 0, reference: "Filipenses 2:5-11"



  },



  {



    id: 1868, difficulty: "intermedio", category: "cartas",



    question: "?Que instrucciones da Pablo a Timoteo sobre los ancianos de la iglesia?",



    options: ["Que solo los levitas pueden ser ancianos", "Que los ancianos no deben trabajar", "Que sean irreprensibles, marido de una sola mujer y aptos para ensenar", "Que sean menores de 30 anos"],



    correct: 2, reference: "1 Timoteo 3:1-7"



  },



  {



    id: 1869, difficulty: "intermedio", category: "cartas",



    question: "?Que problema especifico de inmoralidad menciona Pablo en 1 Corintios 5?",



    options: ["Un hombre viviendo con la mujer de su padre", "Poligamia entre los creyentes", "Matrimonios entre judios y gentiles", "Adulterio con prostitutas del templo"],



    correct: 0, reference: "1 Corintios 5:1"



  },



  {



    id: 1870, difficulty: "intermedio", category: "cartas",



    question: "?Que ensena Pedro en su primera carta sobre el sufrimiento?",



    options: ["Que es una bendicion participar en los sufrimientos de Cristo", "Que el cristiano nunca debe sufrir", "Que hay que huir del sufrimiento siempre", "Que el sufrimiento es castigo divino"],



    correct: 0, reference: "1 Pedro 4:12-16"



  },



  {



    id: 1871, difficulty: "intermedio", category: "cartas",



    question: "?Contra que tipo de falsos maestros advierte la segunda carta de Pedro?",



    options: ["Los que obligaban a circuncidarse", "Los que negaban la divinidad de Cristo", "Los que prohibian comer carne", "Los que negaban la segunda venida de Cristo"],



    correct: 3, reference: "2 Pedro 3:3-4"



  },



  {



    id: 1872, difficulty: "intermedio", category: "cartas",



    question: "?Que fruto del Espiritu enumera Pablo en Galatas 5:22-23?",



    options: ["Sabiduria, fortaleza y poder", "Profecia, lenguas e interpretacion", "Fe, esperanza y caridad", "Amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza"],



    correct: 3, reference: "Galatas 5:22-23"



  },



  {



    id: 1873, difficulty: "intermedio", category: "cartas",



    question: "?Que ensena Pablo en Romanos 8:28 sobre todas las cosas?",



    options: ["Que a los que aman a Dios, todas las cosas les ayudan a bien", "Que Dios elimina todo sufrimiento", "Que nunca habra problemas", "Que todo es bueno siempre"],



    correct: 0, reference: "Romanos 8:28"



  },



  {



    id: 1874, difficulty: "intermedio", category: "cartas",



    question: "?Que carta del NT fue escrita a una iglesia que Pablo no habia fundado ni visitado?",



    options: ["Romanos", "1 Corintios", "Galatas", "Filipenses"],



    correct: 0, reference: "Romanos 1:10-13"



  },



  {



    id: 1875, difficulty: "intermedio", category: "cartas",



    question: "?Que advertencia da Juan en su primera carta sobre el anticristo?",



    options: ["Que vendra solo al final de los tiempos", "Que es un simbolo y no una persona", "Que ya hay muchos anticristos que niegan al Padre y al Hijo", "Que es un solo individuo futuro"],



    correct: 2, reference: "1 Juan 2:18-22"



  },



  {



    id: 1876, difficulty: "intermedio", category: "cartas",



    question: "?Cual es el proposito de la carta de Judas?",



    options: ["Relatar la vida de Judas Iscariote", "Exhortar a contender por la fe contra falsos maestros", "Dar instrucciones liturgicas", "Hablar de la genealogia de Cristo"],



    correct: 1, reference: "Judas 1:3-4"



  },



  {



    id: 1877, difficulty: "intermedio", category: "cartas",



    question: "?Que analogia usa Pablo en 1 Corintios 3 para describir la iglesia?",



    options: ["Un barco", "Un ejercito", "Un edificio y un campo de cultivo", "Una familia terrenal"],



    correct: 2, reference: "1 Corintios 3:9"



  },



  {



    id: 1878, difficulty: "intermedio", category: "cartas",



    question: "?Que dice Pablo en Efesios 2:8-9 sobre la salvacion?",



    options: ["Es por obras para que nadie se pierda", "Es por gracia mediante la fe, no por obras", "Es por guardar la ley y la fe juntas", "Es solo para los judios que creen"],



    correct: 1, reference: "Efesios 2:8-9"



  },



  {



    id: 1879, difficulty: "intermedio", category: "cartas",



    question: "?Que le pide Pablo a Timoteo en 2 Timoteo 4:13?",



    options: ["Que visite a los enfermos de Efeso", "Que traiga a Marcos consigo", "Que traiga el capote y los pergaminos que dejo en Troas", "Que envie dinero a Roma"],



    correct: 2, reference: "2 Timoteo 4:13"



  },



  {



    id: 1880, difficulty: "intermedio", category: "cartas",



    question: "?Que ensena Hebreos 11 sobre la fe?",



    options: ["Que presenta ejemplos de heroes de la fe del AT", "Que la fe es creer sin ninguna base", "Que la fe reemplaza las obras completamente", "Que la fe solo aplica a los apostoles"],



    correct: 0, reference: "Hebreos 11:1-40"



  },



  {



    id: 1881, difficulty: "intermedio", category: "cartas",



    question: "?Que relacion tenia Tito con Pablo segun la carta a Tito?",



    options: ["Era su escriba personal", "Era su hermano biologico", "Era su verdadero hijo en la fe comun", "Era un apostol igual a Pablo"],



    correct: 2, reference: "Tito 1:4"



  },



  {



    id: 1882, difficulty: "intermedio", category: "cartas",



    question: "?En que isla dejo Pablo a Tito para organizar las iglesias?",



    options: ["Creta", "Malta", "Chipre", "Patmos"],



    correct: 0, reference: "Tito 1:5"



  },



  {



    id: 1883, difficulty: "intermedio", category: "cartas",



    question: "?Que problema habia con la cena del Senor en la iglesia de Corinto?",



    options: ["Usaban vino en vez de jugo", "No la celebraban nunca", "Algunos comian en exceso mientras otros pasaban hambre", "La celebraban solo una vez al ano"],



    correct: 2, reference: "1 Corintios 11:20-22"



  },



  {



    id: 1884, difficulty: "intermedio", category: "cartas",



    question: "?Que dice Pablo sobre el matrimonio y la solteria en 1 Corintios 7?",



    options: ["Que todos deben casarse", "Que el matrimonio es pecado", "Que el soltero puede dedicarse mas al Senor, pero casarse no es pecado", "Que la solteria es obligatoria para servir a Dios"],



    correct: 2, reference: "1 Corintios 7:32-38"



  },



  {



    id: 1885, difficulty: "intermedio", category: "cartas",



    question: "?Que ensena Pablo en Romanos 12:1-2 sobre la vida cristiana?",



    options: ["Que solo importa la vida espiritual", "Que el cuerpo no tiene importancia", "Que debemos presentar nuestros cuerpos como sacrificio vivo y renovar la mente", "Que hay que seguir rituales judios"],



    correct: 2, reference: "Romanos 12:1-2"



  },



  {



    id: 1886, difficulty: "intermedio", category: "cartas",



    question: "?Quien llevo la carta de Pablo a la iglesia de Roma?",



    options: ["Timoteo", "Febe", "Lucas", "Tito"],



    correct: 1, reference: "Romanos 16:1-2"



  },



  {



    id: 1887, difficulty: "intermedio", category: "cartas",



    question: "?Que dice Santiago sobre la oracion del enfermo?",



    options: ["Que llame a los ancianos para que oren y lo unjan con aceite", "Que solo el enfermo debe orar por si mismo", "Que su enfermedad es voluntad de Dios", "Que vaya al medico y no ore"],



    correct: 0, reference: "Santiago 5:14-15"



  },



  {



    id: 1888, difficulty: "intermedio", category: "cartas",



    question: "?Que comparacion usa Pablo en Galatas 4 con Sara y Agar?",



    options: ["Israel y Roma", "La iglesia y la sinagoga", "El viejo y el nuevo pacto", "El cielo y la tierra"],



    correct: 2, reference: "Galatas 4:21-31"



  },



  {



    id: 1889, difficulty: "intermedio", category: "cartas",



    question: "?Que dice Juan que es Dios en 1 Juan 4:8?",



    options: ["Dios es venganza", "Dios es justicia", "Dios es amor", "Dios es fuego consumidor"],



    correct: 2, reference: "1 Juan 4:8"



  },



  {



    id: 1890, difficulty: "intermedio", category: "cartas",



    question: "?Que consejo da Pablo a los colosenses sobre las relaciones familiares?",



    options: ["Que los maridos amen a sus esposas y los padres no exasperen a sus hijos", "Que los padres provoquen a ira a sus hijos", "Que los hijos sean independientes desde jovenes", "Que las esposas dominen a sus maridos"],



    correct: 0, reference: "Colosenses 3:18-21"



  },



  {



    id: 1891, difficulty: "intermedio", category: "cartas",



    question: "?Por que razon escribio Pablo la carta a los Galatas con tanta urgencia?",



    options: ["Porque habia una hambruna", "Porque querian dejar de reunirse", "Porque estaban abandonando el evangelio de la gracia por otro evangelio", "Porque la iglesia se estaba dividiendo"],



    correct: 2, reference: "Galatas 1:6-7"



  },



  {



    id: 1892, difficulty: "intermedio", category: "cartas",



    question: "?Que ensena Pablo sobre la resurreccion en 1 Corintios 15?",



    options: ["Que solo los apostoles resucitaran", "Que la resurreccion ya ocurrio", "Que la resurreccion es solo espiritual", "Que si Cristo no resucito, vana es nuestra fe"],



    correct: 3, reference: "1 Corintios 15:14-17"



  },



  {



    id: 1893, difficulty: "intermedio", category: "cartas",



    question: "?Que ensena la carta a los Hebreos sobre Melquisedec?",



    options: ["Que Cristo es sacerdote segun el orden de Melquisedec, superior al sacerdocio levitico", "Que Melquisedec era un angel", "Que fue un rey pagano sin importancia", "Que Melquisedec fue el primer sumo sacerdote de Israel"],



    correct: 0, reference: "Hebreos 7:1-17"



  },



  {



    id: 1894, difficulty: "intermedio", category: "cartas",



    question: "?Que mandamiento llama Santiago 'la ley real'?",



    options: ["Amaras a tu projimo como a ti mismo", "No mataras", "Guardar el sabado", "Honrar padre y madre"],



    correct: 0, reference: "Santiago 2:8"



  },



  {



    id: 1895, difficulty: "intermedio", category: "cartas",



    question: "?Que advertencia da Pablo en 2 Timoteo 3 sobre los ultimos tiempos?",



    options: ["Que todos se convertiran", "Que habra paz mundial", "Que la iglesia desaparecera", "Que vendran tiempos peligrosos con hombres amadores de si mismos"],



    correct: 3, reference: "2 Timoteo 3:1-5"



  },



  {



    id: 1896, difficulty: "intermedio", category: "cartas",



    question: "?Que imagen usa Pedro para describir a los creyentes en 1 Pedro 2:5?",



    options: ["Olas del mar", "Ramas de un arbol", "Estrellas del cielo", "Piedras vivas edificadas como casa espiritual"],



    correct: 3, reference: "1 Pedro 2:5"



  },



  {



    id: 1897, difficulty: "intermedio", category: "cartas",



    question: "?Que ensena Pablo en Efesios 4 sobre la unidad del cuerpo de Cristo?",



    options: ["Que solo los judios forman el cuerpo", "Que hay un solo cuerpo, un Espiritu, un Senor, una fe y un bautismo", "Que la unidad no es importante", "Que cada iglesia es independiente"],



    correct: 1, reference: "Efesios 4:4-6"



  },



  {



    id: 1898, difficulty: "intermedio", category: "cartas",



    question: "?Que dice Pablo sobre la colecta para los santos de Jerusalen en 2 Corintios 8-9?",



    options: ["Que Jerusalen no necesita ayuda", "Que deben dar con alegria porque Dios ama al dador alegre", "Que solo los ricos deben ofrendar", "Que es obligatoria bajo pena de disciplina"],



    correct: 1, reference: "2 Corintios 9:7"



  },



  {



    id: 1899, difficulty: "intermedio", category: "cartas",



    question: "?Cual colaborador abandono a Pablo segun 2 Timoteo 4:10 por amar el mundo presente?",



    options: ["Bernabe", "Silas", "Demas", "Marcos"],



    correct: 2, reference: "2 Timoteo 4:10"



  },



  // --- Historias Intermedio (50 preguntas) ---



  {



    id: 46, difficulty: "intermedio", category: "historias",



    question: "?Cuantos anos estuvo Israel en el desierto?",



    options: ["20", "50", "40", "30"],



    correct: 2, reference: "Numeros 14:33-34"



  },



  {



    id: 47, difficulty: "intermedio", category: "historias",



    question: "?Quien lidero la conquista de Canaan?",



    options: ["Josue", "Moises", "Aaron", "Caleb"],



    correct: 0, reference: "Josue 1:1-2"



  },



  {



    id: 48, difficulty: "intermedio", category: "historias",



    question: "?Que rey unifico Israel?",



    options: ["Salomon", "David", "Saul", "Roboam"],



    correct: 1, reference: "2 Samuel 5:1-5"



  },



  {



    id: 49, difficulty: "intermedio", category: "historias",



    question: "?Que imperio destruyo Jerusalen en 586 a.C.?",



    options: ["Asirio", "Romano", "Babilonico", "Persa"],



    correct: 2, reference: "2 Reyes 25:8-10"



  },



  {



    id: 50, difficulty: "intermedio", category: "historias",



    question: "?Quien reconstruyo los muros de Jerusalen?",



    options: ["Zorobabel", "Esdras", "Nehemias", "Ageo"],



    correct: 2, reference: "Nehemias 2:17"



  },



  {



    id: 850, difficulty: "intermedio", category: "historias",



    question: "?Que libro relata el cautiverio en Babilonia?",



    options: ["Daniel", "Rut", "Amos", "Joel"],



    correct: 0, reference: "Daniel 1:1-6"



  },



  {



    id: 851, difficulty: "intermedio", category: "historias",



    question: "?Que profeta anuncio 70 anos de exilio?",



    options: ["Jeremias", "Daniel", "Ezequiel", "Isaias"],



    correct: 0, reference: "Jeremias 25:11-12"



  },



  {



    id: 852, difficulty: "intermedio", category: "historias",



    question: "?Que rey fue llevado cautivo a Babilonia?",



    options: ["Josias", "Joaquin", "Asa", "Joacim"],



    correct: 1, reference: "2 Reyes 24:15"



  },



  {



    id: 853, difficulty: "intermedio", category: "historias",



    question: "?Que rey permitio el regreso del exilio?",



    options: ["Dario", "Ciro", "Jerjes", "Artajerjes"],



    correct: 1, reference: "Esdras 1:1-4"



  },



  {



    id: 854, difficulty: "intermedio", category: "historias",



    question: "?Que ciudad fue capital del reino del norte?",



    options: ["Betel", "Jerusalen", "Dan", "Samaria"],



    correct: 3, reference: "1 Reyes 16:24"



  },



  {



    id: 855, difficulty: "intermedio", category: "historias",



    question: "?Que evento dividio el reino?",



    options: ["Rechazo de Roboam", "Muerte de David", "Idolatria", "Invasion asiria"],



    correct: 0, reference: "1 Reyes 12:16-17"



  },



  {



    id: 856, difficulty: "intermedio", category: "historias",



    question: "?Quien lidero el primer regreso del exilio?",



    options: ["Zorobabel", "Nehemias", "Ageo", "Esdras"],



    correct: 0, reference: "Esdras 2:2"



  },



  {



    id: 857, difficulty: "intermedio", category: "historias",



    question: "?Que profeta vio el valle de huesos?",



    options: ["Daniel", "Isaias", "Jeremias", "Ezequiel"],



    correct: 3, reference: "Ezequiel 37:1-10"



  },



  {



    id: 858, difficulty: "intermedio", category: "historias",



    question: "?Que rey hizo reformas espirituales?",



    options: ["Roboam", "Josias", "Manases", "Uzias"],



    correct: 1, reference: "2 Reyes 23:1-25"



  },



  {



    id: 859, difficulty: "intermedio", category: "historias",



    question: "?Que imperio dominaba en tiempos de Jesus?",



    options: ["Romano", "Griego", "Persa", "Babilonico"],



    correct: 0, reference: "Lucas 2:1"



  },



  {



    id: 860, difficulty: "intermedio", category: "historias",



    question: "?Quien escribio la mayoria de Proverbios?",



    options: ["Ezequias", "David", "Salomon", "Asa"],



    correct: 2, reference: "Proverbios 1:1"



  },



  {



    id: 861, difficulty: "intermedio", category: "historias",



    question: "?Que ciudad fue destruida por Asiria?",



    options: ["Jerusalen", "Samaria", "Betel", "Hebron"],



    correct: 1, reference: "2 Reyes 17:5-6"



  },



  {



    id: 862, difficulty: "intermedio", category: "historias",



    question: "?Quien fue deportado con Daniel?",



    options: ["Isaias", "Jeremias", "Ezequiel", "Amos"],



    correct: 2, reference: "Ezequiel 1:1-3"



  },



  {



    id: 863, difficulty: "intermedio", category: "historias",



    question: "?Que libro narra el retorno del exilio?",



    options: ["Ester", "Esdras", "Joel", "Rut"],



    correct: 1, reference: "Esdras 1:1"



  },



  {



    id: 864, difficulty: "intermedio", category: "historias",



    question: "?Que rey fue librado de Senaquerib?",



    options: ["Uzias", "Ezequias", "Josias", "Asa"],



    correct: 1, reference: "2 Reyes 19:35-36"



  },



  {



    id: 865, difficulty: "intermedio", category: "historias",



    question: "?Que profeta fue contemporaneo de Jeremias?",



    options: ["Daniel", "Joel", "Ezequiel", "Amos"],



    correct: 2, reference: "Ezequiel 1:1-3"



  },



  {



    id: 866, difficulty: "intermedio", category: "historias",



    question: "?Que libro relata el ministerio de Eliseo?",



    options: ["Reyes", "Samuel", "Jueces", "Cronicas"],



    correct: 0, reference: "2 Reyes 2-13"



  },



  {



    id: 867, difficulty: "intermedio", category: "historias",



    question: "?Que evento marco el inicio de la iglesia?",



    options: ["Exilio", "Navidad", "Pascua", "Pentecostes"],



    correct: 3, reference: "Hechos 2:1-4"



  },



  {



    id: 868, difficulty: "intermedio", category: "historias",



    question: "?Que rey perdio el reino por idolatria?",



    options: ["Josias", "Asa", "Jeroboam I", "Uzias"],



    correct: 2, reference: "1 Reyes 14:7-11"



  },



  {



    id: 869, difficulty: "intermedio", category: "historias",



    question: "?Que ciudad fue reconstruida primero tras el exilio?",



    options: ["Jerusalen", "Samaria", "Betel", "Dan"],



    correct: 0, reference: "Esdras 1:1-5"



  },



  {



    id: 870, difficulty: "intermedio", category: "historias",



    question: "?Que profeta reprendio a David?",



    options: ["Eli", "Natan", "Samuel", "Gad"],



    correct: 1, reference: "2 Samuel 12:1-7"



  },



  {



    id: 871, difficulty: "intermedio", category: "historias",



    question: "?Que libro cubre desde Saul hasta Salomon?",



    options: ["Cronicas", "Rut", "Reyes", "Samuel"],



    correct: 3, reference: "1-2 Samuel"



  },



  {



    id: 872, difficulty: "intermedio", category: "historias",



    question: "?Que imperio sucedio a Babilonia?",



    options: ["Romano", "Griego", "Persa", "Asirio"],



    correct: 2, reference: "Daniel 5:28-31"



  },



  {



    id: 873, difficulty: "intermedio", category: "historias",



    question: "?Que rey persa apoyo el templo?",



    options: ["Jerjes", "Artajerjes", "Ciro II", "Dario I"],



    correct: 3, reference: "Esdras 6:1-12"



  },



  {



    id: 874, difficulty: "intermedio", category: "historias",



    question: "?Que libro relata el reinado de David?",



    options: ["Jueces", "Reyes", "Rut", "Samuel"],



    correct: 3, reference: "2 Samuel"



  },



  {



    id: 875, difficulty: "intermedio", category: "historias",



    question: "?Que ciudad fue destruida en el ano 70 d.C.?",



    options: ["Jerusalen", "Antioquia", "Roma", "Alejandria"],



    correct: 0, reference: "Mateo 24:2"



  },



  {



    id: 876, difficulty: "intermedio", category: "historias",



    question: "?Que concilio aparece en Hechos 15?",



    options: ["Jerusalen", "Efeso", "Corinto", "Roma"],



    correct: 0, reference: "Hechos 15:1-29"



  },



  {



    id: 877, difficulty: "intermedio", category: "historias",



    question: "?Quien fue el primer martir?",



    options: ["Pedro", "Pablo", "Esteban", "Juan"],



    correct: 2, reference: "Hechos 7:59-60"



  },



  {



    id: 878, difficulty: "intermedio", category: "historias",



    question: "?Que rey fue castigado con lepra?",



    options: ["Josias", "Roboam", "Uzias", "Asa"],



    correct: 2, reference: "2 Cronicas 26:19-21"



  },



  {



    id: 879, difficulty: "intermedio", category: "historias",



    question: "?Que profeta anuncio destruccion a Ninive?",



    options: ["Jonas", "Amos", "Joel", "Nahum"],



    correct: 3, reference: "Nahum 1:1"



  },



  {



    id: 880, difficulty: "intermedio", category: "historias",



    question: "?Que rey fue llevado encadenado a Babilonia?",



    options: ["Josias", "Manases", "Uzias", "Asa"],



    correct: 1, reference: "2 Cronicas 33:11"



  },



  {



    id: 881, difficulty: "intermedio", category: "historias",



    question: "?Que libro describe la creacion detallada?",



    options: ["Salmos", "Job", "Genesis 1-2", "Exodo"],



    correct: 2, reference: "Genesis 1-2"



  },



  {



    id: 882, difficulty: "intermedio", category: "historias",



    question: "?Que apostol lidero la iglesia primitiva?",



    options: ["Pedro", "Marcos", "Juan", "Pablo"],



    correct: 0, reference: "Hechos 2:14"



  },



  {



    id: 883, difficulty: "intermedio", category: "historias",



    question: "?Que ciudad fue centro misionero?",



    options: ["Jerusalen", "Efeso", "Roma", "Antioquia"],



    correct: 3, reference: "Hechos 13:1-3"



  },



  {



    id: 884, difficulty: "intermedio", category: "historias",



    question: "?Que libro narra la reina Ester?",



    options: ["Ester", "Rut", "Joel", "Esdras"],



    correct: 0, reference: "Ester 1:1"



  },



  {



    id: 885, difficulty: "intermedio", category: "historias",



    question: "?Que profeta fue llevado al exilio?",



    options: ["Daniel", "Isaias", "Joel", "Amos"],



    correct: 0, reference: "Daniel 1:1-6"



  },



  {



    id: 886, difficulty: "intermedio", category: "historias",



    question: "?Que rey destruyo el altar de Betel?",



    options: ["Uzias", "Asa", "Roboam", "Josias"],



    correct: 3, reference: "2 Reyes 23:15"



  },



  {



    id: 887, difficulty: "intermedio", category: "historias",



    question: "?Que libro narra el ministerio de Samuel?",



    options: ["Cronicas", "Reyes", "Jueces", "Samuel"],



    correct: 3, reference: "1 Samuel"



  },



  {



    id: 888, difficulty: "intermedio", category: "historias",



    question: "?Que imperio controlaba Palestina en Hechos?",



    options: ["Asirio", "Romano", "Persa", "Griego"],



    correct: 1, reference: "Hechos 25:11"



  },



  {



    id: 889, difficulty: "intermedio", category: "historias",



    question: "?Que libro habla del cautiverio?",



    options: ["Rut", "Joel", "Daniel", "Ester"],



    correct: 2, reference: "Daniel 1:1-6"



  },



  {



    id: 890, difficulty: "intermedio", category: "historias",



    question: "?Que rey permitio reedificar el templo?",



    options: ["Artajerjes", "Nabucodonosor", "Jerjes", "Dario I"],



    correct: 3, reference: "Esdras 6:1-12"



  },



  {



    id: 891, difficulty: "intermedio", category: "historias",



    question: "?Que evento marco el fin del reino del norte?",



    options: ["Division", "Exilio a Babilonia", "Reforma", "Caida de Samaria"],



    correct: 3, reference: "2 Reyes 17:5-6"



  },



  {



    id: 892, difficulty: "intermedio", category: "historias",



    question: "?Que profeta vivio durante el exilio?",



    options: ["Joel", "Oseas", "Ezequiel", "Amos"],



    correct: 2, reference: "Ezequiel 1:1-3"



  },



  {



    id: 893, difficulty: "intermedio", category: "historias",



    question: "?Que libro conecta AT y NT?",



    options: ["Zacarias", "Amos", "Malaquias", "Joel"],



    correct: 2, reference: "Malaquias 4:5-6"



  },



  {



    id: 894, difficulty: "intermedio", category: "historias",



    question: "?Que rey restauro la adoracion verdadera?",



    options: ["Josias", "Acaz", "Roboam", "Manases"],



    correct: 0, reference: "2 Reyes 23:1-25"



  },



  // --- Vida de Jesus ---



  {



    id: 1450, difficulty: "intermedio", category: "vida_jesus",



    question: "?En que ciudad se celebraron las bodas donde Jesus convirtio el agua en vino?",



    options: ["Cana de Galilea", "Nazaret", "Capernaum", "Belen"],



    correct: 0, reference: "Juan 2:1-11"



  },



  {



    id: 1451, difficulty: "intermedio", category: "vida_jesus",



    question: "?Cuantas tinajas de agua mando Jesus llenar en las bodas de Cana?",



    options: ["Siete", "Cinco", "Seis", "Cuatro"],



    correct: 2, reference: "Juan 2:6"



  },



  {



    id: 1452, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que dijo Jesus que era mas dificil que un camello pasara por el ojo de una aguja?",



    options: ["Que un rico entrara en el reino de Dios", "Que un pobre entrara al templo", "Que un gentil se convirtiera", "Que un fariseo se arrepintiera"],



    correct: 0, reference: "Mateo 19:24"



  },



  {



    id: 1453, difficulty: "intermedio", category: "vida_jesus",



    question: "?Cual fue la primera bienaventuranza del Sermon del Monte?",



    options: ["Bienaventurados los pobres en espiritu", "Bienaventurados los pacificadores", "Bienaventurados los que lloran", "Bienaventurados los mansos"],



    correct: 0, reference: "Mateo 5:3"



  },



  {



    id: 1454, difficulty: "intermedio", category: "vida_jesus",



    question: "?En que monte predico Jesus el Sermon del Monte?",



    options: ["Monte de los Olivos", "Monte Hermon", "Un monte en Galilea", "Monte Tabor"],



    correct: 2, reference: "Mateo 5:1"



  },



  {



    id: 1455, difficulty: "intermedio", category: "vida_jesus",



    question: "?A quien le dijo Jesus 'Tu eres Pedro, y sobre esta roca edificare mi iglesia'?",



    options: ["A Santiago", "A Juan", "A Andres", "A Simon Pedro"],



    correct: 3, reference: "Mateo 16:18"



  },



  {



    id: 1456, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que discipulo camino sobre el agua hacia Jesus y luego comenzo a hundirse?",



    options: ["Andres", "Santiago", "Juan", "Pedro"],



    correct: 3, reference: "Mateo 14:28-31"



  },



  {



    id: 1457, difficulty: "intermedio", category: "vida_jesus",



    question: "?Cuantos panes y peces habia antes de la alimentacion de los cinco mil?",



    options: ["Siete panes y tres peces", "Tres panes y dos peces", "Dos panes y cinco peces", "Cinco panes y dos peces"],



    correct: 3, reference: "Mateo 14:17"



  },



  {



    id: 1458, difficulty: "intermedio", category: "vida_jesus",



    question: "?Quien ofrecio los cinco panes y dos peces en la alimentacion de los cinco mil?",



    options: ["Un fariseo", "Un soldado romano", "Un discipulo", "Un muchacho"],



    correct: 3, reference: "Juan 6:9"



  },



  {



    id: 1459, difficulty: "intermedio", category: "vida_jesus",



    question: "?Cuantas canastas sobraron despues de alimentar a los cuatro mil?",



    options: ["Doce", "Cinco", "Siete", "Tres"],



    correct: 2, reference: "Mateo 15:37"



  },



  {



    id: 1460, difficulty: "intermedio", category: "vida_jesus",



    question: "?En que parabola Jesus habla de un hombre que siembra buena semilla pero un enemigo siembra cizana?",



    options: ["Parabola del trigo y la cizana", "Parabola de la mostaza", "Parabola del sembrador", "Parabola de la red"],



    correct: 0, reference: "Mateo 13:24-30"



  },



  {



    id: 1461, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que representa la semilla que cae en buena tierra en la parabola del sembrador?",



    options: ["Los que persiguen a otros", "Los que oyen, entienden y dan fruto", "Los que oyen y no entienden", "Los que se apartan de la fe"],



    correct: 1, reference: "Mateo 13:23"



  },



  {



    id: 1462, difficulty: "intermedio", category: "vida_jesus",



    question: "?Cuantos talentos recibio el siervo que los enterro en la parabola de los talentos?",



    options: ["Diez", "Uno", "Dos", "Cinco"],



    correct: 1, reference: "Mateo 25:15,18"



  },



  {



    id: 1463, difficulty: "intermedio", category: "vida_jesus",



    question: "En la parabola del buen samaritano, ?que personas pasaron de largo antes que el samaritano?",



    options: ["Un anciano y un joven", "Un sacerdote y un levita", "Un soldado y un publicano", "Un fariseo y un escriba"],



    correct: 1, reference: "Lucas 10:31-32"



  },



  {



    id: 1464, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que pidio la madre de los hijos de Zebedeo a Jesus?",



    options: ["Que los bautizara", "Que se sentaran uno a su derecha y otro a su izquierda en su reino", "Que los sanara", "Que les diera pan"],



    correct: 1, reference: "Mateo 20:20-21"



  },



  {



    id: 1465, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que discipulo dijo 'Senor mio, y Dios mio' al ver a Jesus resucitado?",



    options: ["Felipe", "Juan", "Tomas", "Pedro"],



    correct: 2, reference: "Juan 20:28"



  },



  {



    id: 1466, difficulty: "intermedio", category: "vida_jesus",



    question: "?Cuantos dias despues de su resurreccion ascendio Jesus al cielo?",



    options: ["Cincuenta", "Tres", "Siete", "Cuarenta"],



    correct: 3, reference: "Hechos 1:3,9"



  },



  {



    id: 1467, difficulty: "intermedio", category: "vida_jesus",



    question: "?En que lugar ascendio Jesus al cielo?",



    options: ["Getsemani", "Monte Sinai", "Monte Tabor", "Monte de los Olivos"],



    correct: 3, reference: "Hechos 1:9-12"



  },



  {



    id: 1468, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que le dijo Jesus a Nicodemo sobre nacer de nuevo?",



    options: ["Que debia nacer en Belen", "Que debia circuncidarse nuevamente", "Que debia ayunar cuarenta dias", "Que debia nacer del agua y del Espiritu"],



    correct: 3, reference: "Juan 3:5"



  },



  {



    id: 1469, difficulty: "intermedio", category: "vida_jesus",



    question: "?En que ciudad Jesus hablo con la mujer samaritana junto al pozo?",



    options: ["Betania", "Jerusalen", "Sicar", "Nazaret"],



    correct: 2, reference: "Juan 4:5-7"



  },



  {



    id: 1470, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que le ofrecio Jesus a la mujer samaritana en el pozo de Jacob?",



    options: ["Agua viva", "Vino nuevo", "Pan de vida", "Aceite de uncion"],



    correct: 0, reference: "Juan 4:10"



  },



  {



    id: 1471, difficulty: "intermedio", category: "vida_jesus",



    question: "?Quien ungio los pies de Jesus con perfume costoso y los seco con sus cabellos?",



    options: ["Maria Magdalena", "La mujer samaritana", "Maria, hermana de Lazaro", "Marta"],



    correct: 2, reference: "Juan 12:3"



  },



  {



    id: 1472, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que discipulo se quejo del gasto del perfume con que ungieron a Jesus?",



    options: ["Judas Iscariote", "Tomas", "Pedro", "Mateo"],



    correct: 0, reference: "Juan 12:4-5"



  },



  {



    id: 1473, difficulty: "intermedio", category: "vida_jesus",



    question: "?En que jardin oro Jesus antes de ser arrestado?",



    options: ["El huerto de Jose", "Eden", "Getsemani", "El jardin del templo"],



    correct: 2, reference: "Mateo 26:36"



  },



  {



    id: 1474, difficulty: "intermedio", category: "vida_jesus",



    question: "?Cuantas veces oro Jesus en Getsemani antes de ser arrestado?",



    options: ["Dos", "Tres", "Una", "Cuatro"],



    correct: 1, reference: "Mateo 26:39-44"



  },



  {



    id: 1475, difficulty: "intermedio", category: "vida_jesus",



    question: "?Con que senal identifico Judas a Jesus ante los soldados?",



    options: ["Senalandolo con el dedo", "Entregandole una moneda", "Llamandolo por su nombre", "Con un beso"],



    correct: 3, reference: "Mateo 26:48-49"



  },



  {



    id: 1476, difficulty: "intermedio", category: "vida_jesus",



    question: "?Cuantas monedas de plata recibio Judas por entregar a Jesus?",



    options: ["Cuarenta", "Treinta", "Veinte", "Diez"],



    correct: 1, reference: "Mateo 26:15"



  },



  {



    id: 1477, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que discipulo corto la oreja de un siervo del sumo sacerdote al arrestar a Jesus?",



    options: ["Pedro", "Andres", "Santiago", "Juan"],



    correct: 0, reference: "Juan 18:10"



  },



  {



    id: 1478, difficulty: "intermedio", category: "vida_jesus",



    question: "?Como se llamaba el siervo del sumo sacerdote a quien Pedro le corto la oreja?",



    options: ["Barrabas", "Cleofas", "Nicodemo", "Malco"],



    correct: 3, reference: "Juan 18:10"



  },



  {



    id: 1479, difficulty: "intermedio", category: "vida_jesus",



    question: "?Cuantas veces nego Pedro conocer a Jesus?",



    options: ["Una", "Dos", "Cuatro", "Tres"],



    correct: 3, reference: "Mateo 26:69-75"



  },



  {



    id: 1480, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que animal canto despues de que Pedro nego a Jesus por tercera vez?",



    options: ["Un cordero balo", "Un burro rebuzno", "Un gallo canto", "Una paloma arrullo"],



    correct: 2, reference: "Mateo 26:74-75"



  },



  {



    id: 1481, difficulty: "intermedio", category: "vida_jesus",



    question: "?Ante que gobernador romano fue juzgado Jesus?",



    options: ["Herodes", "Pilato", "Cesar", "Felix"],



    correct: 1, reference: "Mateo 27:2"



  },



  {



    id: 1482, difficulty: "intermedio", category: "vida_jesus",



    question: "?A quien libero Pilato en lugar de Jesus por peticion del pueblo?",



    options: ["Judas", "Barrabas", "Simon de Cirene", "Malco"],



    correct: 1, reference: "Mateo 27:26"



  },



  {



    id: 1483, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que inscripcion fue colocada sobre la cruz de Jesus?",



    options: ["Hijo de Dios", "Rey de los judios", "Profeta de Nazaret", "Maestro de Israel"],



    correct: 1, reference: "Juan 19:19"



  },



  {



    id: 1484, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que sucedio con el velo del templo cuando Jesus murio?",



    options: ["Cambio de color", "Se quemo", "Desaparecio", "Se rasgo en dos de arriba abajo"],



    correct: 3, reference: "Mateo 27:51"



  },



  {



    id: 1485, difficulty: "intermedio", category: "vida_jesus",



    question: "?Quien pidio el cuerpo de Jesus a Pilato para sepultarlo?",



    options: ["Pedro", "Jose de Arimatea", "Juan", "Nicodemo"],



    correct: 1, reference: "Mateo 27:57-58"



  },



  {



    id: 1486, difficulty: "intermedio", category: "vida_jesus",



    question: "?Quien fue la primera persona en ver a Jesus resucitado?",



    options: ["Maria Magdalena", "Juan", "Pedro", "Tomas"],



    correct: 0, reference: "Marcos 16:9"



  },



  {



    id: 1487, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que hicieron los discipulos de Emaus cuando reconocieron a Jesus resucitado?",



    options: ["Se quedaron en silencio", "Se arrodillaron", "Regresaron inmediatamente a Jerusalen", "Huyeron de miedo"],



    correct: 2, reference: "Lucas 24:33"



  },



  {



    id: 1488, difficulty: "intermedio", category: "vida_jesus",



    question: "?Cuantos discipulos iban camino a Emaus cuando Jesus se les aparecio?",



    options: ["Dos", "Cuatro", "Uno", "Tres"],



    correct: 0, reference: "Lucas 24:13"



  },



  {



    id: 1489, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que le pidio Jesus resucitado a Pedro tres veces junto al mar de Tiberias?",



    options: ["Que ayunara", "Que lo siguiera al templo", "Que predicara", "Que apacentara sus ovejas"],



    correct: 3, reference: "Juan 21:15-17"



  },



  {



    id: 1490, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que enseno Jesus sobre la oracion en el Sermon del Monte?",



    options: ["Orar solo en el templo", "Orar solo los sabados", "Orar en secreto y Dios recompensara", "Orar en publico para ser vistos"],



    correct: 2, reference: "Mateo 6:6"



  },



  {



    id: 1491, difficulty: "intermedio", category: "vida_jesus",



    question: "?En que parabola Jesus habla de diez virgenes esperando al esposo?",



    options: ["Parabola de la vina", "Parabola de los talentos", "Parabola de las diez virgenes", "Parabola del banquete"],



    correct: 2, reference: "Mateo 25:1-13"



  },



  {



    id: 1492, difficulty: "intermedio", category: "vida_jesus",



    question: "?Cuantas virgenes prudentes y cuantas insensatas habia en la parabola?",



    options: ["Tres y siete", "Cuatro y seis", "Cinco y cinco", "Seis y cuatro"],



    correct: 2, reference: "Mateo 25:2"



  },



  {



    id: 1493, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que impuesto pago Jesus con una moneda encontrada en la boca de un pez?",



    options: ["El tributo al Cesar", "El impuesto del templo (las dos dracmas)", "El diezmo del templo", "El impuesto romano"],



    correct: 1, reference: "Mateo 17:24-27"



  },



  {



    id: 1494, difficulty: "intermedio", category: "vida_jesus",



    question: "?En que ciudad vivia Zaqueo, el publicano que subio a un arbol para ver a Jesus?",



    options: ["Jerusalen", "Jerico", "Capernaum", "Betania"],



    correct: 1, reference: "Lucas 19:1-4"



  },



  {



    id: 1495, difficulty: "intermedio", category: "vida_jesus",



    question: "?A que tipo de arbol se subio Zaqueo para ver a Jesus?",



    options: ["Una palmera", "Una higuera", "Un sicomoro", "Un olivo"],



    correct: 2, reference: "Lucas 19:4"



  },



  {



    id: 1496, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que accion realizo Jesus al entrar al templo durante la Semana de la Pasion?",



    options: ["Oro en silencio", "Expulso a los mercaderes y cambistas", "Predico un sermon", "Sano a los enfermos"],



    correct: 1, reference: "Mateo 21:12-13"



  },



  {



    id: 1497, difficulty: "intermedio", category: "vida_jesus",



    question: "?Sobre que animal entro Jesus triunfalmente a Jerusalen?",



    options: ["Un burro (pollino)", "Un camello", "Un caballo", "Un buey"],



    correct: 0, reference: "Mateo 21:5-7"



  },



  {



    id: 1498, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que gritaba la multitud cuando Jesus entro a Jerusalen el Domingo de Ramos?",



    options: ["!Amen!", "!Aleluya!", "!Hosanna al Hijo de David!", "!Gloria a Dios!"],



    correct: 2, reference: "Mateo 21:9"



  },



  {



    id: 1499, difficulty: "intermedio", category: "vida_jesus",



    question: "?Que les lavo Jesus a sus discipulos durante la ultima cena como ejemplo de servicio?",



    options: ["La cabeza", "Los pies", "El rostro", "Las manos"],



    correct: 1, reference: "Juan 13:5"



  },



  // --- Milagros ---



  {



    id: 1650, difficulty: "intermedio", category: "milagros",



    question: "?Cuantas canastas sobraron despues de alimentar a los 5,000?",



    options: ["5", "12", "10", "7"],



    correct: 1, reference: "Mateo 14:20"



  },



  {



    id: 1651, difficulty: "intermedio", category: "milagros",



    question: "?Cuantas canastas sobraron despues de alimentar a los 4,000?",



    options: ["7", "5", "12", "3"],



    correct: 0, reference: "Mateo 15:37"



  },



  {



    id: 1652, difficulty: "intermedio", category: "milagros",



    question: "?Que le ordeno Jesus al leproso despues de sanarlo segun Marcos?",



    options: ["Que se lavara en el Jordan", "Que predicara en el templo", "Que ayunara 7 dias", "Que se mostrara al sacerdote"],



    correct: 3, reference: "Marcos 1:44"



  },



  {



    id: 1653, difficulty: "intermedio", category: "milagros",



    question: "?Que hizo la mujer con flujo de sangre para ser sanada?",



    options: ["Toco el borde de su manto", "Le lavo los pies", "Grito a Jesus", "Se arrodillo ante el"],



    correct: 0, reference: "Marcos 5:27-28"



  },



  {



    id: 1654, difficulty: "intermedio", category: "milagros",



    question: "?Cuantos anos llevaba enfermo el paralitico del estanque de Betesda?",



    options: ["30", "18", "12", "38"],



    correct: 3, reference: "Juan 5:5"



  },



  {



    id: 1655, difficulty: "intermedio", category: "milagros",



    question: "?Que instruccion le dio Jesus al ciego de nacimiento para completar su sanidad?",



    options: ["Que orara en el templo", "Que ayunara tres dias", "Que se lavara en el estanque de Siloe", "Que buscara a un sacerdote"],



    correct: 2, reference: "Juan 9:7"



  },



  {



    id: 1656, difficulty: "intermedio", category: "milagros",



    question: "?Cuantos dias llevaba muerto Lazaro cuando Jesus llego a Betania?",



    options: ["4", "2", "7", "3"],



    correct: 0, reference: "Juan 11:17"



  },



  {



    id: 1657, difficulty: "intermedio", category: "milagros",



    question: "?Quien le dijo a Jesus 'Si hubieras estado aqui, mi hermano no habria muerto'?",



    options: ["Tanto Marta como Maria", "Maria solamente", "Los discipulos", "Marta solamente"],



    correct: 0, reference: "Juan 11:21,32"



  },



  {



    id: 1658, difficulty: "intermedio", category: "milagros",



    question: "?En que ciudad Jesus resucito al hijo de una viuda?",



    options: ["Jerico", "Capernaum", "Nain", "Betania"],



    correct: 2, reference: "Lucas 7:11-15"



  },



  {



    id: 1659, difficulty: "intermedio", category: "milagros",



    question: "?Como se llamaba la hija de Jairo que Jesus resucito?",



    options: ["Tabita", "Rut", "No se menciona su nombre", "Maria"],



    correct: 2, reference: "Marcos 5:22-43"



  },



  {



    id: 1660, difficulty: "intermedio", category: "milagros",



    question: "?Que edad tenia la hija de Jairo cuando fue resucitada?",



    options: ["12 anos", "15 anos", "10 anos", "7 anos"],



    correct: 0, reference: "Marcos 5:42"



  },



  {



    id: 1661, difficulty: "intermedio", category: "milagros",



    question: "?Que le dijo Jesus a la hija de Jairo para resucitarla?",



    options: ["Talita cumi", "Lazaro, ven fuera", "Efata", "Levantate y anda"],



    correct: 0, reference: "Marcos 5:41"



  },



  {



    id: 1662, difficulty: "intermedio", category: "milagros",



    question: "?En que boda Jesus convirtio el agua en vino?",



    options: ["En Nazaret", "En Betania", "En Jerusalen", "En Cana de Galilea"],



    correct: 3, reference: "Juan 2:1-11"



  },



  {



    id: 1663, difficulty: "intermedio", category: "milagros",



    question: "?Cuantas tinajas de agua se usaron en el milagro de las bodas de Cana?",



    options: ["10", "8", "4", "6"],



    correct: 3, reference: "Juan 2:6"



  },



  {



    id: 1664, difficulty: "intermedio", category: "milagros",



    question: "?Que profeta multiplico el aceite de una viuda para pagar sus deudas?",



    options: ["Eliseo", "Elias", "Samuel", "Isaias"],



    correct: 0, reference: "2 Reyes 4:1-7"



  },



  {



    id: 1665, difficulty: "intermedio", category: "milagros",



    question: "?Que profeta resucito al hijo de la sunamita?",



    options: ["Moises", "Elias", "Eliseo", "Samuel"],



    correct: 2, reference: "2 Reyes 4:32-37"



  },



  {



    id: 1666, difficulty: "intermedio", category: "milagros",



    question: "?Que profeta resucito al hijo de la viuda de Sarepta?",



    options: ["Elias", "Isaias", "Eliseo", "Jeremias"],



    correct: 0, reference: "1 Reyes 17:17-24"



  },



  {



    id: 1667, difficulty: "intermedio", category: "milagros",



    question: "?Que metodo uso Jesus para sanar al ciego de Betsaida?",



    options: ["Le escupio en los ojos y puso sus manos", "Le puso barro en los ojos", "Le lavo con agua", "Solo le hablo"],



    correct: 0, reference: "Marcos 8:22-25"



  },



  {



    id: 1668, difficulty: "intermedio", category: "milagros",



    question: "?Cuantas veces impuso Jesus las manos al ciego de Betsaida para sanarlo completamente?",



    options: ["Tres", "Una", "Dos", "No le impuso manos"],



    correct: 2, reference: "Marcos 8:23-25"



  },



  {



    id: 1669, difficulty: "intermedio", category: "milagros",



    question: "?En que lago calmo Jesus la tempestad?",



    options: ["Mar Muerto", "Mar de Galilea", "Rio Jordan", "Mar Mediterraneo"],



    correct: 1, reference: "Marcos 4:39"



  },



  {



    id: 1670, difficulty: "intermedio", category: "milagros",



    question: "?Que hacia Jesus cuando se desato la tempestad en el mar?",



    options: ["Predicaba", "Oraba", "Pescaba", "Dormia"],



    correct: 3, reference: "Marcos 4:38"



  },



  {



    id: 1671, difficulty: "intermedio", category: "milagros",



    question: "?Como se llamaba el endemoniado gadareno que Jesus libero?",



    options: ["Simon", "No se da su nombre personal", "Barrabas", "Legion"],



    correct: 1, reference: "Marcos 5:9"



  },



  {



    id: 1672, difficulty: "intermedio", category: "milagros",



    question: "?A que animales entraron los demonios del endemoniado gadareno?",



    options: ["Cabras", "Ovejas", "Cerdos", "Bueyes"],



    correct: 2, reference: "Marcos 5:13"



  },



  {



    id: 1673, difficulty: "intermedio", category: "milagros",



    question: "?Cuantos cerdos se ahogaron cuando los demonios entraron en ellos?",



    options: ["Unos 5,000", "Unos 500", "Unos 2,000", "Unos 1,000"],



    correct: 2, reference: "Marcos 5:13"



  },



  {



    id: 1674, difficulty: "intermedio", category: "milagros",



    question: "?Que discipulo camino sobre el agua hacia Jesus?",



    options: ["Pedro", "Juan", "Andres", "Santiago"],



    correct: 0, reference: "Mateo 14:29"



  },



  {



    id: 1675, difficulty: "intermedio", category: "milagros",



    question: "?Que causo que Pedro comenzara a hundirse al caminar sobre el agua?",



    options: ["La oscuridad", "El viento fuerte y el miedo", "Una ola grande", "El peso de su ropa"],



    correct: 1, reference: "Mateo 14:30"



  },



  {



    id: 1676, difficulty: "intermedio", category: "milagros",



    question: "?Que encontro Pedro en la boca de un pez por instruccion de Jesus?",



    options: ["Una moneda", "Una llave", "Un anillo", "Una perla"],



    correct: 0, reference: "Mateo 17:27"



  },



  {



    id: 1677, difficulty: "intermedio", category: "milagros",



    question: "?Para que sirvio la moneda que Pedro encontro en el pez?",



    options: ["Para dar ofrenda", "Para comprar perfume", "Para comprar pan", "Para pagar el impuesto del templo"],



    correct: 3, reference: "Mateo 17:24-27"



  },



  {



    id: 1678, difficulty: "intermedio", category: "milagros",



    question: "?Que le paso a la higuera que Jesus maldijo?",



    options: ["Dio fruto al instante", "Fue cortada", "Se seco", "Cayo un rayo sobre ella"],



    correct: 2, reference: "Marcos 11:20-21"



  },



  {



    id: 1679, difficulty: "intermedio", category: "milagros",



    question: "?A cuantos leprosos sano Jesus que iban camino a Jerusalen?",



    options: ["10", "3", "7", "12"],



    correct: 0, reference: "Lucas 17:12-14"



  },



  {



    id: 1680, difficulty: "intermedio", category: "milagros",



    question: "?Cuantos de los diez leprosos regresaron a dar gracias a Jesus?",



    options: ["Uno", "Tres", "Cinco", "Ninguno"],



    correct: 0, reference: "Lucas 17:15-16"



  },



  {



    id: 1681, difficulty: "intermedio", category: "milagros",



    question: "?De que nacionalidad era el leproso que regreso a agradecer a Jesus?",



    options: ["Samaritano", "Romano", "Griego", "Judio"],



    correct: 0, reference: "Lucas 17:16"



  },



  {



    id: 1682, difficulty: "intermedio", category: "milagros",



    question: "?Que parte del cuerpo le fue restaurada al hombre en la sinagoga?",



    options: ["La pierna", "El oido", "La mano seca", "El ojo"],



    correct: 2, reference: "Marcos 3:1-5"



  },



  {



    id: 1683, difficulty: "intermedio", category: "milagros",



    question: "?En que dia de la semana sano Jesus al hombre de la mano seca?",



    options: ["Lunes", "Sabado", "Viernes", "Primer dia de la semana"],



    correct: 1, reference: "Marcos 3:2"



  },



  {



    id: 1684, difficulty: "intermedio", category: "milagros",



    question: "?A quien sano Jesus cortandole la oreja que Pedro le habia cortado?",



    options: ["Un fariseo", "Malco, siervo del sumo sacerdote", "Un soldado romano", "Un escriba"],



    correct: 1, reference: "Lucas 22:50-51; Juan 18:10"



  },



  {



    id: 1685, difficulty: "intermedio", category: "milagros",



    question: "?Que apostol sano a un cojo en la puerta del templo llamada la Hermosa?",



    options: ["Pablo", "Santiago", "Juan solo", "Pedro y Juan"],



    correct: 3, reference: "Hechos 3:1-8"



  },



  {



    id: 1686, difficulty: "intermedio", category: "milagros",



    question: "?Que le dijo Pedro al cojo de la puerta la Hermosa antes de sanarlo?",



    options: ["Tu fe te ha sanado", "Se sano en el nombre de Jesus", "Levantate y anda", "No tengo plata ni oro, pero lo que tengo te doy"],



    correct: 3, reference: "Hechos 3:6"



  },



  {



    id: 1687, difficulty: "intermedio", category: "milagros",



    question: "?A quien resucito Pedro en Jope?",



    options: ["Priscila", "Tabita (Dorcas)", "Lidia", "Maria"],



    correct: 1, reference: "Hechos 9:36-41"



  },



  {



    id: 1688, difficulty: "intermedio", category: "milagros",



    question: "?Que joven resucito Pablo despues de caer de una ventana en Troas?",



    options: ["Filemon", "Tito", "Eutico", "Timoteo"],



    correct: 2, reference: "Hechos 20:9-12"



  },



  {



    id: 1689, difficulty: "intermedio", category: "milagros",



    question: "?Desde que piso cayo Eutico antes de ser resucitado por Pablo?",



    options: ["El techo", "Tercer piso", "Cuarto piso", "Segundo piso"],



    correct: 1, reference: "Hechos 20:9"



  },



  {



    id: 1690, difficulty: "intermedio", category: "milagros",



    question: "?Que plaga envio Dios como la decima plaga sobre Egipto?",



    options: ["Tinieblas", "Langostas", "Muerte de los primogenitos", "Granizo"],



    correct: 2, reference: "Exodo 12:29"



  },



  {



    id: 1691, difficulty: "intermedio", category: "milagros",



    question: "?Que milagro ocurrio cuando los israelitas cruzaron el Mar Rojo?",



    options: ["El mar se seco completamente", "El agua se convirtio en tierra", "Las aguas se dividieron en dos", "Aparecio un puente"],



    correct: 2, reference: "Exodo 14:21-22"



  },



  {



    id: 1692, difficulty: "intermedio", category: "milagros",



    question: "?Que alimento envio Dios del cielo para alimentar a Israel en el desierto?",



    options: ["Trigo", "Frutas", "Mana", "Pan y pescado"],



    correct: 2, reference: "Exodo 16:14-15"



  },



  {



    id: 1693, difficulty: "intermedio", category: "milagros",



    question: "?De donde saco Moises agua para el pueblo en el desierto?",



    options: ["De un pozo profundo", "De un rio subterraneo", "De una roca", "Del cielo"],



    correct: 2, reference: "Exodo 17:6"



  },



  {



    id: 1694, difficulty: "intermedio", category: "milagros",



    question: "?Que milagro hizo Eliseo con las aguas de Jerico?",



    options: ["Las sano echando sal", "Las hizo brotar del suelo", "Las convirtio en vino", "Las dividio"],



    correct: 0, reference: "2 Reyes 2:19-22"



  },



  {



    id: 1695, difficulty: "intermedio", category: "milagros",



    question: "?Que le sucedio a Naaman al sumergirse siete veces en el Jordan?",



    options: ["Fue sanado de su lepra", "Aprendio a nadar", "Recibio fuerza sobrenatural", "Tuvo una vision"],



    correct: 0, reference: "2 Reyes 5:14"



  },



  {



    id: 1696, difficulty: "intermedio", category: "milagros",



    question: "?Que profeta le indico a Naaman que se lavara en el Jordan?",



    options: ["Elias", "Isaias", "Jeremias", "Eliseo"],



    correct: 3, reference: "2 Reyes 5:10"



  },



  {



    id: 1697, difficulty: "intermedio", category: "milagros",



    question: "?Que milagro realizo Jesus con la suegra de Pedro?",



    options: ["La resucito", "Le devolvio la vista", "Le sano la mano", "La sano de una fiebre"],



    correct: 3, reference: "Marcos 1:30-31"



  },



  {



    id: 1698, difficulty: "intermedio", category: "milagros",



    question: "?Que sucedio inmediatamente despues de que Jesus sano a la suegra de Pedro?",



    options: ["Ella salio a predicar", "Ella lloro de alegria", "Ella fue al templo", "Ella se levanto y les servia"],



    correct: 3, reference: "Marcos 1:31"



  },



  {



    id: 1699, difficulty: "intermedio", category: "milagros",



    question: "?Que milagro hizo Jesus en la pesca cuando Pedro no habia atrapado nada toda la noche?",



    options: ["Convirtio piedras en peces", "Hizo que los peces saltaran al barco", "Calmo el mar", "Lleno las redes de tantos peces que se rompian"],



    correct: 3, reference: "Lucas 5:4-7"



  },



  // ===================== DIFICIL =====================



  // --- Libros Dificil (50 preguntas) ---



  {



    id: 300, difficulty: "dificil", category: "libros",



    question: "?En que libro aparece por primera vez la palabra 'pacto'?",



    options: ["Exodo", "Deuteronomio", "Levitico", "Genesis"],



    correct: 3, reference: "Genesis 6:18"



  },



  {



    id: 301, difficulty: "dificil", category: "libros",



    question: "?Que libro registra el pacto con Finees?",



    options: ["Numeros", "Levitico", "Josue", "Jueces"],



    correct: 0, reference: "Numeros 25:12-13"



  },



  {



    id: 302, difficulty: "dificil", category: "libros",



    question: "?En que libro se menciona la serpiente de bronce?",



    options: ["Exodo", "Josue", "Numeros", "Deuteronomio"],



    correct: 2, reference: "Numeros 21:8-9"



  },



  {



    id: 303, difficulty: "dificil", category: "libros",



    question: "?Que libro detalla la bendicion de Jacob a sus hijos?",



    options: ["Genesis", "Numeros", "Exodo", "Levitico"],



    correct: 0, reference: "Genesis 49"



  },



  {



    id: 304, difficulty: "dificil", category: "libros",



    question: "?En que libro aparece el cantico de Moises despues del Mar Rojo?",



    options: ["Numeros", "Deuteronomio", "Josue", "Exodo"],



    correct: 3, reference: "Exodo 15:1-18"



  },



  {



    id: 305, difficulty: "dificil", category: "libros",



    question: "?Que libro registra la rebelion de Core?",



    options: ["Levitico", "Josue", "Numeros", "Reyes"],



    correct: 2, reference: "Numeros 16"



  },



  {



    id: 306, difficulty: "dificil", category: "libros",



    question: "?En que libro se detalla la division de la tierra por tribus?",



    options: ["Josue", "Jueces", "Rut", "Samuel"],



    correct: 0, reference: "Josue 13-21"



  },



  {



    id: 307, difficulty: "dificil", category: "libros",



    question: "?Que libro contiene la oracion de dedicacion del templo?",



    options: ["Nehemias", "Cronicas", "1 Reyes", "2 Reyes"],



    correct: 2, reference: "1 Reyes 8:22-53"



  },



  {



    id: 308, difficulty: "dificil", category: "libros",



    question: "?En que libro se menciona a Hulda la profetisa?",



    options: ["Isaias", "Jeremias", "1 Reyes", "2 Reyes"],



    correct: 3, reference: "2 Reyes 22:14"



  },



  {



    id: 309, difficulty: "dificil", category: "libros",



    question: "?Que libro registra el hallazgo del libro de la ley en tiempos de Josias?",



    options: ["2 Reyes", "Cronicas", "Nehemias", "Esdras"],



    correct: 0, reference: "2 Reyes 22:8"



  },



  {



    id: 310, difficulty: "dificil", category: "libros",



    question: "?En que libro aparece la vision del trono con serafines?",



    options: ["Jeremias", "Isaias", "Daniel", "Ezequiel"],



    correct: 1, reference: "Isaias 6:1-4"



  },



  {



    id: 311, difficulty: "dificil", category: "libros",



    question: "?Que libro contiene el 'siervo sufriente'?",



    options: ["Jeremias", "Isaias", "Amos", "Oseas"],



    correct: 1, reference: "Isaias 52:13-53:12"



  },



  {



    id: 312, difficulty: "dificil", category: "libros",



    question: "?En que libro se describen ruedas llenas de ojos?",



    options: ["Ezequiel", "Zacarias", "Daniel", "Joel"],



    correct: 0, reference: "Ezequiel 1:15-18"



  },



  {



    id: 313, difficulty: "dificil", category: "libros",



    question: "?Que libro registra el ayuno de Ninive?",



    options: ["Nahum", "Jonas", "Sofonias", "Habacuc"],



    correct: 1, reference: "Jonas 3:5-10"



  },



  {



    id: 314, difficulty: "dificil", category: "libros",



    question: "?En que libro aparece 'aunque la higuera no florezca'?",



    options: ["Oseas", "Joel", "Amos", "Habacuc"],



    correct: 3, reference: "Habacuc 3:17-18"



  },



  {



    id: 315, difficulty: "dificil", category: "libros",



    question: "?Que libro contiene visiones del sumo sacerdote Josue?",



    options: ["Malaquias", "Zacarias", "Joel", "Ageo"],



    correct: 1, reference: "Zacarias 3:1-5"



  },



  {



    id: 316, difficulty: "dificil", category: "libros",



    question: "?En que libro se promete un nuevo pacto?",



    options: ["Isaias", "Ezequiel", "Jeremias", "Daniel"],



    correct: 2, reference: "Jeremias 31:31-34"



  },



  {



    id: 317, difficulty: "dificil", category: "libros",



    question: "?Que libro menciona al 'Renuevo'?",



    options: ["Oseas", "Joel", "Jeremias", "Zacarias"],



    correct: 3, reference: "Zacarias 6:12"



  },



  {



    id: 318, difficulty: "dificil", category: "libros",



    question: "?En que evangelio Jesus es presentado como Rey?",



    options: ["Mateo", "Juan", "Lucas", "Marcos"],



    correct: 0, reference: "Mateo 2:2"



  },



  {



    id: 319, difficulty: "dificil", category: "libros",



    question: "?Que evangelio destaca a Jesus como Siervo?",



    options: ["Juan", "Mateo", "Lucas", "Marcos"],



    correct: 3, reference: "Marcos 10:45"



  },



  {



    id: 320, difficulty: "dificil", category: "libros",



    question: "?En que libro aparece la transfiguracion primero?",



    options: ["Mateo", "Marcos", "Juan", "Lucas"],



    correct: 0, reference: "Mateo 17:1-9"



  },



  {



    id: 321, difficulty: "dificil", category: "libros",



    question: "?Que libro registra el discurso en Pentecostes?",



    options: ["Romanos", "Juan", "Galatas", "Hechos"],



    correct: 3, reference: "Hechos 2:14-36"



  },



  {



    id: 322, difficulty: "dificil", category: "libros",



    question: "?En que libro Pablo cita mas el Antiguo Testamento?",



    options: ["Corintios", "Romanos", "Galatas", "Efesios"],



    correct: 1, reference: "Romanos"



  },



  {



    id: 323, difficulty: "dificil", category: "libros",



    question: "?Que libro explica el ministerio de la reconciliacion?",



    options: ["Tito", "Galatas", "1 Corintios", "2 Corintios"],



    correct: 3, reference: "2 Corintios 5:18-20"



  },



  {



    id: 324, difficulty: "dificil", category: "libros",



    question: "?En que libro se habla del 'aguijon en la carne'?",



    options: ["Colosenses", "Filipenses", "2 Corintios", "Romanos"],



    correct: 2, reference: "2 Corintios 12:7"



  },



  {



    id: 325, difficulty: "dificil", category: "libros",



    question: "?Que libro combate el legalismo judio?",



    options: ["Galatas", "Hebreos", "Efesios", "Tito"],



    correct: 0, reference: "Galatas 3:1-5"



  },



  {



    id: 326, difficulty: "dificil", category: "libros",



    question: "?En que libro Pablo explica la predestinacion?",



    options: ["Tito", "Romanos", "Efesios", "Filipenses"],



    correct: 2, reference: "Efesios 1:4-5"



  },



  {



    id: 327, difficulty: "dificil", category: "libros",



    question: "?Que libro enfatiza la ciudadania celestial?",



    options: ["Filipenses", "Pedro", "Hebreos", "Colosenses"],



    correct: 0, reference: "Filipenses 3:20"



  },



  {



    id: 328, difficulty: "dificil", category: "libros",



    question: "?En que libro se presenta a Cristo como sumo sacerdote eterno?",



    options: ["Romanos", "Judas", "Pedro", "Hebreos"],



    correct: 3, reference: "Hebreos 4:14-16"



  },



  {



    id: 329, difficulty: "dificil", category: "libros",



    question: "?Que libro exhorta a contender por la fe?",



    options: ["Judas", "Juan", "Pedro", "Tito"],



    correct: 0, reference: "Judas 1:3"



  },



  {



    id: 330, difficulty: "dificil", category: "libros",



    question: "?En que libro se menciona a Balaam como ejemplo negativo?",



    options: ["Juan", "Judas", "Pedro", "Tito"],



    correct: 1, reference: "Judas 1:11"



  },



  {



    id: 331, difficulty: "dificil", category: "libros",



    question: "?Que libro habla de cielos nuevos y tierra nueva?",



    options: ["Daniel", "Isaias", "Apocalipsis", "Joel"],



    correct: 2, reference: "Apocalipsis 21:1"



  },



  {



    id: 332, difficulty: "dificil", category: "libros",



    question: "?En que libro aparece Gog y Magog?",



    options: ["Apocalipsis", "Isaias", "Zacarias", "Daniel"],



    correct: 0, reference: "Apocalipsis 20:8"



  },



  {



    id: 333, difficulty: "dificil", category: "libros",



    question: "?Que libro contiene las trompetas del juicio?",



    options: ["Zacarias", "Daniel", "Apocalipsis", "Joel"],



    correct: 2, reference: "Apocalipsis 8-9"



  },



  {



    id: 334, difficulty: "dificil", category: "libros",



    question: "?En que libro se describe el lago de fuego?",



    options: ["Judas", "Pedro", "Apocalipsis", "Mateo"],



    correct: 2, reference: "Apocalipsis 20:14-15"



  },



  {



    id: 335, difficulty: "dificil", category: "libros",



    question: "?Que libro muestra a Cristo con ojos como llama?",



    options: ["Daniel", "Isaias", "Apocalipsis", "Juan"],



    correct: 2, reference: "Apocalipsis 1:14"



  },



  {



    id: 336, difficulty: "dificil", category: "libros",



    question: "?En que libro se habla del arrebatamiento?",



    options: ["Hebreos", "Tito", "Romanos", "1 Tesalonicenses"],



    correct: 3, reference: "1 Tesalonicenses 4:16-17"



  },



  {



    id: 337, difficulty: "dificil", category: "libros",



    question: "?Que libro contiene la profecia del hombre de pecado?",



    options: ["2 Tesalonicenses", "Efesios", "Tito", "Filemon"],



    correct: 0, reference: "2 Tesalonicenses 2:3-4"



  },



  {



    id: 338, difficulty: "dificil", category: "libros",



    question: "?En que libro se exhorta a guardar el buen deposito?",



    options: ["Pedro", "Hebreos", "Tito", "2 Timoteo"],



    correct: 3, reference: "2 Timoteo 1:14"



  },



  {



    id: 339, difficulty: "dificil", category: "libros",



    question: "?Que libro presenta a Cristo como Pastor supremo?",



    options: ["1 Pedro", "Judas", "Juan", "Hebreos"],



    correct: 0, reference: "1 Pedro 5:4"



  },



  {



    id: 340, difficulty: "dificil", category: "libros",



    question: "?En que libro se menciona la segunda muerte?",



    options: ["Apocalipsis", "Joel", "Daniel", "Isaias"],



    correct: 0, reference: "Apocalipsis 20:14"



  },



  {



    id: 341, difficulty: "dificil", category: "libros",



    question: "?Que libro describe la bestia del mar?",



    options: ["Joel", "Apocalipsis", "Daniel", "Zacarias"],



    correct: 1, reference: "Apocalipsis 13:1"



  },



  {



    id: 342, difficulty: "dificil", category: "libros",



    question: "?En que libro se habla del rollo sellado?",



    options: ["Jeremias", "Apocalipsis", "Oseas", "Isaias"],



    correct: 1, reference: "Apocalipsis 5:1-5"



  },



  {



    id: 343, difficulty: "dificil", category: "libros",



    question: "?Que libro contiene las siete bienaventuranzas profeticas?",



    options: ["Juan", "Lucas", "Apocalipsis", "Mateo"],



    correct: 2, reference: "Apocalipsis 1:3; 14:13; 16:15; 19:9; 20:6; 22:7; 22:14"



  },



  {



    id: 344, difficulty: "dificil", category: "libros",



    question: "?En que libro se menciona al 'testigo fiel y verdadero'?",



    options: ["Juan", "Pedro", "Hebreos", "Apocalipsis"],



    correct: 3, reference: "Apocalipsis 3:14"



  },



  {



    id: 345, difficulty: "dificil", category: "libros",



    question: "?Que libro conecta Genesis con Apocalipsis tematicamente?",



    options: ["Tito", "Galatas", "Romanos", "Hebreos"],



    correct: 3, reference: "Hebreos"



  },



  {



    id: 346, difficulty: "dificil", category: "libros",



    question: "?En que libro se cita a Enoc profetizando?",



    options: ["Juan", "Judas", "Tito", "Pedro"],



    correct: 1, reference: "Judas 1:14-15"



  },



  {



    id: 347, difficulty: "dificil", category: "libros",



    question: "?Que libro enfatiza el reposo espiritual?",



    options: ["Juan", "Pedro", "Romanos", "Hebreos"],



    correct: 3, reference: "Hebreos 4:1-11"



  },



  {



    id: 348, difficulty: "dificil", category: "libros",



    question: "?En que libro se presenta el misterio revelado a los gentiles?",



    options: ["Tito", "Efesios", "Romanos", "Judas"],



    correct: 1, reference: "Efesios 3:3-6"



  },



  {



    id: 349, difficulty: "dificil", category: "libros",



    question: "?Que libro une historia, profecia y escatologia?",



    options: ["Isaias", "Oseas", "Jeremias", "Daniel"],



    correct: 3, reference: "Daniel"



  },



  // --- Personajes Dificil (50 preguntas) ---



  {



    id: 59, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre del profeta Samuel?",



    options: ["Natan", "Isai", "Elcana", "Abner"],



    correct: 2, reference: "1 Samuel 1:1"



  },



  {



    id: 60, difficulty: "dificil", category: "personajes",



    question: "?Quien fue la esposa de Moises?",



    options: ["Rut", "Sefora", "Rebeca", "Lea"],



    correct: 1, reference: "Exodo 2:21"



  },



  {



    id: 61, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que mando a matar a los ninos en Belen?",



    options: ["Pilato", "Cesar", "Agripa", "Herodes el Grande"],



    correct: 3, reference: "Mateo 2:16"



  },



  {



    id: 62, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre de Juan el Bautista?",



    options: ["Felipe", "Andres", "Simeon", "Zacarias"],



    correct: 3, reference: "Lucas 1:13"



  },



  {



    id: 63, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el hijo mayor de Jacob?",



    options: ["Juda", "Levi", "Simeon", "Ruben"],



    correct: 3, reference: "Genesis 29:32"



  },



  {



    id: 600, difficulty: "dificil", category: "personajes",



    question: "?Quien ayudo a David contra Goliat?",



    options: ["Samuel", "Saul", "Jonatan", "Nadie, confio en Dios"],



    correct: 3, reference: "1 Samuel 17:45-47"



  },



  {



    id: 601, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el profeta que ungio a Saul?",



    options: ["Samuel", "Natan", "Gad", "Eli"],



    correct: 0, reference: "1 Samuel 10:1"



  },



  {



    id: 602, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el hijo de David que se rebelo contra el?",



    options: ["Absalon", "Salomon", "Amnon", "Adonias"],



    correct: 0, reference: "2 Samuel 15:10"



  },



  {



    id: 603, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que escribio Proverbios?",



    options: ["Salomon", "Asa", "Roboam", "David"],



    correct: 0, reference: "Proverbios 1:1"



  },



  {



    id: 604, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el esposo de Maria?",



    options: ["Juan", "Pedro", "Felipe", "Jose"],



    correct: 3, reference: "Mateo 1:18-19"



  },



  {



    id: 605, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el profeta mayor que vio el trono de Dios?",



    options: ["Daniel", "Isaias", "Ezequiel", "Jeremias"],



    correct: 1, reference: "Isaias 6:1"



  },



  {



    id: 606, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre de Juan y Santiago?",



    options: ["Zebedeo", "Simeon", "Felipe", "Andres"],



    correct: 0, reference: "Mateo 4:21"



  },



  {



    id: 607, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que consulto a una adivina en Endor?",



    options: ["Saul", "David", "Acab", "Jeroboam"],



    correct: 0, reference: "1 Samuel 28:7"



  },



  {



    id: 608, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el profeta que sucedio a Elias?",



    options: ["Eliseo", "Jonas", "Amos", "Samuel"],



    correct: 0, reference: "2 Reyes 2:13-14"



  },



  {



    id: 609, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el general sanado de lepra?",



    options: ["Jehu", "Uzias", "Naaman", "Gedeon"],



    correct: 2, reference: "2 Reyes 5:14"



  },



  {



    id: 610, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que pidio sabiduria a Dios?",



    options: ["Asa", "David", "Salomon", "Roboam"],



    correct: 2, reference: "1 Reyes 3:9"



  },



  {



    id: 611, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el profeta que escribio Lamentaciones?",



    options: ["Jeremias", "Ezequiel", "Daniel", "Isaias"],



    correct: 0, reference: "Lamentaciones 1:1"



  },



  {



    id: 612, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre de Gedeon?",



    options: ["Gad", "Joas", "Abner", "Natan"],



    correct: 1, reference: "Jueces 6:11"



  },



  {



    id: 613, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que destruyo Jerusalen?",



    options: ["Artajerjes", "Dario", "Ciro", "Nabucodonosor"],



    correct: 3, reference: "2 Reyes 25:8-10"



  },



  {



    id: 614, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el discipulo reemplazado por Matias?",



    options: ["Judas Iscariote", "Juan", "Pedro", "Felipe"],



    correct: 0, reference: "Hechos 1:26"



  },



  {



    id: 615, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que enfermo por orgullo?",



    options: ["Josias", "Asa", "Uzias", "Ezequias"],



    correct: 2, reference: "2 Cronicas 26:16-21"



  },



  {



    id: 616, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre de Betsabe?",



    options: ["Eliam", "Urias", "Joab", "Abner"],



    correct: 0, reference: "2 Samuel 11:3"



  },



  {



    id: 617, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que se humillo tras oir la Ley?",



    options: ["Asa", "Josias", "Roboam", "Manases"],



    correct: 1, reference: "2 Reyes 22:11"



  },



  {



    id: 618, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el profeta enviado a Ninive?",



    options: ["Nahum", "Jonas", "Amos", "Miqueas"],



    correct: 1, reference: "Jonas 1:2"



  },



  {



    id: 619, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que vio escritura en la pared?",



    options: ["Ciro", "Nabucodonosor", "Dario", "Belsasar"],



    correct: 3, reference: "Daniel 5:5"



  },



  {



    id: 620, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre del profeta Jeremias?",



    options: ["Samuel", "Natan", "Hilcias", "Gad"],



    correct: 2, reference: "Jeremias 1:1"



  },



  {



    id: 621, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que quemo el rollo de Jeremias?",



    options: ["Sedequias", "Manases", "Joacim", "Josias"],



    correct: 2, reference: "Jeremias 36:23"



  },



  {



    id: 622, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el sumo sacerdote cuando Jesus fue juzgado?",



    options: ["Caifas", "Sadoc", "Eleazar", "Anas"],



    correct: 0, reference: "Mateo 26:57"



  },



  {



    id: 623, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre de Eliseo?",



    options: ["Gad", "Abner", "Natan", "Safat"],



    correct: 3, reference: "1 Reyes 19:16"



  },



  {



    id: 624, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el profeta contemporaneo de Daniel?",



    options: ["Joel", "Ezequiel", "Oseas", "Amos"],



    correct: 1, reference: "Ezequiel 1:1-3"



  },



  {



    id: 625, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre de Jonatan?",



    options: ["David", "Isai", "Saul", "Abner"],



    correct: 2, reference: "1 Samuel 14:1"



  },



  {



    id: 626, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que hizo altares a dioses extranjeros?",



    options: ["Salomon", "Josias", "Asa", "Ezequias"],



    correct: 0, reference: "1 Reyes 11:7-8"



  },



  {



    id: 627, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el profeta que caso con una mujer infiel?",



    options: ["Amos", "Miqueas", "Joel", "Oseas"],



    correct: 3, reference: "Oseas 1:2"



  },



  {



    id: 628, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre de Juan Marcos?",



    options: ["Pablo", "No se menciona claramente", "Lucas", "Pedro"],



    correct: 1, reference: "Hechos 12:12"



  },



  {



    id: 629, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que reconstruyo el templo?",



    options: ["Artajerjes", "Dario", "Ciro", "Jerjes"],



    correct: 2, reference: "Esdras 1:1-4"



  },



  {



    id: 630, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que tuvo 700 esposas?",



    options: ["Asa", "Salomon", "David", "Roboam"],



    correct: 1, reference: "1 Reyes 11:3"



  },



  {



    id: 631, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre de Absalon?",



    options: ["David", "Natan", "Saul", "Joab"],



    correct: 0, reference: "2 Samuel 3:3"



  },



  {



    id: 632, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el profeta que vio ruedas dentro de ruedas?",



    options: ["Jeremias", "Daniel", "Isaias", "Ezequiel"],



    correct: 3, reference: "Ezequiel 1:16"



  },



  {



    id: 633, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que pidio ayuda a Egipto?",



    options: ["Ezequias", "Asa", "Josias", "Uzias"],



    correct: 1, reference: "2 Cronicas 16:3"



  },



  {



    id: 634, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre de Roboam?",



    options: ["David", "Salomon", "Asa", "Saul"],



    correct: 1, reference: "1 Reyes 11:43"



  },



  {



    id: 635, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el juez que hizo un voto imprudente?",



    options: ["Gedeon", "Jefte", "Sanson", "Otoniel"],



    correct: 1, reference: "Jueces 11:30-31"



  },



  {



    id: 636, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que mostro tesoros a Babilonia?",



    options: ["Asa", "Uzias", "Ezequias", "Josias"],



    correct: 2, reference: "2 Reyes 20:13"



  },



  {



    id: 637, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre del profeta Oseas?",



    options: ["Beeri", "Gad", "Safat", "Hilcias"],



    correct: 0, reference: "Oseas 1:1"



  },



  {



    id: 638, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que reino mas tiempo en Juda?",



    options: ["Uzias", "Asa", "Manases", "Josias"],



    correct: 2, reference: "2 Reyes 21:1"



  },



  {



    id: 639, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el profeta que desafio a 450 profetas?",



    options: ["Elias", "Amos", "Eliseo", "Joel"],



    correct: 0, reference: "1 Reyes 18:22"



  },



  {



    id: 640, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el padre de Natanael (Bartolome)?",



    options: ["Felipe", "Zebedeo", "Simeon", "Talmai"],



    correct: 3, reference: "Juan 1:45"



  },



  {



    id: 641, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que lloro por su hijo Absalon?",



    options: ["Salomon", "David", "Roboam", "Saul"],



    correct: 1, reference: "2 Samuel 18:33"



  },



  {



    id: 642, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el rey que perdio el reino por desobedecer?",



    options: ["Saul", "Asa", "David", "Uzias"],



    correct: 0, reference: "1 Samuel 15:23"



  },



  {



    id: 643, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el profeta que anuncio el nacimiento de Juan?",



    options: ["Rafael", "Gabriel", "Miguel", "Uriel"],



    correct: 1, reference: "Lucas 1:19"



  },



  {



    id: 644, difficulty: "dificil", category: "personajes",



    question: "?Quien fue el apostol que escribio mas libros del NT?",



    options: ["Pablo", "Lucas", "Juan", "Pedro"],



    correct: 0, reference: "Romanos-Filemon"



  },



  // --- Reyes ---



  {



    id: 1100, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel reino solo 7 dias antes de suicidarse?",



    options: ["Ela", "Zimri", "Nadab", "Tibni"],



    correct: 1, reference: "1 Reyes 16:15-18"



  },



  {



    id: 1101, difficulty: "dificil", category: "reyes",



    question: "?Quien disputo el trono de Israel con Omri tras la muerte de Zimri?",



    options: ["Tibni", "Ela", "Nadab", "Baasa"],



    correct: 0, reference: "1 Reyes 16:21-22"



  },



  {



    id: 1102, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel fue asesinado por Baasa mientras sitiaba Gibeton?",



    options: ["Jeroboam II", "Nadab", "Ela", "Zimri"],



    correct: 1, reference: "1 Reyes 15:27-28"



  },



  {



    id: 1103, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda fue herido por sus siervos y murio en Milo?",



    options: ["Joas", "Ocozias", "Amasias", "Amon"],



    correct: 0, reference: "2 Reyes 12:20-21"



  },



  {



    id: 1104, difficulty: "dificil", category: "reyes",



    question: "?Cuantos anos reino Omri en Israel?",



    options: ["22 anos", "12 anos", "10 anos", "8 anos"],



    correct: 1, reference: "1 Reyes 16:23"



  },



  {



    id: 1105, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda fue llevado cautivo a Babilonia con garfios?",



    options: ["Sedequias", "Manases", "Joacaz", "Joaquin"],



    correct: 1, reference: "2 Cronicas 33:11"



  },



  {



    id: 1106, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel hizo alianza con Ben-adad de Siria contra Baasa?",



    options: ["Acab", "Omri", "Josafat", "Asa"],



    correct: 3, reference: "1 Reyes 15:18-20"



  },



  {



    id: 1107, difficulty: "dificil", category: "reyes",



    question: "?Quien fue el padre del rey Josafat de Juda?",



    options: ["Asa", "Joram", "Roboam", "Abiam"],



    correct: 0, reference: "1 Reyes 22:41"



  },



  {



    id: 1108, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel fue asesinado por Salum despues de reinar 6 meses?",



    options: ["Manahem", "Zacarias", "Peka", "Pekahia"],



    correct: 1, reference: "2 Reyes 15:8-10"



  },



  {



    id: 1109, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda tenia 8 anos cuando comenzo a reinar?",



    options: ["Josias", "Manases", "Amon", "Joas"],



    correct: 3, reference: "2 Reyes 11:21"



  },



  {



    id: 1110, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel pago tributo a Tiglat-pileser III de Asiria con mil talentos de plata?",



    options: ["Joacaz", "Oseas", "Peka", "Manahem"],



    correct: 3, reference: "2 Reyes 15:19-20"



  },



  {



    id: 1111, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda fue azotado con lepra por quemar incienso en el templo?",



    options: ["Jotam", "Amasias", "Uzias (Azarias)", "Acaz"],



    correct: 2, reference: "2 Cronicas 26:16-21"



  },



  {



    id: 1112, difficulty: "dificil", category: "reyes",



    question: "?Que ciudad fundo Omri como nueva capital de Israel?",



    options: ["Tirsa", "Samaria", "Jezreel", "Siquem"],



    correct: 1, reference: "1 Reyes 16:24"



  },



  {



    id: 1113, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda quito los lugares altos e hizo la reforma mas completa?",



    options: ["Josafat", "Asa", "Josias", "Ezequias"],



    correct: 2, reference: "2 Reyes 23:4-25"



  },



  {



    id: 1114, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel fue el ultimo de la dinastia de Jehu?",



    options: ["Joas", "Joacaz", "Zacarias", "Jeroboam II"],



    correct: 2, reference: "2 Reyes 15:8-12"



  },



  {



    id: 1115, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda sacrifico a su hijo pasandolo por fuego?",



    options: ["Amon", "Acaz", "Joacaz", "Manases"],



    correct: 1, reference: "2 Reyes 16:3"



  },



  {



    id: 1116, difficulty: "dificil", category: "reyes",



    question: "?Cuantos anos reino Manases en Jerusalen, siendo el reinado mas largo de Juda?",



    options: ["45 anos", "50 anos", "55 anos", "41 anos"],



    correct: 2, reference: "2 Reyes 21:1"



  },



  {



    id: 1117, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel derroto a Amasias de Juda y derribo parte del muro de Jerusalen?",



    options: ["Jehu", "Joacaz", "Jeroboam II", "Joas de Israel"],



    correct: 3, reference: "2 Reyes 14:11-13"



  },



  {



    id: 1118, difficulty: "dificil", category: "reyes",



    question: "?A que rey de Juda le sacaron los ojos los babilonios despues de matar a sus hijos?",



    options: ["Joaquin", "Manases", "Joacaz", "Sedequias"],



    correct: 3, reference: "2 Reyes 25:7"



  },



  {



    id: 1119, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel recibio la evaluacion de que hizo lo malo mas que todos los que fueron antes de el?",



    options: ["Manases de Juda", "Jeroboam I", "Acab", "Omri"],



    correct: 2, reference: "1 Reyes 16:30"



  },



  {



    id: 1120, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda fue asesinado por sus siervos en su cama?",



    options: ["Amasias", "Ocozias", "Joas", "Amon"],



    correct: 3, reference: "2 Reyes 21:23"



  },



  {



    id: 1121, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel envio a su esposa disfrazada a consultar al profeta Ahias?",



    options: ["Baasa", "Nadab", "Jeroboam I", "Omri"],



    correct: 2, reference: "1 Reyes 14:1-6"



  },



  {



    id: 1122, difficulty: "dificil", category: "reyes",



    question: "?Que faraon mato al rey Josias en la batalla de Meguido?",



    options: ["Tirhaca", "Sisac", "Necao II", "Hofra"],



    correct: 2, reference: "2 Reyes 23:29"



  },



  {



    id: 1123, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda construyo el estanque y el acueducto que llevaba agua a Jerusalen?",



    options: ["Ezequias", "Asa", "Manases", "Josias"],



    correct: 0, reference: "2 Reyes 20:20"



  },



  {



    id: 1124, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel fue asesinado por Peka hijo de Remalias?",



    options: ["Manahem", "Zacarias", "Salum", "Pekahia"],



    correct: 3, reference: "2 Reyes 15:25"



  },



  {



    id: 1125, difficulty: "dificil", category: "reyes",



    question: "?Que evaluacion teologica recibieron todos los reyes del reino del norte (Israel)?",



    options: ["Alternaron entre bien y mal", "Hicieron lo bueno", "Hicieron lo malo ante los ojos de Jehova", "Fueron fieles a Dios"],



    correct: 2, reference: "1 Reyes 15:26,34; 16:25,30"



  },



  {



    id: 1126, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel reino 41 anos, el mas largo del reino del norte?",



    options: ["Jeroboam II", "Acab", "Jehu", "Baasa"],



    correct: 0, reference: "2 Reyes 14:23"



  },



  {



    id: 1127, difficulty: "dificil", category: "reyes",



    question: "?Quien fue la unica mujer que reino en Juda usurpando el trono?",



    options: ["Betsabe", "Maaca", "Jezabel", "Atalia"],



    correct: 3, reference: "2 Reyes 11:1-3"



  },



  {



    id: 1128, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda pidio ayuda a Asiria en lugar de confiar en Dios contra Siria e Israel?",



    options: ["Manases", "Jotam", "Acaz", "Ezequias"],



    correct: 2, reference: "2 Reyes 16:7-8"



  },



  {



    id: 1129, difficulty: "dificil", category: "reyes",



    question: "?Cuantos reyes tuvo el reino del norte (Israel) desde Jeroboam I hasta Oseas?",



    options: ["17", "15", "20", "19"],



    correct: 3, reference: "1 Reyes 12 - 2 Reyes 17"



  },



  {



    id: 1130, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda fue sepultado en un huerto y no en los sepulcros reales?",



    options: ["Acaz", "Uzias", "Manases", "Amon"],



    correct: 1, reference: "2 Cronicas 26:23"



  },



  {



    id: 1131, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel capturo Elot y la restituyo a Siria?",



    options: ["Peka", "Acaz perdio Elot", "Oseas", "Rezin de Siria"],



    correct: 1, reference: "2 Reyes 16:6"



  },



  {



    id: 1132, difficulty: "dificil", category: "reyes",



    question: "?A que rey asirio pago tributo Oseas, ultimo rey de Israel, antes de rebelarse?",



    options: ["Sargon II", "Salmanasar V", "Tiglat-pileser III", "Senaquerib"],



    correct: 1, reference: "2 Reyes 17:3-4"



  },



  {



    id: 1133, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda elimino la serpiente de bronce que Moises habia hecho?",



    options: ["Ezequias", "Josafat", "Asa", "Josias"],



    correct: 0, reference: "2 Reyes 18:4"



  },



  {



    id: 1134, difficulty: "dificil", category: "reyes",



    question: "?Que hijo de Salomon causo la division del reino por su dureza?",



    options: ["Nadab", "Jeroboam", "Abiam", "Roboam"],



    correct: 3, reference: "1 Reyes 12:13-16"



  },



  {



    id: 1135, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda reino solo 3 meses antes de ser deportado a Egipto por el faraon Necao?",



    options: ["Amon", "Sedequias", "Joaquin", "Joacaz"],



    correct: 3, reference: "2 Reyes 23:31-34"



  },



  {



    id: 1136, difficulty: "dificil", category: "reyes",



    question: "?Que profeta ungio a Jehu como rey de Israel para destruir la casa de Acab?",



    options: ["Elias", "Eliseo", "Un discipulo de Eliseo", "Miqueas"],



    correct: 2, reference: "2 Reyes 9:1-6"



  },



  {



    id: 1137, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda fue comparado favorablemente con David sin reservas?",



    options: ["Josias", "Josafat", "Asa", "Ezequias"],



    correct: 0, reference: "2 Reyes 22:2"



  },



  {



    id: 1138, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel erigio los becerros de oro en Dan y Bet-el?",



    options: ["Acab", "Baasa", "Jeroboam I", "Omri"],



    correct: 2, reference: "1 Reyes 12:28-29"



  },



  {



    id: 1139, difficulty: "dificil", category: "reyes",



    question: "?En que ano cayo Samaria ante Asiria, terminando el reino del norte?",



    options: ["722 a.C.", "701 a.C.", "586 a.C.", "612 a.C."],



    correct: 0, reference: "2 Reyes 17:6"



  },



  {



    id: 1140, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda envio embajadores a mostrar todos sus tesoros a los babilonios?",



    options: ["Manases", "Josafat", "Josias", "Ezequias"],



    correct: 3, reference: "2 Reyes 20:12-13"



  },



  {



    id: 1141, difficulty: "dificil", category: "reyes",



    question: "?Que oficial de Ela, rey de Israel, lo asesino mientras estaba borracho en casa de Arsa?",



    options: ["Tibni", "Zimri", "Baasa", "Omri"],



    correct: 1, reference: "1 Reyes 16:9-10"



  },



  {



    id: 1142, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda fue puesto en el trono por el pueblo de la tierra tras el asesinato de Amon?",



    options: ["Sedequias", "Josias", "Manases", "Joacaz"],



    correct: 1, reference: "2 Reyes 21:24"



  },



  {



    id: 1143, difficulty: "dificil", category: "reyes",



    question: "?Que hijo de Acab reino dos anos e hizo lo malo, cayendo por la ventana de su aposento?",



    options: ["Jeroboam II", "Jehu", "Ocozias de Israel", "Joram"],



    correct: 2, reference: "2 Reyes 1:2-17"



  },



  {



    id: 1144, difficulty: "dificil", category: "reyes",



    question: "?Cuantos reyes de Juda recibieron la evaluacion de que hicieron lo recto ante Jehova?",



    options: ["6", "8", "4", "12"],



    correct: 1, reference: "1 Reyes - 2 Reyes (Asa, Josafat, Joas, Amasias, Uzias, Jotam, Ezequias, Josias)"



  },



  {



    id: 1145, difficulty: "dificil", category: "reyes",



    question: "?Que rey asirio sitio Jerusalen en tiempos de Ezequias y su ejercito fue destruido por un angel?",



    options: ["Asurbanipal", "Senaquerib", "Sargon II", "Tiglat-pileser III"],



    correct: 1, reference: "2 Reyes 19:35-36"



  },



  {



    id: 1146, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda reino junto con su padre Uzias debido a la lepra de este?",



    options: ["Acaz", "Amasias", "Ezequias", "Jotam"],



    correct: 3, reference: "2 Reyes 15:5"



  },



  {



    id: 1147, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Israel fue el primero de la dinastia de Omri?",



    options: ["Tibni", "Omri", "Ela", "Zimri"],



    correct: 1, reference: "1 Reyes 16:21-23"



  },



  {



    id: 1148, difficulty: "dificil", category: "reyes",



    question: "?Que rey babilonico libero a Joaquin de la carcel y le dio un lugar en su mesa?",



    options: ["Belsasar", "Nabonido", "Evil-merodac", "Nabucodonosor"],



    correct: 2, reference: "2 Reyes 25:27-29"



  },



  {



    id: 1149, difficulty: "dificil", category: "reyes",



    question: "?Que rey de Juda hizo lo malo y reino solo 2 anos antes de ser asesinado por sus siervos?",



    options: ["Ocozias", "Amon", "Joacaz", "Abiam"],



    correct: 1, reference: "2 Reyes 21:19-23"



  },



  // --- Profetas ---



  {



    id: 1300, difficulty: "dificil", category: "profetas",



    question: "?Que profeta se caso con una mujer infiel llamada Gomer por orden de Dios?",



    options: ["Oseas", "Amos", "Joel", "Miqueas"],



    correct: 0, reference: "Oseas 1:2-3"



  },



  {



    id: 1301, difficulty: "dificil", category: "profetas",



    question: "?Que profeta vio un rollo volante de veinte codos de largo y diez de ancho?",



    options: ["Hageo", "Malaquias", "Ezequiel", "Zacarias"],



    correct: 3, reference: "Zacarias 5:1-2"



  },



  {



    id: 1302, difficulty: "dificil", category: "profetas",



    question: "?Durante el reinado de que rey comenzo Isaias su ministerio profetico?",



    options: ["Josias", "Ezequias", "Manases", "Uzias"],



    correct: 3, reference: "Isaias 1:1"



  },



  {



    id: 1303, difficulty: "dificil", category: "profetas",



    question: "?En que cisterna fue arrojado Jeremias por orden de los principes?",



    options: ["La cisterna del templo", "La cisterna de Malquias hijo de Hamelec", "La cisterna de Bet-semes", "La cisterna de Siloe"],



    correct: 1, reference: "Jeremias 38:6"



  },



  {



    id: 1304, difficulty: "dificil", category: "profetas",



    question: "?Que profeta fue arrebatado por el Espiritu despues de bautizar al eunuco etiope?",



    options: ["Agabo", "Felipe", "Elias", "Eliseo"],



    correct: 1, reference: "Hechos 8:39"



  },



  {



    id: 1305, difficulty: "dificil", category: "profetas",



    question: "?Que profeta recibio la orden de cocinar su comida usando estiercol de vaca como combustible?",



    options: ["Jeremias", "Ezequiel", "Oseas", "Isaias"],



    correct: 1, reference: "Ezequiel 4:15"



  },



  {



    id: 1306, difficulty: "dificil", category: "profetas",



    question: "?A que profeta le fue prohibido llorar la muerte de su esposa?",



    options: ["Isaias", "Jeremias", "Ezequiel", "Oseas"],



    correct: 2, reference: "Ezequiel 24:16-18"



  },



  {



    id: 1307, difficulty: "dificil", category: "profetas",



    question: "?Que profeta menciono el valle de los huesos secos?",



    options: ["Ezequiel", "Isaias", "Daniel", "Jeremias"],



    correct: 0, reference: "Ezequiel 37:1-14"



  },



  {



    id: 1308, difficulty: "dificil", category: "profetas",



    question: "?Cuantos dias estuvo Ezequiel acostado sobre su lado izquierdo para cargar la iniquidad de Israel?",



    options: ["150 dias", "390 dias", "40 dias", "70 dias"],



    correct: 1, reference: "Ezequiel 4:5"



  },



  {



    id: 1309, difficulty: "dificil", category: "profetas",



    question: "?Que profeta del Antiguo Testamento predijo que el Mesias naceria en Belen?",



    options: ["Isaias", "Zacarias", "Malaquias", "Miqueas"],



    correct: 3, reference: "Miqueas 5:2"



  },



  {



    id: 1310, difficulty: "dificil", category: "profetas",



    question: "?Que profeta fue contemporaneo de Jeremias y profetizo a los exiliados en Babilonia?",



    options: ["Habacuc", "Sofonias", "Ezequiel", "Daniel"],



    correct: 2, reference: "Ezequiel 1:1-3"



  },



  {



    id: 1311, difficulty: "dificil", category: "profetas",



    question: "?Que arbol uso Amos como simbolo de su oficio antes de ser profeta?",



    options: ["Higuera silvestre (sicomoro)", "Palmera", "Olivo", "Vid"],



    correct: 0, reference: "Amos 7:14"



  },



  {



    id: 1312, difficulty: "dificil", category: "profetas",



    question: "?Que profeta anuncio que Dios deseaba misericordia y no sacrificio?",



    options: ["Joel", "Amos", "Miqueas", "Oseas"],



    correct: 3, reference: "Oseas 6:6"



  },



  {



    id: 1313, difficulty: "dificil", category: "profetas",



    question: "?En la vision de Isaias en el templo, cuantas alas tenia cada serafin?",



    options: ["Seis", "Dos", "Ocho", "Cuatro"],



    correct: 0, reference: "Isaias 6:2"



  },



  {



    id: 1314, difficulty: "dificil", category: "profetas",



    question: "?Que profeta fue llamado a profetizar contra Ninive y la ciudad se arrepintio?",



    options: ["Jonas", "Nahum", "Miqueas", "Abdias"],



    correct: 0, reference: "Jonas 3:5-10"



  },



  {



    id: 1315, difficulty: "dificil", category: "profetas",



    question: "?Que profeta escribio especificamente contra Edom?",



    options: ["Nahum", "Sofonias", "Habacuc", "Abdias"],



    correct: 3, reference: "Abdias 1:1"



  },



  {



    id: 1316, difficulty: "dificil", category: "profetas",



    question: "?Que profeta proclamo: 'El justo por su fe vivira'?",



    options: ["Sofonias", "Habacuc", "Amos", "Miqueas"],



    correct: 1, reference: "Habacuc 2:4"



  },



  {



    id: 1317, difficulty: "dificil", category: "profetas",



    question: "?Cual fue el nombre del padre de Isaias segun el libro profetico?",



    options: ["Buzi", "Beeri", "Hilcias", "Amoz"],



    correct: 3, reference: "Isaias 1:1"



  },



  {



    id: 1318, difficulty: "dificil", category: "profetas",



    question: "?Que profeta tuvo una vision de cuatro carros que salian de entre dos montes de bronce?",



    options: ["Daniel", "Hageo", "Zacarias", "Ezequiel"],



    correct: 2, reference: "Zacarias 6:1"



  },



  {



    id: 1319, difficulty: "dificil", category: "profetas",



    question: "?Que profeta predijo la destruccion de Ninive con gran detalle poetico?",



    options: ["Abdias", "Sofonias", "Jonas", "Nahum"],



    correct: 3, reference: "Nahum 1:1; 2:1-13"



  },



  {



    id: 1320, difficulty: "dificil", category: "profetas",



    question: "?Que nombre simbolico le puso Oseas a su hija, que significa 'no compadecida'?",



    options: ["Lo-ruhama", "Maher-salal-hasbaz", "Jezreel", "Lo-ammi"],



    correct: 0, reference: "Oseas 1:6"



  },



  {



    id: 1321, difficulty: "dificil", category: "profetas",



    question: "?Que profeta camino desnudo y descalzo durante tres anos como senal contra Egipto y Etiopia?",



    options: ["Jeremias", "Miqueas", "Isaias", "Ezequiel"],



    correct: 2, reference: "Isaias 20:2-3"



  },



  {



    id: 1322, difficulty: "dificil", category: "profetas",



    question: "?Que vision tuvo Amos que representaba el juicio inminente sobre Israel?",



    options: ["Un angel con espada", "Un canasto de fruta de verano", "Un muro con plomada", "Un rollo volante"],



    correct: 1, reference: "Amos 8:1-2"



  },



  {



    id: 1323, difficulty: "dificil", category: "profetas",



    question: "?Cuantos capitulos tiene el libro de Isaias?",



    options: ["52", "60", "66", "72"],



    correct: 2, reference: "Isaias (66 capitulos)"



  },



  {



    id: 1324, difficulty: "dificil", category: "profetas",



    question: "?Que profeta fue puesto dentro de un cepo por el sacerdote Pasur?",



    options: ["Amos", "Jeremias", "Ezequiel", "Isaias"],



    correct: 1, reference: "Jeremias 20:1-2"



  },



  {



    id: 1325, difficulty: "dificil", category: "profetas",



    question: "?En que rio tuvo Ezequiel su primera vision de la gloria de Dios?",



    options: ["Eufrates", "Tigris", "Jordan", "Quebar"],



    correct: 3, reference: "Ezequiel 1:1"



  },



  {



    id: 1326, difficulty: "dificil", category: "profetas",



    question: "?Que profeta menciono las 'setenta semanas' como profecia mesianica?",



    options: ["Zacarias", "Isaias", "Ezequiel", "Daniel"],



    correct: 3, reference: "Daniel 9:24"



  },



  {



    id: 1327, difficulty: "dificil", category: "profetas",



    question: "?A que profeta alimentaron los cuervos junto al arroyo de Querit?",



    options: ["Elias", "Samuel", "Isaias", "Eliseo"],



    correct: 0, reference: "1 Reyes 17:4-6"



  },



  {



    id: 1328, difficulty: "dificil", category: "profetas",



    question: "?Que profeta multiplico el aceite de una viuda para pagar sus deudas?",



    options: ["Elias", "Samuel", "Isaias", "Eliseo"],



    correct: 3, reference: "2 Reyes 4:1-7"



  },



  {



    id: 1329, difficulty: "dificil", category: "profetas",



    question: "?Cuantos profetas de Baal fueron desafiados por Elias en el monte Carmelo?",



    options: ["500", "400", "850", "450"],



    correct: 3, reference: "1 Reyes 18:19"



  },



  {



    id: 1330, difficulty: "dificil", category: "profetas",



    question: "?Que profeta uso un yugo de madera sobre su cuello como senal profetica?",



    options: ["Oseas", "Ezequiel", "Isaias", "Jeremias"],



    correct: 3, reference: "Jeremias 27:2"



  },



  {



    id: 1331, difficulty: "dificil", category: "profetas",



    question: "?Que falso profeta rompio el yugo de madera del cuello de Jeremias?",



    options: ["Pasur", "Acab hijo de Colaias", "Semaias", "Hananias"],



    correct: 3, reference: "Jeremias 28:10"



  },



  {



    id: 1332, difficulty: "dificil", category: "profetas",



    question: "?Que profeta fue lanzado al mar durante una tormenta por los marineros?",



    options: ["Abdias", "Nahum", "Jonas", "Amos"],



    correct: 2, reference: "Jonas 1:15"



  },



  {



    id: 1333, difficulty: "dificil", category: "profetas",



    question: "?Que planta crecio para dar sombra a Jonas y luego se seco?",



    options: ["Una higuera", "Una vid", "Un sicomoro", "Una calabacera"],



    correct: 3, reference: "Jonas 4:6-7"



  },



  {



    id: 1334, difficulty: "dificil", category: "profetas",



    question: "?Que profeta tuvo una vision de un candelabro de oro con siete lamparas y dos olivos?",



    options: ["Hageo", "Zacarias", "Daniel", "Malaquias"],



    correct: 1, reference: "Zacarias 4:2-3"



  },



  {



    id: 1335, difficulty: "dificil", category: "profetas",



    question: "?Que profeta anuncio que Dios enviaria al profeta Elias antes del dia grande y terrible de Jehova?",



    options: ["Zacarias", "Joel", "Hageo", "Malaquias"],



    correct: 3, reference: "Malaquias 4:5"



  },



  {



    id: 1336, difficulty: "dificil", category: "profetas",



    question: "?A que profeta se le ordeno comprar un campo en Anatot durante el asedio de Jerusalen?",



    options: ["Miqueas", "Isaias", "Ezequiel", "Jeremias"],



    correct: 3, reference: "Jeremias 32:7-9"



  },



  {



    id: 1337, difficulty: "dificil", category: "profetas",



    question: "?Quien fue el secretario (escriba) de Jeremias que escribia sus profecias?",



    options: ["Baruc", "Gedalias", "Sofonias", "Esdras"],



    correct: 0, reference: "Jeremias 36:4"



  },



  {



    id: 1338, difficulty: "dificil", category: "profetas",



    question: "?Que rey quemo el rollo de las profecias de Jeremias columna por columna?",



    options: ["Josias", "Joacim", "Sedequias", "Joaquin"],



    correct: 1, reference: "Jeremias 36:23"



  },



  {



    id: 1339, difficulty: "dificil", category: "profetas",



    question: "?Que profeta describio a Tiro como una ciudad que seria arrojada al mar?",



    options: ["Amos", "Ezequiel", "Jeremias", "Isaias"],



    correct: 1, reference: "Ezequiel 26:12"



  },



  {



    id: 1340, difficulty: "dificil", category: "profetas",



    question: "?En que capitulo de Isaias se encuentra el cantico del Siervo Sufriente que describe al Mesias?",



    options: ["Isaias 53", "Isaias 40", "Isaias 61", "Isaias 7"],



    correct: 0, reference: "Isaias 53"



  },



  {



    id: 1341, difficulty: "dificil", category: "profetas",



    question: "?Que profeta recibio instrucciones de medir el templo con una cana de medir?",



    options: ["Ezequiel", "Hageo", "Daniel", "Zacarias"],



    correct: 0, reference: "Ezequiel 40:3-5"



  },



  {



    id: 1342, difficulty: "dificil", category: "profetas",



    question: "?Que profeta profetizo que el Mesias entraria en Jerusalen montado sobre un pollino?",



    options: ["Zacarias", "Miqueas", "Malaquias", "Isaias"],



    correct: 0, reference: "Zacarias 9:9"



  },



  {



    id: 1343, difficulty: "dificil", category: "profetas",



    question: "?Que profeta hablo del 'Dia de Jehova' como dia de tinieblas y no de luz?",



    options: ["Sofonias", "Amos", "Malaquias", "Joel"],



    correct: 1, reference: "Amos 5:18-20"



  },



  {



    id: 1344, difficulty: "dificil", category: "profetas",



    question: "?A que profeta Dios le mostro una vision de langostas que devoraban la tierra?",



    options: ["Amos", "Joel", "Habacuc", "Nahum"],



    correct: 0, reference: "Amos 7:1"



  },



  {



    id: 1345, difficulty: "dificil", category: "profetas",



    question: "?Que profeta insto al pueblo a reconstruir el templo despues del exilio babilonico?",



    options: ["Zacarias", "Hageo", "Malaquias", "Abdias"],



    correct: 1, reference: "Hageo 1:2-8"



  },



  {



    id: 1346, difficulty: "dificil", category: "profetas",



    question: "?Junto a que profeta sirvio Hageo para motivar la reconstruccion del templo?",



    options: ["Malaquias", "Joel", "Zacarias", "Abdias"],



    correct: 2, reference: "Esdras 5:1"



  },



  {



    id: 1347, difficulty: "dificil", category: "profetas",



    question: "?Que profeta vio la gloria de Dios salir del templo por el oriente?",



    options: ["Ezequiel", "Daniel", "Zacarias", "Isaias"],



    correct: 0, reference: "Ezequiel 10:18-19; 11:23"



  },



  {



    id: 1348, difficulty: "dificil", category: "profetas",



    question: "?Que nombre simbolico dio Isaias a su hijo que significa 'el despojo se apresura, la presa se precipita'?",



    options: ["Maher-salal-hasbaz", "Emanuel", "Lo-ammi", "Sear-jasub"],



    correct: 0, reference: "Isaias 8:3"



  },



  {



    id: 1349, difficulty: "dificil", category: "profetas",



    question: "?Que profeta fue sacado de la cisterna por Ebed-melec, un etiope?",



    options: ["Isaias", "Ezequiel", "Jeremias", "Daniel"],



    correct: 2, reference: "Jeremias 38:7-13"



  },



  // --- Cartas ---



  {



    id: 1900, difficulty: "dificil", category: "cartas",



    question: "?Desde que ciudad escribio Pablo la carta a los Filipenses?",



    options: ["Efeso", "Antioquia", "Roma (prision)", "Corinto"],



    correct: 2, reference: "Filipenses 1:13"



  },



  {



    id: 1901, difficulty: "dificil", category: "cartas",



    question: "?Que carta del NT tiene un solo capitulo y trata sobre un esclavo fugitivo llamado Onesimo?",



    options: ["2 Juan", "Filemon", "3 Juan", "Judas"],



    correct: 1, reference: "Filemon 1:10-16"



  },



  {



    id: 1902, difficulty: "dificil", category: "cartas",



    question: "?Por que se considera debatida la autoria de la carta a los Hebreos?",



    options: ["Porque fue escrita por una mujer", "Porque se perdio el manuscrito original", "Porque no incluye saludo inicial con nombre del autor", "Porque fue escrita en arameo"],



    correct: 2, reference: "Hebreos 1:1 (autoria debatida)"



  },



  {



    id: 1903, difficulty: "dificil", category: "cartas",



    question: "?Que falsa ensenanza combatia Pablo en la carta a los Colosenses?",



    options: ["La negacion de la resurreccion", "El arrianismo", "El gnosticismo incipiente y el sincretismo religioso", "El judaismo legalista"],



    correct: 2, reference: "Colosenses 2:8-23"



  },



  {



    id: 1904, difficulty: "dificil", category: "cartas",



    question: "?Cual es el himno cristologico que Pablo cita en Filipenses sobre la kenosis de Cristo?",



    options: ["Filipenses 1:3-11", "Filipenses 2:5-11", "Filipenses 3:7-14", "Filipenses 4:4-9"],



    correct: 1, reference: "Filipenses 2:5-11"



  },



  {



    id: 1905, difficulty: "dificil", category: "cartas",



    question: "?A quien llama Pablo 'verdadero companero' (syzygos) en Filipenses?",



    options: ["Un colaborador sin nombre especifico", "Timoteo", "Epafrodito", "Lucas"],



    correct: 0, reference: "Filipenses 4:3"



  },



  {



    id: 1906, difficulty: "dificil", category: "cartas",



    question: "?Que dos mujeres estaban en conflicto en la iglesia de Filipos segun Pablo?",



    options: ["Loida y Eunice", "Priscila y Lidia", "Febe y Junia", "Evodia y Sintique"],



    correct: 3, reference: "Filipenses 4:2"



  },



  {



    id: 1907, difficulty: "dificil", category: "cartas",



    question: "?Que concepto teologico central desarrolla Pablo en Romanos capitulos 9 al 11?",



    options: ["La justificacion por la fe", "Los dones espirituales", "La resurreccion de los muertos", "La eleccion de Israel y el plan de Dios para judios y gentiles"],



    correct: 3, reference: "Romanos 9-11"



  },



  {



    id: 1908, difficulty: "dificil", category: "cartas",



    question: "?Que personaje del AT usa Pablo en Romanos 4 como ejemplo de justificacion por fe?",



    options: ["Noe", "Abraham", "David", "Moises"],



    correct: 1, reference: "Romanos 4:1-3"



  },



  {



    id: 1909, difficulty: "dificil", category: "cartas",



    question: "?Que profeta del AT cita Pablo en Romanos 1:17 para fundamentar la justificacion por fe?",



    options: ["Jeremias", "Habacuc", "Amos", "Isaias"],



    correct: 1, reference: "Romanos 1:17; Habacuc 2:4"



  },



  {



    id: 1910, difficulty: "dificil", category: "cartas",



    question: "?Que mujer menciona Pablo como diaconisa de la iglesia de Cencrea en Romanos 16?",



    options: ["Priscila", "Maria", "Junia", "Febe"],



    correct: 3, reference: "Romanos 16:1"



  },



  {



    id: 1911, difficulty: "dificil", category: "cartas",



    question: "?Que problema especifico de la iglesia de Corinto trata Pablo en 1 Corintios 5?",



    options: ["Un caso de inmoralidad sexual extrema (incesto)", "El hablar en lenguas sin interprete", "La idolatria", "Las divisiones entre lideres"],



    correct: 0, reference: "1 Corintios 5:1"



  },



  {



    id: 1912, difficulty: "dificil", category: "cartas",



    question: "?Cuantas cartas escribio Pablo a los corintios segun las evidencias internas del NT?",



    options: ["Tres", "Al menos cuatro", "Una", "Dos"],



    correct: 1, reference: "1 Corintios 5:9; 2 Corintios 2:4; 7:8"



  },



  {



    id: 1913, difficulty: "dificil", category: "cartas",



    question: "?Que capitulo de 1 Corintios es conocido como 'el capitulo del amor'?",



    options: ["Capitulo 13", "Capitulo 12", "Capitulo 14", "Capitulo 15"],



    correct: 0, reference: "1 Corintios 13"



  },



  {



    id: 1914, difficulty: "dificil", category: "cartas",



    question: "?Que argumento central presenta Pablo en 1 Corintios 15 sobre la resurreccion?",



    options: ["Que la resurreccion es simbolica", "Que la resurreccion ocurrira antes de la tribulacion", "Que solo resucitaran los justos", "Que si Cristo no resucito, la fe es vana"],



    correct: 3, reference: "1 Corintios 15:14,17"



  },



  {



    id: 1915, difficulty: "dificil", category: "cartas",



    question: "?Que expresion aramea usa Pablo al final de 1 Corintios que significa 'Senor nuestro, ven'?",



    options: ["Abba", "Hosanna", "Aleluya", "Maranata"],



    correct: 3, reference: "1 Corintios 16:22"



  },



  {



    id: 1916, difficulty: "dificil", category: "cartas",



    question: "?Que metafora usa Pablo en 2 Corintios 4:7 para describir a los creyentes que portan el evangelio?",



    options: ["Ovejas sin pastor", "Piedras vivas", "Soldados con armadura", "Vasos de barro"],



    correct: 3, reference: "2 Corintios 4:7"



  },



  {



    id: 1917, difficulty: "dificil", category: "cartas",



    question: "?Que 'aguijon en la carne' menciona Pablo en 2 Corintios 12?",



    options: ["Una enfermedad fisica no especificada", "La persecucion de los judios", "La culpa por haber perseguido a la iglesia", "La tentacion sexual"],



    correct: 0, reference: "2 Corintios 12:7-9"



  },



  {



    id: 1918, difficulty: "dificil", category: "cartas",



    question: "?Cual era el principal error doctrinal que Pablo combatia en Galatas?",



    options: ["La negacion de la resurreccion", "El culto a los angeles", "La exigencia de la circuncision y la ley para la salvacion", "La negacion de la divinidad de Cristo"],



    correct: 2, reference: "Galatas 2:16; 5:2-4"



  },



  {



    id: 1919, difficulty: "dificil", category: "cartas",



    question: "?A quien confronto Pablo 'cara a cara' en Antioquia segun Galatas 2?",



    options: ["Pedro (Cefas)", "Juan", "Bernabe", "Santiago"],



    correct: 0, reference: "Galatas 2:11"



  },



  {



    id: 1920, difficulty: "dificil", category: "cartas",



    question: "?Que alegoria del AT utiliza Pablo en Galatas 4 para ilustrar la ley y la gracia?",



    options: ["Jacob y Esau", "El sacrificio de Isaac", "Sara y Agar", "Raquel y Lea"],



    correct: 2, reference: "Galatas 4:21-31"



  },



  {



    id: 1921, difficulty: "dificil", category: "cartas",



    question: "?Que concepto teologico introduce Pablo en Efesios 1:10 sobre el plan eterno de Dios?",



    options: ["La predestinacion individual", "La recapitulacion de todas las cosas en Cristo", "La gracia irresistible", "La expiacion limitada"],



    correct: 1, reference: "Efesios 1:10"



  },



  {



    id: 1922, difficulty: "dificil", category: "cartas",



    question: "?Cuantas piezas componen la armadura de Dios descrita en Efesios 6?",



    options: ["Siete", "Cinco", "Cuatro", "Seis"],



    correct: 0, reference: "Efesios 6:14-18"



  },



  {



    id: 1923, difficulty: "dificil", category: "cartas",



    question: "?Que carta de Pablo fue probablemente una carta circular enviada a varias iglesias?",



    options: ["Filipenses", "Efesios", "Filemon", "Colosenses"],



    correct: 1, reference: "Efesios 1:1 (algunos manuscritos omiten 'en Efeso')"



  },



  {



    id: 1924, difficulty: "dificil", category: "cartas",



    question: "?Quien llevo la carta a los Colosenses y la carta a Filemon?",



    options: ["Timoteo", "Epafrodito", "Tiquico y Onesimo", "Tito"],



    correct: 2, reference: "Colosenses 4:7-9; Filemon 1:10-12"



  },



  {



    id: 1925, difficulty: "dificil", category: "cartas",



    question: "?Que error escatologico corrige Pablo en 2 Tesalonicenses 2?",



    options: ["Que no habria resurreccion", "Que el milenio ya comenzo", "Que Cristo ya habia venido", "Que el dia del Senor ya habia llegado"],



    correct: 3, reference: "2 Tesalonicenses 2:1-3"



  },



  {



    id: 1926, difficulty: "dificil", category: "cartas",



    question: "?Que figura escatologica menciona Pablo en 2 Tesalonicenses 2 que debe manifestarse antes del fin?",



    options: ["El hombre de pecado (hijo de perdicion)", "La bestia del mar", "El falso profeta", "El anticristo"],



    correct: 0, reference: "2 Tesalonicenses 2:3-4"



  },



  {



    id: 1927, difficulty: "dificil", category: "cartas",



    question: "?Con que imagen describe Pablo la venida del Senor en 1 Tesalonicenses 4:16-17?",



    options: ["Con voz de mando, trompeta de Dios y los muertos en Cristo resucitando primero", "Sobre las nubes con los angeles", "Como relampago de oriente a occidente", "Como un ladron en la noche"],



    correct: 0, reference: "1 Tesalonicenses 4:16-17"



  },



  {



    id: 1928, difficulty: "dificil", category: "cartas",



    question: "?Cuales son las tres cartas llamadas 'Epistolas Pastorales'?",



    options: ["Filipenses, Colosenses, Filemon", "1 Timoteo, 2 Timoteo, Tito", "1 Pedro, 2 Pedro, Judas", "Romanos, Galatas, Efesios"],



    correct: 1, reference: "1 Timoteo, 2 Timoteo, Tito"



  },



  {



    id: 1929, difficulty: "dificil", category: "cartas",



    question: "?Que requisitos para los obispos establece Pablo en 1 Timoteo 3?",



    options: ["Ser celibe y ayunar frecuentemente", "Ser mayor de 40 anos y levita", "Ser irreprensible, marido de una sola mujer, apto para ensenar", "Ser rico y generoso con los pobres"],



    correct: 2, reference: "1 Timoteo 3:1-7"



  },



  {



    id: 1930, difficulty: "dificil", category: "cartas",



    question: "?Que declaracion hace Pablo sobre la Escritura en 2 Timoteo 3:16?",



    options: ["Que toda Escritura es inspirada por Dios (theopneustos)", "Que solo los Evangelios son infalibles", "Que fue dictada palabra por palabra", "Que debe interpretarse literalmente siempre"],



    correct: 0, reference: "2 Timoteo 3:16"



  },



  {



    id: 1931, difficulty: "dificil", category: "cartas",



    question: "?Que personajes menciona Pablo en 2 Timoteo 3:8 como opositores de Moises?",



    options: ["Balaam y Balac", "Simon y Levi", "Janes y Jambres", "Core y Datan"],



    correct: 2, reference: "2 Timoteo 3:8"



  },



  {



    id: 1932, difficulty: "dificil", category: "cartas",



    question: "?Que colaborador abandono a Pablo 'amando este mundo' segun 2 Timoteo?",



    options: ["Bernabe", "Demas", "Tito", "Marcos"],



    correct: 1, reference: "2 Timoteo 4:10"



  },



  {



    id: 1933, difficulty: "dificil", category: "cartas",



    question: "?Que sacerdocio superior al levitico presenta la carta a los Hebreos?",



    options: ["El sacerdocio segun el orden de Melquisedec", "El sacerdocio real de David", "El sacerdocio de Aaron", "El sacerdocio de Samuel"],



    correct: 0, reference: "Hebreos 7:1-17"



  },



  {



    id: 1934, difficulty: "dificil", category: "cartas",



    question: "?Que capitulo de Hebreos es conocido como 'el salon de la fe' por listar heroes de la fe del AT?",



    options: ["Hebreos 13", "Hebreos 12", "Hebreos 10", "Hebreos 11"],



    correct: 3, reference: "Hebreos 11"



  },



  {



    id: 1935, difficulty: "dificil", category: "cartas",



    question: "?Que advertencia severa da Hebreos 6:4-6 respecto a quienes han recibido la fe?",



    options: ["Que deben bautizarse nuevamente", "Que deben guardar el sabado", "Que es imposible renovar al arrepentimiento a quienes recayeron tras ser iluminados", "Que perderan sus recompensas pero no la salvacion"],



    correct: 2, reference: "Hebreos 6:4-6"



  },



  {



    id: 1936, difficulty: "dificil", category: "cartas",



    question: "?Que definicion de fe da el autor de Hebreos en 11:1?",



    options: ["Obedecer todos los mandamientos sin dudar", "Confiar en las promesas de los profetas", "La certeza de lo que se espera, la conviccion de lo que no se ve", "Creer sin ver ni entender"],



    correct: 2, reference: "Hebreos 11:1"



  },



  {



    id: 1937, difficulty: "dificil", category: "cartas",



    question: "?Que relacion establece Santiago entre la fe y las obras?",



    options: ["Que la fe sola salva sin obras", "Que la fe sin obras esta muerta", "Que las obras salvan sin fe", "Que fe y obras son incompatibles"],



    correct: 1, reference: "Santiago 2:17,26"



  },



  {



    id: 1938, difficulty: "dificil", category: "cartas",



    question: "?Que personaje del AT usa Santiago como ejemplo de fe manifestada en obras?",



    options: ["Abraham y Rahab", "Moises y David", "Noe y Daniel", "Jose y Job"],



    correct: 0, reference: "Santiago 2:21-25"



  },



  {



    id: 1939, difficulty: "dificil", category: "cartas",



    question: "?Que instruccion da Santiago respecto a los enfermos en la iglesia?",



    options: ["Que visiten al medico del pueblo", "Que llamen a los ancianos para que oren y los unjan con aceite", "Que ayunen por 40 dias", "Que ofrezcan sacrificios de accion de gracias"],



    correct: 1, reference: "Santiago 5:14-15"



  },



  {



    id: 1940, difficulty: "dificil", category: "cartas",



    question: "?Que concepto usa Pedro en 1 Pedro 2:9 para describir a los creyentes?",



    options: ["Hijos de la promesa", "Real sacerdocio, nacion santa, pueblo adquirido por Dios", "Ejercito del Senor", "Ciudadanos del cielo"],



    correct: 1, reference: "1 Pedro 2:9"



  },



  {



    id: 1941, difficulty: "dificil", category: "cartas",



    question: "?Que pasaje dificil de 1 Pedro 3:19 menciona que Cristo predico a los 'espiritus encarcelados'?",



    options: ["Que predico a los fariseos encarcelados", "Que predico a los angeles caidos o muertos del tiempo de Noe", "Que predico en el templo de Jerusalen", "Que predico a los discipulos con miedo"],



    correct: 1, reference: "1 Pedro 3:19-20"



  },



  {



    id: 1942, difficulty: "dificil", category: "cartas",



    question: "?Que falsos maestros denuncia Pedro en 2 Pedro 2 comparandolos con personajes del AT?",



    options: ["Saul y Absalon", "Angeles caidos, la generacion del diluvio y Sodoma", "Faraon y Goliat", "Core y Acan"],



    correct: 1, reference: "2 Pedro 2:4-6"



  },



  {



    id: 1943, difficulty: "dificil", category: "cartas",



    question: "?Que dice Pedro en 2 Pedro 3:8 sobre el tiempo de Dios?",



    options: ["Que Dios no cuenta el tiempo", "Que el fin vendra en la generacion presente", "Que un dia ante el Senor es como mil anos y mil anos como un dia", "Que los tiempos se han acortado"],



    correct: 2, reference: "2 Pedro 3:8"



  },



  {



    id: 1944, difficulty: "dificil", category: "cartas",



    question: "?Que prueba propone Juan en 1 Juan 4:2-3 para discernir el espiritu de verdad del de error?",



    options: ["Profetizar el futuro", "Confesar que Jesucristo ha venido en carne", "Hacer milagros", "Hablar en lenguas"],



    correct: 1, reference: "1 Juan 4:2-3"



  },



  {



    id: 1945, difficulty: "dificil", category: "cartas",



    question: "?Que herejia cristologica combate Juan en sus epistolas?",



    options: ["El pelagianismo", "El montanismo", "El arrianismo", "El docetismo (negar que Cristo vino en carne)"],



    correct: 3, reference: "1 Juan 4:2; 2 Juan 1:7"



  },



  {



    id: 1946, difficulty: "dificil", category: "cartas",



    question: "?A quien denuncia Juan en 3 Juan por no recibir a los hermanos y expulsar de la iglesia a quienes lo hacian?",



    options: ["Gayo", "Diotrefes", "Alejandro", "Demetrio"],



    correct: 1, reference: "3 Juan 1:9-10"



  },



  {



    id: 1947, difficulty: "dificil", category: "cartas",



    question: "?Que libro apocrifo cita Judas en su epistola sobre la disputa por el cuerpo de Moises?",



    options: ["El Testamento de los Doce Patriarcas", "El libro de Enoc", "La Asuncion de Moises", "El libro de los Jubileos"],



    correct: 2, reference: "Judas 1:9"



  },



  {



    id: 1948, difficulty: "dificil", category: "cartas",



    question: "?Que profecia de Enoc cita la epistola de Judas?",



    options: ["Sobre la venida del Senor con sus santas decenas de millares para hacer juicio", "Sobre el nacimiento del Mesias", "Sobre la caida de Babilonia", "Sobre el diluvio universal"],



    correct: 0, reference: "Judas 1:14-15"



  },



  {



    id: 1949, difficulty: "dificil", category: "cartas",



    question: "?Que grupo de cartas de Pablo se conoce como 'epistolas de la cautividad'?",



    options: ["Hebreos, Santiago, 1 y 2 Pedro", "1 y 2 Tesalonicenses, 1 y 2 Timoteo", "Efesios, Filipenses, Colosenses y Filemon", "Romanos, Galatas, 1 y 2 Corintios"],



    correct: 2, reference: "Efesios 3:1; Filipenses 1:13; Colosenses 4:18; Filemon 1:1"



  },



  // --- Historias Dificil (50 preguntas) ---



  {



    id: 74, difficulty: "dificil", category: "historias",



    question: "?Cuantas veces marcho Israel alrededor de Jerico el septimo dia?",



    options: ["3 veces", "1 vez", "7 veces", "13 veces"],



    correct: 2, reference: "Josue 6:15-16"



  },



  {



    id: 75, difficulty: "dificil", category: "historias",



    question: "?Que angel anuncio el nacimiento de Jesus a Maria?",



    options: ["Uriel", "Rafael", "Miguel", "Gabriel"],



    correct: 3, reference: "Lucas 1:26-28"



  },



  {



    id: 76, difficulty: "dificil", category: "historias",



    question: "?Cuantos anos vago Israel por el desierto?",



    options: ["40 anos", "30 anos", "20 anos", "50 anos"],



    correct: 0, reference: "Numeros 14:33-34"



  },



  {



    id: 900, difficulty: "dificil", category: "historias",



    question: "?Que pacto hizo Dios con Abraham sobre la tierra?",



    options: ["Pacto de las partes", "Pacto de arco iris", "Pacto de sal", "Pacto de sangre"],



    correct: 0, reference: "Genesis 15:9-18"



  },



  {



    id: 901, difficulty: "dificil", category: "historias",



    question: "?Cuantos anos reino David en Hebron antes de Jerusalen?",



    options: ["5 anos", "10 anos", "7 anos", "3 anos"],



    correct: 2, reference: "2 Samuel 5:5"



  },



  {



    id: 902, difficulty: "dificil", category: "historias",



    question: "?Que nacion deporto al reino del norte?",



    options: ["Persia", "Babilonia", "Asiria", "Egipto"],



    correct: 2, reference: "2 Reyes 17:6"



  },



  {



    id: 903, difficulty: "dificil", category: "historias",



    question: "?Cuantas tribus formaron el reino del norte?",



    options: ["12", "8", "5", "10"],



    correct: 3, reference: "1 Reyes 11:31"



  },



  {



    id: 904, difficulty: "dificil", category: "historias",



    question: "?Que pecado cometio Acan tras la conquista de Jerico?",



    options: ["Blasfemia", "Asesinato", "Robo del anatema", "Idolatria"],



    correct: 2, reference: "Josue 7:20-21"



  },



  {



    id: 905, difficulty: "dificil", category: "historias",



    question: "?Quien engano a Israel haciendose pasar por extranjeros lejanos?",



    options: ["Moabitas", "Filisteos", "Amalecitas", "Gabaonitas"],



    correct: 3, reference: "Josue 9:3-15"



  },



  {



    id: 906, difficulty: "dificil", category: "historias",



    question: "?Que rey dividio el reino de Israel?",



    options: ["Jeroboam", "Roboam", "Salomon", "David"],



    correct: 1, reference: "1 Reyes 12:16-17"



  },



  {



    id: 907, difficulty: "dificil", category: "historias",



    question: "?Cuantas deportaciones principales hubo a Babilonia?",



    options: ["3", "1", "4", "2"],



    correct: 0, reference: "2 Reyes 24-25"



  },



  {



    id: 908, difficulty: "dificil", category: "historias",



    question: "?Que fiesta celebraba Israel al cruzar a Canaan?",



    options: ["Purim", "Tabernaculos", "Pascua", "Pentecostes"],



    correct: 2, reference: "Josue 5:10"



  },



  {



    id: 909, difficulty: "dificil", category: "historias",



    question: "?Que rio se detuvo para que Israel cruzara?",



    options: ["Arnon", "Eufrates", "Jordan", "Nilo"],



    correct: 2, reference: "Josue 3:14-17"



  },



  {



    id: 910, difficulty: "dificil", category: "historias",



    question: "?En que batalla el sol se detuvo?",



    options: ["Gabaon", "Jerico", "Hai", "Laquis"],



    correct: 0, reference: "Josue 10:12-13"



  },



  {



    id: 911, difficulty: "dificil", category: "historias",



    question: "?Que hizo Gedeon con los 300 guerreros?",



    options: ["Toco trompetas y cantaros", "Ataco con espadas", "Uso hondas", "Lucho cuerpo a cuerpo"],



    correct: 0, reference: "Jueces 7:16-22"



  },



  {



    id: 912, difficulty: "dificil", category: "historias",



    question: "?Cuantos guerreros quedaron con Gedeon al final?",



    options: ["1000", "300", "500", "100"],



    correct: 1, reference: "Jueces 7:7"



  },



  {



    id: 913, difficulty: "dificil", category: "historias",



    question: "?Que ciudad fue destruida tras la derrota inicial de Israel por el pecado de Acan?",



    options: ["Gabaon", "Betel", "Jerico", "Hai"],



    correct: 3, reference: "Josue 7-8"



  },



  {



    id: 914, difficulty: "dificil", category: "historias",



    question: "?Que rey de Juda fue asesinado en Meguido?",



    options: ["Ezequias", "Manases", "Josias", "Asa"],



    correct: 2, reference: "2 Reyes 23:29"



  },



  {



    id: 915, difficulty: "dificil", category: "historias",



    question: "?Quien reconstruyo el templo tras el exilio?",



    options: ["Nehemias", "Esdras", "Zorobabel", "Ageo"],



    correct: 2, reference: "Esdras 3:8"



  },



  {



    id: 916, difficulty: "dificil", category: "historias",



    question: "?Cuantos anos duro el cautiverio babilonico?",



    options: ["70", "50", "100", "40"],



    correct: 0, reference: "Jeremias 25:11-12"



  },



  {



    id: 917, difficulty: "dificil", category: "historias",



    question: "?Que reina intento destruir la descendencia real de Juda?",



    options: ["Vasti", "Atalia", "Jezabel", "Ester"],



    correct: 1, reference: "2 Reyes 11:1"



  },



  {



    id: 918, difficulty: "dificil", category: "historias",



    question: "?Que profeta confronto a los profetas de Baal en el Carmelo?",



    options: ["Eliseo", "Elias", "Isaias", "Amos"],



    correct: 1, reference: "1 Reyes 18:20-40"



  },



  {



    id: 919, difficulty: "dificil", category: "historias",



    question: "?Quien financio la reconstruccion del templo segun Esdras?",



    options: ["Artajerjes", "Dario", "Nabucodonosor", "Ciro"],



    correct: 3, reference: "Esdras 1:1-4; 6:3-5"



  },



  {



    id: 920, difficulty: "dificil", category: "historias",



    question: "?Cuantas piedras tomo Josue del Jordan como memorial?",



    options: ["24", "10", "7", "12"],



    correct: 3, reference: "Josue 4:1-9"



  },



  {



    id: 921, difficulty: "dificil", category: "historias",



    question: "?Que evento provoco la dispersion de lenguas?",



    options: ["El exodo", "La torre de Babel", "El diluvio", "La conquista"],



    correct: 1, reference: "Genesis 11:7-9"



  },



  {



    id: 922, difficulty: "dificil", category: "historias",



    question: "?Quien fue el ultimo juez antes de la monarquia?",



    options: ["Gedeon", "Sanson", "Eli", "Samuel"],



    correct: 3, reference: "1 Samuel 7:15"



  },



  {



    id: 923, difficulty: "dificil", category: "historias",



    question: "?Que hizo Rajab con el cordon escarlata?",



    options: ["Se lo dio a los espias", "Lo ato en su mano", "Lo colgo de la ventana", "Lo enterro"],



    correct: 2, reference: "Josue 2:18-21"



  },



  {



    id: 924, difficulty: "dificil", category: "historias",



    question: "?Cuantos espias dieron un informe negativo?",



    options: ["12", "2", "8", "10"],



    correct: 3, reference: "Numeros 13:31-33"



  },



  {



    id: 925, difficulty: "dificil", category: "historias",



    question: "?Que rey de Moab oprimio a Israel 18 anos?",



    options: ["Og", "Eglon", "Sehon", "Balac"],



    correct: 1, reference: "Jueces 3:14"



  },



  {



    id: 926, difficulty: "dificil", category: "historias",



    question: "?Quien mato al rey Eglon?",



    options: ["Gedeon", "Aod", "Otoniel", "Samgar"],



    correct: 1, reference: "Jueces 3:21"



  },



  {



    id: 927, difficulty: "dificil", category: "historias",



    question: "?Que acontecio en el monte Carmelo?",



    options: ["Jesus fue tentado", "Moises recibio la ley", "Abraham sacrifico", "Elias desafio a Baal"],



    correct: 3, reference: "1 Reyes 18:20-40"



  },



  {



    id: 928, difficulty: "dificil", category: "historias",



    question: "?Cuantos hombres lucharon contra Sisara bajo Debora?",



    options: ["5,000", "10,000", "20,000", "30,000"],



    correct: 1, reference: "Jueces 4:10"



  },



  {



    id: 929, difficulty: "dificil", category: "historias",



    question: "?Que mujer mato a Sisara con una estaca?",



    options: ["Rut", "Debora", "Jael", "Rahab"],



    correct: 2, reference: "Jueces 4:21"



  },



  {



    id: 930, difficulty: "dificil", category: "historias",



    question: "?Cuantos anos de paz hubo tras la victoria de Debora?",



    options: ["80", "40", "20", "60"],



    correct: 1, reference: "Jueces 5:31"



  },



  {



    id: 931, difficulty: "dificil", category: "historias",



    question: "?Que pecado provoco el diluvio?",



    options: ["Desobediencia alimentaria", "Violencia y maldad generalizada", "Blasfemia", "Idolatria"],



    correct: 1, reference: "Genesis 6:5-7"



  },



  {



    id: 932, difficulty: "dificil", category: "historias",



    question: "?Cuantas personas se salvaron en el arca?",



    options: ["4", "12", "6", "8"],



    correct: 3, reference: "1 Pedro 3:20"



  },



  {



    id: 933, difficulty: "dificil", category: "historias",



    question: "?Que senal dio Dios despues del diluvio?",



    options: ["Un arcoiris", "Un terremoto", "Una paloma", "Una estrella"],



    correct: 0, reference: "Genesis 9:13"



  },



  {



    id: 934, difficulty: "dificil", category: "historias",



    question: "?A que edad murio Moises?",



    options: ["130", "110", "100", "120"],



    correct: 3, reference: "Deuteronomio 34:7"



  },



  {



    id: 935, difficulty: "dificil", category: "historias",



    question: "?Donde murio Moises?",



    options: ["Sinai", "Monte Nebo", "Jerico", "Jordan"],



    correct: 1, reference: "Deuteronomio 34:1-5"



  },



  {



    id: 936, difficulty: "dificil", category: "historias",



    question: "?Que hizo Josue tras cruzar el Jordan?",



    options: ["Oro en el monte", "Ataco Jerico", "Construyo un altar", "Circuncido al pueblo"],



    correct: 3, reference: "Josue 5:2-3"



  },



  {



    id: 937, difficulty: "dificil", category: "historias",



    question: "?Que tribu no recibio herencia territorial?",



    options: ["Juda", "Simeon", "Benjamin", "Levi"],



    correct: 3, reference: "Josue 13:33"



  },



  {



    id: 938, difficulty: "dificil", category: "historias",



    question: "?Que imperio conquisto Babilonia?",



    options: ["Griego", "Asirio", "Medo-Persa", "Romano"],



    correct: 2, reference: "Daniel 5:28-31"



  },



  {



    id: 939, difficulty: "dificil", category: "historias",



    question: "?Quien leyo la ley al pueblo tras el regreso del exilio?",



    options: ["Esdras", "Ageo", "Zorobabel", "Nehemias"],



    correct: 0, reference: "Nehemias 8:1-3"



  },



  {



    id: 940, difficulty: "dificil", category: "historias",



    question: "?Que conspiracion frustro Ester?",



    options: ["Asesinato de Ciro", "Destruccion de Jerusalen", "Rebelion contra Persia", "Exterminio de los judios"],



    correct: 3, reference: "Ester 7:3-6"



  },



  {



    id: 941, difficulty: "dificil", category: "historias",



    question: "?Quien planeo el exterminio de los judios en Persia?",



    options: ["Aman", "Dario", "Mardoqueo", "Asuero"],



    correct: 0, reference: "Ester 3:5-6"



  },



  {



    id: 942, difficulty: "dificil", category: "historias",



    question: "?Que fiesta celebra la liberacion narrada en Ester?",



    options: ["Purim", "Tabernaculos", "Pentecostes", "Pascua"],



    correct: 0, reference: "Ester 9:26-28"



  },



  {



    id: 943, difficulty: "dificil", category: "historias",



    question: "?Cuantos dias ayuno Ester antes de ir ante el rey?",



    options: ["40", "1", "7", "3"],



    correct: 3, reference: "Ester 4:16"



  },



  {



    id: 944, difficulty: "dificil", category: "historias",



    question: "?Que sucedio en el dia de Pentecostes segun Hechos?",



    options: ["Terremoto", "Lenguas de fuego y Espiritu Santo", "Transfiguracion", "Ascension"],



    correct: 1, reference: "Hechos 2:1-4"



  },



  {



    id: 945, difficulty: "dificil", category: "historias",



    question: "?Cuantos se convirtieron en el primer sermon de Pedro?",



    options: ["3,000", "1,000", "5,000", "500"],



    correct: 0, reference: "Hechos 2:41"



  },



  {



    id: 946, difficulty: "dificil", category: "historias",



    question: "?Que persecucion disperso a la iglesia primitiva?",



    options: ["Tras la muerte de Esteban", "De Pilato", "De Neron", "De Herodes"],



    correct: 0, reference: "Hechos 8:1"



  },



  // --- Vida de Jesus Dificil (50 preguntas) ---



  {



    id: 1500, difficulty: "dificil", category: "vida_jesus",



    question: "?Cuantos dias ayuno Jesus en el desierto antes de ser tentado por Satanas?",



    options: ["50 dias", "40 dias", "7 dias", "30 dias"],



    correct: 1, reference: "Mateo 4:2"



  },



  {



    id: 1501, difficulty: "dificil", category: "vida_jesus",



    question: "?A que edad fue encontrado Jesus ensenando en el templo de Jerusalen?",



    options: ["12 anos", "14 anos", "10 anos", "16 anos"],



    correct: 0, reference: "Lucas 2:42-46"



  },



  {



    id: 1502, difficulty: "dificil", category: "vida_jesus",



    question: "?En que rio fue bautizado Jesus por Juan el Bautista?",



    options: ["Jordan", "Nilo", "Eufrates", "Cedron"],



    correct: 0, reference: "Mateo 3:13"



  },



  {



    id: 1503, difficulty: "dificil", category: "vida_jesus",



    question: "?Cual fue la primera tentacion que Satanas le hizo a Jesus en el desierto?",



    options: ["Convertir piedras en pan", "Tirarse del templo", "Dominar los reinos", "Adorar a Satanas"],



    correct: 0, reference: "Mateo 4:3"



  },



  {



    id: 1504, difficulty: "dificil", category: "vida_jesus",



    question: "?En que ciudad Jesus realizo su primer milagro convirtiendo agua en vino?",



    options: ["Capernaum", "Cana de Galilea", "Nazaret", "Betania"],



    correct: 1, reference: "Juan 2:1-11"



  },



  {



    id: 1505, difficulty: "dificil", category: "vida_jesus",



    question: "?Que profeta del Antiguo Testamento profetizo que Jesus naceria en Belen?",



    options: ["Oseas", "Isaias", "Miqueas", "Jeremias"],



    correct: 2, reference: "Miqueas 5:2"



  },



  {



    id: 1506, difficulty: "dificil", category: "vida_jesus",



    question: "?A que discipulo le dijo Jesus 'sobre esta roca edificare mi iglesia'?",



    options: ["Juan", "Andres", "Santiago", "Pedro"],



    correct: 3, reference: "Mateo 16:18"



  },



  {



    id: 1507, difficulty: "dificil", category: "vida_jesus",



    question: "?Que monte subio Jesus para la Transfiguracion segun la tradicion?",



    options: ["Monte Carmelo", "Monte Tabor", "Monte de los Olivos", "Monte Sinai"],



    correct: 1, reference: "Mateo 17:1-2"



  },



  {



    id: 1508, difficulty: "dificil", category: "vida_jesus",



    question: "?Con quienes hablo Jesus durante la Transfiguracion?",



    options: ["Moises y Abraham", "Samuel y Elias", "Moises y Elias", "Abraham y David"],



    correct: 2, reference: "Mateo 17:3"



  },



  {



    id: 1509, difficulty: "dificil", category: "vida_jesus",



    question: "?Cuantas veces nego Pedro a Jesus antes de que cantara el gallo?",



    options: ["Dos veces", "Cuatro veces", "Una vez", "Tres veces"],



    correct: 3, reference: "Mateo 26:34, 69-75"



  },



  {



    id: 1510, difficulty: "dificil", category: "vida_jesus",



    question: "?Cuantas piezas de plata recibio Judas por traicionar a Jesus?",



    options: ["20", "40", "25", "30"],



    correct: 3, reference: "Mateo 26:15"



  },



  {



    id: 1511, difficulty: "dificil", category: "vida_jesus",



    question: "?En que jardin oro Jesus antes de ser arrestado?",



    options: ["Eden", "Jardin del Rey", "Huerto de Salomon", "Getsemani"],



    correct: 3, reference: "Mateo 26:36"



  },



  {



    id: 1512, difficulty: "dificil", category: "vida_jesus",



    question: "?Que gobernador romano se lavo las manos declarandose inocente de la sangre de Jesus?",



    options: ["Felix", "Pilato", "Herodes", "Festo"],



    correct: 1, reference: "Mateo 27:24"



  },



  {



    id: 1513, difficulty: "dificil", category: "vida_jesus",



    question: "?Quien ayudo a Jesus a cargar la cruz camino al Calvario?",



    options: ["Jose de Arimatea", "Nicodemo", "Bartolome", "Simon de Cirene"],



    correct: 3, reference: "Mateo 27:32"



  },



  {



    id: 1514, difficulty: "dificil", category: "vida_jesus",



    question: "?En que lugar especifico fue crucificado Jesus?",



    options: ["Monte de los Olivos", "Monte Carmelo", "Golgota (Calvario)", "Monte Sinai"],



    correct: 2, reference: "Mateo 27:33"



  },



  {



    id: 1515, difficulty: "dificil", category: "vida_jesus",



    question: "?Cuantos dias despues de su resurreccion ascendio Jesus al cielo?",



    options: ["40 dias", "7 dias", "50 dias", "3 dias"],



    correct: 0, reference: "Hechos 1:3, 9"



  },



  {



    id: 1516, difficulty: "dificil", category: "vida_jesus",



    question: "?Que dijo Jesus desde la cruz que cumplio la profecia del Salmo 22?",



    options: ["Todo esta consumado", "Tengo sed", "Padre, perdonalos", "Dios mio, Dios mio, ?por que me has desamparado?"],



    correct: 3, reference: "Mateo 27:46"



  },



  {



    id: 1517, difficulty: "dificil", category: "vida_jesus",



    question: "?A que ciudad iban los dos discipulos cuando Jesus resucitado camino con ellos?",



    options: ["Emaus", "Nazaret", "Betania", "Jerico"],



    correct: 0, reference: "Lucas 24:13"



  },



  {



    id: 1518, difficulty: "dificil", category: "vida_jesus",



    question: "?Que discipulo pidio ver las marcas de los clavos para creer en la resurreccion?",



    options: ["Pedro", "Tomas", "Andres", "Felipe"],



    correct: 1, reference: "Juan 20:25"



  },



  {



    id: 1519, difficulty: "dificil", category: "vida_jesus",



    question: "?Que nombre profetico de Jesus significa 'Dios con nosotros'?",



    options: ["Admirable", "Emanuel", "Consejero", "Mesias"],



    correct: 1, reference: "Mateo 1:23"



  },



  {



    id: 1520, difficulty: "dificil", category: "vida_jesus",



    question: "?A que pais huyo la familia de Jesus para escapar de Herodes?",



    options: ["Persia", "Egipto", "Babilonia", "Siria"],



    correct: 1, reference: "Mateo 2:14"



  },



  {



    id: 1521, difficulty: "dificil", category: "vida_jesus",



    question: "?Que parabola cuenta sobre un hombre que sembro buena semilla pero su enemigo sembro cizana?",



    options: ["El trigo y la cizana", "Los labradores malvados", "La semilla de mostaza", "El sembrador"],



    correct: 0, reference: "Mateo 13:24-30"



  },



  {



    id: 1522, difficulty: "dificil", category: "vida_jesus",



    question: "?Cuantos canastos sobraron tras la alimentacion de los cinco mil?",



    options: ["12", "10", "7", "5"],



    correct: 0, reference: "Mateo 14:20"



  },



  {



    id: 1523, difficulty: "dificil", category: "vida_jesus",



    question: "?Que impuesto pago Jesus con una moneda encontrada en la boca de un pez?",



    options: ["Tributo a Cesar", "Impuesto romano", "Diezmo del templo", "El impuesto del templo (didracma)"],



    correct: 3, reference: "Mateo 17:24-27"



  },



  {



    id: 1524, difficulty: "dificil", category: "vida_jesus",



    question: "?Cuantas veces dijo Jesus que debemos perdonar a nuestro hermano?",



    options: ["7 veces", "70 veces 7", "100 veces", "49 veces"],



    correct: 1, reference: "Mateo 18:22"



  },



  {



    id: 1525, difficulty: "dificil", category: "vida_jesus",



    question: "?Que mujer ungio los pies de Jesus con perfume costoso y los seco con su cabello?",



    options: ["Maria de Betania", "Marta", "La mujer samaritana", "Maria Magdalena"],



    correct: 0, reference: "Juan 12:3"



  },



  {



    id: 1526, difficulty: "dificil", category: "vida_jesus",



    question: "?Que arbol maldijo Jesus porque no tenia fruto?",



    options: ["Un sicomoro", "Una vid", "Un olivo", "Una higuera"],



    correct: 3, reference: "Marcos 11:13-14"



  },



  {



    id: 1527, difficulty: "dificil", category: "vida_jesus",



    question: "?Que rito establecio Jesus durante la ultima Cena?",



    options: ["La ofrenda", "La Santa Cena (Eucaristia)", "El lavamiento de pies", "El bautismo"],



    correct: 1, reference: "Lucas 22:19-20"



  },



  {



    id: 1528, difficulty: "dificil", category: "vida_jesus",



    question: "?En que Evangelio Jesus lava los pies de sus discipulos?",



    options: ["Mateo", "Lucas", "Juan", "Marcos"],



    correct: 2, reference: "Juan 13:4-5"



  },



  {



    id: 1529, difficulty: "dificil", category: "vida_jesus",



    question: "?A quien dijo Jesus 'De cierto te digo que hoy estaras conmigo en el paraiso'?",



    options: ["A Juan", "A su madre Maria", "Al ladron arrepentido", "A Pedro"],



    correct: 2, reference: "Lucas 23:43"



  },



  {



    id: 1530, difficulty: "dificil", category: "vida_jesus",



    question: "?Quien pidio el cuerpo de Jesus a Pilato para sepultarlo?",



    options: ["Juan", "Pedro", "Nicodemo", "Jose de Arimatea"],



    correct: 3, reference: "Mateo 27:57-58"



  },



  {



    id: 1531, difficulty: "dificil", category: "vida_jesus",



    question: "?Que profecia de Isaias habla del siervo sufriente que fue herido por nuestras rebeliones?",



    options: ["Isaias 53:5", "Isaias 7:14", "Isaias 40:3", "Isaias 9:6"],



    correct: 0, reference: "Isaias 53:5"



  },



  {



    id: 1532, difficulty: "dificil", category: "vida_jesus",



    question: "?Cual fue el primer mandamiento segun Jesus cuando se lo preguntaron?",



    options: ["No robaras", "No mataras", "Honra a tu padre y madre", "Amaras al Senor tu Dios con todo tu corazon"],



    correct: 3, reference: "Marcos 12:29-30"



  },



  {



    id: 1533, difficulty: "dificil", category: "vida_jesus",



    question: "?Que le dijo Jesus a Nicodemo sobre nacer de nuevo?",



    options: ["Que debia guardar la ley", "Que debia bautizarse solamente", "Que debia hacer buenas obras", "Que debia nacer del agua y del Espiritu"],



    correct: 3, reference: "Juan 3:5"



  },



  {



    id: 1534, difficulty: "dificil", category: "vida_jesus",



    question: "?En que ciudad vivio Jesus la mayor parte de su ministerio publico?",



    options: ["Capernaum", "Jerusalen", "Betania", "Nazaret"],



    correct: 0, reference: "Mateo 4:13"



  },



  {



    id: 1535, difficulty: "dificil", category: "vida_jesus",



    question: "?Que pregunto Pilato a la multitud sobre Jesus y Barrabas?",



    options: ["?Lo conozco acaso?", "?Que mal ha hecho?", "?A cual de los dos quereis que os suelte?", "?Es este el rey de los judios?"],



    correct: 2, reference: "Mateo 27:21"



  },



  {



    id: 1536, difficulty: "dificil", category: "vida_jesus",



    question: "?Que senal se produjo en el templo cuando Jesus murio en la cruz?",



    options: ["Se derrumbo el altar", "Las puertas se abrieron solas", "El velo del templo se rasgo en dos", "Cayo fuego del cielo"],



    correct: 2, reference: "Mateo 27:51"



  },



  {



    id: 1537, difficulty: "dificil", category: "vida_jesus",



    question: "?Cuantos discipulos estaban presentes en la Transfiguracion de Jesus?",



    options: ["4", "2", "3", "12"],



    correct: 2, reference: "Mateo 17:1"



  },



  {



    id: 1538, difficulty: "dificil", category: "vida_jesus",



    question: "?Que parabola ensena sobre diez virgenes esperando al esposo?",



    options: ["Las diez virgenes", "Los talentos", "Las diez minas", "La red"],



    correct: 0, reference: "Mateo 25:1-13"



  },



  {



    id: 1539, difficulty: "dificil", category: "vida_jesus",



    question: "?A que mujer gentil le dijo Jesus que su fe era grande al sanar a su hija?",



    options: ["La mujer samaritana", "Marta de Betania", "Maria Magdalena", "La mujer cananea (sirofenicia)"],



    correct: 3, reference: "Mateo 15:22-28"



  },



  {



    id: 1540, difficulty: "dificil", category: "vida_jesus",



    question: "?Que declaro Jesus ser en Juan 6:35?",



    options: ["La luz del mundo", "La puerta", "El camino", "El pan de vida"],



    correct: 3, reference: "Juan 6:35"



  },



  {



    id: 1541, difficulty: "dificil", category: "vida_jesus",



    question: "?En que lugar predico Jesus el Sermon del Monte?",



    options: ["Junto al mar de Galilea", "En Jerusalen", "En un monte cerca de Capernaum", "En el templo"],



    correct: 2, reference: "Mateo 5:1"



  },



  {



    id: 1542, difficulty: "dificil", category: "vida_jesus",



    question: "?Que discipulo camino sobre el agua hacia Jesus pero comenzo a hundirse?",



    options: ["Juan", "Pedro", "Andres", "Santiago"],



    correct: 1, reference: "Mateo 14:29-30"



  },



  {



    id: 1543, difficulty: "dificil", category: "vida_jesus",



    question: "?Que profecia de Zacarias se cumplio cuando Jesus entro en Jerusalen montado en un burro?",



    options: ["Zacarias 9:9", "Zacarias 14:4", "Zacarias 12:10", "Zacarias 11:12"],



    correct: 0, reference: "Zacarias 9:9"



  },



  {



    id: 1544, difficulty: "dificil", category: "vida_jesus",



    question: "?Que le dijo Jesus a la mujer samaritana junto al pozo de Jacob?",



    options: ["Que le diera de beber", "Que lo siguiera", "Que le diera limosna", "Que fuera al templo"],



    correct: 0, reference: "Juan 4:7"



  },



  {



    id: 1545, difficulty: "dificil", category: "vida_jesus",



    question: "?Que dijo Jesus que representaba el pan en la ultima Cena?",



    options: ["El mana del cielo", "La ley de Moises", "La Palabra de Dios", "Su cuerpo"],



    correct: 3, reference: "Lucas 22:19"



  },



  {



    id: 1546, difficulty: "dificil", category: "vida_jesus",



    question: "?Cual de los Evangelios narra la visita de los magos de oriente al nino Jesus?",



    options: ["Mateo", "Juan", "Lucas", "Marcos"],



    correct: 0, reference: "Mateo 2:1-2"



  },



  {



    id: 1547, difficulty: "dificil", category: "vida_jesus",



    question: "?Que dijo Jesus a sus discipulos que seria la senal de su segunda venida?",



    options: ["Todas las anteriores", "Sol oscurecido y estrellas cayendo", "El Hijo del Hombre viniendo en las nubes", "Terremotos y hambres"],



    correct: 0, reference: "Mateo 24:29-30"



  },



  {



    id: 1548, difficulty: "dificil", category: "vida_jesus",



    question: "?Quien era el sumo sacerdote que interrogo a Jesus la noche de su arresto?",



    options: ["Aaron", "Zacarias", "Anas", "Caifas"],



    correct: 3, reference: "Mateo 26:57"



  },



  {



    id: 1549, difficulty: "dificil", category: "vida_jesus",



    question: "?Que declaracion 'Yo soy' hizo Jesus en Juan 11:25?",



    options: ["Yo soy la vid verdadera", "Yo soy la resurreccion y la vida", "Yo soy el camino, la verdad y la vida", "Yo soy el buen pastor"],



    correct: 1, reference: "Juan 11:25"



  },



  // --- Milagros ---



  {



    id: 1700, difficulty: "dificil", category: "milagros",



    question: "?Cuantos panes y peces uso Jesus para alimentar a los 4,000?",



    options: ["7 panes y unos pocos peces", "10 panes y 3 peces", "5 panes y 2 peces", "3 panes y 5 peces"],



    correct: 0, reference: "Mateo 15:34-38"



  },



  {



    id: 1701, difficulty: "dificil", category: "milagros",



    question: "?Cuantas canastas sobraron despues de alimentar a los 5,000?",



    options: ["7 canastas", "5 canastas", "12 cestas", "3 cestas"],



    correct: 2, reference: "Mateo 14:20"



  },



  {



    id: 1702, difficulty: "dificil", category: "milagros",



    question: "?Que tipo de canastas sobraron tras alimentar a los 4,000 a diferencia de los 5,000?",



    options: ["Canastas grandes (spyris)", "Sacos de tela", "Odres de cuero", "Cestas pequenas (kophinos)"],



    correct: 0, reference: "Mateo 15:37"



  },



  {



    id: 1703, difficulty: "dificil", category: "milagros",



    question: "?Que hizo Jesus antes de sanar al sordomudo en Decapolis?",



    options: ["Oro en voz alta", "Le impuso las manos", "Le dijo que se lavara en el Jordan", "Metio sus dedos en los oidos del hombre y toco su lengua con saliva"],



    correct: 3, reference: "Marcos 7:33"



  },



  {



    id: 1704, difficulty: "dificil", category: "milagros",



    question: "?Que palabra aramea dijo Jesus al sanar al sordomudo?",



    options: ["Raboni", "Talita cumi", "Eli, Eli", "Efata"],



    correct: 3, reference: "Marcos 7:34"



  },



  {



    id: 1705, difficulty: "dificil", category: "milagros",



    question: "?En que ciudad Eliseo sano las aguas echando sal en el manantial?",



    options: ["Gilgal", "Betel", "Samaria", "Jerico"],



    correct: 3, reference: "2 Reyes 2:19-22"



  },



  {



    id: 1706, difficulty: "dificil", category: "milagros",



    question: "?Que sucedio cuando el cadaver de un hombre toco los huesos de Eliseo?",



    options: ["Se convirtio en polvo", "Fue consumido por fuego", "Se preservo sin corrupcion", "Resucito"],



    correct: 3, reference: "2 Reyes 13:21"



  },



  {



    id: 1707, difficulty: "dificil", category: "milagros",



    question: "?Cuantas veces se zambullo Naaman en el Jordan para ser sanado de lepra?",



    options: ["3 veces", "7 veces", "5 veces", "12 veces"],



    correct: 1, reference: "2 Reyes 5:14"



  },



  {



    id: 1708, difficulty: "dificil", category: "milagros",



    question: "?Que profeta le indico a Naaman que se lavara en el Jordan?",



    options: ["Elias", "Eliseo", "Natan", "Isaias"],



    correct: 1, reference: "2 Reyes 5:10"



  },



  {



    id: 1709, difficulty: "dificil", category: "milagros",



    question: "?Que le sucedio a Giezi, el siervo de Eliseo, por su codicia con Naaman?",



    options: ["Se volvio leproso", "Fue desterrado", "Murio instantaneamente", "Quedo ciego"],



    correct: 0, reference: "2 Reyes 5:27"



  },



  {



    id: 1710, difficulty: "dificil", category: "milagros",



    question: "?Que uso Eliseo para purificar la olla de comida envenenada?",



    options: ["Harina", "Agua del Jordan", "Aceite", "Sal"],



    correct: 0, reference: "2 Reyes 4:41"



  },



  {



    id: 1711, difficulty: "dificil", category: "milagros",



    question: "?Cuantas veces estornudo el hijo de la sunamita al ser resucitado por Eliseo?",



    options: ["5 veces", "No estornudo", "3 veces", "7 veces"],



    correct: 3, reference: "2 Reyes 4:35"



  },



  {



    id: 1712, difficulty: "dificil", category: "milagros",



    question: "?En que estanque Jesus sano al paralitico que habia estado enfermo 38 anos?",



    options: ["Betesda", "El estanque del rey", "Siloe", "Gihon"],



    correct: 0, reference: "Juan 5:2-9"



  },



  {



    id: 1713, difficulty: "dificil", category: "milagros",



    question: "?Cuantos anos llevaba enfermo el paralitico del estanque de Betesda?",



    options: ["18 anos", "40 anos", "12 anos", "38 anos"],



    correct: 3, reference: "Juan 5:5"



  },



  {



    id: 1714, difficulty: "dificil", category: "milagros",



    question: "?Que hizo Jesus con barro para sanar al ciego de nacimiento?",



    options: ["Lo puso en sus oidos", "Lo aplico en su frente", "Lo puso en sus ojos y le dijo que se lavara en Siloe", "Lo froto en sus manos"],



    correct: 2, reference: "Juan 9:6-7"



  },



  {



    id: 1715, difficulty: "dificil", category: "milagros",



    question: "?En que piscina debia lavarse el ciego de nacimiento sanado por Jesus?",



    options: ["Siloe", "Betesda", "Gihon", "El estanque superior"],



    correct: 0, reference: "Juan 9:7"



  },



  {



    id: 1716, difficulty: "dificil", category: "milagros",



    question: "?Cuantos dias llevaba muerto Lazaro cuando Jesus llego a Betania?",



    options: ["2 dias", "7 dias", "4 dias", "3 dias"],



    correct: 2, reference: "Juan 11:39"



  },



  {



    id: 1717, difficulty: "dificil", category: "milagros",



    question: "?Cual fue la primera senal milagrosa de Jesus segun el Evangelio de Juan?",



    options: ["Convertir el agua en vino", "La pesca milagrosa", "Sanar al hijo de un noble", "Caminar sobre el agua"],



    correct: 0, reference: "Juan 2:11"



  },



  {



    id: 1718, difficulty: "dificil", category: "milagros",



    question: "?En que boda realizo Jesus su primer milagro?",



    options: ["En Betania", "En Cana de Galilea", "En Nazaret", "En Jerusalen"],



    correct: 1, reference: "Juan 2:1-11"



  },



  {



    id: 1719, difficulty: "dificil", category: "milagros",



    question: "?Cuantas tinajas de agua convirtio Jesus en vino en Cana?",



    options: ["6 tinajas", "4 tinajas", "12 tinajas", "7 tinajas"],



    correct: 0, reference: "Juan 2:6"



  },



  {



    id: 1720, difficulty: "dificil", category: "milagros",



    question: "?Que capacidad tenia cada tinaja en las bodas de Cana?",



    options: ["De dos a tres cantaros", "De medio cantaro", "De cinco a diez cantaros", "De uno a tres cantaros"],



    correct: 0, reference: "Juan 2:6"



  },



  {



    id: 1721, difficulty: "dificil", category: "milagros",



    question: "?Que apostol camino sobre el agua junto con Jesus?",



    options: ["Andres", "Santiago", "Pedro", "Juan"],



    correct: 2, reference: "Mateo 14:29"



  },



  {



    id: 1722, difficulty: "dificil", category: "milagros",



    question: "?Que pidio Pedro a Jesus antes de caminar sobre el agua?",



    options: ["Que le mandara ir sobre las aguas", "Que le diera fe", "Que calmara la tormenta", "Que lo salvara"],



    correct: 0, reference: "Mateo 14:28"



  },



  {



    id: 1723, difficulty: "dificil", category: "milagros",



    question: "?Que parte del cuerpo le corto Pedro al siervo del sumo sacerdote, y como respondio Jesus?",



    options: ["La oreja izquierda; la restituyo", "El brazo; lo vendo", "La oreja derecha; la sano", "La mano; la restauro"],



    correct: 2, reference: "Lucas 22:50-51"



  },



  {



    id: 1724, difficulty: "dificil", category: "milagros",



    question: "?Como se llamaba el siervo del sumo sacerdote cuya oreja corto Pedro?",



    options: ["Barrabas", "Nicodemo", "Cleofas", "Malco"],



    correct: 3, reference: "Juan 18:10"



  },



  {



    id: 1725, difficulty: "dificil", category: "milagros",



    question: "?Cuantos endemoniados gadarenos sano Jesus segun el Evangelio de Mateo?",



    options: ["Una multitud", "Tres", "Dos", "Uno"],



    correct: 2, reference: "Mateo 8:28"



  },



  {



    id: 1726, difficulty: "dificil", category: "milagros",



    question: "?Como se llamaba la legion de demonios que poseia al endemoniado gadareno?",



    options: ["Legion", "Belcebu", "Belial", "Asmodeo"],



    correct: 0, reference: "Marcos 5:9"



  },



  {



    id: 1727, difficulty: "dificil", category: "milagros",



    question: "?A donde pidieron los demonios de Legion que Jesus los enviara?",



    options: ["Al abismo", "Al mar", "A una piara de cerdos", "Al desierto"],



    correct: 2, reference: "Marcos 5:12-13"



  },



  {



    id: 1728, difficulty: "dificil", category: "milagros",



    question: "?Cuantos cerdos se ahogaron cuando los demonios entraron en ellos en Gadara?",



    options: ["Unos 1,000", "Unos 500", "Unos 2,000", "Unos 5,000"],



    correct: 2, reference: "Marcos 5:13"



  },



  {



    id: 1729, difficulty: "dificil", category: "milagros",



    question: "?Cuantos anos llevaba enferma la mujer con flujo de sangre que toco el manto de Jesus?",



    options: ["10 anos", "18 anos", "7 anos", "12 anos"],



    correct: 3, reference: "Marcos 5:25"



  },



  {



    id: 1730, difficulty: "dificil", category: "milagros",



    question: "?Que parte del vestido de Jesus toco la mujer con flujo de sangre?",



    options: ["La manga", "El borde de su manto", "El hombro", "El cinturon"],



    correct: 1, reference: "Marcos 5:27"



  },



  {



    id: 1731, difficulty: "dificil", category: "milagros",



    question: "?Cuantos leprosos sano Jesus de los cuales solo uno volvio a dar gracias?",



    options: ["7 leprosos", "10 leprosos", "5 leprosos", "12 leprosos"],



    correct: 1, reference: "Lucas 17:12-17"



  },



  {



    id: 1732, difficulty: "dificil", category: "milagros",



    question: "?De que nacionalidad era el leproso que regreso a agradecer a Jesus?",



    options: ["Samaritano", "Judio", "Galileo", "Griego"],



    correct: 0, reference: "Lucas 17:16"



  },



  {



    id: 1733, difficulty: "dificil", category: "milagros",



    question: "?En que ciudad Elias resucito al hijo de la viuda?",



    options: ["Jerico", "Jerusalen", "Betel", "Sarepta de Sidon"],



    correct: 3, reference: "1 Reyes 17:9-24"



  },



  {



    id: 1734, difficulty: "dificil", category: "milagros",



    question: "?Cuantas veces se tendio Elias sobre el hijo muerto de la viuda de Sarepta?",



    options: ["Dos veces", "Siete veces", "Una vez", "Tres veces"],



    correct: 3, reference: "1 Reyes 17:21"



  },



  {



    id: 1735, difficulty: "dificil", category: "milagros",



    question: "?Que milagro realizo Eliseo con veinte panes de cebada?",



    options: ["Los preservo por un ano", "Los multiplico para todo Israel", "Los convirtio en trigo", "Alimento a cien hombres"],



    correct: 3, reference: "2 Reyes 4:42-44"



  },



  {



    id: 1736, difficulty: "dificil", category: "milagros",



    question: "?Que instrumento uso Moises para endulzar las aguas amargas de Mara?",



    options: ["Una piedra", "Un arbol (madera)", "Sal", "Arena del desierto"],



    correct: 1, reference: "Exodo 15:25"



  },



  {



    id: 1737, difficulty: "dificil", category: "milagros",



    question: "?Que le sucedio a la mano de Moises cuando la metio en su seno ante la zarza ardiente?",



    options: ["Brillo con luz", "Se volvio leprosa", "Se lleno de fuego", "Se seco"],



    correct: 1, reference: "Exodo 4:6"



  },



  {



    id: 1738, difficulty: "dificil", category: "milagros",



    question: "?Que plaga de Egipto los magos de Faraon no pudieron imitar?",



    options: ["La sangre", "Los piojos", "Las moscas", "Las ranas"],



    correct: 1, reference: "Exodo 8:18-19"



  },



  {



    id: 1739, difficulty: "dificil", category: "milagros",



    question: "?Cual fue la ultima plaga de Egipto antes de la muerte de los primogenitos?",



    options: ["ulceras", "Granizo", "Tinieblas", "Langostas"],



    correct: 2, reference: "Exodo 10:21-23"



  },



  {



    id: 1740, difficulty: "dificil", category: "milagros",



    question: "?Cuantos dias duraron las tinieblas sobre Egipto en la novena plaga?",



    options: ["1 dia", "7 dias", "3 dias", "40 dias"],



    correct: 2, reference: "Exodo 10:22"



  },



  {



    id: 1741, difficulty: "dificil", category: "milagros",



    question: "?Quien fue resucitado por el apostol Pedro en Jope?",



    options: ["Dorcas (Tabita)", "Priscila", "Rode", "Lidia"],



    correct: 0, reference: "Hechos 9:36-41"



  },



  {



    id: 1742, difficulty: "dificil", category: "milagros",



    question: "?Que joven cayo de una ventana y murio mientras Pablo predicaba, pero fue resucitado?",



    options: ["Eutico", "Tito", "Bernabe", "Timoteo"],



    correct: 0, reference: "Hechos 20:9-12"



  },



  {



    id: 1743, difficulty: "dificil", category: "milagros",



    question: "?Desde que piso cayo Eutico mientras Pablo predicaba en Troas?",



    options: ["El cuarto piso", "El techo", "El segundo piso", "El tercer piso"],



    correct: 3, reference: "Hechos 20:9"



  },



  {



    id: 1744, difficulty: "dificil", category: "milagros",



    question: "?Que milagro realizo la vara de Aaron ante Faraon?",



    options: ["Produjo fuego", "Se convirtio en serpiente", "Florecio", "Broto agua"],



    correct: 1, reference: "Exodo 7:10"



  },



  {



    id: 1745, difficulty: "dificil", category: "milagros",



    question: "?Que produjo la vara de Aaron al florecer en el tabernaculo?",



    options: ["Almendras", "Higos", "Rosas", "Lirios"],



    correct: 0, reference: "Numeros 17:8"



  },



  {



    id: 1746, difficulty: "dificil", category: "milagros",



    question: "?Que le sucedio al altar cuando el profeta de Juda profetizo contra Jeroboam?",



    options: ["Se derrumbo completamente", "Se incendio", "Se partio y la ceniza se derramo", "Temblo"],



    correct: 2, reference: "1 Reyes 13:5"



  },



  {



    id: 1747, difficulty: "dificil", category: "milagros",



    question: "?Que le paso a la mano de Jeroboam cuando la extendio contra el profeta de Juda?",



    options: ["Se seco", "Se quemo", "Se lleno de lepra", "Fue cortada"],



    correct: 0, reference: "1 Reyes 13:4"



  },



  {



    id: 1748, difficulty: "dificil", category: "milagros",



    question: "?A que hijo de la sunamita resucito Eliseo y que envio primero?",



    options: ["A su hija; envio aceite", "A su esposo; envio agua", "A su sobrino; envio pan", "A su hijo; envio su baculo con Giezi"],



    correct: 3, reference: "2 Reyes 4:29-35"



  },



  {



    id: 1749, difficulty: "dificil", category: "milagros",



    question: "?Que animal mordio a Pablo en la isla de Malta sin causarle dano?",



    options: ["Una arana", "Un escorpion", "Un aspid", "Una vibora"],



    correct: 3, reference: "Hechos 28:3-6"



  },



  // ===================== EXPERTO =====================



  // --- Libros Experto (50 preguntas) ---



  {



    id: 400, difficulty: "experto", category: "libros",



    question: "?En que libro se presenta por primera vez el concepto del 'Redentor' (Goel)?",



    options: ["Job", "Genesis", "Isaias", "Rut"],



    correct: 3, reference: "Rut 3:9-13"



  },



  {



    id: 401, difficulty: "experto", category: "libros",



    question: "?Que libro conecta el pacto abrahamico con la ley mosaica?",



    options: ["Exodo", "Hebreos", "Galatas", "Romanos"],



    correct: 2, reference: "Galatas 3:15-18"



  },



  {



    id: 402, difficulty: "experto", category: "libros",



    question: "?En que libro se revela progresivamente el concepto de resurreccion corporal?",



    options: ["Job", "Salmos", "Daniel", "Isaias"],



    correct: 2, reference: "Daniel 12:2"



  },



  {



    id: 403, difficulty: "experto", category: "libros",



    question: "?Que libro presenta el primer 'tipo' claro de sacrificio sustitutorio?",



    options: ["Hebreos", "Exodo", "Levitico", "Genesis"],



    correct: 3, reference: "Genesis 22:13"



  },



  {



    id: 404, difficulty: "experto", category: "libros",



    question: "?En que libro se desarrolla la teologia del 'remanente fiel'?",



    options: ["Isaias", "Amos", "Joel", "Nahum"],



    correct: 0, reference: "Isaias 10:20-22"



  },



  {



    id: 405, difficulty: "experto", category: "libros",



    question: "?Que libro une sacerdocio y realeza en una sola figura?",



    options: ["Hebreos", "Daniel", "Zacarias", "Salmos"],



    correct: 0, reference: "Hebreos 7"



  },



  {



    id: 406, difficulty: "experto", category: "libros",



    question: "?En que libro se establece el patron biblico del pacto matrimonial?",



    options: ["Cantares", "Rut", "Proverbios", "Genesis"],



    correct: 3, reference: "Genesis 2:24"



  },



  {



    id: 407, difficulty: "experto", category: "libros",



    question: "?Que libro contiene el himno cristologico mas antiguo registrado?",



    options: ["Filipenses", "Hebreos", "Romanos", "Colosenses"],



    correct: 0, reference: "Filipenses 2:5-11"



  },



  {



    id: 408, difficulty: "experto", category: "libros",



    question: "?En que libro se formula con mayor claridad la doctrina de la expiacion?",



    options: ["Galatas", "Hebreos", "Isaias", "Romanos"],



    correct: 3, reference: "Romanos 3:21-26"



  },



  {



    id: 409, difficulty: "experto", category: "libros",



    question: "?Que libro presenta a Cristo como cumplimiento del sistema levitico?",



    options: ["Hebreos", "Efesios", "Tito", "Galatas"],



    correct: 0, reference: "Hebreos 9-10"



  },



  {



    id: 410, difficulty: "experto", category: "libros",



    question: "?En que libro aparece el concepto de 'nuevo corazon'?",



    options: ["Ezequiel", "Isaias", "Daniel", "Jeremias"],



    correct: 0, reference: "Ezequiel 36:26"



  },



  {



    id: 411, difficulty: "experto", category: "libros",



    question: "?Que libro muestra el conflicto entre soberania divina y libre albedrio?",



    options: ["Salmos", "Proverbios", "Job", "Eclesiastes"],



    correct: 2, reference: "Job 1-2; 38-42"



  },



  {



    id: 412, difficulty: "experto", category: "libros",



    question: "?En que libro se anticipa el Nuevo Pacto con mayor detalle?",



    options: ["Isaias", "Oseas", "Daniel", "Jeremias"],



    correct: 3, reference: "Jeremias 31:31-34"



  },



  {



    id: 413, difficulty: "experto", category: "libros",



    question: "?Que libro presenta la teologia del 'siervo sufriente' como figura mesianica?",



    options: ["Zacarias", "Isaias", "Salmos", "Malaquias"],



    correct: 1, reference: "Isaias 52:13-53:12"



  },



  {



    id: 414, difficulty: "experto", category: "libros",



    question: "?En que libro se desarrolla el concepto de 'sabiduria personificada'?",



    options: ["Eclesiastes", "Proverbios", "Job", "Salmos"],



    correct: 1, reference: "Proverbios 8:22-31"



  },



  {



    id: 415, difficulty: "experto", category: "libros",



    question: "?Que libro confronta directamente el problema del sufrimiento justo?",



    options: ["Job", "Lamentaciones", "Eclesiastes", "Salmos"],



    correct: 0, reference: "Job"



  },



  {



    id: 416, difficulty: "experto", category: "libros",



    question: "?En que libro se revela la union mistica entre Cristo y la Iglesia?",



    options: ["Romanos", "Colosenses", "Efesios", "Hebreos"],



    correct: 2, reference: "Efesios 5:25-32"



  },



  {



    id: 417, difficulty: "experto", category: "libros",



    question: "?Que libro conecta la creacion original con la nueva creacion?",



    options: ["Romanos", "Isaias", "Hebreos", "Apocalipsis"],



    correct: 3, reference: "Apocalipsis 21:1-5"



  },



  {



    id: 418, difficulty: "experto", category: "libros",



    question: "?En que libro se expone la doctrina de la justificacion forense?",



    options: ["Romanos", "Tito", "Efesios", "Galatas"],



    correct: 0, reference: "Romanos 3:21-28"



  },



  {



    id: 419, difficulty: "experto", category: "libros",



    question: "?Que libro desarrolla el concepto del 'misterio revelado'?",



    options: ["Colosenses", "Filipenses", "Efesios", "Filemon"],



    correct: 2, reference: "Efesios 3:3-6"



  },



  {



    id: 420, difficulty: "experto", category: "libros",



    question: "?En que libro se presenta la tipologia del segundo Adan?",



    options: ["Hebreos", "Romanos", "Galatas", "1 Corintios"],



    correct: 3, reference: "1 Corintios 15:45"



  },



  {



    id: 421, difficulty: "experto", category: "libros",



    question: "?Que libro muestra la relacion entre ley, gracia y fe?",



    options: ["Galatas", "Hebreos", "Judas", "Tito"],



    correct: 0, reference: "Galatas 3"



  },



  {



    id: 422, difficulty: "experto", category: "libros",



    question: "?En que libro se formula una escatologia sistematica?",



    options: ["Daniel", "Apocalipsis", "Joel", "Isaias"],



    correct: 1, reference: "Apocalipsis"



  },



  {



    id: 423, difficulty: "experto", category: "libros",



    question: "?Que libro presenta el Reino de Dios en parabolas progresivas?",



    options: ["Juan", "Marcos", "Lucas", "Mateo"],



    correct: 3, reference: "Mateo 13"



  },



  {



    id: 424, difficulty: "experto", category: "libros",



    question: "?En que libro se enfatiza la etica del Reino?",



    options: ["Mateo", "Juan", "Marcos", "Lucas"],



    correct: 0, reference: "Mateo 5-7"



  },



  {



    id: 425, difficulty: "experto", category: "libros",



    question: "?Que libro presenta la alta cristologia mas explicita?",



    options: ["Juan", "Mateo", "Marcos", "Lucas"],



    correct: 0, reference: "Juan 1:1-18"



  },



  {



    id: 426, difficulty: "experto", category: "libros",



    question: "?En que libro se revela la identidad mesianica por senales?",



    options: ["Marcos", "Lucas", "Mateo", "Juan"],



    correct: 3, reference: "Juan 20:30-31"



  },



  {



    id: 427, difficulty: "experto", category: "libros",



    question: "?Que libro conecta Pentecostes con Joel?",



    options: ["Hechos", "Galatas", "Hebreos", "Romanos"],



    correct: 0, reference: "Hechos 2:16-21"



  },



  {



    id: 428, difficulty: "experto", category: "libros",



    question: "?En que libro se sistematiza la doctrina del Espiritu Santo?",



    options: ["Romanos", "Juan", "Hechos", "Galatas"],



    correct: 0, reference: "Romanos 8"



  },



  {



    id: 429, difficulty: "experto", category: "libros",



    question: "?Que libro desarrolla la perseverancia de los santos?",



    options: ["Filemon", "Judas", "Hebreos", "Tito"],



    correct: 2, reference: "Hebreos 6; 10:26-39"



  },



  {



    id: 430, difficulty: "experto", category: "libros",



    question: "?En que libro se presenta la teologia del exilio espiritual?",



    options: ["Isaias", "Jeremias", "Lamentaciones", "1 Pedro"],



    correct: 3, reference: "1 Pedro 1:1; 2:11"



  },



  {



    id: 431, difficulty: "experto", category: "libros",



    question: "?Que libro expone la guerra espiritual cosmica?",



    options: ["Efesios", "Daniel", "Tito", "Judas"],



    correct: 0, reference: "Efesios 6:10-18"



  },



  {



    id: 432, difficulty: "experto", category: "libros",



    question: "?En que libro se articula la mision a los gentiles?",



    options: ["Hechos", "Mateo", "Romanos", "Juan"],



    correct: 0, reference: "Hechos 13:46-47"



  },



  {



    id: 433, difficulty: "experto", category: "libros",



    question: "?Que libro desarrolla el liderazgo apostolico pastoral?",



    options: ["1 Timoteo", "Hebreos", "Pedro", "Judas"],



    correct: 0, reference: "1 Timoteo 3"



  },



  {



    id: 434, difficulty: "experto", category: "libros",



    question: "?En que libro se muestra la intercesion celestial de Cristo?",



    options: ["Romanos", "Juan", "Hebreos", "Pedro"],



    correct: 2, reference: "Hebreos 7:25"



  },



  {



    id: 435, difficulty: "experto", category: "libros",



    question: "?Que libro presenta la escatologia inaugurada ('ya, pero todavia no')?",



    options: ["Romanos", "Tito", "Hebreos", "1 Corintios"],



    correct: 3, reference: "1 Corintios 15:20-28"



  },



  {



    id: 436, difficulty: "experto", category: "libros",



    question: "?En que libro se describe la apostasia final con detalle?",



    options: ["Tito", "Judas", "Filemon", "2 Tesalonicenses"],



    correct: 3, reference: "2 Tesalonicenses 2:1-12"



  },



  {



    id: 437, difficulty: "experto", category: "libros",



    question: "?Que libro conecta creacion, caida y redencion en poesia?",



    options: ["Salmos", "Eclesiastes", "Proverbios", "Job"],



    correct: 0, reference: "Salmos"



  },



  {



    id: 438, difficulty: "experto", category: "libros",



    question: "?En que libro se presenta la teologia del pacto eterno?",



    options: ["Hebreos", "Isaias", "Daniel", "Joel"],



    correct: 0, reference: "Hebreos 13:20"



  },



  {



    id: 439, difficulty: "experto", category: "libros",



    question: "?Que libro articula la esperanza escatologica comunitaria?",



    options: ["Tito", "1 Tesalonicenses", "Pedro", "Judas"],



    correct: 1, reference: "1 Tesalonicenses 4:13-18"



  },



  {



    id: 440, difficulty: "experto", category: "libros",



    question: "?En que libro se define la santificacion progresiva?",



    options: ["Hebreos", "Romanos", "1 Tesalonicenses", "Pedro"],



    correct: 2, reference: "1 Tesalonicenses 4:3-7"



  },



  {



    id: 441, difficulty: "experto", category: "libros",



    question: "?Que libro presenta la teologia del discipulado radical?",



    options: ["Marcos", "Mateo", "Lucas", "Juan"],



    correct: 0, reference: "Marcos 8:34-38"



  },



  {



    id: 442, difficulty: "experto", category: "libros",



    question: "?En que libro se conecta la fe con obras en equilibrio?",



    options: ["Romanos", "Santiago", "Judas", "Hebreos"],



    correct: 1, reference: "Santiago 2:14-26"



  },



  {



    id: 443, difficulty: "experto", category: "libros",



    question: "?Que libro muestra la autoridad apostolica defendida?",



    options: ["Efesios", "Pedro", "2 Corintios", "Tito"],



    correct: 2, reference: "2 Corintios 10-13"



  },



  {



    id: 444, difficulty: "experto", category: "libros",



    question: "?En que libro se articula la comunion trinitaria?",



    options: ["Hebreos", "Mateo", "Romanos", "Juan"],



    correct: 3, reference: "Juan 14-17"



  },



  {



    id: 445, difficulty: "experto", category: "libros",



    question: "?Que libro presenta el testimonio triple: Espiritu, agua y sangre?",



    options: ["1 Juan", "Pedro", "Judas", "Tito"],



    correct: 0, reference: "1 Juan 5:7-8"



  },



  {



    id: 446, difficulty: "experto", category: "libros",



    question: "?En que libro se expone la teologia del amor perfecto?",



    options: ["1 Juan", "Pedro", "Romanos", "Hebreos"],



    correct: 0, reference: "1 Juan 4:7-21"



  },



  {



    id: 447, difficulty: "experto", category: "libros",



    question: "?Que libro conecta angeles, juicio y apostasia?",



    options: ["Judas", "Pedro", "Tito", "Filemon"],



    correct: 0, reference: "Judas 1:6-7"



  },



  {



    id: 448, difficulty: "experto", category: "libros",



    question: "?En que libro culmina la narrativa biblica de redencion?",



    options: ["Hebreos", "Daniel", "Apocalipsis", "Isaias"],



    correct: 2, reference: "Apocalipsis 21-22"



  },



  {



    id: 449, difficulty: "experto", category: "libros",



    question: "?Que libro une Genesis, Evangelios y Escatologia en un solo arco teologico?",



    options: ["Apocalipsis", "Romanos", "Hebreos", "Isaias"],



    correct: 0, reference: "Apocalipsis"



  },



  // --- Personajes Experto (50 preguntas) ---



  {



    id: 79, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Agar?",



    options: ["Abimelec", "No se menciona", "Laban", "Faraon"],



    correct: 1, reference: "Genesis 16:1"



  },



  {



    id: 80, difficulty: "experto", category: "personajes",



    question: "?Que profeta fue contemporaneo de Ageo?",



    options: ["Amos", "Malaquias", "Zacarias", "Joel"],



    correct: 2, reference: "Esdras 5:1"



  },



  {



    id: 81, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre del rey Joacaz?",



    options: ["Josias", "Asa", "Joacim", "Manases"],



    correct: 0, reference: "2 Reyes 23:30-31"



  },



  {



    id: 700, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Gedalias, gobernador de Juda?",



    options: ["Hilcias", "Natan", "Abner", "Safan"],



    correct: 3, reference: "2 Reyes 25:22"



  },



  {



    id: 701, difficulty: "experto", category: "personajes",



    question: "?Quien fue el rey que deporto a Israel a Asiria?",



    options: ["Nabucodonosor", "Senaquerib", "Salmanasar V", "Tiglat-pileser"],



    correct: 2, reference: "2 Reyes 17:3-6"



  },



  {



    id: 702, difficulty: "experto", category: "personajes",



    question: "?Quien fue el profeta que reprendio a Jeroboam I?",



    options: ["Elias", "Eliseo", "Ahias", "Miqueas"],



    correct: 2, reference: "1 Reyes 14:7-11"



  },



  {



    id: 703, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre del profeta Joel?",



    options: ["Hilcias", "Penuel", "Beeri", "Petuel"],



    correct: 3, reference: "Joel 1:1"



  },



  {



    id: 704, difficulty: "experto", category: "personajes",



    question: "?Quien fue el sumo sacerdote durante el reinado de David?",



    options: ["Eli", "Sadoc", "Abiatar", "Caifas"],



    correct: 2, reference: "1 Samuel 22:20; 2 Samuel 15:35"



  },



  {



    id: 705, difficulty: "experto", category: "personajes",



    question: "?Quien fue el rey que reino cuando cayo Samaria?",



    options: ["Uzias", "Oseas", "Ezequias", "Acaz"],



    correct: 1, reference: "2 Reyes 17:1-6"



  },



  {



    id: 706, difficulty: "experto", category: "personajes",



    question: "?Quien fue el profeta que anuncio el nacimiento de Ciro?",



    options: ["Jeremias", "Isaias", "Ezequiel", "Daniel"],



    correct: 1, reference: "Isaias 44:28-45:1"



  },



  {



    id: 707, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Matatias (padre de Judas Macabeo)?",



    options: ["Asmoneo", "Eleazar", "Hasmon", "Sadoc"],



    correct: 2, reference: "1 Macabeos 2:1"



  },



  {



    id: 708, difficulty: "experto", category: "personajes",



    question: "?Quien fue el rey que tomo a Sara por esposa?",



    options: ["Faraon", "Nabucodonosor", "Herodes", "Abimelec"],



    correct: 3, reference: "Genesis 20:2"



  },



  {



    id: 709, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Husai el arquita?",



    options: ["Joab", "No se menciona", "Talmai", "Abner"],



    correct: 1, reference: "2 Samuel 15:32"



  },



  {



    id: 710, difficulty: "experto", category: "personajes",



    question: "?Quien fue el gobernador persa que apoyo a Nehemias?",



    options: ["Ciro", "Artajerjes I", "Dario", "Jerjes"],



    correct: 1, reference: "Nehemias 2:1-8"



  },



  {



    id: 711, difficulty: "experto", category: "personajes",



    question: "?Quien fue el profeta que hablo contra Ninive junto con Jonas?",



    options: ["Joel", "Nahum", "Amos", "Abdias"],



    correct: 1, reference: "Nahum 1:1"



  },



  {



    id: 712, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Jabez?",



    options: ["No se menciona", "Abner", "Caleb", "Isai"],



    correct: 0, reference: "1 Cronicas 4:9"



  },



  {



    id: 713, difficulty: "experto", category: "personajes",



    question: "?Quien fue el rey que mando escribir cronicas reales?",



    options: ["Salomon", "David", "Asuero", "Roboam"],



    correct: 2, reference: "Ester 6:1"



  },



  {



    id: 714, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre del profeta Sofonias?",



    options: ["Gedalias", "Cusi", "Beeri", "Petuel"],



    correct: 1, reference: "Sofonias 1:1"



  },



  {



    id: 715, difficulty: "experto", category: "personajes",



    question: "?Quien fue el oficial que protegio a Jeremias?",



    options: ["Baruc", "Safan", "Ebed-melec", "Gedalias"],



    correct: 2, reference: "Jeremias 38:7-13"



  },



  {



    id: 716, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Gedeon segun Jueces?",



    options: ["Gad", "Joas", "Abner", "Natan"],



    correct: 1, reference: "Jueces 6:11"



  },



  {



    id: 717, difficulty: "experto", category: "personajes",



    question: "?Quien fue el profeta que hablo con Dario?",



    options: ["Zacarias", "Malaquias", "Ageo", "Daniel"],



    correct: 3, reference: "Daniel 6"



  },



  {



    id: 718, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Simon Pedro?",



    options: ["Felipe", "Zebedeo", "Jonas", "Jose"],



    correct: 2, reference: "Mateo 16:17"



  },



  {



    id: 719, difficulty: "experto", category: "personajes",



    question: "?Quien fue el sacerdote que encontro el libro de la Ley?",



    options: ["Hilcias", "Abiatar", "Eleazar", "Sadoc"],



    correct: 0, reference: "2 Reyes 22:8"



  },



  {



    id: 720, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre del profeta Malaquias?",



    options: ["No se menciona", "Zacarias", "Nehemias", "Esdras"],



    correct: 0, reference: "Malaquias 1:1"



  },



  {



    id: 721, difficulty: "experto", category: "personajes",



    question: "?Quien fue el rey que destruyo el altar de Betel?",



    options: ["Josias", "Uzias", "Asa", "Ezequias"],



    correct: 0, reference: "2 Reyes 23:15"



  },



  {



    id: 722, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Baruc?",



    options: ["Nerias", "Gedalias", "Hilcias", "Safan"],



    correct: 0, reference: "Jeremias 32:12"



  },



  {



    id: 723, difficulty: "experto", category: "personajes",



    question: "?Quien fue el general que mato a Amasa?",



    options: ["Joab", "Urias", "Abner", "Asael"],



    correct: 0, reference: "2 Samuel 20:10"



  },



  {



    id: 724, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre del profeta Abdias?",



    options: ["Safan", "Jeremias", "No se menciona", "Hilcias"],



    correct: 2, reference: "Abdias 1:1"



  },



  {



    id: 725, difficulty: "experto", category: "personajes",



    question: "?Quien fue el rey que reino cuando nacio Moises?",



    options: ["Seti", "Amenhotep", "Tutmosis", "Ramses II"],



    correct: 3, reference: "Exodo 1:8-22"



  },



  {



    id: 726, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre del profeta Miqueas?",



    options: ["Petuel", "No se menciona", "Moraset", "Beeri"],



    correct: 1, reference: "Miqueas 1:1"



  },



  {



    id: 727, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Eliseo?",



    options: ["Safat", "Natan", "Abner", "Gad"],



    correct: 0, reference: "1 Reyes 19:16"



  },



  {



    id: 728, difficulty: "experto", category: "personajes",



    question: "?Quien fue el rey que permitio volver del exilio?",



    options: ["Ciro", "Artajerjes", "Dario", "Jerjes"],



    correct: 0, reference: "Esdras 1:1-4"



  },



  {



    id: 729, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre del profeta Nahum?",



    options: ["Petuel", "Beeri", "No se menciona", "Elcosita"],



    correct: 2, reference: "Nahum 1:1"



  },



  {



    id: 730, difficulty: "experto", category: "personajes",



    question: "?Quien fue el escriba que ayudo a Jeremias?",



    options: ["Esdras", "Baruc", "Safan", "Gedalias"],



    correct: 1, reference: "Jeremias 36:4"



  },



  {



    id: 731, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Booz?",



    options: ["Obed", "Nahason", "Salmon", "Isai"],



    correct: 2, reference: "Rut 4:21"



  },



  {



    id: 732, difficulty: "experto", category: "personajes",



    question: "?Quien fue el rey que perdio la razon por orgullo?",



    options: ["Dario", "Nabucodonosor", "Jerjes", "Ciro"],



    correct: 1, reference: "Daniel 4:33"



  },



  {



    id: 733, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Samuel segun 1 Samuel?",



    options: ["Natan", "Abner", "Elcana", "Isai"],



    correct: 2, reference: "1 Samuel 1:1"



  },



  {



    id: 734, difficulty: "experto", category: "personajes",



    question: "?Quien fue el profeta que anuncio 70 anos de cautiverio?",



    options: ["Isaias", "Daniel", "Jeremias", "Ezequiel"],



    correct: 2, reference: "Jeremias 25:11-12"



  },



  {



    id: 735, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre del rey Asa?",



    options: ["Roboam", "Josafat", "Uzias", "Abias"],



    correct: 3, reference: "1 Reyes 15:8"



  },



  {



    id: 736, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Jonatan hijo de Saul?",



    options: ["Ner", "Saul", "Abner", "Isai"],



    correct: 1, reference: "1 Samuel 14:1"



  },



  {



    id: 737, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Jehu?",



    options: ["Natan", "Gad", "Abner", "Nimsi"],



    correct: 3, reference: "2 Reyes 9:2"



  },



  {



    id: 738, difficulty: "experto", category: "personajes",



    question: "?Quien fue el rey que edifico Samaria?",



    options: ["Omri", "Acab", "Jehu", "Jeroboam"],



    correct: 0, reference: "1 Reyes 16:24"



  },



  {



    id: 739, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre del profeta Habacuc?",



    options: ["Beeri", "No se menciona", "Jeremias", "Petuel"],



    correct: 1, reference: "Habacuc 1:1"



  },



  {



    id: 740, difficulty: "experto", category: "personajes",



    question: "?Quien fue el rey que consulto a Isaias?",



    options: ["Ezequias", "Asa", "Manases", "Uzias"],



    correct: 0, reference: "2 Reyes 19:2"



  },



  {



    id: 741, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Obed?",



    options: ["Salmon", "Isai", "Booz", "Nahason"],



    correct: 2, reference: "Rut 4:17"



  },



  {



    id: 742, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Sadoc?",



    options: ["Finees", "Ahitob", "Eleazar", "Abiatar"],



    correct: 1, reference: "2 Samuel 8:17"



  },



  {



    id: 743, difficulty: "experto", category: "personajes",



    question: "?Quien fue el profeta que reprendio a Acab por Nabot?",



    options: ["Elias", "Eliseo", "Amos", "Miqueas"],



    correct: 0, reference: "1 Reyes 21:17-19"



  },



  {



    id: 744, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre del rey Joas de Juda?",



    options: ["Asa", "Roboam", "Josias", "Ocozias"],



    correct: 3, reference: "2 Reyes 11:2"



  },



  {



    id: 745, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre de Timoteo?",



    options: ["Hebreo", "Romano", "Judio", "Griego"],



    correct: 3, reference: "Hechos 16:1"



  },



  {



    id: 746, difficulty: "experto", category: "personajes",



    question: "?Quien fue el padre del profeta Ageo?",



    options: ["Zacarias", "Beeri", "Petuel", "No se menciona"],



    correct: 3, reference: "Ageo 1:1"



  },



  // --- Reyes ---



  {



    id: 1150, difficulty: "experto", category: "reyes",



    question: "?Cuantos dias reino Zimri sobre Israel antes de suicidarse en el palacio en llamas?",



    options: ["7 dias", "3 dias", "10 dias", "14 dias"],



    correct: 0, reference: "1 Reyes 16:15-18"



  },



  {



    id: 1151, difficulty: "experto", category: "reyes",



    question: "?Que rey de Juda fue co-regente con su padre Uzias debido a la lepra de este?",



    options: ["Jotam", "Amasias", "Acaz", "Ezequias"],



    correct: 0, reference: "2 Reyes 15:5"



  },



  {



    id: 1152, difficulty: "experto", category: "reyes",



    question: "?Cuantos talentos de plata pago Omri por el monte de Samaria a Semer?",



    options: ["Un talento", "Dos talentos", "Diez talentos", "Cinco talentos"],



    correct: 1, reference: "1 Reyes 16:24"



  },



  {



    id: 1153, difficulty: "experto", category: "reyes",



    question: "Segun 2 Reyes 3:4, ?cuantos corderos y cuantos carneros pagaba Mesa, rey de Moab, como tributo a Israel?",



    options: ["150.000 corderos y 75.000 carneros", "50.000 corderos y 50.000 carneros", "200.000 ovejas y 10.000 carneros", "100.000 corderos y 100.000 carneros con lana"],



    correct: 3, reference: "2 Reyes 3:4"



  },



  {



    id: 1154, difficulty: "experto", category: "reyes",



    question: "?Que rey de Juda fue herido por sus siervos en la casa de Milo, en la bajada de Sila?",



    options: ["Acaz", "Atalia", "Amasias", "Joas"],



    correct: 3, reference: "2 Reyes 12:20"



  },



  {



    id: 1155, difficulty: "experto", category: "reyes",



    question: "?Que rey de Israel reino solo un mes antes de ser asesinado por Salum hijo de Jabes?",



    options: ["Manahem", "Zacarias", "Ela", "Peka"],



    correct: 1, reference: "2 Reyes 15:13"



  },



  {



    id: 1156, difficulty: "experto", category: "reyes",



    question: "?Cuantos talentos de plata pago Manahem al rey Pul (Tiglat-pileser III) de Asiria?",



    options: ["2.000 talentos", "1.000 talentos", "3.000 talentos", "500 talentos"],



    correct: 1, reference: "2 Reyes 15:19-20"



  },



  {



    id: 1157, difficulty: "experto", category: "reyes",



    question: "En 2 Cronicas 14:9, ?que comandante etiope ataco a Asa con un ejercito de un millon de hombres?",



    options: ["Zera", "Tirhaca", "So", "Sisac"],



    correct: 0, reference: "2 Cronicas 14:9"



  },



  {



    id: 1158, difficulty: "experto", category: "reyes",



    question: "?Que edad tenia Josias cuando comenzo a reinar segun 2 Reyes 22:1?",



    options: ["8 anos", "10 anos", "7 anos", "12 anos"],



    correct: 0, reference: "2 Reyes 22:1"



  },



  {



    id: 1159, difficulty: "experto", category: "reyes",



    question: "?Cual fue la formula de evaluacion de Abias/Abiam rey de Juda segun 1 Reyes 15:3?",



    options: ["Anduvo en todos los pecados de su padre", "Hizo lo malo parcialmente", "Su corazon fue perfecto", "Hizo lo recto ante los ojos de Jehova"],



    correct: 0, reference: "1 Reyes 15:3"



  },



  {



    id: 1160, difficulty: "experto", category: "reyes",



    question: "?Que rey de Juda quito a su propia madre Maaca del cargo de reina madre por haber hecho una imagen de Asera?",



    options: ["Asa", "Joas", "Josafat", "Ezequias"],



    correct: 0, reference: "1 Reyes 15:13"



  },



  {



    id: 1161, difficulty: "experto", category: "reyes",



    question: "Segun 2 Cronicas 26:10, ?que rey de Juda construyo torres en el desierto y cavo muchas cisternas porque amaba la agricultura?",



    options: ["Uzias", "Josafat", "Manases", "Ezequias"],



    correct: 0, reference: "2 Cronicas 26:10"



  },



  {



    id: 1162, difficulty: "experto", category: "reyes",



    question: "?Que rey de Israel fue asesinado por Peka hijo de Remalias junto con Argob y Arie en el palacio de Samaria?",



    options: ["Salum", "Zacarias", "Pekaia", "Manahem"],



    correct: 2, reference: "2 Reyes 15:25"



  },



  {



    id: 1163, difficulty: "experto", category: "reyes",



    question: "?Cuantos anos duro exactamente el reinado de Jeroboam II sobre Israel?",



    options: ["31 anos", "22 anos", "29 anos", "41 anos"],



    correct: 3, reference: "2 Reyes 14:23"



  },



  {



    id: 1164, difficulty: "experto", category: "reyes",



    question: "Segun 2 Reyes 18:14, ?cuantos talentos de plata y de oro envio Ezequias a Senaquerib como tributo?",



    options: ["200 de plata y 20 de oro", "100 de plata y 10 de oro", "500 de plata y 50 de oro", "300 de plata y 30 de oro"],



    correct: 3, reference: "2 Reyes 18:14"



  },



  {



    id: 1165, difficulty: "experto", category: "reyes",



    question: "?Que rey de Juda fue llevado cautivo a Babilonia con garfios y cadenas de bronce, segun 2 Cronicas 33:11?",



    options: ["Manases", "Sedequias", "Joacim", "Joaquin"],



    correct: 0, reference: "2 Cronicas 33:11"



  },



  {



    id: 1166, difficulty: "experto", category: "reyes",



    question: "?Cual es el nombre del rey de Egipto que capturo y mato a Josias en Meguido?",



    options: ["So", "Hofra", "Sisac", "Necao"],



    correct: 3, reference: "2 Reyes 23:29"



  },



  {



    id: 1167, difficulty: "experto", category: "reyes",



    question: "?Que diferencia existe entre 2 Samuel 24:9 y 1 Cronicas 21:5 respecto al censo de David en cuanto al numero de Israel?",



    options: ["No hay diferencia", "Samuel dice 500.000 y Cronicas 470.000 para Juda", "Samuel dice 1.000.000 y Cronicas 800.000 para Israel", "Samuel dice 800.000 y Cronicas 1.100.000 para Israel"],



    correct: 3, reference: "2 Samuel 24:9; 1 Cronicas 21:5"



  },



  {



    id: 1168, difficulty: "experto", category: "reyes",



    question: "?Que rey de Juda reino solo tres meses antes de ser depuesto por el faraon Necao?",



    options: ["Joacim", "Joaquin", "Joacaz", "Sedequias"],



    correct: 2, reference: "2 Reyes 23:31-33"



  },



  {



    id: 1169, difficulty: "experto", category: "reyes",



    question: "?Que nombre le puso el faraon Necao a Eliaquim hijo de Josias cuando lo hizo rey?",



    options: ["Sedequias", "Joacaz", "Joaquin", "Joacim"],



    correct: 3, reference: "2 Reyes 23:34"



  },



  {



    id: 1170, difficulty: "experto", category: "reyes",



    question: "?Que nombre le cambio Nabucodonosor a Matanias cuando lo puso por rey en Juda?",



    options: ["Josias", "Joacim", "Joaquin", "Sedequias"],



    correct: 3, reference: "2 Reyes 24:17"



  },



  {



    id: 1171, difficulty: "experto", category: "reyes",



    question: "Segun 1 Reyes 4:7, ?cuantos gobernadores tenia Salomon sobre todo Israel para proveer alimento?",



    options: ["15", "20", "10", "12"],



    correct: 3, reference: "1 Reyes 4:7"



  },



  {



    id: 1172, difficulty: "experto", category: "reyes",



    question: "?Cuantos anos tardo Salomon en construir su propio palacio segun 1 Reyes 7:1?",



    options: ["7 anos", "20 anos", "10 anos", "13 anos"],



    correct: 3, reference: "1 Reyes 7:1"



  },



  {



    id: 1173, difficulty: "experto", category: "reyes",



    question: "?Que rey de Israel edifico Peniel y Siquem segun 1 Reyes 12?",



    options: ["Baasa", "Omri", "Nadab", "Jeroboam I"],



    correct: 3, reference: "1 Reyes 12:25"



  },



  {



    id: 1174, difficulty: "experto", category: "reyes",



    question: "?Cuantos talentos de oro traian anualmente a Salomon segun 1 Reyes 10:14?",



    options: ["120 talentos", "420 talentos", "1.000 talentos", "666 talentos"],



    correct: 3, reference: "1 Reyes 10:14"



  },



  {



    id: 1175, difficulty: "experto", category: "reyes",



    question: "?En que ano del reinado de Salomon comenzo la construccion del templo, segun 1 Reyes 6:1?",



    options: ["En el ano septimo", "En el ano segundo", "En el ano cuarto", "En el ano decimo"],



    correct: 2, reference: "1 Reyes 6:1"



  },



  {



    id: 1176, difficulty: "experto", category: "reyes",



    question: "?Que rey asirio deporto a las diez tribus del norte segun 2 Reyes 17:6?",



    options: ["Esar-hadon", "Senaquerib", "Sargon II / Salmanasar V", "Tiglat-pileser III"],



    correct: 2, reference: "2 Reyes 17:6"



  },



  {



    id: 1177, difficulty: "experto", category: "reyes",



    question: "?Que hijo de Salomon fue su sucesor en el trono segun 1 Reyes 11:43?",



    options: ["Roboam", "Jeroboam", "Abias", "Nadab"],



    correct: 0, reference: "1 Reyes 11:43"



  },



  {



    id: 1178, difficulty: "experto", category: "reyes",



    question: "?Quien mato a Ela hijo de Baasa mientras este estaba ebrio en casa de Arsa en Tirsa?",



    options: ["Zimri", "Acab", "Omri", "Tibni"],



    correct: 0, reference: "1 Reyes 16:9-10"



  },



  {



    id: 1179, difficulty: "experto", category: "reyes",



    question: "Segun 2 Cronicas 11:21, ?cuantas esposas y concubinas tuvo Roboam?",



    options: ["7 esposas y 20 concubinas", "18 esposas y 60 concubinas", "14 esposas y 40 concubinas", "10 esposas y 30 concubinas"],



    correct: 1, reference: "2 Cronicas 11:21"



  },



  {



    id: 1180, difficulty: "experto", category: "reyes",



    question: "?Que rey de Juda cavo la piscina y el acueducto que traia agua a la ciudad segun 2 Reyes 20:20?",



    options: ["Asa", "Josafat", "Manases", "Ezequias"],



    correct: 3, reference: "2 Reyes 20:20"



  },



  {



    id: 1181, difficulty: "experto", category: "reyes",



    question: "?Cuantos hijos engendro Roboam segun 2 Cronicas 11:21?",



    options: ["12 hijos y 15 hijas", "18 hijos y 30 hijas", "28 hijos y 60 hijas", "20 hijos y 40 hijas"],



    correct: 2, reference: "2 Cronicas 11:21"



  },



  {



    id: 1182, difficulty: "experto", category: "reyes",



    question: "?Que rey de Juda fue asesinado por sus siervos en venganza por la muerte de Zacarias hijo del sacerdote Joiada?",



    options: ["Joas", "Amasias", "Uzias", "Acaz"],



    correct: 0, reference: "2 Cronicas 24:25"



  },



  {



    id: 1183, difficulty: "experto", category: "reyes",



    question: "?Cuantos anos reino Manases en Jerusalen segun 2 Reyes 21:1?",



    options: ["55 anos", "40 anos", "45 anos", "35 anos"],



    correct: 0, reference: "2 Reyes 21:1"



  },



  {



    id: 1184, difficulty: "experto", category: "reyes",



    question: "?Que rey de Israel consulto a Baal-zebub, dios de Ecron, tras caer por la ventana de su aposento?",



    options: ["Joacaz", "Ocozias hijo de Acab", "Jehu", "Joram"],



    correct: 1, reference: "2 Reyes 1:2"



  },



  {



    id: 1185, difficulty: "experto", category: "reyes",



    question: "?Que rey de Juda reino a los siete anos de edad segun 2 Reyes 11:21?",



    options: ["Amon", "Manases", "Josias", "Joas"],



    correct: 3, reference: "2 Reyes 11:21"



  },



  {



    id: 1186, difficulty: "experto", category: "reyes",



    question: "?Que oficial de Baasa cumplio la profecia de Jehu hijo de Hanani al exterminar toda la casa de Baasa?",



    options: ["Ela", "Omri", "Zimri", "Tibni"],



    correct: 2, reference: "1 Reyes 16:12"



  },



  {



    id: 1187, difficulty: "experto", category: "reyes",



    question: "Segun 2 Reyes 14:19, ?a que ciudad huyo Amasias cuando conspiraron contra el en Jerusalen?",



    options: ["Laquis", "Beerseba", "Gat", "Hebron"],



    correct: 0, reference: "2 Reyes 14:19"



  },



  {



    id: 1188, difficulty: "experto", category: "reyes",



    question: "?Que tributo impuso el faraon Necao a la tierra de Juda segun 2 Reyes 23:33?",



    options: ["200 talentos de plata y 20 de oro", "100 talentos de plata y un talento de oro", "50 talentos de plata y 5 de oro", "300 talentos de plata y 30 de oro"],



    correct: 1, reference: "2 Reyes 23:33"



  },



  {



    id: 1189, difficulty: "experto", category: "reyes",



    question: "?Cuantas ciudades de almacenaje edifico Salomon segun 2 Cronicas 8:4-6?",



    options: ["Meguido y Hazor solamente", "Bet-horon y Gezer unicamente", "Solo Tadmor", "Tadmor y todas las ciudades de almacenaje en Hamat"],



    correct: 3, reference: "2 Cronicas 8:4-6"



  },



  {



    id: 1190, difficulty: "experto", category: "reyes",



    question: "?Que profeta le dijo a Jeroboam I que Dios le daria diez tribus rasgando su capa nueva en doce pedazos?",



    options: ["Iddo", "Ahias silonita", "Jehu hijo de Hanani", "Semaias"],



    correct: 1, reference: "1 Reyes 11:29-31"



  },



  {



    id: 1191, difficulty: "experto", category: "reyes",



    question: "?Que rey de Juda hizo pasar a su hijo por fuego, practico la adivinacion y consulto a encantadores segun 2 Reyes 21:6?",



    options: ["Amon", "Acaz", "Manases", "Joacim"],



    correct: 2, reference: "2 Reyes 21:6"



  },



  {



    id: 1192, difficulty: "experto", category: "reyes",



    question: "?Que rey de Israel fue caracterizado con la frase 'anduvo en el camino de Jeroboam hijo de Nabat' mas frecuentemente en 1 y 2 Reyes?",



    options: ["Acab", "Omri", "Casi todos los reyes del norte", "Baasa unicamente"],



    correct: 2, reference: "1 Reyes 15:34; 16:26; 2 Reyes 3:3; etc."



  },



  {



    id: 1193, difficulty: "experto", category: "reyes",



    question: "?Cuantas naves de Tarsis intento construir Josafat que se rompieron en Ezion-geber?",



    options: ["Siete naves", "Naves de Tarsis (sin numero especifico)", "Tres naves", "Diez naves"],



    correct: 1, reference: "1 Reyes 22:48"



  },



  {



    id: 1194, difficulty: "experto", category: "reyes",



    question: "?Con que rey de Tiro hizo Salomon un pacto para recibir madera de cedro y cipres?",



    options: ["Etbaal", "Hiram", "Ben-hadad", "Abibaal"],



    correct: 1, reference: "1 Reyes 5:1-12"



  },



  {



    id: 1195, difficulty: "experto", category: "reyes",



    question: "?Que profeta reprendio a Josafat por haberse aliado con Ocozias rey de Israel, segun 2 Cronicas 20:37?",



    options: ["Micaias", "Eliezer hijo de Dodava", "Semaias", "Jehu hijo de Hanani"],



    correct: 1, reference: "2 Cronicas 20:37"



  },



  {



    id: 1196, difficulty: "experto", category: "reyes",



    question: "Segun 2 Reyes 24:14, ?cuantas personas fueron deportadas de Jerusalen por Nabucodonosor en la segunda deportacion?",



    options: ["10.000 cautivos", "8.000 personas", "4.600 personas", "3.023 personas"],



    correct: 0, reference: "2 Reyes 24:14"



  },



  {



    id: 1197, difficulty: "experto", category: "reyes",



    question: "?Que sumo sacerdote escondio a Joas de nino durante seis anos de la usurpacion de Atalia?",



    options: ["Hilcias", "Joiada", "Seraias", "Azarias"],



    correct: 1, reference: "2 Reyes 11:2-3"



  },



  {



    id: 1198, difficulty: "experto", category: "reyes",



    question: "?Que rey de Asiria envio al Rabsaces a amenazar a Ezequias con un discurso ante los muros de Jerusalen?",



    options: ["Senaquerib", "Tiglat-pileser III", "Esar-hadon", "Sargon II"],



    correct: 0, reference: "2 Reyes 18:17"



  },



  {



    id: 1199, difficulty: "experto", category: "reyes",



    question: "?Que rey babilonico libero a Joaquin de la carcel y le dio un puesto de honor en el ano 37 del cautiverio?",



    options: ["Evil-merodac", "Nabucodonosor", "Belsasar", "Nabonido"],



    correct: 0, reference: "2 Reyes 25:27"



  },



  // --- Profetas ---



  {



    id: 1350, difficulty: "experto", category: "profetas",



    question: "?Cual es el termino hebreo que Isaias usa para referirse a la 'virgen' en su profecia mesianica de Isaias 7:14?",



    options: ["Ishsha", "Alma", "Betula", "Nashim"],



    correct: 1, reference: "Isaias 7:14"



  },



  {



    id: 1351, difficulty: "experto", category: "profetas",



    question: "?En que ano aproximado recibio Ezequiel su vision inaugural del trono-carroza de Dios junto al rio Quebar?",



    options: ["597 a.C.", "586 a.C.", "593 a.C.", "605 a.C."],



    correct: 2, reference: "Ezequiel 1:1-3"



  },



  {



    id: 1352, difficulty: "experto", category: "profetas",



    question: "?Cuantas alas tenia cada serafin en la vision de Isaias en el templo?",



    options: ["Cuatro", "Ocho", "Dos", "Seis"],



    correct: 3, reference: "Isaias 6:2"



  },



  {



    id: 1353, difficulty: "experto", category: "profetas",



    question: "?Cuantos dias permanecio Ezequiel acostado sobre su lado izquierdo para cargar simbolicamente la iniquidad de Israel?",



    options: ["150 dias", "40 dias", "390 dias", "290 dias"],



    correct: 2, reference: "Ezequiel 4:5"



  },



  {



    id: 1354, difficulty: "experto", category: "profetas",



    question: "?Cual era el nombre de la esposa de Oseas, a quien Dios le ordeno tomar como simbolo del amor divino por Israel infiel?",



    options: ["Rut", "Ester", "Gomer", "Debora"],



    correct: 2, reference: "Oseas 1:2-3"



  },



  {



    id: 1355, difficulty: "experto", category: "profetas",



    question: "?Que profeta fue arrebatado por el Espiritu y transportado entre el cielo y la tierra en una vision, tomado por un mechon de su cabello?",



    options: ["Elias", "Eliseo", "Ezequiel", "Daniel"],



    correct: 2, reference: "Ezequiel 8:3"



  },



  {



    id: 1356, difficulty: "experto", category: "profetas",



    question: "?Cuantos cuernos vio el profeta Zacarias en su primera vision nocturna?",



    options: ["Siete", "Dos", "Diez", "Cuatro"],



    correct: 3, reference: "Zacarias 1:18-19"



  },



  {



    id: 1357, difficulty: "experto", category: "profetas",



    question: "?Que profeta menciona especificamente a Bet-el-sar-eser y Regem-melec como emisarios enviados a consultar a los sacerdotes?",



    options: ["Zacarias", "Hageo", "Sofonias", "Malaquias"],



    correct: 0, reference: "Zacarias 7:2"



  },



  {



    id: 1358, difficulty: "experto", category: "profetas",



    question: "Segun Daniel 8, ?que representaba el macho cabrio con un cuerno notable entre sus ojos?",



    options: ["El imperio persa", "El imperio griego", "El imperio romano", "El imperio babilonico"],



    correct: 1, reference: "Daniel 8:21"



  },



  {



    id: 1359, difficulty: "experto", category: "profetas",



    question: "?Cuantos dias profetizo Daniel que pasarian desde la supresion del sacrificio continuo hasta la abominacion desoladora?",



    options: ["1290 dias", "1150 dias", "1335 dias", "1260 dias"],



    correct: 0, reference: "Daniel 12:11"



  },



  {



    id: 1360, difficulty: "experto", category: "profetas",



    question: "?A que rey de Juda profetizo Isaias que la sombra del reloj de sol de Acaz retrocederia diez grados como senal?",



    options: ["Ezequias", "Josias", "Acaz", "Manases"],



    correct: 0, reference: "Isaias 38:7-8"



  },



  {



    id: 1361, difficulty: "experto", category: "profetas",



    question: "?Cual es el nombre del valle que Ezequiel describe lleno de huesos secos que volvieron a la vida?",



    options: ["Valle de Josafat", "Valle de Meguido", "No se especifica un nombre propio", "Valle de Cedron"],



    correct: 2, reference: "Ezequiel 37:1-2"



  },



  {



    id: 1362, difficulty: "experto", category: "profetas",



    question: "?Que profeta menor contiene unicamente 21 versiculos, siendo el libro mas corto del Antiguo Testamento?",



    options: ["Abdias", "Sofonias", "Nahum", "Hageo"],



    correct: 0, reference: "Abdias 1:1-21"



  },



  {



    id: 1363, difficulty: "experto", category: "profetas",



    question: "?Contra que nacion esta dirigida exclusivamente la profecia de Abdias?",



    options: ["Edom", "Asiria", "Filistea", "Moab"],



    correct: 0, reference: "Abdias 1:1"



  },



  {



    id: 1364, difficulty: "experto", category: "profetas",



    question: "?Cuantas semanas de anos (semanas profeticas) menciona Daniel en su famosa profecia de las 'setenta semanas'?",



    options: ["70 semanas", "62 semanas", "49 semanas", "77 semanas"],



    correct: 0, reference: "Daniel 9:24"



  },



  {



    id: 1365, difficulty: "experto", category: "profetas",



    question: "?Que nombre simbolico le puso Oseas a su hija, que significa 'no compadecida'?",



    options: ["Jezreel", "Lo-ruhama", "Maher-salal-hasbaz", "Lo-ammi"],



    correct: 1, reference: "Oseas 1:6"



  },



  {



    id: 1366, difficulty: "experto", category: "profetas",



    question: "?En cual capitulo de Isaias se encuentra el cantico de la vina, una parabola sobre el juicio de Juda?",



    options: ["Isaias 3", "Isaias 12", "Isaias 5", "Isaias 9"],



    correct: 2, reference: "Isaias 5:1-7"



  },



  {



    id: 1367, difficulty: "experto", category: "profetas",



    question: "?Que profeta uso la imagen de un plomo de albanil (plomada) como simbolo de juicio contra Israel?",



    options: ["Oseas", "Miqueas", "Joel", "Amos"],



    correct: 3, reference: "Amos 7:7-8"



  },



  {



    id: 1368, difficulty: "experto", category: "profetas",



    question: "?Cuantos jinetes aparecen en la primera vision de Zacarias entre los mirtos?",



    options: ["Siete", "Tres", "Cuatro", "Uno"],



    correct: 1, reference: "Zacarias 1:8"



  },



  {



    id: 1369, difficulty: "experto", category: "profetas",



    question: "?Cual era la profesion de Amos antes de ser llamado como profeta?",



    options: ["Carpintero", "Sacerdote", "Escriba", "Boyero y cultivador de higos silvestres"],



    correct: 3, reference: "Amos 7:14"



  },



  {



    id: 1370, difficulty: "experto", category: "profetas",



    question: "?Que profeta describe a Ninive como 'la ciudad sanguinaria, toda llena de mentira y de rapina'?",



    options: ["Sofonias", "Jonas", "Nahum", "Habacuc"],



    correct: 2, reference: "Nahum 3:1"



  },



  {



    id: 1371, difficulty: "experto", category: "profetas",



    question: "?Cuantas visiones nocturnas tuvo Zacarias en total, segun los capitulos 1 al 6 de su libro?",



    options: ["Ocho", "Cinco", "Diez", "Siete"],



    correct: 0, reference: "Zacarias 1-6"



  },



  {



    id: 1372, difficulty: "experto", category: "profetas",



    question: "?Con que nombre simbolico llamo Isaias a su hijo para profetizar la inminente caida de Damasco y Samaria?",



    options: ["Lo-ammi", "Sear-jasub", "Emanuel", "Maher-salal-hasbaz"],



    correct: 3, reference: "Isaias 8:1-4"



  },



  {



    id: 1373, difficulty: "experto", category: "profetas",



    question: "?Que criatura marina especifica menciona Jonas en su oracion desde el vientre del gran pez?",



    options: ["Algas que se enredaron en su cabeza", "Un cocodrilo", "Leviatan", "Un tiburon"],



    correct: 0, reference: "Jonas 2:5"



  },



  {



    id: 1374, difficulty: "experto", category: "profetas",



    question: "?Cuantos capitulos tiene el libro de Isaias y en que dos grandes secciones se divide comunmente?",



    options: ["70 capitulos: 1-35 y 36-70", "60 capitulos: 1-30 y 31-60", "52 capitulos: 1-26 y 27-52", "66 capitulos: 1-39 y 40-66"],



    correct: 3, reference: "Isaias 1-66"



  },



  {



    id: 1375, difficulty: "experto", category: "profetas",



    question: "?Que rey estaba en el trono cuando Isaias recibio su llamado profetico en el ano en que murio el rey Uzias?",



    options: ["Uzias acababa de morir", "Jotam", "Acaz", "Ezequias"],



    correct: 0, reference: "Isaias 6:1"



  },



  {



    id: 1376, difficulty: "experto", category: "profetas",



    question: "?Que rio menciona Ezequiel que fluia del umbral del templo en su vision del templo restaurado?",



    options: ["El Eufrates", "El Quebar", "El Jordan", "Un rio sin nombre que fluia del templo hacia el oriente"],



    correct: 3, reference: "Ezequiel 47:1-2"



  },



  {



    id: 1377, difficulty: "experto", category: "profetas",



    question: "?En que ano del reinado de Dario termino la reconstruccion del segundo templo, segun la profecia de Hageo?",



    options: ["Ano 2 de Dario", "Ano 4 de Dario", "Ano 10 de Dario", "Ano 6 de Dario"],



    correct: 3, reference: "Esdras 6:15; Hageo 1:1"



  },



  {



    id: 1378, difficulty: "experto", category: "profetas",



    question: "?Que piedra preciosa se menciona como parte de la descripcion del rey de Tiro en la lamentacion de Ezequiel 28?",



    options: ["Nueve piedras preciosas incluyendo topacio, diamante y berilo", "Solo oro y plata", "Solo rubi y esmeralda", "Solo zafiro y jaspe"],



    correct: 0, reference: "Ezequiel 28:13"



  },



  {



    id: 1379, difficulty: "experto", category: "profetas",



    question: "?Cuantos candeleros de oro y cuantos olivos vio Zacarias en su quinta vision?",



    options: ["Diez candeleros y un olivo", "Siete candeleros y dos olivos", "Tres candeleros y cuatro olivos", "Un candelero con siete lamparas y dos olivos"],



    correct: 3, reference: "Zacarias 4:2-3"



  },



  {



    id: 1380, difficulty: "experto", category: "profetas",



    question: "?Quien fue el sumo sacerdote al que Zacarias vio con vestiduras viles ante el angel de Jehova?",



    options: ["Aaron", "Josue hijo de Josadac", "Hilcias", "Esdras"],



    correct: 1, reference: "Zacarias 3:1-3"



  },



  {



    id: 1381, difficulty: "experto", category: "profetas",



    question: "?Cuantas plagas o calamidades enumera Joel en el capitulo 1 como etapas de la devastacion de la tierra?",



    options: ["Cuatro tipos de langosta", "Dos", "Tres", "Seis"],



    correct: 0, reference: "Joel 1:4"



  },



  {



    id: 1382, difficulty: "experto", category: "profetas",



    question: "?Que profeta compara a Dios con un esposo que compra de vuelta a su esposa infiel por quince siclos de plata y un homer y medio de cebada?",



    options: ["Jeremias", "Isaias", "Ezequiel", "Oseas"],



    correct: 3, reference: "Oseas 3:2"



  },



  {



    id: 1383, difficulty: "experto", category: "profetas",



    question: "?Que animal usa Miqueas como metafora de Israel, al decir que el remanente sera 'como leon entre las bestias de la selva'?",



    options: ["Un oso", "Un lobo", "Un aguila", "Un leon"],



    correct: 3, reference: "Miqueas 5:8"



  },



  {



    id: 1384, difficulty: "experto", category: "profetas",



    question: "?Cuantas naciones extranjeras condena Amos en sus oraculos de juicio antes de dirigirse a Israel y Juda?",



    options: ["Seis", "Cuatro", "Ocho", "Diez"],



    correct: 0, reference: "Amos 1:3-2:3"



  },



  {



    id: 1385, difficulty: "experto", category: "profetas",



    question: "?Que planta crecio sobre la cabeza de Jonas para darle sombra y luego fue destruida por un gusano?",



    options: ["Un olivo", "Una higuera", "Una calabacera (ricino)", "Una vid"],



    correct: 2, reference: "Jonas 4:6-7"



  },



  {



    id: 1386, difficulty: "experto", category: "profetas",



    question: "?Que montana menciona Zacarias que se partira en dos cuando Jehova ponga sus pies sobre ella en el dia final?",



    options: ["Monte Hermon", "Monte Carmelo", "Monte Sinai", "Monte de los Olivos"],



    correct: 3, reference: "Zacarias 14:4"



  },



  {



    id: 1387, difficulty: "experto", category: "profetas",



    question: "?Con que metal precioso Malaquias compara el proceso de purificacion que Dios hara con los hijos de Levi?",



    options: ["Hierro", "Plata", "Oro", "Bronce"],



    correct: 1, reference: "Malaquias 3:3"



  },



  {



    id: 1388, difficulty: "experto", category: "profetas",



    question: "?Que nombre recibe la imagen enorme compuesta de cuatro metales que Nabucodonosor vio en su sueno interpretado por Daniel?",



    options: ["La estatua del imperio", "La gran imagen o estatua", "El coloso de Babilonia", "El idolo babilonico"],



    correct: 1, reference: "Daniel 2:31-33"



  },



  {



    id: 1389, difficulty: "experto", category: "profetas",



    question: "?Cuantos dias estuvo Ezequiel acostado sobre su lado derecho para llevar simbolicamente la iniquidad de Juda?",



    options: ["70 dias", "90 dias", "40 dias", "30 dias"],



    correct: 2, reference: "Ezequiel 4:6"



  },



  {



    id: 1390, difficulty: "experto", category: "profetas",



    question: "?Que profeta describe a cuatro herreros que vinieron a espantar y derribar los cuernos de las naciones?",



    options: ["Daniel", "Hageo", "Zacarias", "Ezequiel"],



    correct: 2, reference: "Zacarias 1:20-21"



  },



  {



    id: 1391, difficulty: "experto", category: "profetas",



    question: "?Que titulo mesianico usa Isaias 9:6 que se traduce como 'Padre Eterno' en espanol?",



    options: ["Abi-ad", "Pele Yoetz", "El Gibbor", "Sar Shalom"],



    correct: 0, reference: "Isaias 9:6"



  },



  {



    id: 1392, difficulty: "experto", category: "profetas",



    question: "?Con que nombre llama Jeremias al futuro rey justo del linaje de David: 'Jehova, justicia nuestra'?",



    options: ["Jehova-Nissi", "Jehova-Tsidkenu", "Jehova-Shalom", "Jehova-Jire"],



    correct: 1, reference: "Jeremias 23:5-6"



  },



  {



    id: 1393, difficulty: "experto", category: "profetas",



    question: "?Cuantos capitulos componen las Lamentaciones de Jeremias y que estructura poetica predomina?",



    options: ["3 capitulos con paralelismo", "4 capitulos con verso libre", "5 capitulos con estructura acrostica", "7 capitulos con rima"],



    correct: 2, reference: "Lamentaciones 1-5"



  },



  {



    id: 1394, difficulty: "experto", category: "profetas",



    question: "?Cuantas medidas tenia el codo largo (codo real) que uso Ezequiel en sus mediciones del templo futuro?",



    options: ["Dos codos regulares", "Un codo mas un palmo", "Un codo regular", "Un codo mas un palmo menor"],



    correct: 1, reference: "Ezequiel 40:5"



  },



  {



    id: 1395, difficulty: "experto", category: "profetas",



    question: "?Que profeta menciona el 'Dia de Jehova' como un dia de tinieblas y no de luz, oscuridad y no resplandor?",



    options: ["Joel", "Amos", "Habacuc", "Sofonias"],



    correct: 1, reference: "Amos 5:18-20"



  },



  {



    id: 1396, difficulty: "experto", category: "profetas",



    question: "?Que precio exacto de traicion profetiza Zacarias que seria pagado por el pastor rechazado?",



    options: ["Cincuenta siclos de plata", "Veinte siclos de plata", "Diez siclos de plata", "Treinta piezas de plata"],



    correct: 3, reference: "Zacarias 11:12-13"



  },



  {



    id: 1397, difficulty: "experto", category: "profetas",



    question: "?A que alfarero envio Dios a Jeremias para ensenarle una leccion sobre la soberania divina sobre las naciones?",



    options: ["Al alfarero de Anatot", "Al alfarero del templo", "A la casa del alfarero en Jerusalen", "Al alfarero real de Juda"],



    correct: 2, reference: "Jeremias 18:1-6"



  },



  {



    id: 1398, difficulty: "experto", category: "profetas",



    question: "?Cuantos anos profetizo Isaias que tardaria en caer la gloria de Moab, siendo reducida a nada con todo su gran gentio?",



    options: ["Siete anos", "Tres anos", "Cinco anos", "Un ano"],



    correct: 1, reference: "Isaias 16:14"



  },



  {



    id: 1399, difficulty: "experto", category: "profetas",



    question: "?Que nombre simbolico dio Oseas a su tercer hijo, que significa 'no pueblo mio', representando el rechazo temporal de Israel?",



    options: ["Sear-jasub", "Jezreel", "Lo-ammi", "Lo-ruhama"],



    correct: 2, reference: "Oseas 1:9"



  },



  // --- Cartas ---



  {



    id: 1950, difficulty: "experto", category: "cartas",



    question: "?Que termino griego usa Pablo en Romanos 1:18 para describir la 'impiedad' que provoca la ira de Dios?",



    options: ["Anomia", "Asebeia", "Hamartia", "Paranomia"],



    correct: 1, reference: "Romanos 1:18"



  },



  {



    id: 1951, difficulty: "experto", category: "cartas",



    question: "?Que epistola del NT contiene la expresion griega 'logos tou staurou' (palabra de la cruz)?",



    options: ["Efesios", "Galatas", "Romanos", "1 Corintios"],



    correct: 3, reference: "1 Corintios 1:18"



  },



  {



    id: 1952, difficulty: "experto", category: "cartas",



    question: "?Cuantas veces menciona Pablo al personaje Tiquico en sus epistolas como portador de cartas?",



    options: ["Dos", "Una", "Cinco", "Tres"],



    correct: 3, reference: "Efesios 6:21; Colosenses 4:7; 2 Timoteo 4:12"



  },



  {



    id: 1953, difficulty: "experto", category: "cartas",



    question: "?Que texto del AT cita Pablo en Romanos 10:13 como fundamento de la salvacion universal?",



    options: ["Isaias 28:16", "Salmo 32:1", "Deuteronomio 30:14", "Joel 2:32"],



    correct: 3, reference: "Romanos 10:13; Joel 2:32"



  },



  {



    id: 1954, difficulty: "experto", category: "cartas",



    question: "?Que palabra griega hapax legomenon aparece en Efesios 4:14 traducida como 'estratagema' o 'astucia enganosa'?",



    options: ["Methodeia", "Panourgia", "Plano", "Kybeia"],



    correct: 3, reference: "Efesios 4:14"



  },



  {



    id: 1955, difficulty: "experto", category: "cartas",



    question: "?Que argumento principal usan los eruditos para cuestionar la autoria paulina de las Epistolas pastorales?",



    options: ["Contradicen la teologia de Romanos", "Vocabulario con mas de 300 palabras no usadas en las cartas indisputadas", "No mencionan la resurreccion de Cristo", "Ausencia de saludos personales"],



    correct: 1, reference: "1-2 Timoteo, Tito (debate academico)"



  },



  {



    id: 1956, difficulty: "experto", category: "cartas",



    question: "?Que termino griego usa Pablo en Romanos 12:1 traducido como 'culto racional' o 'adoracion espiritual'?",



    options: ["Latreia pneumatike", "Thysia euarestos", "Logike latreia", "Proskunosis alothine"],



    correct: 2, reference: "Romanos 12:1"



  },



  {



    id: 1957, difficulty: "experto", category: "cartas",



    question: "?Que persona mencionada en 3 Juan es criticada por amar 'ser el primero' en la iglesia?",



    options: ["Gayo", "Demetrio", "Diotrefes", "Filemon"],



    correct: 2, reference: "3 Juan 9-10"



  },



  {



    id: 1958, difficulty: "experto", category: "cartas",



    question: "?Que recurso literario emplea Pablo en 1 Corintios 13 al personificar al amor con quince verbos?",



    options: ["Alegoria extendida", "Prosopopeya", "Hiperbole", "Sinecdoque"],



    correct: 1, reference: "1 Corintios 13:4-8"



  },



  {



    id: 1959, difficulty: "experto", category: "cartas",



    question: "?Que texto del AT cita el autor de Hebreos en 10:5-7 para explicar la encarnacion de Cristo como ofrenda superior?",



    options: ["Isaias 53:7-8", "Levitico 16:21", "Exodo 29:38", "Salmo 40:6-8"],



    correct: 3, reference: "Hebreos 10:5-7; Salmo 40:6-8"



  },



  {



    id: 1960, difficulty: "experto", category: "cartas",



    question: "?Que termino griego usa Pablo en 2 Tesalonicenses 2:3 para referirse a la 'apostasia' o 'rebelion' antes del dia del Senor?",



    options: ["Parabasis", "Apostasia", "Skandalon", "Paraptoma"],



    correct: 1, reference: "2 Tesalonicenses 2:3"



  },



  {



    id: 1961, difficulty: "experto", category: "cartas",



    question: "?En que epistola aparece el hapax legomenon 'theopneustos' (inspirada por Dios) referido a la Escritura?",



    options: ["Hebreos", "2 Pedro", "1 Pedro", "2 Timoteo"],



    correct: 3, reference: "2 Timoteo 3:16"



  },



  {



    id: 1962, difficulty: "experto", category: "cartas",



    question: "?Que nombre propio menciona Pablo en Romanos 16:23 como 'tesorero de la ciudad' (oikonomos tos poleos)?",



    options: ["Erasto", "Tercio", "Cuarto", "Gayo"],



    correct: 0, reference: "Romanos 16:23"



  },



  {



    id: 1963, difficulty: "experto", category: "cartas",



    question: "?Que concepto teologico griego expresa Pablo en Romanos 6:6 con 'ho palaios homon anthropos'?",



    options: ["El hombre interior", "El hombre natural", "El hombre carnal", "El viejo hombre"],



    correct: 3, reference: "Romanos 6:6"



  },



  {



    id: 1964, difficulty: "experto", category: "cartas",



    question: "?Que cita textual de Isaias 59:20-21 usa Pablo en Romanos 11:26-27 respecto a la salvacion futura de Israel?",



    options: ["'Porque todos me conoceran, desde el menor hasta el mayor'", "'El pueblo que andaba en tinieblas vio gran luz'", "'El Redentor vendra de Sion y apartara la impiedad de Jacob'", "'He aqui la virgen concebira y dara a luz un hijo'"],



    correct: 2, reference: "Romanos 11:26-27; Isaias 59:20-21"



  },



  {



    id: 1965, difficulty: "experto", category: "cartas",



    question: "?En que epistola del NT aparece la expresion griega 'antitypon' (antitipo) referida al bautismo?",



    options: ["Hebreos", "1 Pedro", "Romanos", "Colosenses"],



    correct: 1, reference: "1 Pedro 3:21"



  },



  {



    id: 1966, difficulty: "experto", category: "cartas",



    question: "?Que persona envio Pablo de regreso a Filipos porque estaba gravemente enfermo y los filipenses lo supieron?",



    options: ["Tiquico", "Silvano", "Epafrodito", "Timoteo"],



    correct: 2, reference: "Filipenses 2:25-30"



  },



  {



    id: 1967, difficulty: "experto", category: "cartas",



    question: "?Que termino griego usa el autor de Hebreos en 6:4 para describir a los que han sido 'iluminados'?",



    options: ["Photisthentas", "Augazontas", "Lampadontas", "Epiphaneia"],



    correct: 0, reference: "Hebreos 6:4"



  },



  {



    id: 1968, difficulty: "experto", category: "cartas",



    question: "?Que catalogo de vicios en Galatas 5:19-21 Pablo designa con la expresion griega 'erga tos sarkos'?",



    options: ["Obras de la ley", "Obras de las tinieblas", "Obras de la carne", "Obras muertas"],



    correct: 2, reference: "Galatas 5:19-21"



  },



  {



    id: 1969, difficulty: "experto", category: "cartas",



    question: "?Que debate textual rodea a 1 Juan 5:7-8 (Comma Johanneum) en la critica textual?",



    options: ["Si el pasaje pertenece originalmente a 2 Juan", "Si incluir la referencia trinitaria 'el Padre, el Verbo y el Espiritu Santo'", "Si la palabra 'agua' debe traducirse como 'espiritu'", "Si el versiculo fue escrito por Juan o por un discipulo"],



    correct: 1, reference: "1 Juan 5:7-8 (aparato critico)"



  },



  {



    id: 1970, difficulty: "experto", category: "cartas",



    question: "?Que hapax legomenon del NT usa Pablo en Filipenses 4:8 traducido como 'amable' o 'digno de amor'?",



    options: ["Semnos", "Euphoma", "Agathos", "Prosphilo"],



    correct: 3, reference: "Filipenses 4:8"



  },



  {



    id: 1971, difficulty: "experto", category: "cartas",



    question: "?Desde que ciudad envio Pablo a Tercio como amanuense que escribio la carta a los Romanos?",



    options: ["Antioquia", "Corinto", "Filipos", "Efeso"],



    correct: 1, reference: "Romanos 16:22-23; cf. Hechos 20:2-3"



  },



  {



    id: 1972, difficulty: "experto", category: "cartas",



    question: "?Que expresion griega usa Pablo en Galatas 2:20 que resume la mistica paulina: 'zo de ouketi ego, zo de en emoi...'?",



    options: ["La gracia", "El Espiritu Santo", "Dios Padre", "Cristo"],



    correct: 3, reference: "Galatas 2:20"



  },



  {



    id: 1973, difficulty: "experto", category: "cartas",



    question: "?Que libro del AT cita extensamente el autor de Hebreos en el capitulo 3 para advertir contra la incredulidad?",



    options: ["Salmo 95", "Deuteronomio 1", "Exodo 17", "Numeros 14"],



    correct: 0, reference: "Hebreos 3:7-11; Salmo 95:7-11"



  },



  {



    id: 1974, difficulty: "experto", category: "cartas",



    question: "?Que termino tecnico griego aparece en 1 Corintios 16:22 como formula aramea transliterada que significa 'Senor nuestro, ven'?",



    options: ["Maranatha", "Abba", "Hosanna", "Amen"],



    correct: 0, reference: "1 Corintios 16:22"



  },



  {



    id: 1975, difficulty: "experto", category: "cartas",



    question: "?A que dos personas entrego Pablo a Satanas 'para que aprendan a no blasfemar' segun 1 Timoteo?",



    options: ["Diotrefes y Demas", "Fileto y Hermogenes", "Demas y Figelo", "Himeneo y Alejandro"],



    correct: 3, reference: "1 Timoteo 1:20"



  },



  {



    id: 1976, difficulty: "experto", category: "cartas",



    question: "?Que texto de Deuteronomio 25:4 cita Pablo en 1 Corintios 9:9 para defender el derecho del obrero a su salario?",



    options: ["'No pondras bozal al buey que trilla'", "'No haras acepcion de personas'", "'Amaras a tu projimo como a ti mismo'", "'El obrero es digno de su salario'"],



    correct: 0, reference: "1 Corintios 9:9; Deuteronomio 25:4"



  },



  {



    id: 1977, difficulty: "experto", category: "cartas",



    question: "?Que termino griego usa Pablo en 2 Corintios 3:18 para describir la transformacion progresiva del creyente 'de gloria en gloria'?",



    options: ["Allasso", "Metamorphoumetha", "Anakainoo", "Metaschomatizo"],



    correct: 1, reference: "2 Corintios 3:18"



  },



  {



    id: 1978, difficulty: "experto", category: "cartas",



    question: "?En que epistola Pablo utiliza la metafora del atleta, el soldado y el labrador como tres imagenes del ministerio cristiano?",



    options: ["Filipenses", "1 Corintios", "1 Tesalonicenses", "2 Timoteo"],



    correct: 3, reference: "2 Timoteo 2:3-6"



  },



  {



    id: 1979, difficulty: "experto", category: "cartas",



    question: "?Que expresion griega hapax legomenon usa el autor de Hebreos en 12:1 traducida como 'nube de testigos'?",



    options: ["Synagogo martyron", "Nephos martyron", "Plothos martyron", "Ochlos martyron"],



    correct: 1, reference: "Hebreos 12:1"



  },



  {



    id: 1980, difficulty: "experto", category: "cartas",



    question: "?Cual de las siete epistolas generales (catolicas) es la mas breve del NT con solo 13 versiculos?",



    options: ["Judas", "3 Juan", "2 Juan", "2 Pedro"],



    correct: 1, reference: "3 Juan"



  },



  {



    id: 1981, difficulty: "experto", category: "cartas",



    question: "?Que termino griego usa Pedro en 2 Pedro 1:16 traducido como 'fabulas artificiosamente inventadas' al defender la veracidad apostolica?",



    options: ["Pseudo logoi", "Kenophonias", "Genealogiais aperantois", "Sesophismenois muthois"],



    correct: 3, reference: "2 Pedro 1:16"



  },



  {



    id: 1982, difficulty: "experto", category: "cartas",



    question: "?Que pasaje de Jeremias 31:31-34 cita extensamente el autor de Hebreos como la profecia del nuevo pacto?",



    options: ["Hebreos 5:1-4", "Hebreos 7:20-22", "Hebreos 8:8-12", "Hebreos 10:1-4"],



    correct: 2, reference: "Hebreos 8:8-12; Jeremias 31:31-34"



  },



  {



    id: 1983, difficulty: "experto", category: "cartas",



    question: "?Que disputa menciona Judas entre el arcangel Miguel y el diablo respecto al cuerpo de Moises?",



    options: ["Miguel enterro a Moises y el diablo lo desenterro", "El diablo queria usar el cuerpo para idolatria y Miguel no pronuncio juicio de maldicion", "Miguel reclamaba el alma de Moises para el cielo", "El diablo negaba la muerte de Moises"],



    correct: 1, reference: "Judas 9"



  },



  {



    id: 1984, difficulty: "experto", category: "cartas",



    question: "?Que expresion griega usa Pablo en Efesios 2:14 para llamar a Cristo 'nuestra paz' que derribo el muro de separacion?",



    options: ["Ho kurios homon", "Ho sotor homon", "Ho lytrotos homon", "Ho eirene homon"],



    correct: 3, reference: "Efesios 2:14"



  },



  {



    id: 1985, difficulty: "experto", category: "cartas",



    question: "?Que persona mencionada en Colosenses 4:17 recibio la instruccion de 'cumplir el ministerio que recibiste en el Senor'?",



    options: ["Onesimo", "Epafras", "Arquipo", "Tiquico"],



    correct: 2, reference: "Colosenses 4:17"



  },



  {



    id: 1986, difficulty: "experto", category: "cartas",



    question: "?Que termino griego usa Pablo en Romanos 8:26 para describir los gemidos 'inexpresables' del Espiritu al interceder?",



    options: ["Phonais megalais", "Stenagmois alaletois", "Glossais aggelikais", "Proseuchais adialeiptois"],



    correct: 1, reference: "Romanos 8:26"



  },



  {



    id: 1987, difficulty: "experto", category: "cartas",



    question: "?Que particularidad literaria distingue a Filemon como la unica carta paulina dirigida principalmente a un individuo sobre un asunto privado?",



    options: ["Es la mas larga de las cartas privadas", "Intercede por el esclavo Onesimo usando retorica deliberativa", "Contiene una extensa seccion doctrinal", "Fue escrita sin amanuense"],



    correct: 1, reference: "Filemon 8-21"



  },



  {



    id: 1988, difficulty: "experto", category: "cartas",



    question: "?Que cita de Genesis 15:6 usa Pablo tanto en Romanos 4:3 como en Galatas 3:6 para argumentar la justificacion por fe?",



    options: ["'Abraham obedecio mi voz y guardo mi precepto'", "'Por fe Abraham salio sin saber a donde iba'", "'Abraham creyo a Dios y le fue contado por justicia'", "'Abraham ofrecio a Isaac sobre el altar'"],



    correct: 2, reference: "Romanos 4:3; Galatas 3:6; Genesis 15:6"



  },



  {



    id: 1989, difficulty: "experto", category: "cartas",



    question: "?Que termino griego emplea Pablo en Colosenses 2:9 para expresar que en Cristo habita 'toda la plenitud de la Deidad corporalmente'?",



    options: ["Theototos", "Pneumatos", "Theiototos", "Doxos"],



    correct: 0, reference: "Colosenses 2:9"



  },



  {



    id: 1990, difficulty: "experto", category: "cartas",



    question: "?Que peculiaridad tiene 2 Juan al ser la unica epistola del NT dirigida a una 'senora elegida' (eklekto kyria)?",



    options: ["Es la carta mas larga de Juan", "Es la primera epistola general cronologicamente", "Contiene el unico mandamiento nuevo del NT", "Es dirigida a una congregacion personificada como mujer"],



    correct: 3, reference: "2 Juan 1"



  },



  {



    id: 1991, difficulty: "experto", category: "cartas",



    question: "?Que texto de Isaias 28:16 cita Pablo en Romanos 9:33 combinandolo con Isaias 8:14 para hablar de Cristo como piedra de tropiezo?",



    options: ["'El que creyere en el no sera avergonzado'", "'La piedra que desecharon los edificadores'", "'Piedra de tropiezo y roca de escandalo'", "Ambas citas combinadas en un solo pasaje"],



    correct: 3, reference: "Romanos 9:33; Isaias 28:16 + 8:14"



  },



  {



    id: 1992, difficulty: "experto", category: "cartas",



    question: "?Que expresion griega usa Santiago en 2:19 de forma ironica al decir que 'tambien los demonios creen y tiemblan'?",



    options: ["Pisteuousin kai phrussousin", "Homolousin kai klaiousin", "Pisteuousin kai tremousin", "Ginoskousin kai phobountai"],



    correct: 0, reference: "Santiago 2:19"



  },



  {



    id: 1993, difficulty: "experto", category: "cartas",



    question: "?Que estructura retorica clasica de diatriba (dialogo con interlocutor ficticio) emplea Pablo extensamente en Romanos?",



    options: ["Utiliza la estructura de los Salmos imprecatorios", "Emplea acrosticos hebreos ocultos", "Responde objeciones con '?Que diremos pues?' (ti oun eroumen)", "Usa parabolas como Jesus en los evangelios"],



    correct: 2, reference: "Romanos 3:1; 6:1; 7:7; 9:14"



  },



  {



    id: 1994, difficulty: "experto", category: "cartas",



    question: "?Que termino griego tecnico usa Pablo en Galatas 1:15 cuando dice que Dios lo 'aparto' desde el vientre, evocando la vocacion profetica?",



    options: ["Aphorisas", "Eklexato", "Ekalesen", "Procheirisato"],



    correct: 0, reference: "Galatas 1:15; cf. Jeremias 1:5; Isaias 49:1"



  },



  {



    id: 1995, difficulty: "experto", category: "cartas",



    question: "?Que persona menciona Pablo en 1 Corintios 1:14-16 como uno de los pocos que el personalmente bautizo en Corinto?",



    options: ["Apolos", "Sostenes", "Aquila", "Crispo"],



    correct: 3, reference: "1 Corintios 1:14"



  },



  {



    id: 1996, difficulty: "experto", category: "cartas",



    question: "?Que termino griego usa Pablo en 1 Tesalonicenses 4:15 traducido como 'palabra del Senor' (logos kyriou) para fundamentar la ensenanza sobre la parusia?",



    options: ["Una cita del libro de Daniel", "Un agraphon o dicho de Jesus no registrado en los evangelios", "Una cita directa de los evangelios escritos", "Una referencia a Malaquias"],



    correct: 1, reference: "1 Tesalonicenses 4:15"



  },



  {



    id: 1997, difficulty: "experto", category: "cartas",



    question: "?Que peculiaridad tiene Hebreos entre las epistolas del NT en cuanto a su estructura introductoria?",



    options: ["Inicia con una oracion liturgica completa", "Abre con una lista de virtudes cristianas", "Carece del saludo epistolar tipico al inicio, comenzando como un tratado teologico", "Comienza con una genealogia"],



    correct: 2, reference: "Hebreos 1:1-4"



  },



  {



    id: 1998, difficulty: "experto", category: "cartas",



    question: "?Que termino griego usa Pablo en Efesios 6:12 para 'potestades' o 'autoridades' espirituales malignas en las regiones celestes?",



    options: ["Dynameis", "Exousias", "Arcontas", "Kosmokratoras"],



    correct: 3, reference: "Efesios 6:12"



  },



  {



    id: 1999, difficulty: "experto", category: "cartas",



    question: "?Que cita directa de Habacuc 2:3-4 usa el autor de Hebreos en 10:37-38 para exhortar a la perseverancia?",



    options: ["'Clama y no ceses, levanta tu voz como trompeta'", "'Aunque la vision tardara, esperala'", "'El que ha de venir vendra y no tardara; mas el justo vivira por fe'", "'?No eres tu desde la eternidad, Jehova Dios mio?'"],



    correct: 2, reference: "Hebreos 10:37-38; Habacuc 2:3-4"



  },



  // --- Historias Experto (50 preguntas) ---



  {



    id: 89, difficulty: "experto", category: "historias",



    question: "?Quien era Rahab y que papel tuvo en la conquista de Jerico?",



    options: ["Una prostituta que escondio a los espias", "La esposa de Josue", "Una sacerdotisa que maldijo a Israel", "Una profetisa que guio a Israel"],



    correct: 0, reference: "Josue 2:1-21"



  },



  {



    id: 90, difficulty: "experto", category: "historias",



    question: "?Cual fue la senal que Gedeon pidio a Dios con el vellon?",



    options: ["Que el vellon se quemara", "Que el vellon estuviera mojado y el suelo seco, y luego al reves", "Que lloviera sobre el vellon", "Que apareciera un angel"],



    correct: 1, reference: "Jueces 6:36-40"



  },



  {



    id: 950, difficulty: "experto", category: "historias",



    question: "?Que pacto hizo Dios con Noe y cual fue su senal?",



    options: ["Pacto de no destruir con diluvio, senal: arcoiris", "Pacto de tierra con fuego", "Pacto de prosperidad con lluvia", "Pacto de descendencia con estrella"],



    correct: 0, reference: "Genesis 9:11-13"



  },



  {



    id: 951, difficulty: "experto", category: "historias",



    question: "?En que consistio el pacto de las partes con Abraham?",



    options: ["Sacrificio de Isaac", "Circuncision", "Animales cortados por la mitad y antorcha pasando", "Ofrenda de diezmos"],



    correct: 2, reference: "Genesis 15:9-18"



  },



  {



    id: 952, difficulty: "experto", category: "historias",



    question: "?Cuantos anos transcurrieron entre Abraham y el exodo?",



    options: ["215", "430", "500", "400"],



    correct: 1, reference: "Exodo 12:40; Galatas 3:17"



  },



  {



    id: 953, difficulty: "experto", category: "historias",



    question: "?Que evento historico marca Genesis 3:15 (protoevangelio)?",



    options: ["La creacion del hombre", "El diluvio universal", "El llamado de Abraham", "La primera profecia mesianica"],



    correct: 3, reference: "Genesis 3:15"



  },



  {



    id: 954, difficulty: "experto", category: "historias",



    question: "?Cual fue la estrategia militar de Josue contra Hai?",



    options: ["Ataque frontal", "Emboscada con dos grupos", "Cerco de 7 dias", "Trompetas y gritos"],



    correct: 1, reference: "Josue 8:3-8"



  },



  {



    id: 955, difficulty: "experto", category: "historias",



    question: "?Por que Moises no entro a la tierra prometida?",



    options: ["Se nego a liderar", "Era muy viejo", "Adoro al becerro", "Golpeo la roca en vez de hablarle"],



    correct: 3, reference: "Numeros 20:7-12"



  },



  {



    id: 956, difficulty: "experto", category: "historias",



    question: "?Que evento marca el fin de la era de los jueces?",



    options: ["Conquista de Jerusalen", "Uncion de Saul como rey", "Muerte de Sanson", "Construccion del templo"],



    correct: 1, reference: "1 Samuel 10:1"



  },



  {



    id: 957, difficulty: "experto", category: "historias",



    question: "?Cuantos anos goberno Salomon?",



    options: ["50", "40", "30", "20"],



    correct: 1, reference: "1 Reyes 11:42"



  },



  {



    id: 958, difficulty: "experto", category: "historias",



    question: "?Que causo la division del reino tras Salomon?",



    options: ["Cargas pesadas e impuestos de Roboam", "Invasion extranjera", "Profecia cumplida de Moises", "Guerra civil"],



    correct: 0, reference: "1 Reyes 12:4-16"



  },



  {



    id: 959, difficulty: "experto", category: "historias",



    question: "?En que ano cayo el reino del norte (Samaria)?",



    options: ["722 a.C.", "586 a.C.", "605 a.C.", "516 a.C."],



    correct: 0, reference: "2 Reyes 17:6"



  },



  {



    id: 960, difficulty: "experto", category: "historias",



    question: "?En que ano cayo Jerusalen ante Babilonia?",



    options: ["605 a.C.", "516 a.C.", "586 a.C.", "722 a.C."],



    correct: 2, reference: "2 Reyes 25:8-10"



  },



  {



    id: 961, difficulty: "experto", category: "historias",



    question: "?Que decreto de Ciro permitio el regreso de los judios?",



    options: ["Edicto de Babilonia", "Decreto de reconstruccion militar", "Edicto de Ciro (538 a.C.)", "Decreto de tolerancia religiosa"],



    correct: 2, reference: "Esdras 1:1-4"



  },



  {



    id: 962, difficulty: "experto", category: "historias",



    question: "?Cuantos regresaron en la primera oleada con Zorobabel?",



    options: ["12,000", "50,000", "70,000", "42,360"],



    correct: 3, reference: "Esdras 2:64"



  },



  {



    id: 963, difficulty: "experto", category: "historias",



    question: "?Cuantos anos tardo la reconstruccion del segundo templo?",



    options: ["10 anos", "46 anos", "4 anos", "20 anos"],



    correct: 3, reference: "Esdras 3-6 (516 a.C.)"



  },



  {



    id: 964, difficulty: "experto", category: "historias",



    question: "?Que papel jugo el profeta Ageo en la reconstruccion?",



    options: ["Arquitecto del templo", "Financio la obra", "Motivo al pueblo a reconstruir", "Protegio a los obreros"],



    correct: 2, reference: "Ageo 1:1-8"



  },



  {



    id: 965, difficulty: "experto", category: "historias",



    question: "?Cuantos dias completo Nehemias la reconstruccion del muro?",



    options: ["40", "52", "70", "30"],



    correct: 1, reference: "Nehemias 6:15"



  },



  {



    id: 966, difficulty: "experto", category: "historias",



    question: "?Que significado teologico tiene el exodo para Israel?",



    options: ["Conquista militar", "Redencion y liberacion por gracia", "Alianza politica", "Expansion territorial"],



    correct: 1, reference: "Exodo 6:6-7"



  },



  {



    id: 967, difficulty: "experto", category: "historias",



    question: "?Cuantas estaciones del desierto se registran en Numeros 33?",



    options: ["24", "70", "12", "42"],



    correct: 3, reference: "Numeros 33:1-49"



  },



  {



    id: 968, difficulty: "experto", category: "historias",



    question: "?Que sucedio en Cades-barnea?",



    options: ["Cruce del Jordan", "Rebelion de Israel por el informe de los espias", "Victoria sobre Jerico", "Muerte de Moises"],



    correct: 1, reference: "Numeros 13:26-14:10"



  },



  {



    id: 969, difficulty: "experto", category: "historias",



    question: "?Que alianza hizo Josafat que fue reprochada por Dios?",



    options: ["Tratado con Edom", "Alianza con Acab de Israel", "Pacto con Egipto", "Alianza con Asiria"],



    correct: 1, reference: "2 Cronicas 18:1-3; 19:2"



  },



  {



    id: 970, difficulty: "experto", category: "historias",



    question: "?Que reforma religiosa hizo Ezequias?",



    options: ["Escribio la ley", "Construyo el templo", "Reabrio y purifico el templo", "Destruyo Samaria"],



    correct: 2, reference: "2 Cronicas 29:3-19"



  },



  {



    id: 971, difficulty: "experto", category: "historias",



    question: "?Que destruyo Ezequias que Moises habia hecho?",



    options: ["El arca", "El candelabro", "Las tablas de la ley", "La serpiente de bronce (Nehustan)"],



    correct: 3, reference: "2 Reyes 18:4"



  },



  {



    id: 972, difficulty: "experto", category: "historias",



    question: "?Cuantos soldados asirios murio por el angel del Senor?",



    options: ["50,000", "200,000", "185,000", "100,000"],



    correct: 2, reference: "2 Reyes 19:35"



  },



  {



    id: 973, difficulty: "experto", category: "historias",



    question: "?En que contexto historico profetizo Habacuc?",



    options: ["Regreso del exilio", "Ante la invasion caldea inminente", "Exilio en Babilonia", "Reinado de David"],



    correct: 1, reference: "Habacuc 1:6"



  },



  {



    id: 974, difficulty: "experto", category: "historias",



    question: "?Que vision tuvo Nabucodonosor sobre los imperios?",



    options: ["Diez cuernos", "Siete sellos", "Cuatro bestias", "Una estatua con cuatro metales"],



    correct: 3, reference: "Daniel 2:31-45"



  },



  {



    id: 975, difficulty: "experto", category: "historias",



    question: "?Que representaba la piedra que destruyo la estatua en Daniel 2?",



    options: ["La iglesia primitiva", "El imperio romano", "El reino eterno de Dios", "Israel restaurado"],



    correct: 2, reference: "Daniel 2:44-45"



  },



  {



    id: 976, difficulty: "experto", category: "historias",



    question: "?Que fiesta judia prefigura la muerte de Cristo?",



    options: ["Pascua", "Pentecostes", "Purim", "Tabernaculos"],



    correct: 0, reference: "1 Corintios 5:7"



  },



  {



    id: 977, difficulty: "experto", category: "historias",



    question: "?Que evento conecta la ofrenda de Isaac con la cruz?",



    options: ["El mana del desierto", "La zarza ardiente", "La serpiente de bronce", "El cordero sustituto en Moriah"],



    correct: 3, reference: "Genesis 22:13; Juan 1:29"



  },



  {



    id: 978, difficulty: "experto", category: "historias",



    question: "?Cuantos anos de silencio profetico hubo entre AT y NT?",



    options: ["400", "300", "200", "500"],



    correct: 0, reference: "Periodo intertestamentario"



  },



  {



    id: 979, difficulty: "experto", category: "historias",



    question: "?Que imperio dominaba durante el periodo intertestamentario?",



    options: ["Solo Romano", "Asirio luego Babilonico", "Persa luego Griego luego Romano", "Solo Griego"],



    correct: 2, reference: "Historia intertestamentaria"



  },



  {



    id: 980, difficulty: "experto", category: "historias",



    question: "?Que revuelta judia ocurrio entre AT y NT?",



    options: ["Guerra del Jordan", "Rebelion de Core", "Revuelta Macabea", "Revuelta de Bar Kojba"],



    correct: 2, reference: "1 Macabeos"



  },



  {



    id: 981, difficulty: "experto", category: "historias",



    question: "?Que fiesta celebra la revuelta macabea?",



    options: ["Purim", "Tabernaculos", "Hanuka", "Pascua"],



    correct: 2, reference: "Juan 10:22"



  },



  {



    id: 982, difficulty: "experto", category: "historias",



    question: "?Que profecia de Daniel senala las 70 semanas?",



    options: ["Daniel 7", "Daniel 2", "Daniel 12", "Daniel 9:24-27"],



    correct: 3, reference: "Daniel 9:24-27"



  },



  {



    id: 983, difficulty: "experto", category: "historias",



    question: "?Que evento historico cumple Isaias 44:28?",



    options: ["Decreto de Ciro", "Construccion del arca", "Nacimiento de Jesus", "Caida de Babilonia"],



    correct: 0, reference: "Isaias 44:28; Esdras 1:1"



  },



  {



    id: 984, difficulty: "experto", category: "historias",



    question: "?Cuantas generaciones lista Mateo de Abraham a Cristo?",



    options: ["28", "70", "42", "52"],



    correct: 2, reference: "Mateo 1:17"



  },



  {



    id: 985, difficulty: "experto", category: "historias",



    question: "?Que censo provoco el viaje a Belen?",



    options: ["Censo de Herodes", "Censo de Augusto Cesar", "Censo de Pilato", "Censo de Tiberio"],



    correct: 1, reference: "Lucas 2:1-5"



  },



  {



    id: 986, difficulty: "experto", category: "historias",



    question: "?Que masacre ordeno Herodes y cuantos ninos murieron aproximadamente?",



    options: ["Ninos menores de 2 anos en Belen", "50 ninos en Jerusalen", "Primogenitos en Galilea", "100 ninos en Judea"],



    correct: 0, reference: "Mateo 2:16"



  },



  {



    id: 987, difficulty: "experto", category: "historias",



    question: "?Que paralelo tipologico hay entre Jose (AT) y Cristo?",



    options: ["Ambos fueron reyes", "Ambos nacieron en Belen", "Ambos fueron sacerdotes", "Ambos fueron rechazados, vendidos y luego exaltados"],



    correct: 3, reference: "Genesis 37-50"



  },



  {



    id: 988, difficulty: "experto", category: "historias",



    question: "?Que significado tiene el cruce del Mar Rojo tipologicamente?",



    options: ["Bautismo y nueva vida", "Alianza politica", "Conquista territorial", "Victoria militar"],



    correct: 0, reference: "1 Corintios 10:1-2"



  },



  {



    id: 989, difficulty: "experto", category: "historias",



    question: "?Que ciudad fue destruida por no arrepentirse pese a la predicacion de Jonas?",



    options: ["Jerico", "Ninive si se arrepintio", "Babilonia", "Sodoma"],



    correct: 1, reference: "Jonas 3:5-10"



  },



  {



    id: 990, difficulty: "experto", category: "historias",



    question: "?Que acontecimiento de Hechos 10 marco la entrada de gentiles a la iglesia?",



    options: ["Viaje de Pablo", "Muerte de Esteban", "Conversion de Cornelio", "Concilio de Jerusalen"],



    correct: 2, reference: "Hechos 10:44-48"



  },



  {



    id: 991, difficulty: "experto", category: "historias",



    question: "?Cuantos viajes misioneros realizo Pablo segun Hechos?",



    options: ["5", "2", "3", "4"],



    correct: 2, reference: "Hechos 13-21"



  },



  {



    id: 992, difficulty: "experto", category: "historias",



    question: "?Que provoco el concilio de Jerusalen en Hechos 15?",



    options: ["Persecucion romana", "Debate sobre la circuncision de gentiles", "Herejia gnostica", "Eleccion de diaconos"],



    correct: 1, reference: "Hechos 15:1-5"



  },



  {



    id: 993, difficulty: "experto", category: "historias",



    question: "?Como llego Pablo a Roma?",



    options: ["Voluntariamente", "Huyendo de Jerusalen", "Como prisionero tras apelar a Cesar", "Enviado por Pedro"],



    correct: 2, reference: "Hechos 25:11; 27-28"



  },



  {



    id: 994, difficulty: "experto", category: "historias",



    question: "?Que naufragio sufrio Pablo camino a Roma?",



    options: ["Cerca de Malta", "En Creta", "En el Mar Negro", "En el Mar Rojo"],



    correct: 0, reference: "Hechos 27:39-44"



  },



  {



    id: 995, difficulty: "experto", category: "historias",



    question: "?Que relacion hay entre el tabernaculo y Cristo segun Hebreos?",



    options: ["Cristo destruyo el tabernaculo", "Ninguna directa", "El tabernaculo era sombra de las realidades celestiales en Cristo", "El tabernaculo reemplazo a Cristo"],



    correct: 2, reference: "Hebreos 8:5; 9:11"



  },



  // --- Vida de Jesus ---



  {



    id: 1550, difficulty: "experto", category: "vida_jesus",



    question: "?Que termino griego usa Juan 1:1 para referirse a Jesus como 'Verbo'?",



    options: ["Graphe", "Logos", "Didache", "Rhema"],



    correct: 1, reference: "Juan 1:1"



  },



  {



    id: 1551, difficulty: "experto", category: "vida_jesus",



    question: "?Que nombre aparece en la genealogia de Jesus en Lucas pero NO en la de Mateo, como hijo de David?",



    options: ["Natan", "Roboam", "Salomon", "Abiud"],



    correct: 0, reference: "Lucas 3:31"



  },



  {



    id: 1552, difficulty: "experto", category: "vida_jesus",



    question: "?Cuantas generaciones menciona Mateo desde Abraham hasta Cristo en total?",



    options: ["28 generaciones", "42 generaciones", "50 generaciones", "36 generaciones"],



    correct: 1, reference: "Mateo 1:17"



  },



  {



    id: 1553, difficulty: "experto", category: "vida_jesus",



    question: "?Que profeta es citado en Mateo 2:15 con la frase 'De Egipto llame a mi hijo'?",



    options: ["Miqueas", "Jeremias", "Oseas", "Isaias"],



    correct: 2, reference: "Mateo 2:15; Oseas 11:1"



  },



  {



    id: 1554, difficulty: "experto", category: "vida_jesus",



    question: "?A que edad fue Jesus presentado en el templo segun la ley de Moises, y quien lo reconocio como el Mesias ademas de Ana?",



    options: ["A los 40 dias; Simeon", "A los 12 anos; Gamaliel", "Al ano; Nicodemo", "A los 8 dias; Zacarias"],



    correct: 0, reference: "Lucas 2:22-35"



  },



  {



    id: 1555, difficulty: "experto", category: "vida_jesus",



    question: "?Cual es el unico evangelio que narra la visita de Jesus al templo a los 12 anos?",



    options: ["Mateo", "Lucas", "Marcos", "Juan"],



    correct: 1, reference: "Lucas 2:41-52"



  },



  {



    id: 1556, difficulty: "experto", category: "vida_jesus",



    question: "?Que tipo de amor expresa el termino griego 'agape' que Jesus uso en Juan 13:34?",



    options: ["Amor fraternal entre amigos", "Amor familiar", "Amor incondicional y sacrificial", "Amor romantico"],



    correct: 2, reference: "Juan 13:34-35"



  },



  {



    id: 1557, difficulty: "experto", category: "vida_jesus",



    question: "?En que evangelio exclusivamente aparece la parabola del buen samaritano?",



    options: ["Juan", "Mateo", "Lucas", "Marcos"],



    correct: 2, reference: "Lucas 10:25-37"



  },



  {



    id: 1558, difficulty: "experto", category: "vida_jesus",



    question: "?Como se llamaba el suegro de Pedro, cuya suegra fue sanada por Jesus segun la tradicion, y en que ciudad vivian?",



    options: ["En Nazaret", "En Capernaum", "En Betania", "En Jerusalen"],



    correct: 1, reference: "Marcos 1:29-31"



  },



  {



    id: 1559, difficulty: "experto", category: "vida_jesus",



    question: "?Cual es la primera senal (milagro) de Jesus segun el Evangelio de Juan?",



    options: ["La pesca milagrosa", "Convertir agua en vino en Cana", "Caminar sobre el agua", "Sanar al hijo de un noble"],



    correct: 1, reference: "Juan 2:1-11"



  },



  {



    id: 1560, difficulty: "experto", category: "vida_jesus",



    question: "?Que discipulo le dijo a Jesus: 'Senor, muestranos al Padre y nos basta'?",



    options: ["Andres", "Felipe", "Pedro", "Tomas"],



    correct: 1, reference: "Juan 14:8"



  },



  {



    id: 1561, difficulty: "experto", category: "vida_jesus",



    question: "?Cuantas veces purifico Jesus el templo segun los evangelios, y en que evangelio se narra la primera purificacion?",



    options: ["Tres veces; la primera en Lucas", "Una vez, en Mateo", "Dos veces; la primera en Juan", "Una vez, en Marcos"],



    correct: 2, reference: "Juan 2:13-17; Mateo 21:12-13"



  },



  {



    id: 1562, difficulty: "experto", category: "vida_jesus",



    question: "?Como se llama el estanque en Jerusalen donde Jesus sano al paralitico que llevaba 38 anos enfermo?",



    options: ["Estanque de Betesda", "Estanque de Gihon", "Estanque de Siloe", "Estanque de Salomon"],



    correct: 0, reference: "Juan 5:2-9"



  },



  {



    id: 1563, difficulty: "experto", category: "vida_jesus",



    question: "?Que termino griego para 'otro Consolador' usa Jesus en Juan 14:16, indicando 'otro de la misma clase'?",



    options: ["Pneuma", "Monos", "Heteros", "Allos"],



    correct: 3, reference: "Juan 14:16"



  },



  {



    id: 1564, difficulty: "experto", category: "vida_jesus",



    question: "?En que dia de la semana de la Pasion maldijo Jesus la higuera segun Marcos?",



    options: ["Miercoles", "Domingo (entrada triunfal)", "Lunes", "Martes"],



    correct: 2, reference: "Marcos 11:12-14"



  },



  {



    id: 1565, difficulty: "experto", category: "vida_jesus",



    question: "?Cuantas palabras (declaraciones) pronuncio Jesus desde la cruz segun los cuatro evangelios combinados?",



    options: ["3", "9", "5", "7"],



    correct: 3, reference: "Mateo 27:46; Lucas 23:34,43,46; Juan 19:26-28,30"



  },



  {



    id: 1566, difficulty: "experto", category: "vida_jesus",



    question: "?Que nombre recibe en griego la inscripcion colocada sobre la cruz de Jesus?",



    options: ["Kerigma", "Stauros", "Epitaphios", "Titulus"],



    correct: 3, reference: "Juan 19:19-20"



  },



  {



    id: 1567, difficulty: "experto", category: "vida_jesus",



    question: "?Quien era el padre de los apostoles Santiago y Juan, hijos de Zebedeo?",



    options: ["Jonas", "Zebedeo", "Cleofas", "Alfeo"],



    correct: 1, reference: "Mateo 4:21"



  },



  {



    id: 1568, difficulty: "experto", category: "vida_jesus",



    question: "?Que discipulo era recaudador de impuestos antes de seguir a Jesus, y con que otro nombre se le conoce?",



    options: ["Simon/Pedro", "Tomas/Didimo", "Mateo/Levi", "Natanael/Bartolome"],



    correct: 2, reference: "Marcos 2:14; Mateo 9:9"



  },



  {



    id: 1569, difficulty: "experto", category: "vida_jesus",



    question: "?En que evangelio Jesus dice 'Yo soy el pan de vida' como parte de los siete 'Yo soy' joanicos?",



    options: ["Juan", "Lucas", "Mateo", "Marcos"],



    correct: 0, reference: "Juan 6:35"



  },



  {



    id: 1570, difficulty: "experto", category: "vida_jesus",



    question: "?Cuantos 'ayes' pronuncio Jesus contra los escribas y fariseos en Mateo 23?",



    options: ["10", "7", "3", "5"],



    correct: 1, reference: "Mateo 23:13-36"



  },



  {



    id: 1571, difficulty: "experto", category: "vida_jesus",



    question: "?Como se llamaba el siervo del sumo sacerdote a quien Pedro le corto la oreja?",



    options: ["Lazaro", "Barrabas", "Nicodemo", "Malco"],



    correct: 3, reference: "Juan 18:10"



  },



  {



    id: 1572, difficulty: "experto", category: "vida_jesus",



    question: "?Que mujer ungio los pies de Jesus con perfume de nardo puro segun Juan 12?",



    options: ["Marta", "La mujer pecadora de Lucas 7", "Maria de Betania", "Maria Magdalena"],



    correct: 2, reference: "Juan 12:3"



  },



  {



    id: 1573, difficulty: "experto", category: "vida_jesus",



    question: "?Cuantos denarios dijo Judas que se podrian haber obtenido por el perfume derramado sobre Jesus?",



    options: ["200 denarios", "300 denarios", "100 denarios", "500 denarios"],



    correct: 1, reference: "Juan 12:5"



  },



  {



    id: 1574, difficulty: "experto", category: "vida_jesus",



    question: "?En que monte fue transfigurado Jesus segun la tradicion, y que dos personajes aparecieron con el?",



    options: ["Monte Carmelo; Samuel y Elias", "Monte Sinai; Abraham y David", "Monte Hermon; Isaias y Jeremias", "Monte Tabor; Moises y Elias"],



    correct: 3, reference: "Mateo 17:1-3; Marcos 9:2-4"



  },



  {



    id: 1575, difficulty: "experto", category: "vida_jesus",



    question: "?Cual fue el precio exacto que los principales sacerdotes pagaron a Judas por traicionar a Jesus?",



    options: ["40 piezas de plata", "30 piezas de plata", "50 piezas de plata", "20 piezas de plata"],



    correct: 1, reference: "Mateo 26:15; Zacarias 11:12"



  },



  {



    id: 1576, difficulty: "experto", category: "vida_jesus",



    question: "?Que campo se compro con el dinero que Judas devolvio, y que nombre recibio?",



    options: ["Campo del alfarero / Aceldama", "Campo de sangre / Golgota", "Campo de Booz / Belen", "Campo del pastor / Betania"],



    correct: 0, reference: "Mateo 27:7-8; Hechos 1:19"



  },



  {



    id: 1577, difficulty: "experto", category: "vida_jesus",



    question: "?Que termino griego usa Marcos para describir la hora en que Jesus fue crucificado ('hora tercera')?",



    options: ["Hora nona (3 p.m.)", "Hora tercera (9 a.m.)", "Hora primera (6 a.m.)", "Hora sexta (mediodia)"],



    correct: 1, reference: "Marcos 15:25"



  },



  {



    id: 1578, difficulty: "experto", category: "vida_jesus",



    question: "?Quien ayudo a Jesus a cargar la cruz camino al Calvario segun los sinopticos?",



    options: ["Barrabas", "Jose de Arimatea", "Nicodemo", "Simon de Cirene"],



    correct: 3, reference: "Marcos 15:21"



  },



  {



    id: 1579, difficulty: "experto", category: "vida_jesus",



    question: "?Como se llamaban los dos hijos de Simon de Cirene mencionados en Marcos?",



    options: ["Jacobo y Jose", "Santiago y Juan", "Alejandro y Rufo", "Andres y Felipe"],



    correct: 2, reference: "Marcos 15:21"



  },



  {



    id: 1580, difficulty: "experto", category: "vida_jesus",



    question: "?Que palabra aramea grito Jesus desde la cruz que significa 'Dios mio, Dios mio, ?por que me has desamparado?'?",



    options: ["Maranata", "Talita cumi", "Eloi, Eloi, ?lama sabactani?", "Abba, Padre"],



    correct: 2, reference: "Marcos 15:34"



  },



  {



    id: 1581, difficulty: "experto", category: "vida_jesus",



    question: "?Que miembro del Sanedrin pidio el cuerpo de Jesus a Pilato para sepultarlo?",



    options: ["Caifas", "Gamaliel", "Nicodemo", "Jose de Arimatea"],



    correct: 3, reference: "Marcos 15:43"



  },



  {



    id: 1582, difficulty: "experto", category: "vida_jesus",



    question: "?Que trajo Nicodemo para preparar el cuerpo de Jesus segun Juan 19:39?",



    options: ["Mirra y aloes, como cien libras", "Incienso y oro", "Aceite de oliva", "Especias y lienzos unicamente"],



    correct: 0, reference: "Juan 19:39"



  },



  {



    id: 1583, difficulty: "experto", category: "vida_jesus",



    question: "?Cual es el unico evangelio que registra la caida de Jesus con gotas de sangre (hematohidrosis) en Getsemani?",



    options: ["Marcos", "Juan", "Lucas", "Mateo"],



    correct: 2, reference: "Lucas 22:44"



  },



  {



    id: 1584, difficulty: "experto", category: "vida_jesus",



    question: "?Cuantos panes y peces uso Jesus en la alimentacion de los 4,000?",



    options: ["3 panes y 5 peces", "10 panes y 3 peces", "7 panes y unos pocos peces", "5 panes y 2 peces"],



    correct: 2, reference: "Mateo 15:34-38"



  },



  {



    id: 1585, difficulty: "experto", category: "vida_jesus",



    question: "?Cuantas canastas sobraron en la alimentacion de los 5,000 y cuantas en la de los 4,000?",



    options: ["10 y 5", "12 y 7", "5 y 3", "7 y 12"],



    correct: 1, reference: "Mateo 14:20; 15:37"



  },



  {



    id: 1586, difficulty: "experto", category: "vida_jesus",



    question: "?Que discipulo camino sobre el agua hacia Jesus y luego comenzo a hundirse?",



    options: ["Santiago", "Juan", "Pedro", "Andres"],



    correct: 2, reference: "Mateo 14:28-31"



  },



  {



    id: 1587, difficulty: "experto", category: "vida_jesus",



    question: "?En que ciudad Jesus resucito al hijo unico de una viuda, evento narrado solo por Lucas?",



    options: ["Betania", "Capernaum", "Nain", "Jerico"],



    correct: 2, reference: "Lucas 7:11-17"



  },



  {



    id: 1588, difficulty: "experto", category: "vida_jesus",



    question: "?Cual era el nombre del gobernador romano que interrogo a Jesus y no hallo culpa en el?",



    options: ["Herodes Antipas", "Poncio Pilato", "Festo", "Felix"],



    correct: 1, reference: "Juan 18:38"



  },



  {



    id: 1589, difficulty: "experto", category: "vida_jesus",



    question: "?Ante que otro gobernante fue enviado Jesus por Pilato durante su juicio, porque era galileo?",



    options: ["Cesar Augusto", "Lisanias", "Herodes Antipas", "Herodes Agripa"],



    correct: 2, reference: "Lucas 23:6-12"



  },



  {



    id: 1590, difficulty: "experto", category: "vida_jesus",



    question: "?Que velo se rasgo en dos cuando Jesus murio, y en que direccion se rasgo?",



    options: ["El velo del Lugar Santisimo, de arriba abajo", "El velo de la puerta del templo, de lado a lado", "La cortina del atrio exterior, de abajo arriba", "El velo del altar del incienso, en diagonal"],



    correct: 0, reference: "Mateo 27:51"



  },



  {



    id: 1591, difficulty: "experto", category: "vida_jesus",



    question: "?Cual es la unica parabola que aparece en los tres evangelios sinopticos?",



    options: ["El hijo prodigo", "Los talentos", "El sembrador", "El buen samaritano"],



    correct: 2, reference: "Mateo 13:3-23; Marcos 4:2-20; Lucas 8:4-15"



  },



  {



    id: 1592, difficulty: "experto", category: "vida_jesus",



    question: "?Que palabra aramea uso Jesus que significa 'Padre' en sentido intimo, registrada en Marcos 14:36?",



    options: ["Rabboni", "Elohim", "Adonai", "Abba"],



    correct: 3, reference: "Marcos 14:36"



  },



  {



    id: 1593, difficulty: "experto", category: "vida_jesus",



    question: "?Que discipulo no estaba presente cuando Jesus resucitado se aparecio por primera vez a los discipulos reunidos?",



    options: ["Tomas", "Juan", "Pedro", "Felipe"],



    correct: 0, reference: "Juan 20:24"



  },



  {



    id: 1594, difficulty: "experto", category: "vida_jesus",



    question: "?Cuantos dias permanecio Jesus en la tierra despues de su resurreccion antes de ascender?",



    options: ["7 dias", "3 dias", "40 dias", "50 dias"],



    correct: 2, reference: "Hechos 1:3"



  },



  {



    id: 1595, difficulty: "experto", category: "vida_jesus",



    question: "?En que lugar ascendio Jesus al cielo segun el relato de Lucas?",



    options: ["Monte Tabor", "Monte de los Olivos, cerca de Betania", "Monte Sinai", "Monte Hermon"],



    correct: 1, reference: "Lucas 24:50-51; Hechos 1:12"



  },



  {



    id: 1596, difficulty: "experto", category: "vida_jesus",



    question: "?Que profetisa anciana reconocio al nino Jesus en el templo y hablaba de el a todos los que esperaban la redencion?",



    options: ["Maria Magdalena", "Elizabet", "Juana", "Ana hija de Fanuel"],



    correct: 3, reference: "Lucas 2:36-38"



  },



  {



    id: 1597, difficulty: "experto", category: "vida_jesus",



    question: "?De que tribu era la profetisa Ana que vio al nino Jesus en el templo?",



    options: ["Levi", "Juda", "Benjamin", "Aser"],



    correct: 3, reference: "Lucas 2:36"



  },



  {



    id: 1598, difficulty: "experto", category: "vida_jesus",



    question: "?Que termino griego se usa en Juan 21:15-17 donde Jesus pregunta a Pedro si lo ama, cambiando entre 'agapao' y 'phileo'?",



    options: ["Storge y pragma", "Eros y storge", "Agapao y phileo", "Phileo y ludus"],



    correct: 2, reference: "Juan 21:15-17"



  },



  {



    id: 1599, difficulty: "experto", category: "vida_jesus",



    question: "?Cuantos discipulos estaban pescando cuando Jesus resucitado se les aparecio junto al mar de Tiberias segun Juan 21?",



    options: ["7", "5", "12", "10"],



    correct: 0, reference: "Juan 21:2"



  },



  // --- Milagros ---



  {



    id: 1750, difficulty: "experto", category: "milagros",



    question: "?Cuantas metretas (medidas) cabian aproximadamente en cada una de las seis tinajas de piedra en las bodas de Cana?",



    options: ["Cuatro o cinco", "Una o dos", "Dos o tres", "Seis o siete"],



    correct: 2, reference: "Juan 2:6"



  },



  {



    id: 1751, difficulty: "experto", category: "milagros",



    question: "?Cuantas veces estornudo el hijo de la sunamita al ser resucitado por Eliseo segun 2 Reyes 4?",



    options: ["7 veces", "3 veces", "No se menciona", "5 veces"],



    correct: 0, reference: "2 Reyes 4:35"



  },



  {



    id: 1752, difficulty: "experto", category: "milagros",



    question: "?Que rio golpeo Elias con su manto para dividir sus aguas antes de ser arrebatado al cielo?",



    options: ["Nilo", "Jordan", "Cison", "Eufrates"],



    correct: 1, reference: "2 Reyes 2:8"



  },



  {



    id: 1753, difficulty: "experto", category: "milagros",



    question: "Segun 2 Reyes 2:14, ?quien tambien dividio las aguas del Jordan golpeandolas con el manto de Elias despues de su ascension?",



    options: ["Eliseo", "Josue", "Giezi", "Naaman"],



    correct: 0, reference: "2 Reyes 2:14"



  },



  {



    id: 1754, difficulty: "experto", category: "milagros",



    question: "?Cual fue la tercera plaga que Dios envio sobre Egipto mediante Aaron?",



    options: ["Piojos", "Ranas", "Moscas", "ulceras"],



    correct: 0, reference: "Exodo 8:16-17"



  },



  {



    id: 1755, difficulty: "experto", category: "milagros",



    question: "?Cuantos dias duro la plaga de tinieblas sobre Egipto?",



    options: ["7 dias", "1 dia", "40 dias", "3 dias"],



    correct: 3, reference: "Exodo 10:22-23"



  },



  {



    id: 1756, difficulty: "experto", category: "milagros",



    question: "?Que animal hablo con voz humana para reprender la locura del profeta Balaam?",



    options: ["Un cordero", "Un buey", "Una asna", "Un carnero"],



    correct: 2, reference: "Numeros 22:28-30"



  },



  {



    id: 1757, difficulty: "experto", category: "milagros",



    question: "?Cuantas veces rodearon los israelitas la ciudad de Jerico el septimo dia antes de que cayeran sus muros?",



    options: ["1 vez", "3 veces", "7 veces", "12 veces"],



    correct: 2, reference: "Josue 6:15-16"



  },



  {



    id: 1758, difficulty: "experto", category: "milagros",



    question: "?Que le sucedio a la estatua de Dagon la segunda vez que amanecio junto al Arca del Pacto en su templo?",



    options: ["Se convirtio en polvo", "Cayo y se le cortaron la cabeza y las palmas de las manos", "Se quemo", "Se partio por la mitad"],



    correct: 1, reference: "1 Samuel 5:4"



  },



  {



    id: 1759, difficulty: "experto", category: "milagros",



    question: "?Con que alimentaron los cuervos a Elias junto al arroyo de Querit segun 1 Reyes 17?",



    options: ["Pan y fruta", "Pan y carne", "Higos y datiles", "Mana y agua"],



    correct: 1, reference: "1 Reyes 17:6"



  },



  {



    id: 1760, difficulty: "experto", category: "milagros",



    question: "?Cuantas veces mando Elias a su criado a mirar hacia el mar antes de que apareciera la nube que anunciaba lluvia?",



    options: ["5", "7", "10", "3"],



    correct: 1, reference: "1 Reyes 18:43-44"



  },



  {



    id: 1761, difficulty: "experto", category: "milagros",



    question: "?Que forma tenia la pequena nube que vio el criado de Elias emerger del mar antes de la gran lluvia?",



    options: ["Como la palma de la mano de un hombre", "Como un arco iris", "Como una gran montana", "Como una columna de humo"],



    correct: 0, reference: "1 Reyes 18:44"



  },



  {



    id: 1762, difficulty: "experto", category: "milagros",



    question: "?Cuantos panes de cebada uso Eliseo para alimentar milagrosamente a cien hombres?",



    options: ["50 panes", "10 panes", "20 panes", "5 panes"],



    correct: 2, reference: "2 Reyes 4:42-44"



  },



  {



    id: 1763, difficulty: "experto", category: "milagros",



    question: "?Que profeta oro para que su siervo pudiera ver los carros de fuego y caballos celestiales que los rodeaban en Dotan?",



    options: ["Eliseo", "Daniel", "Elias", "Isaias"],



    correct: 0, reference: "2 Reyes 6:16-17"



  },



  {



    id: 1764, difficulty: "experto", category: "milagros",



    question: "?Con que plaga castigo Dios a los filisteos de Asdod por retener el Arca del Pacto?",



    options: ["Tumores", "Langostas", "Lepra", "Ceguera"],



    correct: 0, reference: "1 Samuel 5:6"



  },



  {



    id: 1765, difficulty: "experto", category: "milagros",



    question: "?Sobre que ciudad detuvo Josue el sol y sobre cual valle detuvo la luna durante la batalla contra los amorreos?",



    options: ["Jerico (sol) y Ai (luna)", "Gabaon (sol) y valle de Ajalon (luna)", "Bet-el (sol) y Siquem (luna)", "Hebron (sol) y Laquis (luna)"],



    correct: 1, reference: "Josue 10:12-13"



  },



  {



    id: 1766, difficulty: "experto", category: "milagros",



    question: "?Cuantos hombres selectos uso Gedeon para derrotar a los madianitas despues de la reduccion milagrosa de su ejercito?",



    options: ["1,000", "300", "500", "100"],



    correct: 1, reference: "Jueces 7:7"



  },



  {



    id: 1767, difficulty: "experto", category: "milagros",



    question: "?Que tres objetos llevaban los 300 hombres de Gedeon al atacar el campamento madianita?",



    options: ["Arcos, flechas y antorchas", "Espadas, escudos y lanzas", "Cantaros, teas y trompetas", "Piedras, hondas y cuernos"],



    correct: 2, reference: "Jueces 7:16"



  },



  {



    id: 1768, difficulty: "experto", category: "milagros",



    question: "?En que lugar broto agua milagrosamente para saciar la sed de Sanson despues de matar a mil filisteos?",



    options: ["En Gaza", "En Sora", "En Lehi", "En Timnat"],



    correct: 2, reference: "Jueces 15:19"



  },



  {



    id: 1769, difficulty: "experto", category: "milagros",



    question: "?Cuantos filisteos aproximadamente mato Sanson al derrumbar el templo de Dagon sobre si mismo?",



    options: ["Alrededor de 10,000", "Alrededor de 3,000", "Alrededor de 5,000", "Alrededor de 1,000"],



    correct: 1, reference: "Jueces 16:27-30"



  },



  {



    id: 1770, difficulty: "experto", category: "milagros",



    question: "?Que echo Moises a las aguas amargas de Mara para que se endulzaran?",



    options: ["Harina", "Un arbol (un madero)", "Miel", "Sal"],



    correct: 1, reference: "Exodo 15:23-25"



  },



  {



    id: 1771, difficulty: "experto", category: "milagros",



    question: "?Cuantas fuentes de agua y palmeras habia en el oasis de Elim donde acamparon los israelitas?",



    options: ["10 fuentes y 60 palmeras", "15 fuentes y 80 palmeras", "12 fuentes y 70 palmeras", "7 fuentes y 50 palmeras"],



    correct: 2, reference: "Exodo 15:27"



  },



  {



    id: 1772, difficulty: "experto", category: "milagros",



    question: "?Con que plaga hirio Dios al rey Uzias cuando intento quemar incienso en el templo, funcion reservada a los sacerdotes?",



    options: ["Ceguera", "Paralisis", "Mudez", "Lepra"],



    correct: 3, reference: "2 Cronicas 26:19-21"



  },



  {



    id: 1773, difficulty: "experto", category: "milagros",



    question: "?Que le sucedio a la mano del rey Jeroboam cuando senalo al profeta que denunciaba el altar de Bet-el?",



    options: ["Se le cayo la espada", "Se le quemo", "Temblo incontrolablemente", "Se le seco y no podia retraerla"],



    correct: 3, reference: "1 Reyes 13:4"



  },



  {



    id: 1774, difficulty: "experto", category: "milagros",



    question: "?En cual de los evangelios se narra exclusivamente la resurreccion del hijo de la viuda de Nain?",



    options: ["Juan", "Mateo", "Marcos", "Lucas"],



    correct: 3, reference: "Lucas 7:11-17"



  },



  {



    id: 1775, difficulty: "experto", category: "milagros",



    question: "?Que detalle unico registra el Evangelio de Juan sobre la sanidad del ciego de nacimiento que no aparece en los sinopticos?",



    options: ["Jesus le soplo en los ojos", "Jesus oro en voz alta antes de sanarlo", "Jesus hizo lodo con saliva y lo unto en sus ojos", "Jesus le impuso las manos tres veces"],



    correct: 2, reference: "Juan 9:6"



  },



  {



    id: 1776, difficulty: "experto", category: "milagros",



    question: "?Cuantos enfermos sano Jesus junto al estanque de Betesda segun el relato de Juan 5?",



    options: ["Solamente uno", "Doce", "Cinco", "A todos los que estaban alli"],



    correct: 0, reference: "Juan 5:5-9"



  },



  {



    id: 1777, difficulty: "experto", category: "milagros",



    question: "?Que tipo de semilla comparo Jesus con la fe capaz de mover un monte?",



    options: ["De trigo", "De lino", "De mostaza", "De higuera"],



    correct: 2, reference: "Mateo 17:20"



  },



  {



    id: 1778, difficulty: "experto", category: "milagros",



    question: "?Que discipulo camino brevemente sobre el agua hacia Jesus antes de hundirse por dudar?",



    options: ["Santiago", "Andres", "Pedro", "Juan"],



    correct: 2, reference: "Mateo 14:28-31"



  },



  {



    id: 1779, difficulty: "experto", category: "milagros",



    question: "?En cuales evangelios se narra que Jesus sano al siervo de un centurion a distancia, sin verlo ni tocarlo?",



    options: ["Los cuatro evangelios", "Solo Lucas", "Solo Mateo", "Mateo y Lucas"],



    correct: 3, reference: "Mateo 8:5-13; Lucas 7:1-10"



  },



  {



    id: 1780, difficulty: "experto", category: "milagros",



    question: "?Cual fue la primera senal milagrosa que hizo Moises ante Faraon segun Exodo 7?",



    options: ["Enviar granizo", "Convertir la vara en serpiente", "Convertir el agua en sangre", "Producir oscuridad"],



    correct: 1, reference: "Exodo 7:10"



  },



  {



    id: 1781, difficulty: "experto", category: "milagros",



    question: "?Que sucedio con las varas de los magos de Egipto cuando tambien se convirtieron en serpientes ante Faraon?",



    options: ["Volvieron a ser varas", "Se convirtieron en ceniza", "La vara de Aaron se las trago", "Desaparecieron"],



    correct: 2, reference: "Exodo 7:12"



  },



  {



    id: 1782, difficulty: "experto", category: "milagros",



    question: "?Cuantas piedras lisas tomo David del arroyo para enfrentar al gigante Goliat?",



    options: ["5", "1", "7", "3"],



    correct: 0, reference: "1 Samuel 17:40"



  },



  {



    id: 1783, difficulty: "experto", category: "milagros",



    question: "?En que parte del cuerpo golpeo la piedra lanzada por David a Goliat?",



    options: ["En el pecho", "En la garganta", "En la frente", "En el ojo"],



    correct: 2, reference: "1 Samuel 17:49"



  },



  {



    id: 1784, difficulty: "experto", category: "milagros",



    question: "?Que echo Eliseo en un plato nuevo para purificar las aguas contaminadas de Jerico?",



    options: ["Sal", "Aceite", "Harina", "Ceniza"],



    correct: 0, reference: "2 Reyes 2:20-21"



  },



  {



    id: 1785, difficulty: "experto", category: "milagros",



    question: "?Que alimento preparo un angel para Elias cuando huia de Jezabel, y cuanto tiempo le sustento?",



    options: ["Pan y agua; 7 dias", "Carne y pan; 30 dias", "Fruta y leche; 21 dias", "Torta cocida y agua; 40 dias y 40 noches"],



    correct: 3, reference: "1 Reyes 19:6-8"



  },



  {



    id: 1786, difficulty: "experto", category: "milagros",



    question: "?A cuantos profetas falsos desafio Elias en total en el Monte Carmelo, sumando los de Baal y los de Asera?",



    options: ["450", "950", "550", "850"],



    correct: 3, reference: "1 Reyes 18:19"



  },



  {



    id: 1787, difficulty: "experto", category: "milagros",



    question: "?Cuantas veces ordeno Elias que derramaran agua sobre el sacrificio y la lena antes de que cayera fuego del cielo en el Carmelo?",



    options: ["2 veces", "3 veces", "4 veces", "1 vez"],



    correct: 1, reference: "1 Reyes 18:34"



  },



  {



    id: 1788, difficulty: "experto", category: "milagros",



    question: "?Que milagro ocurrio con la puerta de hierro de la prision cuando un angel libero a Pedro en Hechos 12?",



    options: ["El angel la arranco", "Se abrio por si misma", "Fue destruida por fuego", "Un terremoto la derribo"],



    correct: 1, reference: "Hechos 12:10"



  },



  {



    id: 1789, difficulty: "experto", category: "milagros",



    question: "?Cuantas cadenas ataban a Pedro cuando el angel lo libero de la carcel de Herodes?",



    options: ["Dos", "Cuatro", "Tres", "Una"],



    correct: 0, reference: "Hechos 12:6-7"



  },



  {



    id: 1790, difficulty: "experto", category: "milagros",



    question: "?Cuantos dias estuvo ciego Saulo de Tarso despues de su encuentro con Cristo en el camino a Damasco?",



    options: ["1 dia", "3 dias", "40 dias", "7 dias"],



    correct: 1, reference: "Hechos 9:8-9"



  },



  {



    id: 1791, difficulty: "experto", category: "milagros",



    question: "?Quien fue enviado por Dios a Damasco para devolver la vista a Saulo e imponerle las manos?",



    options: ["Felipe", "Bernabe", "Ananias", "Pedro"],



    correct: 2, reference: "Hechos 9:10-18"



  },



  {



    id: 1792, difficulty: "experto", category: "milagros",



    question: "?Que fenomeno sobrenatural ocurrio a medianoche cuando Pablo y Silas cantaban himnos en la carcel de Filipos?",



    options: ["Un gran terremoto abrio las puertas y solto las cadenas", "Un angel descendio visiblemente", "Los guardias cayeron dormidos", "Las paredes se derrumbaron"],



    correct: 0, reference: "Hechos 16:25-26"



  },



  {



    id: 1793, difficulty: "experto", category: "milagros",



    question: "?Que objetos personales de Pablo eran llevados a los enfermos y estos sanaban segun Hechos 19?",



    options: ["Panuelos y delantales", "Su sombra y su voz", "Cartas y pergaminos", "Su manto y su cinturon"],



    correct: 0, reference: "Hechos 19:11-12"



  },



  {



    id: 1794, difficulty: "experto", category: "milagros",



    question: "?Que nombre tenia el mago que quedo ciego temporalmente por oponerse a Pablo y Bernabe en Pafos, Chipre?",



    options: ["Simon", "Barjesus (Elimas)", "Hermes", "Demetrio"],



    correct: 1, reference: "Hechos 13:6-11"



  },



  {



    id: 1795, difficulty: "experto", category: "milagros",



    question: "?Cuantas personas en total iban en el barco que naufrago con Pablo rumbo a Roma, y todas sobrevivieron?",



    options: ["176", "276", "76", "376"],



    correct: 1, reference: "Hechos 27:37-44"



  },



  {



    id: 1796, difficulty: "experto", category: "milagros",



    question: "?Que milagro realizo Josue con las aguas del rio Jordan de manera semejante al cruce del Mar Rojo?",



    options: ["Las dividio para que Israel cruzara en seco", "Las endulzo para beber", "Las hizo retroceder rio arriba", "Las convirtio en sangre"],



    correct: 0, reference: "Josue 3:14-17"



  },



  {



    id: 1797, difficulty: "experto", category: "milagros",



    question: "?Cuantas piedras tomaron los israelitas del Jordan como memorial despues de cruzar en seco?",



    options: ["40", "12", "7", "10"],



    correct: 1, reference: "Josue 4:1-9"



  },



  {



    id: 1798, difficulty: "experto", category: "milagros",



    question: "?Que sabor tenia el mana que Dios envio del cielo a los israelitas en el desierto segun Exodo 16?",



    options: ["Como aceitunas maduras", "Como hojuelas con miel", "Como pan sin levadura", "Como datiles frescos"],



    correct: 1, reference: "Exodo 16:31"



  },



  {



    id: 1799, difficulty: "experto", category: "milagros",



    question: "?En que monte se detuvo el arca de Noe despues del diluvio segun Genesis 8?",



    options: ["Monte Hermon", "Monte Ararat", "Monte Sinai", "Monte Carmelo"],



    correct: 1, reference: "Genesis 8:4"



  },



  // --- Libros ---



  {



    id: 96, difficulty: "experto", category: "libros",



    question: "?Que libro del AT no menciona el nombre de Dios?",



    options: ["Cantares", "Rut", "Eclesiastes", "Ester"],



    correct: 3, reference: "Ester"



  },



  {



    id: 97, difficulty: "experto", category: "libros",



    question: "?Cuantos capitulos tiene el libro de los Salmos?",



    options: ["120", "175", "150", "100"],



    correct: 2, reference: "Salmos"



  },



  {



    id: 98, difficulty: "dificil", category: "libros",



    question: "?Cual es el libro mas corto del Antiguo Testamento?",



    options: ["Jonas", "Nahum", "Hageo", "Abdias"],



    correct: 3, reference: "Abdias (21 versiculos)"



  },



  {



    id: 99, difficulty: "dificil", category: "vida_jesus",



    question: "?Cuantas bienaventuranzas enseno Jesus en el Sermon del Monte?",



    options: ["8", "7", "5", "10"],



    correct: 0, reference: "Mateo 5:3-12"



  },



  {



    id: 100, difficulty: "experto", category: "personajes",



    question: "?Cual fue el primer martir cristiano?",



    options: ["Pablo", "Esteban", "Santiago", "Pedro"],



    correct: 1, reference: "Hechos 7:59-60"



  }



];



// Versiculos diarios



const DAILY_VERSES = [



  // 1-32: Versiculos ya existentes



  { text: "Porque de tal manera amo Dios al mundo, que ha dado a su Hijo unigenito, para que todo aquel que en el cree, no se pierda, mas tenga vida eterna.", ref: "Juan 3:16" },



  { text: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13" },



  { text: "Jehova es mi pastor; nada me faltara.", ref: "Salmos 23:1" },



  { text: "Confia en Jehova con todo tu corazon, y no te apoyes en tu propia prudencia.", ref: "Proverbios 3:5" },



  { text: "Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mi.", ref: "Juan 14:6" },



  { text: "Esforzaos y cobrad animo; no temais, ni tengais miedo de ellos, porque Jehova tu Dios es el que va contigo.", ref: "Deuteronomio 31:6" },



  { text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.", ref: "Romanos 8:28" },



  { text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os seran anadidas.", ref: "Mateo 6:33" },



  { text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.", ref: "Isaias 41:10" },



  { text: "El principio de la sabiduria es el temor de Jehova.", ref: "Proverbios 9:10" },



  { text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.", ref: "Efesios 2:8" },



  { text: "Fiel es Dios, por el cual fuisteis llamados a la comunion con su Hijo Jesucristo nuestro Senor.", ref: "1 Corintios 1:9" },



  { text: "Clama a mi, y yo te respondere, y te ensenare cosas grandes y ocultas que tu no conoces.", ref: "Jeremias 33:3" },



  { text: "De modo que si alguno esta en Cristo, nueva criatura es; las cosas viejas pasaron; he aqui todas son hechas nuevas.", ref: "2 Corintios 5:17" },



  { text: "Lampara es a mis pies tu palabra, y lumbrera a mi camino.", ref: "Salmos 119:105" },



  { text: "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso.", ref: "1 Corintios 13:4" },



  { text: "Venid a mi todos los que estais trabajados y cargados, y yo os hare descansar.", ref: "Mateo 11:28" },



  { text: "?Que, pues, diremos a esto? Si Dios es por nosotros, ?quien contra nosotros?", ref: "Romanos 8:31" },



  { text: "Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesus.", ref: "1 Tesalonicenses 5:18" },



  { text: "He aqui, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entrare a el.", ref: "Apocalipsis 3:20" },



  { text: "Pedid, y se os dara; buscad, y hallareis; llamad, y se os abrira.", ref: "Mateo 7:7" },



  { text: "Los que esperan en Jehova tendran nuevas fuerzas; levantaran alas como las aguilas.", ref: "Isaias 40:31" },



  { text: "Yo he venido para que tengan vida, y para que la tengan en abundancia.", ref: "Juan 10:10" },



  { text: "Mas el fruto del Espiritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.", ref: "Galatas 5:22-23" },



  { text: "Bienaventurados los de limpio corazon, porque ellos veran a Dios.", ref: "Mateo 5:8" },



  { text: "Jehova te bendiga, y te guarde; Jehova haga resplandecer su rostro sobre ti.", ref: "Numeros 6:24-25" },



  { text: "El Senor no retarda su promesa, segun algunos la tienen por tardanza.", ref: "2 Pedro 3:9" },



  { text: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.", ref: "Salmos 46:1" },



  { text: "Porque yo se los pensamientos que tengo acerca de vosotros, dice Jehova, pensamientos de paz.", ref: "Jeremias 29:11" },



  { text: "Jesus le dijo: Yo soy la resurreccion y la vida; el que cree en mi, aunque este muerto, vivira.", ref: "Juan 11:25" },



  { text: "El cielo y la tierra pasaran, pero mis palabras no pasaran.", ref: "Mateo 24:35" },



  // 33-365: Estructura base para completar



  ...Array.from({length: 365-32}, (_, i) => ({ text: "", ref: "" }))



];



// ============================================================



// BANCO DE PALABRAS PARA MODO IMPOSTOR



// ============================================================



const IMPOSTOR_WORDS = {



  personajes: [



    "Adan", "Eva", "Noe", "Abraham", "Sara", "Isaac", "Jacob", "Esau",



    "Jose", "Moises", "Aaron", "Josue", "Sanson", "Rut", "Samuel",



    "David", "Salomon", "Elias", "Eliseo", "Daniel", "Jonas", "Job",



    "Ester", "Nehemias", "Gedeon", "Debora", "Cain", "Abel",



    "Lot", "Rebeca", "Raquel", "Lea", "Benjamin", "Juda",



    "Caleb", "Booz", "Naomi", "Ezequias", "Josias", "Zorobabel"



  ],



  libros: [



    "Genesis", "Exodo", "Levitico", "Numeros", "Deuteronomio",



    "Josue", "Jueces", "Rut", "Salmos", "Proverbios",



    "Eclesiastes", "Cantares", "Isaias", "Jeremias", "Ezequiel",



    "Daniel", "Mateo", "Marcos", "Lucas", "Juan",



    "Hechos", "Romanos", "Galatas", "Efesios", "Filipenses",



    "Colosenses", "Hebreos", "Santiago", "Apocalipsis", "Lamentaciones"



  ],



  historias: [



    "El Diluvio", "La Torre de Babel", "El Exodo de Egipto",



    "Cruce del Mar Rojo", "Las 10 Plagas", "Los 10 Mandamientos",



    "David y Goliat", "Daniel en el foso de leones",



    "Jonas y la ballena", "La caida de Jerico",



    "El arca de Noe", "La zarza ardiente",



    "La escalera de Jacob", "El becerro de oro",



    "La burra de Balaam", "Sodoma y Gomorra",



    "El sacrificio de Isaac", "Jose vendido por sus hermanos",



    "Las bodas de Cana", "La ultima cena",



    "La traicion de Judas", "La batalla de Jerico",



    "El sueno de Nabucodonosor", "El mana del cielo"



  ],



  reyes: [



    "Saul", "David", "Salomon", "Roboam", "Jeroboam",



    "Acab", "Josafat", "Ezequias", "Josias", "Manases",



    "Asa", "Amasias", "Uzias", "Jotam", "Acaz",



    "Nabucodonosor", "Ciro", "Herodes", "Faraon", "Belsasar",



    "Dario", "Asuero", "Abias", "Omri", "Zimri"



  ],



  profetas: [



    "Isaias", "Jeremias", "Ezequiel", "Daniel", "Oseas",



    "Joel", "Amos", "Abdias", "Jonas", "Miqueas",



    "Nahum", "Habacuc", "Sofonias", "Hageo", "Zacarias",



    "Malaquias", "Elias", "Eliseo", "Samuel", "Natan",



    "Gad", "Debora", "Hulda", "Agabo", "Juan el Bautista"



  ],



  vida_jesus: [



    "Belen", "Nazaret", "Bautismo", "Tentacion en el desierto",



    "Sermon del Monte", "Transfiguracion", "ultima Cena",



    "Getsemani", "Crucifixion", "Resurreccion", "Ascension",



    "Bienaventuranzas", "Padre Nuestro", "Las parabolas",



    "Entrada triunfal", "Lavamiento de pies",



    "La oracion en el huerto", "El camino a Emaus",



    "Multiplicacion de panes", "Caminar sobre el agua",



    "La pesca milagrosa", "Lazaro resucitado"



  ],



  milagros: [



    "Agua en vino", "Multiplicacion de panes y peces",



    "Caminar sobre el agua", "Calmar la tempestad",



    "Resurreccion de Lazaro", "Curacion del ciego",



    "El leproso sanado", "La hija de Jairo",



    "Pesca milagrosa", "El paralitico sanado",



    "La vara de Moises", "El Mar Rojo partido",



    "El mana del cielo", "Agua de la roca",



    "La zarza que no se consume", "El sol detenido",



    "El hacha que floto", "Fuego del cielo de Elias",



    "La sombra de Pedro sana", "Las murallas de Jerico"



  ],



  cartas: [



    "Romanos", "1 Corintios", "2 Corintios", "Galatas",



    "Efesios", "Filipenses", "Colosenses", "1 Tesalonicenses",



    "2 Tesalonicenses", "1 Timoteo", "2 Timoteo", "Tito",



    "Filemon", "Hebreos", "Santiago", "1 Pedro", "2 Pedro",



    "1 Juan", "2 Juan", "3 Juan", "Judas", "Apocalipsis",



    "Fruto del Espiritu", "Armadura de Dios", "Fe esperanza y amor"



  ]



};



// Exponer globalmente para acceso entre scripts
// NOTA: CATEGORIES, DIFFICULTIES y BADGES se definen en definitions.js



window.IMPOSTOR_WORDS = IMPOSTOR_WORDS;



window.QUESTIONS_DB = QUESTIONS_DB;




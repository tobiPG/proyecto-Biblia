export interface ChronologyPuzzle {
  id: string;
  question: string;
  /** Elementos en el orden cronológico correcto. */
  items: string[];
}

// Migrado desde js/chronology.js (todos los correctOrder eran [0,1,2,3]).
export const CHRONOLOGY: ChronologyPuzzle[] = [
  {
    id: 'chr1',
    question: 'Ordena los días de la Creación según el Génesis:',
    items: ['Luz (día y noche)', 'Firmamento y aguas', 'Tierra seca y plantas', 'Sol, luna y estrellas']
  },
  {
    id: 'chr2',
    question: 'Ordena cronológicamente estos eventos del Jardín del Edén:',
    items: ['Creación de Adán', 'Creación de Eva', 'La serpiente tienta a Eva', 'Dios expulsa a Adán y Eva del Edén']
  },
  {
    id: 'chr3',
    question: 'Ordena cronológicamente estos patriarcas del Génesis:',
    items: ['Noé', 'Abraham', 'Isaac', 'Jacob']
  },
  {
    id: 'chr4',
    question: 'Ordena los eventos de la vida de Moisés:',
    items: ['Nacimiento y rescate por la hija del Faraón', 'La zarza ardiente', 'Las 10 plagas de Egipto', 'La entrega de los Diez Mandamientos en el Sinaí']
  },
  {
    id: 'chr5',
    question: 'Ordena cronológicamente estos eventos del Éxodo:',
    items: ['La Pascua (primera)', 'Cruce del Mar Rojo', 'El maná en el desierto', 'El becerro de oro']
  },
  {
    id: 'chr6',
    question: 'Ordena cronológicamente estos jueces de Israel:',
    items: ['Otoniel', 'Débora', 'Gedeón', 'Sansón']
  },
  {
    id: 'chr7',
    question: 'Ordena cronológicamente los primeros reyes de Israel:',
    items: ['Saúl', 'David', 'Salomón', 'División del reino (Roboam/Jeroboam)']
  },
  {
    id: 'chr8',
    question: 'Ordena estos eventos de la vida del rey David:',
    items: ['David mata a Goliat', 'David huye del rey Saúl', 'David es ungido rey sobre Israel', 'David construye el palacio en Jerusalén']
  },
  {
    id: 'chr9',
    question: 'Ordena cronológicamente estos eventos del libro de Job:',
    items: ['Dios permite a Satanás probar a Job', 'Job pierde sus hijos y posesiones', 'Los tres amigos de Job lo visitan', 'Dios restaura la fortuna de Job']
  },
  {
    id: 'chr10',
    question: 'Ordena cronológicamente estos profetas mayores de Israel:',
    items: ['Isaías', 'Jeremías', 'Ezequiel', 'Daniel']
  },
  {
    id: 'chr11',
    question: 'Ordena estos eventos del profeta Elías:',
    items: ['Elías anuncia sequía al rey Acab', 'El cuervo alimenta a Elías en el arroyo', 'El desafío en el Monte Carmelo', 'El torbellino lleva a Elías al cielo']
  },
  {
    id: 'chr12',
    question: 'Ordena cronológicamente los eventos del libro de Jonás:',
    items: ['Dios llama a Jonás a ir a Nínive', 'Jonás huye en un barco a Tarsis', 'Jonás es tragado por el gran pez', 'Jonás predica en Nínive']
  },
  {
    id: 'chr13',
    question: 'Ordena cronológicamente estos eventos de la vida de Jesús:',
    items: ['Nacimiento en Belén', 'Bautismo en el Jordán', 'Tentación en el desierto', 'Llamado de los primeros discípulos']
  },
  {
    id: 'chr14',
    question: 'Ordena cronológicamente los eventos de la Pasión de Cristo:',
    items: ['La Última Cena', 'La traición de Judas en Getsemaní', 'El juicio ante Pilato', 'La crucifixión en el Calvario']
  },
  {
    id: 'chr15',
    question: 'Ordena cronológicamente los eventos de la Resurrección y Ascensión:',
    items: ['La tumba vacía', 'Jesús aparece a María Magdalena', 'Jesús aparece a los Once discípulos', 'La Ascensión de Jesús al cielo']
  },
  {
    id: 'chr16',
    question: 'Ordena cronológicamente los eventos del libro de los Hechos:',
    items: ['Pentecostés: descenso del Espíritu Santo', 'Martirio de Esteban', 'Conversión de Saulo en el camino a Damasco', 'Primer viaje misionero de Pablo']
  },
  {
    id: 'chr17',
    question: 'Ordena cronológicamente los tres viajes misioneros de Pablo:',
    items: ['Primer viaje: Chipre y Asia Menor', 'Concilio de Jerusalén', 'Segundo viaje: Macedonia y Grecia', 'Tercer viaje: Éfeso y Corinto']
  },
  {
    id: 'chr18',
    question: 'Ordena estos eventos de la vida del patriarca José:',
    items: ['José vendido como esclavo por sus hermanos', 'José en la cárcel por la acusación de la esposa de Potifar', 'José interpreta los sueños del Faraón', 'José revela su identidad a sus hermanos']
  },
  {
    id: 'chr19',
    question: 'Ordena cronológicamente los eventos de la conquista de Canaán:',
    items: ['Cruce del río Jordán', 'La toma de Jericó', 'Batalla de Hai', 'Reparto de la tierra entre las tribus']
  },
  {
    id: 'chr20',
    question: 'Ordena cronológicamente estos eventos del libro de Daniel:',
    items: ['Daniel y sus amigos en la corte de Babilonia', 'Los tres jóvenes en el horno de fuego', 'Daniel interpreta el sueño de Nabucodonosor', 'Daniel en el foso de los leones']
  },
  {
    id: 'chr21',
    question: 'Ordena cronológicamente los eventos de la historia de Ester:',
    items: ['Ester es elegida reina', 'Amán conspira para destruir a los judíos', 'Mardoqueo pide a Ester que interceda', 'Amán es ahorcado y los judíos son salvados']
  },
  {
    id: 'chr22',
    question: 'Ordena cronológicamente los eventos de la historia de Rut:',
    items: ['Noemí y Rut regresan a Belén', 'Rut espiga en el campo de Booz', 'Booz habla con el pariente redentor', 'Booz y Rut se casan']
  },
  {
    id: 'chr23',
    question: 'Ordena cronológicamente estos momentos de la vida de Abraham:',
    items: ['Llamado a salir de Ur de los Caldeos', 'Pacto de Dios con Abraham (circuncisión)', 'Anuncio del nacimiento de Isaac', 'Sacrificio de Isaac en el Monte Moria']
  },
  {
    id: 'chr24',
    question: 'Ordena los días de la Creación completos según Génesis 1:',
    items: ['Día 1: Luz', 'Día 3: Tierra y plantas', 'Día 5: Aves y peces', 'Día 7: Descanso']
  },
  {
    id: 'chr25',
    question: 'Ordena cronológicamente los reyes del reino del Norte (Israel) más notables:',
    items: ['Jeroboam I (fundador)', 'Omri (fundó Samaria)', 'Acab (esposo de Jezabel)', 'Caída de Samaria ante Asiria']
  },
  {
    id: 'chr26',
    question: 'Ordena estos eventos de la parábola del hijo pródigo:',
    items: ['El hijo pide su herencia al padre', 'El hijo malgasta todo en vida desordenada', 'El hijo vuelve en sí y decide regresar', 'El padre sale corriendo a recibirlo']
  },
  {
    id: 'chr27',
    question: 'Ordena cronológicamente estos eventos del ministerio de Juan el Bautista:',
    items: ['Predicación en el desierto', 'Bautismo de Jesús en el Jordán', 'Juan enviado a la cárcel por Herodes', 'Decapitación de Juan el Bautista']
  },
  {
    id: 'chr28',
    question: 'Ordena cronológicamente los grandes imperios que dominaron Israel:',
    items: ['Imperio Asirio (caída de Samaria)', 'Imperio Babilónico (destrucción del Templo)', 'Imperio Persa (regreso del exilio)', 'Imperio Romano (época de Jesús)']
  },
  {
    id: 'chr29',
    question: 'Ordena cronológicamente los eventos del nacimiento de Moisés hasta su llamado:',
    items: ['Moisés es puesto en el río Nilo en una cesta', 'Moisés crece en el palacio del Faraón', 'Moisés huye a Madián tras matar al egipcio', 'La zarza ardiente y el llamado de Dios']
  },
  {
    id: 'chr30',
    question: 'Ordena cronológicamente los eventos de Pentecostés y la Iglesia primitiva:',
    items: ['Venida del Espíritu Santo en Pentecostés', 'Pedro predica y 3000 personas se convierten', 'Persecución de la iglesia en Jerusalén', 'El evangelio se extiende a Samaria y gentiles']
  }
];

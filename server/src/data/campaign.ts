import type { CategoryId, Difficulty } from "../types";

export interface CampaignChapter {
  id: string;
  name: string;
  categories: CategoryId[];
  difficulty: Difficulty;
}

export interface CampaignWorld {
  id: string;
  name: string;
  icon: string;
  subtitle: string;
  /** Estrellas totales necesarias para abrir el primer capítulo del mundo. */
  requiredStars: number;
  /** Palabras clave buscadas en la referencia bíblica de cada pregunta. */
  books: string[];
  chapters: CampaignChapter[];
}

// Migrado desde js/campaign.js
const WORLD_BOOKS: Record<string, string[]> = {
  w1: ['genesis', 'gen ', 'gén', 'gen.'],                                         // Génesis
  w2: ['exodo', 'éxodo', 'exodus', 'levitico', 'levítico', 'numeros', 'números',
       'deuteronomio', 'ex ', 'lev ', 'num ', 'deut'],                            // Pentateuco sin Génesis
  w3: ['josue', 'josué', 'jueces', '1 samuel', '2 samuel', '1 reyes', '2 reyes',
       '1samuel', '2samuel', '1reyes', '2reyes'],                                  // Josué→Reyes
  w4: ['salmo', 'psalm', 'proverbio', 'prov', 'eclesiastes', 'eclesiastés',
       'job ', 'job.', 'cantares', 'cant'],                                        // Libros poéticos
  w5: ['isaias', 'isaías', 'jeremias', 'jeremías', 'ezequiel', 'daniel',
       'oseas', 'joel', 'amos', 'amós', 'abdias', 'jonas', 'jonás',
       'miqueas', 'nahum', 'nahúm', 'habacuc', 'sofonias', 'hageo',
       'zacarias', 'zacarías', 'malaquias', 'malaquías'],                          // Profetas
  w6: ['mateo', 'marcos', 'lucas', 'juan ', 'juan.', 'mt ', 'mc ', 'lc ',
       'jn ', 'evangelio'],                                                         // Evangelios
  w7: ['hechos', 'romanos', 'corintios', 'galatas', 'gálatas', 'efesios',
       'filipenses', 'colosenses', 'tesalonicenses', 'timoteo', 'tito',
       'filemon', 'hebreos', 'santiago', '1 pedro', '2 pedro', '1 juan',
       '2 juan', '3 juan', 'judas', 'hch'],                                        // Hechos + Epístolas
  w8: ['apocalipsis', 'revelation', 'apoc']                                        // Apocalipsis
};

const WORLDS_BASE: Omit<CampaignWorld, "books">[] = [
  {
    id: 'w1',
    name: 'Los Orígenes',
    icon: '🌍',
    subtitle: 'Génesis y la Creación',
    requiredStars: 0,
    chapters: [
      { id: 'w1c1', name: 'La Creación', categories: ['historias', 'personajes'], difficulty: 'facil' },
      { id: 'w1c2', name: 'El Edén y la Caída', categories: ['historias', 'milagros'], difficulty: 'facil' },
      { id: 'w1c3', name: 'Los Patriarcas', categories: ['personajes', 'historias'], difficulty: 'facil' },
      { id: 'w1c4', name: 'Tierra y Promesas', categories: ['lugares', 'historias'], difficulty: 'intermedio' },
      { id: 'w1c5', name: 'Noé y Abraham', categories: ['personajes', 'historias'], difficulty: 'intermedio' }
    ]
  },
  {
    id: 'w2',
    name: 'Egipto y la Ley',
    icon: '🏛️',
    subtitle: 'Moisés y el Éxodo',
    requiredStars: 6,
    chapters: [
      { id: 'w2c1', name: 'José en Egipto', categories: ['historias', 'personajes'], difficulty: 'facil' },
      { id: 'w2c2', name: 'Las Plagas', categories: ['milagros', 'historias'], difficulty: 'intermedio' },
      { id: 'w2c3', name: 'Moisés y la Ley', categories: ['libros', 'historias'], difficulty: 'intermedio' },
      { id: 'w2c4', name: 'Los Mandamientos', categories: ['ensenanzas', 'libros'], difficulty: 'intermedio' },
      { id: 'w2c5', name: 'El Desierto', categories: ['lugares', 'historias'], difficulty: 'intermedio' }
    ]
  },
  {
    id: 'w3',
    name: 'La Historia de Israel',
    icon: '⚔️',
    subtitle: 'Jueces, Reyes y Guerras',
    requiredStars: 12,
    chapters: [
      { id: 'w3c1', name: 'Saúl y David', categories: ['reyes', 'historias'], difficulty: 'intermedio' },
      { id: 'w3c2', name: 'Los Reyes', categories: ['reyes', 'personajes'], difficulty: 'intermedio' },
      { id: 'w3c3', name: 'Tierras y Batallas', categories: ['historias', 'lugares'], difficulty: 'intermedio' },
      { id: 'w3c4', name: 'Salomón y el Templo', categories: ['reyes', 'historias'], difficulty: 'dificil' },
      { id: 'w3c5', name: 'El Reino Dividido', categories: ['personajes', 'reyes'], difficulty: 'dificil' }
    ]
  },
  {
    id: 'w4',
    name: 'Los Salmos y Sabiduría',
    icon: '📜',
    subtitle: 'Poesía y Sabiduría Divina',
    requiredStars: 18,
    chapters: [
      { id: 'w4c1', name: 'Los Salmos', categories: ['versiculos', 'ensenanzas'], difficulty: 'facil' },
      { id: 'w4c2', name: 'Proverbios', categories: ['ensenanzas', 'versiculos'], difficulty: 'intermedio' },
      { id: 'w4c3', name: 'Eclesiastés y Job', categories: ['versiculos', 'libros'], difficulty: 'intermedio' },
      { id: 'w4c4', name: 'Sabiduría Profunda', categories: ['ensenanzas', 'versiculos'], difficulty: 'dificil' },
      { id: 'w4c5', name: 'Las Escrituras', categories: ['versiculos', 'libros'], difficulty: 'dificil' }
    ]
  },
  {
    id: 'w5',
    name: 'Los Profetas',
    icon: '🔮',
    subtitle: 'Mensajeros del Señor',
    requiredStars: 24,
    chapters: [
      { id: 'w5c1', name: 'Isaías y Jeremías', categories: ['profetas', 'historias'], difficulty: 'intermedio' },
      { id: 'w5c2', name: 'Los Profetas Menores', categories: ['profetas', 'personajes'], difficulty: 'intermedio' },
      { id: 'w5c3', name: 'Ezequiel y Daniel', categories: ['profetas', 'historias'], difficulty: 'dificil' },
      { id: 'w5c4', name: 'Profecías y Visiones', categories: ['profetas', 'versiculos'], difficulty: 'dificil' },
      { id: 'w5c5', name: 'Libros Proféticos', categories: ['profetas', 'libros'], difficulty: 'experto' }
    ]
  },
  {
    id: 'w6',
    name: 'La Vida de Jesús',
    icon: '✝️',
    subtitle: 'El Evangelio del Señor',
    requiredStars: 30,
    chapters: [
      { id: 'w6c1', name: 'El Nacimiento', categories: ['vida_jesus', 'personajes'], difficulty: 'facil' },
      { id: 'w6c2', name: 'Milagros de Jesús', categories: ['vida_jesus', 'milagros'], difficulty: 'facil' },
      { id: 'w6c3', name: 'Las Parábolas', categories: ['vida_jesus', 'parabolas'], difficulty: 'intermedio' },
      { id: 'w6c4', name: 'La Pasión', categories: ['vida_jesus', 'historias'], difficulty: 'intermedio' },
      { id: 'w6c5', name: 'Versículos del Evangelio', categories: ['vida_jesus', 'versiculos'], difficulty: 'dificil' }
    ]
  },
  {
    id: 'w7',
    name: 'La Iglesia Primitiva',
    icon: '⛪',
    subtitle: 'Hechos y Epístolas',
    requiredStars: 36,
    chapters: [
      { id: 'w7c1', name: 'Los Apóstoles', categories: ['cartas', 'ensenanzas'], difficulty: 'intermedio' },
      { id: 'w7c2', name: 'Pablo y la Iglesia', categories: ['cartas', 'personajes'], difficulty: 'intermedio' },
      { id: 'w7c3', name: 'Las Epístolas', categories: ['cartas', 'versiculos'], difficulty: 'dificil' },
      { id: 'w7c4', name: 'Enseñanzas Apostólicas', categories: ['ensenanzas', 'cartas'], difficulty: 'dificil' },
      { id: 'w7c5', name: 'Libros del NT', categories: ['cartas', 'libros'], difficulty: 'experto' }
    ]
  },
  {
    id: 'w8',
    name: 'El Apocalipsis',
    icon: '🌟',
    subtitle: 'El Fin y el Comienzo',
    requiredStars: 42,
    chapters: [
      { id: 'w8c1', name: 'Visiones Proféticas', categories: ['profetas', 'versiculos'], difficulty: 'dificil' },
      { id: 'w8c2', name: 'Los Últimos Libros', categories: ['versiculos', 'libros'], difficulty: 'experto' },
      { id: 'w8c3', name: 'La Tribulación', categories: ['profetas', 'historias'], difficulty: 'experto' },
      { id: 'w8c4', name: 'Personajes del Fin', categories: ['versiculos', 'personajes'], difficulty: 'experto' },
      { id: 'w8c5', name: 'El Trono de Dios', categories: ['profetas', 'versiculos'], difficulty: 'experto' }
    ]
  }
];

export const CAMPAIGN_WORLDS: CampaignWorld[] = WORLDS_BASE.map((w) => ({ ...w, books: WORLD_BOOKS[w.id] ?? [] }));

export const CAMPAIGN_CHAPTERS = new Map(
  CAMPAIGN_WORLDS.flatMap((w, wi) => w.chapters.map((c, ci) => [c.id, { world: w, worldIndex: wi, chapter: c, chapterIndex: ci }] as const))
);

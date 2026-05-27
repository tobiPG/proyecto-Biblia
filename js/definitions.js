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
  personajes: { name: "Personajes", icon: "🧑‍🤝‍🧑", color: "#4CAF50", bigIcon: "👨‍👩‍👧‍👦",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-pers" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#A5D6A7"/><stop offset="100%" stop-color="#1B5E20"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-pers)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><circle cx="20" cy="21" r="7" fill="rgba(0,0,0,0.22)"/><path d="M7 46c0-9 5.8-14 13-14s13 5 13 14z" fill="rgba(0,0,0,0.22)"/><circle cx="38" cy="23" r="5.5" fill="rgba(0,0,0,0.15)"/><path d="M28 46c0-8 5-12 11-12s11 4 11 12z" fill="rgba(0,0,0,0.15)"/><circle cx="19" cy="20" r="7" fill="white"/><path d="M6 45c0-9 5.8-14 13-14s13 5 13 14z" fill="white"/><circle cx="37" cy="22" r="5.5" fill="rgba(255,255,255,0.78)"/><path d="M27 45c0-8 5-12 11-12s11 4 11 12z" fill="rgba(255,255,255,0.78)"/></svg>` },
  libros: { name: "Libros", icon: "📚", color: "#2196F3", bigIcon: "📖",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-lib" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#90CAF9"/><stop offset="100%" stop-color="#0D47A1"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-lib)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><path d="M29 14v30M12 14a3 3 0 0 0-3 3v22a3 3 0 0 0 3 3h17V14z" fill="rgba(0,0,0,0.2)"/><path d="M29 14h17a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H29z" fill="rgba(0,0,0,0.14)"/><path d="M28 13v30M11 13a3 3 0 0 0-3 3v22a3 3 0 0 0 3 3h17V13z" fill="white"/><path d="M28 13h17a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H28z" fill="rgba(255,255,255,0.85)"/><path d="M14 21h11M14 26h11M14 31h8" stroke="rgba(13,71,161,0.28)" stroke-width="2" stroke-linecap="round"/><path d="M31 21h10M31 26h10M31 31h7" stroke="rgba(13,71,161,0.2)" stroke-width="2" stroke-linecap="round"/></svg>` },
  historias: { name: "Historias", icon: "📜", color: "#FF9800", bigIcon: "🎬",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-hist" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#FFCC80"/><stop offset="100%" stop-color="#BF360C"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-hist)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><ellipse cx="29" cy="17" rx="14" ry="4" fill="rgba(0,0,0,0.18)"/><rect x="15" y="17" width="28" height="24" fill="rgba(0,0,0,0.18)"/><ellipse cx="29" cy="41" rx="14" ry="4" fill="rgba(0,0,0,0.18)"/><ellipse cx="28" cy="16" rx="14" ry="4" fill="rgba(255,255,255,0.78)"/><rect x="14" y="16" width="28" height="24" fill="white"/><ellipse cx="28" cy="40" rx="14" ry="4" fill="rgba(255,255,255,0.92)"/><line x1="18" y1="22" x2="38" y2="22" stroke="rgba(191,54,12,0.25)" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="28" x2="38" y2="28" stroke="rgba(191,54,12,0.25)" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="34" x2="30" y2="34" stroke="rgba(191,54,12,0.25)" stroke-width="2" stroke-linecap="round"/></svg>` },
  reyes: { name: "Reyes", icon: "👑", color: "#9C27B0", bigIcon: "👑",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-rey" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#E1BEE7"/><stop offset="100%" stop-color="#4A148C"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-rey)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><path d="M11 39L11 26L20 35L29 17L38 35L47 26L47 39Q28 46 11 39z" fill="rgba(0,0,0,0.28)"/><path d="M10 38L10 25L19 34L28 16L37 34L46 25L46 38Q28 45 10 38z" fill="white"/><path d="M10 38Q28 44 46 38L46 41Q28 47 10 41z" fill="rgba(255,255,255,0.35)"/><circle cx="28" cy="16" r="4" fill="rgba(180,60,220,0.55)"/><circle cx="28" cy="16" r="2.2" fill="rgba(255,255,255,0.95)"/><circle cx="10" cy="25" r="3" fill="rgba(180,60,220,0.5)"/><circle cx="10" cy="25" r="1.6" fill="rgba(255,255,255,0.9)"/><circle cx="46" cy="25" r="3" fill="rgba(180,60,220,0.5)"/><circle cx="46" cy="25" r="1.6" fill="rgba(255,255,255,0.9)"/></svg>` },
  profetas: { name: "Profetas", icon: "🔮", color: "#F44336", bigIcon: "🧙",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-prof" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#FFCDD2"/><stop offset="100%" stop-color="#7F0000"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-prof)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><path d="M28 11v6M28 41v6M11 29h6M41 29h6M16 16l4.2 4.2M37.8 37.8l4.2 4.2M42 16l-4.2 4.2M20.2 37.8l-4.2 4.2" stroke="rgba(0,0,0,0.22)" stroke-width="3" stroke-linecap="round"/><ellipse cx="29" cy="29" rx="9" ry="6" fill="rgba(0,0,0,0.22)"/><path d="M28 10v6M28 40v6M10 28h6M40 28h6M15 15l4.2 4.2M36.8 36.8l4.2 4.2M41 15l-4.2 4.2M19.2 36.8l-4.2 4.2" stroke="white" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="28" cy="28" rx="9" ry="6" fill="white"/><circle cx="28" cy="28" r="4" fill="rgba(127,0,0,0.5)"/><circle cx="28" cy="28" r="2" fill="rgba(60,0,0,0.7)"/><circle cx="26.5" cy="26.5" r="1.3" fill="rgba(255,255,255,0.9)"/></svg>` },
  vida_jesus: { name: "Vida de Jesús", icon: "✝️", color: "#E91E63", bigIcon: "✝️",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-vj" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#F8BBD9"/><stop offset="100%" stop-color="#560027"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-vj)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><rect x="26" y="13" width="8" height="34" rx="3" fill="rgba(0,0,0,0.28)"/><rect x="15" y="20" width="30" height="8" rx="3" fill="rgba(0,0,0,0.28)"/><rect x="24" y="11" width="8" height="34" rx="3" fill="white"/><rect x="13" y="18" width="30" height="8" rx="3" fill="white"/><rect x="24" y="11" width="3.5" height="34" rx="3" fill="rgba(255,255,255,0.4)"/><rect x="13" y="18" width="30" height="3.5" rx="3" fill="rgba(255,255,255,0.4)"/></svg>` },
  milagros: { name: "Milagros", icon: "✨", color: "#00BCD4", bigIcon: "🌟",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-mil" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#B2EBF2"/><stop offset="100%" stop-color="#004D40"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-mil)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><path d="M28 13l3.5 11.5h11.5l-9.3 7.1 3.5 11.4L28 36l-9.2 7.1 3.5-11.4L13 24.5h11.5z" fill="rgba(255,255,255,0.22)" transform="scale(1.12) translate(-3 -3)"/><path d="M29 12l3.5 11.5h11.5l-9.3 7.1 3.5 11.4L29 35l-9.2 7.1 3.5-11.4L14 23.5h11.5z" fill="rgba(0,0,0,0.22)"/><path d="M28 11l3.5 11.5h11.5l-9.3 7.1 3.5 11.4L28 34l-9.2 7.1 3.5-11.4L13 22.5h11.5z" fill="white"/><circle cx="12" cy="13" r="2.5" fill="rgba(255,255,255,0.72)"/><circle cx="44" cy="13" r="2" fill="rgba(255,255,255,0.65)"/><circle cx="43" cy="44" r="1.8" fill="rgba(255,255,255,0.55)"/></svg>` },
  cartas: { name: "Cartas", icon: "💌", color: "#795548", bigIcon: "✉️",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-cart" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#D7CCC8"/><stop offset="100%" stop-color="#3E2723"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-cart)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><rect x="10" y="19" width="38" height="25" rx="4" fill="rgba(0,0,0,0.25)"/><rect x="9" y="17" width="38" height="25" rx="4" fill="white"/><path d="M9 17l19 13.5 19-13.5" stroke="rgba(62,39,35,0.22)" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M9 42l16-10" stroke="rgba(62,39,35,0.1)" stroke-width="1.5" fill="none"/><path d="M47 42l-16-10" stroke="rgba(62,39,35,0.1)" stroke-width="1.5" fill="none"/><circle cx="28" cy="31" r="4.5" fill="rgba(62,39,35,0.1)"/><circle cx="28" cy="31" r="3" fill="rgba(62,39,35,0.16)"/></svg>` },
  lugares: { name: "Lugares", icon: "🗺️", color: "#3F51B5", bigIcon: "🏛️",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-lug" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#9FA8DA"/><stop offset="100%" stop-color="#1A237E"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-lug)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><path d="M29 12c-6.6 0-12 5.4-12 12 0 8.5 12 22 12 22s12-13.5 12-22c0-6.6-5.4-12-12-12z" fill="rgba(0,0,0,0.28)"/><path d="M28 11c-6.6 0-12 5.4-12 12 0 8.5 12 22 12 22s12-13.5 12-22c0-6.6-5.4-12-12-12z" fill="white"/><circle cx="28" cy="23" r="5" fill="rgba(26,35,126,0.45)"/><circle cx="28" cy="23" r="2.5" fill="rgba(26,35,126,0.25)"/><path d="M22 13.5c-2.8 1.5-5 4.5-5 9" stroke="rgba(255,255,255,0.42)" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg>` },
  versiculos: { name: "Versículos", icon: "📖", color: "#8BC34A", bigIcon: "📜",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-ver" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#DCEDC8"/><stop offset="100%" stop-color="#1B5E20"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-ver)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><rect x="11" y="14" width="36" height="30" rx="4" fill="rgba(0,0,0,0.22)"/><rect x="10" y="13" width="36" height="30" rx="4" fill="white"/><rect x="10" y="13" width="7" height="30" rx="2" fill="rgba(139,195,74,0.32)"/><path d="M39 13v17l-4-3-4 3V13z" fill="rgba(139,195,74,0.52)"/><line x1="20" y1="22" x2="37" y2="22" stroke="rgba(27,94,32,0.2)" stroke-width="2" stroke-linecap="round"/><line x1="20" y1="27" x2="37" y2="27" stroke="rgba(27,94,32,0.2)" stroke-width="2" stroke-linecap="round"/><line x1="20" y1="32" x2="30" y2="32" stroke="rgba(27,94,32,0.2)" stroke-width="2" stroke-linecap="round"/><line x1="33" y1="34" x2="33" y2="40" stroke="rgba(139,195,74,0.55)" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="37" x2="36" y2="37" stroke="rgba(139,195,74,0.55)" stroke-width="2" stroke-linecap="round"/></svg>` },
  ensenanzas: { name: "Enseñanzas", icon: "📝", color: "#FF5722", bigIcon: "🕊️",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-ens" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#FFCCBC"/><stop offset="100%" stop-color="#BF360C"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-ens)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><path d="M30 15c-6 0-10 4.5-10 10 0 4 2.2 7.5 5.5 9.2V40h9v-5.8C37.8 32.5 40 29 40 25c0-5.5-4-10-10-10z" fill="rgba(0,0,0,0.22)"/><path d="M28 14c-6 0-10 4.5-10 10 0 4 2.2 7.5 5.5 9.2V38h9v-4.8C35.8 31.5 38 28 38 24c0-5.5-4-10-10-10z" fill="white"/><rect x="23" y="38" width="10" height="3.5" rx="1.8" fill="rgba(255,255,255,0.75)"/><rect x="24" y="41.5" width="8" height="3" rx="1.5" fill="rgba(255,255,255,0.58)"/><path d="M22 19c-2.5 2-4 5-4 8" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" stroke-linecap="round" fill="none"/><line x1="25" y1="29" x2="25" y2="34" stroke="rgba(191,54,12,0.2)" stroke-width="1.5" stroke-linecap="round"/><line x1="28" y1="28" x2="28" y2="34" stroke="rgba(191,54,12,0.2)" stroke-width="1.5" stroke-linecap="round"/><line x1="31" y1="29" x2="31" y2="34" stroke="rgba(191,54,12,0.2)" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  parabolas: { name: "Parábolas", icon: "🌾", color: "#009688", bigIcon: "🌿",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-par" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#B2DFDB"/><stop offset="100%" stop-color="#004D40"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-par)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><path d="M30 47v-31" stroke="rgba(0,0,0,0.2)" stroke-width="3.5" stroke-linecap="round"/><path d="M29 34c-4 0-9-2-10-7 3 0 7 1 10 7z" fill="rgba(0,0,0,0.18)"/><path d="M29 34c4 0 9-2 10-7-3 0-7 1-10 7z" fill="rgba(0,0,0,0.14)"/><path d="M28 46v-30" stroke="white" stroke-width="3" stroke-linecap="round"/><path d="M28 33c-4 0-9-2-10-7 3 0 7 1 10 7z" fill="white"/><path d="M28 33c4 0 9-2 10-7-3 0-7 1-10 7z" fill="rgba(255,255,255,0.85)"/><path d="M28 25c-3-1-8-3-8-8 3 0 6 2 8 8z" fill="rgba(255,255,255,0.75)"/><path d="M28 25c3-1 8-3 8-8-3 0-6 2-8 8z" fill="rgba(255,255,255,0.62)"/><path d="M28 18c-2-1-5-3-5-6 2 0 4 2 5 6z" fill="rgba(255,255,255,0.55)"/><path d="M28 18c2-1 5-3 5-6-2 0-4 2-5 6z" fill="rgba(255,255,255,0.46)"/></svg>` },
  aleatorio: { name: "Aleatorio", icon: "🎲", color: "#607D8B", bigIcon: "🎲",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><defs><radialGradient id="gcat-ale" cx="30%" cy="25%" r="80%"><stop offset="0%" stop-color="#CFD8DC"/><stop offset="100%" stop-color="#263238"/></radialGradient></defs><rect width="56" height="56" rx="14" fill="url(#gcat-ale)"/><path d="M8 6Q28 1 48 6Q52 11 50 18Q46 26 28 24Q10 26 6 18Q4 11 8 6Z" fill="white" fill-opacity="0.28"/><rect x="13" y="13" width="34" height="34" rx="7" fill="rgba(0,0,0,0.3)"/><rect x="11" y="11" width="34" height="34" rx="7" fill="white"/><rect x="11" y="11" width="17" height="17" rx="7" fill="rgba(255,255,255,0.35)"/><circle cx="20" cy="20" r="3.2" fill="rgba(38,50,56,0.55)"/><circle cx="20" cy="20" r="1.4" fill="rgba(255,255,255,0.6)"/><circle cx="36" cy="20" r="3.2" fill="rgba(38,50,56,0.55)"/><circle cx="36" cy="20" r="1.4" fill="rgba(255,255,255,0.6)"/><circle cx="20" cy="36" r="3.2" fill="rgba(38,50,56,0.55)"/><circle cx="20" cy="36" r="1.4" fill="rgba(255,255,255,0.6)"/><circle cx="36" cy="36" r="3.2" fill="rgba(38,50,56,0.55)"/><circle cx="36" cy="36" r="1.4" fill="rgba(255,255,255,0.6)"/><circle cx="28" cy="28" r="3.2" fill="rgba(38,50,56,0.55)"/><circle cx="28" cy="28" r="1.4" fill="rgba(255,255,255,0.6)"/></svg>` },
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
  { id: "first_win", name: "Primera Victoria", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M9 22v-4M15 22v-4M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>`, description: "Responde tu primera pregunta correctamente", condition: (stats) => stats.totalCorrect >= 1 },
  { id: "streak_5", name: "En Racha", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg>`, description: "5 respuestas correctas seguidas", condition: (stats) => stats.bestStreak >= 5 },
  { id: "streak_10", name: "Imparable", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></svg>`, description: "10 respuestas correctas seguidas", condition: (stats) => stats.bestStreak >= 10 },
  { id: "streak_20", name: "Leyenda Bíblica", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9zM2 9h20M12 22V9M6 3 2 9M18 3l4 6"/></svg>`, description: "20 respuestas correctas seguidas", condition: (stats) => stats.bestStreak >= 20 },
  { id: "points_100", name: "Centurión", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`, description: "Alcanza 100 puntos", condition: (stats) => stats.totalPoints >= 100 },
  { id: "points_500", name: "Guerrero de Fe", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/></svg>`, description: "Alcanza 500 puntos", condition: (stats) => stats.totalPoints >= 500 },
  { id: "points_1000", name: "Campeón Bíblico", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20M4 20V9l4 4 4-9 4 9 4-4v11"/></svg>`, description: "Alcanza 1,000 puntos", condition: (stats) => stats.totalPoints >= 1000 },
  { id: "points_5000", name: "Maestro Supremo", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`, description: "Alcanza 5,000 puntos", condition: (stats) => stats.totalPoints >= 5000 },
  { id: "games_10", name: "Fiel Jugador", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`, description: "Juega 10 partidas", condition: (stats) => stats.totalGames >= 10 },
  { id: "games_50", name: "Devoto", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 4.5c0-1 5-1 5 0C14.5 6 13.5 7 12 8S9.5 6 9.5 4.5z"/><rect x="9" y="8" width="6" height="13" rx="1"/><line x1="9" y1="21" x2="15" y2="21"/></svg>`, description: "Juega 50 partidas", condition: (stats) => stats.totalGames >= 50 },
  { id: "perfect_game", name: "Perfección", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`, description: "10/10 en una partida", condition: (stats) => stats.perfectGames >= 1 },
  { id: "all_categories", name: "Explorador", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`, description: "Juega en todas las categorías", condition: (stats) => stats.categoriesPlayed >= 8 },
  { id: "expert_win", name: "Sabio", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>`, description: "Acierta 10 preguntas en nivel Experto", condition: (stats) => stats.expertCorrect >= 10 },
  { id: "total_100", name: "Estudioso", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`, description: "Responde 100 preguntas en total", condition: (stats) => stats.totalAnswered >= 100 },
  { id: "streak_30", name: "Constante", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>`, description: "Racha de 30 días jugando", condition: (stats) => stats.dailyStreak >= 30 },
  { id: "fast_5", name: "Rápido", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6M12 2v2M20.12 7.88l-1.41-1.42"/></svg>`, description: "Responde 5 preguntas en menos de 3 segundos", condition: (stats) => stats.fastAnswers >= 5 },
  { id: "fast_10", name: "Relámpago", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></svg>`, description: "Responde 10 preguntas en menos de 3 segundos", condition: (stats) => stats.fastAnswers >= 10 },
  { id: "category_personajes", name: "Maestro de Personajes", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`, description: "Completa la categoría Personajes", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('personajes') },
  { id: "category_libros", name: "Maestro de Libros", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><line x1="12" y1="5" x2="12" y2="9"/><line x1="10" y1="7" x2="14" y2="7"/></svg>`, description: "Completa la categoría Libros", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('libros') },
  { id: "category_historias", name: "Maestro de Historias", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`, description: "Completa la categoría Historias", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('historias') },
  { id: "category_reyes", name: "Maestro de Reyes", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20M4 20V9l4 4 4-9 4 9 4-4v11"/><circle cx="8" cy="8.5" r="1" fill="currentColor"/><circle cx="12" cy="4" r="1" fill="currentColor"/><circle cx="16" cy="8.5" r="1" fill="currentColor"/></svg>`, description: "Completa la categoría Reyes", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('reyes') },
  { id: "category_profetas", name: "Maestro de Profetas", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`, description: "Completa la categoría Profetas", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('profetas') },
  { id: "category_vida_jesus", name: "Maestro de Jesús", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="5" y1="8" x2="19" y2="8"/></svg>`, description: "Completa la categoría Vida de Jesús", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('vida_jesus') },
  { id: "category_milagros", name: "Maestro de Milagros", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 14.5l-5 3.7 1.9-5.8L4 8.8h6.1z"/><line x1="4.5" y1="3" x2="4.5" y2="5"/><line x1="3" y1="4.5" x2="5" y2="4.5"/><line x1="19.5" y1="19" x2="19.5" y2="21"/><line x1="18" y1="20" x2="21" y2="20"/></svg>`, description: "Completa la categoría Milagros", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('milagros') },
  { id: "category_cartas", name: "Maestro de Cartas", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`, description: "Completa la categoría Cartas", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('cartas') },
  { id: "category_aleatorio", name: "Maestro Aleatorio", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>`, description: "Completa la categoría Aleatorio", condition: (stats) => stats.categoriesCompleted && stats.categoriesCompleted.includes('aleatorio') },
  { id: "super_streak", name: "Racha Legendaria", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>`, description: "Racha de 50 respuestas correctas seguidas", condition: (stats) => stats.bestStreak >= 50 },
  { id: "games_365", name: "Dedicación", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`, description: "Juega 365 días distintos", condition: (stats) => stats.uniqueDaysPlayed >= 365 },
  { id: "lives_0", name: "Sin Margen de Error", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8c-1.5 0-3 1.2-3 2.7 0 2 3 5.3 3 5.3s3-3.3 3-5.3C15 9.2 13.5 8 12 8z"/></svg>`, description: "Gana una partida sin perder vidas", condition: (stats) => stats.gamesNoLivesLost >= 1 },
  { id: "challenge_win", name: "Contrarreloj", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>`, description: "Gana un desafío diario", condition: (stats) => stats.dailyChallengesWon >= 1 },
  { id: "impostor_win", name: "Detective", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`, description: "Gana una partida en modo Impostor", condition: (stats) => stats.impostorWins >= 1 },
  { id: "mission_principiante", name: "Iniciado", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>`, description: "Completa todas las misiones de Principiante", condition: () => false },
  { id: "mission_estudioso", name: "Discípulo", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`, description: "Completa todas las misiones de Estudioso", condition: () => false },
  { id: "mission_guerrero", name: "Guerrero de la Fe", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="21" x2="21" y2="3"/><path d="M17 3h4v4L11 17l-4-4z"/><path d="m9 17-2.5 2.5-1 1.5 1.5-1z"/></svg>`, description: "Completa todas las misiones de Guerrero", condition: () => false },
  { id: "mission_campeon", name: "Campeón Bíblico", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M9 22v-4M15 22v-4M18 2H6v7a6 6 0 0 0 12 0V2z"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/></svg>`, description: "Completa todas las misiones de Campeón", condition: () => false },
  { id: "mission_maestro", name: "Maestro de las Escrituras", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20M4 20V9l4 4 4-9 4 9 4-4v11"/><circle cx="8" cy="8.5" r="1.2" fill="currentColor"/><circle cx="12" cy="4" r="1.2" fill="currentColor"/><circle cx="16" cy="8.5" r="1.2" fill="currentColor"/><line x1="12" y1="20" x2="12" y2="16"/></svg>`, description: "Completa todas las misiones de Maestro", condition: () => false },
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

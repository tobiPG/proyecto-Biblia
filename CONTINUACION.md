# 📋 Notas de Continuación — BibliaQuiz
> Última actualización: 20 Mayo 2026

---

## 🔧 Últimas correcciones realizadas hoy

| Commit | Descripción |
|--------|-------------|
| `3521b4c` | `renderQuestion` ya no destruye `imgEl` entre preguntas → previene crash intermitente |
| `be667cd` | Eliminada pregunta imagen id 2105 (zarza ardiente) por crash |
| `6ec808b` | `question-image-container` faltaba en `index.html`, preguntas con imagen no aparecían |
| `504c66c` | `btn-duo-exit` y `btn-spelling` null crash en `bindEvents` — guardas añadidas |
| `a3d361a` | `API_BASE_URL` global + `btn-achievements` null check corregidos |

---

## 🚨 Pendiente inmediato (retomar aquí)

### 1. Preguntas con imagen
- [ ] Las preguntas de imagen (ids **2101–2104**) funcionan estructuralmente pero necesitan **imágenes reales** en `images/questions/`
- [ ] Hacer inventario de qué preguntas de imagen quedan activas y si alguna sigue causando problemas
- [ ] Añadir mapas bíblicos e ilustraciones de personajes reales

### 2. Sesión de prueba completa
- [ ] Probar **todos los modos** en móvil real: Normal, Contrarreloj, Repaso, 2 Jugadores, Impostor, Deletrear, Duolingo
- [ ] Confirmar que ya no hay crashes en `btn-duo-exit` / `btn-spelling`
- [ ] Verificar que las preguntas con imagen no rompen el flujo del juego

---

## 🟡 Pendiente mediano plazo

### Contenido
- [ ] Expandir banco de preguntas a **3,000+** preguntas
  - Más preguntas de Nuevo Testamento
  - Preguntas sobre versículos específicos
  - Preguntas de cultura bíblica

### UX
- [ ] **Compartir resultados**: botón en pantalla de resultados, Web Share API
  - Compartir por WhatsApp, Facebook, Twitter
  - Generar card/imagen con la puntuación

---

## 🔴 Para producción / Play Store

### Backend / Hosting
| Tarea | Estado |
|-------|--------|
| Frontend en Vercel/Netlify con HTTPS | ⚠️ Configurado — pendiente desplegar |
| MongoDB Atlas → Network Access (0.0.0.0/0) | ⚠️ Pendiente activar en producción |
| `CORS_ORIGIN` configurado en Render con URL real | ⚠️ Pendiente |
| `JWT_SECRET` seguro generado para producción | ⚠️ Pendiente |

### Monetización (requieren cuentas)
| Tarea | Estado |
|-------|--------|
| Cuenta AdMob + IDs reales en `js/ads.js` | ❌ Sin cuenta |
| Cuenta Google Play Developer ($25) | ❌ Sin cuenta |
| Configurar productos in-app en Play Console | ❌ Pendiente cuenta |

### Publicación en Play Store
```
1. [ ] Hosting HTTPS funcionando y probado
2. [ ] Generar APK/AAB con PWABuilder (https://www.pwabuilder.com/)
3. [ ] Preparar assets:
       - Icono 512x512
       - Feature graphic 1024x500
       - Mínimo 2 screenshots
       - Descripción corta (80 chars) y larga (4000 chars)
4. [ ] Configurar AdMob IDs reales
5. [ ] Testing en múltiples dispositivos Android
6. [ ] Subir a Play Console → esperar revisión (1–7 días)
```

---

## 📝 Referencias rápidas

- **Backend URL prod**: `bibliaquiz-api.onrender.com`
- **Repo**: `https://github.com/tobiPG/proyecto-Biblia`
- **Cuenta de prueba**: `o.agg1130@gmail.com` / `1234`
- **Versión actual**: v90+
- **Códigos promo (testing)**: `VIDASINFINITAS`, `BIBLIAQUIZ2026`, `GODMODE`, `PREMIUM30`, `BIENVENIDO`

---

> **Por dónde retomar**: revisar preguntas de imagen activas (ids 2101–2104), sesión de prueba en todos los modos, luego implementar "Compartir resultados".

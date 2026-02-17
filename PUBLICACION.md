# BibliaQuiz - Guía de Publicación

## ✅ Funcionalidades Implementadas

### Sistema de Facturación (billing.js)
- Compras in-app con Google Play Digital Goods API
- Productos configurados:
  - `life_1`: 1 vida extra ($0.99)
  - `life_full`: Vidas completas ($1.99)
  - `premium_monthly`: Premium mensual ($2.99)
  - `premium_yearly`: Premium anual ($19.99)
  - `remove_ads`: Sin anuncios de por vida ($4.99)
- Fallback con Payment Request API para web
- Restaurar compras

### Sistema de Anuncios (ads.js)
- Integración con AdMob (Capacitor/Cordova)
- Tipos: Banner, Interstitial, Rewarded
- Usuarios Premium no ven anuncios
- Fallback para web con anuncios simulados

### Notificaciones Push (notifications.js)
- Recordatorio diario configurable
- Alerta de racha nocturna
- Web Push API con Service Worker
- Soporte para Firebase Cloud Messaging

### Gráfico de Progreso Semanal
- Estadísticas de últimos 7 días
- Precisión por día con color coding
- Leyenda integrada

### Sistema de Versículos Favoritos
- Guardar versículos como favoritos
- Marcar como memorizados
- Compartir versículos individuales
- 73 versículos disponibles

### Compartir Resultados como Imagen
- Genera imagen PNG con Canvas
- Comparte en redes sociales
- Fallback a descarga directa

---

## 📦 Para Publicar en Google Play Store

### 1. Convertir a TWA (Trusted Web Activity)

```bash
# Instalar Bubblewrap
npm install -g @anthropic-ai/anthropic

# O usar Android Studio con TWA template
```

### 2. Configuración de assetlinks.json
Crear archivo `.well-known/assetlinks.json` en tu servidor:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.bibliaquiz.app",
    "sha256_cert_fingerprints": ["TU_FINGERPRINT_SHA256"]
  }
}]
```

### 3. Configurar Google Play Console

1. Crear nueva app en Google Play Console
2. Subir el APK/AAB generado
3. Configurar:
   - Ficha de tienda (descripción, capturas)
   - Clasificación de contenido
   - Países de distribución
   
### 4. Configurar Facturación

En Google Play Console:
1. Monetización > Productos
2. Crear productos gestionados:
   - `life_1` - $0.99
   - `life_full` - $1.99  
   - `premium_monthly` - $2.99 (suscripción)
   - `premium_yearly` - $19.99 (suscripción)
   - `remove_ads` - $4.99

### 5. Configurar AdMob

1. Crear cuenta en [AdMob](https://admob.google.com)
2. Crear nueva app Android
3. Obtener App ID y Ad Unit IDs
4. Actualizar `ads.js`:

```javascript
config: {
  appId: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',
  interstitialId: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  rewardedId: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  bannerId: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  testMode: false
}
```

### 6. Configurar Firebase para Push (Opcional)

1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Obtener VAPID key
3. Actualizar `notifications.js`:

```javascript
config: {
  vapidPublicKey: 'TU_VAPID_KEY_AQUI'
}
```

---

## 📱 Para Publicar en App Store (iOS)

### 1. Usar Capacitor

```bash
npm install -g @capacitor/cli
npx cap init BibliaQuiz com.bibliaquiz.app
npx cap add ios
npx cap sync
```

### 2. Abrir en Xcode

```bash
npx cap open ios
```

### 3. Configurar en App Store Connect

- Crear nueva app
- Configurar StoreKit para compras in-app
- Subir build desde Xcode

---

## 🔧 Checklist Pre-Publicación

- [ ] Probar todas las compras en modo sandbox
- [ ] Verificar que anuncios se muestran correctamente
- [ ] Probar notificaciones en dispositivo real
- [ ] Revisar política de privacidad
- [ ] Crear capturas de pantalla para la tienda
- [ ] Preparar descripción y keywords
- [ ] Verificar clasificación de contenido
- [ ] Probar en múltiples dispositivos/tamaños
- [ ] Validar offline functionality
- [ ] Revisar rendimiento (Lighthouse audit)

---

## 📋 Recursos Necesarios

### Capturas de Pantalla
- Teléfono: 1080x1920 o 1440x2560
- Tablet 7": 1200x1920
- Tablet 10": 1600x2560

### Descripción Corta (80 chars)
"Aprende la Biblia jugando con más de 1600 preguntas en 8 categorías"

### Descripción Larga
```
📖 BibliaQuiz - ¡Aprende la Biblia Jugando!

¿Cuánto sabes de la Biblia? Pon a prueba tu conocimiento con más de 1,600 preguntas bíblicas organizadas en 8 categorías y 4 niveles de dificultad.

✨ CARACTERÍSTICAS:
• 1,600+ preguntas bíblicas
• 8 categorías: Personajes, Libros, Historias, Reyes, Profetas, Vida de Jesús, Milagros y Cartas
• 4 niveles de dificultad
• 5 modos de juego: Normal, Contrarreloj, Repaso, 2 Jugadores e Impostor
• 31 insignias por desbloquear
• Desafío diario
• Versículos para memorizar
• Funciona sin conexión
• Progreso guardado localmente
• Sin anuncios intrusivos (opción Premium)

🎮 MODOS DE JUEGO:
• Normal: Juega a tu ritmo
• Contrarreloj: ¡Responde rápido!
• Repaso: Practica lo que fallaste
• 2 Jugadores: Compite con amigos
• Impostor: Identifica la respuesta falsa

📊 SIGUE TU PROGRESO:
• Estadísticas detalladas
• Gráfico semanal
• Sistema de niveles y XP
• Racha diaria

¡Descarga ahora y conviértete en un experto bíblico!
```

### Keywords
biblia, quiz, trivia, cristiano, preguntas, juego, religión, fe, aprender, educación

---

## 🔐 Política de Privacidad

La app ya incluye una política de privacidad accesible desde Configuración > Privacidad. Asegúrate de que la URL de la política esté disponible públicamente para las tiendas.

---

## 📞 Soporte

Email: [TU_EMAIL]
Website: [TU_WEBSITE]

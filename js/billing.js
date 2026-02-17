// ============================================================
// BibliaQuiz - Sistema de Facturación / In-App Purchases
// ============================================================

const Billing = {
  // === PRODUCTOS DISPONIBLES ===
  PRODUCTS: {
    // Consumibles (se pueden comprar múltiples veces)
    'life_1': {
      id: 'life_1',
      name: '+1 Vida',
      description: 'Recupera una vida al instante',
      price: 0.99,
      currency: 'USD',
      type: 'consumable',
      icon: '💖'
    },
    'life_full': {
      id: 'life_full',
      name: 'Vidas Completas',
      description: 'Rellena todas tus vidas al máximo',
      price: 1.99,
      currency: 'USD',
      type: 'consumable',
      icon: '💕'
    },
    // Suscripción / No consumible
    'premium_monthly': {
      id: 'premium_monthly',
      name: 'Premium Mensual',
      description: 'Vidas infinitas + Sin anuncios',
      price: 2.99,
      currency: 'USD',
      type: 'subscription',
      period: 'monthly',
      icon: '👑'
    },
    'premium_yearly': {
      id: 'premium_yearly',
      name: 'Premium Anual',
      description: 'Vidas infinitas + Sin anuncios (ahorra 40%)',
      price: 19.99,
      currency: 'USD',
      type: 'subscription',
      period: 'yearly',
      icon: '💎'
    },
    'remove_ads': {
      id: 'remove_ads',
      name: 'Quitar Anuncios',
      description: 'Elimina los anuncios para siempre',
      price: 4.99,
      currency: 'USD',
      type: 'non-consumable',
      icon: '🚫'
    }
  },

  // === ESTADO ===
  initialized: false,
  platform: 'web', // 'web', 'android', 'ios'
  purchases: [],
  isPremium: false,
  adsRemoved: false,

  // === KEYS DE ALMACENAMIENTO ===
  STORAGE_KEYS: {
    PURCHASES: 'bibliaquiz_purchases',
    PREMIUM: 'bibliaquiz_premium',
    ADS_REMOVED: 'bibliaquiz_ads_removed',
    PREMIUM_EXPIRY: 'bibliaquiz_premium_expiry'
  },

  // === INICIALIZACIÓN ===
  async init() {
    if (this.initialized) return;
    
    console.log('[Billing] Inicializando sistema de facturación...');
    
    // Detectar plataforma
    this.detectPlatform();
    
    // Cargar compras guardadas
    this.loadPurchases();
    
    // Verificar estado premium
    this.checkPremiumStatus();
    
    // Inicializar según plataforma
    if (this.platform === 'android') {
      await this.initGooglePlayBilling();
    } else if (this.platform === 'ios') {
      await this.initAppleIAP();
    }
    
    this.initialized = true;
    console.log('[Billing] Sistema inicializado. Premium:', this.isPremium, 'Sin anuncios:', this.adsRemoved);
  },

  detectPlatform() {
    const ua = navigator.userAgent.toLowerCase();
    
    // Detectar si está en TWA (Trusted Web Activity)
    if (window.matchMedia('(display-mode: standalone)').matches && 
        /android/i.test(ua) && 
        document.referrer.includes('android-app://')) {
      this.platform = 'android';
    }
    // Detectar iOS standalone
    else if (window.navigator.standalone === true) {
      this.platform = 'ios';
    }
    // Web normal
    else {
      this.platform = 'web';
    }
    
    console.log('[Billing] Plataforma detectada:', this.platform);
  },

  // === GOOGLE PLAY BILLING (para TWA) ===
  async initGooglePlayBilling() {
    // Digital Goods API para TWA
    if ('getDigitalGoodsService' in window) {
      try {
        this.digitalGoodsService = await window.getDigitalGoodsService('https://play.google.com/billing');
        console.log('[Billing] Google Play Billing inicializado');
        
        // Verificar compras existentes
        await this.restorePurchases();
      } catch (e) {
        console.warn('[Billing] No se pudo conectar a Google Play Billing:', e);
      }
    }
  },

  // === APPLE IAP (placeholder para futuro) ===
  async initAppleIAP() {
    console.log('[Billing] Apple IAP no implementado aún');
  },

  // === CARGAR/GUARDAR COMPRAS ===
  loadPurchases() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEYS.PURCHASES);
      this.purchases = saved ? JSON.parse(saved) : [];
      
      this.isPremium = localStorage.getItem(this.STORAGE_KEYS.PREMIUM) === 'true';
      this.adsRemoved = localStorage.getItem(this.STORAGE_KEYS.ADS_REMOVED) === 'true';
      
      // Verificar expiración de premium
      const expiry = localStorage.getItem(this.STORAGE_KEYS.PREMIUM_EXPIRY);
      if (expiry && new Date(expiry) < new Date()) {
        this.isPremium = false;
        localStorage.setItem(this.STORAGE_KEYS.PREMIUM, 'false');
      }
    } catch (e) {
      console.error('[Billing] Error cargando compras:', e);
      this.purchases = [];
    }
  },

  savePurchases() {
    try {
      localStorage.setItem(this.STORAGE_KEYS.PURCHASES, JSON.stringify(this.purchases));
      localStorage.setItem(this.STORAGE_KEYS.PREMIUM, this.isPremium ? 'true' : 'false');
      localStorage.setItem(this.STORAGE_KEYS.ADS_REMOVED, this.adsRemoved ? 'true' : 'false');
    } catch (e) {
      console.error('[Billing] Error guardando compras:', e);
    }
  },

  // === VERIFICAR ESTADO PREMIUM ===
  checkPremiumStatus() {
    // Verificar si tiene suscripción activa
    const premiumPurchase = this.purchases.find(p => 
      (p.productId === 'premium_monthly' || p.productId === 'premium_yearly') &&
      p.status === 'active'
    );
    
    if (premiumPurchase) {
      const expiry = new Date(premiumPurchase.expiryDate);
      if (expiry > new Date()) {
        this.isPremium = true;
        this.adsRemoved = true;
      } else {
        this.isPremium = false;
        premiumPurchase.status = 'expired';
      }
    }
    
    // Verificar compra de quitar anuncios
    const adsPurchase = this.purchases.find(p => 
      p.productId === 'remove_ads' && p.status === 'completed'
    );
    if (adsPurchase) {
      this.adsRemoved = true;
    }
    
    this.savePurchases();
  },

  // === RESTAURAR COMPRAS ===
  async restorePurchases() {
    if (this.platform === 'android' && this.digitalGoodsService) {
      try {
        const existingPurchases = await this.digitalGoodsService.listPurchases();
        
        for (const purchase of existingPurchases) {
          const existing = this.purchases.find(p => p.token === purchase.purchaseToken);
          if (!existing) {
            this.processPurchase(purchase);
          }
        }
        
        console.log('[Billing] Compras restauradas:', existingPurchases.length);
      } catch (e) {
        console.error('[Billing] Error restaurando compras:', e);
      }
    }
    
    return this.purchases;
  },

  // === OBTENER PRECIO FORMATEADO ===
  getFormattedPrice(productId) {
    const product = this.PRODUCTS[productId];
    if (!product) return '';
    
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: product.currency
    }).format(product.price);
  },

  // === COMPRAR PRODUCTO ===
  async purchase(productId) {
    const product = this.PRODUCTS[productId];
    if (!product) {
      console.error('[Billing] Producto no encontrado:', productId);
      return { success: false, error: 'Producto no encontrado' };
    }

    console.log('[Billing] Iniciando compra:', product.name);

    // Android con Digital Goods API
    if (this.platform === 'android' && this.digitalGoodsService) {
      return await this.purchaseAndroid(productId);
    }
    
    // Web - mostrar opciones de pago
    return await this.purchaseWeb(productId);
  },

  // === COMPRA ANDROID (Google Play) ===
  async purchaseAndroid(productId) {
    const product = this.PRODUCTS[productId];
    
    try {
      // Obtener detalles del producto de Google Play
      const details = await this.digitalGoodsService.getDetails([productId]);
      
      if (!details || details.length === 0) {
        throw new Error('Producto no disponible en Play Store');
      }

      // Crear Payment Request
      const paymentMethod = {
        supportedMethods: 'https://play.google.com/billing',
        data: {
          sku: productId
        }
      };

      const paymentDetails = {
        total: {
          label: product.name,
          amount: { currency: product.currency, value: product.price.toString() }
        }
      };

      const request = new PaymentRequest([paymentMethod], paymentDetails);
      const response = await request.show();

      // Procesar respuesta
      const { purchaseToken } = response.details;
      
      // Confirmar compra
      await this.digitalGoodsService.acknowledge(purchaseToken, product.type === 'consumable' ? 'consume' : 'acknowledge');
      
      await response.complete('success');

      // Registrar compra
      const purchaseRecord = {
        productId,
        token: purchaseToken,
        date: new Date().toISOString(),
        status: 'completed',
        platform: 'android'
      };

      if (product.type === 'subscription') {
        purchaseRecord.expiryDate = this.calculateExpiryDate(product.period);
        purchaseRecord.status = 'active';
      }

      this.processPurchase(purchaseRecord);

      return { success: true, purchase: purchaseRecord };

    } catch (e) {
      console.error('[Billing] Error en compra Android:', e);
      return { success: false, error: e.message };
    }
  },

  // === COMPRA WEB (Stripe/PayPal/Simulación) ===
  async purchaseWeb(productId) {
    const product = this.PRODUCTS[productId];
    
    // Por ahora, mostrar modal de pago simulado
    // En producción, aquí se integraría Stripe, PayPal, etc.
    
    return new Promise((resolve) => {
      this.showPaymentModal(product, (result) => {
        if (result.success) {
          const purchaseRecord = {
            productId,
            token: 'web_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString(),
            status: 'completed',
            platform: 'web'
          };

          if (product.type === 'subscription') {
            purchaseRecord.expiryDate = this.calculateExpiryDate(product.period);
            purchaseRecord.status = 'active';
          }

          this.processPurchase(purchaseRecord);
          resolve({ success: true, purchase: purchaseRecord });
        } else {
          resolve({ success: false, error: result.error || 'Compra cancelada' });
        }
      });
    });
  },

  // === PROCESAR COMPRA ===
  processPurchase(purchase) {
    // Agregar a la lista
    this.purchases.push(purchase);
    
    // Aplicar beneficios según el producto
    const product = this.PRODUCTS[purchase.productId];
    
    if (product) {
      switch (purchase.productId) {
        case 'life_1':
          // Se maneja en app.js
          break;
        case 'life_full':
          // Se maneja en app.js
          break;
        case 'premium_monthly':
        case 'premium_yearly':
          this.isPremium = true;
          this.adsRemoved = true;
          localStorage.setItem(this.STORAGE_KEYS.PREMIUM_EXPIRY, purchase.expiryDate);
          break;
        case 'remove_ads':
          this.adsRemoved = true;
          break;
      }
    }
    
    this.savePurchases();
    
    // Disparar evento
    window.dispatchEvent(new CustomEvent('billing:purchase', { detail: purchase }));
  },

  // === CALCULAR FECHA DE EXPIRACIÓN ===
  calculateExpiryDate(period) {
    const now = new Date();
    switch (period) {
      case 'monthly':
        now.setMonth(now.getMonth() + 1);
        break;
      case 'yearly':
        now.setFullYear(now.getFullYear() + 1);
        break;
      case 'weekly':
        now.setDate(now.getDate() + 7);
        break;
    }
    return now.toISOString();
  },

  // === MODAL DE PAGO WEB ===
  showPaymentModal(product, callback) {
    // Crear modal
    const overlay = document.createElement('div');
    overlay.className = 'billing-modal-overlay';
    overlay.id = 'billing-modal';
    
    const modal = document.createElement('div');
    modal.className = 'billing-modal';
    
    modal.innerHTML = `
      <div class="billing-modal-header">
        <div class="billing-modal-icon">${product.icon}</div>
        <h2 class="billing-modal-title">${product.name}</h2>
        <p class="billing-modal-desc">${product.description}</p>
      </div>
      
      <div class="billing-modal-price">
        <span class="billing-price-amount">${this.getFormattedPrice(product.id)}</span>
        ${product.type === 'subscription' ? `<span class="billing-price-period">/${product.period === 'monthly' ? 'mes' : 'año'}</span>` : ''}
      </div>
      
      <div class="billing-modal-features">
        ${product.id.includes('premium') ? `
          <div class="billing-feature">✓ Vidas infinitas</div>
          <div class="billing-feature">✓ Sin anuncios</div>
          <div class="billing-feature">✓ Cancela cuando quieras</div>
        ` : product.id === 'remove_ads' ? `
          <div class="billing-feature">✓ Sin anuncios para siempre</div>
          <div class="billing-feature">✓ Pago único</div>
        ` : `
          <div class="billing-feature">✓ Se aplica al instante</div>
        `}
      </div>
      
      <div class="billing-modal-methods">
        <p class="billing-methods-title">Método de pago:</p>
        <div class="billing-methods-grid">
          <button class="billing-method-btn" data-method="card">
            💳 Tarjeta
          </button>
          <button class="billing-method-btn" data-method="paypal">
            🅿️ PayPal
          </button>
        </div>
      </div>
      
      <div class="billing-modal-actions">
        <button class="billing-btn-cancel" id="billing-cancel">Cancelar</button>
        <button class="billing-btn-confirm" id="billing-confirm" disabled>Confirmar Pago</button>
      </div>
      
      <p class="billing-modal-secure">🔒 Pago seguro y encriptado</p>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Animación de entrada
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });
    
    // Event listeners
    let selectedMethod = null;
    
    modal.querySelectorAll('.billing-method-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.billing-method-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedMethod = btn.dataset.method;
        document.getElementById('billing-confirm').disabled = false;
      });
    });
    
    document.getElementById('billing-cancel').addEventListener('click', () => {
      this.closePaymentModal(overlay);
      callback({ success: false, error: 'cancelled' });
    });
    
    document.getElementById('billing-confirm').addEventListener('click', () => {
      // Simular procesamiento de pago
      const confirmBtn = document.getElementById('billing-confirm');
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = '<span class="billing-spinner"></span> Procesando...';
      
      // Simular delay de pago
      setTimeout(() => {
        this.closePaymentModal(overlay);
        callback({ success: true, method: selectedMethod });
      }, 1500);
    });
    
    // Cerrar con ESC
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        this.closePaymentModal(overlay);
        callback({ success: false, error: 'cancelled' });
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  },

  closePaymentModal(overlay) {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.remove();
    }, 300);
  },

  // === VERIFICAR SI PUEDE MOSTRAR ANUNCIOS ===
  canShowAds() {
    return !this.isPremium && !this.adsRemoved;
  },

  // === OBTENER DÍAS RESTANTES DE PREMIUM ===
  getPremiumDaysRemaining() {
    const expiry = localStorage.getItem(this.STORAGE_KEYS.PREMIUM_EXPIRY);
    if (!expiry) return 0;
    
    const expiryDate = new Date(expiry);
    const now = new Date();
    const diff = expiryDate - now;
    
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  },

  // === CANCELAR SUSCRIPCIÓN ===
  async cancelSubscription() {
    // En producción, esto llamaría al backend para cancelar
    // Por ahora, solo marca como cancelada localmente
    const activeSub = this.purchases.find(p => 
      (p.productId === 'premium_monthly' || p.productId === 'premium_yearly') &&
      p.status === 'active'
    );
    
    if (activeSub) {
      activeSub.status = 'cancelled';
      activeSub.cancelDate = new Date().toISOString();
      this.savePurchases();
      
      return { success: true, message: 'Suscripción cancelada. Seguirás teniendo acceso hasta ' + new Date(activeSub.expiryDate).toLocaleDateString() };
    }
    
    return { success: false, error: 'No hay suscripción activa' };
  },

  // === OBTENER HISTORIAL DE COMPRAS ===
  getPurchaseHistory() {
    return this.purchases.map(p => ({
      ...p,
      product: this.PRODUCTS[p.productId]
    }));
  },

  // === RESET (para desarrollo) ===
  resetAllPurchases() {
    this.purchases = [];
    this.isPremium = false;
    this.adsRemoved = false;
    localStorage.removeItem(this.STORAGE_KEYS.PURCHASES);
    localStorage.removeItem(this.STORAGE_KEYS.PREMIUM);
    localStorage.removeItem(this.STORAGE_KEYS.ADS_REMOVED);
    localStorage.removeItem(this.STORAGE_KEYS.PREMIUM_EXPIRY);
    console.log('[Billing] Todas las compras han sido reseteadas');
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  Billing.init();
});

console.log('[BibliaQuiz] Módulo de facturación cargado');

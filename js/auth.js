// ============================================================
// Sistema de Autenticación - Email/Password
// BibliaQuiz
// ============================================================

let authViewMode = 'login'; // 'login' o 'register'

document.addEventListener('DOMContentLoaded', () => {
  setupAuthEventListeners();
  checkAuthStatus();
});

function setupAuthEventListeners() {
  // Modal de login
  const btnShowLogin = document.getElementById('btn-quick-signin');
  const loginPromptBanner = document.getElementById('login-prompt-banner');
  const btnCloseLogin = document.getElementById('btn-close-login');
  
  // Formulario de login
  const btnLogin = document.getElementById('btn-login');
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  
  // Formulario de registro
  const btnRegister = document.getElementById('btn-register');
  const registerEmail = document.getElementById('register-email');
  const registerPassword = document.getElementById('register-password');
  const registerName = document.getElementById('register-name');
  
  // Toggle entre login y registro
  const btnToggleForm = document.getElementById('btn-toggle-form');
  const toggleFormText = document.getElementById('toggle-form-text');
  
  // Botones de perfil
  const btnChangePassword = document.getElementById('btn-change-password');
  const btnLogout = document.getElementById('btn-logout');
  
  // Mostrar modal de login cuando hace click
  if (btnShowLogin) {
    btnShowLogin.addEventListener('click', () => {
      if (loginPromptBanner) {
        loginPromptBanner.classList.remove('hidden');
        authViewMode = 'login';
        updateAuthUI();
      }
    });
  }
  
  // Cerrar modal
  if (btnCloseLogin) {
    btnCloseLogin.addEventListener('click', () => {
      if (loginPromptBanner) {
        loginPromptBanner.classList.add('hidden');
      }
    });
  }
  
  // Cerrar al hacer click fuera
  if (loginPromptBanner) {
    loginPromptBanner.addEventListener('click', (e) => {
      if (e.target === loginPromptBanner) {
        loginPromptBanner.classList.add('hidden');
      }
    });
  }
  
  // Evento de login
  if (btnLogin) {
    btnLogin.addEventListener('click', async () => {
      const email = loginEmail?.value.trim();
      const password = loginPassword?.value.trim();
      
      if (!email || !password) {
        showAuthError('Ingresa email y contraseña');
        return;
      }
      
      await performLogin(email, password);
    });
  }
  
  // Permitir login con ENTER
  if (loginEmail) {
    loginEmail.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') btnLogin?.click();
    });
  }
  if (loginPassword) {
    loginPassword.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') btnLogin?.click();
    });
  }
  
  // Evento de registro
  if (btnRegister) {
    btnRegister.addEventListener('click', async () => {
      const email = registerEmail?.value.trim();
      const password = registerPassword?.value.trim();
      const name = registerName?.value.trim();
      
      if (!email || !password) {
        showAuthError('Email y contraseña son requeridos');
        return;
      }
      
      if (password.length < 6) {
        showAuthError('La contraseña debe tener al menos 6 caracteres');
        return;
      }
      
      await performRegister(email, password, name);
    });
  }
  
  // Permitir registro con ENTER
  if (registerPassword) {
    registerPassword.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') btnRegister?.click();
    });
  }
  if (registerName) {
    registerName.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') btnRegister?.click();
    });
  }
  
  // Toggle entre vistas
  if (btnToggleForm) {
    btnToggleForm.addEventListener('click', () => {
      authViewMode = authViewMode === 'login' ? 'register' : 'login';
      updateAuthUI();
      clearAuthForm();
      clearAuthError();
    });
  }
  
  // Cambiar contraseña (en perfil - Social)
  if (btnChangePassword) {
    btnChangePassword.addEventListener('click', showChangePasswordModal);
  }
  
  // Logout (en perfil - Social)
  if (btnLogout) {
    btnLogout.addEventListener('click', performLogout);
  }
  
  // 🆕 Botones de cuenta en Configuración - usando event delegation para mayor confiabilidad
  const btnChangePasswordSettings = document.getElementById('btn-change-password-settings');
  const btnLogoutSettings = document.getElementById('btn-logout-settings');
  const btnGoSettings = document.getElementById('btn-go-settings');
  
  if (btnChangePasswordSettings) {
    btnChangePasswordSettings.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('[Auth] Cambiar contraseña clicked');
      showChangePasswordModal();
    });
  }
  
  if (btnLogoutSettings) {
    btnLogoutSettings.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('[Auth] Cerrar sesión clicked');
      performLogout();
    });
  }
  
  // Botón en Social para ir a Configuración
  if (btnGoSettings) {
    btnGoSettings.addEventListener('click', () => {
      document.getElementById('social-screen')?.classList.add('hidden');
      if (typeof App !== 'undefined' && App.showScreen) {
        App.showScreen('settings');
      }
    });
  }
  
  // Event delegation como respaldo para los botones de cuenta
  document.addEventListener('click', (e) => {
    if (e.target.id === 'btn-change-password-settings' || e.target.closest('#btn-change-password-settings')) {
      e.preventDefault();
      console.log('[Auth] Cambiar contraseña (delegation)');
      showChangePasswordModal();
    }
    if (e.target.id === 'btn-logout-settings' || e.target.closest('#btn-logout-settings')) {
      e.preventDefault();
      console.log('[Auth] Cerrar sesión (delegation)');
      performLogout();
    }
  });
}

function updateAuthUI() {
  const loginForm = document.getElementById('login-form-container');
  const registerForm = document.getElementById('register-form-container');
  const toggleText = document.getElementById('toggle-form-text');
  const toggleBtn = document.getElementById('btn-toggle-form');
  
  if (authViewMode === 'login') {
    loginForm?.classList.remove('hidden');
    registerForm?.classList.add('hidden');
    if (toggleText) toggleText.textContent = '¿No tienes cuenta?';
    if (toggleBtn) toggleBtn.textContent = 'Registrarse';
  } else {
    loginForm?.classList.add('hidden');
    registerForm?.classList.remove('hidden');
    if (toggleText) toggleText.textContent = '¿Ya tienes cuenta?';
    if (toggleBtn) toggleBtn.textContent = 'Iniciar sesión';
  }
}

function clearAuthForm() {
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('register-email').value = '';
  document.getElementById('register-password').value = '';
  document.getElementById('register-name').value = '';
}

async function performLogin(email, password) {
  try {
    const btnLogin = document.getElementById('btn-login');
    const originalText = btnLogin.textContent;
    btnLogin.textContent = '⏳ Iniciando...';
    btnLogin.disabled = true;
    
    const result = await BackendService.login(email, password);
    
    if (result.success) {
      showAuthSuccess('¡Sesión iniciada correctamente!');
      document.getElementById('login-prompt-banner').classList.add('hidden');
      clearAuthForm();
      
      // Actualizar UI del perfil
      updateProfileUI();
      
      // Esperar un poco y recargar progreso
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      showAuthError(result.error || 'Error iniciando sesión');
    }
    
    btnLogin.textContent = originalText;
    btnLogin.disabled = false;
  } catch (error) {
    console.error('Error en login:', error);
    showAuthError('Error al conectar. Intenta de nuevo.');
    document.getElementById('btn-login').disabled = false;
  }
}

async function performRegister(email, password, displayName) {
  try {
    const btnRegister = document.getElementById('btn-register');
    const originalText = btnRegister.textContent;
    btnRegister.textContent = '⏳ Creando...';
    btnRegister.disabled = true;
    
    const result = await BackendService.register(email, password, displayName);
    
    if (result.success) {
      showAuthSuccess('¡Cuenta creada correctamente!');
      document.getElementById('login-prompt-banner').classList.add('hidden');
      clearAuthForm();
      
      // Actualizar UI del perfil
      updateProfileUI();
      
      // Esperar un poco y recargar
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      showAuthError(result.error || 'Error creando cuenta');
    }
    
    btnRegister.textContent = originalText;
    btnRegister.disabled = false;
  } catch (error) {
    console.error('Error en registro:', error);
    showAuthError('Error al conectar. Intenta de nuevo.');
    document.getElementById('btn-register').disabled = false;
  }
}

async function performLogout() {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    try {
      await BackendService.logout();
      localStorage.clear(); // Limpiar datos locales
      location.reload();
    } catch (error) {
      console.error('Error en logout:', error);
      alert('Error al cerrar sesión');
    }
  }
}

function showChangePasswordModal() {
  const modal = document.createElement('div');
  modal.className = 'password-change-modal';
  modal.innerHTML = `
    <h3 class="password-modal-title">🔐 Cambiar contraseña</h3>
    <input type="password" id="current-password" class="password-modal-input" placeholder="Contraseña actual" />
    <input type="password" id="new-password" class="password-modal-input" placeholder="Nueva contraseña" />
    <input type="password" id="confirm-password" class="password-modal-input" placeholder="Confirmar contraseña" />
    <div id="password-modal-error" class="password-modal-error"></div>
    <div class="password-modal-buttons">
      <button id="btn-confirm-password" class="btn-confirm-password">Cambiar</button>
      <button id="btn-cancel-password" class="btn-cancel-password">Cancelar</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.classList.remove('hidden');
  
  document.getElementById('btn-cancel-password').addEventListener('click', () => {
    modal.remove();
  });
  
  document.getElementById('btn-confirm-password').addEventListener('click', async () => {
    const currentPwd = document.getElementById('current-password').value;
    const newPwd = document.getElementById('new-password').value;
    const confirmPwd = document.getElementById('confirm-password').value;
    
    if (!currentPwd || !newPwd || !confirmPwd) {
      showPasswordError(modal, 'Completa todos los campos');
      return;
    }
    
    if (newPwd !== confirmPwd) {
      showPasswordError(modal, 'Las nuevas contraseñas no coinciden');
      return;
    }
    
    if (newPwd.length < 6) {
      showPasswordError(modal, 'La contraseña debe tener al least 6 caracteres');
      return;
    }
    
    try {
      const result = await BackendService.changePassword(currentPwd, newPwd);
      
      if (result.success) {
        alert('✅ Contraseña cambiada correctamente');
        modal.remove();
      } else {
        showPasswordError(modal, result.error || 'Error cambiando contraseña');
      }
    } catch (error) {
      showPasswordError(modal, 'Error al conectar');
    }
  });
}

function showPasswordError(modal, message) {
  const errorDiv = document.getElementById('password-modal-error');
  errorDiv.textContent = message;
  errorDiv.classList.add('show');
}

function showAuthError(message) {
  const errorDiv = document.getElementById('login-error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
  }
}

function clearAuthError() {
  const errorDiv = document.getElementById('login-error');
  if (errorDiv) {
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';
  }
}

function showAuthSuccess(message) {
  if (typeof App !== 'undefined' && App.showToast) {
    App.showToast(message);
  } else {
    alert(message);
  }
}

function checkAuthStatus() {
  // PROTECCIÓN: Solo permitir acceso si está logueado
  const isLoggedIn = !!BackendService.token && !BackendService.currentUser?.isAnonymous;
  
  const mainContent = document.getElementById('main-content');
  const loginBanner = document.getElementById('login-prompt-banner');
  
  // Si NO está logueado: mostrar solo login
  if (!isLoggedIn) {
    if (mainContent) mainContent.style.display = 'none';
    if (loginBanner) {
      loginBanner.classList.remove('hidden');
      loginBanner.style.position = 'fixed';
      loginBanner.style.zIndex = '9999';
    }
  } else {
    // Si está logueado: mostrar contenido
    if (mainContent) mainContent.style.display = 'block';
    if (loginBanner) {
      loginBanner.classList.add('hidden');
      loginBanner.style.position = 'fixed';
    }
  }
  
  // Mostrar/ocultar botones de perfil
  const btnChangePassword = document.getElementById('btn-change-password');
  const btnLogout = document.getElementById('btn-logout');
  
  if (btnChangePassword) btnChangePassword.style.display = isLoggedIn ? 'block' : 'none';
  if (btnLogout) btnLogout.style.display = isLoggedIn ? 'block' : 'none';
}

function updateProfileUI() {
  const isLoggedIn = !!BackendService.token && !BackendService.currentUser?.isAnonymous;
  
  // Actualizar visibilidad de contenido
  const mainContent = document.getElementById('main-content');
  if (!isLoggedIn) {
    if (mainContent) mainContent.style.display = 'none';
  } else {
    if (mainContent) mainContent.style.display = 'block';
  }
  
  // Mostrar/ocultar botones
  const btnChangePassword = document.getElementById('btn-change-password');
  const btnLogout = document.getElementById('btn-logout');
  
  if (btnChangePassword) btnChangePassword.style.display = isLoggedIn ? 'block' : 'none';
  if (btnLogout) btnLogout.style.display = isLoggedIn ? 'block' : 'none';
}

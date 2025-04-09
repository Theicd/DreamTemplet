// api-modal.js - ניהול חלון הזנת מפתח API

import { showUserMessage } from './user-messages.js';

let apiKey = '';

// הצגת חלון הזנת מפתח API
function openApiModal() {
  const modal = document.getElementById('apiModal');
  modal.innerHTML = `
    <div class="welcome-header">
      <h3><i class="fas fa-key"></i> הזן מפתח API <i class="fas fa-key"></i></h3>
      <button class="close-btn" onclick="closeApiModal()">×</button>
    </div>
    <div class="welcome-content">
      <p class="welcome-text">הזן את מפתח ה-API של OpenAI כדי להשתמש בשירות</p>
      
      <div class="api-input-container">
        <input type="text" id="apiKeyInput" placeholder="מפתח API של OpenAI">
      </div>
      
      <div class="divider"><span></span></div>
      
      <div class="pricing-container">
        <div class="pricing-badge">
          <div class="badge-content">
            <span class="badge-title">מחיר</span>
            <span class="badge-price">₪5</span>
          </div>
        </div>
        <div class="pricing-options">
          <div class="pricing-option"><i class="fas fa-check"></i> מפתח API לשימוש חד פעמי</div>
          <div class="pricing-option highlight"><i class="fas fa-check"></i> תמיכה בכל סוגי העסקים</div>
        </div>
      </div>
    </div>
    
    <div class="welcome-footer">
      <button class="glow-button" onclick="saveApiKey()">שמור</button>
      <button class="glow-button secondary" onclick="openPaymentModal()">קנה מפתח</button>
    </div>
  `;
  modal.style.display = 'block';
  gsap.fromTo(modal, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
}

// סגירת חלון הזנת מפתח API
function closeApiModal() {
  const modal = document.getElementById('apiModal');
  gsap.to(modal, { scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => modal.style.display = 'none' });
}

// שמירת מפתח API
function saveApiKey() {
  apiKey = document.getElementById('apiKeyInput').value.trim();
  closeApiModal();
  showUserMessage('success', 'מפתח API נשמר בהצלחה!');
}

// קבלת מפתח API
function getApiKey() {
  return apiKey;
}

// ייצוא הפונקציות
export { openApiModal, closeApiModal, saveApiKey, getApiKey };
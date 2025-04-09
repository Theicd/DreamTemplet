// welcome-message.js - ניהול הודעת הפתיחה

import config from './config.js';

// הצגת הודעת הפתיחה
function showWelcomeMessage() {
  const welcomeMessage = document.getElementById('welcome-message');
  welcomeMessage.innerHTML = `
    <div class="welcome-header">
      <h3><i class="fas fa-star"></i>${config.welcomeMessage.title}<i class="fas fa-star"></i></h3>
    </div>
    <div class="welcome-content">
      <div class="welcome-intro">
        <p class="welcome-text">${config.welcomeMessage.content}</p>
      </div>
      
      <div class="divider"><span></span></div>
      
      <div class="features-container">
        <h4>מה תוכלו ליצור:</h4>
        <ul class="features-list">
          <li>
            <div class="feature-icon"><i class="fas fa-paint-brush"></i></div>
            <div class="feature-text">לוגו תלת-ממדי מרהיב בסגנון Unreal Engine 5</div>
          </li>
          <li>
            <div class="feature-icon"><i class="fas fa-magic"></i></div>
            <div class="feature-text">עיצוב מותאם אישית לפי סגנון העסק שלך</div>
          </li>
          <li>
            <div class="feature-icon"><i class="fas fa-bolt"></i></div>
            <div class="feature-text">תוצאות מהירות ומקצועיות במגוון סגנונות</div>
          </li>
        </ul>
      </div>
      
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
          <div class="pricing-option"><i class="fas fa-check"></i> תוצאות באיכות גבוהה</div>
        </div>
      </div>
    </div>
    
    <div class="welcome-footer">
      <button class="glow-button" onclick="closeWelcomeMessage()">${config.welcomeMessage.buttonText}</button>
    </div>
  `;
  welcomeMessage.style.display = 'block';
  gsap.fromTo(welcomeMessage, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
}

// סגירת הודעת הפתיחה
function closeWelcomeMessage() {
  const welcomeMessage = document.getElementById('welcome-message');
  gsap.to(welcomeMessage, { scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => welcomeMessage.style.display = 'none' });
}

// הפעלת הודעת הפתיחה בעת טעינת הדף
window.addEventListener('load', showWelcomeMessage);

// ייצוא הפונקציה לסגירה
export { closeWelcomeMessage };
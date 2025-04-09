// user-messages.js - ניהול הודעות משתמש

// הצגת הודעה למשתמש
function showUserMessage(type, message) {
  const userMessage = document.getElementById('user-message');
  const icon = type === 'error' ? 'fa-exclamation-circle' : 
               type === 'loading' ? 'fa-spinner fa-spin' : 
               'fa-check-circle';
  const title = type === 'error' ? 'שגיאה' : 
                type === 'loading' ? 'טוען...' : 
                'הצלחה';
  
  // מבנה הודעה שונה להודעת טעינה
  if (type === 'loading') {
    userMessage.innerHTML = `
      <div class="welcome-header">
        <h3><i class="fas ${icon}"></i> ${title} <i class="fas ${icon}"></i></h3>
      </div>
      <div class="welcome-content">
        <p class="welcome-text">${message}</p>
        <div class="neon-spinner"></div>
      </div>
    `;
    userMessage.classList.add('loading-message');
    userMessage.style.display = 'block';
  } else {
    userMessage.innerHTML = `
      <div class="welcome-header">
        <h3><i class="fas ${icon}"></i> ${title} <i class="fas ${icon}"></i></h3>
        <button class="close-btn" onclick="closeUserMessage()">×</button>
      </div>
      <div class="welcome-content">
        <p class="welcome-text">${message}</p>
      </div>
      <div class="welcome-footer"><button class="glow-button" onclick="closeUserMessage()">סגור</button></div>
    `;
    userMessage.classList.remove('loading-message');
    userMessage.style.display = 'block';
  }
  
  gsap.fromTo(userMessage, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
}

// סגירת הודעת משתמש
function closeUserMessage() {
  const userMessage = document.getElementById('user-message');
  gsap.to(userMessage, { scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => {
    userMessage.style.display = 'none';
    userMessage.classList.remove('loading-message');
  }});
}

// ייצוא הפונקציות
export { showUserMessage, closeUserMessage };
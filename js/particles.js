// particles.js - ניהול חלקיקים מונפשים ברקע הדף
// גרסה מפושטת וקלה יותר למניעת חסימה על ידי חוסמי פרסומות

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];
let animationId;
let lastTime = 0;
const fps = 30; // מגביל ל-30 פריימים בשנייה במקום 60
const interval = 1000/fps;

// מאגר צבעים קבוע - למניעת יצירה חוזרת
const COLORS = ['rgba(0, 212, 255, 0.5)', 'rgba(255, 0, 255, 0.5)', 'rgba(255, 255, 255, 0.5)'];

// התאמת גודל הקנבס
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

// מחלקה לחלקיק בודד - מפושטת
class Particle {
  constructor() {
    this.reset();
  }
  
  // מתודה לאיפוס/יצירת חלקיק - מאפשרת שימוש חוזר באובייקטים
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.life = 1; // מצב חיים מלא
  }

  update() {
    // עדכון מיקום ובדיקת גבולות
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    
    // הפחתת גודל וחיים בהדרגה
    if (Math.random() < 0.01) {
      this.life -= 0.01;
      if (this.life <= 0) {
        this.reset();
      } else if (this.size > 0.3) {
        this.size -= 0.01;
      }
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// יצירת מאגר חלקיקים
function initParticles() {
  // ניקוי המערך הקיים אם יש
  if (particlesArray.length > 0) {
    particlesArray.length = 0;
  }
  
  const numberOfParticles = Math.min(40, (canvas.width * canvas.height) / 30000); // הפחתה נוספת במספר החלקיקים
  
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// אנימציה עם בקרת קצב ריענון
function animateParticles(timestamp) {
  // בדיקת זמן לשליטה על קצב הריענון
  if (!timestamp) timestamp = 0;
  const elapsed = timestamp - lastTime;
  
  if (elapsed > interval) {
    lastTime = timestamp - (elapsed % interval);
    
    // ניקוי חלקי עם אפקט "זנב" בהיר
    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // עדכון ותצוגת החלקיקים
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
  }
  
  // רק אם החלון נראה, המשך האנימציה
  if (document.visibilityState !== 'hidden') {
    animationId = requestAnimationFrame(animateParticles);
  }
}

// עצירה והתחלה של האנימציה לפי נראות החלון
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    cancelAnimationFrame(animationId);
  } else {
    animationId = requestAnimationFrame(animateParticles);
  }
});

// הפעלה ראשונית
resizeCanvas();
initParticles();
animationId = requestAnimationFrame(animateParticles);
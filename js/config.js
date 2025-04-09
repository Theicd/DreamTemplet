// config.js - קובץ תצורה לטקסטים דינמיים ופרומפטים

const config = {
  // טקסטים כלליים של האפליקציה
  appName: "דרימי לוגו AI", // שם האפליקציה
  appTitle: "מחולל לוגו תלת־ממדי - דרימי לוגו AI", // כותרת הדף
  mainHeader: "מחולל לוגו תלת־ממדי", // כותרת ראשית
  inputPlaceholder: "לדוגמה: בית קפה אורבני בשם Bean's", // טקסט רמז בתיבת הקלט
  generateButtonText: "צור לוגו", // טקסט כפתור היצירה

  // הודעת הפתיחה
  welcomeMessage: {
    title: "ברוכים הבאים למחולל הלוגו!",
    content: "צור לוגו תלת־ממדי לעסק שלך בלחיצה אחת. כתוב מה העסק עושה, בחר סגנון – והמערכת תפיק עבורך לוגו מרהיב.<br><br>השתמש במפתח API של OpenAI, או קנה מפתח ב-<strong>5 ש\"ח</strong> ל-6 שימושים דרך ביט.",
    buttonText: "בוא נתחיל!"
  },

  // הודעות משתמש
  userMessages: {
    noApiKey: "אנא הזן מפתח API תחילה.",
    noInput: "אנא תאר את העסק.",
    loading: "מייצר לוגו... אנא המתן, התהליך עשוי לקחת כמה שניות.",
    success: "הלוגו נוצר בהצלחה! שמור או שתף אותו, הוא זמין לשעה הקרובה.",
    error: "שגיאה: {error}"
  },

  // פרומפט למודל
  modelPrompt: `You are a professional visual prompt engineer.
Your task is to generate a single, high-quality prompt for DALL·E 3 that produces a cinematic 3D business logo in Unreal Engine 5 style, based on the user's description:
"{input}"
Strict Requirements:
- Include the business name as **clear, centered 3D text** in the logo.
- Central object should match the business type.
- Emphasize Unreal Engine 5 visual aesthetics: cinematic lighting, nanite geometry, glowing rim light, depth-of-field blur, chromatic aberration, volumetric fog.
- Style: {style}.
- Composition: dramatic perspective, dark moody background, lens reflections.
- Output only the final prompt text for DALL·E 3.`
};

// ייצוא התצורה
export default config;
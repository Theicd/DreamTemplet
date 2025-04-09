// model-interaction.js - פנייה למודלים (GPT ו-DALL·E)

import config from './config.js';
import { getApiKey } from './api-modal.js';
import { showUserMessage } from './user-messages.js';

// יצירת תוצאה (לוגו, פוסטר וכו')
async function generateOutput() {
  const apiKey = getApiKey();
  if (!apiKey) {
    showUserMessage('error', config.userMessages.noApiKey);
    return;
  }

  const userInput = document.getElementById('user-input').value.trim();
  const style = document.getElementById('style-select').value;
  if (!userInput) {
    showUserMessage('error', config.userMessages.noInput);
    return;
  }

  showUserMessage('loading', config.userMessages.loading);

  try {
    // יצירת פרומפט ל-GPT
    const gptPrompt = config.modelPrompt
      .replace('{input}', userInput)
      .replace('{style}', style);

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gpt-4o', messages: [{ role: 'user', content: gptPrompt }] })
    });
    const gptData = await gptRes.json();
    const dallePrompt = gptData.choices[0].message.content;

    // יצירת תמונה עם DALL·E
    const dalleRes = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'dall-e-3', prompt: dallePrompt, n: 1, size: '1024x1024' })
    });
    const dalleData = await dalleRes.json();
    const imageUrl = dalleData.data[0].url;

    // הצגת התוצאה
    const card = document.createElement('div');
    card.className = 'logo-card';
    card.innerHTML = `<img src="${imageUrl}" alt="תוצאה"><p>${userInput}</p>`;
    document.getElementById('output-container').prepend(card);
    showUserMessage('success', config.userMessages.success);
  } catch (err) {
    showUserMessage('error', config.userMessages.error.replace('{error}', err.message));
  }
}

// ייצוא הפונקציה
export { generateOutput };
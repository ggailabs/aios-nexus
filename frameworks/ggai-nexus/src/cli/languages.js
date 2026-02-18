const fs = require('fs-extra');
const path = require('path');

class LanguageManager {
  constructor() {
    this.currentLanguage = 'en-US';
    this.translations = {};
    this.loadLanguage(this.currentLanguage);
  }

  loadLanguage(languageCode) {
    const filePath = path.join(__dirname, '../locales', `${languageCode}.json`);
    
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        this.translations = JSON.parse(content);
        this.currentLanguage = languageCode;
      } catch (error) {
        console.error(`Error loading language file ${languageCode}:`, error);
        // Fallback to English
        this.loadLanguage('en-US');
      }
    } else {
      console.warn(`Language file not found: ${languageCode}, falling back to English`);
      this.loadLanguage('en-US');
    }
  }

  t(key) {
    return this.translations[key] || key;
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getAvailableLanguages() {
    const localesDir = path.join(__dirname, '../locales');
    const files = fs.readdirSync(localesDir);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
  }
}

// Export for use in other modules
module.exports = LanguageManager;

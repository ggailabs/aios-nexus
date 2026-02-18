const React = require('react');
const { useState, useEffect } = require('react');
const { Box, Text, useInput, useApp } = require('ink');

const LanguageManager = require('../../cli/languages');

const LanguageScreen = ({ selectedLanguage, onLanguageSelect, onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { exit } = useApp();
  const [languageManager] = useState(() => new LanguageManager());

  const languages = [
    { code: 'pt-BR', name: 'Português (BR)' },
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Español (ES)' }
  ];

  useEffect(() => {
    const currentIndex = languages.findIndex(lang => lang.code === selectedLanguage);
    if (currentIndex !== -1) {
      setSelectedIndex(currentIndex);
    }
  }, [selectedLanguage]);

  useInput((input, key) => {
    if (key.escape) {
      exit();
    }

    if (key.upArrow) {
      setSelectedIndex(prev => (prev - 1 + languages.length) % languages.length);
    }

    if (key.downArrow) {
      setSelectedIndex(prev => (prev + 1) % languages.length);
    }

    if (key.return) {
      onLanguageSelect(languages[selectedIndex].code);
    }

    if (key.leftArrow) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column" alignItems="center" height={20}>
      <Box borderStyle="round" borderColor="cyan" padding={2} marginBottom={1}>
        <Text bold color="cyan">
          🌍 GGAI Nexus Setup
        </Text>
      </Box>
      
      <Box marginBottom={1}>
        <Text bold>
          Choose your language / Escolha seu idioma / Elige tu idioma
        </Text>
      </Box>

      <Box flexDirection="column" alignItems="left">
        {languages.map((language, index) => (
          <Box key={language.code}>
            <Text color={index === selectedIndex ? 'green' : 'white'}>
              {index === selectedIndex ? '◉' : '◯'} {language.name}
            </Text>
          </Box>
        ))}
      </Box>

      <Box marginTop={2}>
        <Text color="gray">
          [ ← Back ]    [ Continue → ]
        </Text>
      </Box>
    </Box>
  );
};

module.exports = { LanguageScreen };

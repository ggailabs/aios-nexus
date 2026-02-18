const React = require('react');
const {
  useState,
  useEffect
} = require('react');
const {
  Box,
  Text,
  useInput,
  useApp
} = require('ink');
const languageManager = require('../../cli/languages');
const LanguageScreen = ({
  selectedLanguage,
  onLanguageSelect,
  onBack
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {
    exit
  } = useApp();
  const languages = [{
    code: 'pt-BR',
    name: 'Português (BR)'
  }, {
    code: 'en-US',
    name: 'English (US)'
  }, {
    code: 'es-ES',
    name: 'Español (ES)'
  }];
  const currentIndex = languages.findIndex(lang => lang.code === selectedLanguage);
  if (currentIndex !== -1) {
    setSelectedIndex(currentIndex);
  }
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
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "center",
    height: 20
  }, /*#__PURE__*/React.createElement(Box, {
    borderStyle: "round",
    borderColor: "cyan",
    padding: 2,
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    bold: true,
    color: "cyan"
  }, "\uD83C\uDF0D GGAI Nexus Setup")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    bold: true
  }, "Choose your language / Escolha seu idioma / Elige tu idioma")), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "left"
  }, languages.map((language, index) => /*#__PURE__*/React.createElement(Box, {
    key: language.code
  }, /*#__PURE__*/React.createElement(Text, {
    color: index === selectedIndex ? 'green' : 'white'
  }, index === selectedIndex ? '◉' : '◯', " ", language.name)))), /*#__PURE__*/React.createElement(Box, {
    marginTop: 2
  }, /*#__PURE__*/React.createElement(Text, {
    color: "gray"
  }, "[ \u2190 Back ]    [ Continue \u2192 ]")));
};
module.exports = {
  LanguageScreen
};
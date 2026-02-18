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
const AIScaffoldingScreen = ({
  useAI,
  onAISelect,
  onBack
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {
    exit
  } = useApp();
  const options = [{
    value: true,
    name: 'Yes (Recommended)',
    description: 'Analyze your codebase and generate custom agents/skills'
  }, {
    value: false,
    name: 'No',
    description: 'Use generic templates'
  }];
  const currentIndex = options.findIndex(option => option.value === useAI);
  if (currentIndex !== -1) {
    setSelectedIndex(currentIndex);
  }
  useInput((input, key) => {
    if (key.escape) {
      exit();
    }
    if (key.upArrow) {
      setSelectedIndex(prev => (prev - 1 + options.length) % options.length);
    }
    if (key.downArrow) {
      setSelectedIndex(prev => (prev + 1) % options.length);
    }
    if (key.return) {
      onAISelect(options[selectedIndex].value);
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
  }, "\uD83E\uDD16 AI Scaffolding")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, null, "Use AI to analyze your codebase and generate custom agents, skills, and workflows?")), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "left",
    marginBottom: 2
  }, options.map((option, index) => /*#__PURE__*/React.createElement(Box, {
    key: option.value.toString(),
    flexDirection: "column",
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: index === selectedIndex ? 'green' : 'white'
  }, index === selectedIndex ? '◉' : '◯', " ", option.name), /*#__PURE__*/React.createElement(Text, {
    color: "gray",
    marginLeft: 2
  }, option.description)))), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: "gray"
  }, "[ \u2190 Back ]    [ Continue \u2192 ]")));
};
module.exports = {
  AIScaffoldingScreen
};
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
const ProjectTypeScreen = ({
  selectedType,
  onTypeSelect,
  onBack
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {
    exit
  } = useApp();
  const projectTypes = [{
    code: 'frontend',
    name: 'Frontend only'
  }, {
    code: 'backend',
    name: 'Backend only'
  }, {
    code: 'fullstack',
    name: 'Full stack'
  }, {
    code: 'docs',
    name: 'Documentation only'
  }];
  const currentIndex = projectTypes.findIndex(type => type.code === selectedType);
  if (currentIndex !== -1) {
    setSelectedIndex(currentIndex);
  }
  useInput((input, key) => {
    if (key.escape) {
      exit();
    }
    if (key.upArrow) {
      setSelectedIndex(prev => (prev - 1 + projectTypes.length) % projectTypes.length);
    }
    if (key.downArrow) {
      setSelectedIndex(prev => (prev + 1) % projectTypes.length);
    }
    if (key.return) {
      onTypeSelect(projectTypes[selectedIndex].code);
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
  }, "\uD83D\uDE80 Project Type")), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "left"
  }, projectTypes.map((type, index) => /*#__PURE__*/React.createElement(Box, {
    key: type.code
  }, /*#__PURE__*/React.createElement(Text, {
    color: index === selectedIndex ? 'green' : 'white'
  }, index === selectedIndex ? '◉' : '◯', " ", type.name)))), /*#__PURE__*/React.createElement(Box, {
    marginTop: 2
  }, /*#__PURE__*/React.createElement(Text, {
    color: "gray"
  }, "[ \u2190 Back ]    [ Continue \u2192 ]")));
};
module.exports = {
  ProjectTypeScreen
};
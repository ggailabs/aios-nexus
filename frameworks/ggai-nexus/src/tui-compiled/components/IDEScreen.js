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
const IDEScreen = ({
  selectedIDE,
  onIDESelect,
  onBack
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {
    exit
  } = useApp();
  const ides = [{
    code: 'windsurf',
    name: '🌊 Windsurf'
  }, {
    code: 'cursor',
    name: '🎯 Cursor'
  }, {
    code: 'antigravity',
    name: '🚀 Antigravity'
  }, {
    code: 'vscode',
    name: '💻 VS Code'
  }];
  const currentIndex = ides.findIndex(ide => ide.code === selectedIDE);
  if (currentIndex !== -1) {
    setSelectedIndex(currentIndex);
  }
  useInput((input, key) => {
    if (key.escape) {
      exit();
    }
    if (key.upArrow) {
      setSelectedIndex(prev => (prev - 1 + ides.length) % ides.length);
    }
    if (key.downArrow) {
      setSelectedIndex(prev => (prev + 1) % ides.length);
    }
    if (key.return) {
      onIDESelect(ides[selectedIndex].code);
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
  }, "\uD83D\uDCBB Choose your IDE")), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "left"
  }, ides.map((ide, index) => /*#__PURE__*/React.createElement(Box, {
    key: ide.code
  }, /*#__PURE__*/React.createElement(Text, {
    color: index === selectedIndex ? 'green' : 'white'
  }, index === selectedIndex ? '◉' : '◯', " ", ide.name)))), /*#__PURE__*/React.createElement(Box, {
    marginTop: 2
  }, /*#__PURE__*/React.createElement(Text, {
    color: "gray"
  }, "[ \u2190 Back ]    [ Continue \u2192 ]")));
};
module.exports = {
  IDEScreen
};
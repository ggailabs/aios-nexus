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
const CompleteScreen = ({
  result,
  config,
  onFinish,
  onViewFiles
}) => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Default to Finish
  const {
    exit
  } = useApp();
  const options = [{
    key: 'view',
    name: 'View Generated Files'
  }, {
    key: 'finish',
    name: 'Finish'
  }];
  const getTargetDir = () => {
    switch (config.ide) {
      case 'windsurf':
        return '.windsurf/';
      case 'cursor':
        return '.cursor/';
      case 'antigravity':
        return '.agent/';
      case 'vscode':
        return '.vscode/';
      default:
        return '.ggai-nexus/';
    }
  };
  useInput((input, key) => {
    if (key.escape) {
      exit();
    }
    if (key.leftArrow) {
      setSelectedIndex(prev => (prev - 1 + options.length) % options.length);
    }
    if (key.rightArrow) {
      setSelectedIndex(prev => (prev + 1) % options.length);
    }
    if (key.return) {
      const selectedOption = options[selectedIndex];
      switch (selectedOption.key) {
        case 'view':
          onViewFiles();
          break;
        case 'finish':
          onFinish();
          break;
      }
    }
  });
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "center",
    height: 20
  }, /*#__PURE__*/React.createElement(Box, {
    borderStyle: "round",
    borderColor: "green",
    padding: 2,
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    bold: true,
    color: "green"
  }, "\u2705 Setup Complete!")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, null, "Your development environment is ready!")), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "left",
    marginBottom: 2
  }, /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "cyan"
  }, "\uD83D\uDCC1 Created: ", getTargetDir())), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "cyan"
  }, "\uD83D\uDCDD Documentation: ", result?.docsCount || 5, " files")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "cyan"
  }, "\uD83E\uDD16 Agents: ", result?.agentsCount || 8, " specialized")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "cyan"
  }, "\u26A1 Skills: ", result?.skillsCount || 15, " custom")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "cyan"
  }, "\uD83D\uDD04 Workflows: ", result?.workflowsCount || 5, " project-specific"))), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "left",
    marginBottom: 2
  }, /*#__PURE__*/React.createElement(Text, {
    bold: true
  }, "Next steps:"), /*#__PURE__*/React.createElement(Text, null, "\u2022 Restart your IDE"), /*#__PURE__*/React.createElement(Text, null, "\u2022 Check ", getTargetDir(), "README.md"), /*#__PURE__*/React.createElement(Text, null, "\u2022 Start coding! \uD83D\uDE80")), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "row",
    justifyContent: "center"
  }, options.map((option, index) => /*#__PURE__*/React.createElement(Box, {
    key: option.key,
    marginX: 1,
    paddingX: 1,
    borderStyle: index === selectedIndex ? 'single' : undefined,
    borderColor: index === selectedIndex ? 'green' : undefined
  }, /*#__PURE__*/React.createElement(Text, {
    color: index === selectedIndex ? 'green' : 'white'
  }, option.name)))));
};
module.exports = {
  CompleteScreen
};
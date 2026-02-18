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
const PreviewScreen = ({
  projectInfo,
  config,
  onGenerate,
  onCustomize,
  onBack
}) => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Default to Generate
  const {
    exit
  } = useApp();
  const options = [{
    key: 'back',
    name: '← Back'
  }, {
    key: 'generate',
    name: 'Generate'
  }, {
    key: 'customize',
    name: 'Customize'
  }];

  // Calculate estimated content
  const estimatedContent = {
    docs: config.useAI ? 5 : 2,
    agents: config.useAI ? 8 : 3,
    skills: config.useAI ? 15 : 5,
    workflows: config.useAI ? 5 : 2,
    totalFiles: config.useAI ? 28 : 12,
    estimatedTime: config.useAI ? '2-3 minutes' : '30 seconds'
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
        case 'back':
          onBack();
          break;
        case 'generate':
          onGenerate();
          break;
        case 'customize':
          onCustomize();
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
    borderColor: "cyan",
    padding: 2,
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    bold: true,
    color: "cyan"
  }, "\uD83D\uDCCB Preview Generated Content")), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "left",
    marginBottom: 2
  }, /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, null, "\u2611\uFE0F Architecture documentation")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, null, "\u2611\uFE0F ", estimatedContent.agents, " specialized agents")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, null, "\u2611\uFE0F ", estimatedContent.skills, " custom skills")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, null, "\u2611\uFE0F ", estimatedContent.workflows, " project workflows")), /*#__PURE__*/React.createElement(Box, {
    marginTop: 1,
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "gray"
  }, "Total files: ", estimatedContent.totalFiles)), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "gray"
  }, "Estimated time: ", estimatedContent.estimatedTime))), /*#__PURE__*/React.createElement(Box, {
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
  PreviewScreen
};
const React = require('react');
const { useState, useEffect } = require('react');
const { Box, Text, useInput, useApp } = require('ink');

const languageManager = require('../../cli/languages');

const PreviewScreen = ({ projectInfo, config, onGenerate, onCustomize, onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Default to Generate
  const { exit } = useApp();

  const options = [
    { key: 'back', name: '← Back' },
    { key: 'generate', name: 'Generate' },
    { key: 'customize', name: 'Customize' }
  ];

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

  return (
    <Box flexDirection="column" alignItems="center" height={20}>
      <Box borderStyle="round" borderColor="cyan" padding={2} marginBottom={1}>
        <Text bold color="cyan">
          📋 Preview Generated Content
        </Text>
      </Box>

      <Box flexDirection="column" alignItems="left" marginBottom={2}>
        <Box marginBottom={1}>
          <Text>☑️ Architecture documentation</Text>
        </Box>
        <Box marginBottom={1}>
          <Text>☑️ {estimatedContent.agents} specialized agents</Text>
        </Box>
        <Box marginBottom={1}>
          <Text>☑️ {estimatedContent.skills} custom skills</Text>
        </Box>
        <Box marginBottom={1}>
          <Text>☑️ {estimatedContent.workflows} project workflows</Text>
        </Box>
        
        <Box marginTop={1} marginBottom={1}>
          <Text color="gray">
            Total files: {estimatedContent.totalFiles}
          </Text>
        </Box>
        
        <Box marginBottom={1}>
          <Text color="gray">
            Estimated time: {estimatedContent.estimatedTime}
          </Text>
        </Box>
      </Box>

      <Box flexDirection="row" justifyContent="center">
        {options.map((option, index) => (
          <Box 
            key={option.key} 
            marginX={1}
            paddingX={1}
            borderStyle={index === selectedIndex ? 'single' : undefined}
            borderColor={index === selectedIndex ? 'green' : undefined}
          >
            <Text color={index === selectedIndex ? 'green' : 'white'}>
              {option.name}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

module.exports = { PreviewScreen };

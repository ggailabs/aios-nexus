const React = require('react');
const { useState, useEffect } = require('react');
const { Box, Text, useInput, useApp } = require('ink');

const languageManager = require('../../cli/languages');

const AIScaffoldingScreen = ({ useAI, onAISelect, onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { exit } = useApp();

  const options = [
    { value: true, name: 'Yes (Recommended)', description: 'Analyze your codebase and generate custom agents/skills' },
    { value: false, name: 'No', description: 'Use generic templates' }
  ];

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

  return (
    <Box flexDirection="column" alignItems="center" height={20}>
      <Box borderStyle="round" borderColor="cyan" padding={2} marginBottom={1}>
        <Text bold color="cyan">
          🤖 AI Scaffolding
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text>
          Use AI to analyze your codebase and generate custom agents, skills, and workflows?
        </Text>
      </Box>

      <Box flexDirection="column" alignItems="left" marginBottom={2}>
        {options.map((option, index) => (
          <Box key={option.value.toString()} flexDirection="column" marginBottom={1}>
            <Text color={index === selectedIndex ? 'green' : 'white'}>
              {index === selectedIndex ? '◉' : '◯'} {option.name}
            </Text>
            <Text color="gray" marginLeft={2}>
              {option.description}
            </Text>
          </Box>
        ))}
      </Box>

      <Box>
        <Text color="gray">
          [ ← Back ]    [ Continue → ]
        </Text>
      </Box>
    </Box>
  );
};

module.exports = { AIScaffoldingScreen };

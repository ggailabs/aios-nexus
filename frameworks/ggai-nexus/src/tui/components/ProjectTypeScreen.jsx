const React = require('react');
const { useState, useEffect } = require('react');
const { Box, Text, useInput, useApp } = require('ink');

const languageManager = require('../../cli/languages');

const ProjectTypeScreen = ({ selectedType, onTypeSelect, onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { exit } = useApp();

  const projectTypes = [
    { code: 'frontend', name: 'Frontend only' },
    { code: 'backend', name: 'Backend only' },
    { code: 'fullstack', name: 'Full stack' },
    { code: 'docs', name: 'Documentation only' }
  ];

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

  return (
    <Box flexDirection="column" alignItems="center" height={20}>
      <Box borderStyle="round" borderColor="cyan" padding={2} marginBottom={1}>
        <Text bold color="cyan">
          🚀 Project Type
        </Text>
      </Box>

      <Box flexDirection="column" alignItems="left">
        {projectTypes.map((type, index) => (
          <Box key={type.code}>
            <Text color={index === selectedIndex ? 'green' : 'white'}>
              {index === selectedIndex ? '◉' : '◯'} {type.name}
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

module.exports = { ProjectTypeScreen };

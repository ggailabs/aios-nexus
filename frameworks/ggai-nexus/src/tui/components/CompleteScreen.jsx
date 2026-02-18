const React = require('react');
const { useState, useEffect } = require('react');
const { Box, Text, useInput, useApp } = require('ink');

const languageManager = require('../../cli/languages');

const CompleteScreen = ({ result, config, onFinish, onViewFiles }) => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Default to Finish
  const { exit } = useApp();

  const options = [
    { key: 'view', name: 'View Generated Files' },
    { key: 'finish', name: 'Finish' }
  ];

  const getTargetDir = () => {
    switch (config.ide) {
      case 'windsurf': return '.windsurf/';
      case 'cursor': return '.cursor/';
      case 'antigravity': return '.agent/';
      case 'vscode': return '.vscode/';
      default: return '.ggai-nexus/';
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

  return (
    <Box flexDirection="column" alignItems="center" height={20}>
      <Box borderStyle="round" borderColor="green" padding={2} marginBottom={1}>
        <Text bold color="green">
          ✅ Setup Complete!
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text>
          Your development environment is ready!
        </Text>
      </Box>

      <Box flexDirection="column" alignItems="left" marginBottom={2}>
        <Box marginBottom={1}>
          <Text color="cyan">📁 Created: {getTargetDir()}</Text>
        </Box>
        <Box marginBottom={1}>
          <Text color="cyan">📝 Documentation: {result?.docsCount || 5} files</Text>
        </Box>
        <Box marginBottom={1}>
          <Text color="cyan">🤖 Agents: {result?.agentsCount || 8} specialized</Text>
        </Box>
        <Box marginBottom={1}>
          <Text color="cyan">⚡ Skills: {result?.skillsCount || 15} custom</Text>
        </Box>
        <Box marginBottom={1}>
          <Text color="cyan">🔄 Workflows: {result?.workflowsCount || 5} project-specific</Text>
        </Box>
      </Box>

      <Box flexDirection="column" alignItems="left" marginBottom={2}>
        <Text bold>Next steps:</Text>
        <Text>• Restart your IDE</Text>
        <Text>• Check {getTargetDir()}README.md</Text>
        <Text>• Start coding! 🚀</Text>
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

module.exports = { CompleteScreen };

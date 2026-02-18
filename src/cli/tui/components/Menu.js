/**
 * AIOS Nexus - TUI Menu Component
 */

const React = require('react');
const { useState } = React;
const { Box, Text } = require('ink');
const TextInput = require('ink-text-input').default;

const menuItems = [
  { key: '1', label: 'Initialize Project', action: 'init' },
  { key: '2', label: 'Sync with IDEs', action: 'sync' },
  { key: '3', label: 'Workflow', action: 'workflow' },
  { key: '4', label: 'Agents', action: 'agent' },
  { key: '5', label: 'Status', action: 'status' },
  { key: 'q', label: 'Exit', action: 'exit' },
];

function Menu({ onSelect }) {
  const [input, setInput] = useState('');

  function handleSubmit(value) {
    const item = menuItems.find((m) => m.key === value.trim());
    if (item) {
      onSelect(item.action);
    }
    setInput('');
  }

  return (
    <Box flexDirection="column">
      <Text bold color="white">
        Main Menu
      </Text>

      <Box flexDirection="column" marginY={1}>
        {menuItems.map((item) => (
          <Box key={item.key}>
            <Box width={4}>
              <Text color="cyan">[{item.key}]</Text>
            </Box>
            <Text>{item.label}</Text>
          </Box>
        ))}
      </Box>

      <Box>
        <Text dimColor>Select option: </Text>
        <TextInput value={input} onChange={setInput} onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
}

module.exports = Menu;

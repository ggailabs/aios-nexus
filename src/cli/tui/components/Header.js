/**
 * AIOS Nexus - TUI Header Component
 */

const React = require('react');
const { Box, Text } = require('ink');

function Header({ status }) {
  const contextStatus = status?.context ? '✅' : '❌';
  const workflowStatus = status?.workflow ? '🔄' : '⏹️';

  return (
    <Box flexDirection="column">
      <Box>
        <Text bold color="cyan">
          AIOS Nexus
        </Text>
        <Text dimColor> v5.0.0</Text>
      </Box>

      <Box marginTop={1}>
        <Box marginRight={2}>
          <Text dimColor>Context: </Text>
          <Text>{contextStatus}</Text>
        </Box>

        <Box marginRight={2}>
          <Text dimColor>Workflow: </Text>
          <Text>{workflowStatus}</Text>
        </Box>

        {status?.lastSync && (
          <Box>
            <Text dimColor>Last Sync: </Text>
            <Text>{status.lastSync}</Text>
          </Box>
        )}
      </Box>

      <Box marginY={1}>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
        <Text dimColor>━</Text>
      </Box>
    </Box>
  );
}

module.exports = Header;

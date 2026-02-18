/**
 * AIOS Nexus - TUI Status Component
 */

const React = require('react');
const { useState, useEffect } = React;
const { Box, Text } = require('ink');

function Status({ onBack }) {
  const [info, setInfo] = useState({
    context: { exists: false, dirs: [] },
    aiosCore: { exists: false },
    workflows: [],
    agents: [],
  });

  useEffect(() => {
    loadStatus();
  }, []);

  async function loadStatus() {
    const fs = require('fs-extra');
    const path = require('path');

    const contextRoot = path.join(process.cwd(), '.context');
    const aiosRoot = path.join(process.cwd(), '.aios-core');

    const contextExists = await fs.pathExists(contextRoot);
    const aiosExists = await fs.pathExists(aiosRoot);

    let dirs = [];
    if (contextExists) {
      dirs = await fs.readdir(contextRoot);
    }

    let agents = [];
    if (contextExists) {
      const agentsPath = path.join(contextRoot, 'agents');
      if (await fs.pathExists(agentsPath)) {
        agents = (await fs.readdir(agentsPath)).filter((f) => f.endsWith('.md'));
      }
    }

    setInfo({
      context: { exists: contextExists, dirs },
      aiosCore: { exists: aiosExists },
      workflows: [],
      agents,
    });
  }

  return (
    <Box flexDirection="column">
      <Text bold color="white">
        Status Overview
      </Text>

      <Box flexDirection="column" marginTop={1}>
        <Text bold>Context Directory</Text>
        <Box marginLeft={2}>
          <Text>{info.context.exists ? '✅' : '❌'} .context/</Text>
        </Box>
        {info.context.dirs.map((dir) => (
          <Box key={dir} marginLeft={4}>
            <Text dimColor>├── {dir}</Text>
          </Box>
        ))}
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text bold>AIOS Core</Text>
        <Box marginLeft={2}>
          <Text>{info.aiosCore.exists ? '✅' : '❌'} .aios-core/</Text>
        </Box>
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text bold>Agents ({info.agents.length})</Text>
        {info.agents.slice(0, 5).map((agent) => (
          <Box key={agent} marginLeft={2}>
            <Text dimColor>• {agent.replace('.md', '')}</Text>
          </Box>
        ))}
        {info.agents.length > 5 && (
          <Box marginLeft={2}>
            <Text dimColor>... and {info.agents.length - 5} more</Text>
          </Box>
        )}
      </Box>

      <Box marginTop={2}>
        <Text dimColor>[Press ESC to go back]</Text>
      </Box>
    </Box>
  );
}

module.exports = Status;

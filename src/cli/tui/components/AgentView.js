/**
 * AIOS Nexus - TUI Agent View Component
 */

const React = require('react');
const { useState, useEffect } = React;
const { Box, Text } = require('ink');
const TextInput = require('ink-text-input').default;

function AgentView({ onBack }) {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentContent, setAgentContent] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    loadAgents();
  }, []);

  async function loadAgents() {
    const fs = require('fs-extra');
    const path = require('path');

    const agentsPath = path.join(process.cwd(), '.context', 'agents');

    if (!(await fs.pathExists(agentsPath))) {
      return;
    }

    const files = await fs.readdir(agentsPath);
    const agentList = files
      .filter((f) => f.endsWith('.md') && f !== 'README.md')
      .map((f) => f.replace('.md', ''));

    setAgents(agentList);
  }

  async function selectAgent(agentId) {
    const fs = require('fs-extra');
    const path = require('path');

    const agentPath = path.join(process.cwd(), '.context', 'agents', `${agentId}.md`);

    if (!(await fs.pathExists(agentPath))) {
      return;
    }

    const content = await fs.readFile(agentPath, 'utf-8');
    setSelectedAgent(agentId);
    setAgentContent(content);
  }

  if (selectedAgent) {
    return (
      <Box flexDirection="column">
        <Text bold color="white">
          Agent: @{selectedAgent}
        </Text>

        <Box marginTop={1} flexDirection="column">
          <Text dimColor>━</Text>
          <Text>{agentContent.split('\n').slice(0, 20).join('\n')}</Text>
          {agentContent.split('\n').length > 20 && <Text dimColor>... (truncated)</Text>}
          <Text dimColor>━</Text>
        </Box>

        <Box marginTop={2}>
          <Text dimColor>[ESC] Back to list</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      <Text bold color="white">
        Available Agents ({agents.length})
      </Text>

      <Box flexDirection="column" marginTop={1}>
        {agents.map((agent) => (
          <Box key={agent}>
            <Box width={20}>
              <Text color="cyan">@{agent}</Text>
            </Box>
          </Box>
        ))}
      </Box>

      <Box marginTop={2}>
        <Text dimColor>Enter agent ID: </Text>
        <TextInput
          value={input}
          onChange={setInput}
          onSubmit={(value) => {
            if (value.trim() && agents.includes(value.trim())) {
              selectAgent(value.trim());
            }
            setInput('');
          }}
        />
      </Box>

      <Box marginTop={1}>
        <Text dimColor>[ESC] Back to menu</Text>
      </Box>
    </Box>
  );
}

module.exports = AgentView;

/**
 * AIOS Nexus - TUI Workflow View Component
 */

const React = require('react');
const { useState, useEffect } = React;
const { Box, Text } = require('ink');
const TextInput = require('ink-text-input').default;
const Spinner = require('ink-spinner').default;

const phases = {
  P: { name: 'Plan', color: 'blue' },
  R: { name: 'Review', color: 'yellow' },
  E: { name: 'Execute', color: 'green' },
  V: { name: 'Validate', color: 'magenta' },
  C: { name: 'Confirm', color: 'cyan' },
};

function WorkflowView({ onBack }) {
  const [mode, setMode] = useState('menu');
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [workflowName, setWorkflowName] = useState('');

  async function startWorkflow(name, scale = 'MEDIUM') {
    setLoading(true);
    try {
      const { WorkflowEngine } = require('../../../services/workflow');
      const engine = new WorkflowEngine({
        contextRoot: require('path').join(process.cwd(), '.context'),
      });

      const wf = await engine.start(name, { scale });
      setWorkflow({
        id: wf.id,
        name: wf.name,
        scale: wf.scale,
        phases: wf.phases,
        currentPhase: wf.currentPhase,
        currentIndex: 0,
      });
      setMode('active');
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function advanceWorkflow() {
    if (!workflow) return;

    setLoading(true);
    try {
      const { WorkflowEngine } = require('../../../services/workflow');
      const engine = new WorkflowEngine({
        contextRoot: require('path').join(process.cwd(), '.context'),
      });

      const result = await engine.advance({ force: false });

      if (result.advanced) {
        setWorkflow((prev) => ({
          ...prev,
          currentPhase: result.phase,
          currentIndex: prev.currentIndex + 1,
        }));
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box>
        <Text color="cyan">
          <Spinner type="dots" />
        </Text>
        <Text> Processing...</Text>
      </Box>
    );
  }

  if (mode === 'menu') {
    return (
      <Box flexDirection="column">
        <Text bold color="white">
          Workflow Management
        </Text>

        <Box marginTop={1}>
          <Text dimColor>Enter workflow name: </Text>
          <TextInput
            value={workflowName}
            onChange={setWorkflowName}
            onSubmit={() => {
              if (workflowName.trim()) {
                startWorkflow(workflowName.trim());
              }
            }}
          />
        </Box>

        <Box marginTop={1}>
          <Text dimColor>Scale: MEDIUM (default)</Text>
        </Box>

        <Box marginTop={2}>
          <Text dimColor>[Press ESC to go back]</Text>
        </Box>
      </Box>
    );
  }

  if (mode === 'active' && workflow) {
    return (
      <Box flexDirection="column">
        <Text bold color="white">
          Active Workflow
        </Text>

        <Box marginTop={1}>
          <Text bold>{workflow.name}</Text>
          <Text dimColor> ({workflow.scale})</Text>
        </Box>

        <Box marginTop={1}>
          <Text dimColor>ID: </Text>
          <Text>{workflow.id}</Text>
        </Box>

        <Box marginTop={1} flexDirection="column">
          <Text bold>Phases:</Text>
          <Box marginTop={1}>
            {workflow.phases.map((phase, idx) => {
              const phaseInfo = phases[phase];
              const isCurrent = idx === workflow.currentIndex;
              const isPast = idx < workflow.currentIndex;

              return (
                <Box key={phase} marginRight={1}>
                  {isPast ? (
                    <Text color="green">✓</Text>
                  ) : isCurrent ? (
                    <Text color={phaseInfo.color}>▶</Text>
                  ) : (
                    <Text dimColor>○</Text>
                  )}
                  <Text color={isCurrent ? phaseInfo.color : 'gray'}>{phaseInfo.name}</Text>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box marginTop={2}>
          <Text dimColor>[Enter] Advance | [ESC] Back</Text>
        </Box>
      </Box>
    );
  }

  return null;
}

module.exports = WorkflowView;

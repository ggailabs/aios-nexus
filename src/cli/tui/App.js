/**
 * AIOS Nexus - TUI App
 *
 * Terminal User Interface with React/Ink
 * Version: 5.0.0
 */

const React = require('react');
const { useState, useEffect } = React;
const { Box, Text, Newline } = require('ink');
const TextInput = require('ink-text-input').default;
const Spinner = require('ink-spinner').default;

const Header = require('./components/Header');
const Menu = require('./components/Menu');
const Status = require('./components/Status');
const WorkflowView = require('./components/WorkflowView');
const AgentView = require('./components/AgentView');

function App({ initialState = {} }) {
  const [view, setView] = useState(initialState.view || 'menu');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    context: false,
    workflow: null,
    lastSync: null,
  });

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    const fs = require('fs-extra');
    const path = require('path');

    const contextExists = await fs.pathExists(path.join(process.cwd(), '.context'));

    setStatus((prev) => ({
      ...prev,
      context: contextExists,
    }));
  }

  function handleMenuSelect(action) {
    switch (action) {
      case 'init':
        setView('init');
        break;
      case 'sync':
        handleSync();
        break;
      case 'workflow':
        setView('workflow');
        break;
      case 'agent':
        setView('agent');
        break;
      case 'status':
        setView('status');
        break;
      case 'exit':
        process.exit(0);
    }
  }

  async function handleSync() {
    setLoading(true);
    try {
      const { SyncEngine } = require('../../services/sync');
      const syncEngine = new SyncEngine({
        contextRoot: require('path').join(process.cwd(), '.context'),
      });

      await syncEngine.sync({ ide: 'all' });

      setStatus((prev) => ({
        ...prev,
        lastSync: new Date().toLocaleTimeString(),
      }));

      setView('status');
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Header status={status} />

      <Box marginY={1}>
        {loading ? (
          <Box>
            <Text color="cyan">
              <Spinner type="dots" />
            </Text>
            <Text> Processing...</Text>
          </Box>
        ) : null}
      </Box>

      {view === 'menu' && <Menu onSelect={handleMenuSelect} />}

      {view === 'status' && <Status onBack={() => setView('menu')} />}

      {view === 'workflow' && <WorkflowView onBack={() => setView('menu')} />}

      {view === 'agent' && <AgentView onBack={() => setView('menu')} />}

      {view === 'init' && (
        <Box flexDirection="column">
          <Text color="yellow">Initializing project...</Text>
        </Box>
      )}
    </Box>
  );
}

module.exports = App;

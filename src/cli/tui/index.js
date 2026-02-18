/**
 * AIOS Nexus - TUI Entry Point
 *
 * Terminal User Interface entry point
 * Version: 5.0.0
 */

const React = require('react');
const { render } = require('ink');
const App = require('./App');

function startTUI(options = {}) {
  const { waitUntilExit } = render(React.createElement(App, { initialState: options }));

  return waitUntilExit();
}

module.exports = { startTUI };

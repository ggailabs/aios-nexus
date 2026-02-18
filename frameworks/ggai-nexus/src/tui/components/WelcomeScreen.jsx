const React = require('react');
const { Box, Text } = require('ink');

const WelcomeScreen = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Box flexDirection="column" alignItems="center" justifyContent="center" height={20}>
      <Box borderStyle="round" borderColor="cyan" padding={2} marginBottom={1}>
        <Text bold color="cyan">
          🌍 GGAI Nexus Setup
        </Text>
      </Box>
      <Text color="gray">Loading...</Text>
    </Box>
  );
};

module.exports = { WelcomeScreen };

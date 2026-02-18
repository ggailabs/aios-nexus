const React = require('react');
const {
  Box,
  Text,
  useApp
} = require('ink');
const WelcomeScreen = ({
  onComplete
}) => {
  const {
    exit
  } = useApp();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 20
  }, /*#__PURE__*/React.createElement(Box, {
    borderStyle: "round",
    borderColor: "cyan",
    padding: 2,
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    bold: true,
    color: "cyan"
  }, "\uD83C\uDF0D GGAI Nexus Setup")), /*#__PURE__*/React.createElement(Text, {
    color: "gray"
  }, "Loading..."));
};
module.exports = {
  WelcomeScreen
};
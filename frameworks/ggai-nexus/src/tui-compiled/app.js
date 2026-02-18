const React = require('react');
const {
  useState,
  useEffect
} = require('react');
const {
  render
} = require('ink');
const languageManager = require('../cli/languages');
const {
  WelcomeScreen
} = require('./components/WelcomeScreen');
const {
  LanguageScreen
} = require('./components/LanguageScreen');
const {
  IDEScreen
} = require('./components/IDEScreen');
const {
  ProjectTypeScreen
} = require('./components/ProjectTypeScreen');
const {
  AIScaffoldingScreen
} = require('./components/AIScaffoldingScreen');
const {
  AnalysisScreen
} = require('./components/AnalysisScreen');
const {
  PreviewScreen
} = require('./components/PreviewScreen');
const {
  CompleteScreen
} = require('./components/CompleteScreen');
const SCREENS = {
  WELCOME: 'welcome',
  LANGUAGE: 'language',
  IDE: 'ide',
  PROJECT_TYPE: 'project_type',
  AI_SCAFFOLDING: 'ai_scaffolding',
  ANALYSIS: 'analysis',
  PREVIEW: 'preview',
  COMPLETE: 'complete'
};
class TUIApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: SCREENS.WELCOME,
      config: {
        language: 'en-US',
        ide: null,
        projectType: null,
        useAI: true
      },
      projectInfo: null,
      generationResult: null
    };
  }
  componentDidMount() {
    // Auto-advance from welcome after a short delay
    setTimeout(() => {
      this.navigateToScreen(SCREENS.LANGUAGE);
    }, 1000);
  }
  navigateToScreen(screen) {
    this.setState({
      currentScreen: screen
    });
  }
  updateConfig(updates) {
    this.setState(prevState => ({
      config: {
        ...prevState.config,
        ...updates
      }
    }));
  }
  setProjectInfo(projectInfo) {
    this.setState({
      projectInfo
    });
  }
  setGenerationResult(result) {
    this.setState({
      generationResult: result
    });
  }
  renderScreen() {
    const {
      currentScreen,
      config,
      projectInfo,
      generationResult
    } = this.state;
    switch (currentScreen) {
      case SCREENS.WELCOME:
        return /*#__PURE__*/React.createElement(WelcomeScreen, {
          onComplete: () => this.navigateToScreen(SCREENS.LANGUAGE)
        });
      case SCREENS.LANGUAGE:
        return /*#__PURE__*/React.createElement(LanguageScreen, {
          selectedLanguage: config.language,
          onLanguageSelect: language => {
            languageManager.loadLanguage(language);
            this.updateConfig({
              language
            });
            this.navigateToScreen(SCREENS.IDE);
          }
        });
      case SCREENS.IDE:
        return /*#__PURE__*/React.createElement(IDEScreen, {
          selectedIDE: config.ide,
          onIDESelect: ide => {
            this.updateConfig({
              ide
            });
            this.navigateToScreen(SCREENS.PROJECT_TYPE);
          },
          onBack: () => this.navigateToScreen(SCREENS.LANGUAGE)
        });
      case SCREENS.PROJECT_TYPE:
        return /*#__PURE__*/React.createElement(ProjectTypeScreen, {
          selectedType: config.projectType,
          onTypeSelect: projectType => {
            this.updateConfig({
              projectType
            });
            this.navigateToScreen(SCREENS.AI_SCAFFOLDING);
          },
          onBack: () => this.navigateToScreen(SCREENS.IDE)
        });
      case SCREENS.AI_SCAFFOLDING:
        return /*#__PURE__*/React.createElement(AIScaffoldingScreen, {
          useAI: config.useAI,
          onAISelect: useAI => {
            this.updateConfig({
              useAI
            });
            this.navigateToScreen(SCREENS.ANALYSIS);
          },
          onBack: () => this.navigateToScreen(SCREENS.PROJECT_TYPE)
        });
      case SCREENS.ANALYSIS:
        return /*#__PURE__*/React.createElement(AnalysisScreen, {
          config: config,
          onComplete: projectInfo => {
            this.setProjectInfo(projectInfo);
            this.navigateToScreen(SCREENS.PREVIEW);
          },
          onBack: () => this.navigateToScreen(SCREENS.AI_SCAFFOLDING)
        });
      case SCREENS.PREVIEW:
        return /*#__PURE__*/React.createElement(PreviewScreen, {
          projectInfo: projectInfo,
          config: config,
          onGenerate: async () => {
            // Generate content
            const {
              ContentGenerator
            } = require('../core/generator');
            const generator = new ContentGenerator(config);
            const result = await generator.generate(projectInfo);
            this.setGenerationResult(result);
            this.navigateToScreen(SCREENS.COMPLETE);
          },
          onCustomize: () => {
            // TODO: Implement customization
            console.log('Customization not implemented yet');
          },
          onBack: () => this.navigateToScreen(SCREENS.ANALYSIS)
        });
      case SCREENS.COMPLETE:
        return /*#__PURE__*/React.createElement(CompleteScreen, {
          result: generationResult,
          config: config,
          onFinish: () => {
            process.exit(0);
          },
          onViewFiles: () => {
            // TODO: Implement file viewer
            console.log('File viewer not implemented yet');
          }
        });
      default:
        return null;
    }
  }
  render() {
    return this.renderScreen();
  }
}

// Handle uncaught errors
process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Render the app
render(/*#__PURE__*/React.createElement(TUIApp, null));
module.exports = {
  TUIApp,
  SCREENS
};
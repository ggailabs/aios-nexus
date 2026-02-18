const React = require('react');
const { useState, useEffect } = require('react');
const { render } = require('ink');

const languageManager = require('../cli/languages');
const { WelcomeScreen } = require('./components/WelcomeScreen');
const { LanguageScreen } = require('./components/LanguageScreen');
const { IDEScreen } = require('./components/IDEScreen');
const { ProjectTypeScreen } = require('./components/ProjectTypeScreen');
const { AIScaffoldingScreen } = require('./components/AIScaffoldingScreen');
const { AnalysisScreen } = require('./components/AnalysisScreen');
const { PreviewScreen } = require('./components/PreviewScreen');
const { CompleteScreen } = require('./components/CompleteScreen');

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

const TUIApp = () => {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.LANGUAGE);
  const [config, setConfig] = useState({
    language: 'en-US',
    ide: null,
    projectType: null,
    useAI: true
  });
  const [projectInfo, setProjectInfo] = useState(null);
  const [generationResult, setGenerationResult] = useState(null);

  const updateConfig = (updates) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.WELCOME:
        return (
          <WelcomeScreen
            onComplete={() => setCurrentScreen(SCREENS.LANGUAGE)}
          />
        );

      case SCREENS.LANGUAGE:
        return (
          <LanguageScreen
            selectedLanguage={config.language}
            onLanguageSelect={(language) => {
              languageManager.loadLanguage(language);
              updateConfig({ language });
              setCurrentScreen(SCREENS.IDE);
            }}
          />
        );

      case SCREENS.IDE:
        return (
          <IDEScreen
            selectedIDE={config.ide}
            onIDESelect={(ide) => {
              updateConfig({ ide });
              setCurrentScreen(SCREENS.PROJECT_TYPE);
            }}
            onBack={() => setCurrentScreen(SCREENS.LANGUAGE)}
          />
        );

      case SCREENS.PROJECT_TYPE:
        return (
          <ProjectTypeScreen
            selectedType={config.projectType}
            onTypeSelect={(projectType) => {
              updateConfig({ projectType });
              setCurrentScreen(SCREENS.AI_SCAFFOLDING);
            }}
            onBack={() => setCurrentScreen(SCREENS.IDE)}
          />
        );

      case SCREENS.AI_SCAFFOLDING:
        return (
          <AIScaffoldingScreen
            useAI={config.useAI}
            onAISelect={(useAI) => {
              updateConfig({ useAI });
              setCurrentScreen(SCREENS.ANALYSIS);
            }}
            onBack={() => setCurrentScreen(SCREENS.PROJECT_TYPE)}
          />
        );

      case SCREENS.ANALYSIS:
        return (
          <AnalysisScreen
            config={config}
            onComplete={(projectInfo) => {
              setProjectInfo(projectInfo);
              setCurrentScreen(SCREENS.PREVIEW);
            }}
            onBack={() => setCurrentScreen(SCREENS.AI_SCAFFOLDING)}
          />
        );

      case SCREENS.PREVIEW:
        return (
          <PreviewScreen
            projectInfo={projectInfo}
            config={config}
            onGenerate={async () => {
              // Generate content
              const { ContentGenerator } = require('../core/generator');
              const generator = new ContentGenerator(config);
              const result = await generator.generate(projectInfo);
              setGenerationResult(result);
              setCurrentScreen(SCREENS.COMPLETE);
            }}
            onCustomize={() => {
              // TODO: Implement customization
              console.log('Customization not implemented yet');
            }}
            onBack={() => setCurrentScreen(SCREENS.ANALYSIS)}
          />
        );

      case SCREENS.COMPLETE:
        return (
          <CompleteScreen
            result={generationResult}
            config={config}
            onFinish={() => {
              process.exit(0);
            }}
            onViewFiles={() => {
              // TODO: Implement file viewer
              console.log('File viewer not implemented yet');
            }}
          />
        );

      default:
        return <WelcomeScreen onComplete={() => setCurrentScreen(SCREENS.LANGUAGE)} />;
    }
  };

  return renderScreen();
};

// Start the TUI app
render(<TUIApp />);

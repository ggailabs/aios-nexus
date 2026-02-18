const React = require('react');
const { useState, useEffect } = require('react');
const { Box, Text, useInput, useApp } = require('ink');

const languageManager = require('../../cli/languages');
const { IDEDetector } = require('../../core/detector');

const AnalysisScreen = ({ config, onComplete, onBack }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('scanning');
  const [projectInfo, setProjectInfo] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const { exit } = useApp();

  const steps = [
    { key: 'scanning', label: 'Scanning files', duration: 2000 },
    { key: 'detecting', label: 'Detecting patterns', duration: 1500 },
    { key: 'generating', label: 'Generating content', duration: 2500 }
  ];

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        // Step 1: Scanning files
        setCurrentStep('scanning');
        setProgress(20);
        await new Promise(resolve => setTimeout(resolve, steps[0].duration));

        // Step 2: Detecting patterns
        setCurrentStep('detecting');
        setProgress(60);
        
        // Actually analyze the project
        const detector = new IDEDetector();
        const info = await detector.analyzeProject(process.cwd());
        setProjectInfo(info);
        
        await new Promise(resolve => setTimeout(resolve, steps[1].duration));

        // Step 3: Generating content
        setCurrentStep('generating');
        setProgress(90);
        await new Promise(resolve => setTimeout(resolve, steps[2].duration));

        // Complete
        setProgress(100);
        setIsComplete(true);

        // Auto-advance after a short delay
        setTimeout(() => {
          onComplete(projectInfo);
        }, 1000);

      } catch (error) {
        console.error('Analysis failed:', error);
        // Could add error state handling here
      }
    };

    runAnalysis();
  }, [config, onComplete]);

  useInput((input, key) => {
    if (key.escape) {
      exit();
    }

    if (key.leftArrow && !isComplete) {
      onBack();
    }

    if (key.return && isComplete) {
      onComplete(projectInfo);
    }
  });

  const getProgressBar = (percentage) => {
    const totalWidth = 40;
    const filledWidth = Math.round((percentage / 100) * totalWidth);
    const emptyWidth = totalWidth - filledWidth;
    return '█'.repeat(filledWidth) + '░'.repeat(emptyWidth);
  };

  const currentStepInfo = steps.find(step => step.key === currentStep);

  return (
    <Box flexDirection="column" alignItems="center" height={20}>
      <Box borderStyle="round" borderColor="cyan" padding={2} marginBottom={1}>
        <Text bold color="cyan">
          🔍 Analyzing Codebase
        </Text>
      </Box>

      <Box flexDirection="column" alignItems="left" marginBottom={2}>
        <Box marginBottom={1}>
          <Text>
            {currentStepInfo?.label}... {getProgressBar(progress)} {progress}%
          </Text>
        </Box>

        {projectInfo && (
          <Box flexDirection="column" marginTop={1}>
            <Text color="green">Found: {projectInfo.frameworks?.join(', ') || 'Unknown'}</Text>
            <Text>Structure: {projectInfo.structure?.join(', ') || 'No structure detected'}</Text>
            <Text>Dependencies: {projectInfo.dependencies?.slice(0, 3).join(', ') || 'No dependencies'}{projectInfo.dependencies?.length > 3 ? '...' : ''}</Text>
          </Box>
        )}
      </Box>

      <Box>
        <Text color="gray">
          Press [Ctrl+C] to cancel
        </Text>
      </Box>

      {isComplete && (
        <Box marginTop={1}>
          <Text color="green">
            Press [Enter] to continue
          </Text>
        </Box>
      )}
    </Box>
  );
};

module.exports = { AnalysisScreen };

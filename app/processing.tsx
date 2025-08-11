import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ProcessingScreen() {
  const router = useRouter();
  const [spinValue] = useState(new Animated.Value(0));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start the loading animation
    const spin = () => {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    spin();

    // Simulate processing steps
    const steps = [
      { message: 'Uploading image...', duration: 1000 },
      { message: 'Analyzing receipt...', duration: 2000 },
      { message: 'Processing OCR...', duration: 1500 },
      { message: 'Calculating sustainability score...', duration: 1000 },
      { message: 'Finding alternatives...', duration: 1500 },
    ];

    let currentStep = 0;
    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);

    const processSteps = () => {
      let elapsed = 0;
      
      const timer = setInterval(() => {
        elapsed += 100;
        const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
        setProgress(progressPercent);

        if (elapsed >= totalDuration) {
          clearInterval(timer);
          // Navigate to results after processing is complete
          setTimeout(() => {
            router.replace('/results' as any);
          }, 500);
        }
      }, 100);
    };

    processSteps();

    return () => {
      spinValue.setValue(0);
    };
  }, [router, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getProcessingMessage = () => {
    if (progress < 15) return 'Uploading image...';
    if (progress < 40) return 'Analyzing receipt...';
    if (progress < 65) return 'Processing OCR...';
    if (progress < 85) return 'Calculating sustainability score...';
    return 'Finding alternatives...';
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Processing Animation */}
        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.spinnerContainer,
              { transform: [{ rotate: spin }] }
            ]}
          >
            <IconSymbol name="arrow.2.circlepath" size={64} color="#059669" />
          </Animated.View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>

        {/* Processing Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.title}>Processing Receipt</Text>
          <Text style={styles.message}>{getProcessingMessage()}</Text>
          <Text style={styles.subtitle}>
            We're analyzing your receipt to calculate its environmental impact and find sustainable alternatives.
          </Text>
        </View>

        {/* Steps Indicator */}
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={[
              styles.stepIndicator,
              progress > 0 && styles.stepCompleted
            ]}>
              <IconSymbol 
                name={progress > 15 ? "checkmark" : "photo"} 
                size={16} 
                color={progress > 15 ? "white" : "#059669"} 
              />
            </View>
            <Text style={styles.stepText}>Upload</Text>
          </View>

          <View style={styles.stepLine} />

          <View style={styles.step}>
            <View style={[
              styles.stepIndicator,
              progress > 40 && styles.stepCompleted
            ]}>
              <IconSymbol 
                name={progress > 40 ? "checkmark" : "doc.text.magnifyingglass"} 
                size={16} 
                color={progress > 40 ? "white" : "#059669"} 
              />
            </View>
            <Text style={styles.stepText}>Analyze</Text>
          </View>

          <View style={styles.stepLine} />

          <View style={styles.step}>
            <View style={[
              styles.stepIndicator,
              progress > 85 && styles.stepCompleted
            ]}>
              <IconSymbol 
                name={progress > 85 ? "checkmark" : "leaf"} 
                size={16} 
                color={progress > 85 ? "white" : "#059669"} 
              />
            </View>
            <Text style={styles.stepText}>Score</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  animationContainer: {
    marginBottom: 48,
  },
  spinnerContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#D1FAE5',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 48,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  message: {
    fontSize: 18,
    fontWeight: '500',
    color: '#059669',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  step: {
    alignItems: 'center',
  },
  stepIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    borderWidth: 2,
    borderColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepCompleted: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  stepText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
    marginBottom: 32,
  },
});

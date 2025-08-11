import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ResultsScreen() {
  const router = useRouter();
  const { scanId } = useLocalSearchParams();

  const { data: result, isLoading } = useQuery({
    queryKey: ["/api/scans", scanId],
    retry: false,
    enabled: !!scanId,
  });

  // Mock data for demonstration
  const mockResult = {
    id: scanId || 'mock-1',
    storeName: 'EcoMart',
    scannedAt: new Date().toISOString(),
    score: 72,
    items: [
      {
        name: 'Organic Bananas',
        category: 'Produce',
        sustainabilityScore: 85,
        impact: 'Low carbon footprint, organic farming',
        alternatives: []
      },
      {
        name: 'Plastic Water Bottles (24 pack)',
        category: 'Beverages',
        sustainabilityScore: 35,
        impact: 'High plastic waste, carbon emissions from transport',
        alternatives: [
          {
            name: 'Reusable Water Bottle + Filter',
            score: 90,
            reason: 'Eliminates single-use plastic, long-term cost savings'
          }
        ]
      },
      {
        name: 'Conventional Beef',
        category: 'Meat',
        sustainabilityScore: 25,
        impact: 'High greenhouse gas emissions, land use',
        alternatives: [
          {
            name: 'Plant-Based Protein',
            score: 80,
            reason: 'Lower carbon footprint, reduced land use'
          },
          {
            name: 'Grass-Fed Beef',
            score: 45,
            reason: 'Better farming practices, still high emissions'
          }
        ]
      }
    ],
    recommendations: [
      'Consider switching to reusable water bottles',
      'Try plant-based proteins 2-3 times per week',
      'Look for locally sourced produce when possible'
    ]
  };

  const data = (result || mockResult) as any;

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#059669';
    if (score >= 60) return '#D97706';
    return '#DC2626';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  if (isLoading && !mockResult) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading results...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="chevron.left" size={20} color="#6B7280" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Overall Score */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sustainability Score</Text>
          <View style={styles.scoreContainer}>
            <View style={[styles.scoreCircle, { borderColor: getScoreColor(data.score) }]}>
              <Text style={[styles.scoreNumber, { color: getScoreColor(data.score) }]}>
                {data.score}
              </Text>
            </View>
            <View style={styles.scoreInfo}>
              <Text style={[styles.scoreLabel, { color: getScoreColor(data.score) }]}>
                {getScoreLabel(data.score)}
              </Text>
              <Text style={styles.storeInfo}>
                {data.storeName} • {new Date(data.scannedAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Items Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Items Analysis</Text>
          <View style={styles.itemsList}>
            {data.items.map((item: any, index: number) => (
              <View key={index} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={[
                    styles.itemScore,
                    { backgroundColor: getScoreColor(item.sustainabilityScore) }
                  ]}>
                    <Text style={styles.itemScoreText}>{item.sustainabilityScore}</Text>
                  </View>
                </View>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemImpact}>{item.impact}</Text>
                
                {item.alternatives && item.alternatives.length > 0 && (
                  <View style={styles.alternativesContainer}>
                    <Text style={styles.alternativesTitle}>Sustainable Alternatives:</Text>
                    {item.alternatives.map((alt: any, altIndex: number) => (
                      <View key={altIndex} style={styles.alternative}>
                        <IconSymbol name="leaf.fill" size={16} color="#059669" />
                        <View style={styles.alternativeContent}>
                          <Text style={styles.alternativeName}>{alt.name}</Text>
                          <Text style={styles.alternativeReason}>{alt.reason}</Text>
                        </View>
                        <View style={styles.alternativeScore}>
                          <Text style={styles.alternativeScoreText}>{alt.score}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recommendations</Text>
          <View style={styles.recommendationsList}>
            {data.recommendations.map((rec: string, index: number) => (
              <View key={index} style={styles.recommendation}>
                <IconSymbol name="lightbulb.fill" size={20} color="#D97706" />
                <Text style={styles.recommendationText}>{rec}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/(tabs)/scan' as any)}
          >
            <IconSymbol name="camera.fill" size={20} color="white" />
            <Text style={styles.primaryButtonText}>Scan Another</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/(tabs)/' as any)}
          >
            <Text style={styles.secondaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 60,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontSize: 16,
    color: '#6B7280',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  storeInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  itemsList: {
    gap: 16,
  },
  itemCard: {
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  itemScore: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 32,
    alignItems: 'center',
  },
  itemScoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  itemCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  itemImpact: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  alternativesContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  alternativesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  alternative: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  alternativeContent: {
    flex: 1,
  },
  alternativeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  alternativeReason: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  alternativeScore: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#059669',
  },
  alternativeScoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#059669',
  },
  recommendationsList: {
    gap: 16,
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  recommendationText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    flex: 1,
  },
  actionsContainer: {
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
});

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ExploreScreen() {
  const tips = [
    {
      icon: 'leaf.fill',
      title: 'Choose Reusable Products',
      description: 'Opt for reusable water bottles, shopping bags, and containers to reduce single-use plastic waste.',
      impact: 'Reduces plastic waste by up to 80%'
    },
    {
      icon: 'cart.fill',
      title: 'Buy Local & Seasonal',
      description: 'Purchase locally grown, seasonal produce to reduce transportation emissions and support local farmers.',
      impact: 'Cuts carbon footprint by 15-30%'
    },
    {
      icon: 'drop.fill',
      title: 'Reduce Food Waste',
      description: 'Plan meals, store food properly, and use leftovers creatively to minimize food waste.',
      impact: 'Saves 1,500 lbs CO2 per year'
    },
    {
      icon: 'bolt.fill',
      title: 'Energy Efficient Appliances',
      description: 'Choose ENERGY STAR certified appliances and LED bulbs to reduce energy consumption.',
      impact: 'Reduces energy use by 25-50%'
    },
    {
      icon: 'car.fill',
      title: 'Sustainable Transportation',
      description: 'Walk, bike, use public transport, or carpool to reduce personal transportation emissions.',
      impact: 'Saves 2.6 tons CO2 per year'
    },
    {
      icon: 'tshirt.fill',
      title: 'Mindful Fashion',
      description: 'Buy quality clothing that lasts, shop secondhand, and donate clothes you no longer wear.',
      impact: 'Reduces textile waste by 70%'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Sustainability Tips</Text>
          <Text style={styles.subtitle}>
            Small changes, big impact. Learn how to make your lifestyle more sustainable.
          </Text>
        </View>

        {/* Tips Grid */}
        <View style={styles.tipsContainer}>
          {tips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <View style={styles.tipHeader}>
                <View style={styles.iconContainer}>
                  <IconSymbol name={tip.icon as any} size={24} color="#059669" />
                </View>
                <Text style={styles.tipTitle}>{tip.title}</Text>
              </View>
              <Text style={styles.tipDescription}>{tip.description}</Text>
              <View style={styles.impactContainer}>
                <IconSymbol name="chart.line.uptrend.xyaxis" size={16} color="#D97706" />
                <Text style={styles.impactText}>{tip.impact}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom CTA */}
        <View style={styles.ctaContainer}>
          <View style={styles.ctaCard}>
            <IconSymbol name="globe.americas.fill" size={48} color="#059669" />
            <Text style={styles.ctaTitle}>Track Your Impact</Text>
            <Text style={styles.ctaDescription}>
              Use EcoScan to track your shopping habits and discover how your choices affect the environment.
            </Text>
          </View>
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  tipsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  tipCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F0FDF4',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  tipDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
  impactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  impactText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#92400E',
  },
  ctaContainer: {
    marginTop: 16,
  },
  ctaCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});

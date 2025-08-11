import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HistoryScreen() {
  const router = useRouter();

  const { data: scans, isLoading } = useQuery({
    queryKey: ["/api/scans"],
    retry: false,
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="chevron.left" size={20} color="#6B7280" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Scan History</Text>
        </View>

        {/* Scans List */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={styles.loadingScanItem}>
                  <View style={styles.loadingAvatar} />
                  <View style={styles.loadingContent}>
                    <View style={styles.loadingTitle} />
                    <View style={styles.loadingSubtitle} />
                  </View>
                  <View style={styles.loadingScore} />
                </View>
              ))}
            </View>
          ) : scans && (scans as any[]).length > 0 ? (
            <View style={styles.scansList}>
              {(scans as any[]).map((scan: any) => (
                <TouchableOpacity 
                  key={scan.id} 
                  style={styles.scanItem}
                  onPress={() => router.push(`/results/${scan.id}` as any)}
                >
                  <View style={styles.scanIcon}>
                    <IconSymbol name="doc.text" size={20} color="#059669" />
                  </View>
                  <View style={styles.scanContent}>
                    <Text style={styles.scanStore}>
                      {scan.storeName || 'Unknown Store'}
                    </Text>
                    <Text style={styles.scanDate}>
                      {new Date(scan.scannedAt).toLocaleDateString()}
                    </Text>
                    <Text style={styles.scanTime}>
                      {new Date(scan.scannedAt).toLocaleTimeString()}
                    </Text>
                  </View>
                  <View style={styles.scoreContainer}>
                    <Text style={[
                      styles.scanScore,
                      scan.score >= 80 ? styles.scoreHigh :
                      scan.score >= 60 ? styles.scoreMedium :
                      styles.scoreLow
                    ]}>
                      {scan.score}
                    </Text>
                    <Text style={styles.scoreLabel}>Score</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <IconSymbol name="doc.text" size={64} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No scans yet</Text>
              <Text style={styles.emptySubtitle}>
                Start by scanning your first receipt to see your history here.
              </Text>
              <TouchableOpacity 
                style={styles.scanButton}
                onPress={() => router.push('/(tabs)/scan' as any)}
              >
                <IconSymbol name="camera.fill" size={20} color="white" />
                <Text style={styles.scanButtonText}>Scan Receipt</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
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
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  backText: {
    fontSize: 16,
    color: '#6B7280',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    gap: 12,
  },
  loadingScanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  loadingAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#E5E7EB',
    borderRadius: 24,
  },
  loadingContent: {
    flex: 1,
    gap: 4,
  },
  loadingTitle: {
    width: 120,
    height: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  loadingSubtitle: {
    width: 80,
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  loadingScore: {
    width: 40,
    height: 32,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  scansList: {
    gap: 12,
    paddingBottom: 24,
  },
  scanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  scanIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F0FDF4',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanContent: {
    flex: 1,
  },
  scanStore: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  scanDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 1,
  },
  scanTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scanScore: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  scoreHigh: {
    color: '#059669',
  },
  scoreMedium: {
    color: '#D97706',
  },
  scoreLow: {
    color: '#DC2626',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  scanButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

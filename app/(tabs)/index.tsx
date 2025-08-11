import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useEffect } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/stats"],
    retry: false,
    enabled: isAuthenticated,
  });

  const { data: recentScans, isLoading: scansLoading } = useQuery({
    queryKey: ["/api/scans"],
    retry: false,
    enabled: isAuthenticated,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Welcome Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to EcoScan</Text>
        <Text style={styles.subtitle}>
          Scan your receipts to discover the environmental impact of your purchases and get sustainable alternatives.
        </Text>
        
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.scansCard]}>
            <Text style={styles.statNumber}>
              {statsLoading ? '...' : (stats as any)?.totalScans || 0}
            </Text>
            <Text style={styles.statLabel}>Scans</Text>
          </View>
          <View style={[styles.statCard, styles.scoreCard]}>
            <Text style={styles.statNumber}>
              {statsLoading ? '...' : (stats as any)?.avgScore || 0}
            </Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>
        </View>

        {/* Scan Button */}
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={() => router.push('/(tabs)/scan')}
        >
          <IconSymbol name="camera.fill" size={20} color="white" />
          <Text style={styles.scanButtonText}>Scan Receipt</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Scans */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {scansLoading ? (
          <View style={styles.loadingScans}>
            {[1, 2, 3].map((i) => (
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
        ) : recentScans && (recentScans as any[]).length > 0 ? (
          <View style={styles.scansList}>
            {(recentScans as any[]).slice(0, 3).map((scan: any) => (
              <TouchableOpacity 
                key={scan.id} 
                style={styles.scanItem}
                onPress={() => router.push(`/results/${scan.id}`)}
              >
                <View style={styles.scanIcon}>
                  <IconSymbol name="doc.text" size={16} color="#059669" />
                </View>
                <View style={styles.scanContent}>
                  <Text style={styles.scanStore}>
                    {scan.storeName || 'Unknown Store'}
                  </Text>
                  <Text style={styles.scanDate}>
                    {new Date(scan.scannedAt).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={[
                  styles.scanScore,
                  scan.score >= 80 ? styles.scoreHigh :
                  scan.score >= 60 ? styles.scoreMedium :
                  styles.scoreLow
                ]}>
                  {scan.score}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <IconSymbol name="doc.text" size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No scans yet</Text>
            <Text style={styles.emptySubtitle}>Start by scanning your first receipt!</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  content: {
    padding: 16,
    paddingTop: 60,
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
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  scansCard: {
    backgroundColor: '#F0FDF4',
  },
  scoreCard: {
    backgroundColor: '#EFF6FF',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  scanButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  viewAllButton: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingScans: {
    gap: 12,
  },
  loadingScanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    gap: 12,
  },
  loadingAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
  },
  loadingContent: {
    flex: 1,
    gap: 4,
  },
  loadingTitle: {
    width: 96,
    height: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  loadingSubtitle: {
    width: 64,
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  loadingScore: {
    width: 32,
    height: 24,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  scansList: {
    gap: 12,
  },
  scanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    gap: 12,
  },
  scanIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanContent: {
    flex: 1,
  },
  scanStore: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  scanDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  scanScore: {
    fontSize: 18,
    fontWeight: 'bold',
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
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

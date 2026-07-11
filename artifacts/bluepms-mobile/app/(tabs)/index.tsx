import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

const STATS = [
  {
    icon: 'grid' as const,
    title: '17 operating modules',
    subtitle: 'Across major hotel operating areas',
  },
  {
    icon: 'play-circle' as const,
    title: 'Workflow walkthroughs',
    subtitle: 'Step-by-step review paths for key workflows',
  },
  {
    icon: 'bar-chart-2' as const,
    title: 'Reports built into modules',
    subtitle: 'Contextual reporting across operating modules',
  },
  {
    icon: 'shield' as const,
    title: 'Product-led proof',
    subtitle: 'Real screens and workflows your team can review',
  },
];

const TRUST_ITEMS = [
  {
    title: 'No black box',
    body: 'See the real product, real screens, and real workflows before signing anything.',
  },
  {
    title: 'Pricing before the call',
    body: 'A regional scope estimator shows indicative annual cost without waiting for a quote.',
  },
  {
    title: 'Implementation clarity',
    body: 'A documented rollout path from discovery to go-live so every department knows the plan.',
  },
  {
    title: 'Engineering you can trust',
    body: 'Built on Microsoft Azure, Dynamics 365, and SQL Server by a team with platform-scale experience.',
  },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';

  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : insets.bottom;

  const openDemo = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL('https://bluepms.com/');
  };

  const openWalkthroughs = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL('https://bluepms.com/');
  };

  const goToModules = () => {
    Haptics.selectionAsync();
    router.push('/(tabs)/modules');
  };

  const goToPlatform = () => {
    Haptics.selectionAsync();
    router.push('/(tabs)/platform');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPad + 16, paddingBottom: bottomPad + 80 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={[styles.logoBox, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoLetter}>B</Text>
          </View>
          <View>
            <Text style={[styles.logoTitle, { color: colors.text }]}>BluePMS</Text>
            <Text style={[styles.logoSubtitle, { color: colors.mutedForeground }]}>HOSPITALITY ERP</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.demoBtn, { backgroundColor: colors.primary }]}
          onPress={openDemo}
          activeOpacity={0.85}
        >
          <Feather name="calendar" size={14} color="#fff" />
          <Text style={styles.demoBtnText}>Book Demo</Text>
        </TouchableOpacity>
      </View>

      {/* Hero */}
      <View style={styles.heroSection}>
        <View style={[styles.accentBar, { backgroundColor: colors.accent }]} />
        <Text style={[styles.heroHeading, { color: colors.text }]}>
          One command center for your hotel.
        </Text>
        <Text style={[styles.heroBody, { color: colors.mutedForeground }]}>
          BluePMS brings rooms, outlets, events, inventory, purchase, finance, CRM, communications, AI, transport, hostel, payroll, and reporting into one hotel operating system your team can inspect in detail.
        </Text>

        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={openWalkthroughs}
            activeOpacity={0.85}
          >
            <Feather name="play-circle" size={15} color="#fff" />
            <Text style={styles.primaryBtnText}>Open Walkthroughs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.outlineBtn, { borderColor: colors.border, backgroundColor: colors.surface }]}
            onPress={goToModules}
            activeOpacity={0.8}
          >
            <Feather name="grid" size={15} color={colors.navy} />
            <Text style={[styles.outlineBtnText, { color: colors.navy }]}>Inspect Modules</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.linkRow} onPress={goToPlatform} activeOpacity={0.7}>
          <Text style={[styles.linkText, { color: colors.primary }]}>See Platform</Text>
          <Feather name="arrow-right" size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View style={[styles.statsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {STATS.map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.statItem,
              idx < STATS.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
          >
            <View style={[styles.statIconWrap, { backgroundColor: colors.tintLight }]}>
              <Feather name={item.icon} size={18} color={colors.primary} />
            </View>
            <View style={styles.statText}>
              <Text style={[styles.statTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.statSubtitle, { color: colors.mutedForeground }]}>{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Trust Section */}
      <View style={styles.trustSection}>
        <Text style={[styles.sectionHeading, { color: colors.text }]}>
          Why hotel teams can trust BluePMS before the sales call.
        </Text>
        <View style={styles.trustGrid}>
          {TRUST_ITEMS.map((item, idx) => (
            <View
              key={idx}
              style={[styles.trustCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <View style={[styles.trustDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.trustTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.trustBody, { color: colors.mutedForeground }]}>{item.body}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Banner */}
      <View style={[styles.ctaBanner, { backgroundColor: colors.navy }]}>
        <Text style={styles.ctaBannerTitle}>Ready to evaluate BluePMS?</Text>
        <Text style={styles.ctaBannerBody}>
          Explore the product yourself before your first sales conversation.
        </Text>
        <TouchableOpacity
          style={[styles.ctaBannerBtn, { backgroundColor: colors.primary }]}
          onPress={openDemo}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaBannerBtnText}>Book a Demo</Text>
          <Feather name="arrow-right" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  logoTitle: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    lineHeight: 18,
  },
  logoSubtitle: {
    fontSize: 9,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.5,
  },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  demoBtnText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  heroSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  accentBar: {
    width: 32,
    height: 3,
    borderRadius: 2,
    marginBottom: 16,
  },
  heroHeading: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    lineHeight: 40,
    marginBottom: 14,
  },
  heroBody: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
    marginBottom: 24,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 8,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 8,
    borderWidth: 1,
  },
  outlineBtnText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  statsCard: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 32,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statText: {
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 17,
  },
  trustSection: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  sectionHeading: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    lineHeight: 30,
    marginBottom: 20,
  },
  trustGrid: {
    gap: 12,
  },
  trustCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  trustDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  trustTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
  },
  trustBody: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  ctaBanner: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 12,
  },
  ctaBannerTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  ctaBannerBody: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 21,
    marginBottom: 20,
  },
  ctaBannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  ctaBannerBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});

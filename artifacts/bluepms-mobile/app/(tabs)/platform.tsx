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

const DATA_CORE_ENTITIES = [
  'Guest',
  'Reservation',
  'Room',
  'Folio',
  'Item',
  'Ledger',
  'Employee',
  'Supplier',
];

const PLATFORM_CARDS = [
  {
    icon: 'database' as const,
    title: 'Operating Data Core',
    body: 'One shared operating record across guests, inventory, financials, and people.',
  },
  {
    icon: 'git-merge' as const,
    title: 'Connected Workflows',
    body: 'End-to-end data flows across departments and connected systems.',
  },
  {
    icon: 'shield' as const,
    title: 'Governance & Control',
    body: 'Policies, approvals, security, audit, and data quality across all workflows.',
  },
  {
    icon: 'cpu' as const,
    title: 'Intelligence Layer',
    body: 'AI, analytics, and insights that learn from the entire hotel.',
  },
];

const WORKFLOW_STEPS = [
  { num: '1', label: 'Reservation' },
  { num: '2', label: 'Check-In' },
  { num: '3', label: 'Room Operations' },
  { num: '4', label: 'POS / SPA Charge' },
  { num: '5', label: 'Folio' },
  { num: '6', label: 'Checkout' },
  { num: '7', label: 'Accounts Receivable' },
  { num: '8', label: 'Reports' },
];

const PLATFORM_BENEFITS = [
  {
    title: 'No data silos',
    body: 'Every department works from the same live record — no re-entry, no sync delays, no reconciliation.',
  },
  {
    title: 'Real-time visibility',
    body: 'Occupancy, revenue, and operations are visible the moment they happen, not at end-of-day.',
  },
  {
    title: 'Built-in governance',
    body: 'Approval workflows, audit trails, and role-based access built into every module from day one.',
  },
  {
    title: 'AI across the whole hotel',
    body: 'The intelligence layer learns from the complete hotel record, not isolated module data.',
  },
];

export default function PlatformScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : insets.bottom;

  const openDemo = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL('https://bluepms.com/');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPad + 16, paddingBottom: bottomPad + 80 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={styles.heroSection}>
        <View style={[styles.badge, { backgroundColor: colors.tintLight }]}>
          <Feather name="layers" size={12} color={colors.primary} />
          <Text style={[styles.badgeText, { color: colors.primary }]}>CONNECTED HOTEL PLATFORM</Text>
        </View>
        <Text style={[styles.heroHeading, { color: colors.text }]}>
          One operating spine for the whole hotel.
        </Text>
        <Text style={[styles.heroBody, { color: colors.mutedForeground }]}>
          BluePMS keeps guest, room, folio, inventory, finance, communication, reporting, and AI connected so departments work from the same live operating record.
        </Text>

        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/(tabs)/modules')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Review Modules</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.outlineBtn, { borderColor: colors.border, backgroundColor: colors.surface }]}
            onPress={openDemo}
            activeOpacity={0.8}
          >
            <Feather name="calendar" size={14} color={colors.navy} />
            <Text style={[styles.outlineBtnText, { color: colors.navy }]}>Book Demo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Data Core diagram */}
      <View style={styles.diagramSection}>
        <View style={[styles.dataCoreCard, { backgroundColor: colors.navy }]}>
          <Text style={styles.dataCoreLabel}>Hotel Data Core</Text>
          <View style={[styles.dataCoreIconCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.dataCoreIconLetter}>B</Text>
          </View>
          <View style={styles.entityList}>
            {DATA_CORE_ENTITIES.map((e, idx) => (
              <View key={idx} style={styles.entityRow}>
                <View style={[styles.entityDot, { backgroundColor: colors.primary }]} />
                <Text style={styles.entityName}>{e}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Platform cards */}
      <View style={styles.cardsSection}>
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>PLATFORM COMPONENTS</Text>
        <View style={styles.cardsGrid}>
          {PLATFORM_CARDS.map((card, idx) => (
            <View
              key={idx}
              style={[styles.platformCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <View style={[styles.cardIconWrap, { backgroundColor: colors.tintLight }]}>
                <Feather name={card.icon} size={20} color={colors.primary} />
              </View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{card.title}</Text>
              <Text style={[styles.cardBody, { color: colors.mutedForeground }]}>{card.body}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Connected Workflow */}
      <View style={styles.workflowSection}>
        <Text style={[styles.sectionHeading, { color: colors.text }]}>
          Connected workflows prove the platform.
        </Text>
        <Text style={[styles.sectionBody, { color: colors.mutedForeground }]}>
          One stay moves through operations, service, finance, and reporting without becoming separate work in separate tools.
        </Text>

        <View style={[styles.workflowCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.workflowScroll}>
            <View style={styles.workflowSteps}>
              {WORKFLOW_STEPS.map((step, idx) => (
                <View key={idx} style={styles.workflowStepItem}>
                  <View style={[styles.workflowStepNum, { backgroundColor: colors.primary }]}>
                    <Text style={styles.workflowStepNumText}>{step.num}</Text>
                  </View>
                  <Text style={[styles.workflowStepLabel, { color: colors.text }]}>{step.label}</Text>
                  {idx < WORKFLOW_STEPS.length - 1 && (
                    <View style={[styles.workflowArrow, { backgroundColor: colors.border }]} />
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={[styles.workflowNote, { borderTopColor: colors.border }]}>
            <Feather name="info" size={13} color={colors.primary} />
            <Text style={[styles.workflowNoteText, { color: colors.mutedForeground }]}>
              One stay — one record — across all 8 workflow stages.
            </Text>
          </View>
        </View>
      </View>

      {/* Benefits */}
      <View style={styles.benefitsSection}>
        <Text style={[styles.sectionHeading, { color: colors.text }]}>
          What the platform delivers.
        </Text>
        <View style={styles.benefitsGrid}>
          {PLATFORM_BENEFITS.map((b, idx) => (
            <View
              key={idx}
              style={[styles.benefitCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <View style={[styles.benefitDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.benefitTitle, { color: colors.text }]}>{b.title}</Text>
              <Text style={[styles.benefitBody, { color: colors.mutedForeground }]}>{b.body}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
  },
  heroHeading: {
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    lineHeight: 38,
    marginBottom: 14,
  },
  heroBody: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
    marginBottom: 22,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  primaryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  outlineBtnText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  diagramSection: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  dataCoreCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  dataCoreLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
    marginBottom: 14,
  },
  dataCoreIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dataCoreIconLetter: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  entityList: {
    gap: 6,
    width: '100%',
  },
  entityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 6,
  },
  entityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  entityName: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  cardsSection: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
    marginBottom: 14,
  },
  cardsGrid: {
    gap: 10,
  },
  platformCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  cardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  workflowSection: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  sectionHeading: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    lineHeight: 29,
    marginBottom: 10,
  },
  sectionBody: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
    marginBottom: 16,
  },
  workflowCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  workflowScroll: {
    padding: 16,
  },
  workflowSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
    paddingBottom: 4,
  },
  workflowStepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workflowStepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workflowStepNumText: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  workflowStepLabel: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    marginHorizontal: 6,
  },
  workflowArrow: {
    width: 16,
    height: 1,
    marginRight: 4,
  },
  workflowNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    padding: 12,
  },
  workflowNoteText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  benefitsSection: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  benefitsGrid: {
    gap: 10,
    marginTop: 14,
  },
  benefitCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  benefitDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  benefitTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
  },
  benefitBody: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
});

import React, { useState } from 'react';
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

type PhaseKey = 'discovery' | 'configure' | 'test' | 'golive';

const PHASES: { key: PhaseKey; label: string }[] = [
  { key: 'discovery', label: 'Discovery' },
  { key: 'configure', label: 'Configure' },
  { key: 'test', label: 'Test' },
  { key: 'golive', label: 'Go live' },
];

const PHASE_CONTENT: Record<PhaseKey, { items: string[] }> = {
  discovery: {
    items: [
      'Property, rooms, rates, outlets, taxes, and users prepared',
      'Migration level confirmed before commercial commitment',
      'Department scenarios tested before the hotel switches over',
    ],
  },
  configure: {
    items: [
      'Hotel structure built in BluePMS — property, floors, rooms, rates',
      'All outlets, POS menus, and item catalogues configured',
      'User roles and approval workflows defined and tested',
      'Integrations to channel manager, payment gateway, and OTA mapped',
    ],
  },
  test: {
    items: [
      'Full reservation-to-checkout scenario tested in each department',
      'Reporting verified against expected outputs for each module',
      'Staff trained on daily operating workflows before go-live',
      'Data migration rehearsed with production dataset',
    ],
  },
  golive: {
    items: [
      'Supported cutover from legacy system on go-live day',
      '24x7 support active from day one of operations',
      'Weekly check-ins with implementation team during stabilisation',
      'Hypercare period with dedicated support for the first 30 days',
    ],
  },
};

const JOURNEY_STEPS = [
  {
    num: 1,
    title: 'Discovery',
    icon: 'search' as const,
    desc: 'Hotel structure, scope, and migration level confirmed before any commercial commitment. Departments understand what will change.',
    duration: '2–4 weeks',
  },
  {
    num: 2,
    title: 'Configuration',
    icon: 'settings' as const,
    desc: 'BluePMS configured to match your property, rooms, rates, outlets, integrations, users, and approval workflows.',
    duration: '4–8 weeks',
  },
  {
    num: 3,
    title: 'Data migration',
    icon: 'database' as const,
    desc: 'Guest history, reservations, folios, and master records migrated and verified. Migration level confirmed before commercial commitment.',
    duration: '2–4 weeks',
  },
  {
    num: 4,
    title: 'Department training',
    icon: 'users' as const,
    desc: 'Each department trained on their operating workflows before go-live. Scenario testing completed in all modules.',
    duration: '2–3 weeks',
  },
  {
    num: 5,
    title: 'Scenario testing',
    icon: 'check-square' as const,
    desc: 'Full reservation-to-checkout tested across all departments. Reports verified. Staff sign-off before live switch.',
    duration: '1–2 weeks',
  },
  {
    num: 6,
    title: 'Supported go-live',
    icon: 'zap' as const,
    desc: 'Cutover supported by the implementation team on go-live day. 24x7 support active from day one of operations.',
    duration: 'Go-live day',
  },
];

const ROLLOUT_BENEFITS = [
  {
    icon: 'eye' as const,
    title: 'No surprises on go-live day',
    body: 'Every department knows the plan, the timeline, and who is responsible before you commit.',
  },
  {
    icon: 'check-circle' as const,
    title: 'Migration confirmed before you sign',
    body: 'The migration level is assessed in discovery and confirmed in writing before commercial commitment.',
  },
  {
    icon: 'clock' as const,
    title: 'Structured timeline by department',
    body: 'Each step has a defined duration and owner so you can plan around the implementation.',
  },
  {
    icon: 'headphones' as const,
    title: '24x7 support from day one',
    body: 'A full support plan is confirmed in your quote — no post-sale uncertainty on coverage or SLA.',
  },
];

export default function ImplementationScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : insets.bottom;

  const [activePhase, setActivePhase] = useState<PhaseKey>('discovery');

  const selectPhase = (key: PhaseKey) => {
    Haptics.selectionAsync();
    setActivePhase(key);
  };

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
          <Text style={[styles.badgeText, { color: colors.primary }]}>IMPLEMENTATION</Text>
        </View>
        <Text style={[styles.heroHeading, { color: colors.text }]}>
          A clear path from product review to hotel go-live.
        </Text>
        <Text style={[styles.heroBody, { color: colors.mutedForeground }]}>
          BluePMS implementation is organized around discovery, configuration, migration, department training, scenario testing, and supported go-live.
        </Text>
      </View>

      {/* Rollout Proof Card */}
      <View style={[styles.rolloutCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.rolloutCardHeader}>
          <View style={[styles.rolloutBadge, { backgroundColor: colors.tintLight }]}>
            <Text style={[styles.rolloutBadgeText, { color: colors.primary }]}>ROLLOUT PROOF</Text>
          </View>
          <Text style={[styles.rolloutTitle, { color: colors.text }]}>
            Know the work before go-live week.
          </Text>
        </View>

        {/* Phase tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.phaseTabs}>
          <View style={styles.phaseTabsInner}>
            {PHASES.map((phase) => {
              const isActive = activePhase === phase.key;
              return (
                <TouchableOpacity
                  key={phase.key}
                  style={[
                    styles.phaseTab,
                    {
                      backgroundColor: isActive ? colors.primary : colors.background,
                      borderColor: isActive ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => selectPhase(phase.key)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.phaseTabText,
                      { color: isActive ? '#fff' : colors.mutedForeground },
                    ]}
                  >
                    {phase.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Phase content */}
        <View style={styles.phaseContent}>
          {PHASE_CONTENT[activePhase].items.map((item, idx) => (
            <View key={idx} style={styles.phaseItem}>
              <View style={[styles.phaseItemDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.phaseItemText, { color: colors.text }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Journey Steps */}
      <View style={styles.journeySection}>
        <Text style={[styles.journeyHeading, { color: colors.text }]}>Implementation journey</Text>
        <Text style={[styles.journeySubheading, { color: colors.mutedForeground }]}>
          A clear rollout path helps each department know what will change, what must be prepared, and when the hotel is ready to go live.
        </Text>

        <View style={styles.journeyList}>
          {JOURNEY_STEPS.map((step, idx) => (
            <View key={idx} style={styles.journeyRow}>
              <View style={styles.journeyLeft}>
                <View style={[styles.journeyNum, { backgroundColor: colors.accent }]}>
                  <Text style={styles.journeyNumText}>{step.num}</Text>
                </View>
                {idx < JOURNEY_STEPS.length - 1 && (
                  <View style={[styles.journeyLine, { backgroundColor: colors.border }]} />
                )}
              </View>
              <View style={[styles.journeyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <View style={styles.journeyCardHeader}>
                  <View style={[styles.journeyIconWrap, { backgroundColor: colors.tintLight }]}>
                    <Feather name={step.icon} size={16} color={colors.primary} />
                  </View>
                  <View style={styles.journeyTitleRow}>
                    <Text style={[styles.journeyTitle, { color: colors.text }]}>{step.title}</Text>
                    <View style={[styles.durationBadge, { backgroundColor: colors.tintLight }]}>
                      <Text style={[styles.durationText, { color: colors.primary }]}>{step.duration}</Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.journeyDesc, { color: colors.mutedForeground }]}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Benefits */}
      <View style={styles.benefitsSection}>
        <Text style={[styles.benefitsHeading, { color: colors.text }]}>Why this approach works.</Text>
        <View style={styles.benefitsGrid}>
          {ROLLOUT_BENEFITS.map((b, idx) => (
            <View
              key={idx}
              style={[styles.benefitCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <View style={[styles.benefitIconWrap, { backgroundColor: colors.tintLight }]}>
                <Feather name={b.icon} size={18} color={colors.primary} />
              </View>
              <Text style={[styles.benefitTitle, { color: colors.text }]}>{b.title}</Text>
              <Text style={[styles.benefitBody, { color: colors.mutedForeground }]}>{b.body}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA */}
      <View style={[styles.ctaBanner, { backgroundColor: colors.navy }]}>
        <Text style={styles.ctaTitle}>Start your discovery session</Text>
        <Text style={styles.ctaBody}>
          Book a demo to begin the discovery process and get a clear implementation plan before you commit.
        </Text>
        <TouchableOpacity style={[styles.ctaBtn, { backgroundColor: colors.primary }]} onPress={openDemo} activeOpacity={0.85}>
          <Text style={styles.ctaBtnText}>Book a Demo</Text>
          <Feather name="arrow-right" size={14} color="#fff" />
        </TouchableOpacity>
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
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 14,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
  },
  heroHeading: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    lineHeight: 36,
    marginBottom: 12,
  },
  heroBody: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
  },
  rolloutCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 28,
  },
  rolloutCardHeader: {
    padding: 16,
  },
  rolloutBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  rolloutBadgeText: {
    fontSize: 9,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
  },
  rolloutTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    lineHeight: 25,
  },
  phaseTabs: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  phaseTabsInner: {
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 12,
  },
  phaseTab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  phaseTabText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  phaseContent: {
    padding: 16,
    paddingTop: 4,
    gap: 10,
  },
  phaseItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  phaseItemDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginTop: 5,
    flexShrink: 0,
  },
  phaseItemText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
    flex: 1,
  },
  journeySection: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  journeyHeading: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  journeySubheading: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
    marginBottom: 20,
  },
  journeyList: {
    gap: 0,
  },
  journeyRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  journeyLeft: {
    alignItems: 'center',
    width: 32,
  },
  journeyNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  journeyNumText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
  },
  journeyLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
    minHeight: 16,
  },
  journeyCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 4,
  },
  journeyCardHeader: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  journeyIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  journeyTitleRow: {
    flex: 1,
    gap: 4,
  },
  journeyTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  durationBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  durationText: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
  },
  journeyDesc: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  benefitsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  benefitsHeading: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  benefitsGrid: {
    gap: 10,
  },
  benefitCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  benefitIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  benefitTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 5,
  },
  benefitBody: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  ctaBanner: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 22,
    marginBottom: 12,
  },
  ctaTitle: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  ctaBody: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
    marginBottom: 18,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  ctaBtnText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
});

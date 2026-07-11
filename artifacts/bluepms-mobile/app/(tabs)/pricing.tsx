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

const QUOTE_STEPS = [
  {
    num: '1',
    title: 'Region required',
    body: 'Allow browser location or select the hotel country to unlock rooms, outlets, modules, integrations, and quote scope.',
  },
  {
    num: '2',
    title: 'Written quote',
    body: 'After scope is confirmed, a firm annual subscription quote is provided in writing before any commitment.',
  },
  {
    num: '3',
    title: 'Implementation included',
    body: 'Migration level confirmed before commercial commitment. All configuration and go-live support is scoped in advance.',
  },
  {
    num: '4',
    title: '24x7 support plan',
    body: 'A support plan is confirmed in your written quote. No post-sale surprises on coverage or SLA.',
  },
];

const SCOPE_ITEMS = [
  { label: 'ROOMS / BEDS', value: '80', note: '' },
  { label: 'OUTLETS', value: '3', note: 'First included with POS.' },
  { label: 'BANQUET VENUES', value: '1', note: 'Requires Banquet.' },
  { label: 'USERS', value: '45', note: '' },
  { label: 'INTEGRATIONS', value: '4', note: '' },
];

const MODULES_INCLUDED = [
  'Front Office', 'Reservations', 'Guest Management', 'Housekeeping',
  'Point of Sale', 'Inventory', 'Banquet & Events', 'Payroll',
  'Accounts Receivable', 'Financial Reporting', 'Executive Dashboard',
  'Transport Management',
];

export default function PricingScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : insets.bottom;

  const [selectedModules, setSelectedModules] = useState(12);

  const openDemo = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL('https://bluepms.com/');
  };

  const openProfile = () => {
    Haptics.selectionAsync();
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
          <Text style={[styles.badgeText, { color: colors.primary }]}>PRICING CONFIDENCE</Text>
        </View>
        <Text style={[styles.heroHeading, { color: colors.text }]}>
          Regional BluePMS pricing before the sales call.
        </Text>
        <Text style={[styles.heroBody, { color: colors.mutedForeground }]}>
          Where a regional price card is available, BluePMS shows an indicative estimate for your hotel scope. Where local pricing is not published, the same inputs create a firm quote request. Taxes are shown separately.
        </Text>

        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={openDemo}
            activeOpacity={0.85}
          >
            <Feather name="sliders" size={14} color="#fff" />
            <Text style={styles.primaryBtnText}>Calculate My Scope</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.outlineBtn, { borderColor: colors.border, backgroundColor: colors.surface }]}
            onPress={openDemo}
            activeOpacity={0.8}
          >
            <Text style={[styles.outlineBtnText, { color: colors.navy }]}>Compare Full Cost</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Engineering card */}
      <View style={[styles.engineeringCard, { backgroundColor: colors.navy }]}>
        <View style={[styles.shieldWrap, { backgroundColor: 'rgba(7,95,168,0.3)' }]}>
          <Feather name="shield" size={22} color="#fff" />
        </View>
        <Text style={styles.engineeringTitle}>
          World-class engineering, built for hotel economics.
        </Text>
        <Text style={styles.engineeringBody}>
          BluePMS is built by a team with deep experience across Microsoft Power Platform, Dynamics 365, Dataverse, AI Builder, SQL Server, and Azure Cloud, including platform work at the scale of over 6 million SQL databases. That matters because reliability, security, extensibility, and cost discipline are designed into the foundation, not added later.
        </Text>
        <TouchableOpacity style={[styles.profileBtn, { borderColor: 'rgba(255,255,255,0.2)' }]} onPress={openProfile} activeOpacity={0.8}>
          <Text style={styles.profileBtnText}>
            Led by Karthick PK, former Principal Architect at Microsoft. View profile
          </Text>
          <Feather name="arrow-right" size={12} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
      </View>

      {/* Scope Estimator */}
      <View style={styles.scopeSection}>
        <View style={[styles.scopeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.scopeCardHeader}>
            <View>
              <Text style={[styles.scopeCardLabel, { color: colors.mutedForeground }]}>SCOPE ESTIMATOR</Text>
              <Text style={[styles.scopeCardTitle, { color: colors.text }]}>Hotel scope</Text>
            </View>
            <Text style={[styles.scopeCardNote, { color: colors.mutedForeground }]}>
              Rooms, outlets, modules, users, integrations
            </Text>
          </View>

          <View style={[styles.scopeRegionBanner, { backgroundColor: colors.tintLight, borderColor: colors.tintMedium }]}>
            <Feather name="map-pin" size={14} color={colors.primary} />
            <View style={styles.scopeRegionText}>
              <Text style={[styles.scopeRegionLabel, { color: colors.primary }]}>PRICING REGION</Text>
              <Text style={[styles.scopeRegionTitle, { color: colors.primary }]}>Enable location</Text>
              <Text style={[styles.scopeRegionSub, { color: colors.mutedForeground }]}>
                Allow browser location permission to unlock the estimator.
              </Text>
            </View>
          </View>

          <View style={styles.scopeButtons}>
            <TouchableOpacity style={[styles.scopeBtn, { backgroundColor: colors.primary }]} onPress={openDemo} activeOpacity={0.85}>
              <Text style={styles.scopeBtnText}>Enable browser location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.scopeBtnOutline, { borderColor: colors.border }]} onPress={openDemo} activeOpacity={0.8}>
              <Text style={[styles.scopeBtnOutlineText, { color: colors.navy }]}>Select hotel country</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.scopeWarning, { backgroundColor: '#FFF8E6', borderColor: '#F0D080' }]}>
            <Text style={[styles.scopeWarningText, { color: '#7A5C00' }]}>
              Use browser location or select the hotel country manually. Pricing depends on where the hotel operates, not just where the browser is opened.
            </Text>
          </View>

          {/* Scope items */}
          <View style={styles.scopeItemsGrid}>
            {SCOPE_ITEMS.map((item, idx) => (
              <View key={idx} style={[styles.scopeItemCell, { borderColor: colors.border }]}>
                <Text style={[styles.scopeItemLabel, { color: colors.mutedForeground }]}>{item.label}</Text>
                <Text style={[styles.scopeItemValue, { color: colors.text }]}>{item.value}</Text>
                {item.note ? (
                  <Text style={[styles.scopeItemNote, { color: colors.mutedForeground }]}>{item.note}</Text>
                ) : null}
              </View>
            ))}
          </View>

          <View style={[styles.scopeIncluded, { borderTopColor: colors.border }]}>
            <View style={styles.scopeIncludedRow}>
              <View style={styles.scopeIncludedItem}>
                <Text style={[styles.scopeIncludedLabel, { color: colors.mutedForeground }]}>Migration</Text>
                <Text style={[styles.scopeIncludedVal, { color: colors.text }]}>Confirmed in the written quote for this region.</Text>
              </View>
              <View style={[styles.scopeIncludedItem, { borderLeftWidth: 1, borderLeftColor: colors.border }]}>
                <Text style={[styles.scopeIncludedLabel, { color: colors.mutedForeground }]}>Support</Text>
                <Text style={[styles.scopeIncludedVal, { color: colors.text }]}>24x7 support plan is confirmed in your written quote.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quote on Demand */}
        <View style={[styles.quoteCard, { backgroundColor: colors.navy }]}>
          <Text style={[styles.quoteLabel, { color: 'rgba(255,255,255,0.5)' }]}>QUOTE ON DEMAND</Text>
          <Text style={styles.quoteTitle}>Enable location to build pricing scope</Text>
          <Text style={styles.quoteBody}>
            Use browser location or select the hotel country manually to unlock the scope controls.
          </Text>

          <View style={styles.quoteStats}>
            {[
              { value: '12', label: 'SELECTED MODULES' },
              { value: '80', label: 'ROOMS / BEDS' },
              { value: '4', label: 'INTEGRATIONS' },
            ].map((s, idx) => (
              <View key={idx} style={styles.quoteStat}>
                <Text style={styles.quoteStatValue}>{s.value}</Text>
                <Text style={styles.quoteStatLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.quoteLocationWarn, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
            <Text style={styles.quoteLocationWarnTitle}>Location required</Text>
            <Text style={styles.quoteLocationWarnBody}>
              Use browser location or choose the hotel country manually to unlock scope editing and regional pricing.
            </Text>
          </View>

          <View style={[styles.quoteBanner, { backgroundColor: '#FFF8E6' }]}>
            <Text style={[styles.quoteBannerText, { color: '#7A5C00' }]}>
              Bottom line: enable location or select hotel country to continue.
            </Text>
          </View>
        </View>
      </View>

      {/* Steps */}
      <View style={styles.stepsSection}>
        <Text style={[styles.stepsHeading, { color: colors.text }]}>How the quote process works</Text>
        <View style={styles.stepsList}>
          {QUOTE_STEPS.map((step, idx) => (
            <View key={idx} style={styles.stepRow}>
              <View style={[styles.stepNumCircle, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNum}>{step.num}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>{step.title}</Text>
                <Text style={[styles.stepBody, { color: colors.mutedForeground }]}>{step.body}</Text>
              </View>
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
    marginBottom: 22,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  outlineBtnText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  engineeringCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  shieldWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  engineeringTitle: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
    lineHeight: 24,
    marginBottom: 10,
  },
  engineeringBody: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 21,
    marginBottom: 16,
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  profileBtnText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  scopeSection: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 28,
  },
  scopeCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  scopeCardHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 8,
  },
  scopeCardLabel: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  scopeCardTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  scopeCardNote: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    textAlign: 'right',
    maxWidth: 140,
  },
  scopeRegionBanner: {
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    marginHorizontal: 14,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  scopeRegionText: { flex: 1 },
  scopeRegionLabel: {
    fontSize: 9,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  scopeRegionTitle: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    marginBottom: 3,
  },
  scopeRegionSub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  scopeButtons: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 14,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  scopeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
  },
  scopeBtnText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  scopeBtnOutline: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
  },
  scopeBtnOutlineText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  scopeWarning: {
    marginHorizontal: 14,
    marginBottom: 14,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  scopeWarningText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  scopeItemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 8,
    marginBottom: 14,
  },
  scopeItemCell: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: '47%',
  },
  scopeItemLabel: {
    fontSize: 9,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  scopeItemValue: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    marginBottom: 2,
  },
  scopeItemNote: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
  },
  scopeIncluded: {
    borderTopWidth: 1,
  },
  scopeIncludedRow: {
    flexDirection: 'row',
  },
  scopeIncludedItem: {
    flex: 1,
    padding: 12,
  },
  scopeIncludedLabel: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  scopeIncludedVal: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 17,
  },
  quoteCard: {
    borderRadius: 16,
    padding: 20,
  },
  quoteLabel: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  quoteTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    lineHeight: 24,
    marginBottom: 8,
  },
  quoteBody: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
    marginBottom: 16,
  },
  quoteStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  quoteStat: {},
  quoteStatValue: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  quoteStatLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 9,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
  },
  quoteLocationWarn: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  quoteLocationWarnTitle: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  quoteLocationWarnBody: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  quoteBanner: {
    borderRadius: 8,
    padding: 10,
  },
  quoteBannerText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  stepsSection: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  stepsHeading: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 18,
  },
  stepsList: {
    gap: 16,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 14,
  },
  stepNumCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  stepNum: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
  },
  stepContent: { flex: 1 },
  stepTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  stepBody: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
});

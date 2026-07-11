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

const AREAS = [
  {
    id: 'front-office',
    label: 'Front Office',
    count: 6,
    modules: [
      { name: 'Reservations', desc: 'Full reservation lifecycle from booking to confirmation.' },
      { name: 'Quick Check-In', desc: 'Streamlined check-in flow for front desk staff.' },
      { name: 'Guest Management', desc: 'Guest profiles, preferences, and history.' },
      { name: 'Guest Registration Card', desc: 'Digital registration card creation and management.' },
      { name: 'Tariff Monitoring', desc: 'Monitor and manage room rate plans in real time.' },
      { name: 'Checkout', desc: 'End-to-end guest departure and folio settlement.' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance & Accounting',
    count: 3,
    modules: [
      { name: 'Bill Settlement', desc: 'Invoice creation, payment collection, and receipts.' },
      { name: 'Accounts Receivable', desc: 'Outstanding balances, aging, and collections.' },
      { name: 'Bill Charges', desc: 'Manage charges posted to guest and master folios.' },
    ],
  },
  {
    id: 'fnb',
    label: 'Food & Beverage',
    count: 3,
    modules: [
      { name: 'Point of Sale (POS)', desc: 'Restaurant, bar, and outlet billing in real time.' },
      { name: 'Inventory Management', desc: 'Stock levels, requisitions, and consumption tracking.' },
      { name: 'Banquet & Events', desc: 'Event bookings, setup, catering, and billing.' },
    ],
  },
  {
    id: 'hr',
    label: 'HR & Operations',
    count: 3,
    modules: [
      { name: 'Payroll', desc: 'Staff payroll processing, deductions, and payslips.' },
      { name: 'Transport Management', desc: 'Guest and staff vehicle scheduling and tracking.' },
      { name: 'Housekeeping', desc: 'Room status, assignments, and inspection workflows.' },
    ],
  },
  {
    id: 'intelligence',
    label: 'Intelligence & Reporting',
    count: 2,
    modules: [
      { name: 'Executive Dashboard', desc: 'Real-time KPIs, occupancy, and revenue at a glance.' },
      { name: 'Financial Reporting', desc: 'P&L, balance sheet, and operating report suite.' },
    ],
  },
];

const STATS_TOP = [
  { icon: 'grid' as const, label: '17 modules', sub: 'Across major hotel operating areas' },
  { icon: 'video' as const, label: '13 videos', sub: 'Uploaded MP4 walkthroughs with chapter paths' },
  { icon: 'play-circle' as const, label: '4 guides', sub: 'Workflow guide pages ready while videos are pending' },
  { icon: 'bar-chart-2' as const, label: 'Module reports', sub: 'Reporting coverage shown on each module page' },
  { icon: 'shield' as const, label: 'Operational modules only', sub: 'Focused on the workflows hotels review first' },
];

const LIBRARY_STATS = [
  { value: '17', label: 'OPERATING MODULES' },
  { value: '5', label: 'OPERATING AREAS' },
  { value: 'No', label: 'MASTERS LISTED' },
  { value: '17', label: 'MODULES MAPPED ONCE' },
];

export default function ModulesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : insets.bottom;

  const [expandedArea, setExpandedArea] = useState<string | null>('front-office');

  const toggleArea = (id: string) => {
    Haptics.selectionAsync();
    setExpandedArea(prev => (prev === id ? null : id));
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
      {/* Page Header */}
      <View style={styles.pageHeader}>
        <Text style={[styles.pageLabel, { color: colors.mutedForeground }]}>MODULE LIBRARY</Text>
      </View>

      {/* Hero */}
      <View style={styles.heroSection}>
        <View style={[styles.accentBar, { backgroundColor: colors.accent }]} />
        <Text style={[styles.heroHeading, { color: colors.text }]}>
          Explore BluePMS by hotel operating area.
        </Text>
        <Text style={[styles.heroBody, { color: colors.mutedForeground }]}>
          Explore the 17 operating modules with real product screens, reporting context, business impact, and product video paths for your evaluation.
        </Text>
        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={() => Linking.openURL('https://bluepms.com/')}
            activeOpacity={0.85}
          >
            <Feather name="play-circle" size={15} color="#fff" />
            <Text style={styles.primaryBtnText}>Open Walkthroughs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.outlineBtn, { borderColor: colors.border, backgroundColor: colors.surface }]}
            onPress={openDemo}
            activeOpacity={0.8}
          >
            <Text style={[styles.outlineBtnText, { color: colors.navy }]}>Book a Demo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Top Stats */}
      <View style={[styles.statsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {STATS_TOP.map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.statItem,
              idx < STATS_TOP.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
          >
            <View style={[styles.statIconWrap, { backgroundColor: colors.tintLight }]}>
              <Feather name={item.icon} size={17} color={colors.primary} />
            </View>
            <View style={styles.statText}>
              <Text style={[styles.statTitle, { color: colors.text }]}>{item.label}</Text>
              <Text style={[styles.statSubtitle, { color: colors.mutedForeground }]}>{item.sub}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Library header */}
      <View style={styles.libraryHeader}>
        <Text style={[styles.libraryLabel, { color: colors.primary }]}>MODULE LIBRARY</Text>
        <Text style={[styles.libraryHeading, { color: colors.text }]}>
          Pick a department and explore the product.
        </Text>
        <Text style={[styles.libraryBody, { color: colors.mutedForeground }]}>
          Browse the 17 operating modules by hotel area, enlarge real screens, and jump straight to the module page or product video.
        </Text>

        {/* Library stats row */}
        <View style={[styles.libraryStatsRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {LIBRARY_STATS.map((s, idx) => (
            <View
              key={idx}
              style={[
                styles.libStatCell,
                idx < LIBRARY_STATS.length - 1 && { borderRightWidth: 1, borderRightColor: colors.border },
              ]}
            >
              <Text style={[styles.libStatValue, { color: colors.navy }]}>{s.value}</Text>
              <Text style={[styles.libStatLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Module Accordion */}
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        {AREAS.map((area) => {
          const isOpen = expandedArea === area.id;
          return (
            <View
              key={area.id}
              style={[styles.areaCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <TouchableOpacity
                style={styles.areaHeader}
                onPress={() => toggleArea(area.id)}
                activeOpacity={0.8}
              >
                <View>
                  <Text style={[styles.areaTitle, { color: colors.text }]}>{area.label}</Text>
                  <Text style={[styles.areaCount, { color: colors.mutedForeground }]}>
                    {area.count} modules
                  </Text>
                </View>
                <View style={[styles.chevronWrap, { backgroundColor: isOpen ? colors.tintLight : colors.background }]}>
                  <Feather
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={isOpen ? colors.primary : colors.mutedForeground}
                  />
                </View>
              </TouchableOpacity>
              {isOpen && (
                <View style={[styles.moduleList, { borderTopColor: colors.border }]}>
                  {area.modules.map((mod, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.moduleItem,
                        idx < area.modules.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                      ]}
                    >
                      <View style={[styles.moduleIndexDot, { backgroundColor: colors.primary }]} />
                      <View style={styles.moduleText}>
                        <Text style={[styles.moduleName, { color: colors.text }]}>{mod.name}</Text>
                        <Text style={[styles.moduleDesc, { color: colors.mutedForeground }]}>{mod.desc}</Text>
                      </View>
                      <Feather name="arrow-right" size={14} color={colors.mutedForeground} />
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageHeader: {
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  pageLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
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
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    lineHeight: 36,
    marginBottom: 12,
  },
  heroBody: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
    marginBottom: 20,
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
  statsCard: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 28,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  statIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statText: { flex: 1 },
  statTitle: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 1,
  },
  statSubtitle: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
  },
  libraryHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  libraryLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
    marginBottom: 10,
  },
  libraryHeading: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    lineHeight: 29,
    marginBottom: 10,
  },
  libraryBody: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
    marginBottom: 16,
  },
  libraryStatsRow: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  libStatCell: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  libStatValue: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 2,
  },
  libStatLabel: {
    fontSize: 9,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  areaCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  areaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  areaTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
  },
  areaCount: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  chevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleList: {
    borderTopWidth: 1,
  },
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    paddingLeft: 16,
  },
  moduleIndexDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  moduleText: { flex: 1 },
  moduleName: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
  },
  moduleDesc: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
  },
});

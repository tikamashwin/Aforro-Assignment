import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Coupon } from '../data/dummyData';
import { COLORS } from '../theme/colors';
import { CheckCircle2 } from 'lucide-react-native';

interface CouponCardProps {
  coupon: Coupon;
  isApplied: boolean;
  onApply: (coupon: Coupon) => void;
}

export const CouponCard: React.FC<CouponCardProps> = ({ coupon, isApplied, onApply }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.iconCircle}>
          <Text style={styles.percentageText}>%</Text>
        </View>
        <Text style={styles.title}>{coupon.title}</Text>
      </View>
      <Text style={styles.subtitle} numberOfLines={2}>{coupon.subtitle}</Text>
      
      <View style={styles.dashedDivider} />

      <View style={styles.footer}>
        <Text style={styles.code}>{coupon.code}</Text>
        {isApplied ? (
          <View style={styles.appliedRow}>
            <CheckCircle2 color={COLORS.primary} size={16} />
            <Text style={styles.appliedText}>Applied</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={() => onApply(coupon)}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.surface,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  percentageText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.blue,
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  dashedDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  code: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  applyText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  appliedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  appliedText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
});

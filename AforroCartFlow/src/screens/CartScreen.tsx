import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, MapPin } from 'lucide-react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { COLORS } from '../theme/colors';
import { CartItem } from '../components/CartItem';
import { CouponCard } from '../components/CouponCard';
import { ProductCard } from '../components/ProductCard';
import { CustomBottomSheet } from '../components/BottomSheet';
import { Button } from '../components/Button';
import { MOCK_COUPONS, MOCK_SIMILAR_PRODUCTS, Product } from '../data/dummyData';
import { applyCoupon, setAddress, setLogin, addToCart } from '../store/cartSlice';

export const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isLoggedIn = useAppSelector((state) => state.cart.isLoggedIn);
  const selectedAddress = useAppSelector((state) => state.cart.selectedAddress);
  const currentCoupon = useAppSelector((state) => state.cart.appliedCoupon);

  const loginSheetRef = useRef<BottomSheetModal>(null);
  const addressSheetRef = useRef<BottomSheetModal>(null);

  const outOfStockItems = cartItems.filter((item) => !item.variation.inStock);

  // Dynamic totals
  const { cartTotal, discountTotal } = useMemo(() => {
    let total = 0;
    let oldTotal = 0;
    cartItems.forEach((item) => {
      if (item.variation.inStock) {
        total += item.variation.price * item.quantity;
        if (item.variation.originalPrice) {
          oldTotal += item.variation.originalPrice * item.quantity;
        } else {
          oldTotal += item.variation.price * item.quantity;
        }
      }
    });
    return {
      cartTotal: total,
      discountTotal: oldTotal - total + (currentCoupon ? parseInt(currentCoupon.discountValue, 10) : 0),
    };
  }, [cartItems, currentCoupon]);

  const payableTotal = currentCoupon
    ? cartTotal - parseInt(currentCoupon.discountValue, 10)
    : cartTotal;

  const handleApplyCoupon = (coupon: typeof MOCK_COUPONS[0]) => {
    if (currentCoupon?.id === coupon.id) {
       dispatch(applyCoupon(null)); // Toggle off
    } else {
       dispatch(applyCoupon(coupon));
    }
  };

  const handleProceed = () => {
    if (!isLoggedIn) {
      loginSheetRef.current?.present();
      return;
    }
    if (!selectedAddress) {
      addressSheetRef.current?.present();
      return;
    }
    // Final checkout proceed logic would go here
    console.log('Proceed to payment');
  };

  const attemptLogin = () => {
    dispatch(setLogin(true));
    loginSheetRef.current?.dismiss();
  };

  const saveAddress = () => {
    dispatch(setAddress('123 React Native St, Javascript City'));
    addressSheetRef.current?.dismiss();
  };

  const handleAddDirectly = (product: Product) => {
    dispatch(addToCart({ product, variation: product.variations[0] }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <ArrowLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Cart</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {discountTotal > 0 && (
           <View style={styles.savingsBanner}>
             <Text style={styles.savingsBannerText}>
               You are saving ₹{discountTotal} with this order!
             </Text>
           </View>
        )}

        {/* Warning Banner */}
        <View style={styles.warningBanner}>
           <Text style={styles.warningBannerText}>
             Your order might be delayed due to high demand.
           </Text>
        </View>

        <View style={styles.section}>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.sectionDivider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Did you forget?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MOCK_SIMILAR_PRODUCTS.map((prod) => (
              <ProductCard
                key={`forget-${prod.id}`}
                product={prod}
                onAddPress={handleAddDirectly}
                onOptionsPress={() => {}}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionDivider} />

        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Top coupons for you</Text>
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             {MOCK_COUPONS.map((coupon) => (
               <CouponCard
                 key={coupon.id}
                 coupon={coupon}
                 isApplied={currentCoupon?.id === coupon.id}
                 onApply={handleApplyCoupon}
               />
             ))}
           </ScrollView>
        </View>

        <View style={styles.sectionDivider} />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Instructions</Text>
          <View style={styles.instructionRow}>
             <View style={styles.instructionPill}>
                 <Text style={styles.instructionText}>Don't ring the bell</Text>
             </View>
             <View style={styles.instructionPill}>
                 <Text style={styles.instructionText}>Don't call</Text>
             </View>
             <View style={styles.instructionPill}>
                 <Text style={styles.instructionText}>Leave order with guard</Text>
             </View>
          </View>
        </View>

        {/* Padding for sticky footer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* STICKY BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.toPayLabel}>To Pay</Text>
          <Text style={styles.toPayValue}>₹{Math.max(0, payableTotal)}</Text>
        </View>
        <Button
          style={styles.proceedBtn}
          title={!isLoggedIn ? 'Login to continue' : 'Proceed'}
          onPress={handleProceed}
          disabled={cartItems.length === 0 || payableTotal === 0 || cartItems.every(i => !i.variation.inStock)}
        />
      </View>

      {/* Bottom Sheets for Conditionals */}
      <CustomBottomSheet ref={loginSheetRef} snapPoints={['40%']}>
         <View style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>Login to proceed</Text>
            <Text style={styles.sheetSub}>Please login or sign up to finalize your cart and proceed to payment.</Text>
            <Button title="Login / Signup" onPress={attemptLogin} />
         </View>
      </CustomBottomSheet>

      <CustomBottomSheet ref={addressSheetRef} snapPoints={['50%']}>
         <View style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>Where would you like us to deliver?</Text>
            <TouchableOpacity style={styles.addressAddRow} onPress={saveAddress}>
               <MapPin color={COLORS.primary} size={24} />
               <View style={styles.addressAddTextCol}>
                 <Text style={styles.addressAddTitle}>Add address</Text>
                 <Text style={styles.addressAddSub}>Home, Work, or Friends</Text>
               </View>
            </TouchableOpacity>
         </View>
      </CustomBottomSheet>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  headerIcon: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollContent: {
    paddingTop: 16,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionDivider: {
    height: 8,
    backgroundColor: COLORS.surface,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  savingsBanner: {
    backgroundColor: COLORS.blueLight,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  savingsBannerText: {
    color: COLORS.blue,
    fontWeight: 'bold',
    fontSize: 14,
  },
  warningBanner: {
    backgroundColor: COLORS.yellowLight,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  warningBannerText: {
    color: COLORS.yellow,
    fontWeight: 'bold',
    fontSize: 12,
  },
  instructionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  instructionPill: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  instructionText: {
    color: COLORS.text,
    fontSize: 12,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingBottom: 32, // safe area equivalent
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flex: 1,
  },
  toPayLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  toPayValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  proceedBtn: {
    flex: 1.5,
  },
  sheetContent: {
    paddingVertical: 8,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  sheetSub: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  addressAddRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
  },
  addressAddTextCol: {
    marginLeft: 16,
  },
  addressAddTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  addressAddSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});

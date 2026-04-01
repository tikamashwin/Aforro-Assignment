import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Share2, ChevronRight, Minus, Plus } from 'lucide-react-native';

import { MOCK_PRODUCT, MOCK_SIMILAR_PRODUCTS, Product, ProductVariation } from '../data/dummyData';
import { COLORS } from '../theme/colors';
import { ProductCard } from '../components/ProductCard';
import { CustomBottomSheet } from '../components/BottomSheet';
import { Button } from '../components/Button';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/cartSlice';

type RootStackParamList = {
  Product: undefined;
  Cart: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Product'>;

export const ProductScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleOptionsPress = (product: Product) => {
    setSelectedProduct(product);
    setSelectedVariation(product.variations[0]);
    setQuantity(1);
    bottomSheetRef.current?.present();
  };

  const handleAddDirectly = (product: Product) => {
    dispatch(addToCart({ product, variation: product.variations[0] }));
    navigation.navigate('Cart');
  };

  const handleConfirmAdd = () => {
    if (selectedProduct && selectedVariation) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart({ product: selectedProduct, variation: selectedVariation }));
      }
      bottomSheetRef.current?.dismiss();
      navigation.navigate('Cart');
    }
  };

  const renderBottomSheetContent = () => {
    if (!selectedProduct) return null;

    return (
      <View style={styles.sheetContent}>
        {selectedProduct.variations.map((variation) => (
          <TouchableOpacity
            key={variation.id}
            style={[
              styles.variationRow,
              selectedVariation?.id === variation.id && styles.variationRowSelected,
            ]}
            onPress={() => setSelectedVariation(variation)}
          >
            <View style={styles.variationDetails}>
              <Text style={styles.variationTitle}>{selectedProduct.name}</Text>
              <Text style={styles.variationWeight}>{variation.weight}</Text>
            </View>
            <View style={styles.variationPriceBox}>
              <Text style={styles.variationPrice}>₹{variation.price}</Text>
              {variation.originalPrice && (
                <Text style={styles.variationOriginalPrice}>₹{variation.originalPrice}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus color={COLORS.primary} size={20} />
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Plus color={COLORS.primary} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <Button title="Confirm" onPress={handleConfirmAdd} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          <ArrowLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {MOCK_PRODUCT.name}
        </Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Share2 color={COLORS.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Product Image Container */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: MOCK_PRODUCT.image }} style={styles.mainImage} />
          {MOCK_PRODUCT.variations[0].savingsIndicator && (
             <View style={styles.imageBadge}>
                <Text style={styles.imageBadgeText}>{MOCK_PRODUCT.variations[0].savingsIndicator}</Text>
             </View>
          )}
          {/* Mock Carousel Dots */}
          <View style={styles.carouselDots}>
            {[1, 2, 3, 4, 5].map((dot, index) => (
              <View
                key={dot}
                style={[styles.dot, index === 0 && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.brand}>{MOCK_PRODUCT.brand}</Text>
          <Text style={styles.title}>{MOCK_PRODUCT.name}</Text>
          <Text style={styles.weight}>{MOCK_PRODUCT.variations[0].weight}</Text>

          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{MOCK_PRODUCT.variations[0].price}</Text>
              <Text style={styles.originalPrice}>₹{MOCK_PRODUCT.variations[0].originalPrice}</Text>
            </View>
            <TouchableOpacity style={styles.optionsButton} onPress={() => handleOptionsPress(MOCK_PRODUCT)}>
              <Text style={styles.optionsButtonText}>{MOCK_PRODUCT.variations.length} options</Text>
              <ChevronRight color={COLORS.primary} size={16} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Similar Products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MOCK_SIMILAR_PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddPress={handleAddDirectly}
                onOptionsPress={handleOptionsPress}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionDivider} />

        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Customers also bought</Text>
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MOCK_SIMILAR_PRODUCTS.map((prod) => (
              <ProductCard
                key={`cab-${prod.id}`}
                product={prod}
                onAddPress={handleAddDirectly}
                onOptionsPress={handleOptionsPress}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionDivider} />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{MOCK_PRODUCT.description}</Text>
        </View>

      </ScrollView>

      <CustomBottomSheet ref={bottomSheetRef}>
        {renderBottomSheetContent()}
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
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: COLORS.surface,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  imageBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: COLORS.blue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageBadgeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  carouselDots: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 12,
  },
  productInfo: {
    padding: 16,
  },
  brand: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  weight: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  originalPrice: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  optionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  optionsButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  sectionDivider: {
    height: 8,
    backgroundColor: COLORS.surface,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  sheetContent: {
    paddingVertical: 8,
  },
  variationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: 12,
  },
  variationRowSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#F7FCF5',
  },
  variationDetails: {
    flex: 1,
    marginRight: 16,
  },
  variationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  variationWeight: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  variationPriceBox: {
    alignItems: 'flex-end',
  },
  variationPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  variationOriginalPrice: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 8,
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    paddingHorizontal: 16,
  },
});

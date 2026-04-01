import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../data/dummyData';
import { COLORS } from '../theme/colors';
import { ChevronDown, Plus } from 'lucide-react-native';

interface ProductCardProps {
  product: Product;
  onAddPress: (product: Product) => void;
  onOptionsPress: (product: Product) => void;
  style?: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddPress,
  onOptionsPress,
  style,
}) => {
  // Let default variation be the first one
  const defaultVar = product.variations[0];
  const multipleOptions = product.variations.length > 1;

  return (
    <View style={[styles.card, style]}>
      <View style={styles.imageContainer}>
        {defaultVar?.savingsIndicator && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {defaultVar.savingsIndicator}
            </Text>
          </View>
        )}
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>

      <Text style={styles.brandText}>{product.brand}</Text>
      <Text style={styles.titleText} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.weightText}>{defaultVar?.weight}</Text>

      <View style={styles.priceRow}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>₹{defaultVar?.price}</Text>
          {defaultVar?.originalPrice && (
            <Text style={styles.originalPriceText}>
              ₹{defaultVar.originalPrice}
            </Text>
          )}
        </View>

        {multipleOptions ? (
          <TouchableOpacity
            style={styles.optionsButton}
            onPress={() => onOptionsPress(product)}
          >
            <Text style={styles.optionsButtonText}>
              {product.variations.length} options
            </Text>
            <ChevronDown color={COLORS.primary} size={16} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddPress(product)}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginRight: 16,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginBottom: 12,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: COLORS.blue,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 1,
  },
  discountText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  brandText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
    height: 40,
  },
  weightText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flex: 1,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  originalPriceText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  optionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  optionsButtonText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: 2,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '600',
  },
});

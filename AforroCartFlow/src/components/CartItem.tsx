import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CartItemType } from '../store/cartSlice';
import { COLORS } from '../theme/colors';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { useAppDispatch } from '../store/hooks';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { product, variation, quantity, id } = item;

  const inStock = variation.inStock;

  const handleDecrease = () => {
    dispatch(updateQuantity({ id, amount: quantity - 1 }));
  };

  const handleIncrease = () => {
    dispatch(updateQuantity({ id, amount: quantity + 1 }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <View style={styles.container}>
      {!inStock && (
        <View style={styles.outOfStockBanner}>
          <Text style={styles.outOfStockText}>This item is out of stock</Text>
        </View>
      )}

      <View style={[styles.content, !inStock && styles.disabledContent]}>
        <Image source={{ uri: product.image }} style={styles.image} />
        
        <View style={styles.details}>
          <View style={styles.headerRow}>
            <Text style={styles.brand}>{product.brand}</Text>
            {variation.savingsIndicator && (
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsText}>{variation.savingsIndicator}</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
          <Text style={styles.weight}>{variation.weight}</Text>
          
          <View style={styles.footerRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{variation.price}</Text>
              {variation.originalPrice && (
                <Text style={styles.originalPrice}>₹{variation.originalPrice}</Text>
              )}
            </View>

            {inStock ? (
              <View style={styles.quantityControl}>
                <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
                  <Minus color={COLORS.primary} size={16} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
                  <Plus color={COLORS.primary} size={16} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.deleteButton} onPress={handleRemove}>
                <Trash2 color={COLORS.red} size={16} />
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.surface,
  },
  outOfStockBanner: {
    backgroundColor: COLORS.redLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  outOfStockText: {
    color: COLORS.red,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
    padding: 12,
  },
  disabledContent: {
    opacity: 0.6,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  brand: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  savingsBadge: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  savingsText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  weight: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    paddingHorizontal: 12,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 4,
  },
  deleteText: {
    color: COLORS.red,
    fontSize: 14,
    fontWeight: '600',
  },
});

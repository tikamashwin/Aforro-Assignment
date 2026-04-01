import React, { useCallback, useMemo, forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { COLORS } from '../theme/colors';

interface CustomBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: string[];
  onDismiss?: () => void;
}

export const CustomBottomSheet = forwardRef<BottomSheetModal, CustomBottomSheetProps>(
  ({ children, snapPoints = ['50%'], onDismiss }, ref) => {
    // defaults to dynamic or passed snap point
    const mergedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.4}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={mergedSnapPoints}
        backdropComponent={renderBackdrop}
        onDismiss={onDismiss}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.indicator}
      >
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheetModal>
    );
  }
);

CustomBottomSheet.displayName = 'CustomBottomSheet';

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  indicator: {
    backgroundColor: COLORS.border,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});

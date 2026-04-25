import React, { useRef } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  Gesture,
  GestureDetector,
  NativeViewGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';

import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showSaveButton?: boolean;
  onSave?: () => void;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  title = 'Bottom Sheet',
  showSaveButton = false,
  onSave,
}) => {
  const translateY = useSharedValue(0);
  const startY = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const scrollRef = useRef<NativeViewGestureHandler>(null);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      // Only drag sheet down if ScrollView is at top
      if (scrollY.value > 0 && event.translationY < 0) return;

      let next = startY.value + event.translationY;

      // Clamp the sheet height
      if (next < -300) next = -300; // Fully open
      if (next > 600) next = 600;   // Closed

      translateY.value = next;
    })
    .onEnd(() => {
      // Snap positions
      if (translateY.value < -150) {
        translateY.value = withSpring(-300); // Fully open
      } else if (translateY.value > 200) {
        translateY.value = withSpring(600); // Closed
        onClose();
      } else {
        translateY.value = withSpring(0);   // Half open
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.overlay}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.sheet, animatedStyle]}>

            {/* Header */}
            <View style={styles.header}>
              <ThemedText style={styles.title}>{title}</ThemedText>
              <TouchableOpacity onPress={onClose}>
                <IconSymbol name="xmark" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>

            {/* Scrollable content */}
            <NativeViewGestureHandler ref={scrollRef} disallowInterruption>
              <ScrollView
                ref={scrollRef}
                simultaneousHandlers={gesture}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onScroll={(e) => {
                  scrollY.value = e.nativeEvent.contentOffset.y;
                }}
              >
                {children}
              </ScrollView>
            </NativeViewGestureHandler>

            {/* Footer */}
            {showSaveButton && (
              <ThemedButton
                style={styles.saveButton}
                onPress={onSave ?? (() => {})}
              >
                Save
              </ThemedButton>
            )}
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%', // dynamic height for scrolling
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
  },
});
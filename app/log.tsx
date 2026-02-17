import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text-input';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

// Meal types for categorization
const MEAL_TYPES = [
  { id: 'breakfast', name: 'Breakfast', icon: 'sunrise.fill' as const },
  { id: 'lunch', name: 'Lunch', icon: 'sun.max.fill' as const },
  { id: 'dinner', name: 'Dinner', icon: 'moon.fill' as const },
  { id: 'snack', name: 'Snack', icon: 'bolt.fill' as const },
  { id: 'dessert', name: 'Dessert', icon: 'cup.and.saucer.fill' as const },
];

export default function LogMeal() {
  const [mealData, setMealData] = useState({
    mealType: 'breakfast',
    foodName: '',
    category: '',
    quantity: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    sugar: '',
    sodium: '',
    notes: '',
  });

  const handleInputChange = (field: keyof typeof mealData, value: string) => {
    setMealData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveMeal = () => {
    // Basic validation
    if (!mealData.foodName.trim()) {
      Alert.alert('Error', 'Please enter a food name');
      return;
    }

    if (!mealData.calories.trim()) {
      Alert.alert('Error', 'Please enter calories');
      return;
    }

    // Here you would typically save to your database/state management
    console.log('Saving meal:', mealData);
    
    Alert.alert(
      'Success', 
      'Meal logged successfully!', 
      [{ text: 'OK', onPress: () => resetForm() }]
    );
  };

  const resetForm = () => {
    setMealData({
      mealType: 'breakfast',
      foodName: '',
      category: '',
      quantity: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      sugar: '',
      sodium: '',
      notes: '',
    });
  };

  return (
    <>
      <Stack.Screen options={{ 
        title: "Log Meal",
        headerRight: () => (
          <IconSymbol name="plus.circle.fill" size={24} color={Colors.light.tint} />
        )
      }} />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Log Your Meal</ThemedText>
          <ThemedText style={styles.subtitle}>
            Track what you eat to reach your health goals
          </ThemedText>
        </ThemedView>

        {/* Meal Type Selection */}
        <Collapsible title="Meal Type">
          <View style={styles.mealTypeContainer}>
            {MEAL_TYPES.map((type) => (
              <ThemedButton
                key={type.id}
                onPress={() => handleInputChange('mealType', type.id)}
                style={
                  mealData.mealType === type.id 
                    ? styles.mealTypeButtonActive
                    : styles.mealTypeButton
                }
                textStyle={
                  mealData.mealType === type.id 
                    ? styles.mealTypeTextActive
                    : styles.mealTypeText
                }
              >
                <IconSymbol name={type.icon} size={16} color="#333" style={styles.mealTypeIcon} />
                {type.name}
              </ThemedButton>
            ))}
          </View>
        </Collapsible>

        {/* Basic Information */}
        <Collapsible title="Basic Information">
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Food Name</ThemedText>
            <ThemedTextInput
              value={mealData.foodName}
              onChangeText={(value) => handleInputChange('foodName', value)}
              placeholder="e.g., Grilled Chicken Breast"
              style={styles.input}
            />
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <ThemedText style={styles.label}>Category</ThemedText>
              <ThemedTextInput
                value={mealData.category}
                onChangeText={(value) => handleInputChange('category', value)}
                placeholder="e.g., Protein"
                style={styles.input}
              />
            </View>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <ThemedText style={styles.label}>Quantity</ThemedText>
              <ThemedTextInput
                value={mealData.quantity}
                onChangeText={(value) => handleInputChange('quantity', value)}
                placeholder="e.g., 150g, 1 cup"
                style={styles.input}
              />
            </View>
          </View>
        </Collapsible>

        {/* Nutrition Information */}
        <Collapsible title="Nutrition Information">
          <View style={styles.formRow}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <ThemedText style={styles.label}>Calories (kcal)</ThemedText>
              <ThemedTextInput
                value={mealData.calories}
                onChangeText={(value) => handleInputChange('calories', value)}
                placeholder="e.g., 250"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <ThemedText style={styles.label}>Protein (g)</ThemedText>
              <ThemedTextInput
                value={mealData.protein}
                onChangeText={(value) => handleInputChange('protein', value)}
                placeholder="e.g., 30"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <ThemedText style={styles.label}>Carbs (g)</ThemedText>
              <ThemedTextInput
                value={mealData.carbs}
                onChangeText={(value) => handleInputChange('carbs', value)}
                placeholder="e.g., 15"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <ThemedText style={styles.label}>Fat (g)</ThemedText>
              <ThemedTextInput
                value={mealData.fat}
                onChangeText={(value) => handleInputChange('fat', value)}
                placeholder="e.g., 8"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <ThemedText style={styles.label}>Sugar (g)</ThemedText>
              <ThemedTextInput
                value={mealData.sugar}
                onChangeText={(value) => handleInputChange('sugar', value)}
                placeholder="e.g., 2"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <ThemedText style={styles.label}>Sodium (mg)</ThemedText>
              <ThemedTextInput
                value={mealData.sodium}
                onChangeText={(value) => handleInputChange('sodium', value)}
                placeholder="e.g., 150"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          </View>
        </Collapsible>

        {/* Additional Notes */}
        <Collapsible title="Additional Notes">
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Notes</ThemedText>
            <ThemedTextInput
              value={mealData.notes}
              onChangeText={(value) => handleInputChange('notes', value)}
              placeholder="Any additional information about this meal..."
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
            />
          </View>
        </Collapsible>

        {/* Save Button */}
        <View style={styles.saveButtonContainer}>
          <ThemedButton
            onPress={handleSaveMeal}
            style={styles.saveButton}
            textStyle={styles.saveButtonText}
          >
            Save Meal
          </ThemedButton>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  subtitle: {
    color: '#666',
    marginTop: 5,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  mealTypeButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  mealTypeButtonActive: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  mealTypeText: {
    fontSize: 14,
    color: '#333',
  },
  mealTypeTextActive: {
    color: '#1976d2',
    fontWeight: '600',
  },
  mealTypeIcon: {
    marginRight: 5,
  },
  formGroup: {
    marginBottom: 15,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButtonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#2196f3',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { MealCard } from './MealCard';

export const MealDayCard = ({ day }: any) => {
  return (
    <View style={styles.container}>
      {/* Day Title */}
      <ThemedText style={styles.dayTitle}>
        Day {day.day}
      </ThemedText>

      {/* Meals */}
      {day.meals.map((meal: any) => (
        <MealCard key={meal.name} meal={meal} />
      ))}

      {/* Day Total */}
      <ThemedText style={styles.total}>
        🔥 {day.day_totals.calories} kcal | 
        Protein: {day.day_totals.protein_g}g
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 14,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  total: {
    marginTop: 8,
    fontWeight: '600',
    color: '#28a745',
  },
});
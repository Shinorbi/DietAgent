import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';

export const MealCard = ({ meal }: any) => {
  return (
    <View style={styles.card}>
      <ThemedText style={styles.title}>
        {meal.name}
      </ThemedText>

      {meal.items.map((item: any, index: number) => (
        <ThemedText key={index} style={styles.item}>
          • {item.food} ({item.portion})
        </ThemedText>
      ))}

      <ThemedText style={styles.total}>
        {meal.meal_totals.calories} kcal
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  item: {
    fontSize: 13,
    color: '#555',
  },
  total: {
    marginTop: 6,
    fontSize: 12,
    color: '#007bff',
  },
});
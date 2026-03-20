import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { MealDayCard } from './MealDayCard';

export const MealPlanView = ({ mealPlan }: any) => {
  if (!mealPlan?.days) return null;

  return (
    <FlatList
      data={mealPlan.days}
      keyExtractor={(item) => item.day.toString()}
      renderItem={({ item }) => <MealDayCard day={item} />}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});
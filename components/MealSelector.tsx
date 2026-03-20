import React from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedButton } from '@/components/themed-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

interface MealSelectorProps {
  selectedMeals: Array<{ day: number; meals: string[] }>;
  onMealsChange: (meals: Array<{ day: number; meals: string[] }>) => void;
  startDate: string;
  endDate: string;
}

export function MealSelector({ selectedMeals, onMealsChange, startDate, endDate }: MealSelectorProps) {
  const [showMealOptions, setShowMealOptions] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);
  const [selectedMealType, setSelectedMealType] = React.useState<string | null>(null);

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const totalDays = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const getDayLabel = (day: number) => {
    const date = new Date(startDateObj);
    date.setDate(date.getDate() + day - 1);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return `${dayNames[date.getDay()]}, ${date.getDate()}/${date.getMonth() + 1}`;
  };

  const getDayMeals = (day: number) => {
    return selectedMeals.find(item => item.day === day)?.meals || [];
  };

  const toggleMeal = (day: number, mealType: string) => {
    const currentMeals = getDayMeals(day);
    const newMeals = currentMeals.includes(mealType)
      ? currentMeals.filter(m => m !== mealType)
      : [...currentMeals, mealType];

    const newSelectedMeals = selectedMeals.filter(item => item.day !== day);
    if (newMeals.length > 0) {
      newSelectedMeals.push({ day, meals: newMeals });
    }

    onMealsChange(newSelectedMeals);
  };

  const isMealSelected = (day: number, mealType: string) => {
    return getDayMeals(day).includes(mealType);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Meal Plan:</ThemedText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
        {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => (
          <View key={day} style={styles.dayCard}>
            <ThemedText style={styles.dayLabel}>{getDayLabel(day)}</ThemedText>
            <View style={styles.mealsGrid}>
              {mealTypes.map(mealType => (
                <TouchableOpacity
                  key={mealType}
                  style={[
                    styles.mealButton,
                    isMealSelected(day, mealType) && styles.mealButtonSelected
                  ]}
                  onPress={() => toggleMeal(day, mealType)}
                  activeOpacity={0.7}
                >
                  <ThemedText style={[
                    styles.mealText,
                    isMealSelected(day, mealType) && styles.mealTextSelected
                  ]}>
                    {mealType}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  daysContainer: {
    marginBottom: 10,
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  mealsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  mealButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 2,
    minWidth: 40,
    alignItems: 'center',
  },
  mealButtonSelected: {
    backgroundColor: '#007AFF',
  },
  mealText: {
    fontSize: 10,
    color: '#666',
  },
  mealTextSelected: {
    color: '#fff',
  },
});
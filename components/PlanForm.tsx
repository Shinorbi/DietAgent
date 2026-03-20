import React, { useState } from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text-input';
import { ThemedButton } from '@/components/themed-button';
import { usePlanStore } from '@/stores/planStore';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { DatePickerModal } from './DatePickerModal';
import { MealSelector } from './MealSelector';
import { DietAgentService } from '@/services/dietAgentService';

interface PlanFormProps {
  onPlanCreated?: () => void;
}

export function PlanForm({ onPlanCreated }: PlanFormProps) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState<
    Array<{ day: number; meals: string[] }>
  >([]);

  const { createPlan, loading, error } = usePlanStore();

  const handleCreatePlan = async () => {
    if (!name || selectedMeals.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const userData = {
      name,
      start_date: startDate,
      end_date: endDate,
      days:
        Math.ceil(
          (new Date(endDate).getTime() -
            new Date(startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1,
      meals_per_day: selectedMeals.reduce(
        (max, item) => Math.max(max, item.meals.length),
        0
      ),
      goal: 'maintain_weight',
    };

    try {
      const response = await DietAgentService.generateMealPlan(userData);

      if (response.success) {
        const meals = response.data.meal_plan.days.map((day: any) => ({
          day: day.day,
          meals: day.meals.map((meal: any) => meal.name),
        }));

        await createPlan(
          name,
          startDate,
          endDate,
          JSON.stringify(meals)
        );

        // Reset form
        setName('');
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate(
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0]
        );
        setSelectedMeals([]);

        if (onPlanCreated) onPlanCreated();
      } else {
        alert('Failed to generate meal plan: ' + response.message);
      }
    } catch (err) {
      alert('Failed to create plan: ' + (err as Error).message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title}>Create Meal Plan</ThemedText>

        {/* Plan Name */}
        <ThemedTextInput
          value={name}
          onChangeText={setName}
          placeholder="Plan Name (e.g., Weight Loss Plan)"
          style={styles.input}
          autoCapitalize="words"
        />

        {/* Start Date */}
        <View style={styles.dateRow}>
          <ThemedText style={styles.label}>Start Date:</ThemedText>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowStartDatePicker(true)}
          >
            <ThemedText style={styles.dateText}>
              {startDate}
            </ThemedText>
            <IconSymbol name="calendar" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* End Date */}
        <View style={styles.dateRow}>
          <ThemedText style={styles.label}>End Date:</ThemedText>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowEndDatePicker(true)}
          >
            <ThemedText style={styles.dateText}>
              {endDate}
            </ThemedText>
            <IconSymbol name="calendar" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Meal Selector */}
        <ThemedText style={styles.label}>
          Select Meals for Each Day:
        </ThemedText>
        <MealSelector
          selectedMeals={selectedMeals}
          onMealsChange={setSelectedMeals}
          startDate={startDate}
          endDate={endDate}
        />

        {/* Error Message */}
        {error && (
          <ThemedText style={styles.error}>{error}</ThemedText>
        )}

        {/* Create Button */}
        <ThemedButton
          style={styles.button}
          onPress={handleCreatePlan}
          disabled={loading || !name || selectedMeals.length === 0}
        >
          {loading ? 'Creating...' : 'Create Plan'}
        </ThemedButton>

        {/* Start Date Picker */}
        <DatePickerModal
          isVisible={showStartDatePicker}
          onConfirm={(date) => {
            setStartDate(date.toISOString().split('T')[0]);
            setShowStartDatePicker(false);
          }}
          onCancel={() => setShowStartDatePicker(false)}
          initialDate={new Date(startDate)}
        />

        {/* End Date Picker */}
        <DatePickerModal
          isVisible={showEndDatePicker}
          onConfirm={(date) => {
            setEndDate(date.toISOString().split('T')[0]);
            setShowEndDatePicker(false);
          }}
          onCancel={() => setShowEndDatePicker(false)}
          initialDate={new Date(endDate)}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    marginRight: 8,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
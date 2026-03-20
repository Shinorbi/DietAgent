import React from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedButton } from '@/components/themed-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { usePlanStore } from '@/stores/planStore';

interface PlanDisplayProps {
  planId: number;
}

export function PlanDisplay({ planId }: PlanDisplayProps) {
  const { loading, error, getPlan } = usePlanStore();

  const [plan, setPlan] = React.useState<any>(null);
  const [showDetails, setShowDetails] = React.useState(false);

  React.useEffect(() => {
    loadPlan();
  }, [planId]);

  const loadPlan = async () => {
    try {
      await getPlan(planId);
      // In a real implementation, you would get the plan from the store
      // For now, we'll simulate with mock data
      setPlan({
        id: planId,
        name: "Weight Loss Plan",
        start_date: "2024-01-01",
        end_date: "2024-01-07",
        meals: [
          { day: 1, meals: ["Breakfast", "Lunch", "Dinner"] },
          { day: 2, meals: ["Breakfast", "Lunch", "Dinner", "Snack"] },
          { day: 3, meals: ["Breakfast", "Lunch", "Dinner"] },
          { day: 4, meals: ["Breakfast", "Lunch", "Dinner"] },
          { day: 5, meals: ["Breakfast", "Lunch", "Dinner", "Snack"] },
          { day: 6, meals: ["Breakfast", "Lunch", "Dinner"] },
          { day: 7, meals: ["Breakfast", "Lunch", "Dinner"] },
        ]
      });
    } catch (err) {
      console.error('Failed to load plan:', err);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading plan...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.error}>Error: {error}</ThemedText>
      </ThemedView>
    );
  }

  if (!plan) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No plan found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Plan Header */}
        <View style={styles.planHeader}>
          <ThemedText style={styles.planName}>{plan.name}</ThemedText>
          <ThemedText style={styles.planDates}>
            {plan.start_date} - {plan.end_date}
          </ThemedText>
        </View>

        {/* Week View */}
        <ThemedText style={styles.sectionTitle}>Week Plan</ThemedText>
        <View style={styles.weekContainer}>
          {plan.meals.map((dayPlan: any, index: number) => (
            <View key={dayPlan.day} style={styles.dayCard}>
              <ThemedText style={styles.dayLabel}>Day {dayPlan.day}</ThemedText>
              <View style={styles.mealsList}>
                {dayPlan.meals.map((meal: string, mealIndex: number) => (
                  <ThemedText
                    key={mealIndex}
                    style={[
                      styles.mealItem,
                      showDetails && styles.mealItemDetailed
                    ]}
                  >
                    {meal}
                  </ThemedText>
                ))}
              </View>
<ThemedButton
          style={styles.toggleButton}
          onPress={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </ThemedButton>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <ThemedButton
            style={styles.actionButton}
            onPress={() => console.log('Edit plan')}
          >
            <IconSymbol name="pencil" size={16} color="#fff" />
            <ThemedText style={styles.actionButtonText}>Edit</ThemedText>
          </ThemedButton>
          <ThemedButton
            style={styles.actionButton}
            onPress={() => console.log('Delete plan')}
          >
            <IconSymbol name="trash" size={16} color="#fff" />
            <ThemedText style={styles.actionButtonText}>Delete</ThemedText>
          </ThemedButton>
        </View>
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
  planHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  planDates: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 20,
  },
  weekContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  mealsList: {
    marginBottom: 10,
  },
  mealItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  mealItemDetailed: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  toggleButton: {
    marginTop: 10,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    marginLeft: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
import React, { useState } from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { usePlanStore } from '@/stores/planStore';
import { PlanDisplay } from '@/components/PlanDisplay';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { StyleSheet, View, ScrollView } from 'react-native';
import { DietPlanGenerator } from '@/components/DietPlanGenerator';
import { MealPlanView } from '@/components/MealPlanView';

export default function Plan() {
  const { loading, plans } = usePlanStore();

  const [mealPlan, setMealPlan] = useState<any>(null);
  const [regenerating, setRegenerating] = useState(false);

  const handleGenerated = (data: any) => {
    setMealPlan(data);
    setRegenerating(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>Meal Plans</ThemedText>
          <IconSymbol name="list.bullet" size={24} color="#007AFF" />
        </View>

        {/* CREATE PLAN */}
        <ThemedText style={styles.sectionTitle}>Create New Plan</ThemedText>

        {!mealPlan ? (
          <DietPlanGenerator onGenerated={handleGenerated} />
        ) : (
          <>
            {/* 🔥 CARD UI */}
            <MealPlanView mealPlan={mealPlan} />

            {/* REGENERATE BUTTON */}
            <View style={{ marginTop: 10 }}>
              <DietPlanGenerator
                onGenerated={(data: any) => {
                  setRegenerating(true);
                  handleGenerated(data);
                }}
              />
            </View>
          </>
        )}

        {/* SAVED PLANS */}
        <ThemedText style={styles.sectionTitle}>Saved Plans</ThemedText>

        {loading ? (
          <ThemedText>Loading plans...</ThemedText>
        ) : (
          <View style={styles.plansContainer}>
            {plans.length === 0 ? (
              <ThemedText style={styles.emptyText}>
                No saved plans yet.
              </ThemedText>
            ) : (
              plans.map((plan: any) => (
                <PlanDisplay key={plan.id} planId={plan.id} />
              ))
            )}
          </View>
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 20,
  },
  plansContainer: {
    marginBottom: 20,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
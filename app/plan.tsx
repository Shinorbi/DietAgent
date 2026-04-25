import { BottomSheet } from '@/components/BottomSheet';
import { DietPlanGenerator } from '@/components/DietPlanGenerator';
import { MealPlanView } from '@/components/MealPlanView';
import { PlanDisplay } from '@/components/PlanDisplay';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { usePlanStore } from '@/stores/planStore';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Plan() {
  const { loading, plans, createPlan } = usePlanStore();

  const [mealPlan, setMealPlan] = useState<any>(null);
  const [regenerating, setRegenerating] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleGenerated = (data: any) => {
    setMealPlan(data);
    setRegenerating(false);
    setShowBottomSheet(false);
  };

  const handleSavePlan = () => {
    if (mealPlan) {
      const planName = `Meal Plan ${new Date().toLocaleDateString()}`;
      const startDate = new Date().toISOString();
      const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days from now
      createPlan(planName, startDate, endDate, mealPlan);
      setMealPlan(null);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>Meal Plans</ThemedText>
          <IconSymbol name="list.bullet" size={24} color="#007AFF" />
        </View>

        {/* SAVED PLANS */}
        <ThemedText style={styles.sectionTitle}>Saved Plans</ThemedText>

        {/* SAVED PLANS */}
        <ThemedText style={styles.sectionTitle}>Saved Plans</ThemedText>

        {/* CREATE PLAN */}
        <ThemedText style={styles.sectionTitle}>Create New Plan</ThemedText>

        <BottomSheet
          isVisible={showBottomSheet}
          onClose={() => setShowBottomSheet(false)}
          title="Create New Meal Plan"
        >
          <DietPlanGenerator onGenerated={handleGenerated} />
        </BottomSheet>

        {mealPlan ? (
          <>
            {/* 🔥 CARD UI */}
            <MealPlanView mealPlan={mealPlan} />

            {/* REGENERATE BUTTON */}
            <View style={{ marginTop: 10 }}>
              <BottomSheet
                isVisible={showBottomSheet}
                onClose={() => setShowBottomSheet(false)}
                title="Regenerate Meal Plan"
              >
                <DietPlanGenerator
                  onGenerated={(data: any) => {
                    setRegenerating(true);
                    handleGenerated(data);
                  }}
                />
              </BottomSheet>
            </View>

            {/* SAVE BUTTON */}
            <View style={{ marginTop: 10 }}>
              <ThemedButton
                style={styles.saveButton}
                onPress={handleSavePlan}
              >
                Save Meal Plans
              </ThemedButton>
            </View>
          </>
        ) : (
          <ThemedButton
            style={styles.createButton}
            onPress={() => setShowBottomSheet(true)}
          >
            Create New Plan
          </ThemedButton>
        )}


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
  saveButton: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
    marginTop: 10,
  },
  createButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
    marginTop: 20,
  },
});

import React, { useState } from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text-input';
import { ThemedButton } from '@/components/themed-button';
// import { ThemedScrollView } from '@/components/themed-scroll-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { DietAgentService } from '@/services/dietAgentService';

interface DietPlanGeneratorProps {
  onGenerated?: (data: any) => void;
}

export function DietPlanGenerator({ onGenerated }: DietPlanGeneratorProps) {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '170',
    age: '25',
    gender: 'male',
    activity_level: 'moderate',
    goal: 'maintain_weight',
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePlan = async () => {
    const data = {
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      age: parseInt(formData.age),
      gender: formData.gender,
      activity_level: formData.activity_level,
      goal: formData.goal,
    };

    if (isNaN(data.weight) || isNaN(data.height) || isNaN(data.age)) {
      setError('Please enter valid numbers for weight, height, and age');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await DietAgentService.generateMealPlan(data);
      // Extract the meal plan data from the nested structure
      if (response && response.diet_plan && response.diet_plan.full_plan && response.diet_plan.full_plan.meal_plan) {
        setResult(response.diet_plan.full_plan.meal_plan);
      } else {
        setError('Failed to parse meal plan data');
      }
    } catch (err) {
      setError('Failed to generate diet plan: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    // If result is just the meal plan data (not the full response)
    if (result.days && result.days.length > 0) {
      return (
        <View style={styles.resultContainer}>
          <ThemedText style={styles.resultTitle}>Diet Plan Result</ThemedText>
          <ThemedText style={styles.rotationTitle}>
            {result.rotation_instructions.join(' ')}
          </ThemedText>
          {result.days && result.days.length > 0 && (
            <View>
              {result.days.map((day: any, index: number) => (
                <View key={index} style={styles.dayContainer}>
                  <ThemedText style={styles.dayTitle}>Day {day.day}</ThemedText>
                  {day.meals && day.meals.map((meal: any) => (
                    <View key={meal.name} style={styles.mealContainer}>
                      <ThemedText style={styles.mealTitle}>{meal.name}</ThemedText>
                      {meal.items && meal.items.map((item: any) => (
                        <ThemedText key={item.food} style={styles.mealItem}>
                          {item.food} - {item.portion}
                        </ThemedText>
                      ))}
                      <ThemedText style={styles.mealTotal}>
                        Total: {meal.meal_totals.calories} cal, {meal.meal_totals.protein_g}g protein, {meal.meal_totals.carbs_g}g carbs, {meal.meal_totals.fat_g}g fat
                      </ThemedText>
                    </View>
                  ))}
                  <ThemedText style={styles.dayTotal}>
                    Day Total: {day.day_totals.calories} cal, {day.day_totals.protein_g}g protein, {day.day_totals.carbs_g}g carbs, {day.day_totals.fat_g}g fat
                  </ThemedText>
                </View>
              ))}
            </View>
          )}
        </View>
      );
    }

    // If result is the full response object
    return (
      <View style={styles.resultContainer}>
        <ThemedText style={styles.resultTitle}>Diet Plan Result</ThemedText>
        {result.success && (
          <View>
            <ThemedText style={styles.resultText}>
              Success: {result.message}
            </ThemedText>
            {result.macros && (
              <>
                <ThemedText style={styles.resultText}>
                  Daily Calories: {result.macros.daily_calories || 'N/A'}
                </ThemedText>
                <ThemedText style={styles.resultText}>
                  Protein: {result.macros.protein || 'N/A'}g
                </ThemedText>
                <ThemedText style={styles.resultText}>
                  Carbs: {result.macros.carbs || 'N/A'}g
                </ThemedText>
                <ThemedText style={styles.resultText}>
                  Fat: {result.macros.fat || 'N/A'}g
                </ThemedText>
              </>
            )}
            {result.diet_plan && (
              <>
                <ThemedText style={styles.sectionTitle}>Profile Summary</ThemedText>
                {result.diet_plan.profile_summary && (
                  <View style={styles.summaryContainer}>
                    <ThemedText style={styles.summaryTitle}>Demographics</ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Age: {result.diet_plan.profile_summary.demographics.age}
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Gender: {result.diet_plan.profile_summary.demographics.gender}
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Weight: {result.diet_plan.profile_summary.demographics.weight_kg} kg
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Height: {result.diet_plan.profile_summary.demographics.height_cm} cm
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Activity Level: {result.diet_plan.profile_summary.demographics.activity_level}
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Goal: {result.diet_plan.profile_summary.demographics.goal}
                    </ThemedText>
                    {result.diet_plan.profile_summary.demographics.country && (
                      <ThemedText style={styles.summaryItem}>
                        Country: {result.diet_plan.profile_summary.demographics.country}
                      </ThemedText>
                    )}
                    <ThemedText style={styles.summaryTitle}>Assumptions</ThemedText>
                    {result.diet_plan.profile_summary.assumptions.map((assumption: string, index: number) => (
                      <ThemedText key={index} style={styles.summaryItem}>
                        {assumption}
                      </ThemedText>
                    ))}
                    <ThemedText style={styles.summaryTitle}>Constraints</ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Dietary Restrictions: {result.diet_plan.profile_summary.constraints.dietary_restrictions.join(', ') || 'None'}
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Allergies: {result.diet_plan.profile_summary.constraints.allergies.join(', ') || 'None'}
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Cuisine Preferences: {result.diet_plan.profile_summary.constraints.cuisine_preferences.join(', ') || 'None'}
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Cooking Time: {result.diet_plan.profile_summary.constraints.cooking_time_per_day_minutes || 'Not specified'} minutes/day
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Cooking Level: {result.diet_plan.profile_summary.constraints.cooking_level || 'Not specified'}
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Equipment: {result.diet_plan.profile_summary.constraints.equipment.join(', ') || 'Not specified'}
                    </ThemedText>
                    <ThemedText style={styles.summaryTitle}>Budget</ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Currency: {result.diet_plan.profile_summary.budget.currency}
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Daily Budget: {result.diet_plan.profile_summary.budget.budget_per_day || 'Not specified'}
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Weekly Budget: {result.diet_plan.profile_summary.budget.budget_per_week || 'Not specified'}
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Estimated Cost/Day: {result.diet_plan.profile_summary.budget.estimated_cost_per_day || 'Not available'}
                    </ThemedText>
                    <ThemedText style={styles.summaryItem}>
                      Estimated Cost/Week: {result.diet_plan.profile_summary.budget.estimated_cost_per_week || 'Not available'}
                    </ThemedText>
                  </View>
                )}
                <ThemedText style={styles.sectionTitle}>Nutrition Targets</ThemedText>
                {result.diet_plan.targets && (
                  <View style={styles.targetsContainer}>
                    <ThemedText style={styles.targetItem}>
                      Daily Calories: {result.diet_plan.targets.daily_calories}
                    </ThemedText>
                    <ThemedText style={styles.targetItem}>
                      Protein: {result.diet_plan.targets.protein_grams}g
                    </ThemedText>
                    <ThemedText style={styles.targetItem}>
                      Carbs: {result.diet_plan.targets.carbs_grams}g
                    </ThemedText>
                    <ThemedText style={styles.targetItem}>
                      Fat: {result.diet_plan.targets.fat_grams}g
                    </ThemedText>
                    {result.diet_plan.targets.macro_split && (
                      <>
                        <ThemedText style={styles.targetItem}>
                          Protein %: {Math.round(result.diet_plan.targets.macro_split.protein * 100)}%
                        </ThemedText>
                        <ThemedText style={styles.targetItem}>
                          Carbs %: {Math.round(result.diet_plan.targets.macro_split.carbs * 100)}%
                        </ThemedText>
                        <ThemedText style={styles.targetItem}>
                          Fat %: {Math.round(result.diet_plan.targets.macro_split.fat * 100)}%
                        </ThemedText>
                      </>
                    )}
                  </View>
                )}
                <ThemedText style={styles.sectionTitle}>Portion Guidelines</ThemedText>
                {result.diet_plan.portion_guidelines && (
                  <View style={styles.guidelinesContainer}>
                    <ThemedText style={styles.guidelinesTitle}>Plate Method</ThemedText>
                    {result.diet_plan.portion_guidelines.plate_method.map((method: string, index: number) => (
                      <ThemedText key={index} style={styles.guidelinesItem}>
                        {method}
                      </ThemedText>
                    ))}
                    <ThemedText style={styles.guidelinesTitle}>Hand Portion Method</ThemedText>
                    {result.diet_plan.portion_guidelines.hand_portion_method.map((method: string, index: number) => (
                      <ThemedText key={index} style={styles.guidelinesItem}>
                        {method}
                      </ThemedText>
                    ))}
                    {result.diet_plan.portion_guidelines.bengali_staples_portions && (
                      <>
                        <ThemedText style={styles.guidelinesTitle}>Bengali Staples Portions</ThemedText>
                        <ThemedText style={styles.guidelinesItem}>
                          Cooked Rice: {result.diet_plan.portion_guidelines.bengali_staples_portions.cooked_rice_cups.light_day} cups (light day)
                        </ThemedText>
                        <ThemedText style={styles.guidelinesItem}>
                          Roti: {result.diet_plan.portion_guidelines.bengali_staples_portions.roti_pieces.range}
                        </ThemedText>
                        <ThemedText style={styles.guidelinesItem}>
                          Dal: {result.diet_plan.portion_guidelines.bengali_staples_portions.dal_cups.range}
                        </ThemedText>
                        <ThemedText style={styles.guidelinesItem}>
                          Chicken/Fish: {result.diet_plan.portion_guidelines.bengali_staples_portions.chicken_or_fish_cooked_g.range}
                        </ThemedText>
                        <ThemedText style={styles.guidelinesItem}>
                          Vegetables: {result.diet_plan.portion_guidelines.bengali_staples_portions.vegetables_cups.minimum}+ cups
                        </ThemedText>
                        <ThemedText style={styles.guidelinesItem}>
                          Oil: {result.diet_plan.portion_guidelines.bengali_staples_portions.oil_teaspoons_per_meal.range} tsp/meal
                        </ThemedText>
                      </>
                    )}
                    <ThemedText style={styles.guidelinesTitle}>How to Handle Regular Meal</ThemedText>
                    {result.diet_plan.portion_guidelines.how_to_handle_regular_meal.map((method: string, index: number) => (
                      <ThemedText key={index} style={styles.guidelinesItem}>
                        {method}
                      </ThemedText>
                    ))}
                  </View>
                )}
                <ThemedText style={styles.sectionTitle}>Meal Plan</ThemedText>
                {result.meal_plan && (
                  <View>
                    <ThemedText style={styles.rotationTitle}>
                      {result.meal_plan.rotation_instructions.join(' ')}
                    </ThemedText>
                    {result.meal_plan.days && result.meal_plan.days.length > 0 && (
                      <View>
                        {result.meal_plan.days.map((day: any, index: number) => (
                          <View key={index} style={styles.dayContainer}>
                            <ThemedText style={styles.dayTitle}>Day {day.day}</ThemedText>
                            {day.meals && day.meals.map((meal: any) => (
                              <View key={meal.name} style={styles.mealContainer}>
                                <ThemedText style={styles.mealTitle}>{meal.name}</ThemedText>
                                {meal.items && meal.items.map((item: any) => (
                                  <ThemedText key={item.food} style={styles.mealItem}>
                                    {item.food} - {item.portion}
                                  </ThemedText>
                                ))}
                                <ThemedText style={styles.mealTotal}>
                                  Total: {meal.meal_totals.calories} cal, {meal.meal_totals.protein_g}g protein, {meal.meal_totals.carbs_g}g carbs, {meal.meal_totals.fat_g}g fat
                                </ThemedText>
                              </View>
                            ))}
                            <ThemedText style={styles.dayTotal}>
                              Day Total: {day.day_totals.calories} cal, {day.day_totals.protein_g}g protein, {day.day_totals.carbs_g}g carbs, {day.day_totals.fat_g}g fat
                            </ThemedText>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                )}
                <ThemedText style={styles.sectionTitle}>Grocery List</ThemedText>
                {result.diet_plan.grocery_list && (
                  <View style={styles.groceryContainer}>
                    {result.diet_plan.grocery_list.items && result.diet_plan.grocery_list.items.length > 0 && (
                      <View>
                        {result.diet_plan.grocery_list.items.map((item: any, index: number) => (
                          <ThemedText key={index} style={styles.groceryItem}>
                            {item.ingredient}: {item.quantity} ({item.category})
                          </ThemedText>
                        ))}
                        <ThemedText style={styles.groceryTotal}>
                          Estimated Total Cost: {result.diet_plan.grocery_list.estimated_total_cost || 'Not available'}
                        </ThemedText>
                      </View>
                    )}
                  </View>
                )}
                <ThemedText style={styles.sectionTitle}>Prep Plan</ThemedText>
                {result.diet_plan.prep_plan && (
                  <View style={styles.prepContainer}>
                    <ThemedText style={styles.prepTitle}>Batch Cook Suggestions</ThemedText>
                    {result.diet_plan.prep_plan.batch_cook_suggestions.map((suggestion: string, index: number) => (
                      <ThemedText key={index} style={styles.prepItem}>
                        {suggestion}
                      </ThemedText>
                    ))}
                    <ThemedText style={styles.prepTitle}>Storage Notes</ThemedText>
                    {result.diet_plan.prep_plan.storage_notes.map((note: string, index: number) => (
                      <ThemedText key={index} style={styles.prepItem}>
                        {note}
                      </ThemedText>
                    ))}
                    <ThemedText style={styles.prepTitle}>Swap Options</ThemedText>
                    {result.diet_plan.prep_plan.swap_options.map((option: any, index: number) => (
                      <ThemedText key={index} style={styles.prepItem}>
                        If unavailable: {option.if_unavailable} → Swap with: {option.swap_with}
                      </ThemedText>
                    ))}
                  </View>
                )}
                <ThemedText style={styles.sectionTitle}>Tracking Tips</ThemedText>
                {result.diet_plan.tracking_tips && (
                  <View style={styles.tipsContainer}>
                    {result.diet_plan.tracking_tips.map((tip: string, index: number) => (
                      <ThemedText key={index} style={styles.tipsItem}>
                        {tip}
                      </ThemedText>
                    ))}
                  </View>
                )}
                <ThemedButton
                  style={styles.regenerateButton}
                  onPress={() => {
                    setFormData({
                      weight: '70',
                      height: '170',
                      age: '25',
                      gender: 'male',
                      activity_level: 'moderate',
                      goal: 'maintain_weight',
                    });
                    setResult(null);
                    setError('');
                  }}
                >
                  Regenerate Plan
                </ThemedButton>
              </>
            )}
          </View>
        )}
        {!result.success && (
          <ThemedText style={styles.errorText}>
            {result.message || 'Plan generation failed'}
          </ThemedText>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Diet Plan Generator</ThemedText>

      {/* Form Fields */}
      <View style={styles.formGroup}>
        <ThemedText style={styles.label}>Weight (kg):</ThemedText>
        <ThemedTextInput
          value={formData.weight}
          onChangeText={(text) => handleChange('weight', text)}
          placeholder="70"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <ThemedText style={styles.label}>Height (cm):</ThemedText>
        <ThemedTextInput
          value={formData.height}
          onChangeText={(text) => handleChange('height', text)}
          placeholder="170"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <ThemedText style={styles.label}>Age:</ThemedText>
        <ThemedTextInput
          value={formData.age}
          onChangeText={(text) => handleChange('age', text)}
          placeholder="25"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <ThemedText style={styles.label}>Gender:</ThemedText>
        <View style={styles.selectContainer}>
          <TouchableOpacity
            style={[
              styles.selectButton,
              formData.gender === 'male' && styles.selectButtonActive,
            ]}
            onPress={() => handleChange('gender', 'male')}
          >
            <ThemedText
              style={[
                styles.selectButtonText,
                formData.gender === 'male' && styles.selectButtonTextActive,
              ]}
            >
              Male
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectButton,
              formData.gender === 'female' && styles.selectButtonActive,
            ]}
            onPress={() => handleChange('gender', 'female')}
          >
            <ThemedText
              style={[
                styles.selectButtonText,
                formData.gender === 'female' && styles.selectButtonTextActive,
              ]}
            >
              Female
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <ThemedText style={styles.label}>Activity Level:</ThemedText>
        <View style={styles.selectContainer}>
          {['sedentary', 'light', 'moderate', 'active', 'very_active'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.selectButton,
                formData.activity_level === level && styles.selectButtonActive,
              ]}
              onPress={() => handleChange('activity_level', level)}
            >
              <ThemedText
                style={[
                  styles.selectButtonText,
                  formData.activity_level === level && styles.selectButtonTextActive,
                ]}
              >
                {level.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <ThemedText style={styles.label}>Goal:</ThemedText>
        <View style={styles.selectContainer}>
          {['lose_weight', 'gain_weight', 'maintain_weight'].map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.selectButton,
                formData.goal === goal && styles.selectButtonActive,
              ]}
              onPress={() => handleChange('goal', goal)}
            >
              <ThemedText
                style={[
                  styles.selectButtonText,
                  formData.goal === goal && styles.selectButtonTextActive,
                ]}
              >
                {goal.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Actions */}
      <ThemedButton
        style={styles.generateButton}
        onPress={generatePlan}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Diet Plan'}
      </ThemedButton>

      {/* Error Message */}
      {error && (
        <ThemedText style={styles.error}>{error}</ThemedText>
      )}

      {/* Result */}
      {renderResult()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  selectButtonText: {
    color: '#333',
    fontSize: 14,
  },
  selectButtonTextActive: {
    color: '#fff',
  },
  generateButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  regenerateButton: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
    color: '#007bff',
  },
  summaryContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 6,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#0056b3',
  },
  summaryItem: {
    fontSize: 13,
    marginBottom: 3,
    color: '#333',
  },
  targetsContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0fff0',
    borderRadius: 6,
  },
  targetItem: {
    fontSize: 13,
    marginBottom: 3,
    color: '#333',
  },
  guidelinesContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff5ee',
    borderRadius: 6,
  },
  guidelinesTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#d2691e',
  },
  guidelinesItem: {
    fontSize: 13,
    marginBottom: 3,
    color: '#333',
  },
  rotationTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    fontStyle: 'italic',
  },
  dayContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  mealContainer: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#495057',
  },
  mealItem: {
    fontSize: 13,
    marginBottom: 4,
    color: '#6c757d',
  },
  mealTotal: {
    fontSize: 12,
    marginTop: 6,
    color: '#495057',
    fontStyle: 'italic',
  },
  dayTotal: {
    fontSize: 13,
    marginTop: 8,
    color: '#007bff',
    fontWeight: '600',
  },
  groceryContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 6,
  },
  groceryItem: {
    fontSize: 13,
    marginBottom: 3,
    color: '#333',
  },
  groceryTotal: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    color: '#0056b3',
  },
  prepContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff5ee',
    borderRadius: 6,
  },
  prepTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#d2691e',
  },
  prepItem: {
    fontSize: 13,
    marginBottom: 3,
    color: '#333',
  },
  tipsContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0fff0',
    borderRadius: 6,
  },
  tipsItem: {
    fontSize: 13,
    marginBottom: 3,
    color: '#333',
  },
  resultText: {
    fontSize: 14,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
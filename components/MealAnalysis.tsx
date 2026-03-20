import React, { useState } from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text-input';
import { ThemedButton } from '@/components/themed-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { DietAgentService } from '@/services/dietAgentService';

interface FoodItem {
  name: string;
  qty: number;
}

interface MealAnalysisProps {}

export function MealAnalysis({}: MealAnalysisProps) {
  const [foods, setFoods] = useState<FoodItem[]>([
    { name: 'egg', qty: 2 },
    { name: 'toast', qty: 1 }
  ]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addFood = () => {
    setFoods([...foods, { name: '', qty: 1 }]);
  };

  const removeFood = (index: number) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

  const analyzeMeal = async () => {
    if (foods.length === 0) {
      setError('Please add at least one food item');
      return;
    }

    const hasEmpty = foods.some(food => !food.name || food.qty <= 0);
    if (hasEmpty) {
      setError('Please fill in all food names and quantities');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await DietAgentService.analyzeMeal(foods);
      setResult(response);
    } catch (err) {
      setError('Failed to analyze meal: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const renderFoodItem = ({ item, index }: { item: FoodItem; index: number }) => (
    <View style={styles.foodRow}>
      <ThemedTextInput
        value={item.name}
        onChangeText={(text) => {
          const newFoods = [...foods];
          newFoods[index].name = text;
          setFoods(newFoods);
        }}
        placeholder="Food name"
        style={styles.foodInput}
      />
      <ThemedTextInput
        value={item.qty.toString()}
        onChangeText={(text) => {
          const qty = parseInt(text) || 0;
          const newFoods = [...foods];
          newFoods[index].qty = qty;
          setFoods(newFoods);
        }}
        placeholder="Qty"
        style={styles.qtyInput}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={() => removeFood(index)} style={styles.removeButton}>
        <IconSymbol name="trash" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );

  const renderResult = () => {
    if (!result) return null;

    return (
      <View style={styles.resultContainer}>
        <ThemedText style={styles.resultTitle}>Analysis Result</ThemedText>
        {result.success && (
          <View>
            <ThemedText style={styles.resultText}>
              Total Calories: {result.data.analysis?.total_calories || 'N/A'}
            </ThemedText>
            <ThemedText style={styles.resultText}>
              Total Protein: {result.data.analysis?.total_protein || 'N/A'}g
            </ThemedText>
            <ThemedText style={styles.resultText}>
              Total Carbs: {result.data.analysis?.total_carbs || 'N/A'}g
            </ThemedText>
            <ThemedText style={styles.resultText}>
              Total Fat: {result.data.analysis?.total_fat || 'N/A'}g
            </ThemedText>
          </View>
        )}
        {!result.success && (
          <ThemedText style={styles.errorText}>
            {result.message || 'Analysis failed'}
          </ThemedText>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Meal Analysis</ThemedText>

      {/* Food List */}
      <View style={styles.foodList}>
        <FlatList
          data={foods}
          renderItem={renderFoodItem}
          keyExtractor={(_, index) => index.toString()}
          ListFooterComponent={
            <TouchableOpacity style={styles.addButton} onPress={addFood}>
              <IconSymbol name="plus" size={20} color="#007bff" />
              <ThemedText style={styles.addButtonText}>Add Food</ThemedText>
            </TouchableOpacity>
          }
        />
      </View>

      {/* Actions */}
      <ThemedButton
        style={styles.analyzeButton}
        onPress={analyzeMeal}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Meal'}
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
  foodList: {
    marginBottom: 20,
  },
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  foodInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 10,
  },
  qtyInput: {
    width: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 10,
    textAlign: 'center',
  },
  removeButton: {
    padding: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    marginTop: 10,
  },
  addButtonText: {
    marginLeft: 8,
    color: '#007bff',
  },
  analyzeButton: {
    marginTop: 20,
    marginBottom: 10,
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
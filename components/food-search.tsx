import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text-input';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { FoodItem, searchFoods } from '@/data/food-database';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

interface FoodSearchProps {
  onSelectFood: (food: FoodItem) => void;
  placeholder?: string;
}

export function FoodSearch({ onSelectFood, placeholder = "Search for food..." }: FoodSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

  // Debounced search function without external dependencies
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    
    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    // Set new timer
    const timer = setTimeout(() => {
      const results = searchFoods(text);
      setSearchResults(results);
    }, 300);
    
    setDebounceTimer(timer);
  };

  const handleFoodSelect = (food: FoodItem) => {
    onSelectFood(food);
    setSearchQuery('');
    setSearchResults([]);
  };

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => handleFoodSelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.foodInfo}>
        <ThemedText style={styles.foodName}>{item.name}</ThemedText>
        <ThemedText style={styles.foodCategory}>{item.category}</ThemedText>
        <ThemedText style={styles.foodNutrition}>
          {item.calories} kcal • {item.protein}g P • {item.carbs}g C • {item.fat}g F
        </ThemedText>
      </View>
      <View style={styles.foodServing}>
        <ThemedText style={styles.servingSize}>{item.servingSize}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedTextInput
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholder={placeholder}
        style={styles.searchInput}
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {searchQuery.length > 0 && searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={searchResults}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.resultsList}
          />
        </View>
      )}
      
      {searchQuery.length > 0 && searchResults.length === 0 && (
        <ThemedView style={styles.noResults}>
          <IconSymbol name="magnifyingglass" size={24} color="#999" />
          <ThemedText style={styles.noResultsText}>No foods found</ThemedText>
          <ThemedText style={styles.noResultsSubtext}>
            Try searching for "apple", "chicken", or "rice"
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  resultsContainer: {
    maxHeight: 200,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  resultsList: {
    maxHeight: 200,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  foodCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  foodNutrition: {
    fontSize: 12,
    color: '#888',
  },
  foodServing: {
    alignItems: 'flex-end',
  },
  servingSize: {
    fontSize: 12,
    color: '#999',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  noResults: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  noResultsText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
  noResultsSubtext: {
    marginTop: 4,
    fontSize: 12,
    color: '#999',
  },
});
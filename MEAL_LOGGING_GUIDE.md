# Meal Logging System - Implementation Guide

## Overview

I've successfully implemented a comprehensive meal logging system for your diet agent mobile app. This system provides a user-friendly interface for tracking meals with detailed nutritional information.

## Features Implemented

### 1. Main Log Page (`app/log.tsx`)
- **Meal Type Selection**: Users can select from 5 meal types (Breakfast, Lunch, Dinner, Snack, Dessert)
- **Basic Information**: Food name, category, and serving quantity
- **Nutrition Tracking**: Complete macronutrient tracking (calories, protein, carbs, fat, sugar, sodium)
- **Additional Notes**: Free-form text field for meal details
- **Form Validation**: Basic validation for required fields
- **Responsive Design**: Clean, collapsible sections for better UX

### 2. Themed Components
- **ThemedTextInput** (`components/themed-text-input.tsx`): Consistent input styling with theme support
- **ThemedButton** (`components/themed-button.tsx`): Customizable button component with theme support

### 3. Food Database (`data/food-database.ts`)
- **25+ Common Foods**: Pre-populated with realistic nutritional data
- **Categories**: Organized by food type (Fruits, Vegetables, Proteins, etc.)
- **Search Functionality**: Fast search through food names and categories
- **Extensible**: Easy to add new foods or integrate with external APIs

### 4. Food Search Component (`components/food-search.tsx`)
- **Real-time Search**: Debounced search for better performance
- **Quick Selection**: Tap to auto-fill nutrition information
- **Smart Suggestions**: Shows serving size and nutrition facts
- **No Dependencies**: Custom debouncing without external libraries

## What to Log in Your Meal Page

### Essential Information
1. **Meal Type**: Breakfast, Lunch, Dinner, Snack, or Dessert
2. **Food Name**: Specific name of what you ate
3. **Category**: Food group (Protein, Vegetable, etc.)
4. **Quantity**: Serving size (150g, 1 cup, etc.)

### Nutrition Information (Per Serving)
1. **Calories**: Total energy content
2. **Protein**: Grams of protein
3. **Carbohydrates**: Grams of carbs
4. **Fat**: Grams of fat
5. **Sugar**: Grams of sugar
6. **Sodium**: Milligrams of sodium

### Additional Details
1. **Notes**: Cooking method, brand, special ingredients
2. **Time**: When you ate (can be added later)
3. **Mood**: How you felt (can be added later)
4. **Location**: Where you ate (can be added later)

## Usage Examples

### Quick Logging
- Use the food search to quickly find common foods
- Tap a food to auto-fill nutrition information
- Adjust quantity as needed
- Save with one tap

### Manual Entry
- Enter custom foods not in the database
- Input nutrition information manually
- Add detailed notes about preparation

### Categories to Consider
- **Proteins**: Chicken, fish, eggs, tofu, beans
- **Vegetables**: Broccoli, spinach, carrots, peppers
- **Fruits**: Apples, bananas, oranges, berries
- **Grains**: Rice, bread, pasta, oats
- **Dairy**: Milk, yogurt, cheese
- **Snacks**: Nuts, chips, popcorn
- **Beverages**: Coffee, tea, juice, soda

## Technical Architecture

### State Management
- Local state using React hooks
- Form data stored in a single object
- Real-time updates as user types

### Data Flow
1. User inputs data → Form state updates
2. Food selection → Auto-fills nutrition fields
3. Form validation → Prevents incomplete submissions
4. Save action → Logs meal to database/state

### Component Structure
```
LogMeal (Main Component)
├── Meal Type Selection (Collapsible)
├── Basic Information (Collapsible)
├── Nutrition Information (Collapsible)
├── Additional Notes (Collapsible)
└── Save Button
```

## Extending the System

### Adding New Foods
```typescript
// Add to data/food-database.ts
{
  id: 'new-food',
  name: 'New Food Name',
  category: 'Category Name',
  calories: 100,
  protein: 10,
  carbs: 20,
  fat: 5,
  sugar: 2,
  sodium: 100,
  servingSize: '100g'
}
```

### Adding New Meal Types
```typescript
// Add to MEAL_TYPES array in app/log.tsx
{ id: 'new-meal', name: 'New Meal', icon: 'icon-name' }
```

### Adding New Nutrition Fields
```typescript
// Update mealData state in app/log.tsx
const [mealData, setMealData] = useState({
  // ... existing fields
  newField: '', // Add new field
});
```

## Best Practices for Meal Logging

### Accuracy Tips
1. **Use Scales**: Weigh foods for accurate portion sizes
2. **Check Labels**: Use nutrition labels when available
3. **Estimate Carefully**: Use standard serving sizes for estimation
4. **Log Immediately**: Record meals as soon as possible

### Consistency Tips
1. **Same Time**: Log meals at consistent times
2. **Complete Info**: Always fill in all available fields
3. **Track Patterns**: Note what you eat regularly
4. **Review Regularly**: Check your logs for accuracy

### Common Mistakes to Avoid
1. **Forgetting Condiments**: Include sauces, dressings, butter
2. **Ignoring Beverages**: Log drinks with calories
3. **Estimating Too Much**: Be conservative with portion estimates
4. **Skipping Snacks**: Log all eating occasions

## Integration Points

### Database Integration
- Replace console.log in handleSaveMeal() with actual database calls
- Consider using SQLite, Firebase, or other storage solutions
- Add timestamp and user ID for multi-user support

### API Integration
- Replace local food database with external nutrition APIs
- Add barcode scanning for packaged foods
- Integrate with fitness trackers for comprehensive health data

### Analytics
- Track daily/weekly nutrition totals
- Generate reports and insights
- Set and monitor dietary goals
- Provide personalized recommendations

## Next Steps

1. **Test the Implementation**: Run the app and test all functionality
2. **Add Data Persistence**: Implement database storage
3. **Enhance UI**: Add animations and better visual feedback
4. **Expand Database**: Add more foods and categories
5. **Add Analytics**: Create summary views and reports
6. **User Management**: Add login and profile features

## Files Created/Modified

- ✅ `app/log.tsx` - Main meal logging interface
- ✅ `components/themed-text-input.tsx` - Custom text input component
- ✅ `components/themed-button.tsx` - Custom button component
- ✅ `components/food-search.tsx` - Food search and selection
- ✅ `data/food-database.ts` - Food database with 25+ items
- ✅ `MEAL_LOGGING_GUIDE.md` - This comprehensive guide

The meal logging system is now ready for use and provides a solid foundation for tracking dietary intake in your diet agent mobile app!
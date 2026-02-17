// Food database for common foods and their nutritional information
// This can be expanded or replaced with a real API integration

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  sodium: number;
  servingSize: string;
}

export const FOOD_DATABASE: FoodItem[] = [
  // Fruits
  {
    id: 'apple',
    name: 'Apple',
    category: 'Fruits',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    sugar: 10,
    sodium: 1,
    servingSize: '100g'
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'Fruits',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    sugar: 12,
    sodium: 1,
    servingSize: '100g'
  },
  {
    id: 'orange',
    name: 'Orange',
    category: 'Fruits',
    calories: 47,
    protein: 0.9,
    carbs: 12,
    fat: 0.1,
    sugar: 9,
    sodium: 0,
    servingSize: '100g'
  },

  // Vegetables
  {
    id: 'broccoli',
    name: 'Broccoli',
    category: 'Vegetables',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    sugar: 1.7,
    sodium: 33,
    servingSize: '100g'
  },
  {
    id: 'spinach',
    name: 'Spinach',
    category: 'Vegetables',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    sugar: 0.4,
    sodium: 79,
    servingSize: '100g'
  },
  {
    id: 'carrot',
    name: 'Carrot',
    category: 'Vegetables',
    calories: 41,
    protein: 0.9,
    carbs: 10,
    fat: 0.2,
    sugar: 4.7,
    sodium: 69,
    servingSize: '100g'
  },

  // Proteins
  {
    id: 'chicken-breast',
    name: 'Grilled Chicken Breast',
    category: 'Proteins',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    sugar: 0,
    sodium: 74,
    servingSize: '100g'
  },
  {
    id: 'salmon',
    name: 'Salmon',
    category: 'Proteins',
    calories: 208,
    protein: 25,
    carbs: 0,
    fat: 12,
    sugar: 0,
    sodium: 59,
    servingSize: '100g'
  },
  {
    id: 'eggs',
    name: 'Eggs',
    category: 'Proteins',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    sugar: 1.1,
    sodium: 142,
    servingSize: '100g (about 2 large eggs)'
  },

  // Grains
  {
    id: 'brown-rice',
    name: 'Brown Rice',
    category: 'Grains',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    sugar: 0.4,
    sodium: 5,
    servingSize: '100g cooked'
  },
  {
    id: 'whole-wheat-bread',
    name: 'Whole Wheat Bread',
    category: 'Grains',
    calories: 247,
    protein: 13,
    carbs: 41,
    fat: 3.2,
    sugar: 6.2,
    sodium: 403,
    servingSize: '100g'
  },
  {
    id: 'oatmeal',
    name: 'Oatmeal',
    category: 'Grains',
    calories: 68,
    protein: 2.4,
    carbs: 12,
    fat: 1.4,
    sugar: 0.5,
    sodium: 2,
    servingSize: '100g cooked'
  },

  // Dairy
  {
    id: 'milk',
    name: 'Milk (2%)',
    category: 'Dairy',
    calories: 50,
    protein: 3.3,
    carbs: 4.8,
    fat: 2,
    sugar: 4.8,
    sodium: 44,
    servingSize: '100ml'
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    category: 'Dairy',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    sugar: 3.6,
    sodium: 36,
    servingSize: '100g'
  },
  {
    id: 'cheddar-cheese',
    name: 'Cheddar Cheese',
    category: 'Dairy',
    calories: 402,
    protein: 25,
    carbs: 1.3,
    fat: 33,
    sugar: 0.5,
    sodium: 621,
    servingSize: '100g'
  },

  // Snacks
  {
    id: 'almonds',
    name: 'Almonds',
    category: 'Snacks',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    sugar: 4.4,
    sodium: 1,
    servingSize: '100g'
  },
  {
    id: 'popcorn',
    name: 'Popcorn (Air-popped)',
    category: 'Snacks',
    calories: 387,
    protein: 13,
    carbs: 78,
    fat: 4.5,
    sugar: 0.9,
    sodium: 3,
    servingSize: '100g'
  },

  // Beverages
  {
    id: 'black-coffee',
    name: 'Black Coffee',
    category: 'Beverages',
    calories: 1,
    protein: 0.1,
    carbs: 0,
    fat: 0,
    sugar: 0,
    sodium: 2,
    servingSize: '100ml'
  },
  {
    id: 'green-tea',
    name: 'Green Tea',
    category: 'Beverages',
    calories: 1,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
    sodium: 0,
    servingSize: '100ml'
  },
];

// Helper function to search for foods
export const searchFoods = (query: string): FoodItem[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return FOOD_DATABASE.filter(food => 
    food.name.toLowerCase().includes(lowerQuery) ||
    food.category.toLowerCase().includes(lowerQuery)
  ).slice(0, 10); // Limit to 10 results
};

// Helper function to get food by ID
export const getFoodById = (id: string): FoodItem | undefined => {
  return FOOD_DATABASE.find(food => food.id === id);
};
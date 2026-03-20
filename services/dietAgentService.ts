import AsyncStorage from '@react-native-async-storage/async-storage';

export class DietAgentService {
  static async generateMealPlan(userData: any) {
    try {
      const response = await fetch('http://localhost:8000/api/user/diet-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to generate meal plan:', error);
      throw error;
    }
  }

  static async analyzeMeal(foods: any[]) {
    try {
      const response = await fetch('http://localhost:8000/api/meal/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          meal_type: 'breakfast',
          foods: foods
        })
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to analyze meal:', error);
      throw error;
    }
  }

  static async getFoodRecommendations(mealType: string, goal: string) {
    try {
      const response = await fetch('http://localhost:8000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `What are some healthy ${mealType} options for ${goal} goal?`
        })
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to get food recommendations:', error);
      throw error;
    }
  }

  static async getAgentAnalysis(question: string) {
    try {
      const response = await fetch('http://localhost:8000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question })
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to get agent analysis:', error);
      throw error;
    }
  }
}

export class DietAgentService {
  static getApiBase() {
    // Use API_BASE_URL from .env file
    if (typeof process !== 'undefined' && process.env) {
      const baseUrl = process.env.API_BASE_URL;
      if (baseUrl) {
        return baseUrl;
      }
    }

    // Final fallback
    return 'http://localhost:8000';
  }

  // Helper function to make fetch with timeout
  static async fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number = 60000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server took too long to respond');
      }
      throw error;
    }
  }

  // Helper function to retry failed requests
  static async fetchWithRetry(url: string, options: RequestInit, maxRetries: number = 3, timeoutMs: number = 60000): Promise<Response> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${maxRetries} for ${url}`);
        const response = await this.fetchWithTimeout(url, options, timeoutMs);
        return response;
      } catch (error: any) {
        lastError = error;
        console.error(`Attempt ${attempt} failed:`, error.message);

        if (attempt < maxRetries) {
          // Exponential backoff: 1s, 2s, 4s
          const delayMs = Math.pow(2, attempt - 1) * 1000;
          console.log(`Retrying in ${delayMs}ms...`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }
    }

    throw lastError || new Error('All retry attempts failed');
  }

  static async generateMealPlan(userData: any) {
    try {
      const apiBase = this.getApiBase();
      console.log('API Base URL:', apiBase);
      console.log('Request URL:', `${apiBase}/api/user/diet-plan`);
      console.log('Request Data:', userData);

      const response = await this.fetchWithRetry(
        `${apiBase}/api/user/diet-plan`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        },
        3, // max retries
        9000000 // 90 second timeout for diet plan generation
      );

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error('Failed to generate meal plan:', error);
      throw error;
    }
  }

  static async analyzeMeal(foods: any[]) {
    try {
      const apiBase = this.getApiBase();
      console.log('API Base URL:', apiBase);
      console.log('Request URL:', `${apiBase}/api/meal/analyze`);

      const response = await this.fetchWithRetry(
        `${apiBase}/api/meal/analyze`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 1,
            meal_type: 'breakfast',
            foods: foods
          })
        },
        2, // max retries
        45000 // 45 second timeout
      );

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error('Failed to analyze meal:', error);
      throw error;
    }
  }

  static async getFoodRecommendations(mealType: string, goal: string) {
    try {
      const apiBase = this.getApiBase();
      console.log('API Base URL:', apiBase);
      console.log('Request URL:', `${apiBase}/api/ask`);

      const response = await this.fetchWithRetry(
        `${apiBase}/api/ask`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: `What are some healthy ${mealType} options for ${goal} goal?`
          })
        },
        2, // max retries
        30000 // 30 second timeout
      );

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error('Failed to get food recommendations:', error);
      throw error;
    }
  }

  static async getAgentAnalysis(question: string) {
    try {
      const apiBase = this.getApiBase();
      console.log('API Base URL:', apiBase);
      console.log('Request URL:', `${apiBase}/api/ask`);

      const response = await this.fetchWithRetry(
        `${apiBase}/api/ask`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: question })
        },
        2, // max retries
        30000 // 30 second timeout
      );

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error('Failed to get agent analysis:', error);
      throw error;
    }
  }
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export class LocalDatabase {
  static async init() {
    // No-op for AsyncStorage
  }

  static async createPlan(name: string, start_date: string, end_date: string, meals: string) {
    const planId = uuidv4();
    const plan = {
      id: planId,
      name,
      start_date,
      end_date,
      meals,
      created_at: new Date().toISOString()
    };
    await AsyncStorage.setItem(`plan_${planId}`, JSON.stringify(plan));
    return { insertId: planId };
  }

  static async getPlan(planId: number) {
    const plan = await AsyncStorage.getItem(`plan_${planId}`);
    return plan ? JSON.parse(plan) : null;
  }

  static async listPlans() {
    const keys = await AsyncStorage.getAllKeys();
    const planKeys = keys.filter(key => key.startsWith('plan_'));
    const plans = await Promise.all(planKeys.map(key => AsyncStorage.getItem(key)));
    return plans.map(value => value ? JSON.parse(value) : null).filter(Boolean);
  }
  static async updatePlan(planId: number, name: string, start_date: string, end_date: string, meals: string) {
    const plan = await this.getPlan(planId);
    if (plan) {
      plan.name = name;
      plan.start_date = start_date;
      plan.end_date = end_date;
      plan.meals = meals;
      await AsyncStorage.setItem(`plan_${planId}`, JSON.stringify(plan));
      return plan;
    }
    return null;
  }

  static async deletePlan(planId: number) {
    return await AsyncStorage.removeItem(`plan_${planId}`);
  }
}
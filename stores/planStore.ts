import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LocalDatabase } from '../services/localDatabase';

interface Plan {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  meals: any;
  created_at: string;
}

interface PlanStore {
  plans: Plan[];
  currentPlan: Plan | null;
  loading: boolean;
  error: string | null;

  // Actions
  loadPlans: () => Promise<void>;
  createPlan: (name: string, start_date: string, end_date: string, meals: any) => Promise<void>;
  getPlan: (planId: number) => Promise<void>;
  updatePlan: (planId: number, name: string, start_date: string, end_date: string, meals: any) => Promise<void>;
  deletePlan: (planId: number) => Promise<void>;
  setCurrentPlan: (plan: Plan | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePlanStore = create<PlanStore>()(
  persist(
    (set, get) => ({
      plans: [],
      currentPlan: null,
      loading: false,
      error: null,

      loadPlans: async () => {
        set({ loading: true, error: null });
        try {
          const plans = await LocalDatabase.listPlans();
          set({ plans, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      createPlan: async (name: string, start_date: string, end_date: string, meals: any) => {
        set({ loading: true, error: null });
        try {
          const result = await LocalDatabase.createPlan(name, start_date, end_date, JSON.stringify(meals));
          const newPlan: Plan = {
            id: Number(result.insertId),
            name,
            start_date,
            end_date,
            meals,
            created_at: new Date().toISOString()
          };
          set((state) => ({
            plans: [...state.plans, newPlan],
            loading: false
          }));
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      getPlan: async (planId: number) => {
        set({ loading: true, error: null });
        try {
          const plan = await LocalDatabase.getPlan(planId);
          if (plan) {
            set({
              currentPlan: { ...plan, meals: JSON.parse(plan.meals) },
              loading: false
            });
          } else {
            set({ error: 'Plan not found', loading: false });
          }
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      updatePlan: async (planId: number, name: string, start_date: string, end_date: string, meals: any) => {
        set({ loading: true, error: null });
        try {
          await LocalDatabase.updatePlan(planId, name, start_date, end_date, JSON.stringify(meals));
          set((state) => ({
            plans: state.plans.map(p => p.id === planId ? { ...p, name, start_date, end_date, meals } : p),
            loading: false
          }));
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      deletePlan: async (planId: number) => {
        set({ loading: true, error: null });
        try {
          await LocalDatabase.deletePlan(planId);
          set((state) => ({
            plans: state.plans.filter(p => p.id !== planId),
            loading: false
          }));
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      setCurrentPlan: (plan: Plan | null) => set({ currentPlan: plan }),
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
    }),
    {
      name: 'plan-storage',
      partialize: (state) => ({ plans: state.plans, currentPlan: state.currentPlan })
    }
  )
);
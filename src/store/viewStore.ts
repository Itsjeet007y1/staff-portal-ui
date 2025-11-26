import { create } from 'zustand';
import { ViewMode, Employee } from '@/models';

interface ViewState {
  viewMode: ViewMode;
  selectedEmployee: Employee | null;
  setViewMode: (mode: ViewMode) => void;
  setSelectedEmployee: (emp: Employee | null) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  viewMode: 'grid',
  selectedEmployee: null,
  setViewMode: (mode) => set({ viewMode: mode }),
  setSelectedEmployee: (emp) => set({ selectedEmployee: emp }),
}));

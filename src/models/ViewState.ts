import { Employee } from './Employee';

export type ViewMode = 'grid' | 'tile' | 'details';

export interface ViewState {
  viewMode: ViewMode;
  selectedEmployee: Employee | null;
  setViewMode: (mode: ViewMode) => void;
  setSelectedEmployee: (emp: Employee | null) => void;
}

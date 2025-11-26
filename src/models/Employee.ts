export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Employee {
  id: string;
  name: string;
  age: number;
  department: string;
  skills: string[];
  attendance: number;
}

export interface EmployeePage {
  totalElements: number;
  totalPages: number;
  content: Employee[];
}

export interface EmployeeInput {
  name: string;
  age: number;
  department: string;
  skills: string[];
  attendance: number;
}

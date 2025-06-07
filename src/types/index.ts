export interface Course {
  id: string;
  name: string;
  creditHours: number;
  grade: string | number;
  gradePoint: number;
}

export interface AcademicYear {
  id: string;
  name: string;
  courses: Course[];
}

export interface AppState {
  years: AcademicYear[];
  gradeSystem: 'standard' | 'custom';
}

export const standardGrades = [
  { name: 'A+', value: 4.0 },
  { name: 'A', value: 3.75 },
  { name: 'A-', value: 3.5 },
  { name: 'B+', value: 3.25 },
  { name: 'B', value: 3.0 },
  { name: 'B-', value: 2.75 },
  { name: 'C+', value: 2.5 },
  { name: 'C', value: 2.25 },
  { name: 'D', value: 2.0 },
  { name: 'F', value: 0.0 }
];
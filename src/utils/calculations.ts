import { AcademicYear, Course } from '../types';

export const calculateCoursePoints = (course: Course): number => {
  return course.creditHours * course.gradePoint;
};

export const calculateYearGPA = (year: AcademicYear): number => {
  if (!year.courses.length) return 0;

  const totalCreditHours = year.courses.reduce((sum, course) => sum + course.creditHours, 0);
  const totalPoints = year.courses.reduce((sum, course) => sum + calculateCoursePoints(course), 0);

  return totalCreditHours ? Number((totalPoints / totalCreditHours).toFixed(2)) : 0;
};

export const calculateCumulativeGPA = (years: AcademicYear[]): number => {
  if (!years.length) return 0;

  let totalCreditHours = 0;
  let totalPoints = 0;

  years.forEach(year => {
    year.courses.forEach(course => {
      totalCreditHours += course.creditHours;
      totalPoints += calculateCoursePoints(course);
    });
  });

  return totalCreditHours ? Number((totalPoints / totalCreditHours).toFixed(2)) : 0;
};

export const getGradePointFromStandardGrade = (grade: string): number => {
  const gradeMap: Record<string, number> = {
    'A+': 4.0,
    'A': 3.75,
    'A-': 3.5,
    'B+': 3.25,
    'B': 3.0,
    'B-': 2.75,
    'C+': 2.5,
    'C': 2.25,
    'D': 2.0,
    'F': 0.0
  };

  return gradeMap[grade] || 0;
};

export const formatGPA = (gpa: number): string => {
  return gpa.toFixed(2);
};
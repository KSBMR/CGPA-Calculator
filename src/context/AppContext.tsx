import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, AcademicYear, Course } from '../types';

type AppContextType = {
  state: AppState;
  addYear: (name: string) => void;
  updateYear: (id: string, name: string) => void;
  removeYear: (id: string) => void;
  addCourse: (yearId: string, course: Omit<Course, 'id'>) => void;
  updateCourse: (yearId: string, course: Course) => void;
  removeCourse: (yearId: string, courseId: string) => void;
  setGradeSystem: (system: 'standard' | 'custom') => void;
};

const initialState: AppState = {
  years: [],
  gradeSystem: 'standard'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const savedState = localStorage.getItem('cgpaCalculatorState');
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('cgpaCalculatorState', JSON.stringify(state));
  }, [state]);

  const addYear = (name: string) => {
    const newYear: AcademicYear = {
      id: Date.now().toString(),
      name,
      courses: []
    };
    setState(prev => ({
      ...prev,
      years: [...prev.years, newYear]
    }));
  };

  const updateYear = (id: string, name: string) => {
    setState(prev => ({
      ...prev,
      years: prev.years.map(year => (year.id === id ? { ...year, name } : year))
    }));
  };

  const removeYear = (id: string) => {
    setState(prev => ({
      ...prev,
      years: prev.years.filter(year => year.id !== id)
    }));
  };

  const addCourse = (yearId: string, courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString()
    };

    setState(prev => ({
      ...prev,
      years: prev.years.map(year => 
        year.id === yearId 
          ? { ...year, courses: [...year.courses, newCourse] } 
          : year
      )
    }));
  };

  const updateCourse = (yearId: string, updatedCourse: Course) => {
    setState(prev => ({
      ...prev,
      years: prev.years.map(year => 
        year.id === yearId 
          ? { 
              ...year, 
              courses: year.courses.map(course => 
                course.id === updatedCourse.id ? updatedCourse : course
              ) 
            } 
          : year
      )
    }));
  };

  const removeCourse = (yearId: string, courseId: string) => {
    setState(prev => ({
      ...prev,
      years: prev.years.map(year => 
        year.id === yearId 
          ? { ...year, courses: year.courses.filter(course => course.id !== courseId) } 
          : year
      )
    }));
  };

  const setGradeSystem = (system: 'standard' | 'custom') => {
    setState(prev => ({
      ...prev,
      gradeSystem: system
    }));
  };

  return (
    <AppContext.Provider value={{ 
      state, 
      addYear, 
      updateYear, 
      removeYear, 
      addCourse, 
      updateCourse, 
      removeCourse,
      setGradeSystem
    }}>
      {children}
    </AppContext.Provider>
  );
};
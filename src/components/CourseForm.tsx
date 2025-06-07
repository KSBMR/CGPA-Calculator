import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import GradeSelector from './GradeSelector';
import { Course } from '../types';
import { PlusCircle } from 'lucide-react';

interface CourseFormProps {
  yearId: string;
  onAddCourse?: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ yearId, onAddCourse }) => {
  const { addCourse, state } = useAppContext();
  const [courseName, setCourseName] = useState('');
  const [creditHours, setCreditHours] = useState<number | ''>('');
  const [grade, setGrade] = useState<string | number>('');
  const [gradePoint, setGradePoint] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseName || !creditHours) return;
    
    const newCourse: Omit<Course, 'id'> = {
      name: courseName,
      creditHours: Number(creditHours),
      grade,
      gradePoint
    };
    
    addCourse(yearId, newCourse);
    
    // Reset form
    setCourseName('');
    setCreditHours('');
    setGrade('');
    setGradePoint(0);
    
    if (onAddCourse) onAddCourse();
  };

  const handleGradeChange = (value: string | number, gp: number) => {
    setGrade(value);
    setGradePoint(gp);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4 text-indigo-900">Add New Course</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Mathematics 101"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Credit Hours</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 3"
            min="0.5"
            step="0.5"
            value={creditHours}
            onChange={(e) => setCreditHours(e.target.value ? Number(e.target.value) : '')}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
          <GradeSelector 
            value={grade} 
            onChange={handleGradeChange} 
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        <PlusCircle size={18} />
        <span>Add Course</span>
      </button>
    </form>
  );
};

export default CourseForm;
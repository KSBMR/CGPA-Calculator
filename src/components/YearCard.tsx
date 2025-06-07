import React, { useState } from 'react';
import { AcademicYear } from '../types';
import CourseForm from './CourseForm';
import CourseList from './CourseList';
import { calculateYearGPA } from '../utils/calculations';
import { ChevronDown, ChevronUp, Edit, Trash2, Save, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface YearCardProps {
  year: AcademicYear;
}

const YearCard: React.FC<YearCardProps> = ({ year }) => {
  const { updateYear, removeYear } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [yearName, setYearName] = useState(year.name);
  
  const yearGPA = calculateYearGPA(year);
  const totalCreditHours = year.courses.reduce((sum, course) => sum + course.creditHours, 0);

  const handleUpdateName = () => {
    updateYear(year.id, yearName);
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setYearName(year.name);
    setIsEditingName(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 transition-all duration-300">
      <div className="bg-indigo-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="p-1 rounded text-gray-800"
                value={yearName}
                onChange={(e) => setYearName(e.target.value)}
                autoFocus
              />
              <button 
                onClick={handleUpdateName}
                className="p-1 bg-green-500 rounded hover:bg-green-600"
              >
                <Save size={16} />
              </button>
              <button 
                onClick={handleCancelEdit}
                className="p-1 bg-gray-500 rounded hover:bg-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold">{year.name}</h2>
              <button 
                onClick={() => setIsEditingName(true)} 
                className="p-1 bg-indigo-700 rounded hover:bg-indigo-600"
              >
                <Edit size={16} />
              </button>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm opacity-90">CGPA</div>
            <div className="text-2xl font-bold">{yearGPA.toFixed(2)}</div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => removeYear(year.id)}
              className="p-1 bg-red-600 rounded hover:bg-red-700"
              title="Delete Year"
            >
              <Trash2 size={18} />
            </button>
            
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 bg-indigo-700 rounded hover:bg-indigo-600"
            >
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <div className="mb-4 text-right">
            <span className="text-gray-600 font-medium">Total Courses: </span>
            <span className="font-semibold">{year.courses.length}</span>
            <span className="mx-3">|</span>
            <span className="text-gray-600 font-medium">Total Credit Hours: </span>
            <span className="font-semibold">{totalCreditHours}</span>
          </div>
          
          <CourseForm yearId={year.id} />
          <CourseList yearId={year.id} courses={year.courses} />
        </div>
      )}
    </div>
  );
};

export default YearCard;
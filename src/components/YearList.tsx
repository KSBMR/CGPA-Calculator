import React from 'react';
import YearCard from './YearCard';
import { useAppContext } from '../context/AppContext';
import { calculateCumulativeGPA } from '../utils/calculations';
import { GraduationCap, Plus } from 'lucide-react';

const YearList: React.FC = () => {
  const { state, addYear } = useAppContext();
  const { years } = state;
  
  const cumulativeGPA = calculateCumulativeGPA(years);
  const totalYears = years.length;
  const totalCourses = years.reduce((count, year) => count + year.courses.length, 0);
  const totalCreditHours = years.reduce(
    (sum, year) => sum + year.courses.reduce((yearSum, course) => yearSum + course.creditHours, 0), 
    0
  );

  const handleAddYear = () => {
    const yearNumber = years.length + 1;
    addYear(`Year ${yearNumber}`);
  };

  return (
    <div className="mt-6">
      {years.length > 0 && (
        <div className="bg-indigo-900 text-white p-4 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex items-center">
              <GraduationCap size={36} className="mr-3" />
              <div>
                <h2 className="text-2xl font-bold">Cumulative CGPA</h2>
                <p className="text-indigo-200">Overall academic performance</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between md:justify-end gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold">{cumulativeGPA.toFixed(2)}</div>
                <div className="text-xs uppercase tracking-wide mt-1 text-indigo-200">CGPA</div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-xl font-semibold">{totalYears}</div>
                  <div className="text-xs uppercase tracking-wide mt-1 text-indigo-200">Years</div>
                </div>
                
                <div className="text-center">
                  <div className="text-xl font-semibold">{totalCourses}</div>
                  <div className="text-xs uppercase tracking-wide mt-1 text-indigo-200">Courses</div>
                </div>
                
                <div className="text-center">
                  <div className="text-xl font-semibold">{totalCreditHours}</div>
                  <div className="text-xs uppercase tracking-wide mt-1 text-indigo-200">Credits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {years.map(year => (
        <YearCard key={year.id} year={year} />
      ))}
      
      <div className="mt-6 text-center">
        <button
          onClick={handleAddYear}
          className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center mx-auto gap-2"
        >
          <Plus size={20} />
          <span>Add Academic Year</span>
        </button>
      </div>
    </div>
  );
};

export default YearList;
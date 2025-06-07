import React from 'react';
import { useAppContext } from '../context/AppContext';
import { standardGrades } from '../types';

interface GradeSelectorProps {
  value: string | number;
  onChange: (value: string | number, gradePoint: number) => void;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({ value, onChange }) => {
  const { state } = useAppContext();
  
  if (state.gradeSystem === 'standard') {
    return (
      <select 
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value as string}
        onChange={(e) => {
          const selectedGrade = e.target.value;
          const gradePoint = standardGrades.find(grade => grade.name === selectedGrade)?.value || 0;
          onChange(selectedGrade, gradePoint);
        }}
      >
        <option value="" disabled>Select Grade</option>
        {standardGrades.map(grade => (
          <option key={grade.name} value={grade.name}>
            {grade.name} ({grade.value.toFixed(2)})
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <input
        type="number"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter GPA (e.g., 3.75)"
        min="0"
        max="4"
        step="0.01"
        value={value as number || ''}
        onChange={(e) => {
          const customGradePoint = parseFloat(e.target.value);
          onChange(customGradePoint, customGradePoint);
        }}
      />
    );
  }
};

export default GradeSelector;
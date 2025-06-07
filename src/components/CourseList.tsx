import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Course } from '../types';
import GradeSelector from './GradeSelector';
import { Pencil, Trash2, Save, X } from 'lucide-react';

interface CourseListProps {
  yearId: string;
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ yearId, courses }) => {
  const { updateCourse, removeCourse } = useAppContext();
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Course | null>(null);

  const handleEdit = (course: Course) => {
    setEditingCourse(course.id);
    setEditForm({ ...course });
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
    setEditForm(null);
  };

  const handleSaveEdit = () => {
    if (editForm) {
      updateCourse(yearId, editForm);
      setEditingCourse(null);
      setEditForm(null);
    }
  };

  const handleGradeChange = (value: string | number, gradePoint: number) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        grade: value,
        gradePoint
      });
    }
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 italic">
        No courses added yet. Add your first course above.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left border-b">Course Name</th>
            <th className="py-2 px-4 text-center border-b">Credit Hours</th>
            <th className="py-2 px-4 text-center border-b">Grade</th>
            <th className="py-2 px-4 text-center border-b">Grade Point</th>
            <th className="py-2 px-4 text-center border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id} className="border-b hover:bg-gray-50">
              {editingCourse === course.id ? (
                // Edit mode
                <>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      className="w-full p-1 border border-gray-300 rounded"
                      value={editForm?.name || ''}
                      onChange={(e) => setEditForm(prev => prev ? {...prev, name: e.target.value} : null)}
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      className="w-full p-1 border border-gray-300 rounded text-center"
                      value={editForm?.creditHours || 0}
                      min="0.5"
                      step="0.5"
                      onChange={(e) => setEditForm(prev => prev ? {...prev, creditHours: Number(e.target.value)} : null)}
                    />
                  </td>
                  <td className="py-2 px-4">
                    <GradeSelector
                      value={editForm?.grade || ''}
                      onChange={handleGradeChange}
                    />
                  </td>
                  <td className="py-2 px-4 text-center">
                    {editForm?.gradePoint.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={handleSaveEdit}
                        className="p-1 text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        <Save size={16} />
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="p-1 text-white bg-gray-500 rounded hover:bg-gray-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                // View mode
                <>
                  <td className="py-2 px-4">{course.name}</td>
                  <td className="py-2 px-4 text-center">{course.creditHours}</td>
                  <td className="py-2 px-4 text-center">{course.grade}</td>
                  <td className="py-2 px-4 text-center">{course.gradePoint.toFixed(2)}</td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => handleEdit(course)}
                        className="p-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => removeCourse(yearId, course.id)}
                        className="p-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
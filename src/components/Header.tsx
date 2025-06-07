import React from 'react';
import { useAppContext } from '../context/AppContext';
import { GraduationCap, Download, Printer } from 'lucide-react';

const Header: React.FC = () => {
  const { state, setGradeSystem } = useAppContext();

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'cgpa-calculator-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <header className="bg-white shadow-md print:shadow-none">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-indigo-800 text-white p-2 rounded-lg mr-3">
              <GraduationCap size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">CGPA Calculator</h1>
              <p className="text-gray-600">Track your academic performance</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-gray-100 rounded-md p-2">
              <div className="flex gap-1">
                <button
                  className={`px-3 py-1 rounded-md transition-colors ${
                    state.gradeSystem === 'standard' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setGradeSystem('standard')}
                >
                  Standard Grades
                </button>
                <button
                  className={`px-3 py-1 rounded-md transition-colors ${
                    state.gradeSystem === 'custom' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setGradeSystem('custom')}
                >
                  Custom CGPA
                </button>
              </div>
            </div>
            
            <div className="print:hidden flex gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-1 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
                title="Export Data"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              <button
                onClick={handlePrint}
                className="flex items-center gap-1 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
                title="Print Results"
              >
                <Printer size={16} />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-10 print:hidden">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} CGPA Calculator. All rights reserved.</p>
        <p className="text-sm mt-2">
          A tool for students to track and calculate their academic performance.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
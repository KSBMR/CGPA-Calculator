import React from 'react';
import Header from './components/Header';
import YearList from './components/YearList';
import Footer from './components/Footer';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-6 flex-grow">
          <YearList />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
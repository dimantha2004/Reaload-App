import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneCall, Clock, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <PhoneCall className="h-6 w-6" />
            <h1 className="text-xl font-bold">SmartReload</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className={`transition-colors hover:text-blue-200 ${location.pathname === '/' ? 'font-semibold' : ''}`}>
              Home
            </Link>
            <Link to="/reload" className={`transition-colors hover:text-blue-200 ${location.pathname === '/reload' ? 'font-semibold' : ''}`}>
              Reload
            </Link>
            <Link to="/history" className={`transition-colors hover:text-blue-200 ${location.pathname === '/history' ? 'font-semibold' : ''}`}>
              History
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">&copy; 2025 SmartReload. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around">
          <Link to="/" className={`flex flex-col items-center p-3 ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/reload" className={`flex flex-col items-center p-3 ${location.pathname === '/reload' ? 'text-blue-600' : 'text-gray-600'}`}>
            <PhoneCall className="h-6 w-6" />
            <span className="text-xs mt-1">Reload</span>
          </Link>
          <Link to="/history" className={`flex flex-col items-center p-3 ${location.pathname === '/history' ? 'text-blue-600' : 'text-gray-600'}`}>
            <Clock className="h-6 w-6" />
            <span className="text-xs mt-1">History</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ReloadPage from './pages/ReloadPage';
import HistoryPage from './pages/HistoryPage';
import ReceiptPage from './pages/ReceiptPage';
import { TransactionProvider } from './context/TransactionContext';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <TransactionProvider>
      <Router>
        <Toaster position="top-center" />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reload" element={<ReloadPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/receipt/:id" element={<ReceiptPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </TransactionProvider>
  );
}

export default App;
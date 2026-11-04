import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App({ releaseData, onDownload }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-ink font-sans">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home releaseData={releaseData} onDownload={onDownload} />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

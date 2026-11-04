import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import { useRelease } from './hooks/useRelease';
import { useDownload } from './hooks/useDownload';

export default function App() {
  const { releaseData, loading } = useRelease();
  const { handleDownload } = useDownload(releaseData);

  return (
    <div className="min-h-screen flex flex-col bg-background text-ink font-sans overflow-x-clip">
      <ScrollProgress />
      <Navbar releaseData={releaseData} onDownload={handleDownload} />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                releaseData={releaseData}
                loading={loading}
                onDownload={handleDownload}
              />
            }
          />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

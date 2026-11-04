import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import Home from './pages/Home';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import MatchLandingPage from './pages/MatchLandingPage';
import AdminBroadcastPage from './pages/AdminBroadcastPage';
import UpdateNotificationBanner from './components/ui/UpdateNotificationBanner';
import { useRelease } from './hooks/useRelease';
import { useDownload } from './hooks/useDownload';

export default function App() {
  const { releaseData, loading } = useRelease();
  const { handleDownload } = useDownload(releaseData);

  return (
    <div className="min-h-screen flex flex-col bg-background text-ink font-sans overflow-x-clip">
      <ScrollToTop />
      <ScrollProgress />
      <UpdateNotificationBanner releaseData={releaseData} onDownload={handleDownload} />
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
          <Route
            path="/match/:matchId"
            element={
              <MatchLandingPage
                releaseData={releaseData}
                onDownload={handleDownload}
              />
            }
          />
          <Route
            path="/m/:matchId"
            element={
              <MatchLandingPage
                releaseData={releaseData}
                onDownload={handleDownload}
              />
            }
          />
          <Route
            path="/admin/broadcast"
            element={<AdminBroadcastPage releaseData={releaseData} />}
          />
          <Route
            path="/broadcast"
            element={<AdminBroadcastPage releaseData={releaseData} />}
          />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}

import React from 'react';
import HeroSection from '../components/Hero/HeroSection';
import FeaturesSection from '../components/Features/FeaturesSection';

export default function Home({ releaseData, onDownload }) {
  return (
    <div>
      <HeroSection releaseData={releaseData} onDownload={onDownload} />
      <FeaturesSection />

      {/* Placeholders for upcoming sections */}
      <div id="showcase" />
      <div id="install" />
      <div id="faq" />
    </div>
  );
}

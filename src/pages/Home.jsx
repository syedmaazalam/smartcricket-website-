import React from 'react';
import HeroSection from '../components/Hero/HeroSection';
import FeaturesSection from '../components/Features/FeaturesSection';
import SeeInActionSection from '../components/Showcase/SeeInActionSection';
import InstallSection from '../components/Install/InstallSection';
import FAQSection from '../components/FAQ/FAQSection';
import CTASection from '../components/CTA/CTASection';

export default function Home({ releaseData, onDownload }) {
  return (
    <div>
      <HeroSection releaseData={releaseData} onDownload={onDownload} />
      <FeaturesSection />
      <SeeInActionSection />
      <InstallSection />
      <FAQSection />
      <CTASection releaseData={releaseData} onDownload={onDownload} />
    </div>
  );
}

'use client';

import { useState } from 'react';
import TabNavigation, { TabType } from '@/components/TabNavigation';
import ScrollableHomePage from '@/components/pages/ScrollableHomePage';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // The ScrollableHomePage component will handle scrolling automatically
    // when activeTab changes
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      {/* Unscaled spacer equal to nav height (approx 56px). Adjust if you tweak nav size. */}
      <div style={{ height: 57 }} />
      <main>
        <ScrollableHomePage 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
        />
      </main>
      <Footer onNavigate={handleTabChange} />
    </div>
  );
}
'use client';

import React, { useState, ChangeEvent, useRef, useEffect } from 'react';

type TabType = 'about' | 'experiences' | 'recommended';

interface TabContent {
  about: string;
  experiences: string;
  recommended: string;
}

export default function ProfileWidget() {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=400&fit=crop'
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tabContent: TabContent = {
    about: "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY& have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calender is usually blocked between 9-10 AM. This is a...",
    experiences: "With over 3 years at Salesforce, I've successfully managed enterprise accounts and driven significant revenue growth. My expertise includes solution selling, stakeholder management, and building long-term client relationships.\n\nI specialize in cloud solutions and have helped numerous businesses transform their operations through strategic technology implementations.",
    recommended: "I highly recommend exploring Salesforce's latest AI-powered features for sales automation. The Einstein Analytics platform has been a game-changer for data-driven decision making.\n\nFor new users, I suggest starting with Trailhead - Salesforce's free learning platform. It's an excellent way to get hands-on experience with the platform."
  };

  // Update indicator position when active tab changes
  useEffect(() => {
    const activeTabIndex = ['about', 'experiences', 'recommended'].indexOf(activeTab);
    const activeTabElement = tabsRef.current[activeTabIndex];
    
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setIndicatorStyle({
        transform: `translateX(${offsetLeft}px)`,
        width: `${offsetWidth}px`,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      });
    }
  }, [activeTab]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Proper ref callback functions
  const setTabRef = (index: number) => (el: HTMLButtonElement | null) => {
    tabsRef.current[index] = el;
  };

  const handleAddImage = () => {
    const newImageIndex = (images.length % 10) + 1618005182384;
    const newImage = `https://images.unsplash.com/photo-${newImageIndex}?w=400&h=400&fit=crop`;
    setImages([...images, newImage]);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          setImages([...images, event.target.result]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => Math.max(0, prev - 3));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => Math.min(images.length - 3, prev + 3));
  };

  const visibleImages = images.slice(currentImageIndex, currentImageIndex + 3);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop';
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#373E44] to-[#191B1F] flex">
      {/* Left Half - Empty but Responsive */}
      <div className="hidden lg:block lg:w-1/2" />

      {/* Right Half - Widgets Container */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-[720px] flex flex-col gap-[18px]">
          
          {/* Widget 1: Tabbed Profile Card */}
          <div className="bg-[#363C43] rounded-[18.89px] shadow-[5.67px_5.67px_3.78px_0px_rgba(0,0,0,0.4)] p-[16px] lg:p-[20px]">
            {/* Question Mark Icon */}
            <div className="w-[24px] h-[24px] bg-[#171717] rounded-full flex items-center justify-center mb-[17px] shadow-[0px_4px_10px_rgba(0,0,0,0.5)]">
              <span className="text-[#A3ADB2] text-[14px] font-bold leading-none">?</span>
            </div>

            {/* Tabs Container */}
            <div className="bg-[#171717] rounded-[23px] p-[6px] flex gap-[6px] mb-[31px] shadow-[inset_0px_4.96px_12.4px_2.48px_rgba(0,0,0,0.5)] relative">
              {/* Animated Sliding Indicator */}
              <div 
                className="absolute h-[calc(100%-11.5px)] bg-[#28292F] rounded-[16px] shadow-[13.49px_16.87px_67.47px_8.43px_rgba(0,0,0,0.55),inset_0px_4.22px_13.49px_3.37px_rgba(255,255,255,0.05)]"
                style={indicatorStyle}
              />
              
              <button
                ref={setTabRef(0)}
                onClick={() => handleTabClick('about')}
                className={`flex-1 py-[12px] px-[24px] rounded-[16px] text-[18px] font-medium transition-all duration-300 relative z-10 ${
                  activeTab === 'about' ? 'text-white' : 'text-[#A3ADB2] hover:text-[#ccc]'
                }`}
              >
                About Me
              </button>
              <button
                ref={setTabRef(1)}
                onClick={() => handleTabClick('experiences')}
                className={`flex-1 py-[12px] px-[24px] rounded-[16px] text-[18px] font-medium transition-all duration-300 relative z-10 ${
                  activeTab === 'experiences' ? 'text-white' : 'text-[#A3ADB2] hover:text-[#ccc]'
                }`}
              >
                Experiences
              </button>
              <button
  ref={setTabRef(2)}
  onClick={() => handleTabClick('recommended')}
  className={`flex-1 py-[12px] px-[24px] rounded-[16px] text-[18px] font-medium transition-all duration-300 relative z-10 ${
    activeTab === 'recommended' ? 'text-white' : 'text-[#A3ADB2] hover:text-[#ccc]'
  }`}
>
  Recommended
</button>
            </div>

            {/* Tab Content with Custom Scrollbar */}
            <div className="relative">
              <div className="max-h-[175px] overflow-y-auto pr-[8px] scrollbar-custom">
                <p className="text-[#969696] text-[20px] leading-[25.2px] font-['Plus_Jakarta_Sans',sans-serif] whitespace-pre-line">
                  {tabContent[activeTab]}
                </p>
              </div>
            </div>
          </div>

          {/* Widget 2: Gallery */}
          <div className="bg-[#363C43] rounded-[18.89px] shadow-[5.67px_5.67px_3.78px_0px_rgba(0,0,0,0.4)] p-[16px] lg:p-[20px]">
            {/* Question Mark Icon */}
            <div className="w-[24px] h-[24px] bg-[#171717] rounded-full flex items-center justify-center mb-[25px] shadow-[0px_4px_10px_rgba(0,0,0,0.5)]">
              <span className="text-[#A3ADB2] text-[14px] font-bold leading-none">?</span>
            </div>

            {/* Gallery Header */}
            <div className="flex items-center justify-between mb-[49px]">
              <div className="bg-[#171717] rounded-[20px] px-[35px] py-[18px] shadow-[inset_0px_4.96px_12.4px_2.48px_rgba(0,0,0,0.5)]">
                <h3 className="text-white text-[20px] font-medium leading-none">Gallery</h3>
              </div>

              <div className="flex items-center gap-[34px]">
                {/* Add Image Button */}
                <label className="cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div 
                    className="bg-[#FFFFFF08] rounded-[104px] px-[24px] py-[16px] flex items-center gap-[8px] shadow-[0px_3.26px_3.26px_0px_rgba(255,255,255,0.15),4px_5px_30px_5px_rgba(0,0,0,0.4)] hover:shadow-[0px_3.26px_3.26px_0px_rgba(255,255,255,0.25),4px_5px_30px_5px_rgba(0,0,0,0.5)] transition-all duration-200 active:scale-95"
                    onClick={handleAddImage}
                  >
                    <span className="text-white text-[12px] font-extrabold tracking-[0.02em]">+ ADD IMAGE</span>
                  </div>
                </label>

                {/* Navigation Arrows */}
                <div className="flex gap-[15px]">
                  <button 
                    onClick={handlePrevImage}
                    disabled={currentImageIndex === 0}
                    className="w-[45px] h-[45px] rounded-full bg-gradient-to-b from-[#303439] to-[#161718] shadow-[-5px_-5px_10px_rgba(64,64,64,0.15),5px_5px_10px_rgba(0,0,0,0.75)] flex items-center justify-center hover:shadow-[-5px_-5px_10px_rgba(64,64,64,0.2),5px_5px_10px_rgba(0,0,0,0.8)] transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 13L5 8L10 3" stroke="#6F787C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    onClick={handleNextImage}
                    disabled={currentImageIndex >= images.length - 3}
                    className="w-[45px] h-[45px] rounded-full bg-gradient-to-b from-[#303439] to-[#161718] shadow-[-5px_-5px_10px_rgba(64,64,64,0.15),5px_5px_10px_rgba(0,0,0,0.75)] flex items-center justify-center hover:shadow-[-5px_-5px_10px_rgba(64,64,64,0.2),5px_5px_10px_rgba(0,0,0,0.8)] transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3L11 8L6 13" stroke="#6F787C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-[16px]">
              {visibleImages.map((img, index) => (
                <div
                  key={currentImageIndex + index}
                  className="aspect-square rounded-[24px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer hover:scale-105 shadow-[0px_4px_10px_rgba(0,0,0,0.5)]"
                >
                  <img
                    src={img}
                    alt={`Gallery ${currentImageIndex + index + 1}`}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles for Custom Scrollbar */}
      <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%);
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #4A4E54 0%, #2E3135 100%);
          border-radius: 10px;
          border: 2px solid transparent;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #5A5E64 0%, #3E4145 100%);
        }
        
        /* Firefox */
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #4A4E54 #1A1A1A;
        }
      `}</style>
    </div>
  );
}
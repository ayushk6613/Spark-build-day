
import React, { useState, useEffect, useRef } from 'react';
import { CategoryData, TierCategory } from '../types';

interface TabSelectorProps {
  categories: CategoryData[];
  activeCategory: TierCategory;
  onChange: (category: TierCategory) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ categories, activeCategory, onChange }) => {
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = categories.findIndex(c => c.id === activeCategory);
    const activeTab = tabsRef.current[activeIndex];
    
    if (activeTab) {
      setSliderStyle({
        left: `${activeTab.offsetLeft}px`,
        width: `${activeTab.offsetWidth}px`,
        opacity: 1,
      });
    }
  }, [activeCategory, categories]);

  return (
    <div className="flex justify-center w-full mb-12">
      <div 
        role="tablist" 
        aria-label="Pricing Categories"
        className="pricing-toggle-container"
      >
        {/* Interactive Slider Background */}
        <div 
          className="toggle-slider"
          style={sliderStyle}
          aria-hidden="true"
        />

        {categories.map((category, index) => {
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              ref={el => tabsRef.current[index] = el}
              onClick={() => onChange(category.id)}
              role="tab"
              aria-selected={isActive}
              aria-label={`View ${category.title} pricing plans`}
              className={`pricing-toggle ${isActive ? 'active' : ''}`}
            >
              {category.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabSelector;

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Keyboard, Monitor, Zap, Flame } from 'lucide-react';
import { ProductCategory } from '../../types';

export const CategoryChips: React.FC<{
  onSelectCategory?: (cat: ProductCategory) => void;
  selectedCategory?: string;
}> = ({ onSelectCategory, selectedCategory }) => {
  const { setActiveTab } = useStore();

  const chips = [
    { label: 'Peripherals', icon: Keyboard, category: 'Peripherals' as ProductCategory },
    { label: 'Displays', icon: Monitor, category: 'Displays' as ProductCategory },
    { label: 'Charging', icon: Zap, category: 'Power & Charging' as ProductCategory },
    { label: 'Home Living', icon: Flame, category: 'Home & Living' as ProductCategory }
  ];

  const handleClick = (cat: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      setActiveTab('planners');
    }
  };

  return (
    <div className="categories-chips-section">
      {chips.map(chip => {
        const Icon = chip.icon;
        const isActive = selectedCategory === chip.category;
        return (
          <div 
            key={chip.label} 
            className={`category-chip-item ${isActive ? 'active' : ''}`}
            onClick={() => handleClick(chip.category)}
          >
            <Icon size={20} className="category-chip-icon" />
            <span className="category-chip-label">{chip.label}</span>
          </div>
        );
      })}
    </div>
  );
};

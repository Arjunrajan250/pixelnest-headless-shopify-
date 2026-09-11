import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Calendar, BookOpen, Layout, Sparkles } from 'lucide-react';
import { ProductCategory } from '../../types';

export const CategoryChips: React.FC<{
  onSelectCategory?: (cat: ProductCategory) => void;
  selectedCategory?: string;
}> = ({ onSelectCategory, selectedCategory }) => {
  const { setActiveTab } = useStore();

  const chips = [
    { label: 'Planners', icon: Calendar, category: 'Planners' as ProductCategory },
    { label: 'Ebooks', icon: BookOpen, category: 'Ebooks' as ProductCategory },
    { label: 'Templates', icon: Layout, category: 'Templates' as ProductCategory },
    { label: 'Presets', icon: Sparkles, category: 'Presets' as ProductCategory }
  ];

  const handleClick = (cat: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      if (cat === 'Planners') {
        setActiveTab('planners');
      } else {
        setActiveTab('categories');
      }
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

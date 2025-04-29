import React from 'react';
import { Globe, Flag } from 'lucide-react';
import { AccentType } from '../../types';

interface AccentToggleProps {
  accent: AccentType;
  onChange: (accent: AccentType) => void;
}

export const AccentToggle: React.FC<AccentToggleProps> = ({ accent, onChange }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm p-1 bg-gray-100">
      <button
        type="button"
        className={`
          flex items-center px-3 py-2 text-sm font-medium rounded-l-md
          transition-colors duration-200 ease-in-out
          ${accent === 'british' 
            ? 'bg-white text-blue-700 shadow-sm' 
            : 'text-gray-700 hover:bg-gray-50'}
        `}
        onClick={() => onChange('british')}
        aria-pressed={accent === 'british'}
      >
        <Flag size={16} className="mr-2" />
        British
      </button>
      <button
        type="button"
        className={`
          flex items-center px-3 py-2 text-sm font-medium rounded-r-md
          transition-colors duration-200 ease-in-out
          ${accent === 'american' 
            ? 'bg-white text-blue-700 shadow-sm' 
            : 'text-gray-700 hover:bg-gray-50'}
        `}
        onClick={() => onChange('american')}
        aria-pressed={accent === 'american'}
      >
        <Globe size={16} className="mr-2" />
        American
      </button>
    </div>
  );
};
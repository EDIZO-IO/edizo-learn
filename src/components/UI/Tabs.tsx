import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: Tab[];
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange, tabs, className = '' }) => {
  return (
    <div className={`flex border-b ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium relative ${
            activeTab === tab.id
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute inset-x-0 bottom-[-2px] h-0.5 bg-blue-600"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
import React from 'react';
import { Tab } from '@store/interfaces.ts';

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  changeTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, changeTab }) => {
  const changeHandler = (currentStatus: string) => {
    changeTab(currentStatus);
  };

  return (
    <aside className="w-full flex justify-between items-center">
      <div className="flex gap-2">
        {tabs.map(tab => (
          <div
            data-testid="tab"
            key={tab.id}
            onClick={() => changeHandler(tab.status)}
            className={`p-3 hover:border-gray-300 cursor-pointer border-b-2 ${
              tab.status === activeTab ? 'border-white' : 'border-transparent'
            } relative transition-colors`}
          >
            {tab.status === activeTab && (
              <div className="absolute bottom-0 left-0 w-full h-auto bg-white"></div>
            )}
            <span>{tab.status}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Tabs;

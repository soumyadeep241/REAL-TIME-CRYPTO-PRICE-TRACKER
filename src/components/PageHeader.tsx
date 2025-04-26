import React from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="text-primary-600" />
          {title}
        </h1>
        {subtitle && <p className="text-neutral-600 mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-500 flex items-center gap-1">
          <RefreshCw size={14} className="animate-spin [animation-duration:3s]" />
          Live updates
        </span>
      </div>
    </div>
  );
};

export default PageHeader;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { updateSortState, selectSortState } from '../store/slices/cryptoSlice';
import { SortKey } from '../types/crypto';
import InfoTooltip from './InfoTooltip';

interface TableHeaderProps {
  column: {
    key: SortKey;
    label: string;
    tooltip?: string;
    className?: string;
    sortable?: boolean;
  };
}

const CryptoTableHeader: React.FC<TableHeaderProps> = ({ column }) => {
  const dispatch = useDispatch();
  const sortState = useSelector(selectSortState);
  const { key, label, tooltip, className = '', sortable = true } = column;

  const handleSort = () => {
    if (!sortable) return;
    dispatch(updateSortState({ key }));
  };

  // Determine which sort icon to show
  const renderSortIcon = () => {
    if (!sortable) return null;
    
    if (sortState.key === key) {
      return sortState.direction === 'asc' ? (
        <ArrowUp size={16} />
      ) : (
        <ArrowDown size={16} />
      );
    }
    
    return <ArrowUpDown size={16} className="opacity-40" />;
  };

  return (
    <th 
      className={`px-4 py-3 text-left font-semibold text-sm whitespace-nowrap ${
        sortable ? 'cursor-pointer hover:bg-neutral-100' : ''
      } ${className}`}
      onClick={sortable ? handleSort : undefined}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {renderSortIcon()}
        {tooltip && <InfoTooltip content={tooltip} />}
      </div>
    </th>
  );
};

export default CryptoTableHeader;
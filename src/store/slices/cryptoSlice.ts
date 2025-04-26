import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoState, CryptoAsset, SortKey, SortDirection, SortState } from '../../types/crypto';
import { initialCryptoData } from '../../data/initialData';
import { RootState } from '../index';

const initialState: CryptoState = {
  assets: initialCryptoData,
  loading: false,
  error: null,
  sortState: {
    key: 'rank',
    direction: 'asc'
  }
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    // Update all crypto data (simulating WebSocket updates)
    updateCryptoData: (state, action: PayloadAction<CryptoAsset[]>) => {
      state.assets = action.payload;
    },
    
    // Update sort state
    updateSortState: (state, action: PayloadAction<{ key: SortKey, direction?: SortDirection }>) => {
      const { key, direction } = action.payload;
      
      // If the same key is clicked, toggle direction
      if (key === state.sortState.key && !direction) {
        state.sortState.direction = state.sortState.direction === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortState.key = key;
        state.sortState.direction = direction || 'asc';
      }
    },
    
    // Reset sort to default (by rank, ascending)
    resetSort: (state) => {
      state.sortState = {
        key: 'rank',
        direction: 'asc'
      };
    }
  }
});

// Export actions
export const { 
  updateCryptoData, 
  updateSortState,
  resetSort
} = cryptoSlice.actions;

// Selectors
export const selectAllCryptoAssets = (state: RootState) => state.crypto.assets;
export const selectSortState = (state: RootState) => state.crypto.sortState;

// Memoized selector for sorted crypto assets
export const selectSortedCryptoAssets = (state: RootState) => {
  const { assets, sortState } = state.crypto;
  const { key, direction } = sortState;
  
  return [...assets].sort((a, b) => {
    let aVal = a[key];
    let bVal = b[key];
    
    // Special case for name field (case-insensitive sort)
    if (key === 'name') {
      aVal = (a.name as string).toLowerCase();
      bVal = (b.name as string).toLowerCase();
    }
    
    // For numeric comparisons
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    // For string comparisons
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return direction === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    return 0;
  });
};

export default cryptoSlice.reducer;
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CryptoTable from './components/CryptoTable';
import PageHeader from './components/PageHeader';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-neutral-100">
        <div className="container mx-auto px-4 py-8">
          <PageHeader 
            title="Crypto Market" 
            subtitle="Real-time cryptocurrency prices and market data" 
          />
          <CryptoTable />
          
          <footer className="mt-8 text-center text-neutral-500 text-sm">
            <p>
              Data updates every 2 seconds (simulated WebSocket)
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} Crypto Tracker | Prices shown in USD
            </p>
          </footer>
        </div>
      </div>
    </Provider>
  );
}

export default App;
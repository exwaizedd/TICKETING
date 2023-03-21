import React from 'react';
import { createRoot } from 'react-dom/client';
import { Sepolia } from '@thirdweb-dev/chains';
import App from './App';
import { ThirdwebProvider } from '@thirdweb-dev/react';

import './styles/base/index.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = 'Sepolia';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={Sepolia}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);

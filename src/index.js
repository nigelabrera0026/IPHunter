/**
 * @author Nigel Abrera
 * @description Creating an IP Tracker that is fetched from an API and developing it in React
 * @date 10/16/2023
 */

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

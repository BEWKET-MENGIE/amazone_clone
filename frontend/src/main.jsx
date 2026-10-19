import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { DataProvider } from './Component/DataProvider/DataProvider'; // Make sure this path is correct
import { initialState, reducer } from './Utility/reducer'; // Check your reducer path

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider initialState={initialState} reducer={reducer}>
      <App />
    </DataProvider>
  </React.StrictMode>
);
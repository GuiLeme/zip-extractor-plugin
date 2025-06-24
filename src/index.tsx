import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ZipExtractor } from './components/zip-extractor';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <React.StrictMode>
    <ZipExtractor {...{
      uuid,
    }}
    />
  </React.StrictMode>,
);

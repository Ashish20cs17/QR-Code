import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';

function App() {
  const [text, setText] = useState('');

  return (
    <div className="app">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="qr-code">
        {text && <QRCodeCanvas value={text} size={256} />}
      </div>
    </div>
  );
}

export default App;

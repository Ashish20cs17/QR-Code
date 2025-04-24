import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import jsQR from 'jsqr';

function App() {
  const [text, setText] = useState('');
  const [qrResult, setQrResult] = useState('');
  const fileInputRef = useRef();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async function () {
      const img = new Image();
      img.src = reader.result;
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setQrResult(code.data);
        } else {
          setQrResult("No QR code found.");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="app" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🔁 QR Code Generator & Reader</h1>

      <div style={{ marginBottom: '30px' }}>
        <h2>➡️ Text to QR</h2>
        <input
          type="text"
          placeholder="Enter text or URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div style={{ marginTop: '10px' }}>
          {text && <QRCodeCanvas value={text} size={256} />}
        </div>
      </div>

      <hr />

      <div>
        <h2>⬅️ QR Code to Text</h2>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        <div style={{ marginTop: '10px', backgroundColor: '#eee', padding: '10px', borderRadius: '5px' }}>
          <strong>Scanned Text:</strong> {qrResult || "No QR scanned yet"}
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useRef } from 'react';
import { productAPI } from '../services/api';

const BarcodeScanner = ({ onProductScanned }) => {
  const [scanning, setScanning] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setScanning(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Cannot access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setScanning(false);
  };

  const handleManualScan = async () => {
    if (!manualBarcode.trim()) return;

    try {
      const response = await productAPI.getProductByBarcode(manualBarcode);
      onProductScanned(response.data.product);
      setManualBarcode('');
    } catch (error) {
      console.error('Barcode scan failed:', error);
      alert('Product not found!');
    }
  };

  const captureAndScan = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    try {
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('barcode_image', blob);
        
        const response = await productAPI.scanBarcode(formData);
        onProductScanned(response.data.product);
      }, 'image/jpeg');
    } catch (error) {
      console.error('Barcode scan failed:', error);
      alert('Scan failed! Please try manual entry.');
    }
  };

  return (
    <div className="barcode-scanner p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Barcode Scanner</h3>
      
      {/* Camera Section */}
      <div className="mb-4">
        {!scanning ? (
          <button
            onClick={startCamera}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Camera
          </button>
        ) : (
          <div>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full max-w-md border rounded"
            />
            <div className="mt-2 space-x-2">
              <button
                onClick={captureAndScan}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Capture & Scan
              </button>
              <button
                onClick={stopCamera}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close Camera
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Manual Barcode Entry */}
      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Manual Barcode Entry</h4>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter barcode manually"
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleManualScan()}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleManualScan}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
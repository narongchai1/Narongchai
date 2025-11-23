import React, { useState } from 'react';
import './Sales.css';

const Sales = ({ onBack }) => {
  const [barcode, setBarcode] = useState('');
  const [productName, setProductName] = useState('');
  const [cart, setCart] = useState([]);
  const [showCamera, setShowCamera] = useState(false);

  // ข้อมูลสินค้าจำลอง
  const products = [
    { id: 10000, barcode: '10000', name: 'น้ำส้ม', price: 30, unit: 'ขวด', stock: 200 },
    { id: 10001, barcode: '10001', name: 'ขนมขาโก๋', price: 40, unit: 'กระปุก', stock: 100 },
    { id: 10002, barcode: '10002', name: 'เค้กส้ม', price: 60, unit: 'ชิ้น', stock: 50 },
    { id: 10003, barcode: '10003', name: 'นมสด', price: 25, unit: 'กล่อง', stock: 80 },
    { id: 10004, barcode: '10004', name: 'บิสกิต', price: 20, unit: 'ถุง', stock: 120 }
  ];

  const handleBarcodeSearch = () => {
    if (!barcode.trim()) {
      alert('กรุณากรอกเลขบาร์โค้ด');
      return;
    }

    const product = products.find(p => p.barcode === barcode);
    if (product) {
      addToCart(product);
      setBarcode('');
    } else {
      alert('ไม่พบสินค้าด้วยเลขบาร์โค้ดนี้');
    }
  };

  const handleNameSearch = () => {
    if (!productName.trim()) {
      alert('กรุณากรอกชื่อรายการสินค้า');
      return;
    }

    const product = products.find(p => 
      p.name.toLowerCase().includes(productName.toLowerCase())
    );
    
    if (product) {
      addToCart(product);
      setProductName('');
    } else {
      alert('ไม่พบสินค้าด้วยชื่อนี้');
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleScanBarcode = () => {
    setShowCamera(true);
    // ในเวอร์ชันจริงจะเปิดกล้องสแกนบาร์โค้ด
    alert('📷 เปิดกล้องสแกนบาร์โค้ด (ในเวอร์ชันจริงจะทำงานกับกล้อง)');
    
    // จำลองการสแกนบาร์โค้ดหลังจาก 2 วินาที
    setTimeout(() => {
      setShowCamera(false);
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      setBarcode(randomProduct.barcode);
      alert(`สแกนบาร์โค้ดพบ: ${randomProduct.name}`);
    }, 2000);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('ไม่มีสินค้าในตะกร้า');
      return;
    }

    const total = calculateTotal();
    if (window.confirm(`ยืนยันการขาย จำนวน ${cart.length} รายการ รวม ${total} บาท?`)) {
      alert('✅ ขายสินค้าสำเร็จ!');
      setCart([]);
    }
  };

  return (
    <div className="sales-page">
      <button className="back-button" onClick={onBack}>
        ← กลับไปหน้าแรก
      </button>

      <div className="sales-content">
        <div className="sales-header">
          <h2>🛒 หน้าขายสินค้า</h2>
        </div>

        {/* ปุ่มค้นหาสินค้า */}
        <div className="search-section">
          <div className="search-group">
            <div className="search-header">
              <span>🔢 เลขบาร์โค้ด</span>
              <button 
                className="scan-button"
                onClick={handleScanBarcode}
                disabled={showCamera}
              >
                📷 สแกน
              </button>
            </div>
            <div className="search-input-group">
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="กรอกเลขบาร์โค้ด"
                onKeyPress={(e) => e.key === 'Enter' && handleBarcodeSearch()}
              />
              <button 
                className="search-button"
                onClick={handleBarcodeSearch}
              >
                🔍 ค้นหา
              </button>
            </div>
          </div>

          <div className="search-group">
            <div className="search-header">
              <span>📛 ชื่อรายการสินค้า</span>
            </div>
            <div className="search-input-group">
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="กรอกชื่อรายการสินค้า"
                onKeyPress={(e) => e.key === 'Enter' && handleNameSearch()}
              />
              <button 
                className="search-button"
                onClick={handleNameSearch}
              >
                🔍 ค้นหา
              </button>
            </div>
          </div>
        </div>

        {/* กล้องสแกน (จำลอง) */}
        {showCamera && (
          <div className="camera-overlay">
            <div className="camera-container">
              <div className="camera-frame">
                <div className="camera-animation">📷</div>
                <p>กำลังสแกนบาร์โค้ด...</p>
                <button 
                  className="cancel-scan"
                  onClick={() => setShowCamera(false)}
                >
                  ❌ ยกเลิก
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ตารางสินค้าในตะกร้า */}
        <div className="cart-section">
          <h3>📋 รายการสินค้าในตะกร้า</h3>
          
          {cart.length === 0 ? (
            <div className="empty-cart">
              🛒 ไม่มีสินค้าในตะกร้า
            </div>
          ) : (
            <div className="cart-table-container">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>เลขบาร์โค้ด</th>
                    <th>รายการ</th>
                    <th>จำนวน</th>
                    <th>ราคาขาย</th>
                    <th>หน่วย</th>
                    <th>รวม</th>
                    <th>การจัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td className="barcode-cell">{item.barcode}</td>
                      <td className="product-cell">{item.name}</td>
                      <td className="quantity-cell">
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="price-cell">฿{item.price}</td>
                      <td className="unit-cell">{item.unit}</td>
                      <td className="total-cell">฿{item.price * item.quantity}</td>
                      <td className="action-cell">
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          🗑️ ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* สรุปยอดขาย */}
          {cart.length > 0 && (
            <div className="checkout-section">
              <div className="total-summary">
                <div className="total-line">
                  <span>จำนวนรายการ:</span>
                  <span>{cart.length} รายการ</span>
                </div>
                <div className="total-line">
                  <span>จำนวนสินค้า:</span>
                  <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} ชิ้น</span>
                </div>
                <div className="total-line grand-total">
                  <span>ยอดขายรวม:</span>
                  <span>฿{calculateTotal()}</span>
                </div>
              </div>
              
              <div className="checkout-actions">
                <button 
                  className="clear-cart-btn"
                  onClick={() => setCart([])}
                >
                  🗑️ ล้างตะกร้า
                </button>
                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  💰 ชำระเงิน
                </button>
              </div>
            </div>
          )}
        </div>

        {/* รายการสินค้าทั้งหมด (สำหรับอ้างอิง) */}
        <div className="products-reference">
          <h4>📦 รายการสินค้าทั้งหมด</h4>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-barcode">{product.barcode}</div>
                <div className="product-name">{product.name}</div>
                <div className="product-price">฿{product.price}</div>
                <div className="product-unit">{product.unit}</div>
                <div className="product-stock">สต็อก: {product.stock}</div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  ➕ เพิ่ม
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
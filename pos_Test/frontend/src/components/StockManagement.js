import React, { useState } from 'react';
import './StockManagement.css';

const StockManagement = ({ onBack }) => {
  const [products, setProducts] = useState([
    { 
      id: 10000, 
      name: 'น้ำส้ม', 
      quantity: 10, 
      cost: 25, 
      price: 30, 
      unit: 'ขวด', 
      expiry: '2026-01-01',
      minStock: 50  // เพิ่มฟิลด์สินค้าใกล้จะหมด
    },
    { 
      id: 10001, 
      name: 'ขนมขาโก๋', 
      quantity: 100, 
      cost: 30, 
      price: 40, 
      unit: 'กระปุก', 
      expiry: '2026-12-30',
      minStock: 30
    },
    { 
      id: 10002, 
      name: 'เค้กส้ม', 
      quantity: 0, 
      cost: 55, 
      price: 60, 
      unit: 'ชิ้น', 
      expiry: '2026-11-30',
      minStock: 20
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    cost: '',
    price: '',
    unit: 'ขวด',
    expiry: '',
    minStock: ''  // เพิ่มฟิลด์สินค้าใกล้จะหมด
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.quantity && newProduct.cost && 
        newProduct.price && newProduct.expiry && newProduct.minStock) {
      const product = {
        id: Math.max(...products.map(p => p.id), 10000) + 1,
        name: newProduct.name,
        quantity: parseInt(newProduct.quantity),
        cost: parseInt(newProduct.cost),
        price: parseInt(newProduct.price),
        unit: newProduct.unit,
        expiry: newProduct.expiry,
        minStock: parseInt(newProduct.minStock)  // เพิ่มฟิลด์สินค้าใกล้จะหมด
      };
      
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        quantity: '',
        cost: '',
        price: '',
        unit: 'ขวด',
        expiry: '',
        minStock: ''
      });
      setShowAddForm(false);
      alert('เพิ่มสินค้าสำเร็จ!');
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) {
      setProducts(products.filter(product => product.id !== id));
      alert('ลบสินค้าสำเร็จ!');
    }
  };

  const getExpiryStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'expired';
    if (diffDays <= 30) return 'soon';
    return 'safe';
  };

  // ฟังก์ชันตรวจสอบสถานะสินค้าใกล้หมด
  const getStockStatus = (quantity, minStock) => {
    if (quantity === 0) return 'out-of-stock';
    if (quantity <= minStock) return 'low-stock';
    return 'in-stock';
  };

  return (
    <div className="stock-management">
      <button className="back-button" onClick={onBack}>
        ← กลับไปหน้าแรก
      </button>
      
      <div className="content">
        <div className="header">
          <h2>📦 จัดการสต็อกสินค้า</h2>
          <button 
            className="add-button"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? '✕ ยกเลิก' : '➕ เพิ่มสินค้า'}
          </button>
        </div>

        {/* Form เพิ่มสินค้า */}
        {showAddForm && (
          <div className="add-product-form">
            <h3>📝 เพิ่มสินค้าใหม่</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>📛 ชื่อสินค้า:</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="กรอกชื่อสินค้า"
                />
              </div>
              
              <div className="form-group">
                <label>🔢 จำนวนในสต็อก:</label>
                <input
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                  placeholder="กรอกจำนวน"
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label>⚠️ สต็อกขั้นต่ำ (แจ้งเตือน):</label>
                <input
                  type="number"
                  value={newProduct.minStock}
                  onChange={(e) => setNewProduct({...newProduct, minStock: e.target.value})}
                  placeholder="กรอกจำนวนที่ต้องการแจ้งเตือน"
                  min="0"
                />
                <small className="help-text">ระบบจะแจ้งเตือนเมื่อสินค้าใกล้หมดถึงจำนวนนี้</small>
              </div>
              
              <div className="form-group">
                <label>💰 ราคาต้นทุน:</label>
                <input
                  type="number"
                  value={newProduct.cost}
                  onChange={(e) => setNewProduct({...newProduct, cost: e.target.value})}
                  placeholder="กรอกราคาต้นทุน"
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label>🏷️ ราคาขาย:</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  placeholder="กรอกราคาขาย"
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label>📏 หน่วย:</label>
                <select
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                >
                  <option value="ขวด">ขวด</option>
                  <option value="กระปุก">กระปุก</option>
                  <option value="ชิ้น">ชิ้น</option>
                  <option value="ถุง">ถุง</option>
                  <option value="กล่อง">กล่อง</option>
                  <option value="แพ็ค">แพ็ค</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>📅 วันหมดอายุ:</label>
                <input
                  type="date"
                  value={newProduct.expiry}
                  onChange={(e) => setNewProduct({...newProduct, expiry: e.target.value})}
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button className="save-button" onClick={handleAddProduct}>
                💾 บันทึกสินค้า
              </button>
              <button 
                className="cancel-button" 
                onClick={() => setShowAddForm(false)}
              >
                ❌ ยกเลิก
              </button>
            </div>
          </div>
        )}

        <div className="section">
          <strong>📋 เลขบาร์โค้ด</strong>
        </div>
        
        <div className="table-container">
          <table className="stock-table">
            <thead>
              <tr>
                <th>เลขบาร์โค้ด</th>
                <th>รายการ</th>
                <th>จำนวน</th>
                <th>สต็อกขั้นต่ำ</th>
                <th>สถานะสต็อก</th>
                <th>ราคาต้นทุน</th>
                <th>ราคาขาย</th>
                <th>หน่วย</th>
                <th>วันหมดอายุ</th>
                <th>สถานะอายุ</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                const expiryStatus = getExpiryStatus(product.expiry);
                const stockStatus = getStockStatus(product.quantity, product.minStock);
                
                return (
                  <tr key={product.id} className={`row-status ${stockStatus}`}>
                    <td className="product-id">{product.id}</td>
                    <td className="product-name">{product.name}</td>
                    <td className="product-quantity">
                      <span className={stockStatus === 'low-stock' ? 'low-quantity' : ''}>
                        {product.quantity.toLocaleString()}
                      </span>
                    </td>
                    <td className="min-stock">{product.minStock.toLocaleString()}</td>
                    <td>
                      <span className={`stock-status-badge ${stockStatus}`}>
                        {stockStatus === 'out-of-stock' ? '❌ หมด' : 
                         stockStatus === 'low-stock' ? '⚠️ ใกล้หมด' : '✅ พร้อมขาย'}
                      </span>
                    </td>
                    <td className="product-cost">฿{product.cost.toLocaleString()}</td>
                    <td className="product-price">฿{product.price.toLocaleString()}</td>
                    <td className="product-unit">{product.unit}</td>
                    <td className="product-expiry">{product.expiry}</td>
                    <td>
                      <span className={`expiry-status-badge ${expiryStatus}`}>
                        {expiryStatus === 'expired' ? '❌ หมดอายุ' : 
                         expiryStatus === 'soon' ? '⚠️ ใกล้หมดอายุ' : '✅ ปกติ'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteProduct(product.id)}
                        title="ลบสินค้า"
                      >
                        🗑️ ลบ
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="no-data">
            📭 ไม่มีข้อมูลสินค้า
          </div>
        )}

        {/* สถิติสต็อก */}
        <div className="stock-stats">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <div className="stat-number">{products.length}</div>
              <div className="stat-label">รายการสินค้า</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔢</div>
            <div className="stat-info">
              <div className="stat-number">
                {products.reduce((sum, product) => sum + product.quantity, 0).toLocaleString()}
              </div>
              <div className="stat-label">จำนวนสินค้าทั้งหมด</div>
            </div>
          </div>
          <div className="stat-card warning">
            <div className="stat-icon">⚠️</div>
            <div className="stat-info">
              <div className="stat-number">
                {products.filter(p => getStockStatus(p.quantity, p.minStock) === 'low-stock').length}
              </div>
              <div className="stat-label">สินค้าใกล้หมด</div>
            </div>
          </div>
          <div className="stat-card danger">
            <div className="stat-icon">🚫</div>
            <div className="stat-info">
              <div className="stat-number">
                {products.filter(p => getStockStatus(p.quantity, p.minStock) === 'out-of-stock').length}
              </div>
              <div className="stat-label">สินค้าหมด</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;
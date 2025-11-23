import React, { useState } from 'react';
import './StockManagement.css';

const StockManagement = ({ onBack }) => {
  const [products, setProducts] = useState([
    { id: 10000, name: 'น้ำส้ม', quantity: 200, cost: 25, price: 30, unit: 'ขวด', expiry: '1/1/2026' },
    { id: 10001, name: 'ขนมขาโก๋', quantity: 100, cost: 30, price: 40, unit: 'กระปุก', expiry: '30/12/2026' },
    { id: 10002, name: 'เค้กส้ม', quantity: 50, cost: 55, price: 60, unit: 'ชิ้น', expiry: '30/11/2026' }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    cost: '',
    price: '',
    unit: 'ขวด',
    expiry: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.quantity && newProduct.cost && newProduct.price && newProduct.expiry) {
      const product = {
        id: Math.max(...products.map(p => p.id), 10000) + 1,
        name: newProduct.name,
        quantity: parseInt(newProduct.quantity),
        cost: parseInt(newProduct.cost),
        price: parseInt(newProduct.price),
        unit: newProduct.unit,
        expiry: newProduct.expiry
      };
      
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        quantity: '',
        cost: '',
        price: '',
        unit: 'ขวด',
        expiry: ''
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
                <label>🔢 จำนวน:</label>
                <input
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                  placeholder="กรอกจำนวน"
                />
              </div>
              
              <div className="form-group">
                <label>💰 ราคาต้นทุน:</label>
                <input
                  type="number"
                  value={newProduct.cost}
                  onChange={(e) => setNewProduct({...newProduct, cost: e.target.value})}
                  placeholder="กรอกราคาต้นทุน"
                />
              </div>
              
              <div className="form-group">
                <label>🏷️ ราคาขาย:</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  placeholder="กรอกราคาขาย"
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
          <strong>📋 เลขทะเบียนสินค้า</strong>
        </div>
        
        <div className="table-container">
          <table className="stock-table">
            <thead>
              <tr>
                <th>เลขทะเบียนที่</th>
                <th>รายการ</th>
                <th>จำนวน</th>
                <th>ราคาต้นทุน</th>
                <th>ราคาขาย</th>
                <th>หน่วย</th>
                <th>วันหมดอายุ</th>
                <th>สถานะ</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                const status = getExpiryStatus(product.expiry);
                return (
                  <tr key={product.id} className={`status-${status}`}>
                    <td className="product-id">{product.id}</td>
                    <td className="product-name">{product.name}</td>
                    <td className="product-quantity">{product.quantity.toLocaleString()}</td>
                    <td className="product-cost">฿{product.cost}</td>
                    <td className="product-price">฿{product.price}</td>
                    <td className="product-unit">{product.unit}</td>
                    <td className="product-expiry">{product.expiry}</td>
                    <td>
                      <span className={`status-badge ${status}`}>
                        {status === 'expired' ? '❌ หมดอายุ' : 
                         status === 'soon' ? '⚠️ ใกล้หมดอายุ' : '✅ ปกติ'}
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
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-info">
              <div className="stat-number">
                {products.filter(p => getExpiryStatus(p.expiry) === 'soon').length}
              </div>
              <div className="stat-label">ใกล้จะหมดอายุ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ต้องมีบรรทัดนี้!
export default StockManagement;
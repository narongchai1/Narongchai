import React from 'react';
import './Dashboard.css';

const Dashboard = ({ onLogout, onNavigate }) => {
  // ข้อมูลยอดขายรายวัน
  const dailySalesData = [
    { day: '25/10', ยอดขาย: 4200 },
    { day: '26/10', ยอดขาย: 5800 },
    { day: '27/10', ยอดขาย: 5100 },
    { day: '28/10', ยอดขาย: 6200 },
    { day: '29/10', ยอดขาย: 4800 },
    { day: '30/10', ยอดขาย: 5000 }
  ];

  // หาค่ายอดขายสูงสุดสำหรับการคำนวณความสูงของกราฟ
  const maxSales = Math.max(...dailySalesData.map(item => item.ยอดขาย));

  return (
    <div className="dashboard-page">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">แดชบอร์ดระบบ POS</h1>
        <button className="logout-button" onClick={onLogout}>
          🚪 ออกจากระบบ
        </button>
      </div>
      
      {/* Navigation Bar */}
      <div className="navigation-container">
        <div className="navigation">
          <button className="nav-button" onClick={() => onNavigate('sales')}>
            <span className="nav-icon">🛒</span>
            <span className="nav-text">การขาย</span>
          </button>
          <button className="nav-button" onClick={() => onNavigate('user-management')}>
            <span className="nav-icon">👥</span>
            <span className="nav-text">จัดการผู้ใช้งาน</span>
          </button>
          <button className="nav-button" onClick={() => onNavigate('stock-management')}>
            <span className="nav-icon">📦</span>
            <span className="nav-text">จัดการสต็อก</span>
          </button>
          <button className="nav-button" onClick={() => onNavigate('sales-report')}>
            <span className="nav-icon">📊</span>
            <span className="nav-text">รายงานการขาย</span>
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        {/* ส่วนซ้าย - กราฟยอดขายรายวัน */}
        <div className="left-panel">
          <div className="chart-container">
            <h3 className="chart-title">ยอดขายรายวัน (บาท)</h3>
            <div className="custom-line-chart">
              <div className="chart-y-axis">
                <div className="y-axis-label">{maxSales}</div>
                <div className="y-axis-label">{Math.round(maxSales * 0.75)}</div>
                <div className="y-axis-label">{Math.round(maxSales * 0.5)}</div>
                <div className="y-axis-label">{Math.round(maxSales * 0.25)}</div>
                <div className="y-axis-label">0</div>
              </div>
              <div className="chart-bars">
                {dailySalesData.map((item, index) => (
                  <div key={index} className="chart-bar-container">
                    <div 
                      className="chart-bar"
                      style={{ 
                        height: `${(item.ยอดขาย / maxSales) * 100}%` 
                      }}
                      title={`${item.day}: ${item.ยอดขาย.toLocaleString()} บาท`}
                    >
                      <div className="bar-value">{item.ยอดขาย.toLocaleString()}</div>
                    </div>
                    <div className="bar-label">{item.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sales-summary-cards">
            <div className="summary-card today-sales">
              <div className="card-title">ยอดขายวันนี้</div>
              <div className="card-amount">5,000 บาท</div>
              <div className="card-date">30/10/2025</div>
            </div>
            <div className="summary-card average-sales">
              <div className="card-title">ยอดขายเฉลี่ย</div>
              <div className="card-amount">5,183 บาท</div>
              <div className="card-period">6 วันล่าสุด</div>
            </div>
          </div>
        </div>

        {/* ส่วนขวา - สินค้าใกล้จะหมด */}
        <div className="right-panel">
          <div className="low-stock-section">
            <div className="section-header">สินค้าที่ใกล้จะหมด</div>
            <table className="product-table">
              <thead>
                <tr>
                  <th className="table-header">เลขบาร์โค้ด</th>
                  <th className="table-header">รายการ</th>
                  <th className="table-header">จำนวน</th>
                  <th className="table-header">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="low-stock-item">
                  <td className="table-cell">10000</td>
                  <td className="table-cell">น้ำส้ม</td>
                  <td className="table-cell">20</td>
                  <td className="table-cell warning">⚠️ ใกล้หมด</td>
                </tr>
                <tr className="low-stock-item">
                  <td className="table-cell">10001</td>
                  <td className="table-cell">ขนมขาโก๋</td>
                  <td className="table-cell">15</td>
                  <td className="table-cell warning">⚠️ ใกล้หมด</td>
                </tr>
                <tr className="low-stock-item critical">
                  <td className="table-cell">10002</td>
                  <td className="table-cell">เค้กส้ม</td>
                  <td className="table-cell">8</td>
                  <td className="table-cell critical">🚫 ใกล้หมดมาก</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* สินค้าขายดี */}
          <div className="top-products">
            <div className="section-header">สินค้าขายดีวันนี้</div>
            <div className="products-list">
              <div className="product-item">
                <span className="product-name">เค้กส้ม</span>
                <span className="product-sales">150 ชิ้น</span>
              </div>
              <div className="product-item">
                <span className="product-name">น้ำส้ม</span>
                <span className="product-sales">150 ขวด</span>
              </div>
              <div className="product-item">
                <span className="product-name">ขนมขาโก๋</span>
                <span className="product-sales">30 กระปุก</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
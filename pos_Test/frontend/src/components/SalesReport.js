import React, { useState } from 'react';
import './SalesReport.css';

const SalesReport = ({ onBack }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const dailySales = [
    { date: '29/10/2025', sales: 400, details: [
      { id: 1, product: 'น้ำส้ม', quantity: 2, price: 30 },
      { id: 2, product: 'เค้กส้ม', quantity: 1, price: 60 },
      { id: 3, product: 'ขนมขาโก๋', quantity: 3, price: 40 }
    ]},
    { date: '28/10/2025', sales: 200, details: [
      { id: 1, product: 'น้ำส้ม', quantity: 1, price: 30 },
      { id: 2, product: 'เค้กส้ม', quantity: 2, price: 60 }
    ]},
    { date: '27/10/2025', sales: 300, details: [
      { id: 1, product: 'ขนมขาโก๋', quantity: 5, price: 40 },
      { id: 2, product: 'น้ำส้ม', quantity: 3, price: 30 }
    ]}
  ];

  const handleConfirm = () => {
    if (!selectedDate) {
      alert('กรุณาเลือกวันที่');
      return;
    }
    
    const selected = dailySales.find(day => day.date === selectedDate);
    if (selected) {
      setSelectedDay(selected);
      setShowDetails(true);
    } else {
      alert('ไม่มีข้อมูลสำหรับวันที่เลือก');
    }
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedDay(null);
  };

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="sales-report">
      <button className="back-button" onClick={onBack}>
        ← กลับไปหน้าแรก
      </button>
      
      <div className="content">
        <div className="header-section">
          <div className="date-picker">
            <label>📅 วันเดือนปี:</label>
            <select 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={showDetails}
            >
              <option value="">-- เลือกวันที่ --</option>
              {dailySales.map(day => (
                <option key={day.date} value={day.date}>
                  {formatDate(day.date)}
                </option>
              ))}
            </select>
          </div>
          <button 
            className="confirm-button"
            onClick={handleConfirm}
            disabled={showDetails}
          >
            ✅ ตกลง
          </button>
        </div>

        {!showDetails ? (
          /* หน้ารายการยอดขาย */
          <div className="sales-list">
            <h3>📊 รายงานยอดขายรายวัน</h3>
            
            <div className="sales-section">
              {dailySales.map((day, index) => (
                <div key={index} className="daily-sales-card">
                  <div className="sales-header">
                    <div className="date-info">
                      <span className="date-label">วันที่</span>
                      <span className="date-value">{formatDate(day.date)}</span>
                    </div>
                    <div className="sales-info">
                      <span className="sales-label">ยอดขาย</span>
                      <span className="sales-amount">฿{day.sales}</span>
                    </div>
                    <button 
                      className="details-button"
                      onClick={() => {
                        setSelectedDate(day.date);
                        setSelectedDay(day);
                        setShowDetails(true);
                      }}
                    >
                      👁️ รายละเอียด
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* สรุปยอดขาย */}
            <div className="summary-section">
              <h4>📈 สรุปยอดขาย</h4>
              <div className="summary-cards">
                <div className="summary-card total">
                  <div className="summary-icon">💰</div>
                  <div className="summary-info">
                    <div className="summary-number">
                      ฿{dailySales.reduce((sum, day) => sum + day.sales, 0)}
                    </div>
                    <div className="summary-label">ยอดขายรวม</div>
                  </div>
                </div>
                <div className="summary-card average">
                  <div className="summary-icon">📊</div>
                  <div className="summary-info">
                    <div className="summary-number">
                      ฿{Math.round(dailySales.reduce((sum, day) => sum + day.sales, 0) / dailySales.length)}
                    </div>
                    <div className="summary-label">ยอดขายเฉลี่ย/วัน</div>
                  </div>
                </div>
                <div className="summary-card days">
                  <div className="summary-icon">📅</div>
                  <div className="summary-info">
                    <div className="summary-number">{dailySales.length}</div>
                    <div className="summary-label">จำนวนวัน</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* หน้ารายละเอียดการขาย */
          <div className="details-view">
            <div className="details-header">
              <button className="back-to-list" onClick={handleBackToList}>
                ← กลับสู่รายการ
              </button>
              <h3>📋 รายละเอียดการขาย - {selectedDay && formatDate(selectedDay.date)}</h3>
            </div>

            <div className="day-summary">
              <div className="day-total">
                <span className="total-label">ยอดขายรวม:</span>
                <span className="total-amount">฿{selectedDay?.sales}</span>
              </div>
            </div>

            <div className="details-table-container">
              <table className="details-table">
                <thead>
                  <tr>
                    <th width="15%">เลขที่การขาย</th>
                    <th width="45%">รายการ</th>
                    <th width="20%">จำนวน</th>
                    <th width="20%">ราคา</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDay?.details.map(sale => (
                    <tr key={sale.id}>
                      <td className="sale-id">{sale.id}</td>
                      <td className="sale-product">{sale.product}</td>
                      <td className="sale-quantity">{sale.quantity}</td>
                      <td className="sale-price">฿{sale.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* สรุปรายการ */}
            <div className="transaction-summary">
              <h4>🧮 สรุปรายการ</h4>
              <div className="summary-items">
                <div className="summary-item">
                  <span>จำนวนรายการ:</span>
                  <span>{selectedDay?.details.length} รายการ</span>
                </div>
                <div className="summary-item">
                  <span>จำนวนสินค้า:</span>
                  <span>{selectedDay?.details.reduce((sum, item) => sum + item.quantity, 0)} ชิ้น</span>
                </div>
                <div className="summary-item total">
                  <span>ยอดขายรวม:</span>
                  <span>฿{selectedDay?.sales}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReport;
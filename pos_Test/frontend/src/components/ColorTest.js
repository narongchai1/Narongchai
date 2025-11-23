import React from 'react';
import './ColorTest.css';

const ColorTest = () => {
  return (
    <div className="color-test">
      <h1 style={{ color: 'red', backgroundColor: 'yellow', padding: '20px' }}>
        ทดสอบสีแดงบนพื้นเหลือง
      </h1>
      <button style={{ 
        background: 'blue', 
        color: 'white', 
        padding: '15px 30px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        margin: '10px'
      }}>
        ปุ่มสีน้ำเงิน
      </button>
      <div style={{ 
        background: 'green', 
        color: 'white', 
        padding: '20px', 
        margin: '10px 0',
        borderRadius: '5px'
      }}>
        พื้นหลังสีเขียว
      </div>
    </div>
  );
};

export default ColorTest;
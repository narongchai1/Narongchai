import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = ({ onBack }) => {
  const [users, setUsers] = useState([
    { id: 1, username: 'กกท2', password: '11111', name: 'นายเอก', position: 'เจ้าของร้าน' },
    { id: 2, username: 'กกท1', password: '11114', name: 'นายโก', position: 'ผู้ขาย' },
    { id: 3, username: 'กกท3', password: '11112', name: 'นายตรี', position: 'ผู้ขาย' }
  ]);

  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    name: '',
    position: 'ผู้ขาย'
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddUser = () => {
    if (newUser.username && newUser.password && newUser.name) {
      const user = {
        id: users.length + 1,
        username: newUser.username,
        password: newUser.password,
        name: newUser.name,
        position: newUser.position
      };
      
      setUsers([...users, user]);
      setNewUser({
        username: '',
        password: '',
        name: '',
        position: 'ผู้ขาย'
      });
      setShowAddForm(false);
      alert('เพิ่มผู้ใช้งานสำเร็จ!');
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('คุณต้องการลบผู้ใช้นี้ใช่หรือไม่?')) {
      setUsers(users.filter(user => user.id !== id));
      alert('ลบผู้ใช้งานสำเร็จ!');
    }
  };

  return (
    <div className="user-management">
      <button className="back-button" onClick={onBack}>
        ← กลับไปหน้าแรก
      </button>
      
      <div className="content">
        <div className="header">
          <h2>จัดการผู้ใช้งาน</h2>
          <button 
            className="add-button"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? '✕ ยกเลิก' : '+ เพิ่มผู้ใช้งาน'}
          </button>
        </div>

        {/* Form เพิ่มผู้ใช้ */}
        {showAddForm && (
          <div className="add-user-form">
            <h3>📝 เพิ่มผู้ใช้งานใหม่</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>👤 Username:</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  placeholder="กรอก username"
                />
              </div>
              
              <div className="form-group">
                <label>🔒 Password:</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="กรอก password"
                />
              </div>
              
              <div className="form-group">
                <label>📛 ชื่อผู้ใช้:</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="กรอกชื่อ-สกุล"
                />
              </div>
              
              <div className="form-group">
                <label>💼 ตำแหน่ง:</label>
                <select
                  value={newUser.position}
                  onChange={(e) => setNewUser({...newUser, position: e.target.value})}
                >
                  <option value="ผู้ขาย">👨‍💼 ผู้ขาย</option>
                  <option value="เจ้าของร้าน">👑 เจ้าของร้าน</option>
                  <option value="ผู้จัดการ">📊 ผู้จัดการ</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button className="save-button" onClick={handleAddUser}>
                💾 บันทึก
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

        {/* ตารางผู้ใช้ */}
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th width="10%">ลำดับ</th>
                <th width="20%">Username</th>
                <th width="20%">Password</th>
                <th width="25%">ชื่อผู้ใช้</th>
                <th width="20%">ตำแหน่ง</th>
                <th width="5%">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className={user.position === 'เจ้าของร้าน' ? 'owner-row' : ''}>
                  <td>{index + 1}</td>
                  <td>
                    <span className="username">@{user.username}</span>
                  </td>
                  <td>
                    <span className="password">•••••••</span>
                  </td>
                  <td>
                    <span className="user-name">{user.name}</span>
                  </td>
                  <td>
                    <span className={`position-badge ${user.position === 'เจ้าของร้าน' ? 'owner' : 'staff'}`}>
                      {user.position}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteUser(user.id)}
                      title="ลบผู้ใช้"
                      disabled={user.position === 'เจ้าของร้าน'}
                    >
                      🗑️ ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="no-data">
            📭 ไม่มีข้อมูลผู้ใช้งาน
          </div>
        )}

        <div className="user-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <div className="stat-number">{users.length}</div>
              <div className="stat-label">ผู้ใช้งานทั้งหมด</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👑</div>
            <div className="stat-info">
              <div className="stat-number">{users.filter(u => u.position === 'เจ้าของร้าน').length}</div>
              <div className="stat-label">เจ้าของร้าน</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍💼</div>
            <div className="stat-info">
              <div className="stat-number">{users.filter(u => u.position === 'ผู้ขาย').length}</div>
              <div className="stat-label">พนักงานขาย</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
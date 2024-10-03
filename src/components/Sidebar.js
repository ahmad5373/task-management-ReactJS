import React from 'react';
import { Button } from 'react-bootstrap';

const Sidebar = ({ activeTab, setActiveTab, handleLogout }) => {
  return (
    <div className="sidebar bg-dark text-white vh-100 p-3 d-flex flex-column justify-content-between">
      <div>
        <h3 className="text-center mb-4">Admin Dashboard</h3>
        <Button
          className={`w-100 text-start mb-2 ${activeTab === 'tasks' ? 'btn-primary' : 'btn-outline-light'}`}
          onClick={() => setActiveTab('tasks')}
        >
          Task Management
        </Button>
        <Button
          className={`w-100 text-start mb-2 ${activeTab === 'users' ? 'btn-primary' : 'btn-outline-light'}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </Button>
      </div>
      
      <Button
        variant="outline-danger"
        className="w-100 mt-auto"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;

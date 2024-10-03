import React, { useState } from 'react';
import UserModal from './Modals/UserModal';
import { FadeLoader } from 'react-spinners';
import './Dashboard/AdminDashboard.css';

const UserList = ({ users, fetchUsers }) => {
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userActionType, setUserActionType] = useState('');

  const handleEditUser = (users) => {
    setCurrentUser(users);
    setUserActionType('edit');
    setShowUserModal(true);
  };

  const handleDeleteUser = (user) => {
    setCurrentUser(user);
    setUserActionType('delete');
    setShowUserModal(true);
  };

  const getRoleName = (role) => {
    switch (role) {
      case 1:
        return 'Admin';
      case 2:
        return 'Manager';
      case 3:
        return 'User';
      default:
        return 'Unknown';
    }
  };


  return (
    <div className="user-list">
      <h3>User Management</h3>
      {loading ? (
        <div><FadeLoader
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          color='blue'
        /></div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? users.map(user => (
              <tr key={user._id}>
                <td>{editingUser && editingUser._id === user._id ? <input type="text" defaultValue={user.name} /> : user.name}</td>
                <td>{getRoleName(user.role)}</td>
                <td>
                  <>
                    <button className='btn btn-primary btn-sm mr-2' onClick={() => handleEditUser(user)}>Edit</button>
                    <button className='btn btn-danger btn-sm' onClick={() => handleDeleteUser(user)}>Delete</button>
                  </>
                </td>
              </tr>
            )) : (
              <>
                <h4 >Empty User Data</h4>
              </>
            )}
          </tbody>
        </table>
      )}

      <UserModal
        show={showUserModal}
        handleClose={() => setShowUserModal(false)}
        user={currentUser}
        actionType={userActionType}
        fetchUsers={fetchUsers}
      />
    </div>
  )
};

export default UserList;

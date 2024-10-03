import React, { useEffect, useState } from 'react';
import UserList from '../UserList';
import TaskList from '../TaskList';
import './AdminDashboard.css';
import { getallTask, getallUsers } from '../../utils/api';
import { getToken, removeToken } from '../../utils/auth';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import UserModal from '../Modals/UserModal';
import TaskModal from '../Modals/TaskModal';
import { FadeLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('tasks');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [taskActionType, setTaskActionType] = useState('');
  const [userActionType, setUserActionType] = useState('');
  const navigate = useNavigate();

  const handleCreateTaskModal = (task = null) => {
    setCurrentTask(task);
    setTaskActionType("create");
    setShowTaskModal(true);
  };

  const handleCreateUserModal = (user = null) => {
    setCurrentUser(user);
    setUserActionType("create");
    setShowUserModal(true);
  };

  const fetchTasks = async () => {
    const token = getToken('jwtToken');
    setLoading(true);
    try {
      const taskResponse = await getallTask(token);
      setTasks(taskResponse?.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something Went Wrong. Try Again');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const token = getToken('jwtToken');
    setLoading(true);
    try {
      const userResponse = await getallUsers(token);
      setUsers(userResponse?.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something Went Wrong. Try Again');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  const renderSection = () => {
    if (activeSection === 'tasks') {
      return (
        <>
          <button
            className="btn btn-success w-12 mb-3"
            onClick={handleCreateTaskModal}
          >
            <FaPlus className="mr-2" /> Create Task
          </button>
          <TaskList tasks={tasks} fetchTasks={fetchTasks} />
        </>
      );
    } else if (activeSection === 'users') {
      return (
        <>
          <button
            className="btn btn-success  w-12 mb-3"
            onClick={handleCreateUserModal}
          >
            <FaPlus className="mr-2" /> Create User
          </button>
          <UserList users={users} fetchUsers={fetchUsers} />
        </>
      );
    }
  };

  return (
    <div className="admin-dashboard container-fluid">
      <div className="row w-100">
        <nav className="col-md-3 col-lg-2 d-md-block bg-dark text-white d-flex flex-column vh-100 sidebar p-3">
          <div className="flex-grow-1">
            <div className="sidebar-title mb-4">
              <h4 className='cursor-pointer'>Admin Dashboard</h4>
            </div>
            <div className="nav flex-column">
              <button
                className={`nav-link text-start ${activeSection === 'tasks' ? 'active text-white' : 'text-primary'}`}
                onClick={() => setActiveSection('tasks')}
              >
                Task Management
              </button>
              <button
                className={`nav-link text-start ${activeSection === 'users' ? 'active text-white' : 'text-primary'}`}
                onClick={() => setActiveSection('users')}
              >
                User Management
              </button>
            </div>
          </div>
          <div className="mt-auto">
            <button className="btn btn-outline-danger w-100 mt-12" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {loading ? (
            <div className="text-center mt-5">
              <FadeLoader
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                color='blue'
              />
            </div>
          ) : (
            renderSection()
          )}
        </main>
      </div>

      <TaskModal
        show={showTaskModal}
        handleClose={() => setShowTaskModal(false)}
        task={currentTask}
        actionType={taskActionType}
        fetchTasks={fetchTasks}
      />

      <UserModal
        show={showUserModal}
        handleClose={() => setShowUserModal(false)}
        user={currentUser}
        actionType={userActionType}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};

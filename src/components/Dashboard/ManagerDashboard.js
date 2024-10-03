import { useContext, useEffect, useState } from "react";
import { getSingleUser } from "../../utils/api";
import TaskList from "../TaskList";
import { getToken, removeToken } from "../../utils/auth";
import './AdminDashboard.css';
import { AuthContext } from "../Auth/AuthContext";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router";
import TaskModal from "../Modals/TaskModal";
import { FaPlus } from "react-icons/fa";
import UserList from "../UserList";

export const ManagerDashboard = () => {
  const [ownTasks, setOwnTasks] = useState([]);
  const [assignedUserTasks, setAssignedUserTasks] = useState([]);
  const [assignedUser, setAssignedUser] = useState([]);
  const [activeSection, setActiveSection] = useState('own-tasks');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const token = getToken();
  const navigate = useNavigate();

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskActionType, setTaskActionType] = useState('');

  const handleCreateTaskModal = () => {
    setCurrentTask(null);
    setTaskActionType("create");
    setShowTaskModal(true);
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getSingleUser(user.id, token);
      setOwnTasks(response?.data?.data?.tasksDetails || []);
      const assignedUsers = response?.data?.data?.assignedUsersDetails || [];
      const assignedUserTasks = assignedUsers.flatMap(user => user.tasks || []);
      setAssignedUserTasks(assignedUserTasks);
      setAssignedUser(assignedUsers);
    } catch (error) {
      console.error("Error fetching tasks", error);
      toast.error(error?.response?.data?.message || 'Error fetching task. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  const renderSection = () => {
    if (activeSection === 'own-tasks') {
      return (
        <>
          <button
            className="btn btn-success w-12 mb-3"
            onClick={handleCreateTaskModal}
          >
            <FaPlus className="mr-2" /> Create Task
          </button>
          <TaskList tasks={ownTasks} fetchTasks={fetchTasks} />
        </>
      );
    } else if (activeSection === 'assigned-users') {
      return <UserList users={assignedUser} fetchUsers={fetchTasks} />;
    } else if (activeSection === 'assigned-tasks') {
      return <TaskList tasks={assignedUserTasks} fetchTasks={fetchTasks} />
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div className="manager-dashboard container-fluid">
      <div className="row w-100">
        <nav className="col-md-3 col-lg-2 d-md-block bg-dark text-white d-flex flex-column vh-100 sidebar p-3">
          <div className="flex-grow-1">
            <div className="sidebar-title mb-4">
              <h4 className='cursor-pointer'>Manager Dashboard</h4>
            </div>
            <div className="nav flex-column">
              <button
                className={`nav-link text-start ${activeSection === 'own-tasks' ? 'active text-white' : 'text-primary'}`}
                onClick={() => setActiveSection('own-tasks')}
              >
                My Tasks
              </button>
              <button
                className={`nav-link text-start ${activeSection === 'assigned-users' ? 'active text-white' : 'text-primary'}`}
                onClick={() => setActiveSection('assigned-users')}
              >
                Assigned Users
              </button>
              <button
                className={`nav-link text-start ${activeSection === 'assigned-tasks' ? 'active text-white' : 'text-primary'}`}
                onClick={() => setActiveSection('assigned-tasks')}
              >
                Assigned Users' Task
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
              <FadeLoader loading={loading} size={150} color='blue' />
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
    </div>
  );
};

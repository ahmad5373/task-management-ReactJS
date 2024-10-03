import React, { useState } from 'react';
import moment from 'moment';
import { Card, ListGroup, Button, Badge, Form } from 'react-bootstrap';
import TaskModal from './Modals/TaskModal';
import './Dashboard/AdminDashboard.css'

const TaskList = ({ tasks, fetchTasks }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskActionType, setTaskActionType] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const formatDueDate = (dueDate) => {
    if (!dueDate) return '';
    return moment(dueDate).format('LL');
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setTaskActionType('edit');
    setShowTaskModal(true);
  };

  const handleDeleteTask = (task) => {
    setCurrentTask(task);
    setTaskActionType('delete');
    setShowTaskModal(true);
  };

  const filteredTasks = tasks.filter((task) => {
    let statusMatch = statusFilter === 'all' || task.status === statusFilter;
    let dateMatch = !dateFilter || moment(task.dueDate).isSame(dateFilter, 'day');

    return statusMatch && dateMatch;
  });

  return (
    <div className="mt-4">
      <h3>Filter Tasks</h3>
      <div className="d-flex justify-content-between w-fit-content mb-3">
        <Form.Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="me-2"
          aria-label="Filter by status"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </Form.Select>

        <Form.Control
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          placeholder="Filter by due date"
          aria-label="Filter by date"
        />
      </div>

      <Card>
        <ListGroup variant="flush">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <ListGroup.Item key={task._id} className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{task.title}</h5>
                  <p className="mb-0 text-muted">Due: {formatDueDate(task.dueDate)}</p>
                </div>
                <div className="d-flex align-items-center">
                  <Badge
                    bg={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'primary' : 'warning'}
                    className="me-3"
                  >
                    {task.status}
                  </Badge>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditTask(task)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteTask(task)}>
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No tasks found for the selected filter.</ListGroup.Item>
          )}
        </ListGroup>
      </Card>

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

export default TaskList;

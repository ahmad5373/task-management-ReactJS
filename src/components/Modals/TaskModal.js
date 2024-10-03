import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createTask, editTask, deleteTask } from '../../utils/api';
import { getToken } from '../../utils/auth';

const TaskModal = ({ show, handleClose, task, actionType, fetchTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('pending');
    const [assignedUser, setAssignedUser] = useState('');

    useEffect(() => {
        if (actionType === 'edit' && task) {
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
            setStatus(task.status);
            setAssignedUser(task.assignedUser || '');
        } else if (actionType === 'create') {
            setTitle('');
            setDescription('');
            setDueDate('');
            setStatus('pending');
            setAssignedUser('');
        }
    }, [task, actionType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getToken();

        const taskData = {
            title,
            description,
            dueDate,
            status,
            assignedUser,
        };

        try {
            if (actionType === 'create') {
                const response = await createTask(taskData, token);
                toast.success(response?.data?.message || 'Task created successfully!');
            } else if (actionType === 'edit') {
                const response = await editTask(task._id, taskData, token);
                toast.success(response?.data?.message || 'Task updated successfully!');
            } else if (actionType === 'delete') {
                const response = await deleteTask(task._id, token);
                toast.success(response?.data?.message || 'Task deleted successfully!');
            }

            fetchTasks();
            handleClose();
        } catch (err) {
            console.log("err =>", err);
            toast.error(err?.response?.data?.message || 'Something went wrong.');
        }
    };

    const renderContent = () => {
        if (actionType === 'delete') {
            return <p>Are you sure you want to delete this task?</p>;
        } else {
            return (
                <>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Due Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select
                            className="form-control"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </>
            );
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{actionType === 'delete' ? 'Delete Task' : actionType === 'edit' ? 'Edit Task' : 'Create a New Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {renderContent()}
                    {actionType !== 'delete' && (
                        <Button type="submit" variant="primary" className="mt-6">
                            {actionType === 'edit' ? 'Update Task' : 'Create Task'}
                        </Button>
                    )}
                </form>
            </Modal.Body>
            <Modal.Footer>
                {actionType === 'delete' ? (
                    <>
                        <Button variant="danger" onClick={handleSubmit}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </>
                ) : null}
            </Modal.Footer>
        </Modal>
    );
};

export default TaskModal;

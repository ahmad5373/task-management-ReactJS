import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createUser, editUser, deleteUser, getallUsers } from '../../utils/api';
import { getToken } from '../../utils/auth';

const UserModal = ({ show, handleClose, user, actionType, fetchUsers }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(3);
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (actionType === 'edit' && user) {
            console.log("user edited =>", user);
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setAssignedUsers(user.assignedUsers ? user.assignedUsers.map(usr => usr._id) : []);
        } else if (actionType === 'create') {
            setName('');
            setEmail('');
            setPassword('');
            setRole(3);
            setAssignedUsers([]);
        }
    }, [user, actionType]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const token = getToken();
                const response = await getallUsers(token);
                setUsers(response.data.data);
            } catch (err) {
                toast.error('Error fetching users');
            }
        };
            fetchAllUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getToken();
        try {
            if (actionType === 'create') {
                const response = await createUser({ name, email, password, role, assignedUsers }, token);
                toast.success(response?.data?.message || 'User created successfully!');
            } else if (actionType === 'edit') {
                const response = await editUser(user._id, { name, email, password, role, assignedUsers }, token);
                toast.success(response?.data?.message || 'User updated successfully!');
            } else if (actionType === 'delete') {
                const response = await deleteUser(user._id, token);
                toast.success(response?.data?.message || 'User deleted successfully!');
            }

            fetchUsers();
            handleClose();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Something went wrong.');
        }
    };

    const handleAssignedUsersChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions];
        const selectedValues = selectedOptions.map(option => option.value);
        console.log("selectedValues =>", selectedValues);
        setAssignedUsers(selectedValues);
    };



    const renderContent = () => {
        if (actionType === 'delete') {
            return <p>Are you sure you want to delete this user?</p>;
        } else {
            return (
                <>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={actionType === 'create'}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select
                            className="form-control"
                            value={role}
                            onChange={(e) => setRole(Number(e.target.value))}
                            required
                        >
                            <option value={1}>Admin</option>
                            <option value={2}>Manager</option>
                            <option value={3}>User</option>
                        </select>
                    </div>
                    {role === 2 && (
                        <div className="form-group">
                            <label>Assign Users</label>
                            <select
                                multiple
                                className="form-control"
                                value={assignedUsers}
                                onChange={handleAssignedUsersChange}
                            >
                                {users.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </>
            );
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{actionType === 'delete' ? 'Delete User' : actionType === 'edit' ? 'Edit User' : 'Create a New User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {renderContent()}
                    {actionType !== 'delete' && (
                        <Button type="submit" variant="primary" className="mt-6">
                            {actionType === 'edit' ? 'Update User' : 'Create User'}
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

export default UserModal;

import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/';  // Localy Base URL
const API_BASE_URL = 'https://task-management-nodejs.vercel.app/';  // Live Base URL

export const api = axios.create({
    baseURL: API_BASE_URL,
});

export const Login = async (data) => {
    return await api.post('users/login', data);
};

export const createUser = async (data, token) => {
    return await api.post('users/register', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export const editUser = async (id, data, token) => {
    return await api.put(`users/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteUser = async (id, token) => {
    return await api.delete(`users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getallUsers = async (token) => {
    console.log("token  in request=>", token);
    return await api.get(`users/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getSingleUser = async (id, token) => {
    return await api.get(`users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createTask = async (data, token) => {
    return await api.post('task/create', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getallTask = async (token) => {
    console.log("token =>", token);
    return await api.get(`task/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getSingleTask = async (id) => {
    return await api.get(`task/${id}`);
};

export const editTask = async (id, data, token) => {
    return await api.put(`task/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteTask = async (id, token) => {
    return await api.delete(`task/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

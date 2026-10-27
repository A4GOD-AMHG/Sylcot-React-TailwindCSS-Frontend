import api from '@/services/api';

const TaskService = {
    getTasks: async () => (await api.get('/tasks')).data,
    createTask: async (task) => (await api.post('/tasks', task)).data,
    updateTask: async (id, task) => (await api.put(`/tasks/${id}`, task)).data,
    deleteTask: async (id) => (await api.delete(`/tasks/${id}`)).data,
    toggleTask: async (id) => (await api.patch(`/tasks/${id}/complete`)).data,
};

export default TaskService;

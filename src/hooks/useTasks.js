import { useCallback, useState } from 'react';
import TaskService from '@/services/TaskService';
import { notifyError, notifySuccess } from '@/utils/toast';

// The API returns the task DTO itself (not { task }) for create, update and toggle.
const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTasks = useCallback(async () => {
        try {
            setLoading(true);
            const data = await TaskService.getTasks();
            setTasks(data || []);
        } catch (error) {
            notifyError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const replaceTask = (updated) =>
        setTasks(prev => prev.map(task => (task.id === updated.id ? updated : task)));

    const createTask = async (task) => {
        try {
            const created = await TaskService.createTask(task);
            setTasks(prev => [...prev, created]);
            notifySuccess('Task created');
            return created;
        } catch (error) {
            notifyError(error.message);
        }
    };

    const updateTask = async (taskID, task) => {
        try {
            const updated = await TaskService.updateTask(taskID, task);
            replaceTask(updated);
            notifySuccess('Task updated');
            return updated;
        } catch (error) {
            notifyError(error.message);
        }
    };

    const deleteTask = async (taskID) => {
        try {
            const data = await TaskService.deleteTask(taskID);
            setTasks(prev => prev.filter(task => task.id !== taskID));
            notifySuccess(data?.message || 'Task deleted');
            return data;
        } catch (error) {
            notifyError(error.message);
        }
    };

    const toggleTask = async (taskID) => {
        try {
            const updated = await TaskService.toggleTask(taskID);
            replaceTask(updated);
            return updated;
        } catch (error) {
            notifyError(error.message);
        }
    };

    return { tasks, loading, getTasks, createTask, updateTask, deleteTask, toggleTask };
};

export default useTasks;

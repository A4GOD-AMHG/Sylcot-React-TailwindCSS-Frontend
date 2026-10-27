import { useState } from 'react';
import {
    FaCheckCircle,
    FaPen,
    FaRegCircle,
    FaTrash
} from 'react-icons/fa';
import { getCategoryIcon, getPriorityIcon } from '@/utils/utils';

const TaskCard = ({ task, onToggleTask, onUpdateTask, onDeleteTask }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toggling, setToggling] = useState(false);
    const color = task.category?.color || '#B0BEC5';

    const handleToggle = async () => {
        setToggling(true);
        await onToggleTask(task.id);
        setToggling(false);
    };

    const handleDelete = () => {
        setShowDeleteModal(false);
        onDeleteTask(task.id);
    };

    return (
        <>
            <article
                className={`group relative flex min-h-36 flex-col justify-between rounded-2xl border-l-[6px] bg-gray-100 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-700 ${task.status ? 'opacity-60' : ''}`}
                style={{ borderLeftColor: color }}
            >
                <div className="flex items-start justify-between gap-3">
                    <h3 className={`text-lg font-semibold break-words text-gray-800 transition-all duration-500 dark:text-white ${task.status ? 'line-through decoration-2' : ''}`}>
                        {task.title}
                    </h3>
                    <div className="flex shrink-0 items-center gap-1" title={`Priority: ${task.priority}`}>
                        {getPriorityIcon(task.priority)}
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-100"
                        style={{ backgroundColor: `${color}33` }}
                    >
                        {getCategoryIcon(task.category?.icon_name, color)}
                        {task.category?.title}
                    </span>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => onUpdateTask(task)}
                            aria-label="Edit task"
                            className="cursor-pointer rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                            <FaPen className="text-sm" />
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            aria-label="Delete task"
                            className="cursor-pointer rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-red-500 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                            <FaTrash className="text-sm" />
                        </button>
                        <button
                            onClick={handleToggle}
                            disabled={toggling}
                            aria-label={task.status ? 'Mark as pending' : 'Mark as completed'}
                            className={`cursor-pointer rounded-full p-1 transition-transform hover:scale-110 disabled:opacity-50 ${task.status ? 'text-emerald-500' : 'text-gray-400 dark:text-gray-300'}`}
                        >
                            {task.status ? <FaCheckCircle className="text-2xl" /> : <FaRegCircle className="text-2xl" />}
                        </button>
                    </div>
                </div>
            </article>

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}>
                    <div className="animate-pop w-full max-w-xs rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800" onClick={(e) => e.stopPropagation()}>
                        <h4 className="mb-2 text-lg font-semibold dark:text-white">Delete this task?</h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">"{task.title}" will be removed permanently.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskCard;

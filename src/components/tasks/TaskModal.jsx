import { useState } from 'react';

const fieldClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500';

const TaskModal = ({ onClose, onCreate, onUpdate, selectedTask, categories }) => {
    const isEditing = Boolean(selectedTask);
    const [title, setTitle] = useState(selectedTask?.title || '');
    const [selectedCategory, setSelectedCategory] = useState(
        selectedTask?.category?.id?.toString() || categories[0]?.id?.toString() || ''
    );
    const [priority, setPriority] = useState(selectedTask?.priority || 'medium');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const task = { title, category: selectedCategory, priority };
        setSaving(true);
        const saved = isEditing ? await onUpdate({ ...task, id: selectedTask.id }) : await onCreate(task);
        setSaving(false);
        // Keep the modal open on failure so the user can fix the input.
        if (saved) onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
            <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="animate-pop w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800"
            >
                <h2 className="mb-5 text-xl font-bold dark:text-white">{isEditing ? 'Edit Task' : 'New Task'}</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="task-title" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input
                            id="task-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={fieldClass}
                            placeholder="Task name"
                            minLength={3}
                            maxLength={100}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="sm:w-1/2">
                            <label htmlFor="task-category" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                            <select
                                id="task-category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={fieldClass}
                                required
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="sm:w-1/2">
                            <label htmlFor="task-priority" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                            <select
                                id="task-priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className={fieldClass}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TaskModal;

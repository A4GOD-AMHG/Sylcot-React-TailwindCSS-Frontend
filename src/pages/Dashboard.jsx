import { useEffect, useState } from 'react';
import TaskModal from '@/components/tasks/TaskModal';
import TaskCard from '@/components/tasks/TaskCard';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { FaChevronDown, FaPlus, FaSearch, FaTimes, FaUndo, FaClipboardList } from 'react-icons/fa';
import useTasks from '@/hooks/useTasks';
import useCategories from '@/hooks/useCategories';

const initialFilters = {
    search: '',
    selectedCategories: [],
    selectedStatuses: [],
    selectedPriorities: [],
    sortBy: 'created_at',
};

const sortOptions = [
    { value: 'created_at', label: 'Date' },
    { value: 'title', label: 'Title' },
    { value: 'category', label: 'Category' }
];

const toggleValue = (list, value) =>
    list.includes(value) ? list.filter(v => v !== value) : [...list, value];

// Opens on hover and on keyboard/touch focus.
const FilterDropdown = ({ label, count = 0, children }) => (
    <div className="relative group">
        <button type="button" className="custom-input flex items-center gap-2 w-auto cursor-pointer">
            <span>{label}</span>
            {count > 0 && (
                <span className="rounded-full bg-blue-600 px-2 text-xs font-semibold text-white">{count}</span>
            )}
            <FaChevronDown className="text-xs opacity-70 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
        </button>
        <div className="absolute left-0 top-full z-20 hidden pt-2 group-hover:block group-focus-within:block">
            <div className="min-w-[200px] max-h-72 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-800">
                {children}
            </div>
        </div>
    </div>
);

const CheckOption = ({ checked, onChange, children }) => (
    <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700">
        <input type="checkbox" checked={checked} onChange={onChange} className="accent-blue-600" />
        {children}
    </label>
);

export const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const { tasks, loading, createTask, deleteTask, getTasks, toggleTask, updateTask } = useTasks();
    const { categories, loading: categoriesLoading, getCategories } = useCategories();
    const [selectedTask, setSelectedTask] = useState(null);
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        getTasks();
        getCategories();
    }, [getCategories, getTasks]);

    const filteredTasks = tasks.filter(task => {
        const taskTitle = task.title?.toLowerCase() || '';
        const taskCategory = task.category?.id?.toString() || '';
        const taskStatus = String(task.status);

        return taskTitle.includes(filters.search.toLowerCase()) &&
            (filters.selectedCategories.length === 0 || filters.selectedCategories.includes(taskCategory)) &&
            (filters.selectedStatuses.length === 0 || filters.selectedStatuses.includes(taskStatus)) &&
            (filters.selectedPriorities.length === 0 || filters.selectedPriorities.includes(task.priority));
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (filters.sortBy === 'title') return a.title.localeCompare(b.title);
        if (filters.sortBy === 'category') return (a.category?.title || '').localeCompare(b.category?.title || '');
        return new Date(a.created_at) - new Date(b.created_at);
    });

    const completedCount = tasks.filter(task => task.status).length;
    const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
    const hasActiveFilters = JSON.stringify(filters) !== JSON.stringify(initialFilters);

    const updateFilter = (key, value) =>
        setFilters(prev => ({ ...prev, [key]: toggleValue(prev[key], value) }));

    const toPayload = (task) => ({
        title: task.title.trim(),
        category_id: parseInt(task.category),
        priority: task.priority
    });

    const onCreateTask = (newTask) => createTask(toPayload(newTask));
    const onUpdateTask = (updatedTask) => updateTask(updatedTask.id, toPayload(updatedTask));

    const openCreateModal = () => {
        setSelectedTask(null);
        setShowModal(true);
    };

    const openEditModal = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTask(null);
    };

    if (loading || categoriesLoading) {
        return <LoadingSpinner size="lg" />;
    }

    return (
        <div className="flex flex-col gap-6 px-4 py-4 sm:px-6">
            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">My Tasks</h2>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        {completedCount} of {tasks.length} completed
                    </p>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200 sm:w-64 dark:bg-gray-700">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setFilters(initialFilters)}
                        disabled={!hasActiveFilters}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                        <FaUndo className="text-sm" /> Reset
                    </button>
                    <button
                        onClick={openCreateModal}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                        <FaPlus className="text-sm" /> New Task
                    </button>
                </div>
            </section>

            <section className="flex flex-wrap items-center gap-3 rounded-2xl bg-gray-100 p-3 dark:bg-gray-900">
                <div className="relative w-full sm:w-64">
                    <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="custom-input pl-9 pr-8"
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    />
                    {filters.search && (
                        <button
                            onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                            aria-label="Clear search"
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <FaTimes className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <FilterDropdown label="Categories" count={filters.selectedCategories.length}>
                    {categories.map(category => (
                        <CheckOption
                            key={category.id}
                            checked={filters.selectedCategories.includes(category.id.toString())}
                            onChange={() => updateFilter('selectedCategories', category.id.toString())}
                        >
                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: category.color }} />
                            {category.title}
                        </CheckOption>
                    ))}
                </FilterDropdown>

                <FilterDropdown label="Status" count={filters.selectedStatuses.length}>
                    {['true', 'false'].map(status => (
                        <CheckOption
                            key={status}
                            checked={filters.selectedStatuses.includes(status)}
                            onChange={() => updateFilter('selectedStatuses', status)}
                        >
                            {status === 'true' ? 'Completed' : 'Pending'}
                        </CheckOption>
                    ))}
                </FilterDropdown>

                <FilterDropdown label="Priority" count={filters.selectedPriorities.length}>
                    {['low', 'medium', 'high'].map(priority => (
                        <CheckOption
                            key={priority}
                            checked={filters.selectedPriorities.includes(priority)}
                            onChange={() => updateFilter('selectedPriorities', priority)}
                        >
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </CheckOption>
                    ))}
                </FilterDropdown>

                <FilterDropdown label={`Sort: ${sortOptions.find(o => o.value === filters.sortBy).label}`}>
                    {sortOptions.map(option => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setFilters(prev => ({ ...prev, sortBy: option.value }))}
                            className={`block w-full cursor-pointer rounded-lg px-2 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${filters.sortBy === option.value ? 'font-semibold text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-100'}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </FilterDropdown>
            </section>

            {sortedTasks.length > 0 ? (
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sortedTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onUpdateTask={openEditModal}
                            onToggleTask={toggleTask}
                            onDeleteTask={deleteTask}
                        />
                    ))}
                </section>
            ) : (
                <section className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-300 px-6 py-16 text-center dark:border-gray-700">
                    <FaClipboardList className="text-5xl text-gray-300 dark:text-gray-600" />
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                        {tasks.length === 0 ? 'You have no tasks yet' : 'No tasks match your filters'}
                    </p>
                    {tasks.length === 0 ? (
                        <button onClick={openCreateModal} className="button w-auto px-6">Create your first task</button>
                    ) : (
                        <button onClick={() => setFilters(initialFilters)} className="cursor-pointer text-blue-600 hover:underline dark:text-blue-400">
                            Clear filters
                        </button>
                    )}
                </section>
            )}

            {showModal && (
                <TaskModal
                    onClose={closeModal}
                    onCreate={onCreateTask}
                    onUpdate={onUpdateTask}
                    selectedTask={selectedTask}
                    categories={categories}
                />
            )}
        </div>
    );
};

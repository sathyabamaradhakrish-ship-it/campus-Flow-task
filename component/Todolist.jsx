
import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

function Todolist() {
    const { tasks, setTasks } = useContext(TaskContext);

    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        priority: "Medium",
        status: "todo"
    });

    const [editId, setEditId] = useState(null);

    const totalTasks = tasks.length;

    const todoCount = tasks.filter(
        (task) => task.status === "todo"
    ).length;

    const progressCount = tasks.filter(
        (task) => task.status === "inprogress"
    ).length;

    const doneCount = tasks.filter(
        (task) => task.status === "done"
    ).length;

    function handleChange(e) {
        const { name, value } = e.target;

        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    }
    function handleAddTask() {
        if (newTask.title.trim() === "") {
            alert("Please enter task title");
            return;
        }

        if (editId !== null) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === editId
                        ? {
                            ...task,
                            title: newTask.title,
                            description: newTask.description,
                            priority: newTask.priority,
                            status: newTask.status
                        }
                        : task
                )
            );

            setEditId(null);
        } else {
            const newTaskObject = {
                id: Date.now(),
                title: newTask.title,
                description: newTask.description,
                priority: newTask.priority,
                status: newTask.status
            };

            setTasks((prevTasks) => [
                ...prevTasks,
                newTaskObject
            ]);
        }

        setNewTask({
            title: "",
            description: "",
            priority: "Medium",
            status: "todo"
        });
    }
    function handleDeleteTask(id) {
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== id)
        );
    }
    function handleDragStart(e, id) {
        e.dataTransfer.setData("taskId", id);
    }
    function handleDrop(e, newStatus) {
        e.preventDefault();

        const taskId = Number(
            e.dataTransfer.getData("taskId")
        );

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId
                    ? { ...task, status: newStatus }
                    : task
            )
        );
    }
    function renderTasks(status) {
        const filteredTasks = tasks.filter(
            (task) => task.status === status
        );

        if (filteredTasks.length === 0) {
            return (
                <p className="text-center text-slate-400 py-8">
                    No tasks yet
                </p>
            );
        }

        return filteredTasks.map((task) => (
            <div
                key={task.id}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, task.id)}
                className="mb-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-grab">
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {task.title}
                </h3>

                <p className="text-sm text-slate-600 mb-3">
                    {task.description}
                </p>

                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${
                    task.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                }`}>
                    {task.priority} Priority
                </span>

                <div className="flex gap-3">
                    <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="bg-rose-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-rose-700 transition">
                        Delete
                    </button>

                    <button
                        onClick={() => {
                            setEditId(task.id);
                            setNewTask({
                                title: task.title,
                                description: task.description,
                                priority: task.priority,
                                status: task.status
                            });
                        }}
                        className="bg-teal-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-teal-700 transition">
                        Edit
                    </button>
                </div>
            </div>
        ));
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
                CampusFlow - Student Task Manager
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                <div className="bg-white p-5 rounded-xl shadow-md">
                    <h3 className="text-slate-500 font-semibold">
                        Total Tasks
                    </h3>
                    <p className="text-3xl font-bold text-indigo-600">
                        {totalTasks}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md">
                    <h3 className="text-slate-500 font-semibold">
                        To Do
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">
                        {todoCount}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md">
                    <h3 className="text-slate-500 font-semibold">
                        In Progress
                    </h3>
                    <p className="text-3xl font-bold text-orange-600">
                        {progressCount}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md">
                    <h3 className="text-slate-500 font-semibold">
                        Completed
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                        {doneCount}
                    </p>
                </div>

            </div>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4 rounded-xl bg-white p-6 shadow-md">

                <input
                    type="text"
                    name="title"
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />

                <input
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    value={newTask.description}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"/>

                <select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <select
                    name="status"
                    value={newTask.status}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <button
                    onClick={handleAddTask}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-indigo-800 transition-all duration-300 shadow-lg cursor-pointer">
                    {editId !== null ? "Update Task" : "Add Task"}
                </button>

                {editId !== null && (
                    <button
                        onClick={() => {
                            setEditId(null);

                            setNewTask({
                                title: "",
                                description: "",
                                priority: "Medium",
                                status: "todo"
                            });
                        }}
                        className="bg-slate-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-slate-700 transition duration-200 shadow-md">
                        Cancel
                    </button>
                )}

            </div>
            <div className="flex flex-col md:flex-row gap-5 items-start">

                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, "todo")}
                    className="w-full flex-1 min-h-[400px] rounded-xl bg-blue-50 p-5 shadow-md">
                    <h2 className="text-xl font-bold text-blue-700 mb-5">
                        To Do
                    </h2>

                    {renderTasks("todo")}
                </div>

                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, "inprogress")}
                    className="w-full flex-1 min-h-[400px] rounded-xl bg-blue-50 p-5 shadow-md">
                    <h2 className="text-xl font-bold text-orange-600 mb-5">
                        In Progress
                    </h2>

                    {renderTasks("inprogress")}
                </div>

                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, "done")}
                    className="w-full flex-1 min-h-[400px] rounded-xl bg-blue-50 p-5 shadow-md" >
                    <h2 className="text-xl font-bold text-green-700 mb-5">
                        Done
                    </h2>

                    {renderTasks("done")}
                </div>

            </div>

        </div>
    );
}

export default Todolist;

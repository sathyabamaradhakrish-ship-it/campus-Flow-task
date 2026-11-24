
import { createContext, useState, useEffect } from 'react';
export const TaskContext = createContext();
export function TaskProvider({ children }) {
    const taskList = [
        {
            id: 1,
            title: "Complete HTML Assignment",
            description: "Finish HTML practice",
            status: "todo",
            priority: "High"
        },
        {
            id: 2,
            title: "Study JavaScript Basics",
            description: "Learn JavaScript fundamentals",
            status: "inprogress",
            priority: "Medium"
        },
        {
            id: 3,
            title: "Practice React Components",
            description: "Create reusable components",
            status: "done",
            priority: "High"
        },
        {
            id: 4,
            title: "Learn React Props",
            description: "Understand props in React",
            status: "todo",
            priority: "Low"
        },
        {
            id: 5,
            title: "Complete CSS Assignment",
            description: "Finish CSS practice",
            status: "inprogress",
            priority: "Medium"
        }
    ];
    const [tasks, setTasks] = useState(() => {
        try {
            const savedTasks = localStorage.getItem("tasks");

            return savedTasks
                ? JSON.parse(savedTasks)
                : taskList;

        } catch (error) {
            return taskList;
        }
    });
    useEffect(() => {
        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );
    }, [tasks]);

    // 5. Provide Data to Child Components
    return (
        <TaskContext.Provider
            value={{ tasks, setTasks }}
        >
            {children}
        </TaskContext.Provider>
    );
}

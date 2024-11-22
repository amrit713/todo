import { useEffect, useState } from "react";
import axios from "axios";

import { TodoInput } from "./todo-input";
import { TodoContent } from "./todo-content";

export interface Todo {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}

export default function Todo() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [expandedTodo, setExpandedTodo] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const getTodo = async () => {
        try {
            const { data } = await axios.get("api/todos");
            setTodos([...data]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getTodo();
    }, []);

    const addTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("api/todos", {
                title: newTodo,
                description: newDescription,
            });

            getTodo();

            setNewTodo("");
            setNewDescription("");
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleTodo = async (id: string) => {
        try {
            const response = await axios.get(`api/todos/${id}`);

            const { completed } = response.data;

            await axios.put(`api/todos/${id}`, {
                completed: completed ? false : true,
            });

            getTodo();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await axios.delete(`api/todos/${id}`);
            getTodo();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const toggleExpand = (id: number) => {
        setExpandedTodo(expandedTodo === id ? null : id);
    };

    const remainingTodos = todos.filter((todo) => !todo.completed).length;

    return (
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    My Todo List
                </h1>
                <TodoInput
                    addTodo={addTodo}
                    newDescription={newDescription}
                    newTodo={newTodo}
                    setNewDescription={setNewDescription}
                    setNewTodo={setNewTodo}
                    isLoading={loading}
                />
                <TodoContent
                    todos={todos}
                    toggleExpand={toggleExpand}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    expandedTodo={expandedTodo}
                />
                <p className="text-sm text-gray-500 mt-4">
                    {remainingTodos} {remainingTodos === 1 ? "todo" : "todos"}{" "}
                    remaining
                </p>
            </div>
        </div>
    );
}

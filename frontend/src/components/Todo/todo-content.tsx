import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Todo } from "./todo";

interface TodoContentProps {
    todos: Todo[];
    toggleTodo: (id: string) => void;
    toggleExpand: (id: string) => void;
    deleteTodo: (id: string) => void;
    expandedTodo: number | null;
}

export const TodoContent = ({
    todos,
    toggleExpand,
    toggleTodo,
    deleteTodo,
    expandedTodo,
}: TodoContentProps) => {
    return (
        <AnimatePresence>
            {todos.map((todo) => (
                <motion.div
                    key={todo._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-50 rounded-md mb-2 overflow-hidden"
                >
                    <div className="flex items-center gap-2 p-4">
                        <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => toggleTodo(todo._id)}
                            className="h-5 w-5"
                        />
                        <span
                            className={`flex-grow ${
                                todo.completed
                                    ? "line-through text-gray-400"
                                    : "text-gray-700"
                            }`}
                        >
                            {todo.title}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleExpand(todo._id)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            {expandedTodo === todo._id ? (
                                <ChevronUp className="h-5 w-5" />
                            ) : (
                                <ChevronDown className="h-5 w-5" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTodo(todo._id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    </div>
                    {expandedTodo === todo._id && todo.description && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: 1,
                                height: "auto",
                            }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 pb-4 text-sm text-gray-600"
                        >
                            {todo.description}
                        </motion.div>
                    )}
                </motion.div>
            ))}
        </AnimatePresence>
    );
};

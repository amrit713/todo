import { Loader, Smile } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TodoInputProps {
    addTodo: (e: any) => void;
    newTodo: string;
    setNewTodo: (e: any) => void;
    newDescription: string;
    setNewDescription: (e: any) => void;
    isLoading: boolean;
}

export const TodoInput = ({
    addTodo,
    newTodo,
    setNewTodo,
    newDescription,
    setNewDescription,
    isLoading,
}: TodoInputProps) => {
    return (
        <form onSubmit={addTodo} className="space-y-4 mb-6">
            <Input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo..."
                className="w-full"
            />

            <Textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Add a description (optional)"
                className="w-full"
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <Loader className="size-4 animate-spin" />
                ) : (
                    "Add Todo"
                )}
            </Button>
        </form>
    );
};

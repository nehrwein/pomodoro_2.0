import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import api from "@/lib/axios";
import { useUserStore } from "@/lib/useUserStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface postTaskArgs {
  description: string;
  userId: string;
}

const AddTask = () => {
  const [task, setTask] = useState("");
  const taskColor = "blue";
  const userId = useUserStore().userId;
  const queryClient = useQueryClient();

  const postTask = async ({ description, userId }: postTaskArgs) => {
    const response = await api.post("/tasks", {
      description,
      user: userId,
    });
    return response.data;
  };

  const {
    mutate: addTask,
    isPending,
    isError,
  } = useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTasks"] });
      setTask("");
    },
  });

  const handleAddTask = () => {
    if (userId) {
      addTask({ description: task, userId });
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center border-t-2 gap-2.5 py-5`}
      style={{ borderTopColor: taskColor }}
    >
      <div className="flex w-2xl gap-2">
        <Input
          id="task"
          type="text"
          value={task}
          placeholder="Add new task"
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <Button type="submit" disabled={!task} onClick={() => handleAddTask()}>
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default AddTask;

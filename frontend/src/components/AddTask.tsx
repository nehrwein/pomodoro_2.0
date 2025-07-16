import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { createTask } from "@/lib/api";
import { useUserStore } from "@/lib/useUserStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const AddTask = () => {
  const [task, setTask] = useState("");
  const userId = useUserStore().userId;
  const queryClient = useQueryClient();

  const {
    mutate: addTask,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTasks"] });
      setTask("");
    },
  });

  const handleAddTask = () => {
    if (userId) {
      addTask({ description: task, user: userId });
    }
  };

  return (
    <div className={`w-full flex items-center justify-center gap-2.5 py-5`}>
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

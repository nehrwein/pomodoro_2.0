import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { completeTask, deleteTask, getTasks, updateTask } from "@/lib/api";
import { useUserStore } from "@/lib/useUserStore";
import type { Task } from "@/types/apiSchemas";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

const Tasklist = () => {
  const userId = useUserStore().userId;
  const activatedTask = false;
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [pickedId, setPickedId] = useState("");
  const queryClient = useQueryClient();

  //TODO - error handling and loading state
  const { isPending, isError, data } = useQuery({
    queryKey: ["allTasks"],
    queryFn: () => getTasks(userId!),
    enabled: !!userId,
  });

  const {
    mutate: deleteTodo,
    isPending: isPendingDelete,
    isError: isErrorDelete,
  } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTasks"] });
    },
  });

  const {
    mutate: completeTodo,
    isPending: isPendingComplete,
    isError: isErrorComplete,
  } = useMutation({
    mutationFn: ({
      taskId,
      completed,
      completedAt,
    }: {
      taskId: string;
      completed: boolean;
      completedAt?: string;
    }) => completeTask(taskId, completed, completedAt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTasks"] });
    },
  });

  const {
    mutate: updateTodo,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
  } = useMutation({
    mutationFn: ({
      taskId,
      description,
    }: {
      taskId: string;
      description: string;
    }) => updateTask(taskId, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTasks"] });
    },
  });

  const handleTaskComplete = (item: Task) => {
    const now = new Date().toISOString();
    // Toggle: Wenn bereits completed, dann auf uncompleted setzen (completedAt entfernen)
    completeTodo({
      taskId: item.id,
      completed: !item.completed,
      completedAt: !item.completed ? now : undefined,
    });
  };

  const handleTaskDelete = (id: string) => {
    deleteTodo(id);
  };

  const handleUpdateTask = (taskId: string, description: string) => {
    updateTodo({ taskId, description });
    setPickedId("");
    setIsUpdating(false);
  };

  const onIsUpdating = (id: string) => {
    setPickedId(id);
    setIsUpdating(true);
  };

  const onStopUpdating = () => {
    setPickedId("");
    setIsUpdating(false);
  };

  return (
    <>
      <div
        className="flex m-auto flex-col items-center py-8  md:max-w-[550px] lg:max-w-[1000px] overflow-y-auto
        lg:grid lg:justify-items-center lg:content-start lg:min-h-[30vh]"
      >
        {/* {loading && <LoadingIndicator />} */}
        {data && !isPending && (
          <>
            {data.response.map((item) => (
              <div
                className="w-2xl flex items-center justify-between pb-1.5 lg:py-1.5  hover:bg-red-100"
                key={item.id}
              >
                {item.id === pickedId ? (
                  <div className="flex gap-2 items-center ">
                    <Input
                      type="text"
                      value={updatedDescription}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUpdateTask(item.id, updatedDescription);
                        }
                      }}
                      onChange={(event) => {
                        setUpdatedDescription(event.target.value);
                      }}
                      onDoubleClick={() => setPickedId("")}
                    />
                    <Save
                      className="cursor-pointer"
                      onClick={() =>
                        handleUpdateTask(item.id, updatedDescription)
                      }
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <Checkbox
                      checked={item.completed}
                      id="task"
                      onCheckedChange={() => handleTaskComplete(item)}
                    />
                    <label htmlFor="task" className="text-sm font-medium">
                      {item.description}
                    </label>
                    {/* <TaskLabel
                      taskColor={taskColor}
                      onClick={() => dispatch(timer.actions.setItems(item))}
                    >
                      {item.description}
                    </TaskLabel> */}
                  </div>
                )}
                <div className="flex justify-evenly gap-5">
                  {!isUpdating ? (
                    <Pencil
                      className={`cursor-pointer ${activatedTask ? "opacity-50 pointer-events-none" : ""}`}
                      aria-disabled={activatedTask}
                      onClick={() => onIsUpdating(item.id)}
                      onDoubleClick={
                        activatedTask ? () => setPickedId("") : undefined
                      }
                    />
                  ) : (
                    <X className="cursor-pointer" onClick={onStopUpdating} />
                  )}

                  <Trash2
                    className={
                      `cursor-pointer transition-transform duration-200 active:scale-90 ` +
                      (isPendingDelete
                        ? " animate-pulse opacity-50 pointer-events-none"
                        : "")
                    }
                    onClick={() => handleTaskDelete(item.id)}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Tasklist;

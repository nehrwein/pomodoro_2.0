import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Pencil, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteTask, getTasks } from "@/lib/api";
import { useUserStore } from "@/lib/useUserStore";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

const Tasklist = () => {
  const userId = useUserStore().userId;
  const activatedTask = false;
  const [updatedDescription, setUpdatedDescription] = useState("");
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

  const handleTaskDelete = (id: string) => {
    deleteTodo(id);
  };

  return (
    <>
      <div
        className={clsx(
          "flex flex-col items-center py-8 w-11/12 md:max-w-[550px] lg:max-w-[1000px] overflow-y-auto",
          "lg:grid lg:justify-items-center lg:content-start lg:min-h-[30vh]",
          isPending ? "lg:grid-cols-1" : "lg:grid-cols-2",
        )}
      >
        {/* {loading && <LoadingIndicator />} */}
        {data && !isPending && (
          <>
            {data.response.map((item) => (
              <div
                className="w-4/5 flex items-center justify-between pb-1.5 lg:py-1.5 lg:px-5 hover:bg-red-100"
                key={item.id}
              >
                {item.id === pickedId ? (
                  <>
                    <Input
                      type="text"
                      value={updatedDescription}
                      // onKeyPress={(e) => onPressEnter(e, item.id)}
                      onChange={(event) => {
                        setUpdatedDescription(event.target.value);
                      }}
                      onDoubleClick={() => setPickedId("")}
                    />
                    <Button
                      variant="ghost"
                      type="submit"
                      disabled={!updatedDescription}
                      // onClick={() =>
                      //   onUpdateTodo(
                      //     item.id,
                      //     accessToken,
                      //     updatedDescription,
                      //     userId
                      //   )
                      // }
                    >
                      <Save />
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <Checkbox
                      checked={item.completed}
                      id="task"
                      // onChange={() =>
                      //   onIsComplete(
                      //     item.id,
                      //     item.completed,
                      //     item.completedAt,
                      //     accessToken,
                      //     userId
                      //   )
                      // }
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
                  {!activatedTask ? (
                    <Pencil
                      className="cursor-pointer"
                      onClick={() => setPickedId(item.id)}
                      onDoubleClick={() => setPickedId("")}
                    />
                  ) : (
                    <Pencil />
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

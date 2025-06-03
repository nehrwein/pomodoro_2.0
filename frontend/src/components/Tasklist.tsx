import clsx from "clsx";
import { Pencil, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

const allOpenTasks = [
  {
    _id: "1",
    description: "Read a chapter of a book",
    completed: false,
    createdAt: new Date().toISOString(),
    userId: "user1",
  },
  {
    _id: "2",
    description: "Write a daily journal entry",
    completed: false,
    createdAt: new Date().toISOString(),
    userId: "user1",
  },
  {
    _id: "3",
    description: "Go for a 30-minute walk",
    completed: false,
    createdAt: new Date().toISOString(),
    userId: "user1",
  },
  {
    _id: "4",
    description: "Review TypeScript notes",
    completed: false,
    createdAt: new Date().toISOString(),
    userId: "user1",
  },
  {
    _id: "5",
    description: "Plan tomorrow’s tasks",
    completed: false,
    createdAt: new Date().toISOString(),
    userId: "user1",
  },
];

const Tasklist = () => {
  const loading = false;
  const activatedTask = false;
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [pickedId, setPickedId] = useState("");

  return (
    <>
      <div
        className={clsx(
          "flex flex-col items-center py-8 w-11/12 md:max-w-[550px] lg:max-w-[1000px] overflow-y-auto",
          "lg:grid lg:justify-items-center lg:content-start lg:min-h-[30vh]",
          loading ? "lg:grid-cols-1" : "lg:grid-cols-2",
        )}
      >
        {/* {loading && <LoadingIndicator />} */}
        {allOpenTasks && !loading && (
          <>
            {allOpenTasks.map((item) => (
              <div
                className="w-4/5 flex items-center justify-between pb-1.5 lg:py-1.5 lg:px-5"
                key={item._id}
              >
                {item._id === pickedId ? (
                  <>
                    <Input
                      type="text"
                      value={updatedDescription}
                      // onKeyPress={(e) => onPressEnter(e, item._id)}
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
                      //     item._id,
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
                      //     item._id,
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
                  {/* Edit/Update feature: https://ibaslogic.com/how-to-edit-todos-items-in-react/ */}
                  {!activatedTask ? (
                    <div
                      onClick={() => setPickedId(item._id)}
                      onDoubleClick={() => setPickedId("")}
                    >
                      <Pencil />
                    </div>
                  ) : (
                    <div>
                      <Pencil />
                    </div>
                  )}
                  <div
                  // onClick={() =>
                  //   dispatch(deleteTodo(accessToken, userId, item._id))
                  // }
                  >
                    <Trash2 />
                  </div>
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

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const AddTask = () => {
  const [task, setTask] = useState("");
  const taskColor = "blue";

  return (
    <div
      className={`w-full flex items-center justify-center border-t-2 gap-2.5 py-5`}
      style={{ borderTopColor: taskColor }}
    >
      <Input
        // taskColor={taskColor}
        id="task"
        type="text"
        value={task}
        placeholder="Add new task"
        onChange={(e) => setTask(e.target.value)}
        // onKeyPress={onPressEnter}
      />
      <Button
        type="submit"
        disabled={!task}
        // onClick={() => onAddTodo(accessToken, userId, task)}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default AddTask;

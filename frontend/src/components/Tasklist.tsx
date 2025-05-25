import clsx from "clsx"

const Tasklist = () => {
  const loading = false
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
  ]
  return (
    <>
      <div
        className={clsx(
          "flex flex-col items-center py-8 w-11/12 md:max-w-[550px] lg:max-w-[1000px] overflow-y-auto",
          "lg:grid lg:justify-items-center lg:content-start lg:min-h-[30vh]",
          loading ? "lg:grid-cols-1" : "lg:grid-cols-2"
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
                    <EditInput
                      type="text"
                      value={updatedDescription}
                      onKeyPress={(e) => onPressEnter(e, item._id)}
                      onChange={(event) => {
                        setUpdatedDescription(event.target.value)
                      }}
                      onDoubleClick={() => setPickedId("")}
                    />
                    <SaveButton
                      type="submit"
                      disabled={!updatedDescription}
                      onClick={() =>
                        onUpdateTodo(
                          item._id,
                          accessToken,
                          updatedDescription,
                          userId
                        )
                      }
                    >
                      <TaskIcon>{saveIcon}</TaskIcon>
                    </SaveButton>
                  </>
                ) : (
                  <CheckContainer>
                    <Checkbox
                      isChecked={item.completed}
                      onChange={() =>
                        onIsComplete(
                          item._id,
                          item.completed,
                          item.completedAt,
                          accessToken,
                          userId
                        )
                      }
                    />
                    <TaskLabel
                      taskColor={taskColor}
                      onClick={() => dispatch(timer.actions.setItems(item))}
                    >
                      {item.description}
                    </TaskLabel>
                  </CheckContainer>
                )}
                <TaskSettings>
                  {/* Edit/Update feature: https://ibaslogic.com/how-to-edit-todos-items-in-react/ */}
                  {!activatedTask ? (
                    <div
                      onClick={() => setPickedId(item._id)}
                      onDoubleClick={() => setPickedId("")}
                    >
                      <TaskIcon>{penIcon}</TaskIcon>
                    </div>
                  ) : (
                    <div>
                      <TaskIcon>{penIcon}</TaskIcon>
                    </div>
                  )}
                  <div
                    onClick={() =>
                      dispatch(deleteTodo(accessToken, userId, item._id))
                    }
                  >
                    <TaskIcon>{trashCanIcon}</TaskIcon>
                  </div>
                </TaskSettings>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Tasklist

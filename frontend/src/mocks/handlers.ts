import { http, HttpResponse } from "msw"
import {
  AuthRequestSchema,
  AuthResponseSchema,
  TaskSchema,
  SettingsSchema,
} from "@/types/apiSchemas"

export const handlers = [
  // Auth endpoints
  http.post("/api/auth/signup", async ({ request }) => {
    const body = await request.json()
    const parseResult = AuthRequestSchema.safeParse(body)
    if (!parseResult.success) {
      return HttpResponse.json({ error: "Invalid input" }, { status: 400 })
    }
    const { username } = parseResult.data
    const response = {
      user: { id: "mock-user-id", username },
      token: "mock-jwt-token",
    }
    AuthResponseSchema.parse(response)
    return HttpResponse.json(response, { status: 201 })
  }),

  http.post("/auth/signin", async ({ request }) => {
    const body = await request.json()
    const parseResult = AuthRequestSchema.safeParse(body)
    if (!parseResult.success) {
      return HttpResponse.json({ error: "Invalid input" }, { status: 400 })
    }
    const { username } = parseResult.data
    if (username === "notfound") {
      return HttpResponse.json({ error: "User not found." }, { status: 404 })
    }
    const response = {
      user: { id: "mock-user-id", username },
      token: "mock-jwt-token",
    }
    AuthResponseSchema.parse(response)
    return HttpResponse.json(response)
  }),

  // Tasks endpoints
  http.get("/api/tasks/:userId", ({ params }) => {
    const tasks = [
      {
        id: "1",
        description: "Sample Task 1",
        completed: false,
        userId: String(params.userId),
      },
      {
        id: "2",
        description: "Sample Task 2",
        completed: true,
        userId: String(params.userId),
      },
    ]
    tasks.forEach((task) => TaskSchema.parse(task))
    return HttpResponse.json({ response: tasks, success: true })
  }),

  http.post("/api/tasks", async ({ request }) => {
    const body = await request.json()
    if (
      !body ||
      typeof body !== "object" ||
      !("description" in body) ||
      !("user" in body)
    ) {
      return HttpResponse.json(
        { response: "Description and user are required.", success: false },
        { status: 400 }
      )
    }
    const { description, user } = body
    const newTask = {
      id: "mock-task-id",
      description,
      userId: user,
      completed: false,
    }
    TaskSchema.parse(newTask)
    return HttpResponse.json(
      { response: newTask, success: true },
      { status: 201 }
    )
  }),

  // User endpoints
  http.patch("/api/user/:userId/settings", async ({ request }) => {
    const body = await request.json()
    const parseResult = SettingsSchema.safeParse(body)
    if (!parseResult.success) {
      return HttpResponse.json({ error: "Invalid input" }, { status: 400 })
    }
    return HttpResponse.json({ response: body, success: true })
  }),
  http.delete("/api/user/:userId", ({ params }) => {
    return HttpResponse.json({
      response: { deletedUser: { id: params.userId }, deletedTasks: [] },
      success: true,
    })
  }),
]

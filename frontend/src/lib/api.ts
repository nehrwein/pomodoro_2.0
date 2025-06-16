import { z } from "zod";
import axios from "@/lib/axios";
import {
  AuthResponseSchema,
  SettingsSchema,
  TaskSchema,
  // ggf. weitere Schemas importieren
} from "@/types/apiSchemas";

// Hilfsschemas für Response-Objekte
const TasksResponseSchema = z.object({
  response: z.array(TaskSchema),
  success: z.boolean(),
});

const DeleteResponseSchema = z.object({
  response: z.any(),
  success: z.boolean(),
});

// AUTH (Login & Signup kombiniert)
export async function auth({
  username,
  password,
  mode,
}: {
  username: string;
  password: string;
  mode: "login" | "signup";
}) {
  const response = await axios.post(`/auth/${mode}`, { username, password });
  return AuthResponseSchema.parse(response.data);
}

// TASKS
export async function getTasks(userId: string) {
  const response = await axios.get(`/tasks/${userId}`);
  return TasksResponseSchema.parse(response.data);
}

export async function createTask({
  description,
  user,
}: {
  description: string;
  user: string;
}) {
  const response = await axios.post("/tasks", { description, user });
  return TaskSchema.parse(response.data.response);
}

export async function completeTask(
  taskId: string,
  completed: boolean,
  completedAt?: string,
) {
  const response = await axios.patch(`/tasks/${taskId}/complete`, {
    completed,
    completedAt,
  });
  return TaskSchema.parse(response.data.response);
}

export async function deleteTask(taskId: string) {
  const response = await axios.delete(`/tasks/${taskId}`);
  return DeleteResponseSchema.parse(response.data);
}

// USER SETTINGS
export async function updateUserSettings({
  userId,
  workMinutes,
  shortBreakMinutes,
  longBreakMinutes,
  accessToken,
}: {
  userId: string;
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  accessToken?: string;
}) {
  const response = await axios.patch(
    `/user/${userId}/settings`,
    { workMinutes, shortBreakMinutes, longBreakMinutes },
    accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {},
  );
  return SettingsSchema.parse(response.data.response); // response enthält die Settings
}

export async function deleteUser({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken?: string;
}) {
  const response = await axios.delete(
    `/user/${userId}`,
    accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {},
  );
  return DeleteResponseSchema.parse(response.data);
}

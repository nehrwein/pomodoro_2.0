import axios from "@/lib/axios"

// AUTH
export async function signup({
  username,
  password,
}: {
  username: string
  password: string
}) {
  return axios.post("/api/auth/signup", { username, password })
}

export async function signin({
  username,
  password,
}: {
  username: string
  password: string
}) {
  return axios.post("/auth/signin", { username, password })
}

// TASKS
export async function getTasks(userId: string) {
  return axios.get(`/api/tasks/${userId}`)
}

export async function createTask({
  description,
  user,
}: {
  description: string
  user: string
}) {
  return axios.post("/api/tasks", { description, user })
}

export async function completeTask(taskId: string) {
  return axios.patch(`/api/tasks/${taskId}/complete`)
}

export async function deleteTask(taskId: string) {
  return axios.delete(`/api/tasks/${taskId}`)
}

// USER SETTINGS
export async function updateUserSettings({
  userId,
  workMinutes,
  shortBreakMinutes,
  longBreakMinutes,
  accessToken,
}: {
  userId: string
  workMinutes: number
  shortBreakMinutes: number
  longBreakMinutes: number
  accessToken?: string
}) {
  return axios.patch(
    `/api/user/${userId}/settings`,
    { workMinutes, shortBreakMinutes, longBreakMinutes },
    accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}
  )
}

export async function deleteUser({
  userId,
  accessToken,
}: {
  userId: string
  accessToken?: string
}) {
  return axios.delete(
    `/api/user/${userId}`,
    accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}
  )
}

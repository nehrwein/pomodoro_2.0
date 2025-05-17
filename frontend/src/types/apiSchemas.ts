import { z } from "zod"

export const AuthRequestSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
})

export const AuthResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
  token: z.string(),
})

export const TaskSchema = z.object({
  id: z.string(),
  description: z.string(),
  completed: z.boolean(),
  userId: z.string(),
})

export const SettingsSchema = z.object({
  workMinutes: z.number(),
  shortBreakMinutes: z.number(),
  longBreakMinutes: z.number(),
})

export type AuthRequest = z.infer<typeof AuthRequestSchema>
export type AuthResponse = z.infer<typeof AuthResponseSchema>
export type Task = z.infer<typeof TaskSchema>
export type Settings = z.infer<typeof SettingsSchema>

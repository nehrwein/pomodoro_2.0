import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useUserStore } from "@/lib/useUserStore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/lib/axios"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("signin")
  const accessToken = useUserStore((state) => state.accessToken)
  const error = useUserStore((state) => state.error)
  const setAccessToken = useUserStore((state) => state.setAccessToken)
  const setUserId = useUserStore((state) => state.setUserId)
  const setUsernameStore = useUserStore((state) => state.setUsername)
  const setError = useUserStore((state) => state.setError)

  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate("/")
    }
  }, [accessToken, navigate])

  const loginMutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => {
      const response = await api.post(`auth/${mode}`, { username, password })
      return response.data
    },
    onSuccess: (data) => {
      setAccessToken(data.token)
      setUserId(data.user.id)
      setUsernameStore(data.user.username)
      setError(null)
    },
    onError: (error: AxiosError) => {
      setError(error.message || "Login failed")
    },
  })

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    loginMutation.mutate({ username, password })
  }

  const onSignIn = () => {
    setMode("signin")
    setError(null)
    setUsername("")
    setPassword("")
  }

  const handleClick = () => {
    if (mode === "signin") {
      setMode("signup")
    } else {
      onSignIn()
    }
  }

  return (
    <>
      <main className="h-screen w-full flex absolute flex-col items-center justify-center bg-[url('/assets/tomato-background.jpg')] bg-no-repeat bg-center bg-cover">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Pomodoro App</CardTitle>
            <CardDescription>
              {mode === "signin"
                ? "Log in to your account"
                : "Create a new account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onFormSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Username</Label>
                  <Input
                    id="name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                <Button size="lg" type="submit">
                  {mode === "signup" ? "Submit" : "Log in"}
                </Button>
              </div>

              {error && (
                <div>
                  <p className="text-primary text-center font-bold">{error}</p>
                </div>
              )}

              <div className="flex flex-col justify-center text-center mx-auto border-t ">
                <p className="m-1">
                  {mode === "signin"
                    ? "New to our app?"
                    : "Already have an account?"}
                </p>
                <Button variant="ghost" onClick={handleClick}>
                  {mode === "signin" ? "Create an account" : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  )
}

export default Login

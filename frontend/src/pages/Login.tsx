import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUserStore } from "@/lib/useUserStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("auth/signin");
  const accessToken = useUserStore((state) => state.accessToken);
  const error = useUserStore((state) => state.error);
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setUserId = useUserStore((state) => state.setUserId);
  const setUsernameStore = useUserStore((state) => state.setUsername);
  const setError = useUserStore((state) => state.setError);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const loginMutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const response = await api.post(mode, { username, password });
      return response.data;
    },
    onSuccess: (data) => {
      setAccessToken(data.token);
      setUserId(data.user.id);
      setUsernameStore(data.user.username);
      setError(null);
    },
    onError: (error: AxiosError) => {
      setError(error.message || "Login failed");
    },
  });

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate({ username, password });
  };

  const onSignIn = () => {
    setMode("auth/signin");
    setError(null);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <main className="h-screen w-full flex absolute flex-col items-center justify-center bg-[url('/assets/tomato-background.jpg')] bg-no-repeat bg-center bg-cover">
        <div className="w-[60%] bg-white p-10 rounded-lg shadow-[0_0_20px_10px_rgba(0,0,0,0.15)] flex flex-col items-center text-[var(--lightRed)] md:w-auto md:text-[20px] md:h3:text-[22px] lg:text-[23px] lg:p-[70px] lg:h3:text-[25px]">
          <h3 style={{ color: "var(--red)" }}>
            {mode === "auth/signin"
              ? "Log in to your account"
              : "Create new account"}
          </h3>
          <form onSubmit={onFormSubmit}>
            <fieldset className="border-2 border-red-500 rounded-md flex justify-between items-center pr-5 mb-2 mt-1">
              <legend>Username:</legend>
              <input
                className="border border-transparent w-full h-full outline-none text-[20px]"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </fieldset>
            <fieldset className="border-2 border-red-500 rounded-md flex justify-between items-center pr-5 mb-2 mt-1">
              <legend>Password:</legend>
              <input
                className="border border-transparent w-full h-full outline-none text-[20px]"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            {error && (
              <div>
                <p className="text-red-500 text-center font-bold">{error}</p>
              </div>
            )}
            <button
              type="submit"
              className="bg-red-500 w-[100px] flex justify-center border-none cursor-pointer text-red-100 text-[20px] font-medium p-[10px] my-[20px] mx-auto rounded-md shadow-[0_3px_10px_rgba(0,0,0,0.2)] hover:bg-red-500/75 active:bg-red-500  md:text-[22px] md:w-[120px] lg:text-[25px] lg:w-[150px]"
            >
              {mode === "signup" ? "Submit" : "Log in"}
            </button>
            <div>
              {mode === "auth/signin" ? (
                <div className="flex flex-col justify-center text-center mx-auto border-t border-gorangebg-orange-800 p-2">
                  <p className="m-1">New to our app? </p>
                  <p
                    className="font-bold cursor-pointer underline"
                    onClick={() => setMode("auth/signup")}
                  >
                    Create an account
                  </p>
                </div>
              ) : (
                <div className="flex flex-col justify-center text-center mx-auto border-t border-gray-400 p-2">
                  <p className="m-1">Already have an account? </p>
                  <p
                    className="font-bold cursor-pointer underline"
                    onClick={onSignIn}
                  >
                    Log in
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/lib/useUserStore";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { updateUserSettings, deleteUser } from "@/lib/api";

const Settings = () => {
  const {
    userId,
    accessToken,
    workMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    setWorkMinutes,
    setShortBreakMinutes,
    setLongBreakMinutes,
    setAccessToken,
  } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const mutation = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: () => navigate("/"),
  });

  const deleteMutation = useMutation({
    mutationFn: ({
      userId,
      accessToken,
    }: {
      userId: string;
      accessToken?: string;
    }) => deleteUser({ userId, accessToken }),
    onSuccess: () => {
      setAccessToken(null);
    },
  });

  const handleSaveSettings = () => {
    if (!userId) return;
    mutation.mutate({
      userId,
      workMinutes,
      shortBreakMinutes,
      longBreakMinutes,
      accessToken: accessToken ?? undefined,
    });
  };

  const handleDeleteAccount = () => {
    if (!userId) return;
    deleteMutation.mutate({ userId, accessToken: accessToken ?? undefined });
  };

  return (
    <div className="mx-auto w-4/5 max-w-[1100px] pt-12 text-center">
      <Card className=" px-10">
        <CardHeader>
          <CardTitle className="text-xl md:text-3xl lg:text-3xl">
            Settings
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="text-left flex flex-col gap-5">
              <label className="block md:text-[18px] lg:text-[25px]">
                Time for work: {workMinutes}{" "}
                {workMinutes > 1 ? "minutes" : "minute"}
              </label>
              <Slider
                min={0}
                max={60}
                defaultValue={[workMinutes]}
                step={1}
                onValueChange={([val]) => setWorkMinutes(val)}
              />
              <label className="block md:text-[18px] lg:text-[25px]">
                Time for short breaks: {shortBreakMinutes}{" "}
                {shortBreakMinutes > 1 ? "minutes" : "minute"}
              </label>
              <Slider
                min={0}
                max={60}
                defaultValue={[shortBreakMinutes]}
                step={1}
                onValueChange={([val]) => setShortBreakMinutes(val)}
              />
              <label className="block md:text-[18px] lg:text-[25px]">
                Time for long breaks: {longBreakMinutes}{" "}
                {longBreakMinutes > 1 ? "minutes" : "minute"}
              </label>
              <Slider
                min={0}
                max={60}
                defaultValue={[longBreakMinutes]}
                step={1}
                onValueChange={([val]) => setLongBreakMinutes(val)}
              />
              <Button
                variant="secondary"
                type="submit"
                onClick={handleSaveSettings}
              >
                Save Settings
              </Button>
            </div>
          </div>

          <h3 className="mt-8 text-xl md:text-[25px] lg:text-[35px]">
            Delete account
          </h3>
          <p className="md:text-[20px] lg:text-[25px]">
            By clicking on 'Delete Account' you can delete your user account
            including all the stored data.
          </p>
          <Button
            variant="destructive"
            type="submit"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;

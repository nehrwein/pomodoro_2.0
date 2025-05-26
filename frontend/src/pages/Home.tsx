import PomodoroTImer from "@/components/PomodoroTImer";
import Tasklist from "@/components/Tasklist";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/useUserStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useUserStore();

  const handleLogout = () => {
    setAccessToken(null);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);
  return (
    <>
      <div className="flex flex-col">
        <PomodoroTImer />
        <Tasklist />
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
}

export default Home;

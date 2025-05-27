import AddTask from "@/components/Addtask";
import PomodoroTImer from "@/components/PomodoroTImer";
import Tasklist from "@/components/Tasklist";
import { useUserStore } from "@/lib/useUserStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { accessToken } = useUserStore();

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
        <AddTask />
      </div>
    </>
  );
}

export default Home;

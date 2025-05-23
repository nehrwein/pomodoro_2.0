import { useState } from "react";

const PomodoroTImer = () => {
  const [work, setWork] = useState(false);
  const timerMinutes = 10;
  const timerSeconds = 35;
  const description = "Lorem Ipsum";
  const percentage = 40;
  const animationColor = "green";

  return (
    <div
      className={
        `relative w-full m-0 py-7 md:py-24 lg:py-12 text-foreground bg-no-repeat bg-center bg-cover ` +
        (work
          ? "bg-[url('/assets/timer-work-background.png')]"
          : "bg-[url('/assets/timer-break-background.png')]")
      }
    >
      <div
        className="absolute inset-0"
        style={{ width: `${percentage}%`, background: `${animationColor}` }}
      />
      <div className="flex justify-center">
        <div className="text-center text-secondary">
          <h1 className="text-5xl m-0 md:text-6xl lg:text-7xl">
            {timerMinutes}:{timerSeconds}
          </h1>
          <p className="md:text-2xl lg:text-4xl">{description}</p>
        </div>
      </div>
      {/* <PomodoroButtons
        setSeconds={setSeconds}
        setMinutes={setMinutes}
        setSecondsLeft={setSecondsLeft}
        workMinutes={workMinutes}
        totalSeconds={totalSeconds}
        work={work}
      /> */}
    </div>
  );
};

export default PomodoroTImer;

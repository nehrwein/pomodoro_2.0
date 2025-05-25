import { Button } from "./ui/button"
import { Ban, CirclePause, Play, RotateCcw } from "lucide-react"

const PomodoroButtons = () => {
  const work = false
  // const buttonBackgroundColor = work ? "darkred" : "darkblue"
  const activatedButton = true
  const isRunning = false
  const iconColor = work ? "red" : "blue"

  const onClickReplay = () => {}
  const onClickDelete = () => {}
  const setIsRunning = () => {}

  return (
    <>
      <div className="flex justify-between gap-1">
        <Button
          variant="secondary"
          disabled={!activatedButton}
          onClick={onClickReplay}
        >
          <RotateCcw
            color={iconColor}
            className="text-3xl md:text-4xl lg:text-5xl"
          />
          {/* <TimerIcon iconColor={iconColor} active>
              <
              {ReplayIcon}
            </TimerIcon> */}
        </Button>
        {isRunning ? (
          <Button
            variant="secondary"
            disabled={!activatedButton}
            onClick={() => setIsRunning()}
          >
            <CirclePause
              color={iconColor}
              className="text-5xl md:text-6xl lg:text-7xl"
            />
          </Button>
        ) : (
          <Button
            variant="secondary"
            disabled={!activatedButton}
            onClick={() => setIsRunning()}
          >
            <Play
              color={iconColor}
              className="text-5xl md:text-6xl lg:text-7xl"
            />
          </Button>
        )}
        <Button
          variant="secondary"
          disabled={!activatedButton}
          onClick={onClickDelete}
        >
          <Ban
            color={iconColor}
            className="text-3xl md:text-4xl lg:text-5xl hover:text-white transition ease-in-out duration-500"
          />
        </Button>
      </div>
    </>
  )
}

export default PomodoroButtons

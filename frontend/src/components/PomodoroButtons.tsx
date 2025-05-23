const PomodoroButtons = () => {
  return (
    <>
      <ButtonsContainer buttonBackgroundColor={buttonBackgroundColor}>
        <InnerButtonContainer>
          <TimerButton disabled={!activatedButton} onClick={onClickReplay}>
            <TimerIcon iconColor={iconColor} active>
              {ReplayIcon}
            </TimerIcon>
          </TimerButton>
          {isRunning ? (
            <TimerButton
              disabled={!activatedButton}
              onClick={() => dispatch(timer.actions.setisRunning(false))}
            >
              <BigIcon iconColor={iconColor}>{PauseIcon}</BigIcon>
            </TimerButton>
          ) : (
            <TimerButton
              disabled={!activatedButton}
              onClick={() => dispatch(timer.actions.setisRunning(true))}
            >
              <BigIcon iconColor={iconColor}>{PlayIcon}</BigIcon>
            </TimerButton>
          )}
          <TimerButton disabled={!activatedButton} onClick={onClickDelete}>
            <TimerIcon iconColor={iconColor}>{StopIcon}</TimerIcon>
          </TimerButton>
        </InnerButtonContainer>
      </ButtonsContainer>
    </>
  );
};

export default PomodoroButtons;

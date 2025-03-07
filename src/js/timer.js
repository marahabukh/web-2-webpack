export function initializeTimer(settings, notifications) {
  let interval
  let timeRemaining = 0
  let isRunning = false
  let isPaused = false
  let isWorkMode = true
  let completedWorkSessions = 0
  const callbacks = []

  function startTimer() {
    if (isRunning && !isPaused) return

    if (!isPaused) {
      timeRemaining = isWorkMode
        ? settings.getWorkDuration() * 60
        : completedWorkSessions % 4 === 0 && completedWorkSessions > 0
          ? settings.getLongBreakDuration() * 60
          : settings.getBreakDuration() * 60
    }

    isRunning = true
    isPaused = false

    clearInterval(interval)
    interval = setInterval(() => {
      timeRemaining--

      notifySubscribers()

      if (timeRemaining <= 0) {
        clearInterval(interval)
        handleSessionComplete()
      }
    }, 1000)
  }

  function pauseTimer() {
    if (!isRunning) return

    isPaused = true
    clearInterval(interval)
    notifySubscribers()
  }

  function resetTimer() {
    clearInterval(interval)
    isRunning = false
    isPaused = false
    timeRemaining = isWorkMode ? settings.getWorkDuration() * 60 : settings.getBreakDuration() * 60
    notifySubscribers()
  }

  function handleSessionComplete() {
    notifications.playNotification()

    if (isWorkMode) {
      completedWorkSessions++
    }

    isWorkMode = !isWorkMode
    isRunning = false

    setTimeout(() => {
      startTimer()
    }, 1000)
  }

  function getTimeRemaining() {
    return timeRemaining
  }

  function getFormattedTime() {
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  function getMode() {
    return isWorkMode ? "work" : "break"
  }

  function getCompletedSessions() {
    return completedWorkSessions
  }

  function getProgress() {
    const totalTime = isWorkMode
      ? settings.getWorkDuration() * 60
      : completedWorkSessions % 4 === 0 && completedWorkSessions > 0
        ? settings.getLongBreakDuration() * 60
        : settings.getBreakDuration() * 60

    const elapsedTime = totalTime - timeRemaining
    return (elapsedTime / totalTime) * 100
  }

  function getStatus() {
    if (!isRunning) return "stopped"
    if (isPaused) return "paused"
    return "running"
  }

  function subscribe(callback) {
    callbacks.push(callback)
  }

  function notifySubscribers() {
    callbacks.forEach((callback) => callback())
  }

  resetTimer()

  return {
    startTimer,
    pauseTimer,
    resetTimer,
    getTimeRemaining,
    getFormattedTime,
    getMode,
    getCompletedSessions,
    getProgress,
    getStatus,
    subscribe,
  }
}


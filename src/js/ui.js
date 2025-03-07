export function initializeUI(timer, settings) {
  const timerDisplay = document.getElementById("timer-display")
  const modeDisplay = document.getElementById("mode-display")
  const progressBar = document.getElementById("progress-bar")
  const startButton = document.getElementById("start-btn")
  const pauseButton = document.getElementById("pause-btn")
  const resetButton = document.getElementById("reset-btn")
  const settingsForm = document.getElementById("settings-form")
  const sessionCounter = document.getElementById("session-counter")

  function updateUI() {
    timerDisplay.textContent = timer.getFormattedTime()

    const mode = timer.getMode()
    modeDisplay.textContent =
      mode === "work"
        ? "Work Session"
        : timer.getCompletedSessions() % 4 === 0 && timer.getCompletedSessions() > 0
          ? "Long Break"
          : "Short Break"

    progressBar.style.width = `${timer.getProgress()}%`

    sessionCounter.textContent = `Completed Sessions: ${timer.getCompletedSessions()}`

    const status = timer.getStatus()
    startButton.disabled = status === "running"
    pauseButton.disabled = status !== "running"

    document.title = `${timer.getFormattedTime()} - ${modeDisplay.textContent}`

    document.body.className = mode
  }

  startButton.addEventListener("click", () => {
    timer.startTimer()
  })

  pauseButton.addEventListener("click", () => {
    timer.pauseTimer()
  })

  resetButton.addEventListener("click", () => {
    timer.resetTimer()
  })

  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const workDuration = Number.parseInt(document.getElementById("work-duration").value, 10)
    const breakDuration = Number.parseInt(document.getElementById("break-duration").value, 10)
    const longBreakDuration = Number.parseInt(document.getElementById("long-break-duration").value, 10)

    if (workDuration < 1 || breakDuration < 1 || longBreakDuration < 1) {
      alert("All durations must be at least 1 minute.")
      return
    }

    settings.setWorkDuration(workDuration)
    settings.setBreakDuration(breakDuration)
    settings.setLongBreakDuration(longBreakDuration)

    timer.resetTimer()

    document.getElementById("settings-modal").classList.remove("show")
  })

  document.getElementById("settings-btn").addEventListener("click", () => {
    document.getElementById("settings-modal").classList.add("show")

    document.getElementById("work-duration").value = settings.getWorkDuration()
    document.getElementById("break-duration").value = settings.getBreakDuration()
    document.getElementById("long-break-duration").value = settings.getLongBreakDuration()
  })

  document.getElementById("settings-modal").addEventListener("click", (e) => {
    if (e.target.id === "settings-modal") {
      e.target.classList.remove("show")
    }
  })

  timer.subscribe(updateUI)

  updateUI()
}


import "./styles/main.css"
import { initializeUI } from "./js/ui.js"
import { initializeSettings } from "./js/settings.js"
import { initializeTimer } from "./js/timer.js"
import { initializeNotifications } from "./js/notifications.js"
import { initializeTaskList } from "./js/taskList.js"

document.addEventListener("DOMContentLoaded", () => {
  const settings = initializeSettings()
  const notifications = initializeNotifications()
  const timer = initializeTimer(settings, notifications)
  initializeUI(timer, settings)
  initializeTaskList()
})


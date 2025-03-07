export function initializeSettings() {
  const DEFAULT_WORK_DURATION = 25;
  const DEFAULT_BREAK_DURATION = 5;
  const DEFAULT_LONG_BREAK_DURATION = 15;
  
  let workDuration = parseInt(localStorage.getItem('workDuration'), 10) || DEFAULT_WORK_DURATION;
  let breakDuration = parseInt(localStorage.getItem('breakDuration'), 10) || DEFAULT_BREAK_DURATION;
  let longBreakDuration = parseInt(localStorage.getItem('longBreakDuration'), 10) || DEFAULT_LONG_BREAK_DURATION;
  let notificationSound = localStorage.getItem('notificationSound') || 'bell';

  function getWorkDuration() {
    return workDuration;
  }

  function getBreakDuration() {
    return breakDuration;
  }

  function getLongBreakDuration() {
    return longBreakDuration;
  }

  function getNotificationSound() {
    return notificationSound;
  }

  function setWorkDuration(duration) {
    if (duration < 1) throw new Error('Work duration must be at least 1 minute');
    workDuration = duration;
    localStorage.setItem('workDuration', duration);
  }

  function setBreakDuration(duration) {
    if (duration < 1) throw new Error('Break duration must be at least 1 minute');
    breakDuration = duration;
    localStorage.setItem('breakDuration', duration);
  }

  function setLongBreakDuration(duration) {
    if (duration < 1) throw new Error('Long break duration must be at least 1 minute');
    longBreakDuration = duration;
    localStorage.setItem('longBreakDuration', duration);
  }

  function setNotificationSound(sound) {
    notificationSound = sound;
    localStorage.setItem('notificationSound', sound);
  }

  return {
    getWorkDuration,
    getBreakDuration,
    getLongBreakDuration,
    getNotificationSound,
    setWorkDuration,
    setBreakDuration,
    setLongBreakDuration,
    setNotificationSound
  };
}

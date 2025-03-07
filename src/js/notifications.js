export function initializeNotifications() {
  const sounds = {
    bell: new Audio('/sounds/bell.mp3'),
    chime: new Audio('/sounds/chime.mp3'),
    alert: new Audio('/sounds/alert.mp3')
  };

  const audioSupported = typeof Audio !== 'undefined';

  function playNotification() {
    if (!audioSupported) {
      alert('Time is up!');
      return;
    }

    const selectedSound = localStorage.getItem('notificationSound') || 'bell';
    
    try {
      sounds[selectedSound].currentTime = 0;
      sounds[selectedSound].play();
    } catch (error) {
      console.error('Error playing notification sound:', error);
      alert('Time is up!');
    }
  }

  function updateNotificationSound(sound) {
    if (!sounds[sound]) {
      console.error(`Sound "${sound}" not found`);
      return;
    }
    
    localStorage.setItem('notificationSound', sound);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const soundSelector = document.getElementById('notification-sound');
    if (soundSelector) {
      soundSelector.value = localStorage.getItem('notificationSound') || 'bell';
      
      soundSelector.addEventListener('change', (e) => {
        updateNotificationSound(e.target.value);
      });
    }
  });

  return {
    playNotification,
    updateNotificationSound
  };
}

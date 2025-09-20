// Convert ms to time format (hours, minutes, seconds)
export const msToTime = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  // Add a zero if necessary
  const pad = (num) => num.toString().padStart(2, "0");

  if (days > 0) {
    return `${days}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    return `${pad(minutes)}:${pad(seconds)}`;
  }
};

// Get year from track data
export const getYear = (date) => date.split("-")[0];

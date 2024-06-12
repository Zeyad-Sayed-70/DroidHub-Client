export function getRelativeTime(dateString: string): string {
  const now = new Date();
  const pastDate = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;
  const secondsInMonth = 30 * secondsInDay; // Approximation
  const secondsInYear = 365 * secondsInDay; // Approximation

  if (diffInSeconds < secondsInMinute) {
    return "now";
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes}m`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours}h`;
  } else if (diffInSeconds < secondsInMonth) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days}d`;
  } else if (diffInSeconds < secondsInYear) {
    const months = Math.floor(diffInSeconds / secondsInMonth);
    return `${months}mo`;
  } else {
    const years = Math.floor(diffInSeconds / secondsInYear);
    return `${years}y`;
  }
}

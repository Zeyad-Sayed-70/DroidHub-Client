export function testGetRelativeTime() {
  const testCases = [
    { input: new Date(Date.now() - 10 * 1000), expected: "now" }, // 10 seconds ago
    { input: new Date(Date.now() - 3 * 60 * 1000), expected: "3m" }, // 3 minutes ago
    { input: new Date(Date.now() - 2 * 60 * 60 * 1000), expected: "2h" }, // 2 hours ago
    { input: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), expected: "5d" }, // 5 days ago
    {
      input: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000),
      expected: "2mo",
    }, // 2 months ago
    {
      input: new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000),
      expected: "3y",
    }, // 3 years ago
    { input: new Date(Date.now() + 10 * 1000), expected: "now" }, // 10 seconds in future
  ];

  testCases.forEach(({ input, expected }, index) => {
    const result = getRelativeTime(input.toISOString());
    console.log(`Test ${index + 1}: ${result} (expected: ${expected})`);
  });
}

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

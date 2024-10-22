const startTime = Date.now();

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function logWithTime(message: string): number {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(new Date(currentTime));
  console.log(`[${formattedTime}] ${message}`);
  return elapsedTime;
}

export function calculateTotalTime(logs: number[]): string {
  const totalTimeMs = logs[logs.length - 1] - logs[0];
  const totalTimeSeconds = Math.round(totalTimeMs / 1000);
  return `Total time: ${totalTimeSeconds} seconds`;
}

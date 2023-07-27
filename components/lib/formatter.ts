
export const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

export function getFormattedDate() {
  const currentDate = new Date();
  return currentDate.toLocaleString('en-US', {month: "long", day: "2-digit", year: "numeric"});
}
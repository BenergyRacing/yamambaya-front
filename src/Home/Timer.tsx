import { useState, useEffect } from 'react';


function Timer({ dateStart }: { dateStart: string }) {
  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const start = new Date(dateStart).getTime(); // Start date
      const now = Date.now(); // Current time
      const diff = now - start; // Difference in milliseconds

      // Converts to hours, minutes and seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // Format the output
      setTimeElapsed(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    calculateTimeElapsed()

    // Update the timer every 1 seconf
    const interval = setInterval(calculateTimeElapsed, 1000);

    // Clears the TimeElapsed when dismounting the component
    return () => clearInterval(interval);
  }, [dateStart]);

  return <span className="button-text">Em andamento: {timeElapsed}</span>;
}

export default Timer
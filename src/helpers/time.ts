export  function calculatePlayableTime(startSecond: number, stopSecond: number) {
    // Calculate total playable seconds
    const totalSeconds = stopSecond - startSecond;

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    // Build the human-readable time format
    const hoursPart = hours > 0 ? hours.toString() + ':' : '';
    const minutesPart = minutes.toString().padStart(2, '0');
    const secondsPart = seconds.toString().padStart(2, '0');
    const formattedTime = hoursPart + minutesPart + ':' + secondsPart;

    return formattedTime
    
}
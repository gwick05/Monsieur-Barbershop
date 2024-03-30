//function that calculates the median distance in days between an array of dates
export default function calculateMedianDistanceBetweenDates(dates) {
  const sortedDates = dates.slice().sort((a, b) => a - b);

  const differences = [];
  for (let i = 0; i < sortedDates.length - 1; i++) {
    differences.push(
      Math.abs(
        (new Date(sortedDates[i + 1]) - new Date(sortedDates[i])) /
          (1000 * 3600 * 24),
      ),
    );
  }

  differences.sort((a, b) => a - b);

  const n = differences.length;
  if (n % 2 === 0) {
    return (differences[n / 2 - 1] + differences[n / 2]) / 2;
  } else {
    return differences[Math.floor(n / 2)];
  }
}

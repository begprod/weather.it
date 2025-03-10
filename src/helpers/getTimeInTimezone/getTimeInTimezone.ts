export function getTimeInTimezone(timezoneOffset: number) {
  const utcDate = new Date();

  const localDate = new Date(utcDate.getTime() + timezoneOffset * 1000);

  const hours = localDate.getUTCHours().toString().padStart(2, '0');
  const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

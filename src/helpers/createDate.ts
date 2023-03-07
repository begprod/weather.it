export function createDate() {
  const date = new Date();
  const options = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  } as const;

  return new Intl.DateTimeFormat('ru', options).format(date);
}

export function createDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (hours < 10) {
    return `${day}.${month}.${year} 0${hours}:${minutes}`;
  }

  if (minutes < 10) {
    return `${day}.${month}.${year} ${hours}:0${minutes}`;
  }

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

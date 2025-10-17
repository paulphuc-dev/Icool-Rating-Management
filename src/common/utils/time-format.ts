export function formatDateToString(date: Date): string {
  const pad = (n: number, width = 2) => n.toString().padStart(width, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Tháng từ 0-11
  const day = pad(date.getDate());

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

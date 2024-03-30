//Function that formats a date like this: 2000/11/05 or YYYY/MM/DD

export function formatDate(date) {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

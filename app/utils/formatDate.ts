export const formatDateToLong = (dateString: string): string => {
  console.log(dateString);
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  const [year, month, day] = dateString.split('-').map(Number);
  // @ts-ignore
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
};

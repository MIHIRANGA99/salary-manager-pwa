export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
};

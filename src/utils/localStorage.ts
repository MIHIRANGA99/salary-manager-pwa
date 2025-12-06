export const saveToLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving to local storage", error);
  }
};

export const getFromLocalStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("Error getting from local storage", error);
    return null;
  }
};

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

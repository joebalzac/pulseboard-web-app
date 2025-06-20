const STORAGE_KEY = "pulseboard-messages";

export const loadMessages = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveMessages = (messages: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

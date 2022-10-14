export const useServerData = (serverDate) => {
  const regExp = /$.{3}/;
  return new Date(serverDate).toLocaleString("ru-RU", { hour12: false });
};

export const useServerData = (serverDate: string): string => {
  const regExp = /.{3}$/;
  return new Date(serverDate)
    .toLocaleString("ru-RU", { hour12: false })
    .replace(regExp, "");
};

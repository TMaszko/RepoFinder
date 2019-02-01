export const zeroPad: (value: number) => string = (value: number): string => {
  return value > 0 && value < 10 ? `0${value}` : value.toString();
};

export const dateFormatter: (date: Date) => string = (date: Date): string => {
  return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`;
};

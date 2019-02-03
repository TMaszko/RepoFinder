export const zeroPad: (value: number) => string = value => {
  return value > 0 && value < 10 ? `0${value}` : value.toString();
};

export const dateFormatter: (date: Date) => string = date => {
  return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`;
};

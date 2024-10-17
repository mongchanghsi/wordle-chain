export const shortenAddress = (_str: string) => {
  return _str.substring(0, 4) + "..." + _str.substring(_str.length - 4);
};

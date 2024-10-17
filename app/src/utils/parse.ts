// TON Coins are 9dp / gwei - 1_000_000_000 = 1
export const toReadableTon = (value: number | string) => {
  return +value / 10 ** 9;
};

export const toGweiTon = (value: number | string) => {
  return +value * 10 ** 9;
};

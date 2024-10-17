export const isTrue = (x: boolean) => {
  // styled-components don't like to take in boolean
  return x ? 1 : 0;
};
